const router = require('express').Router();
const { runQuery } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    const result = await runQuery(
      `SELECT u.*, p.phone, p.avatar_url, p.subscription_plan
       FROM users u LEFT JOIN profiles p ON u.id = p.user_id ORDER BY u.id`,
      {},
      { feature: 'QUERY', description: 'Join users with profiles to show complete staff information' }
    );
    res.render('users/index', { title: 'Users & Staff', reqPath: '/users', queries: [result.meta], users: result.data });
  } catch (err) { next(err); }
});

router.get('/new', (req, res) => {
  res.render('users/form', { title: 'New User', reqPath: '/users', queries: [], user: null });
});

router.post('/', async (req, res, next) => {
  try {
    const { full_name, email, role, phone, subscription_plan } = req.body;
    const actionQueries = [];
    const userResult = await runQuery(
      `INSERT INTO users (full_name, email, role) OUTPUT INSERTED.id VALUES (@name, @email, @role)`,
      { name: full_name, email, role },
      { feature: 'DML INSERT', description: 'Insert new user' }
    );
    actionQueries.push(userResult.meta);
    const userId = userResult.data[0].id;
    const profResult = await runQuery(
      `INSERT INTO profiles (user_id, phone, subscription_plan) VALUES (@uid, @phone, @plan)`,
      { uid: userId, phone: phone || null, plan: subscription_plan || null },
      { feature: 'DML INSERT', description: 'Insert user profile' }
    );
    actionQueries.push(profResult.meta);
    req.session.lastQueries = actionQueries;
    req.session.flash = { success: 'User created!' };
    res.redirect('/users');
  } catch (err) { next(err); }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const result = await runQuery(
      `SELECT u.*, p.phone, p.avatar_url, p.subscription_plan
       FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = @id`,
      { id: parseInt(req.params.id) },
      { feature: 'QUERY', description: 'Fetch user with profile for editing' }
    );
    res.render('users/form', { title: 'Edit User', reqPath: '/users', queries: [result.meta], user: result.data[0] });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { full_name, email, role, phone, subscription_plan } = req.body;
    const actionQueries = [];
    const r1 = await runQuery(
      'UPDATE users SET full_name=@name, email=@email, role=@role WHERE id=@id',
      { id: parseInt(req.params.id), name: full_name, email, role },
      { feature: 'DML UPDATE', description: 'Update user' }
    );
    actionQueries.push(r1.meta);
    const r2 = await runQuery(
      `UPDATE profiles SET phone=@phone, subscription_plan=@plan WHERE user_id=@id`,
      { id: parseInt(req.params.id), phone: phone || null, plan: subscription_plan || null },
      { feature: 'DML UPDATE', description: 'Update profile' }
    );
    actionQueries.push(r2.meta);
    req.session.lastQueries = actionQueries;
    req.session.flash = { success: 'User updated!' };
    res.redirect('/users');
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const actionQueries = [];
    const r1 = await runQuery('DELETE FROM profiles WHERE user_id = @id', { id: parseInt(req.params.id) }, { feature: 'DML DELETE', description: 'Delete profile' });
    actionQueries.push(r1.meta);
    const r2 = await runQuery('DELETE FROM users WHERE id = @id', { id: parseInt(req.params.id) }, { feature: 'DML DELETE', description: 'Delete user' });
    actionQueries.push(r2.meta);
    req.session.lastQueries = actionQueries;
    req.session.flash = { success: 'User deleted!' };
    res.redirect('/users');
  } catch (err) { next(err); }
});

module.exports = router;
