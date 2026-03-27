const router = require('express').Router();
const { runQuery, runProcedure } = require('../helpers/queryRunner');

router.get('/', async (req, res, next) => {
  try {
    const queries = [];
    const result = await runQuery(
      'SELECT * FROM vw_PatientOverview ORDER BY patient_id DESC',
      {},
      { feature: 'VIEW', description: 'Patient list using vw_PatientOverview - joins patients with users and counts medical alerts' }
    );
    queries.push(result.meta);
    res.render('patients/index', { title: 'Patients', reqPath: '/patients', queries, patients: result.data });
  } catch (err) { next(err); }
});

router.get('/new', async (req, res, next) => {
  try {
    const dentists = await runQuery(
      "SELECT id, full_name FROM users WHERE role = 'dentist' ORDER BY full_name",
      {},
      { feature: 'QUERY', description: 'Fetch dentists for dropdown' }
    );
    res.render('patients/form', {
      title: 'New Patient', reqPath: '/patients', queries: [dentists.meta],
      patient: null, dentists: dentists.data
    });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { dentist_id, first_name, last_name, phone, email, date_of_birth, gender, notes } = req.body;
    const result = await runQuery(
      `INSERT INTO patients (dentist_id, first_name, last_name, phone, email, date_of_birth, gender, notes)
       VALUES (@dentist_id, @first_name, @last_name, @phone, @email, @dob, @gender, @notes)`,
      { dentist_id: parseInt(dentist_id), first_name, last_name, phone: phone || null, email: email || null, dob: date_of_birth || null, gender: gender || null, notes: notes || null },
      { feature: 'DML INSERT', description: 'Insert new patient record' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Patient created successfully!' };
    res.redirect('/patients');
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const queries = [];
    const summary = await runProcedure(
      'sp_GetPatientSummary',
      { patient_id: parseInt(req.params.id) },
      { feature: 'STORED PROCEDURE', description: 'sp_GetPatientSummary returns 4 result sets: demographics, visit stats, financial summary, medical alerts' }
    );
    queries.push(summary.meta);

    const treatments = await runQuery(
      'SELECT * FROM vw_TreatmentHistory WHERE patient_id = @id ORDER BY visit_date DESC',
      { id: parseInt(req.params.id) },
      { feature: 'VIEW', description: 'Treatment history using vw_TreatmentHistory view' }
    );
    queries.push(treatments.meta);

    res.render('patients/show', {
      title: 'Patient Details', reqPath: '/patients', queries,
      patient: summary.recordsets[0] ? summary.recordsets[0][0] : null,
      visitStats: summary.recordsets[1] ? summary.recordsets[1][0] : null,
      financial: summary.recordsets[2] ? summary.recordsets[2][0] : null,
      medicalAlerts: summary.recordsets[3] || [],
      treatments: treatments.data,
    });
  } catch (err) { next(err); }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const queries = [];
    const patient = await runQuery('SELECT * FROM patients WHERE id = @id', { id: parseInt(req.params.id) }, { feature: 'QUERY', description: 'Fetch patient for editing' });
    queries.push(patient.meta);
    const dentists = await runQuery("SELECT id, full_name FROM users WHERE role = 'dentist' ORDER BY full_name", {}, { feature: 'QUERY', description: 'Fetch dentists for dropdown' });
    queries.push(dentists.meta);
    res.render('patients/form', { title: 'Edit Patient', reqPath: '/patients', queries, patient: patient.data[0], dentists: dentists.data });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { dentist_id, first_name, last_name, phone, email, date_of_birth, gender, notes } = req.body;
    const result = await runQuery(
      `UPDATE patients SET dentist_id=@dentist_id, first_name=@first_name, last_name=@last_name,
       phone=@phone, email=@email, date_of_birth=@dob, gender=@gender, notes=@notes WHERE id=@id`,
      { id: parseInt(req.params.id), dentist_id: parseInt(dentist_id), first_name, last_name, phone: phone || null, email: email || null, dob: date_of_birth || null, gender: gender || null, notes: notes || null },
      { feature: 'DML UPDATE', description: 'Update patient record' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Patient updated successfully!' };
    res.redirect('/patients/' + req.params.id);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const actionQueries = [];

    const before = await runQuery('SELECT * FROM patients WHERE id = @id', { id: parseInt(req.params.id) }, { feature: 'QUERY', description: 'Fetch patient before deletion (for trigger demo)' });
    actionQueries.push(before.meta);

    await runQuery('DELETE FROM medical_history WHERE patient_id = @id', { id: parseInt(req.params.id) });
    await runQuery('DELETE FROM treatment_teeth WHERE treatment_id IN (SELECT id FROM treatments WHERE patient_id = @id)', { id: parseInt(req.params.id) });
    await runQuery('DELETE FROM treatments WHERE patient_id = @id', { id: parseInt(req.params.id) });
    await runQuery('DELETE FROM payments WHERE patient_id = @id', { id: parseInt(req.params.id) });
    await runQuery('DELETE FROM invoices WHERE patient_id = @id', { id: parseInt(req.params.id) });
    await runQuery('DELETE FROM visits WHERE patient_id = @id', { id: parseInt(req.params.id) });
    await runQuery('DELETE FROM appointments WHERE patient_id = @id', { id: parseInt(req.params.id) });

    const result = await runQuery(
      'DELETE FROM patients WHERE id = @id',
      { id: parseInt(req.params.id) },
      { feature: 'TRIGGER', description: 'DELETE triggers trg_LogPatientDeletion - logs deletion to patient_audit_log' }
    );
    actionQueries.push(result.meta);

    const auditLog = await runQuery(
      'SELECT TOP 1 * FROM patient_audit_log ORDER BY id DESC',
      {},
      { feature: 'TRIGGER', description: 'Checking audit log - trg_LogPatientDeletion automatically logged this deletion' }
    );
    actionQueries.push(auditLog.meta);

    req.session.lastQueries = actionQueries;
    req.session.flash = { success: `Patient deleted. Trigger trg_LogPatientDeletion logged the deletion to patient_audit_log (ID: ${auditLog.data[0]?.id})` };
    res.redirect('/patients');
  } catch (err) { next(err); }
});

router.post('/:id/medical-history', async (req, res, next) => {
  try {
    const { condition_type, description } = req.body;
    const result = await runQuery(
      'INSERT INTO medical_history (patient_id, condition_type, description) VALUES (@pid, @type, @desc)',
      { pid: parseInt(req.params.id), type: condition_type, desc: description },
      { feature: 'DML INSERT', description: 'Add medical history record' }
    );
    req.session.lastQueries = [result.meta];
    req.session.flash = { success: 'Medical history added!' };
    res.redirect('/patients/' + req.params.id);
  } catch (err) { next(err); }
});

module.exports = router;
