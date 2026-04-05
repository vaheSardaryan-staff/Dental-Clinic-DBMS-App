# Dental Clinic - Database Management System

A full-stack web application for managing a dental clinic, built to demonstrate practical database modeling, design, and implementation skills. The application showcases SQL concepts including views, triggers, stored procedures, indexes, and access control — all visible in real-time through an interactive SQL query panel.

The data layer uses an **in-memory store** with full seed data (no external database required), while preserving the SQL query patterns and metadata displayed in the UI.

> **Course:** Database Modeling and Implementation

---

## Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Backend     | Node.js, Express.js            |
| Frontend    | EJS Templates, Tailwind CSS    |
| Data Layer  | In-memory store (seed data)    |
| Charts      | Chart.js                       |
| SQL Viewer  | Prism.js (syntax highlighting) |

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher) — [Download](https://nodejs.org/)

No database installation is required — the app runs entirely with an in-memory data store seeded on startup.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the application

```bash
npm start
```

Or for development (auto-restart on file changes):

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## Application Features

- **Dashboard** — Overview stats, revenue charts, recent appointments
- **Patient Management** — Full CRUD with medical history and alerts
- **Appointment Booking** — Uses stored procedure logic with time overlap validation
- **Visit & Treatment Tracking** — Record treatments with specific tooth/surface data
- **Billing System** — Invoice generation, payments, overdue tracking with trigger logic
- **Reports** — Revenue by dentist, monthly trends, comprehensive monthly reports
- **Role Simulation** — Switch between admin, dentist, and receptionist views via the navbar
- **SQL Query Panel** — Every page displays the SQL queries that *would* be executed, with timing and row counts
- **Database Showcase** — Dedicated pages to explore triggers, indexes, and DCL configurations

---

## Database Concepts Demonstrated

### Views (6)

| View Name               | Description                                          |
|--------------------------|------------------------------------------------------|
| `vw_PatientOverview`     | Patients with assigned dentist names and alert counts |
| `vw_AppointmentDetails`  | Appointments with patient, dentist, and service names |
| `vw_TreatmentHistory`    | Treatment records with service details                |
| `vw_RevenueByDentist`    | Aggregated billing revenue per dentist                |
| `vw_MonthlyRevenue`      | Monthly revenue trends                                |
| `vw_OverdueInvoices`     | Overdue invoices with DATEDIFF calculations           |

### Triggers (4)

| Trigger Name                  | Description                                                  |
|-------------------------------|--------------------------------------------------------------|
| `trg_UpdateInvoiceStatus`     | Auto-sets invoice status to 'paid' when payment covers total |
| `trg_PreventPastAppointment`  | INSTEAD OF INSERT — blocks booking appointments in the past  |
| `trg_LogPatientDeletion`      | Logs deleted patient records to `patient_audit_log`          |
| `trg_AutoSetDueDate`          | Auto-sets invoice due date to 14 days after issued date      |

### Stored Procedures (5)

| Procedure Name           | Description                                                        |
|--------------------------|--------------------------------------------------------------------|
| `sp_BookAppointment`     | Validates dentist/patient, checks time overlaps, books appointment |
| `sp_CancelAppointment`   | Validates status and marks appointment as cancelled                |
| `sp_GenerateInvoice`     | Sums treatment costs from a visit and creates an invoice           |
| `sp_MonthlyReport`       | Returns 3 result sets: revenue, appointments, new patients         |
| `sp_GetPatientSummary`   | Returns 4 result sets: demographics, visits, financial, alerts     |

### Indexes (11)

Optimized indexes on frequently queried columns:

- `IX_patients_dentist` — patients by dentist
- `IX_appointments_patient` — appointments by patient
- `IX_appointments_dentist` — appointments by dentist
- `IX_appointments_start` — appointments by start time
- `IX_invoices_status` — invoices by status
- `IX_payments_invoice` — payments by invoice
- `IX_treatments_visit` — treatments by visit
- `IX_treatment_teeth_treat` — treatment teeth by treatment
- And more...

### DCL — Access Control (3 Roles)

| Database User          | Permissions                                                                    |
|------------------------|--------------------------------------------------------------------------------|
| `db_admin`             | Full control (`db_owner` role)                                                 |
| `dentist_user`         | SELECT, INSERT, UPDATE on patient tables; DENY DELETE                          |
| `receptionist_user`    | SELECT, INSERT, UPDATE on appointments/invoices/payments; restricted access    |

---

## Database Entities (12 Tables)

| Table              | Description                              |
|--------------------|------------------------------------------|
| `patients`         | Patient personal information             |
| `users`            | Staff members (dentists, admins, etc.)   |
| `profiles`         | Extended user profile info               |
| `services`         | Dental services catalog                  |
| `appointments`     | Scheduled appointments                   |
| `visits`           | Completed clinic visits                  |
| `treatments`       | Treatments performed during visits       |
| `treatment_teeth`  | Specific teeth and surfaces treated      |
| `medical_history`  | Patient medical alerts and conditions    |
| `invoices`         | Billing invoices                         |
| `payments`         | Payment records                          |
| `patient_audit_log`| Audit trail for deleted patients         |

---

## Project Structure

```
website/
├── config/
│   └── db.js                 # SQL Server connection config (reference)
├── helpers/
│   └── queryRunner.js        # In-memory data store, seed data, query & procedure execution
├── routes/
│   ├── dashboard.js          # Dashboard with stats and charts
│   ├── patients.js           # Patient CRUD + medical history
│   ├── users.js              # Staff management
│   ├── services.js           # Dental services catalog
│   ├── appointments.js       # Booking with stored procedure logic
│   ├── visits.js             # Visit and treatment management
│   ├── billing.js            # Invoices and payments
│   ├── reports.js            # Revenue and monthly reports
│   └── showcase.js           # Database feature showcase (triggers, indexes, DCL)
├── views/
│   ├── layout.ejs            # Master layout with SQL panel
│   ├── partials/
│   │   ├── navbar.ejs        # Top navigation with role selector
│   │   ├── sidebar.ejs       # Left sidebar navigation
│   │   └── sql-panel.ejs     # Slide-over SQL query viewer
│   ├── dashboard.ejs         # Stats cards and charts
│   ├── patients/             # Patient views (list, form, detail)
│   ├── users/                # Staff views (list, form)
│   ├── services/             # Services views (list, form)
│   ├── appointments/         # Appointment views (list, form)
│   ├── visits/               # Visit and treatment views (list, form, detail)
│   ├── billing/              # Invoice and payment views
│   ├── reports/              # Report views (index, revenue, monthly)
│   ├── showcase/             # Trigger, index, DCL showcase pages
│   └── error.ejs             # Error page
├── public/
│   ├── css/custom.css        # Custom styles
│   └── js/app.js             # Client-side JS (filtering, Prism highlighting)
├── server.js                 # Application entry point
├── package.json
└── .gitignore
```

---

## Query Patterns Demonstrated

- Parameterized queries (`@param`)
- INNER JOIN, LEFT JOIN across related tables
- Aggregate functions: `COUNT`, `SUM`, `ISNULL`
- `STRING_AGG` for combining tooth data
- Subqueries for payment totals
- Date functions: `GETDATE()`, `DATEDIFF`, `MONTH`, `YEAR`
- System catalog queries: `sys.triggers`, `sys.indexes`, `sys.database_principals`
