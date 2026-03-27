const router = require('express').Router();
const { runQuery } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    const cat = req.query.category;
    let sql = 'SELECT * FROM services';
    const params = {};
    if (cat) { sql += ' WHERE category = @cat'; params.cat = cat; }
    sql += ' ORDER BY category, name';

    const result = await runQuery(sql, params, { feature: 'QUERY', description: cat ? `Filter services by category '${cat}'` : 'List all dental services' });
    const categories = await runQuery('SELECT DISTINCT category FROM services ORDER BY category', {}, { feature: 'QUERY', description: 'Get distinct categories for filter' });
    res.render('services/index', { title: 'Services', reqPath: '/services', queries: [result.meta, categories.meta], services: result.data, categories: categories.data, selectedCategory: cat || '' });
  } catch (err) { next(err); }
});

router.get('/new', (req, res) => {
  res.render('services/form', { title: 'New Service', reqPath: '/services', queries: [], service: null });
});

router.post('/', async (req, res, next) => {
  try {
    const { name, category, default_cost, duration_minutes, description } = req.body;
    const result = await runQuery(
      'INSERT INTO services (name, category, default_cost, duration_minutes, description) VALUES (@name, @cat, @cost, @dur, @desc)',
      { name, cat: category, cost: parseFloat(default_cost), dur: duration_minutes ? parseInt(duration_minutes) : null, desc: description || null },
      { feature: 'DML INSERT', description: 'Insert new dental service' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Service created!' };
    res.redirect('/services');
  } catch (err) { next(err); }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const result = await runQuery('SELECT * FROM services WHERE id = @id', { id: parseInt(req.params.id) }, { feature: 'QUERY', description: 'Fetch service for editing' });
    res.render('services/form', { title: 'Edit Service', reqPath: '/services', queries: [result.meta], service: result.data[0] });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, category, default_cost, duration_minutes, description } = req.body;
    const result = await runQuery(
      'UPDATE services SET name=@name, category=@cat, default_cost=@cost, duration_minutes=@dur, description=@desc WHERE id=@id',
      { id: parseInt(req.params.id), name, cat: category, cost: parseFloat(default_cost), dur: duration_minutes ? parseInt(duration_minutes) : null, desc: description || null },
      { feature: 'DML UPDATE', description: 'Update service' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Service updated!' };
    res.redirect('/services');
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await runQuery('DELETE FROM services WHERE id = @id', { id: parseInt(req.params.id) }, { feature: 'DML DELETE', description: 'Delete service' });
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Service deleted!' };
    res.redirect('/services');
  } catch (err) { next(err); }
});

module.exports = router;
