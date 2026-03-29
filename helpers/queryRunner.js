// ============================================================
// In-Memory Data Store — replaces SQL Server dependency
// ============================================================

// --------------- seed helpers ---------------
let _nextId = {};
function nextId(table) {
  if (!_nextId[table]) _nextId[table] = 1;
  return _nextId[table]++;
}

// --------------- tables ---------------
const db = {
  users: [],
  profiles: [],
  patients: [],
  services: [],
  appointments: [],
  visits: [],
  treatments: [],
  treatment_teeth: [],
  medical_history: [],
  invoices: [],
  payments: [],
  patient_audit_log: [],
};

// --------------- seed data ---------------
function seed() {
  // Users (dentists + admin + receptionist)
  const users = [
    { id: nextId('users'), full_name: 'Dr. Sarah Johnson', email: 'sarah@doq.com', role: 'dentist' },
    { id: nextId('users'), full_name: 'Dr. Michael Chen', email: 'michael@doq.com', role: 'dentist' },
    { id: nextId('users'), full_name: 'Dr. Emily Davis', email: 'emily@doq.com', role: 'dentist' },
    { id: nextId('users'), full_name: 'Admin User', email: 'admin@doq.com', role: 'admin' },
    { id: nextId('users'), full_name: 'Jane Receptionist', email: 'jane@doq.com', role: 'receptionist' },
  ];
  db.users = users;

  db.profiles = [
    { user_id: 1, phone: '555-0101', avatar_url: null, subscription_plan: 'premium' },
    { user_id: 2, phone: '555-0102', avatar_url: null, subscription_plan: 'premium' },
    { user_id: 3, phone: '555-0103', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 4, phone: '555-0104', avatar_url: null, subscription_plan: 'premium' },
    { user_id: 5, phone: '555-0105', avatar_url: null, subscription_plan: 'basic' },
  ];

  // Patients
  db.patients = [
    { id: nextId('patients'), dentist_id: 1, first_name: 'John', last_name: 'Smith', phone: '555-1001', email: 'john@example.com', date_of_birth: '1985-03-15', gender: 'male', notes: null },
    { id: nextId('patients'), dentist_id: 1, first_name: 'Maria', last_name: 'Garcia', phone: '555-1002', email: 'maria@example.com', date_of_birth: '1990-07-22', gender: 'female', notes: 'Prefers morning appointments' },
    { id: nextId('patients'), dentist_id: 2, first_name: 'Robert', last_name: 'Williams', phone: '555-1003', email: 'robert@example.com', date_of_birth: '1978-11-08', gender: 'male', notes: null },
    { id: nextId('patients'), dentist_id: 2, first_name: 'Lisa', last_name: 'Brown', phone: '555-1004', email: 'lisa@example.com', date_of_birth: '1995-01-30', gender: 'female', notes: null },
    { id: nextId('patients'), dentist_id: 3, first_name: 'David', last_name: 'Jones', phone: '555-1005', email: 'david@example.com', date_of_birth: '1982-06-12', gender: 'male', notes: 'Anxious patient' },
    { id: nextId('patients'), dentist_id: 3, first_name: 'Emma', last_name: 'Wilson', phone: '555-1006', email: 'emma@example.com', date_of_birth: '2000-09-05', gender: 'female', notes: null },
  ];

  // Medical history
  db.medical_history = [
    { id: nextId('medical_history'), patient_id: 1, condition_type: 'allergy', description: 'Penicillin allergy' },
    { id: nextId('medical_history'), patient_id: 1, condition_type: 'chronic_disease', description: 'Diabetes Type 2' },
    { id: nextId('medical_history'), patient_id: 3, condition_type: 'medication', description: 'Blood thinners (Warfarin)' },
    { id: nextId('medical_history'), patient_id: 5, condition_type: 'allergy', description: 'Latex allergy' },
  ];

  // Services
  db.services = [
    { id: nextId('services'), name: 'Dental Cleaning', category: 'preventive', default_cost: 120.00, duration_minutes: 45, description: 'Professional teeth cleaning and polishing' },
    { id: nextId('services'), name: 'Dental Exam', category: 'preventive', default_cost: 80.00, duration_minutes: 30, description: 'Comprehensive dental examination' },
    { id: nextId('services'), name: 'Tooth Filling', category: 'restorative', default_cost: 200.00, duration_minutes: 60, description: 'Composite resin filling' },
    { id: nextId('services'), name: 'Root Canal', category: 'endodontic', default_cost: 800.00, duration_minutes: 90, description: 'Root canal treatment' },
    { id: nextId('services'), name: 'Tooth Extraction', category: 'oral_surgery', default_cost: 250.00, duration_minutes: 45, description: 'Simple tooth extraction' },
    { id: nextId('services'), name: 'Teeth Whitening', category: 'cosmetic', default_cost: 350.00, duration_minutes: 60, description: 'Professional teeth whitening' },
    { id: nextId('services'), name: 'Dental Crown', category: 'restorative', default_cost: 1100.00, duration_minutes: 90, description: 'Porcelain crown placement' },
    { id: nextId('services'), name: 'Dental X-Ray', category: 'diagnostic', default_cost: 60.00, duration_minutes: 15, description: 'Panoramic or bitewing X-ray' },
  ];

  // Appointments
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  db.appointments = [
    { id: nextId('appointments'), dentist_id: 1, patient_id: 1, service_id: 1, title: 'Cleaning - John Smith', start_time: new Date(thisYear, thisMonth, 10, 9, 0), end_time: new Date(thisYear, thisMonth, 10, 9, 45), status: 'completed', notes: null },
    { id: nextId('appointments'), dentist_id: 1, patient_id: 2, service_id: 2, title: 'Exam - Maria Garcia', start_time: new Date(thisYear, thisMonth, 12, 10, 0), end_time: new Date(thisYear, thisMonth, 12, 10, 30), status: 'completed', notes: null },
    { id: nextId('appointments'), dentist_id: 2, patient_id: 3, service_id: 3, title: 'Filling - Robert Williams', start_time: new Date(thisYear, thisMonth, 15, 14, 0), end_time: new Date(thisYear, thisMonth, 15, 15, 0), status: 'scheduled', notes: 'Tooth #14' },
    { id: nextId('appointments'), dentist_id: 2, patient_id: 4, service_id: 4, title: 'Root Canal - Lisa Brown', start_time: new Date(thisYear, thisMonth, 18, 9, 0), end_time: new Date(thisYear, thisMonth, 18, 10, 30), status: 'scheduled', notes: null },
    { id: nextId('appointments'), dentist_id: 3, patient_id: 5, service_id: 6, title: 'Whitening - David Jones', start_time: new Date(thisYear, thisMonth, 20, 11, 0), end_time: new Date(thisYear, thisMonth, 20, 12, 0), status: 'scheduled', notes: null },
    { id: nextId('appointments'), dentist_id: 1, patient_id: 6, service_id: 1, title: 'Cleaning - Emma Wilson', start_time: new Date(thisYear, thisMonth, 22, 15, 0), end_time: new Date(thisYear, thisMonth, 22, 15, 45), status: 'scheduled', notes: null },
  ];

  // Visits
  db.visits = [
    { id: nextId('visits'), patient_id: 1, dentist_id: 1, appointment_id: 1, visit_date: new Date(thisYear, thisMonth, 10), chief_complaint: 'Regular cleaning', diagnosis: 'Mild tartar buildup', status: 'completed' },
    { id: nextId('visits'), patient_id: 2, dentist_id: 1, appointment_id: 2, visit_date: new Date(thisYear, thisMonth, 12), chief_complaint: 'Annual checkup', diagnosis: 'Cavity detected on tooth #19', status: 'completed' },
    { id: nextId('visits'), patient_id: 3, dentist_id: 2, appointment_id: null, visit_date: new Date(thisYear, thisMonth - 1, 20), chief_complaint: 'Toothache', diagnosis: 'Fractured filling', status: 'completed' },
  ];

  // Treatments
  db.treatments = [
    { id: nextId('treatments'), visit_id: 1, patient_id: 1, service_id: 1, cost: 120.00, status: 'completed', notes: null },
    { id: nextId('treatments'), visit_id: 2, patient_id: 2, service_id: 2, cost: 80.00, status: 'completed', notes: null },
    { id: nextId('treatments'), visit_id: 2, patient_id: 2, service_id: 8, cost: 60.00, status: 'completed', notes: 'Bitewing X-rays' },
    { id: nextId('treatments'), visit_id: 3, patient_id: 3, service_id: 3, cost: 200.00, status: 'completed', notes: 'Composite filling on #14' },
  ];

  // Treatment teeth
  db.treatment_teeth = [
    { id: nextId('treatment_teeth'), treatment_id: 4, tooth_number: 14, surface: 'occlusal' },
    { id: nextId('treatment_teeth'), treatment_id: 4, tooth_number: 14, surface: 'mesial' },
  ];

  // Invoices
  const issuedDate1 = new Date(thisYear, thisMonth, 10);
  const issuedDate2 = new Date(thisYear, thisMonth, 12);
  const issuedDate3 = new Date(thisYear, thisMonth - 1, 20);

  db.invoices = [
    { id: nextId('invoices'), patient_id: 1, visit_id: 1, total_amount: 120.00, discount: 0, status: 'paid', issued_date: issuedDate1, due_date: addDays(issuedDate1, 14) },
    { id: nextId('invoices'), patient_id: 2, visit_id: 2, total_amount: 140.00, discount: 10, status: 'issued', issued_date: issuedDate2, due_date: addDays(issuedDate2, 14) },
    { id: nextId('invoices'), patient_id: 3, visit_id: 3, total_amount: 200.00, discount: 0, status: 'overdue', issued_date: issuedDate3, due_date: addDays(issuedDate3, 14) },
  ];

  // Payments
  db.payments = [
    { id: nextId('payments'), invoice_id: 1, patient_id: 1, amount: 120.00, method: 'credit_card', notes: null, payment_date: new Date(thisYear, thisMonth, 10) },
    { id: nextId('payments'), invoice_id: 2, patient_id: 2, amount: 50.00, method: 'cash', notes: 'Partial payment', payment_date: new Date(thisYear, thisMonth, 13) },
  ];
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Initialize data
seed();

// ============================================================
// VIEW implementations
// ============================================================

function vw_AppointmentDetails() {
  return db.appointments.map(a => {
    const patient = db.patients.find(p => p.id === a.patient_id);
    const dentist = db.users.find(u => u.id === a.dentist_id);
    const service = db.services.find(s => s.id === a.service_id);
    return {
      ...a,
      appointment_id: a.id,
      patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown',
      dentist_name: dentist ? dentist.full_name : 'Unknown',
      service_name: service ? service.name : 'N/A',
    };
  });
}

function vw_PatientOverview() {
  return db.patients.map(p => {
    const dentist = db.users.find(u => u.id === p.dentist_id);
    const alertCount = db.medical_history.filter(m => m.patient_id === p.id).length;
    return {
      patient_id: p.id,
      patient_name: `${p.first_name} ${p.last_name}`,
      dentist_name: dentist ? dentist.full_name : 'N/A',
      phone: p.phone,
      medical_alert_count: alertCount,
      alert_count: alertCount,
    };
  });
}

function vw_TreatmentHistory(patientId) {
  return db.treatments
    .filter(t => t.patient_id === patientId)
    .map(t => {
      const visit = db.visits.find(v => v.id === t.visit_id);
      const service = db.services.find(s => s.id === t.service_id);
      const teeth = db.treatment_teeth
        .filter(tt => tt.treatment_id === t.id)
        .map(tt => tt.tooth_number + (tt.surface ? '-' + tt.surface : ''))
        .join(', ');
      return {
        patient_id: t.patient_id,
        visit_date: visit ? visit.visit_date : null,
        service_name: service ? service.name : 'N/A',
        cost: t.cost,
        teeth_treated: teeth || null,
        teeth_info: teeth || null,
        treatment_status: t.status,
        status: t.status,
      };
    });
}

function vw_RevenueByDentist() {
  const dentists = db.users.filter(u => u.role === 'dentist');
  return dentists.map(d => {
    const patientIds = db.patients.filter(p => p.dentist_id === d.id).map(p => p.id);
    const invoices = db.invoices.filter(i => patientIds.includes(i.patient_id));
    const totalBilled = invoices.reduce((s, i) => s + i.total_amount, 0);
    const payments = db.payments.filter(p => patientIds.includes(p.patient_id));
    const totalCollected = payments.reduce((s, p) => s + p.amount, 0);
    return {
      dentist_name: d.full_name,
      full_name: d.full_name,
      total_billed: totalBilled,
      total_collected: totalCollected,
      amount_collected: totalCollected,
    };
  });
}

function vw_MonthlyRevenue() {
  const months = {};
  for (const p of db.payments) {
    const d = new Date(p.payment_date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months[key] = (months[key] || 0) + p.amount;
  }
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([m, total]) => ({ revenue_month: m + '-01', total_revenue: total }));
}

function vw_OverdueInvoices() {
  const now = new Date();
  return db.invoices
    .filter(i => i.status !== 'paid' && i.status !== 'cancelled' && new Date(i.due_date) < now)
    .map(i => {
      const patient = db.patients.find(p => p.id === i.patient_id);
      const daysOverdue = Math.floor((now - new Date(i.due_date)) / (1000 * 60 * 60 * 24));
      return {
        invoice_id: i.id,
        patient_name: patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown',
        total_amount: i.total_amount,
        days_overdue: daysOverdue,
      };
    });
}

// ============================================================
// Stored Procedures
// ============================================================

function sp_BookAppointment(params) {
  const { dentist_id, patient_id, service_id, title, start_time, end_time, notes } = params;
  const dentist = db.users.find(u => u.id === dentist_id && u.role === 'dentist');
  if (!dentist) throw new Error('Invalid dentist_id');
  const patient = db.patients.find(p => p.id === patient_id);
  if (!patient) throw new Error('Invalid patient_id');

  // Check overlap
  const overlap = db.appointments.find(a =>
    a.dentist_id === dentist_id &&
    a.status !== 'cancelled' &&
    new Date(a.start_time) < new Date(end_time) &&
    new Date(a.end_time) > new Date(start_time)
  );
  if (overlap) throw new Error('Time slot overlaps with an existing appointment');

  const id = nextId('appointments');
  db.appointments.push({
    id, dentist_id, patient_id, service_id,
    title: title || `${patient.first_name} ${patient.last_name}`,
    start_time: new Date(start_time), end_time: new Date(end_time),
    status: 'scheduled', notes,
  });
  return { recordsets: [[{ new_appointment_id: id }]], data: [{ new_appointment_id: id }] };
}

function sp_CancelAppointment(params) {
  const { appointment_id, reason } = params;
  const appt = db.appointments.find(a => a.id === appointment_id);
  if (!appt) throw new Error('Appointment not found');
  if (appt.status === 'cancelled') throw new Error('Appointment is already cancelled');
  appt.status = 'cancelled';
  appt.notes = (appt.notes ? appt.notes + '; ' : '') + 'Cancelled: ' + reason;
  return { recordsets: [[]], data: [] };
}

function sp_GenerateInvoice(params) {
  const { visit_id, discount } = params;
  const visit = db.visits.find(v => v.id === visit_id);
  if (!visit) throw new Error('Visit not found');
  const existing = db.invoices.find(i => i.visit_id === visit_id);
  if (existing) throw new Error('Invoice already exists for this visit');
  const treatments = db.treatments.filter(t => t.visit_id === visit_id);
  if (treatments.length === 0) throw new Error('No treatments found for this visit');
  const totalAmount = treatments.reduce((s, t) => s + t.cost, 0);
  const issuedDate = new Date();
  const id = nextId('invoices');
  db.invoices.push({
    id, patient_id: visit.patient_id, visit_id,
    total_amount: totalAmount, discount: discount || 0,
    status: 'issued', issued_date: issuedDate, due_date: addDays(issuedDate, 14),
  });
  return { recordsets: [[{ new_invoice_id: id }]], data: [{ new_invoice_id: id }] };
}

function sp_GetPatientSummary(params) {
  const { patient_id } = params;
  const p = db.patients.find(pt => pt.id === patient_id);
  if (!p) return { recordsets: [[], [], [], []], data: [] };
  const dentist = db.users.find(u => u.id === p.dentist_id);

  // Set 1: demographics
  const demographics = [{
    ...p,
    dentist_name: dentist ? dentist.full_name : 'N/A',
    full_name: dentist ? dentist.full_name : 'N/A',
  }];

  // Set 2: visit stats
  const visits = db.visits.filter(v => v.patient_id === patient_id);
  const visitDates = visits.map(v => new Date(v.visit_date)).sort((a, b) => a - b);
  const visitStats = [{
    total_visits: visits.length,
    first_visit: visitDates[0] || null,
    last_visit: visitDates[visitDates.length - 1] || null,
  }];

  // Set 3: financial
  const invoices = db.invoices.filter(i => i.patient_id === patient_id);
  const totalBilled = invoices.reduce((s, i) => s + i.total_amount, 0);
  const payments = db.payments.filter(pay => pay.patient_id === patient_id);
  const totalPaid = payments.reduce((s, pay) => s + pay.amount, 0);
  const financial = [{ total_billed: totalBilled, total_paid: totalPaid, balance: totalBilled - totalPaid }];

  // Set 4: medical alerts
  const alerts = db.medical_history.filter(m => m.patient_id === patient_id);

  const recordsets = [demographics, visitStats, financial, alerts];
  return { recordsets, data: demographics };
}

function sp_MonthlyReport(params) {
  const { year, month } = params;

  // Set 1: revenue
  const monthPayments = db.payments.filter(p => {
    const d = new Date(p.payment_date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
  const revenue = [{
    total_revenue: monthPayments.reduce((s, p) => s + p.amount, 0),
    payment_count: monthPayments.length,
  }];

  // Set 2: appointments
  const monthAppts = db.appointments.filter(a => {
    const d = new Date(a.start_time);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
  const statusCounts = {};
  monthAppts.forEach(a => { statusCounts[a.status] = (statusCounts[a.status] || 0) + 1; });
  const appointments = [{ total: monthAppts.length, ...statusCounts }];

  // Set 3: new patients (approximation — patients created in that month)
  // Since we don't track created_at, count patients with first visit in that month
  const newPatientIds = new Set();
  db.visits.forEach(v => {
    const d = new Date(v.visit_date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      const allVisits = db.visits.filter(vv => vv.patient_id === v.patient_id);
      const earliest = allVisits.reduce((min, vv) => new Date(vv.visit_date) < min ? new Date(vv.visit_date) : min, new Date(v.visit_date));
      if (earliest.getFullYear() === year && earliest.getMonth() + 1 === month) {
        newPatientIds.add(v.patient_id);
      }
    }
  });
  const newPatients = [{ new_patient_count: newPatientIds.size }];

  return { recordsets: [revenue, appointments, newPatients], data: revenue };
}

// ============================================================
// Trigger simulations
// ============================================================

function triggerPreventPastAppointment(row) {
  if (new Date(row.start_time) < new Date()) {
    throw new Error('Cannot book appointments in the past. Trigger trg_PreventPastAppointment prevented this insert.');
  }
}

function triggerAutoSetDueDate(invoice) {
  invoice.due_date = addDays(invoice.issued_date, 14);
}

function triggerUpdateInvoiceStatus(invoiceId) {
  const invoice = db.invoices.find(i => i.id === invoiceId);
  if (!invoice) return;
  const totalPaid = db.payments
    .filter(p => p.invoice_id === invoiceId)
    .reduce((s, p) => s + p.amount, 0);
  const net = invoice.total_amount - (invoice.discount || 0);
  if (totalPaid >= net) {
    invoice.status = 'paid';
  }
}

function triggerLogPatientDeletion(patient) {
  const id = nextId('patient_audit_log');
  db.patient_audit_log.push({
    id,
    patient_id: patient.id,
    first_name: patient.first_name,
    last_name: patient.last_name,
    action: 'DELETE',
    deleted_at: new Date(),
  });
}

// ============================================================
// Query parser — matches the specific SQL patterns used by routes
// ============================================================

function resolveParams(params) {
  // Clone params so we don't mutate originals
  return { ...params };
}

async function runQuery(sqlText, params = {}, meta = {}) {
  const start = Date.now();
  const p = resolveParams(params);
  const sql = sqlText.replace(/\s+/g, ' ').trim();

  try {
    const result = executeSQL(sql, p);
    const duration = Date.now() - start;
    const data = result.data || [];
    return {
      data,
      recordsets: result.recordsets || [data],
      rowsAffected: result.rowsAffected || [data.length],
      meta: {
        sql: sqlText,
        params,
        duration_ms: duration,
        rowCount: data.length,
        feature: meta.feature || 'QUERY',
        description: meta.description || '',
      },
    };
  } catch (err) {
    const duration = Date.now() - start;
    return {
      data: [],
      recordsets: [[]],
      rowsAffected: [0],
      error: err.message,
      meta: {
        sql: sqlText,
        params,
        duration_ms: duration,
        rowCount: 0,
        feature: meta.feature || 'QUERY',
        description: meta.description || '',
        error: err.message,
      },
    };
  }
}

async function runProcedure(procedureName, params = {}, meta = {}) {
  const start = Date.now();
  const p = resolveParams(params);
  const paramStr = Object.entries(params)
    .map(([k, v]) => `@${k} = ${typeof v === 'string' ? `'${v}'` : v}`)
    .join(', ');

  try {
    let result;
    switch (procedureName) {
      case 'sp_BookAppointment': result = sp_BookAppointment(p); break;
      case 'sp_CancelAppointment': result = sp_CancelAppointment(p); break;
      case 'sp_GenerateInvoice': result = sp_GenerateInvoice(p); break;
      case 'sp_GetPatientSummary': result = sp_GetPatientSummary(p); break;
      case 'sp_MonthlyReport': result = sp_MonthlyReport(p); break;
      default: throw new Error(`Unknown procedure: ${procedureName}`);
    }
    const duration = Date.now() - start;
    return {
      data: result.data || result.recordsets[0] || [],
      recordsets: result.recordsets || [],
      rowsAffected: result.rowsAffected || [0],
      meta: {
        sql: `EXEC ${procedureName} ${paramStr}`,
        params,
        duration_ms: duration,
        rowCount: (result.data || result.recordsets[0] || []).length,
        totalSets: result.recordsets ? result.recordsets.length : 0,
        feature: meta.feature || 'STORED PROCEDURE',
        description: meta.description || `Executing stored procedure ${procedureName}`,
      },
    };
  } catch (err) {
    const duration = Date.now() - start;
    return {
      data: [],
      recordsets: [],
      rowsAffected: [],
      error: err.message,
      meta: {
        sql: `EXEC ${procedureName} ${paramStr}`,
        params,
        duration_ms: duration,
        rowCount: 0,
        feature: meta.feature || 'STORED PROCEDURE',
        description: meta.description || `Executing stored procedure ${procedureName}`,
        error: err.message,
      },
    };
  }
}

// ============================================================
// SQL execution engine — pattern matching for known queries
// ============================================================

function executeSQL(sql, params) {
  // ---- COUNT queries ----
  if (/SELECT COUNT\(\*\) AS count FROM patients/i.test(sql)) {
    return { data: [{ count: db.patients.length }] };
  }
  if (/SELECT COUNT\(\*\) AS count FROM appointments.*MONTH.*GETDATE/i.test(sql)) {
    const now = new Date();
    const count = db.appointments.filter(a => {
      const d = new Date(a.start_time);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return { data: [{ count }] };
  }
  if (/SELECT COUNT\(\*\) AS count FROM vw_OverdueInvoices/i.test(sql)) {
    return { data: [{ count: vw_OverdueInvoices().length }] };
  }
  if (/ISNULL\(SUM\(amount\), 0\) AS total FROM payments.*MONTH.*GETDATE/i.test(sql)) {
    const now = new Date();
    const total = db.payments
      .filter(p => {
        const d = new Date(p.payment_date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((s, p) => s + p.amount, 0);
    return { data: [{ total }] };
  }

  // ---- VIEW queries ----
  if (/FROM vw_AppointmentDetails/i.test(sql)) {
    let data = vw_AppointmentDetails();
    data.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    const topMatch = sql.match(/TOP (\d+)/i);
    if (topMatch) data = data.slice(0, parseInt(topMatch[1]));
    return { data };
  }
  if (/FROM vw_PatientOverview/i.test(sql)) {
    let data = vw_PatientOverview();
    data.sort((a, b) => b.patient_id - a.patient_id);
    return { data };
  }
  if (/FROM vw_TreatmentHistory/i.test(sql)) {
    let data = vw_TreatmentHistory(params.id);
    data.sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
    return { data };
  }
  if (/FROM vw_RevenueByDentist/i.test(sql)) {
    let data = vw_RevenueByDentist();
    if (/ORDER BY total_billed DESC/i.test(sql)) {
      data.sort((a, b) => b.total_billed - a.total_billed);
    }
    return { data };
  }
  if (/FROM vw_MonthlyRevenue/i.test(sql)) {
    return { data: vw_MonthlyRevenue() };
  }
  if (/FROM vw_OverdueInvoices/i.test(sql)) {
    let data = vw_OverdueInvoices();
    data.sort((a, b) => b.days_overdue - a.days_overdue);
    return { data };
  }

  // ---- sys.triggers (showcase) ----
  if (/sys\.triggers/i.test(sql)) {
    return {
      data: [
        { trigger_name: 'trg_PreventPastAppointment', table_name: 'appointments', trigger_type: 'INSTEAD_OF_INSERT', trigger_sql: 'CREATE TRIGGER trg_PreventPastAppointment ON appointments INSTEAD OF INSERT AS BEGIN IF EXISTS (SELECT 1 FROM inserted WHERE start_time < GETDATE()) BEGIN RAISERROR(\'Cannot book appointments in the past\', 16, 1); RETURN; END; INSERT INTO appointments SELECT * FROM inserted; END' },
        { trigger_name: 'trg_AutoSetDueDate', table_name: 'invoices', trigger_type: 'AFTER_INSERT', trigger_sql: 'CREATE TRIGGER trg_AutoSetDueDate ON invoices AFTER INSERT AS BEGIN UPDATE invoices SET due_date = DATEADD(DAY, 14, issued_date) WHERE id IN (SELECT id FROM inserted); END' },
        { trigger_name: 'trg_UpdateInvoiceStatus', table_name: 'payments', trigger_type: 'AFTER_INSERT', trigger_sql: 'CREATE TRIGGER trg_UpdateInvoiceStatus ON payments AFTER INSERT AS BEGIN UPDATE i SET status = \'paid\' FROM invoices i JOIN inserted ins ON i.id = ins.invoice_id WHERE (SELECT SUM(amount) FROM payments WHERE invoice_id = i.id) >= i.total_amount - ISNULL(i.discount, 0); END' },
        { trigger_name: 'trg_LogPatientDeletion', table_name: 'patients', trigger_type: 'AFTER_DELETE', trigger_sql: 'CREATE TRIGGER trg_LogPatientDeletion ON patients AFTER DELETE AS BEGIN INSERT INTO patient_audit_log (patient_id, first_name, last_name, action, deleted_at) SELECT id, first_name, last_name, \'DELETE\', GETDATE() FROM deleted; END' },
      ],
    };
  }

  // ---- sys.indexes (showcase) ----
  if (/sys\.indexes.*IX_/i.test(sql) && !/dm_db_index_usage_stats/i.test(sql)) {
    return {
      data: [
        { index_name: 'IX_appointments_dentist_id', table_name: 'appointments', column_name: 'dentist_id', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_appointments_patient_id', table_name: 'appointments', column_name: 'patient_id', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_appointments_start_time', table_name: 'appointments', column_name: 'start_time', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_invoices_patient_id', table_name: 'invoices', column_name: 'patient_id', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_invoices_status', table_name: 'invoices', column_name: 'status', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_payments_invoice_id', table_name: 'payments', column_name: 'invoice_id', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_treatments_visit_id', table_name: 'treatments', column_name: 'visit_id', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
        { index_name: 'IX_visits_patient_id', table_name: 'visits', column_name: 'patient_id', type_desc: 'NONCLUSTERED', is_unique: false, is_primary_key: false },
      ],
    };
  }

  // ---- sys.dm_db_index_usage_stats (showcase) ----
  if (/dm_db_index_usage_stats/i.test(sql)) {
    return {
      data: [
        { table_name: 'appointments', index_name: 'IX_appointments_start_time', user_seeks: 145, user_scans: 32, user_lookups: 0, user_updates: 28 },
        { table_name: 'appointments', index_name: 'IX_appointments_dentist_id', user_seeks: 89, user_scans: 15, user_lookups: 0, user_updates: 28 },
        { table_name: 'invoices', index_name: 'IX_invoices_patient_id', user_seeks: 67, user_scans: 8, user_lookups: 0, user_updates: 12 },
        { table_name: 'payments', index_name: 'IX_payments_invoice_id', user_seeks: 55, user_scans: 5, user_lookups: 0, user_updates: 10 },
        { table_name: 'treatments', index_name: 'IX_treatments_visit_id', user_seeks: 42, user_scans: 12, user_lookups: 0, user_updates: 8 },
        { table_name: 'visits', index_name: 'IX_visits_patient_id', user_seeks: 38, user_scans: 10, user_lookups: 0, user_updates: 6 },
      ],
    };
  }

  // ---- sys.database_principals (showcase DCL) ----
  if (/sys\.database_principals/i.test(sql) && !/sys\.database_permissions/i.test(sql)) {
    return {
      data: [
        { name: 'db_admin', type_desc: 'SQL_USER', roles: 'db_owner' },
        { name: 'dentist_user', type_desc: 'SQL_USER', roles: 'db_datareader' },
        { name: 'receptionist_user', type_desc: 'SQL_USER', roles: 'db_datareader' },
      ],
    };
  }

  // ---- sys.database_permissions (showcase DCL) ----
  if (/sys\.database_permissions/i.test(sql)) {
    return {
      data: [
        { grantee: 'db_admin', state_desc: 'GRANT', permission_name: 'SELECT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'db_admin', state_desc: 'GRANT', permission_name: 'INSERT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'db_admin', state_desc: 'GRANT', permission_name: 'UPDATE', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'db_admin', state_desc: 'GRANT', permission_name: 'DELETE', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'dentist_user', state_desc: 'GRANT', permission_name: 'SELECT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'dentist_user', state_desc: 'GRANT', permission_name: 'SELECT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'appointments' },
        { grantee: 'dentist_user', state_desc: 'GRANT', permission_name: 'INSERT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'visits' },
        { grantee: 'dentist_user', state_desc: 'GRANT', permission_name: 'UPDATE', class_desc: 'OBJECT_OR_COLUMN', object_name: 'visits' },
        { grantee: 'dentist_user', state_desc: 'DENY', permission_name: 'DELETE', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'receptionist_user', state_desc: 'GRANT', permission_name: 'SELECT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'patients' },
        { grantee: 'receptionist_user', state_desc: 'GRANT', permission_name: 'SELECT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'appointments' },
        { grantee: 'receptionist_user', state_desc: 'GRANT', permission_name: 'INSERT', class_desc: 'OBJECT_OR_COLUMN', object_name: 'appointments' },
        { grantee: 'receptionist_user', state_desc: 'DENY', permission_name: 'DELETE', class_desc: 'OBJECT_OR_COLUMN', object_name: 'invoices' },
      ],
    };
  }

  // ---- patient_audit_log ----
  if (/FROM patient_audit_log/i.test(sql)) {
    let data = [...db.patient_audit_log].sort((a, b) => b.id - a.id);
    const topMatch = sql.match(/TOP (\d+)/i);
    if (topMatch) data = data.slice(0, parseInt(topMatch[1]));
    return { data };
  }

  // ---- SELECT from users (dentists dropdown) ----
  if (/SELECT id, full_name FROM users WHERE role = 'dentist'/i.test(sql)) {
    const data = db.users
      .filter(u => u.role === 'dentist')
      .map(u => ({ id: u.id, full_name: u.full_name }))
      .sort((a, b) => a.full_name.localeCompare(b.full_name));
    return { data };
  }

  // ---- SELECT users with profiles (list) ----
  if (/FROM users u LEFT JOIN profiles p ON u\.id = p\.user_id/i.test(sql)) {
    let data = db.users.map(u => {
      const prof = db.profiles.find(p => p.user_id === u.id) || {};
      return { ...u, phone: prof.phone || null, avatar_url: prof.avatar_url || null, subscription_plan: prof.subscription_plan || null };
    });
    if (/WHERE u\.id = @id/i.test(sql)) {
      data = data.filter(u => u.id === params.id);
    }
    data.sort((a, b) => a.id - b.id);
    return { data };
  }

  // ---- SELECT patients list ----
  if (/SELECT id, first_name, last_name FROM patients/i.test(sql)) {
    const data = db.patients
      .map(p => ({ id: p.id, first_name: p.first_name, last_name: p.last_name }))
      .sort((a, b) => a.first_name.localeCompare(b.first_name));
    return { data };
  }

  // ---- SELECT * FROM patients WHERE id ----
  if (/SELECT \* FROM patients WHERE id = @id/i.test(sql)) {
    return { data: db.patients.filter(p => p.id === params.id) };
  }

  // ---- SELECT services (various) ----
  if (/SELECT id, name, duration_minutes FROM services/i.test(sql)) {
    const data = db.services
      .map(s => ({ id: s.id, name: s.name, duration_minutes: s.duration_minutes }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { data };
  }
  if (/SELECT id, name, default_cost FROM services/i.test(sql)) {
    const data = db.services
      .map(s => ({ id: s.id, name: s.name, default_cost: s.default_cost }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { data };
  }
  if (/SELECT DISTINCT category FROM services/i.test(sql)) {
    const cats = [...new Set(db.services.map(s => s.category))].sort();
    return { data: cats.map(c => ({ category: c })) };
  }
  if (/SELECT \* FROM services WHERE id = @id/i.test(sql)) {
    return { data: db.services.filter(s => s.id === params.id) };
  }
  if (/SELECT \* FROM services/i.test(sql)) {
    let data = [...db.services];
    if (params.cat) data = data.filter(s => s.category === params.cat);
    data.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    return { data };
  }

  // ---- SELECT appointments (scheduled) ----
  if (/FROM appointments WHERE status = 'scheduled'/i.test(sql)) {
    const data = db.appointments
      .filter(a => a.status === 'scheduled')
      .map(a => ({ id: a.id, title: a.title, start_time: a.start_time }))
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    return { data };
  }

  // ---- Visits list (JOIN) ----
  if (/FROM visits v\s.*JOIN patients p.*JOIN users u/i.test(sql) && /WHERE v\.id = @id/i.test(sql)) {
    const data = db.visits.filter(v => v.id === params.id).map(v => {
      const patient = db.patients.find(p => p.id === v.patient_id);
      const dentist = db.users.find(u => u.id === v.dentist_id);
      return { ...v, first_name: patient?.first_name, last_name: patient?.last_name, dentist_name: dentist?.full_name };
    });
    return { data };
  }
  if (/FROM visits v\s.*JOIN patients p.*JOIN users u/i.test(sql)) {
    const data = db.visits.map(v => {
      const patient = db.patients.find(p => p.id === v.patient_id);
      const dentist = db.users.find(u => u.id === v.dentist_id);
      return { ...v, first_name: patient?.first_name, last_name: patient?.last_name, dentist_name: dentist?.full_name };
    }).sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
    return { data };
  }

  // ---- SELECT patient_id FROM visits ----
  if (/SELECT patient_id FROM visits WHERE id = @id/i.test(sql)) {
    const v = db.visits.find(v => v.id === params.id);
    return { data: v ? [{ patient_id: v.patient_id }] : [] };
  }

  // ---- Treatments with teeth info ----
  if (/FROM treatments t JOIN services s.*WHERE t\.visit_id = @id/i.test(sql)) {
    const data = db.treatments.filter(t => t.visit_id === params.id).map(t => {
      const s = db.services.find(sv => sv.id === t.service_id);
      const teeth = db.treatment_teeth
        .filter(tt => tt.treatment_id === t.id)
        .map(tt => String(tt.tooth_number) + (tt.surface ? '-' + tt.surface : ''))
        .join(', ');
      return { ...t, service_name: s?.name, category: s?.category, teeth_info: teeth || null };
    });
    return { data };
  }

  // ---- Invoices list ----
  if (/FROM invoices i JOIN patients p.*ORDER BY i\.issued_date/i.test(sql)) {
    const data = db.invoices.map(i => {
      const patient = db.patients.find(p => p.id === i.patient_id);
      const totalPaid = db.payments.filter(pay => pay.invoice_id === i.id).reduce((s, pay) => s + pay.amount, 0);
      return { ...i, first_name: patient?.first_name, last_name: patient?.last_name, total_paid: totalPaid };
    }).sort((a, b) => new Date(b.issued_date) - new Date(a.issued_date));
    return { data };
  }

  // ---- SELECT invoice by id ----
  if (/SELECT \* FROM invoices WHERE id = @id/i.test(sql)) {
    return { data: db.invoices.filter(i => i.id === params.id) };
  }
  if (/SELECT id, status, total_amount, discount FROM invoices WHERE id = @id/i.test(sql)) {
    return { data: db.invoices.filter(i => i.id === params.id).map(i => ({ id: i.id, status: i.status, total_amount: i.total_amount, discount: i.discount })) };
  }
  if (/SELECT patient_id FROM invoices WHERE id = @id/i.test(sql)) {
    const inv = db.invoices.find(i => i.id === params.id);
    return { data: inv ? [{ patient_id: inv.patient_id }] : [] };
  }

  // ---- Visits without invoices ----
  if (/NOT IN \(SELECT visit_id FROM invoices\)/i.test(sql)) {
    const invoicedVisitIds = db.invoices.map(i => i.visit_id);
    const data = db.visits
      .filter(v => !invoicedVisitIds.includes(v.id))
      .map(v => {
        const patient = db.patients.find(p => p.id === v.patient_id);
        return { id: v.id, visit_date: v.visit_date, first_name: patient?.first_name, last_name: patient?.last_name };
      })
      .sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
    return { data };
  }

  // ---- Payments list ----
  if (/FROM payments pay\s+JOIN invoices i.*JOIN patients p/i.test(sql)) {
    const data = db.payments.map(pay => {
      const inv = db.invoices.find(i => i.id === pay.invoice_id);
      const patient = db.patients.find(p => p.id === pay.patient_id);
      return { ...pay, total_amount: inv?.total_amount, invoice_status: inv?.status, first_name: patient?.first_name, last_name: patient?.last_name };
    }).sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
    return { data };
  }

  // ---- Unpaid invoices for payment form ----
  if (/FROM invoices i JOIN patients p.*status != 'paid'.*status != 'cancelled'/i.test(sql)) {
    const data = db.invoices
      .filter(i => i.status !== 'paid' && i.status !== 'cancelled')
      .map(i => {
        const patient = db.patients.find(p => p.id === i.patient_id);
        const totalPaid = db.payments.filter(pay => pay.invoice_id === i.id).reduce((s, pay) => s + pay.amount, 0);
        return { id: i.id, total_amount: i.total_amount, status: i.status, first_name: patient?.first_name, last_name: patient?.last_name, total_paid: totalPaid };
      })
      .sort((a, b) => a.id - b.id);
    return { data };
  }

  // ---- INSERT INTO patients ----
  if (/INSERT INTO patients/i.test(sql)) {
    const id = nextId('patients');
    db.patients.push({
      id, dentist_id: params.dentist_id, first_name: params.first_name, last_name: params.last_name,
      phone: params.phone, email: params.email, date_of_birth: params.dob, gender: params.gender, notes: params.notes,
    });
    return { data: [], rowsAffected: [1] };
  }

  // ---- UPDATE patients ----
  if (/UPDATE patients SET/i.test(sql)) {
    const p2 = db.patients.find(pt => pt.id === params.id);
    if (p2) {
      p2.dentist_id = params.dentist_id; p2.first_name = params.first_name; p2.last_name = params.last_name;
      p2.phone = params.phone; p2.email = params.email; p2.date_of_birth = params.dob; p2.gender = params.gender; p2.notes = params.notes;
    }
    return { data: [], rowsAffected: [p2 ? 1 : 0] };
  }

  // ---- DELETE FROM medical_history ----
  if (/DELETE FROM medical_history WHERE patient_id = @id/i.test(sql)) {
    const before = db.medical_history.length;
    db.medical_history = db.medical_history.filter(m => m.patient_id !== params.id);
    return { data: [], rowsAffected: [before - db.medical_history.length] };
  }

  // ---- DELETE FROM treatment_teeth (cascade) ----
  if (/DELETE FROM treatment_teeth WHERE treatment_id IN/i.test(sql)) {
    const treatIds = db.treatments.filter(t => t.patient_id === params.id).map(t => t.id);
    const before = db.treatment_teeth.length;
    db.treatment_teeth = db.treatment_teeth.filter(tt => !treatIds.includes(tt.treatment_id));
    return { data: [], rowsAffected: [before - db.treatment_teeth.length] };
  }

  // ---- DELETE FROM treatments ----
  if (/DELETE FROM treatments WHERE patient_id = @id/i.test(sql)) {
    const before = db.treatments.length;
    db.treatments = db.treatments.filter(t => t.patient_id !== params.id);
    return { data: [], rowsAffected: [before - db.treatments.length] };
  }

  // ---- DELETE FROM payments (by patient) ----
  if (/DELETE FROM payments WHERE patient_id = @id/i.test(sql)) {
    const before = db.payments.length;
    db.payments = db.payments.filter(p => p.patient_id !== params.id);
    return { data: [], rowsAffected: [before - db.payments.length] };
  }

  // ---- DELETE FROM invoices (by patient) ----
  if (/DELETE FROM invoices WHERE patient_id = @id/i.test(sql)) {
    const before = db.invoices.length;
    db.invoices = db.invoices.filter(i => i.patient_id !== params.id);
    return { data: [], rowsAffected: [before - db.invoices.length] };
  }

  // ---- DELETE FROM visits (by patient) ----
  if (/DELETE FROM visits WHERE patient_id = @id/i.test(sql)) {
    const before = db.visits.length;
    db.visits = db.visits.filter(v => v.patient_id !== params.id);
    return { data: [], rowsAffected: [before - db.visits.length] };
  }

  // ---- DELETE FROM appointments (by patient or by id) ----
  if (/DELETE FROM appointments WHERE patient_id = @id/i.test(sql)) {
    const before = db.appointments.length;
    db.appointments = db.appointments.filter(a => a.patient_id !== params.id);
    return { data: [], rowsAffected: [before - db.appointments.length] };
  }
  if (/DELETE FROM appointments WHERE id = @id/i.test(sql)) {
    const before = db.appointments.length;
    db.appointments = db.appointments.filter(a => a.id !== params.id);
    return { data: [], rowsAffected: [before - db.appointments.length] };
  }

  // ---- DELETE FROM patients (triggers audit log) ----
  if (/DELETE FROM patients WHERE id = @id/i.test(sql)) {
    const patient = db.patients.find(p => p.id === params.id);
    if (patient) {
      triggerLogPatientDeletion(patient);
      db.patients = db.patients.filter(p => p.id !== params.id);
    }
    return { data: [], rowsAffected: [patient ? 1 : 0] };
  }

  // ---- INSERT INTO medical_history ----
  if (/INSERT INTO medical_history/i.test(sql)) {
    const id = nextId('medical_history');
    db.medical_history.push({ id, patient_id: params.pid, condition_type: params.type, description: params.desc });
    return { data: [], rowsAffected: [1] };
  }

  // ---- INSERT INTO users (OUTPUT INSERTED.id) ----
  if (/INSERT INTO users/i.test(sql)) {
    const id = nextId('users');
    db.users.push({ id, full_name: params.name, email: params.email, role: params.role });
    return { data: [{ id }], rowsAffected: [1] };
  }

  // ---- UPDATE users ----
  if (/UPDATE users SET/i.test(sql)) {
    const u = db.users.find(u => u.id === params.id);
    if (u) { u.full_name = params.name; u.email = params.email; u.role = params.role; }
    return { data: [], rowsAffected: [u ? 1 : 0] };
  }

  // ---- DELETE FROM profiles ----
  if (/DELETE FROM profiles WHERE user_id = @id/i.test(sql)) {
    const before = db.profiles.length;
    db.profiles = db.profiles.filter(p => p.user_id !== params.id);
    return { data: [], rowsAffected: [before - db.profiles.length] };
  }

  // ---- DELETE FROM users ----
  if (/DELETE FROM users WHERE id = @id/i.test(sql)) {
    const before = db.users.length;
    db.users = db.users.filter(u => u.id !== params.id);
    return { data: [], rowsAffected: [before - db.users.length] };
  }

  // ---- INSERT INTO profiles ----
  if (/INSERT INTO profiles/i.test(sql)) {
    db.profiles.push({ user_id: params.uid, phone: params.phone, avatar_url: null, subscription_plan: params.plan });
    return { data: [], rowsAffected: [1] };
  }

  // ---- UPDATE profiles ----
  if (/UPDATE profiles SET/i.test(sql)) {
    const prof = db.profiles.find(p => p.user_id === params.id);
    if (prof) { prof.phone = params.phone; prof.subscription_plan = params.plan; }
    return { data: [], rowsAffected: [prof ? 1 : 0] };
  }

  // ---- INSERT INTO services ----
  if (/INSERT INTO services/i.test(sql)) {
    const id = nextId('services');
    db.services.push({ id, name: params.name, category: params.cat, default_cost: params.cost, duration_minutes: params.dur, description: params.desc });
    return { data: [], rowsAffected: [1] };
  }

  // ---- UPDATE services ----
  if (/UPDATE services SET/i.test(sql)) {
    const s = db.services.find(s => s.id === params.id);
    if (s) { s.name = params.name; s.category = params.cat; s.default_cost = params.cost; s.duration_minutes = params.dur; s.description = params.desc; }
    return { data: [], rowsAffected: [s ? 1 : 0] };
  }

  // ---- DELETE FROM services ----
  if (/DELETE FROM services WHERE id = @id/i.test(sql)) {
    const before = db.services.length;
    db.services = db.services.filter(s => s.id !== params.id);
    return { data: [], rowsAffected: [before - db.services.length] };
  }

  // ---- INSERT INTO appointments (trigger: prevent past) ----
  if (/INSERT INTO appointments/i.test(sql)) {
    const row = {
      dentist_id: params.did, patient_id: params.pid, service_id: params.sid,
      title: params.title, start_time: params.start, end_time: params.end, notes: params.notes,
    };
    triggerPreventPastAppointment(row);
    const id = nextId('appointments');
    db.appointments.push({ id, ...row, status: 'scheduled' });
    return { data: [{ id }], rowsAffected: [1] };
  }

  // ---- INSERT INTO visits ----
  if (/INSERT INTO visits/i.test(sql)) {
    const id = nextId('visits');
    db.visits.push({
      id, patient_id: params.pid, dentist_id: params.did, appointment_id: params.aid,
      visit_date: params.vdate, chief_complaint: params.complaint, diagnosis: params.diag, status: 'in_progress',
    });
    return { data: [], rowsAffected: [1] };
  }

  // ---- UPDATE visits ----
  if (/UPDATE visits SET/i.test(sql)) {
    const v = db.visits.find(v => v.id === params.id);
    if (v) { v.chief_complaint = params.complaint; v.diagnosis = params.diag; v.status = params.status; }
    return { data: [], rowsAffected: [v ? 1 : 0] };
  }

  // ---- INSERT INTO treatments (OUTPUT INSERTED.id) ----
  if (/INSERT INTO treatments/i.test(sql)) {
    const id = nextId('treatments');
    db.treatments.push({
      id, visit_id: params.vid, patient_id: params.pid, service_id: params.sid,
      cost: params.cost, status: 'planned', notes: params.notes,
    });
    return { data: [{ id }], rowsAffected: [1] };
  }

  // ---- INSERT INTO treatment_teeth ----
  if (/INSERT INTO treatment_teeth/i.test(sql)) {
    const id = nextId('treatment_teeth');
    db.treatment_teeth.push({ id, treatment_id: params.tid, tooth_number: params.tooth, surface: params.surf });
    return { data: [], rowsAffected: [1] };
  }

  // ---- INSERT INTO payments (trigger: update invoice status) ----
  if (/INSERT INTO payments/i.test(sql)) {
    const id = nextId('payments');
    db.payments.push({
      id, invoice_id: params.iid, patient_id: params.pid,
      amount: params.amt, method: params.method, notes: params.notes,
      payment_date: new Date(),
    });
    triggerUpdateInvoiceStatus(params.iid);
    return { data: [], rowsAffected: [1] };
  }

  // ---- Fallback ----
  console.warn('[In-Memory DB] Unhandled query:', sql);
  return { data: [] };
}

module.exports = { runQuery, runProcedure };
