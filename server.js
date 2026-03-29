require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'dental-clinic-2024',
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.query.role) {
    req.session.currentRole = req.query.role;
  }
  res.locals.currentRole = req.session.currentRole || 'admin';
  res.locals.flash = req.session.flash || {};
  delete req.session.flash;

  // Carry over queries from POST redirects
  res.locals.sessionQueries = req.session.lastQueries || [];
  delete req.session.lastQueries;

  // Helper to save queries to session before redirect
  res.saveQueries = (queries) => {
    req.session.lastQueries = queries;
  };

  next();
});

app.use('/', require('./routes/dashboard'));
app.use('/patients', require('./routes/patients'));
app.use('/users', require('./routes/users'));
app.use('/services', require('./routes/services'));
app.use('/appointments', require('./routes/appointments'));
app.use('/visits', require('./routes/visits'));
app.use('/billing', require('./routes/billing'));
app.use('/reports', require('./routes/reports'));
app.use('/showcase', require('./routes/showcase'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error',
    message: err.message,
    queries: [],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dental Clinic running at http://localhost:${PORT}`);
});
