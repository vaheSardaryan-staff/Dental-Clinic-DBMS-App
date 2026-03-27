const router = require('express').Router();
const { runQuery } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    const queries = [];

    const patients = await runQuery(
      'SELECT COUNT(*) AS count FROM patients',
      {},
      { feature: 'QUERY', description: 'Count total patients' }
    );
    queries.push(patients.meta);

    const appointments = await runQuery(
      `SELECT COUNT(*) AS count FROM appointments
       WHERE MONTH(start_time) = MONTH(GETDATE()) AND YEAR(start_time) = YEAR(GETDATE())`,
      {},
      { feature: 'QUERY', description: 'Count appointments this month' }
    );
    queries.push(appointments.meta);

    const revenue = await runQuery(
      `SELECT ISNULL(SUM(amount), 0) AS total FROM payments
       WHERE MONTH(payment_date) = MONTH(GETDATE()) AND YEAR(payment_date) = YEAR(GETDATE())`,
      {},
      { feature: 'QUERY', description: 'Total revenue this month' }
    );
    queries.push(revenue.meta);

    const overdue = await runQuery(
      'SELECT COUNT(*) AS count FROM vw_OverdueInvoices',
      {},
      { feature: 'VIEW', description: 'Count overdue invoices using vw_OverdueInvoices view' }
    );
    queries.push(overdue.meta);

    const revenueByDentist = await runQuery(
      'SELECT * FROM vw_RevenueByDentist',
      {},
      { feature: 'VIEW', description: 'Revenue breakdown by dentist using vw_RevenueByDentist view' }
    );
    queries.push(revenueByDentist.meta);

    const monthlyRevenue = await runQuery(
      'SELECT * FROM vw_MonthlyRevenue ORDER BY revenue_month',
      {},
      { feature: 'VIEW', description: 'Monthly revenue trend using vw_MonthlyRevenue view' }
    );
    queries.push(monthlyRevenue.meta);

    const recentAppointments = await runQuery(
      'SELECT TOP 10 * FROM vw_AppointmentDetails ORDER BY start_time DESC',
      {},
      { feature: 'VIEW', description: 'Recent appointments using vw_AppointmentDetails view' }
    );
    queries.push(recentAppointments.meta);

    res.render('dashboard', {
      title: 'Dashboard',
      reqPath: '/',
      queries,
      stats: {
        patients: patients.data[0]?.count || 0,
        appointments: appointments.data[0]?.count || 0,
        revenue: revenue.data[0]?.total || 0,
        overdue: overdue.data[0]?.count || 0,
      },
      revenueByDentist: revenueByDentist.data,
      monthlyRevenue: monthlyRevenue.data,
      recentAppointments: recentAppointments.data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
