const router = require('express').Router();
const { runQuery, runProcedure } = require('../helpers/queryRunner');

router.get('/invoices', async (req, res, next) => {
  try {
    const queries = [];
    const invoices = await runQuery(
      `SELECT i.*, p.first_name, p.last_name,
       (SELECT ISNULL(SUM(pay.amount), 0) FROM payments pay WHERE pay.invoice_id = i.id) AS total_paid
       FROM invoices i JOIN patients p ON i.patient_id = p.id ORDER BY i.issued_date DESC`,
      {},
      { feature: 'QUERY', description: 'List invoices with patient names and payment totals via subquery' }
    );
    queries.push(invoices.meta);

    const overdue = await runQuery(
      'SELECT * FROM vw_OverdueInvoices ORDER BY days_overdue DESC',
      {},
      { feature: 'VIEW', description: 'vw_OverdueInvoices - shows overdue invoices with DATEDIFF calculation' }
    );
    queries.push(overdue.meta);

    const visits = await runQuery(
      `SELECT v.id, v.visit_date, p.first_name, p.last_name
       FROM visits v JOIN patients p ON v.patient_id = p.id
       WHERE v.id NOT IN (SELECT visit_id FROM invoices) ORDER BY v.visit_date DESC`,
      {},
      { feature: 'QUERY', description: 'Find visits without invoices for invoice generation' }
    );
    queries.push(visits.meta);

    res.render('billing/invoices', {
      title: 'Invoices', reqPath: '/billing', queries,
      invoices: invoices.data, overdue: overdue.data, visits: visits.data
    });
  } catch (err) { next(err); }
});

router.post('/invoices/generate', async (req, res, next) => {
  try {
    const { visit_id, discount } = req.body;
    const actionQueries = [];

    const result = await runProcedure(
      'sp_GenerateInvoice',
      { visit_id: parseInt(visit_id), discount: parseFloat(discount || 0) },
      { feature: 'STORED PROCEDURE', description: 'sp_GenerateInvoice - sums treatment costs, creates invoice with status=issued' }
    );
    actionQueries.push(result.meta);

    if (result.error) {
      req.session.flash = { error: result.error };
    } else {
      const invoiceId = result.data[0]?.new_invoice_id;
      if (invoiceId) {
        const invoice = await runQuery(
          'SELECT * FROM invoices WHERE id = @id',
          { id: invoiceId },
          { feature: 'TRIGGER', description: 'trg_AutoSetDueDate automatically set due_date to issued_date + 14 days' }
        );
        actionQueries.push(invoice.meta);
        req.session.flash = { success: `Invoice #${invoiceId} generated! Trigger trg_AutoSetDueDate auto-set due_date to ${invoice.data[0]?.due_date ? new Date(invoice.data[0].due_date).toLocaleDateString() : 'N/A'}` };
      } else {
        req.session.flash = { success: 'Invoice generated!' };
      }
    }
    req.session.lastQueries = actionQueries;
    res.redirect('/billing/invoices');
  } catch (err) { next(err); }
});

router.get('/payments', async (req, res, next) => {
  try {
    const result = await runQuery(
      `SELECT pay.*, i.total_amount, i.status AS invoice_status, p.first_name, p.last_name
       FROM payments pay
       JOIN invoices i ON pay.invoice_id = i.id
       JOIN patients p ON pay.patient_id = p.id
       ORDER BY pay.payment_date DESC`,
      {},
      { feature: 'QUERY', description: 'List payments with invoice and patient info' }
    );

    const invoices = await runQuery(
      `SELECT i.id, i.total_amount, i.status, p.first_name, p.last_name,
       (SELECT ISNULL(SUM(pay.amount), 0) FROM payments pay WHERE pay.invoice_id = i.id) AS total_paid
       FROM invoices i JOIN patients p ON i.patient_id = p.id
       WHERE i.status != 'paid' AND i.status != 'cancelled'
       ORDER BY i.id`,
      {},
      { feature: 'QUERY', description: 'Fetch unpaid invoices for payment form' }
    );

    res.render('billing/payments', {
      title: 'Payments', reqPath: '/billing', queries: [result.meta, invoices.meta],
      payments: result.data, invoices: invoices.data
    });
  } catch (err) { next(err); }
});

router.post('/payments', async (req, res, next) => {
  try {
    const { invoice_id, amount, method, notes } = req.body;
    const actionQueries = [];

    const before = await runQuery(
      'SELECT id, status, total_amount, discount FROM invoices WHERE id = @id',
      { id: parseInt(invoice_id) },
      { feature: 'TRIGGER', description: 'Invoice status BEFORE payment (for trigger demo)' }
    );
    actionQueries.push(before.meta);

    const invoiceData = await runQuery('SELECT patient_id FROM invoices WHERE id = @id', { id: parseInt(invoice_id) });
    const patientId = invoiceData.data[0].patient_id;

    const payResult = await runQuery(
      'INSERT INTO payments (invoice_id, patient_id, amount, method, notes) VALUES (@iid, @pid, @amt, @method, @notes)',
      { iid: parseInt(invoice_id), pid: patientId, amt: parseFloat(amount), method, notes: notes || null },
      { feature: 'DML INSERT', description: 'Insert payment - triggers trg_UpdateInvoiceStatus' }
    );
    actionQueries.push(payResult.meta);

    const after = await runQuery(
      'SELECT id, status, total_amount, discount FROM invoices WHERE id = @id',
      { id: parseInt(invoice_id) },
      { feature: 'TRIGGER', description: 'Invoice status AFTER payment - trg_UpdateInvoiceStatus may have auto-changed status to paid' }
    );
    actionQueries.push(after.meta);

    const beforeStatus = before.data[0]?.status;
    const afterStatus = after.data[0]?.status;
    if (beforeStatus !== afterStatus) {
      req.session.flash = { success: `Payment recorded! Trigger trg_UpdateInvoiceStatus changed invoice status from '${beforeStatus}' to '${afterStatus}'` };
    } else {
      req.session.flash = { success: 'Payment recorded!' };
    }
    req.session.lastQueries = actionQueries;
    res.redirect('/billing/payments');
  } catch (err) { next(err); }
});

module.exports = router;
