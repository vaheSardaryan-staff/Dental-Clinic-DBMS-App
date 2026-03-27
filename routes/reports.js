const router = require('express').Router();
const { runQuery, runProcedure } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    res.render('reports/index', { title: 'Reports', reqPath: '/reports', queries: [] });
  } catch (err) { next(err); }
});

router.get('/revenue-by-dentist', async (req, res, next) => {
  try {
    const result = await runQuery(
      'SELECT * FROM vw_RevenueByDentist ORDER BY total_billed DESC',
      {},
      { feature: 'VIEW', description: 'vw_RevenueByDentist - aggregates invoice and payment data per dentist' }
    );
    res.render('reports/revenue', { title: 'Revenue by Dentist', reqPath: '/reports', queries: [result.meta], data: result.data, reportType: 'dentist' });
  } catch (err) { next(err); }
});

router.get('/monthly-revenue', async (req, res, next) => {
  try {
    const result = await runQuery(
      'SELECT * FROM vw_MonthlyRevenue ORDER BY revenue_month',
      {},
      { feature: 'VIEW', description: 'vw_MonthlyRevenue - groups payments by month with aggregates' }
    );
    res.render('reports/revenue', { title: 'Monthly Revenue', reqPath: '/reports', queries: [result.meta], data: result.data, reportType: 'monthly' });
  } catch (err) { next(err); }
});

router.get('/monthly', async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;

    const result = await runProcedure(
      'sp_MonthlyReport',
      { year, month },
      { feature: 'STORED PROCEDURE', description: 'sp_MonthlyReport returns 3 result sets: revenue summary, appointment stats, new patient count' }
    );

    res.render('reports/monthly', {
      title: 'Monthly Report', reqPath: '/reports', queries: [result.meta],
      revenue: result.recordsets[0] || [],
      appointments: result.recordsets[1] || [],
      newPatients: result.recordsets[2] || [],
      year, month,
    });
  } catch (err) { next(err); }
});

module.exports = router;
