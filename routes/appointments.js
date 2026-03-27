const router = require('express').Router();
const { runQuery, runProcedure } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    const result = await runQuery(
      'SELECT * FROM vw_AppointmentDetails ORDER BY start_time DESC',
      {},
      { feature: 'VIEW', description: 'Appointment list using vw_AppointmentDetails - joins appointments with patients, dentists, services' }
    );
    res.render('appointments/index', { title: 'Appointments', reqPath: '/appointments', queries: [result.meta], appointments: result.data });
  } catch (err) { next(err); }
});

router.get('/new', async (req, res, next) => {
  try {
    const queries = [];
    const dentists = await runQuery("SELECT id, full_name FROM users WHERE role = 'dentist' ORDER BY full_name", {}, { feature: 'QUERY', description: 'Fetch dentists' });
    queries.push(dentists.meta);
    const patients = await runQuery("SELECT id, first_name, last_name FROM patients ORDER BY first_name", {}, { feature: 'QUERY', description: 'Fetch patients' });
    queries.push(patients.meta);
    const services = await runQuery("SELECT id, name, duration_minutes FROM services ORDER BY name", {}, { feature: 'QUERY', description: 'Fetch services' });
    queries.push(services.meta);
    res.render('appointments/form', { title: 'Book Appointment', reqPath: '/appointments', queries, dentists: dentists.data, patients: patients.data, services: services.data, appointment: null });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { dentist_id, patient_id, service_id, title, start_time, end_time, notes, test_past } = req.body;

    if (test_past === 'on') {
      const result = await runQuery(
        `INSERT INTO appointments (dentist_id, patient_id, service_id, title, start_time, end_time, notes)
         VALUES (@did, @pid, @sid, @title, @start, @end, @notes)`,
        { did: parseInt(dentist_id), pid: parseInt(patient_id), sid: service_id ? parseInt(service_id) : null, title: title || 'Test Past Appointment', start: '2020-01-01 09:00:00', end: '2020-01-01 10:00:00', notes: notes || null },
        { feature: 'TRIGGER', description: 'trg_PreventPastAppointment - INSTEAD OF INSERT trigger blocks past appointment bookings with RAISERROR' }
      );
      req.session.lastQueries = [result.meta];
      if (result.error) {
        req.session.flash = { error: `Trigger trg_PreventPastAppointment blocked the insert: ${result.error}` };
      }
      return res.redirect('/appointments');
    }

    const result = await runProcedure(
      'sp_BookAppointment',
      { dentist_id: parseInt(dentist_id), patient_id: parseInt(patient_id), service_id: service_id ? parseInt(service_id) : null, title: title || null, start_time: new Date(start_time), end_time: new Date(end_time), notes: notes || null },
      { feature: 'STORED PROCEDURE', description: 'sp_BookAppointment - validates dentist, patient, checks overlaps, inserts appointment' }
    );
    req.session.lastQueries = [result.meta];
    if (result.error) {
      req.session.flash = { error: result.error };
    } else {
      req.session.flash = { success: `Appointment booked! ID: ${result.data[0]?.new_appointment_id || 'created'}` };
    }
    res.redirect('/appointments');
  } catch (err) { next(err); }
});

router.post('/:id/cancel', async (req, res, next) => {
  try {
    const { reason } = req.body;
    const result = await runProcedure(
      'sp_CancelAppointment',
      { appointment_id: parseInt(req.params.id), reason: reason || 'Cancelled by user' },
      { feature: 'STORED PROCEDURE', description: 'sp_CancelAppointment - validates status, updates to cancelled, appends reason to notes' }
    );
    req.session.lastQueries = [result.meta];
    if (result.error) {
      req.session.flash = { error: result.error };
    } else {
      req.session.flash = { success: 'Appointment cancelled!' };
    }
    res.redirect('/appointments');
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await runQuery('DELETE FROM appointments WHERE id = @id', { id: parseInt(req.params.id) }, { feature: 'DML DELETE', description: 'Delete appointment' });
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Appointment deleted!' };
    res.redirect('/appointments');
  } catch (err) { next(err); }
});

module.exports = router;
