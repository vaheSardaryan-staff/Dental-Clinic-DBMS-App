# DoQ Dental Clinic - Database Management System

A full-stack web application for managing a dental clinic, built to demonstrate practical database modeling, design, and implementation skills. The application showcases advanced SQL Server features including views, triggers, stored procedures, indexes, and access control — all visible in real-time through an interactive SQL query panel.

> **Course:** Database Modeling and Implementation

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Node.js, Express.js                 |
| Frontend   | EJS Templates, Tailwind CSS         |
| Database   | Microsoft SQL Server (MSSQL)        |
| Charts     | Chart.js                            |
| SQL Viewer | Prism.js (syntax highlighting)      |

---

## Database Features Implemented

### Views (6)

| View Name              | Description                                          |
|------------------------|------------------------------------------------------|
| `vw_PatientOverview`   | Patients with assigned dentist names and alert counts |
| `vw_AppointmentDetails`| Appointments with patient, dentist, and service names |
| `vw_TreatmentHistory`  | Treatment records with service details                |
| `vw_RevenueByDentist`  | Aggregated billing revenue per dentist                |
| `vw_MonthlyRevenue`    | Monthly revenue trends                                |
| `vw_OverdueInvoices`   | Overdue invoices with DATEDIFF calculations           |

### Triggers (4)

| Trigger Name                 | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `trg_UpdateInvoiceStatus`    | Auto-sets invoice status to 'paid' when payment covers total |
| `trg_PreventPastAppointment` | INSTEAD OF INSERT — blocks booking appointments in the past  |
| `trg_LogPatientDeletion`     | Logs deleted patient records to `patient_audit_log`          |
| `trg_AutoSetDueDate`         | Auto-sets invoice due date to 14 days after issued date      |

### Stored Procedures (5)

| Procedure Name          | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| `sp_BookAppointment`    | Validates dentist/patient, checks time overlaps, books appointment |
| `sp_CancelAppointment`  | Validates status and marks appointment as cancelled           |
| `sp_GenerateInvoice`    | Sums treatment costs from a visit and creates an invoice      |
| `sp_MonthlyReport`      | Returns 3 result sets: revenue, appointments, new patients    |
| `sp_GetPatientSummary`  | Returns 4 result sets: demographics, visits, financial, alerts|

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

| Database User        | Permissions                                                       |
|----------------------|-------------------------------------------------------------------|
| `db_admin`           | Full control (`db_owner` role)                                    |
| `dentist_user`       | SELECT, INSERT, UPDATE on patient tables; DENY DELETE             |
| `receptionist_user`  | SELECT, INSERT, UPDATE on appointments/invoices/payments; restricted access |

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
│   └── db.js                 # SQL Server connection pool
├── helpers/
│   └── queryRunner.js        # Query & procedure execution with metadata
├── routes/
│   ├── dashboard.js          # Dashboard with stats and charts
│   ├── patients.js           # Patient CRUD + medical history
│   ├── users.js              # Staff management
│   ├── services.js           # Dental services catalog
│   ├── appointments.js       # Booking with stored procedures
│   ├── visits.js             # Visit and treatment management
│   ├── billing.js            # Invoices and payments
│   ├── reports.js            # Revenue and monthly reports
│   └── showcase.js           # Database feature showcase (triggers, indexes, DCL)
├── views/
│   ├── layout.ejs            # Master layout with SQL panel
│   ├── partials/             # Navbar, sidebar, SQL panel
│   ├── dashboard.ejs         # Stats cards and charts
│   ├── patients/             # Patient views (list, form, detail)
│   ├── users/                # Staff views
│   ├── services/             # Services views
│   ├── appointments/         # Appointment views
│   ├── visits/               # Visit and treatment views
│   ├── billing/              # Invoice and payment views
│   ├── reports/              # Report views
│   └── showcase/             # Trigger, index, DCL showcase pages
├── public/
│   ├── css/custom.css        # Custom styles
│   └── js/app.js             # Client-side JS
├── server.js                 # Application entry point
├── package.json
└── .gitignore
```

---

## Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v16 or higher) — [Download](https://nodejs.org/)
2. **Microsoft SQL Server** — [Download SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
3. **SQL Server Management Studio (SSMS)** or **Azure Data Studio** — to run the database setup scripts

---

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Open SSMS or Azure Data Studio and run the SQL scripts to:

1. Create the database `doq_db`
2. Create all 12 tables
3. Create views, triggers, stored procedures, and indexes
4. Insert sample data (40+ records per table)
5. Set up DCL users and permissions

> If the SQL scripts are provided separately (e.g., in a `sql/` folder or the project report), run them in order.

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=doq_db
DB_USER=sa
DB_PASSWORD=your_password_here
PORT=3000
```

### 5. Start the application

```bash
npm start
```

Or for development:

```bash
node server.js
```

### 6. Open in browser

```
http://localhost:3000
```

---

## Application Features

- **Dashboard** — Overview stats, revenue charts, recent appointments
- **Patient Management** — Full CRUD with medical history and alerts
- **Appointment Booking** — Uses stored procedures with time overlap validation
- **Visit & Treatment Tracking** — Record treatments with specific tooth/surface data
- **Billing System** — Invoice generation, payments, overdue tracking with triggers
- **Reports** — Revenue by dentist, monthly trends, comprehensive monthly reports
- **Role Simulation** — Switch between admin, dentist, and receptionist views
- **SQL Query Panel** — Every page displays the actual SQL queries executed, with timing and row counts
- **Database Showcase** — Dedicated pages to explore triggers, indexes, and DCL configurations

---

## Query Patterns Used

- Parameterized queries (`@param`)
- INNER JOIN, LEFT JOIN across related tables
- Aggregate functions: `COUNT`, `SUM`, `ISNULL`
- `STRING_AGG` for combining tooth data
- Subqueries for payment totals
- Date functions: `GETDATE()`, `DATEDIFF`, `MONTH`, `YEAR`
- System catalog queries: `sys.triggers`, `sys.indexes`, `sys.database_principals`
