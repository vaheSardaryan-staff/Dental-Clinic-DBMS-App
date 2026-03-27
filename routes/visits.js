const router = require('express').Router();
const { runQuery } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    const result = await runQuery(
      `SELECT v.*, p.first_name, p.last_name, u.full_name AS dentist_name
       FROM visits v
       JOIN patients p ON v.patient_id = p.id
       JOIN users u ON v.dentist_id = u.id
       ORDER BY v.visit_date DESC`,
      {},
      { feature: 'QUERY', description: 'List visits with patient and dentist names via JOINs' }
    );
    res.render('visits/index', { title: 'Visits & Treatments', reqPath: '/visits', queries: [result.meta], visits: result.data });
  } catch (err) { next(err); }
});

router.get('/new', async (req, res, next) => {
  try {
    const dentists = await runQuery("SELECT id, full_name FROM users WHERE role = 'dentist'", {});
    const patients = await runQuery("SELECT id, first_name, last_name FROM patients ORDER BY first_name", {});
    const appointments = await runQuery("SELECT id, title, start_time FROM appointments WHERE status = 'scheduled' ORDER BY start_time", {});
    res.render('visits/form', { title: 'New Visit', reqPath: '/visits', queries: [], visit: null, dentists: dentists.data, patients: patients.data, appointments: appointments.data });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { patient_id, dentist_id, appointment_id, visit_date, chief_complaint, diagnosis } = req.body;
    const vdate = visit_date ? new Date(visit_date) : new Date();
    const result = await runQuery(
      `INSERT INTO visits (patient_id, dentist_id, appointment_id, visit_date, chief_complaint, diagnosis, status)
       VALUES (@pid, @did, @aid, @vdate, @complaint, @diag, 'in_progress')`,
      { pid: parseInt(patient_id), did: parseInt(dentist_id), aid: appointment_id ? parseInt(appointment_id) : null, vdate, complaint: chief_complaint || null, diag: diagnosis || null },
      { feature: 'DML INSERT', description: 'Create new visit record' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Visit created!' };
    res.redirect('/visits');
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const queries = [];
    const visit = await runQuery(
      `SELECT v.*, p.first_name, p.last_name, u.full_name AS dentist_name
       FROM visits v JOIN patients p ON v.patient_id = p.id JOIN users u ON v.dentist_id = u.id
       WHERE v.id = @id`,
      { id: parseInt(req.params.id) },
      { feature: 'QUERY', description: 'Fetch visit details with JOINs' }
    );
    queries.push(visit.meta);

    const treatments = await runQuery(
      `SELECT t.*, s.name AS service_name, s.category,
       (SELECT STRING_AGG(CAST(tt.tooth_number AS VARCHAR) + ISNULL('-' + tt.surface, ''), ', ')
        FROM treatment_teeth tt WHERE tt.treatment_id = t.id) AS teeth_info
       FROM treatments t JOIN services s ON t.service_id = s.id WHERE t.visit_id = @id`,
      { id: parseInt(req.params.id) },
      { feature: 'QUERY', description: 'Fetch treatments with service names and aggregated teeth info' }
    );
    queries.push(treatments.meta);

    const services = await runQuery('SELECT id, name, default_cost FROM services ORDER BY name', {});

    res.render('visits/show', {
      title: 'Visit Details', reqPath: '/visits', queries,
      visit: visit.data[0], treatments: treatments.data, services: services.data
    });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { chief_complaint, diagnosis, status } = req.body;
    const result = await runQuery(
      'UPDATE visits SET chief_complaint=@complaint, diagnosis=@diag, status=@status WHERE id=@id',
      { id: parseInt(req.params.id), complaint: chief_complaint || null, diag: diagnosis || null, status },
      { feature: 'DML UPDATE', description: 'Update visit' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Visit updated!' };
    res.redirect('/visits/' + req.params.id);
  } catch (err) { next(err); }
});

router.post('/:id/treatments', async (req, res, next) => {
  try {
    const { service_id, cost, notes, tooth_numbers, surfaces } = req.body;
    const actionQueries = [];
    const visitData = await runQuery('SELECT patient_id FROM visits WHERE id = @id', { id: parseInt(req.params.id) });
    const patientId = visitData.data[0].patient_id;

    const treatResult = await runQuery(
      `INSERT INTO treatments (visit_id, patient_id, service_id, cost, status, notes)
       OUTPUT INSERTED.id VALUES (@vid, @pid, @sid, @cost, 'planned', @notes)`,
      { vid: parseInt(req.params.id), pid: patientId, sid: parseInt(service_id), cost: parseFloat(cost), notes: notes || null },
      { feature: 'DML INSERT', description: 'Insert treatment record' }
    );
    actionQueries.push(treatResult.meta);
    const treatId = treatResult.data[0].id;

    if (tooth_numbers) {
      const teeth = Array.isArray(tooth_numbers) ? tooth_numbers : [tooth_numbers];
      const surfs = Array.isArray(surfaces) ? surfaces : [surfaces];
      for (let i = 0; i < teeth.length; i++) {
        if (teeth[i]) {
          const teethResult = await runQuery(
            'INSERT INTO treatment_teeth (treatment_id, tooth_number, surface) VALUES (@tid, @tooth, @surf)',
            { tid: treatId, tooth: parseInt(teeth[i]), surf: surfs[i] || null },
            { feature: 'DML INSERT', description: 'Insert treatment tooth record' }
          );
          actionQueries.push(teethResult.meta);
        }
      }
    }
    req.session.lastQueries = actionQueries;
    req.session.flash = { success: 'Treatment added!' };
    res.redirect('/visits/' + req.params.id);
  } catch (err) { next(err); }
});

module.exports = router;
