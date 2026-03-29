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
  // =============================================
  // 1. USERS (45 rows)
  // =============================================
  db.users = [
    { id: 1,  full_name: 'Dr. Armen Petrosyan',     email: 'armen.petrosyan@dental.am',    role: 'dentist' },
    { id: 2,  full_name: 'Dr. Ani Hakobyan',        email: 'ani.hakobyan@dental.am',       role: 'dentist' },
    { id: 3,  full_name: 'Dr. Varduhi Grigoryan',   email: 'varduhi.grigoryan@dental.am',  role: 'dentist' },
    { id: 4,  full_name: 'Dr. Tigran Sargsyan',     email: 'tigran.sargsyan@dental.am',    role: 'dentist' },
    { id: 5,  full_name: 'Dr. Narine Hovhannisyan', email: 'narine.hovhannisyan@dental.am',role: 'dentist' },
    { id: 6,  full_name: 'Dr. Gevorg Mkrtchyan',    email: 'gevorg.mkrtchyan@dental.am',   role: 'dentist' },
    { id: 7,  full_name: 'Dr. Lusine Avagyan',      email: 'lusine.avagyan@dental.am',     role: 'dentist' },
    { id: 8,  full_name: 'Dr. Hayk Danielyan',      email: 'hayk.danielyan@dental.am',     role: 'dentist' },
    { id: 9,  full_name: 'Mariam Asatryan',         email: 'mariam.asatryan@dental.am',    role: 'assistant' },
    { id: 10, full_name: 'Sona Karapetyan',         email: 'sona.karapetyan@dental.am',    role: 'assistant' },
    { id: 11, full_name: 'Lilit Abrahamyan',        email: 'lilit.abrahamyan@dental.am',   role: 'assistant' },
    { id: 12, full_name: 'Narek Galstyan',          email: 'narek.galstyan@dental.am',     role: 'assistant' },
    { id: 13, full_name: 'Anna Baghdasaryan',       email: 'anna.baghdasaryan@dental.am',  role: 'assistant' },
    { id: 14, full_name: 'Karen Hovhannisyan',      email: 'karen.hovhannisyan@dental.am', role: 'assistant' },
    { id: 15, full_name: 'Tatevik Simonyan',        email: 'tatevik.simonyan@dental.am',   role: 'assistant' },
    { id: 16, full_name: 'Arpi Nazaryan',           email: 'arpi.nazaryan@dental.am',      role: 'assistant' },
    { id: 17, full_name: 'Admin Vardanyan',         email: 'admin1@dental.am',             role: 'admin' },
    { id: 18, full_name: 'Admin Petrosyan',         email: 'admin2@dental.am',             role: 'admin' },
    { id: 19, full_name: 'Dr. Mane Ghazaryan',      email: 'mane.ghazaryan@dental.am',    role: 'dentist' },
    { id: 20, full_name: 'Dr. Artak Martirosyan',   email: 'artak.martirosyan@dental.am', role: 'dentist' },
    { id: 21, full_name: 'Dr. Silva Stepanyan',     email: 'silva.stepanyan@dental.am',   role: 'dentist' },
    { id: 22, full_name: 'Dr. Davit Harutyunyan',   email: 'davit.harutyunyan@dental.am', role: 'dentist' },
    { id: 23, full_name: 'Kristine Poghosyan',      email: 'kristine.poghosyan@dental.am',role: 'assistant' },
    { id: 24, full_name: 'Ruzanna Melkonyan',       email: 'ruzanna.melkonyan@dental.am', role: 'assistant' },
    { id: 25, full_name: 'Ashot Grigoryan',         email: 'ashot.grigoryan@dental.am',   role: 'assistant' },
    { id: 26, full_name: 'Nvard Khachaturyan',      email: 'nvard.khachaturyan@dental.am',role: 'assistant' },
    { id: 27, full_name: 'Dr. Aram Musheghyan',     email: 'aram.musheghyan@dental.am',   role: 'dentist' },
    { id: 28, full_name: 'Dr. Gayane Avetisyan',    email: 'gayane.avetisyan@dental.am',  role: 'dentist' },
    { id: 29, full_name: 'Gohar Ohanyan',           email: 'gohar.ohanyan@dental.am',     role: 'assistant' },
    { id: 30, full_name: 'Tigran Zakharyan',        email: 'tigran.zakharyan@dental.am',  role: 'assistant' },
    { id: 31, full_name: 'Dr. Hripsime Grigoryan',  email: 'hripsime.grigoryan@dental.am',role: 'dentist' },
    { id: 32, full_name: 'Dr. Levon Barseghyan',    email: 'levon.barseghyan@dental.am',  role: 'dentist' },
    { id: 33, full_name: 'Anahit Karapetyan',       email: 'anahit.karapetyan@dental.am', role: 'assistant' },
    { id: 34, full_name: 'Vahan Sargsyan',          email: 'vahan.sargsyan@dental.am',    role: 'assistant' },
    { id: 35, full_name: 'Dr. Nona Davtyan',        email: 'nona.davtyan@dental.am',      role: 'dentist' },
    { id: 36, full_name: 'Dr. Arsen Petrosyan',     email: 'arsen.petrosyan@dental.am',   role: 'dentist' },
    { id: 37, full_name: 'Liana Hovhannisyan',      email: 'liana.hovhannisyan@dental.am',role: 'assistant' },
    { id: 38, full_name: 'Hasmik Mkrtchyan',        email: 'hasmik.mkrtchyan@dental.am',  role: 'assistant' },
    { id: 39, full_name: 'Admin Simonyan',          email: 'admin3@dental.am',            role: 'admin' },
    { id: 40, full_name: 'Dr. Ani Gevorgyan',       email: 'ani.gevorgyan@dental.am',     role: 'dentist' },
    { id: 41, full_name: 'Dr. Samvel Nalbandyan',   email: 'samvel.nalbandyan@dental.am', role: 'dentist' },
    { id: 42, full_name: 'Marine Asatryan',         email: 'marine.asatryan@dental.am',   role: 'assistant' },
    { id: 43, full_name: 'Arman Hakobyan',          email: 'arman.hakobyan@dental.am',    role: 'assistant' },
    { id: 44, full_name: 'Dr. Elina Vardanyan',     email: 'elina.vardanyan@dental.am',   role: 'dentist' },
    { id: 45, full_name: 'Dr. Raffi Danielyan',     email: 'raffi.danielyan@dental.am',   role: 'dentist' },
  ];
  _nextId['users'] = 46;

  // =============================================
  // 2. PROFILES (45 rows)
  // =============================================
  db.profiles = [
    { user_id: 1,  phone: '+374 91 100001', avatar_url: 'https://cdn.dental.am/avatars/1.jpg',  subscription_plan: 'pro' },
    { user_id: 2,  phone: '+374 91 100002', avatar_url: 'https://cdn.dental.am/avatars/2.jpg',  subscription_plan: 'pro' },
    { user_id: 3,  phone: '+374 91 100003', avatar_url: 'https://cdn.dental.am/avatars/3.jpg',  subscription_plan: 'basic' },
    { user_id: 4,  phone: '+374 91 100004', avatar_url: 'https://cdn.dental.am/avatars/4.jpg',  subscription_plan: 'pro' },
    { user_id: 5,  phone: '+374 91 100005', avatar_url: 'https://cdn.dental.am/avatars/5.jpg',  subscription_plan: 'enterprise' },
    { user_id: 6,  phone: '+374 91 100006', avatar_url: 'https://cdn.dental.am/avatars/6.jpg',  subscription_plan: 'basic' },
    { user_id: 7,  phone: '+374 91 100007', avatar_url: 'https://cdn.dental.am/avatars/7.jpg',  subscription_plan: 'pro' },
    { user_id: 8,  phone: '+374 91 100008', avatar_url: 'https://cdn.dental.am/avatars/8.jpg',  subscription_plan: 'basic' },
    { user_id: 9,  phone: '+374 93 200001', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 10, phone: '+374 93 200002', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 11, phone: '+374 93 200003', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 12, phone: '+374 93 200004', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 13, phone: '+374 93 200005', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 14, phone: '+374 93 200006', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 15, phone: '+374 93 200007', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 16, phone: '+374 93 200008', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 17, phone: '+374 77 300001', avatar_url: null, subscription_plan: 'enterprise' },
    { user_id: 18, phone: '+374 77 300002', avatar_url: null, subscription_plan: 'enterprise' },
    { user_id: 19, phone: '+374 91 100019', avatar_url: 'https://cdn.dental.am/avatars/19.jpg', subscription_plan: 'pro' },
    { user_id: 20, phone: '+374 91 100020', avatar_url: 'https://cdn.dental.am/avatars/20.jpg', subscription_plan: 'basic' },
    { user_id: 21, phone: '+374 91 100021', avatar_url: 'https://cdn.dental.am/avatars/21.jpg', subscription_plan: 'pro' },
    { user_id: 22, phone: '+374 91 100022', avatar_url: 'https://cdn.dental.am/avatars/22.jpg', subscription_plan: 'pro' },
    { user_id: 23, phone: '+374 93 200023', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 24, phone: '+374 93 200024', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 25, phone: '+374 93 200025', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 26, phone: '+374 93 200026', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 27, phone: '+374 91 100027', avatar_url: 'https://cdn.dental.am/avatars/27.jpg', subscription_plan: 'pro' },
    { user_id: 28, phone: '+374 91 100028', avatar_url: 'https://cdn.dental.am/avatars/28.jpg', subscription_plan: 'basic' },
    { user_id: 29, phone: '+374 93 200029', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 30, phone: '+374 93 200030', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 31, phone: '+374 91 100031', avatar_url: 'https://cdn.dental.am/avatars/31.jpg', subscription_plan: 'enterprise' },
    { user_id: 32, phone: '+374 91 100032', avatar_url: 'https://cdn.dental.am/avatars/32.jpg', subscription_plan: 'pro' },
    { user_id: 33, phone: '+374 93 200033', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 34, phone: '+374 93 200034', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 35, phone: '+374 91 100035', avatar_url: 'https://cdn.dental.am/avatars/35.jpg', subscription_plan: 'basic' },
    { user_id: 36, phone: '+374 91 100036', avatar_url: 'https://cdn.dental.am/avatars/36.jpg', subscription_plan: 'pro' },
    { user_id: 37, phone: '+374 93 200037', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 38, phone: '+374 93 200038', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 39, phone: '+374 77 300039', avatar_url: null, subscription_plan: 'enterprise' },
    { user_id: 40, phone: '+374 91 100040', avatar_url: 'https://cdn.dental.am/avatars/40.jpg', subscription_plan: 'pro' },
    { user_id: 41, phone: '+374 91 100041', avatar_url: 'https://cdn.dental.am/avatars/41.jpg', subscription_plan: 'basic' },
    { user_id: 42, phone: '+374 93 200042', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 43, phone: '+374 93 200043', avatar_url: null, subscription_plan: 'basic' },
    { user_id: 44, phone: '+374 91 100044', avatar_url: 'https://cdn.dental.am/avatars/44.jpg', subscription_plan: 'pro' },
    { user_id: 45, phone: '+374 91 100045', avatar_url: 'https://cdn.dental.am/avatars/45.jpg', subscription_plan: 'pro' },
  ];

  // =============================================
  // 3. PATIENTS (45 rows)
  // =============================================
  db.patients = [
    { id: 1,  dentist_id: 1, first_name: 'Mher',      last_name: 'Petrosyan',    phone: '+374 99 501001', email: 'mher.p@mail.am',      date_of_birth: '1990-03-14', gender: 'male',   notes: null },
    { id: 2,  dentist_id: 1, first_name: 'Anahit',    last_name: 'Sargsyan',     phone: '+374 99 501002', email: 'anahit.s@mail.am',    date_of_birth: '1985-07-22', gender: 'female', notes: 'Sensitive gums' },
    { id: 3,  dentist_id: 1, first_name: 'Davit',     last_name: 'Ghazaryan',    phone: '+374 99 501003', email: 'davit.g@mail.am',     date_of_birth: '1978-11-05', gender: 'male',   notes: null },
    { id: 4,  dentist_id: 2, first_name: 'Lena',      last_name: 'Harutyunyan',  phone: '+374 99 501004', email: 'lena.h@mail.am',      date_of_birth: '1995-01-30', gender: 'female', notes: null },
    { id: 5,  dentist_id: 2, first_name: 'Gor',       last_name: 'Mkrtchyan',    phone: '+374 99 501005', email: 'gor.m@mail.am',       date_of_birth: '1988-09-18', gender: 'male',   notes: 'Bruxism' },
    { id: 6,  dentist_id: 2, first_name: 'Seda',      last_name: 'Karapetyan',   phone: '+374 99 501006', email: 'seda.k@mail.am',      date_of_birth: '1972-04-27', gender: 'female', notes: null },
    { id: 7,  dentist_id: 3, first_name: 'Artur',     last_name: 'Hovhannisyan', phone: '+374 99 501007', email: 'artur.h@mail.am',     date_of_birth: '1993-06-12', gender: 'male',   notes: null },
    { id: 8,  dentist_id: 3, first_name: 'Nune',      last_name: 'Poghosyan',    phone: '+374 99 501008', email: 'nune.p@mail.am',      date_of_birth: '1980-12-03', gender: 'female', notes: 'Dental anxiety' },
    { id: 9,  dentist_id: 3, first_name: 'Samvel',    last_name: 'Avagyan',      phone: '+374 99 501009', email: 'samvel.a@mail.am',    date_of_birth: '1967-08-19', gender: 'male',   notes: null },
    { id: 10, dentist_id: 4, first_name: 'Mariam',    last_name: 'Danielyan',    phone: '+374 99 501010', email: 'mariam.d@mail.am',    date_of_birth: '1999-02-28', gender: 'female', notes: null },
    { id: 11, dentist_id: 4, first_name: 'Narek',     last_name: 'Galstyan',     phone: '+374 99 501011', email: 'narek.g@mail.am',     date_of_birth: '1991-10-07', gender: 'male',   notes: 'Penicillin allergy' },
    { id: 12, dentist_id: 4, first_name: 'Ani',       last_name: 'Stepanyan',    phone: '+374 99 501012', email: 'ani.s@mail.am',       date_of_birth: '1984-05-15', gender: 'female', notes: null },
    { id: 13, dentist_id: 5, first_name: 'Vahan',     last_name: 'Nazaryan',     phone: '+374 99 501013', email: 'vahan.n@mail.am',     date_of_birth: '1976-03-21', gender: 'male',   notes: null },
    { id: 14, dentist_id: 5, first_name: 'Kristine',  last_name: 'Abrahamyan',   phone: '+374 99 501014', email: 'kristine.a@mail.am',  date_of_birth: '2000-11-09', gender: 'female', notes: null },
    { id: 15, dentist_id: 5, first_name: 'Tigran',    last_name: 'Simonyan',     phone: '+374 99 501015', email: 'tigran.s@mail.am',    date_of_birth: '1969-07-14', gender: 'male',   notes: 'Hypertension' },
    { id: 16, dentist_id: 6, first_name: 'Gohar',     last_name: 'Baghdasaryan', phone: '+374 99 501016', email: 'gohar.b@mail.am',     date_of_birth: '1994-09-25', gender: 'female', notes: null },
    { id: 17, dentist_id: 6, first_name: 'Armen',     last_name: 'Melkonyan',    phone: '+374 99 501017', email: 'armen.m@mail.am',     date_of_birth: '1982-01-17', gender: 'male',   notes: null },
    { id: 18, dentist_id: 6, first_name: 'Lusine',    last_name: 'Zakharyan',    phone: '+374 99 501018', email: 'lusine.z@mail.am',    date_of_birth: '1988-06-30', gender: 'female', notes: 'Diabetes type 2' },
    { id: 19, dentist_id: 7, first_name: 'Hayk',      last_name: 'Khachaturyan', phone: '+374 99 501019', email: 'hayk.kh@mail.am',     date_of_birth: '1975-04-08', gender: 'male',   notes: null },
    { id: 20, dentist_id: 7, first_name: 'Tatevik',   last_name: 'Ohanyan',      phone: '+374 99 501020', email: 'tatevik.o@mail.am',   date_of_birth: '1997-12-22', gender: 'female', notes: null },
    { id: 21, dentist_id: 7, first_name: 'Gevorg',    last_name: 'Barseghyan',   phone: '+374 99 501021', email: 'gevorg.b@mail.am',    date_of_birth: '1963-08-11', gender: 'male',   notes: 'Hip replacement — antibiotic prophylaxis' },
    { id: 22, dentist_id: 8, first_name: 'Ruzanna',   last_name: 'Davtyan',      phone: '+374 99 501022', email: 'ruzanna.d@mail.am',   date_of_birth: '1990-02-04', gender: 'female', notes: null },
    { id: 23, dentist_id: 8, first_name: 'Ashot',     last_name: 'Avetisyan',    phone: '+374 99 501023', email: 'ashot.av@mail.am',    date_of_birth: '1986-10-16', gender: 'male',   notes: null },
    { id: 24, dentist_id: 8, first_name: 'Nvard',     last_name: 'Nalbandyan',   phone: '+374 99 501024', email: 'nvard.n@mail.am',     date_of_birth: '1979-05-29', gender: 'female', notes: null },
    { id: 25, dentist_id: 1, first_name: 'Ararat',    last_name: 'Vardanyan',    phone: '+374 99 501025', email: 'ararat.v@mail.am',    date_of_birth: '1992-07-03', gender: 'male',   notes: null },
    { id: 26, dentist_id: 2, first_name: 'Lilit',     last_name: 'Musheghyan',   phone: '+374 99 501026', email: 'lilit.m@mail.am',     date_of_birth: '1987-03-18', gender: 'female', notes: 'Latex allergy' },
    { id: 27, dentist_id: 3, first_name: 'Edgar',     last_name: 'Grigoryan',    phone: '+374 99 501027', email: 'edgar.gr@mail.am',    date_of_birth: '1974-11-27', gender: 'male',   notes: null },
    { id: 28, dentist_id: 4, first_name: 'Tamara',    last_name: 'Hakobyan',     phone: '+374 99 501028', email: 'tamara.h@mail.am',    date_of_birth: '1998-08-14', gender: 'female', notes: null },
    { id: 29, dentist_id: 5, first_name: 'Raffi',     last_name: 'Petrosyan',    phone: '+374 99 501029', email: 'raffi.p@mail.am',     date_of_birth: '1965-01-09', gender: 'male',   notes: 'Blood thinner medication' },
    { id: 30, dentist_id: 6, first_name: 'Sylva',     last_name: 'Asatryan',     phone: '+374 99 501030', email: 'sylva.as@mail.am',    date_of_birth: '1983-06-06', gender: 'female', notes: null },
    { id: 31, dentist_id: 7, first_name: 'Hmayak',    last_name: 'Martirosyan',  phone: '+374 99 501031', email: 'hmayak.m@mail.am',    date_of_birth: '1958-09-23', gender: 'male',   notes: 'Pacemaker' },
    { id: 32, dentist_id: 8, first_name: 'Arev',      last_name: 'Gevorgyan',    phone: '+374 99 501032', email: 'arev.gev@mail.am',    date_of_birth: '1996-04-01', gender: 'female', notes: null },
    { id: 33, dentist_id: 1, first_name: 'Vardan',    last_name: 'Harutyunyan',  phone: '+374 99 501033', email: 'vardan.har@mail.am',  date_of_birth: '1971-12-15', gender: 'male',   notes: null },
    { id: 34, dentist_id: 2, first_name: 'Shoghik',   last_name: 'Karapetyan',   phone: '+374 99 501034', email: 'shoghik.k@mail.am',   date_of_birth: '2001-03-27', gender: 'female', notes: null },
    { id: 35, dentist_id: 3, first_name: 'Benik',     last_name: 'Stepanyan',    phone: '+374 99 501035', email: 'benik.st@mail.am',    date_of_birth: '1968-10-04', gender: 'male',   notes: 'Aspirin allergy' },
    { id: 36, dentist_id: 4, first_name: 'Marine',    last_name: 'Poghosyan',    phone: '+374 99 501036', email: 'marine.pog@mail.am',  date_of_birth: '1993-07-19', gender: 'female', notes: null },
    { id: 37, dentist_id: 5, first_name: 'Grigor',    last_name: 'Avagyan',      phone: '+374 99 501037', email: 'grigor.av@mail.am',   date_of_birth: '1981-02-11', gender: 'male',   notes: null },
    { id: 38, dentist_id: 6, first_name: 'Hayarpi',   last_name: 'Galstyan',     phone: '+374 99 501038', email: 'hayarpi.gal@mail.am', date_of_birth: '1989-05-07', gender: 'female', notes: 'Osteoporosis' },
    { id: 39, dentist_id: 7, first_name: 'Nerses',    last_name: 'Nazaryan',     phone: '+374 99 501039', email: 'nerses.naz@mail.am',  date_of_birth: '1977-08-30', gender: 'male',   notes: null },
    { id: 40, dentist_id: 8, first_name: 'Arpine',    last_name: 'Danielyan',    phone: '+374 99 501040', email: 'arpine.dan@mail.am',  date_of_birth: '2002-01-13', gender: 'female', notes: null },
    { id: 41, dentist_id: 1, first_name: 'Minas',     last_name: 'Abrahamyan',   phone: '+374 99 501041', email: 'minas.abr@mail.am',   date_of_birth: '1973-06-22', gender: 'male',   notes: null },
    { id: 42, dentist_id: 2, first_name: 'Parandzem', last_name: 'Simonyan',     phone: '+374 99 501042', email: 'parandzem.s@mail.am', date_of_birth: '1995-11-05', gender: 'female', notes: null },
    { id: 43, dentist_id: 3, first_name: 'Artavazd',  last_name: 'Baghdasaryan', phone: '+374 99 501043', email: 'artavazd.b@mail.am',  date_of_birth: '1984-04-16', gender: 'male',   notes: null },
    { id: 44, dentist_id: 4, first_name: 'Knarik',    last_name: 'Melkonyan',    phone: '+374 99 501044', email: 'knarik.mel@mail.am',  date_of_birth: '1970-09-08', gender: 'female', notes: 'Thyroid condition' },
    { id: 45, dentist_id: 5, first_name: 'Sargis',    last_name: 'Hovhannisyan', phone: '+374 99 501045', email: 'sargis.hov@mail.am',  date_of_birth: '1987-12-29', gender: 'male',   notes: null },
  ];
  _nextId['patients'] = 46;

  // =============================================
  // 4. MEDICAL HISTORY (45 rows)
  // =============================================
  db.medical_history = [
    { id: 1,  patient_id: 2,  condition_type: 'allergy',         description: 'Allergic to ibuprofen — avoid NSAIDs' },
    { id: 2,  patient_id: 5,  condition_type: 'chronic_disease', description: 'Bruxism — uses night guard' },
    { id: 3,  patient_id: 8,  condition_type: 'chronic_disease', description: 'Severe dental anxiety — requires sedation protocol' },
    { id: 4,  patient_id: 11, condition_type: 'allergy',         description: 'Penicillin allergy — use alternative antibiotics' },
    { id: 5,  patient_id: 15, condition_type: 'chronic_disease', description: 'Hypertension — monitor BP before procedures' },
    { id: 6,  patient_id: 18, condition_type: 'chronic_disease', description: 'Type 2 diabetes — healing may be slower' },
    { id: 7,  patient_id: 21, condition_type: 'surgery',         description: 'Hip replacement 2019 — requires antibiotic prophylaxis' },
    { id: 8,  patient_id: 26, condition_type: 'allergy',         description: 'Latex allergy — use latex-free gloves and materials' },
    { id: 9,  patient_id: 29, condition_type: 'medication',      description: 'Warfarin (blood thinner) — consult physician before extractions' },
    { id: 10, patient_id: 31, condition_type: 'chronic_disease', description: 'Pacemaker — avoid ultrasonic scalers' },
    { id: 11, patient_id: 35, condition_type: 'allergy',         description: 'Aspirin allergy — avoid aspirin-based analgesics' },
    { id: 12, patient_id: 38, condition_type: 'chronic_disease', description: 'Osteoporosis — on bisphosphonates, risk of osteonecrosis' },
    { id: 13, patient_id: 44, condition_type: 'chronic_disease', description: 'Hypothyroidism — on levothyroxine' },
    { id: 14, patient_id: 1,  condition_type: 'surgery',         description: 'Wisdom tooth extraction 2018 — uneventful' },
    { id: 15, patient_id: 3,  condition_type: 'chronic_disease', description: 'Mild asthma — has inhaler' },
    { id: 16, patient_id: 4,  condition_type: 'medication',      description: 'Oral contraceptives — note antibiotic interaction' },
    { id: 17, patient_id: 6,  condition_type: 'surgery',         description: 'Tonsillectomy 2010' },
    { id: 18, patient_id: 7,  condition_type: 'allergy',         description: 'Chlorhexidine sensitivity — minor rash reported' },
    { id: 19, patient_id: 9,  condition_type: 'chronic_disease', description: 'GERD — acid erosion risk on posterior teeth' },
    { id: 20, patient_id: 10, condition_type: 'medication',      description: 'Metformin for blood sugar control' },
    { id: 21, patient_id: 12, condition_type: 'chronic_disease', description: 'Dry mouth (xerostomia) — increased caries risk' },
    { id: 22, patient_id: 13, condition_type: 'surgery',         description: 'Jaw fracture repair 2015 — has titanium plate' },
    { id: 23, patient_id: 14, condition_type: 'allergy',         description: 'Codeine allergy — avoid opioid analgesics' },
    { id: 24, patient_id: 16, condition_type: 'chronic_disease', description: 'Anemia — paleness of mucosa may mask signs' },
    { id: 25, patient_id: 17, condition_type: 'medication',      description: 'Beta-blockers for heart condition' },
    { id: 26, patient_id: 19, condition_type: 'chronic_disease', description: 'Epilepsy — well controlled on medication' },
    { id: 27, patient_id: 20, condition_type: 'allergy',         description: 'Sulfa drug allergy' },
    { id: 28, patient_id: 22, condition_type: 'surgery',         description: 'C-section 2021 — general health good' },
    { id: 29, patient_id: 23, condition_type: 'chronic_disease', description: 'Chronic sinusitis — affects upper molar treatment' },
    { id: 30, patient_id: 24, condition_type: 'medication',      description: 'Alendronate for bone density' },
    { id: 31, patient_id: 25, condition_type: 'chronic_disease', description: 'Mild anxiety disorder — premedication may be needed' },
    { id: 32, patient_id: 27, condition_type: 'surgery',         description: 'Appendectomy 2016 — no dental relevance' },
    { id: 33, patient_id: 28, condition_type: 'allergy',         description: 'Amoxicillin allergy — confirmed by immunologist' },
    { id: 34, patient_id: 30, condition_type: 'chronic_disease', description: 'Sjögren syndrome — severe dry mouth' },
    { id: 35, patient_id: 32, condition_type: 'medication',      description: 'Antidepressants — dry mouth side effect' },
    { id: 36, patient_id: 33, condition_type: 'chronic_disease', description: 'HIV positive — stable, standard precautions' },
    { id: 37, patient_id: 34, condition_type: 'allergy',         description: 'Eugenol sensitivity — avoid ZOE materials' },
    { id: 38, patient_id: 36, condition_type: 'chronic_disease', description: 'Pregnancy (2nd trimester) — defer elective X-rays' },
    { id: 39, patient_id: 37, condition_type: 'medication',      description: 'Calcium channel blockers — gingival hyperplasia risk' },
    { id: 40, patient_id: 39, condition_type: 'surgery',         description: 'Cardiac stent 2020 — dual antiplatelet therapy' },
    { id: 41, patient_id: 40, condition_type: 'chronic_disease', description: 'Crohn disease — oral ulcers possible' },
    { id: 42, patient_id: 41, condition_type: 'allergy',         description: 'Fluoride sensitivity — use alternative products' },
    { id: 43, patient_id: 42, condition_type: 'medication',      description: 'Steroids (asthma inhaler) — rinse after use' },
    { id: 44, patient_id: 43, condition_type: 'chronic_disease', description: 'Celiac disease — oral manifestations possible' },
    { id: 45, patient_id: 45, condition_type: 'surgery',         description: 'Knee arthroscopy 2022 — no dental relevance' },
  ];
  _nextId['medical_history'] = 46;

  // =============================================
  // 5. SERVICES (40 rows)
  // =============================================
  db.services = [
    { id: 1,  name: 'Dental Examination',           category: 'diagnostic',   default_cost: 5000.00,   duration_minutes: 30,  description: 'Full oral examination with charting' },
    { id: 2,  name: 'Panoramic X-Ray',              category: 'diagnostic',   default_cost: 8000.00,   duration_minutes: 15,  description: 'Full-mouth panoramic radiograph' },
    { id: 3,  name: 'Periapical X-Ray',             category: 'diagnostic',   default_cost: 2500.00,   duration_minutes: 10,  description: 'Single tooth radiograph' },
    { id: 4,  name: 'Professional Cleaning',        category: 'preventive',   default_cost: 12000.00,  duration_minutes: 45,  description: 'Scaling and polishing' },
    { id: 5,  name: 'Fluoride Treatment',           category: 'preventive',   default_cost: 4000.00,   duration_minutes: 20,  description: 'Topical fluoride application' },
    { id: 6,  name: 'Fissure Sealant',              category: 'preventive',   default_cost: 5000.00,   duration_minutes: 30,  description: 'Sealant applied per tooth' },
    { id: 7,  name: 'Composite Filling',            category: 'restorative',  default_cost: 18000.00,  duration_minutes: 45,  description: 'Tooth-colored resin restoration' },
    { id: 8,  name: 'Amalgam Filling',              category: 'restorative',  default_cost: 12000.00,  duration_minutes: 40,  description: 'Silver amalgam restoration' },
    { id: 9,  name: 'Root Canal Treatment',         category: 'restorative',  default_cost: 65000.00,  duration_minutes: 90,  description: 'Endodontic therapy single canal' },
    { id: 10, name: 'Dental Crown',                 category: 'restorative',  default_cost: 85000.00,  duration_minutes: 120, description: 'Full coverage porcelain crown' },
    { id: 11, name: 'Tooth Extraction (Simple)',     category: 'surgical',     default_cost: 15000.00,  duration_minutes: 30,  description: 'Routine non-surgical extraction' },
    { id: 12, name: 'Tooth Extraction (Surgical)',   category: 'surgical',     default_cost: 35000.00,  duration_minutes: 60,  description: 'Surgical removal, includes suturing' },
    { id: 13, name: 'Wisdom Tooth Removal',          category: 'surgical',     default_cost: 45000.00,  duration_minutes: 75,  description: 'Third molar surgical extraction' },
    { id: 14, name: 'Dental Implant',                category: 'surgical',     default_cost: 250000.00, duration_minutes: 120, description: 'Titanium implant fixture placement' },
    { id: 15, name: 'Teeth Whitening',               category: 'cosmetic',     default_cost: 45000.00,  duration_minutes: 60,  description: 'In-office bleaching procedure' },
    { id: 16, name: 'Dental Veneer',                 category: 'cosmetic',     default_cost: 95000.00,  duration_minutes: 90,  description: 'Porcelain veneer per tooth' },
    { id: 17, name: 'Fixed Bridge',                  category: 'restorative',  default_cost: 180000.00, duration_minutes: 150, description: '3-unit porcelain fused to metal bridge' },
    { id: 18, name: 'Removable Denture (Full)',      category: 'restorative',  default_cost: 120000.00, duration_minutes: 60,  description: 'Complete upper or lower denture' },
    { id: 19, name: 'Orthodontic Consultation',      category: 'orthodontic',  default_cost: 10000.00,  duration_minutes: 45,  description: 'Braces or aligner assessment' },
    { id: 20, name: 'Periodontal Deep Cleaning',     category: 'preventive',   default_cost: 25000.00,  duration_minutes: 60,  description: 'Scaling and root planing per quadrant' },
    { id: 21, name: 'Night Guard (Bruxism)',          category: 'preventive',   default_cost: 30000.00,  duration_minutes: 30,  description: 'Custom occlusal splint fabrication' },
    { id: 22, name: 'Inlay (Ceramic)',                category: 'restorative',  default_cost: 55000.00,  duration_minutes: 60,  description: 'Indirect ceramic inlay restoration' },
    { id: 23, name: 'Onlay (Ceramic)',                category: 'restorative',  default_cost: 65000.00,  duration_minutes: 60,  description: 'Indirect ceramic onlay restoration' },
    { id: 24, name: 'Post and Core Build-up',         category: 'restorative',  default_cost: 25000.00,  duration_minutes: 45,  description: 'Fiber post and composite core' },
    { id: 25, name: 'Bone Graft',                     category: 'surgical',     default_cost: 80000.00,  duration_minutes: 60,  description: 'Bone augmentation for implant site' },
    { id: 26, name: 'Sinus Lift',                     category: 'surgical',     default_cost: 120000.00, duration_minutes: 90,  description: 'Maxillary sinus floor elevation' },
    { id: 27, name: 'Gum Contouring',                 category: 'cosmetic',     default_cost: 40000.00,  duration_minutes: 45,  description: 'Aesthetic gingival reshaping' },
    { id: 28, name: 'Dental Bonding',                 category: 'cosmetic',     default_cost: 15000.00,  duration_minutes: 30,  description: 'Composite resin bonding per tooth' },
    { id: 29, name: 'Space Maintainer',                category: 'orthodontic',  default_cost: 20000.00,  duration_minutes: 30,  description: 'Fixed space maintainer for pediatric patient' },
    { id: 30, name: 'Retainer (Removable)',            category: 'orthodontic',  default_cost: 25000.00,  duration_minutes: 30,  description: 'Hawley or clear retainer' },
    { id: 31, name: 'Temporary Crown',                 category: 'restorative',  default_cost: 15000.00,  duration_minutes: 30,  description: 'Acrylic provisional crown' },
    { id: 32, name: 'Bite Analysis',                   category: 'diagnostic',   default_cost: 10000.00,  duration_minutes: 30,  description: 'Occlusal analysis and bite registration' },
    { id: 33, name: 'Oral Cancer Screening',           category: 'diagnostic',   default_cost: 6000.00,   duration_minutes: 20,  description: 'Visual and tactile examination for lesions' },
    { id: 34, name: 'Pulp Vitality Test',              category: 'diagnostic',   default_cost: 3000.00,   duration_minutes: 10,  description: 'Electric or thermal pulp testing' },
    { id: 35, name: 'Occlusal Adjustment',             category: 'restorative',  default_cost: 8000.00,   duration_minutes: 30,  description: 'Selective grinding to balance bite' },
    { id: 36, name: 'Tooth Splinting',                 category: 'restorative',  default_cost: 12000.00,  duration_minutes: 30,  description: 'Fiber splint for mobile teeth' },
    { id: 37, name: 'Irrigation and Drainage',         category: 'surgical',     default_cost: 10000.00,  duration_minutes: 20,  description: 'Abscess incision and drainage' },
    { id: 38, name: 'Palatal Expander',                category: 'orthodontic',  default_cost: 45000.00,  duration_minutes: 45,  description: 'Rapid maxillary expansion appliance' },
    { id: 39, name: 'Mouth Guard (Sport)',             category: 'preventive',   default_cost: 18000.00,  duration_minutes: 20,  description: 'Custom athletic mouth protector' },
    { id: 40, name: 'Desensitizing Treatment',         category: 'preventive',   default_cost: 5000.00,   duration_minutes: 15,  description: 'Application of desensitizing agent' },
    { id: 41, name: 'Stainless Steel Crown',           category: 'restorative',  default_cost: 20000.00,  duration_minutes: 30,  description: 'Prefabricated crown for primary teeth' },
  ];
  _nextId['services'] = 42;

  // =============================================
  // 6. APPOINTMENTS (45 rows)
  // =============================================
  db.appointments = [
    { id: 1,  dentist_id: 1, patient_id: 1,  service_id: 1,  title: 'Routine checkup',           start_time: new Date('2024-01-08 09:00'), end_time: new Date('2024-01-08 09:30'), status: 'completed',  notes: null },
    { id: 2,  dentist_id: 1, patient_id: 2,  service_id: 4,  title: 'Cleaning visit',            start_time: new Date('2024-01-08 10:00'), end_time: new Date('2024-01-08 10:45'), status: 'completed',  notes: 'Sensitive gums — use light pressure' },
    { id: 3,  dentist_id: 1, patient_id: 3,  service_id: 7,  title: 'Filling — tooth 14',        start_time: new Date('2024-01-09 09:00'), end_time: new Date('2024-01-09 09:45'), status: 'completed',  notes: null },
    { id: 4,  dentist_id: 2, patient_id: 4,  service_id: 1,  title: 'New patient exam',          start_time: new Date('2024-01-09 11:00'), end_time: new Date('2024-01-09 11:30'), status: 'completed',  notes: null },
    { id: 5,  dentist_id: 2, patient_id: 5,  service_id: 9,  title: 'Root canal — tooth 36',     start_time: new Date('2024-01-10 09:00'), end_time: new Date('2024-01-10 10:30'), status: 'completed',  notes: 'Bruxism patient — discuss night guard' },
    { id: 6,  dentist_id: 2, patient_id: 6,  service_id: 4,  title: 'Scaling',                   start_time: new Date('2024-01-10 11:00'), end_time: new Date('2024-01-10 11:45'), status: 'completed',  notes: null },
    { id: 7,  dentist_id: 3, patient_id: 7,  service_id: 11, title: 'Extraction — tooth 48',     start_time: new Date('2024-01-11 09:00'), end_time: new Date('2024-01-11 09:30'), status: 'completed',  notes: null },
    { id: 8,  dentist_id: 3, patient_id: 8,  service_id: 1,  title: 'Checkup',                   start_time: new Date('2024-01-11 10:00'), end_time: new Date('2024-01-11 10:30'), status: 'completed',  notes: 'Anxious patient — explain each step' },
    { id: 9,  dentist_id: 3, patient_id: 9,  service_id: 2,  title: 'Panoramic X-ray',           start_time: new Date('2024-01-12 09:00'), end_time: new Date('2024-01-12 09:15'), status: 'completed',  notes: null },
    { id: 10, dentist_id: 4, patient_id: 10, service_id: 1,  title: 'Routine exam',              start_time: new Date('2024-01-12 10:00'), end_time: new Date('2024-01-12 10:30'), status: 'completed',  notes: null },
    { id: 11, dentist_id: 4, patient_id: 11, service_id: 7,  title: 'Composite filling',         start_time: new Date('2024-01-15 09:00'), end_time: new Date('2024-01-15 09:45'), status: 'completed',  notes: 'Penicillin allergy — noted' },
    { id: 12, dentist_id: 4, patient_id: 12, service_id: 20, title: 'Deep cleaning — Q1/Q2',     start_time: new Date('2024-01-15 11:00'), end_time: new Date('2024-01-15 12:00'), status: 'completed',  notes: null },
    { id: 13, dentist_id: 5, patient_id: 13, service_id: 10, title: 'Crown prep — tooth 26',     start_time: new Date('2024-01-16 09:00'), end_time: new Date('2024-01-16 11:00'), status: 'completed',  notes: null },
    { id: 14, dentist_id: 5, patient_id: 14, service_id: 5,  title: 'Fluoride treatment',        start_time: new Date('2024-01-16 11:30'), end_time: new Date('2024-01-16 11:50'), status: 'completed',  notes: null },
    { id: 15, dentist_id: 5, patient_id: 15, service_id: 4,  title: 'Cleaning',                  start_time: new Date('2024-01-17 09:00'), end_time: new Date('2024-01-17 09:45'), status: 'completed',  notes: 'Check BP before procedure' },
    { id: 16, dentist_id: 6, patient_id: 16, service_id: 15, title: 'Whitening',                 start_time: new Date('2024-01-17 10:00'), end_time: new Date('2024-01-17 11:00'), status: 'completed',  notes: null },
    { id: 17, dentist_id: 6, patient_id: 17, service_id: 1,  title: 'Exam',                      start_time: new Date('2024-01-18 09:00'), end_time: new Date('2024-01-18 09:30'), status: 'completed',  notes: null },
    { id: 18, dentist_id: 6, patient_id: 18, service_id: 9,  title: 'Root canal — tooth 46',     start_time: new Date('2024-01-18 10:00'), end_time: new Date('2024-01-18 11:30'), status: 'completed',  notes: 'Diabetic patient — morning appt preferred' },
    { id: 19, dentist_id: 7, patient_id: 19, service_id: 11, title: 'Extraction',                start_time: new Date('2024-01-19 09:00'), end_time: new Date('2024-01-19 09:30'), status: 'completed',  notes: null },
    { id: 20, dentist_id: 7, patient_id: 20, service_id: 6,  title: 'Fissure sealants',          start_time: new Date('2024-01-19 10:00'), end_time: new Date('2024-01-19 10:30'), status: 'completed',  notes: null },
    { id: 21, dentist_id: 7, patient_id: 21, service_id: 4,  title: 'Scaling',                   start_time: new Date('2024-01-22 09:00'), end_time: new Date('2024-01-22 09:45'), status: 'completed',  notes: 'Antibiotic prophylaxis given before' },
    { id: 22, dentist_id: 8, patient_id: 22, service_id: 7,  title: 'Filling',                   start_time: new Date('2024-01-22 10:00'), end_time: new Date('2024-01-22 10:45'), status: 'completed',  notes: null },
    { id: 23, dentist_id: 8, patient_id: 23, service_id: 1,  title: 'Checkup',                   start_time: new Date('2024-01-23 09:00'), end_time: new Date('2024-01-23 09:30'), status: 'completed',  notes: null },
    { id: 24, dentist_id: 8, patient_id: 24, service_id: 16, title: 'Veneer consultation',       start_time: new Date('2024-01-23 10:00'), end_time: new Date('2024-01-23 10:45'), status: 'completed',  notes: null },
    { id: 25, dentist_id: 1, patient_id: 25, service_id: 9,  title: 'Root canal',                start_time: new Date('2024-01-24 09:00'), end_time: new Date('2024-01-24 10:30'), status: 'completed',  notes: null },
    { id: 26, dentist_id: 2, patient_id: 26, service_id: 12, title: 'Surgical extraction',       start_time: new Date('2024-01-24 11:00'), end_time: new Date('2024-01-24 12:00'), status: 'completed',  notes: 'Latex-free setup required' },
    { id: 27, dentist_id: 3, patient_id: 27, service_id: 10, title: 'Crown — tooth 16',          start_time: new Date('2024-01-25 09:00'), end_time: new Date('2024-01-25 11:00'), status: 'completed',  notes: null },
    { id: 28, dentist_id: 4, patient_id: 28, service_id: 1,  title: 'New patient exam',          start_time: new Date('2024-01-25 11:00'), end_time: new Date('2024-01-25 11:30'), status: 'completed',  notes: null },
    { id: 29, dentist_id: 5, patient_id: 29, service_id: 11, title: 'Extraction',                start_time: new Date('2024-01-26 09:00'), end_time: new Date('2024-01-26 09:30'), status: 'completed',  notes: 'Blood thinner — INR checked prior' },
    { id: 30, dentist_id: 6, patient_id: 30, service_id: 4,  title: 'Cleaning',                  start_time: new Date('2024-01-26 10:00'), end_time: new Date('2024-01-26 10:45'), status: 'completed',  notes: null },
    { id: 31, dentist_id: 7, patient_id: 31, service_id: 4,  title: 'Manual scaling only',       start_time: new Date('2024-01-29 09:00'), end_time: new Date('2024-01-29 09:45'), status: 'completed',  notes: 'No ultrasonic — pacemaker' },
    { id: 32, dentist_id: 8, patient_id: 32, service_id: 15, title: 'Whitening session',         start_time: new Date('2024-01-29 10:00'), end_time: new Date('2024-01-29 11:00'), status: 'completed',  notes: null },
    { id: 33, dentist_id: 1, patient_id: 33, service_id: 7,  title: 'Filling — tooth 25',        start_time: new Date('2024-01-30 09:00'), end_time: new Date('2024-01-30 09:45'), status: 'completed',  notes: null },
    { id: 34, dentist_id: 2, patient_id: 34, service_id: 1,  title: 'Checkup',                   start_time: new Date('2024-01-30 10:00'), end_time: new Date('2024-01-30 10:30'), status: 'completed',  notes: null },
    { id: 35, dentist_id: 3, patient_id: 35, service_id: 11, title: 'Simple extraction',         start_time: new Date('2024-01-31 09:00'), end_time: new Date('2024-01-31 09:30'), status: 'completed',  notes: 'Aspirin allergy — avoid aspirin' },
    { id: 36, dentist_id: 4, patient_id: 36, service_id: 2,  title: 'Panoramic X-ray',           start_time: new Date('2024-01-31 10:00'), end_time: new Date('2024-01-31 10:15'), status: 'completed',  notes: null },
    { id: 37, dentist_id: 5, patient_id: 37, service_id: 4,  title: 'Scaling',                   start_time: new Date('2024-02-01 09:00'), end_time: new Date('2024-02-01 09:45'), status: 'completed',  notes: null },
    { id: 38, dentist_id: 6, patient_id: 38, service_id: 20, title: 'Perio deep clean',          start_time: new Date('2024-02-01 10:00'), end_time: new Date('2024-02-01 11:00'), status: 'completed',  notes: 'Osteoporosis — bisphosphonate noted' },
    { id: 39, dentist_id: 7, patient_id: 39, service_id: 1,  title: 'Exam',                      start_time: new Date('2024-02-02 09:00'), end_time: new Date('2024-02-02 09:30'), status: 'cancelled',  notes: 'Patient called to cancel' },
    { id: 40, dentist_id: 8, patient_id: 40, service_id: 9,  title: 'Root canal — tooth 37',     start_time: new Date('2024-02-02 10:00'), end_time: new Date('2024-02-02 11:30'), status: 'completed',  notes: null },
    { id: 41, dentist_id: 1, patient_id: 41, service_id: 14, title: 'Implant consultation',      start_time: new Date('2024-02-05 09:00'), end_time: new Date('2024-02-05 10:00'), status: 'completed',  notes: null },
    { id: 42, dentist_id: 2, patient_id: 42, service_id: 7,  title: 'Filling',                   start_time: new Date('2024-02-05 11:00'), end_time: new Date('2024-02-05 11:45'), status: 'completed',  notes: null },
    { id: 43, dentist_id: 3, patient_id: 43, service_id: 1,  title: 'Checkup',                   start_time: new Date('2024-02-06 09:00'), end_time: new Date('2024-02-06 09:30'), status: 'scheduled',  notes: null },
    { id: 44, dentist_id: 4, patient_id: 44, service_id: 4,  title: 'Cleaning',                  start_time: new Date('2024-02-06 10:00'), end_time: new Date('2024-02-06 10:45'), status: 'scheduled',  notes: null },
    { id: 45, dentist_id: 5, patient_id: 45, service_id: 19, title: 'Ortho consultation',        start_time: new Date('2024-02-07 09:00'), end_time: new Date('2024-02-07 09:45'), status: 'scheduled',  notes: null },
  ];
  _nextId['appointments'] = 46;

  // =============================================
  // 7. VISITS (45 rows)
  // =============================================
  db.visits = [
    { id: 1,  patient_id: 1,  dentist_id: 1, appointment_id: 1,    visit_date: new Date('2024-01-08 09:00'), chief_complaint: 'Routine checkup',               diagnosis: 'No active caries. Mild plaque buildup.',                         status: 'completed' },
    { id: 2,  patient_id: 2,  dentist_id: 1, appointment_id: 2,    visit_date: new Date('2024-01-08 10:00'), chief_complaint: 'Gum bleeding during brushing',  diagnosis: 'Gingivitis, Stage I.',                                           status: 'completed' },
    { id: 3,  patient_id: 3,  dentist_id: 1, appointment_id: 3,    visit_date: new Date('2024-01-09 09:00'), chief_complaint: 'Tooth sensitivity',             diagnosis: 'Caries on tooth 14, moderate depth.',                            status: 'completed' },
    { id: 4,  patient_id: 4,  dentist_id: 2, appointment_id: 4,    visit_date: new Date('2024-01-09 11:00'), chief_complaint: 'New patient — full assessment', diagnosis: 'Healthy dentition, two early caries noted.',                     status: 'completed' },
    { id: 5,  patient_id: 5,  dentist_id: 2, appointment_id: 5,    visit_date: new Date('2024-01-10 09:00'), chief_complaint: 'Severe toothache — tooth 36',   diagnosis: 'Irreversible pulpitis tooth 36.',                                status: 'completed' },
    { id: 6,  patient_id: 6,  dentist_id: 2, appointment_id: 6,    visit_date: new Date('2024-01-10 11:00'), chief_complaint: 'Routine cleaning',              diagnosis: 'Moderate supragingival calculus.',                               status: 'completed' },
    { id: 7,  patient_id: 7,  dentist_id: 3, appointment_id: 7,    visit_date: new Date('2024-01-11 09:00'), chief_complaint: 'Wisdom tooth pain',             diagnosis: 'Pericoronitis around tooth 48.',                                 status: 'completed' },
    { id: 8,  patient_id: 8,  dentist_id: 3, appointment_id: 8,    visit_date: new Date('2024-01-11 10:00'), chief_complaint: 'Anxiety checkup',               diagnosis: 'No new caries. Previous restorations intact.',                   status: 'completed' },
    { id: 9,  patient_id: 9,  dentist_id: 3, appointment_id: 9,    visit_date: new Date('2024-01-12 09:00'), chief_complaint: 'Annual panoramic review',       diagnosis: 'Bone levels within normal limits. No pathology.',                status: 'completed' },
    { id: 10, patient_id: 10, dentist_id: 4, appointment_id: 10,   visit_date: new Date('2024-01-12 10:00'), chief_complaint: 'Routine exam',                  diagnosis: 'Small caries on tooth 17.',                                      status: 'completed' },
    { id: 11, patient_id: 11, dentist_id: 4, appointment_id: 11,   visit_date: new Date('2024-01-15 09:00'), chief_complaint: 'Broken filling',                diagnosis: 'Fractured composite on tooth 24.',                               status: 'completed' },
    { id: 12, patient_id: 12, dentist_id: 4, appointment_id: 12,   visit_date: new Date('2024-01-15 11:00'), chief_complaint: 'Bleeding gums, bad breath',     diagnosis: 'Chronic periodontitis, generalized Stage II.',                   status: 'completed' },
    { id: 13, patient_id: 13, dentist_id: 5, appointment_id: 13,   visit_date: new Date('2024-01-16 09:00'), chief_complaint: 'Tooth 26 — previous RCT',       diagnosis: 'Failed endodontic treatment, need crown.',                       status: 'completed' },
    { id: 14, patient_id: 14, dentist_id: 5, appointment_id: 14,   visit_date: new Date('2024-01-16 11:30'), chief_complaint: 'Caries prevention',             diagnosis: 'High caries risk patient — fluoride indicated.',                 status: 'completed' },
    { id: 15, patient_id: 15, dentist_id: 5, appointment_id: 15,   visit_date: new Date('2024-01-17 09:00'), chief_complaint: 'Routine cleaning',              diagnosis: 'Heavy calculus, hypertensive — BP 145/90.',                      status: 'completed' },
    { id: 16, patient_id: 16, dentist_id: 6, appointment_id: 16,   visit_date: new Date('2024-01-17 10:00'), chief_complaint: 'Teeth discoloration',           diagnosis: 'Extrinsic staining, patient desires whitening.',                 status: 'completed' },
    { id: 17, patient_id: 17, dentist_id: 6, appointment_id: 17,   visit_date: new Date('2024-01-18 09:00'), chief_complaint: 'Routine exam',                  diagnosis: 'Three caries detected — teeth 15, 25, 35.',                     status: 'completed' },
    { id: 18, patient_id: 18, dentist_id: 6, appointment_id: 18,   visit_date: new Date('2024-01-18 10:00'), chief_complaint: 'Toothache — lower left',        diagnosis: 'Necrotic pulp tooth 46. Root canal indicated.',                  status: 'completed' },
    { id: 19, patient_id: 19, dentist_id: 7, appointment_id: 19,   visit_date: new Date('2024-01-19 09:00'), chief_complaint: 'Pain lower right',              diagnosis: 'Periodontally hopeless tooth 45 — extraction indicated.',        status: 'completed' },
    { id: 20, patient_id: 20, dentist_id: 7, appointment_id: 20,   visit_date: new Date('2024-01-19 10:00'), chief_complaint: 'Prevention visit',              diagnosis: 'Deep fissures on newly erupted 16, 26, 36, 46.',                 status: 'completed' },
    { id: 21, patient_id: 21, dentist_id: 7, appointment_id: 21,   visit_date: new Date('2024-01-22 09:00'), chief_complaint: 'Routine cleaning',              diagnosis: 'Moderate calculus. Antibiotic prophylaxis administered.',        status: 'completed' },
    { id: 22, patient_id: 22, dentist_id: 8, appointment_id: 22,   visit_date: new Date('2024-01-22 10:00'), chief_complaint: 'Tooth discomfort',              diagnosis: 'Secondary caries under old amalgam — tooth 37.',                 status: 'completed' },
    { id: 23, patient_id: 23, dentist_id: 8, appointment_id: 23,   visit_date: new Date('2024-01-23 09:00'), chief_complaint: 'Routine checkup',               diagnosis: 'No caries. Mild attrition noted.',                               status: 'completed' },
    { id: 24, patient_id: 24, dentist_id: 8, appointment_id: 24,   visit_date: new Date('2024-01-23 10:00'), chief_complaint: 'Cosmetic inquiry',              diagnosis: 'Patient interested in anterior veneers.',                        status: 'completed' },
    { id: 25, patient_id: 25, dentist_id: 1, appointment_id: 25,   visit_date: new Date('2024-01-24 09:00'), chief_complaint: 'Toothache — upper right',       diagnosis: 'Irreversible pulpitis tooth 16.',                                status: 'completed' },
    { id: 26, patient_id: 26, dentist_id: 2, appointment_id: 26,   visit_date: new Date('2024-01-24 11:00'), chief_complaint: 'Impacted lower molar',          diagnosis: 'Impacted tooth 38 — surgical removal needed.',                   status: 'completed' },
    { id: 27, patient_id: 27, dentist_id: 3, appointment_id: 27,   visit_date: new Date('2024-01-25 09:00'), chief_complaint: 'Crown replacement',             diagnosis: 'Old crown on tooth 16 — recurrent caries margin.',               status: 'completed' },
    { id: 28, patient_id: 28, dentist_id: 4, appointment_id: 28,   visit_date: new Date('2024-01-25 11:00'), chief_complaint: 'New patient exam',              diagnosis: 'Good oral hygiene. One small caries tooth 46.',                  status: 'completed' },
    { id: 29, patient_id: 29, dentist_id: 5, appointment_id: 29,   visit_date: new Date('2024-01-26 09:00'), chief_complaint: 'Loose tooth',                   diagnosis: 'Tooth 35 — Grade III mobility, extraction indicated.',           status: 'completed' },
    { id: 30, patient_id: 30, dentist_id: 6, appointment_id: 30,   visit_date: new Date('2024-01-26 10:00'), chief_complaint: 'Dry mouth & gum sensitivity',   diagnosis: 'Xerostomia related gingivitis — Sjögren noted.',                 status: 'completed' },
    { id: 31, patient_id: 31, dentist_id: 7, appointment_id: 31,   visit_date: new Date('2024-01-29 09:00'), chief_complaint: 'Routine cleaning',              diagnosis: 'Calculus removed with hand instruments only.',                   status: 'completed' },
    { id: 32, patient_id: 32, dentist_id: 8, appointment_id: 32,   visit_date: new Date('2024-01-29 10:00'), chief_complaint: 'Whitening session',             diagnosis: 'Pre-whitening assessment — no contraindications.',               status: 'completed' },
    { id: 33, patient_id: 33, dentist_id: 1, appointment_id: 33,   visit_date: new Date('2024-01-30 09:00'), chief_complaint: 'Broken tooth',                  diagnosis: 'Fractured tooth 25 — composite restoration feasible.',          status: 'completed' },
    { id: 34, patient_id: 34, dentist_id: 2, appointment_id: 34,   visit_date: new Date('2024-01-30 10:00'), chief_complaint: 'Routine checkup',               diagnosis: 'Two small interproximal caries — teeth 13, 23.',                 status: 'completed' },
    { id: 35, patient_id: 35, dentist_id: 3, appointment_id: 35,   visit_date: new Date('2024-01-31 09:00'), chief_complaint: 'Painful tooth',                 diagnosis: 'Non-restorable tooth 36 — extraction indicated.',                status: 'completed' },
    { id: 36, patient_id: 36, dentist_id: 4, appointment_id: 36,   visit_date: new Date('2024-01-31 10:00'), chief_complaint: 'X-ray review',                  diagnosis: 'Bone levels stable. Wisdom teeth asymptomatic.',                 status: 'completed' },
    { id: 37, patient_id: 37, dentist_id: 5, appointment_id: 37,   visit_date: new Date('2024-02-01 09:00'), chief_complaint: 'Routine scaling',               diagnosis: 'Mild gingivitis. Good oral hygiene overall.',                    status: 'completed' },
    { id: 38, patient_id: 38, dentist_id: 6, appointment_id: 38,   visit_date: new Date('2024-02-01 10:00'), chief_complaint: 'Gum disease treatment',         diagnosis: 'Stage III periodontitis. Bisphosphonate noted — proceed carefully.', status: 'completed' },
    { id: 39, patient_id: 40, dentist_id: 8, appointment_id: 40,   visit_date: new Date('2024-02-02 10:00'), chief_complaint: 'Severe toothache — lower left', diagnosis: 'Acute apical periodontitis tooth 37.',                          status: 'completed' },
    { id: 40, patient_id: 41, dentist_id: 1, appointment_id: 41,   visit_date: new Date('2024-02-05 09:00'), chief_complaint: 'Implant inquiry',               diagnosis: 'Missing tooth 46 — implant placement planned.',                  status: 'completed' },
    { id: 41, patient_id: 42, dentist_id: 2, appointment_id: 42,   visit_date: new Date('2024-02-05 11:00'), chief_complaint: 'Chipped tooth',                 diagnosis: 'Enamel fracture tooth 11 — composite restoration.',              status: 'completed' },
    { id: 42, patient_id: 25, dentist_id: 1, appointment_id: null,  visit_date: new Date('2024-02-10 09:00'), chief_complaint: 'Post-RCT follow-up',           diagnosis: 'Tooth 16 healing well. Crown prep today.',                       status: 'completed' },
    { id: 43, patient_id: 11, dentist_id: 4, appointment_id: null,  visit_date: new Date('2024-02-12 09:00'), chief_complaint: 'Follow-up filling',            diagnosis: 'Tooth 22 caries detected on previous exam — restored.',         status: 'completed' },
    { id: 44, patient_id: 17, dentist_id: 6, appointment_id: null,  visit_date: new Date('2024-02-14 09:00'), chief_complaint: 'Multiple fillings visit',      diagnosis: 'Caries on teeth 15, 25, 35 treated today.',                     status: 'completed' },
    { id: 45, patient_id: 5,  dentist_id: 2, appointment_id: null,  visit_date: new Date('2024-02-20 09:00'), chief_complaint: 'Post-RCT review tooth 36',     diagnosis: 'Healing well. Crown fabrication ordered.',                       status: 'completed' },
  ];
  _nextId['visits'] = 46;

  // =============================================
  // 8. TREATMENTS (45 rows)
  // =============================================
  db.treatments = [
    { id: 1,  visit_id: 1,  patient_id: 1,  service_id: 4,  cost: 12000.00,  status: 'completed', notes: null },
    { id: 2,  visit_id: 2,  patient_id: 2,  service_id: 4,  cost: 12000.00,  status: 'completed', notes: 'Light-touch scaling — sensitive gums' },
    { id: 3,  visit_id: 3,  patient_id: 3,  service_id: 7,  cost: 18000.00,  status: 'completed', notes: 'Class II composite tooth 14' },
    { id: 4,  visit_id: 4,  patient_id: 4,  service_id: 1,  cost: 5000.00,   status: 'completed', notes: null },
    { id: 5,  visit_id: 5,  patient_id: 5,  service_id: 9,  cost: 65000.00,  status: 'completed', notes: 'Root canal tooth 36 — 3 canals' },
    { id: 6,  visit_id: 6,  patient_id: 6,  service_id: 4,  cost: 12000.00,  status: 'completed', notes: null },
    { id: 7,  visit_id: 7,  patient_id: 7,  service_id: 11, cost: 15000.00,  status: 'completed', notes: 'Extraction tooth 48' },
    { id: 8,  visit_id: 8,  patient_id: 8,  service_id: 1,  cost: 5000.00,   status: 'completed', notes: null },
    { id: 9,  visit_id: 9,  patient_id: 9,  service_id: 2,  cost: 8000.00,   status: 'completed', notes: null },
    { id: 10, visit_id: 10, patient_id: 10, service_id: 1,  cost: 5000.00,   status: 'completed', notes: null },
    { id: 11, visit_id: 11, patient_id: 11, service_id: 7,  cost: 18000.00,  status: 'completed', notes: 'Replace fractured composite tooth 24' },
    { id: 12, visit_id: 12, patient_id: 12, service_id: 20, cost: 25000.00,  status: 'completed', notes: 'Deep clean Q1 and Q2' },
    { id: 13, visit_id: 13, patient_id: 13, service_id: 10, cost: 85000.00,  status: 'completed', notes: 'Porcelain crown tooth 26' },
    { id: 14, visit_id: 14, patient_id: 14, service_id: 5,  cost: 4000.00,   status: 'completed', notes: null },
    { id: 15, visit_id: 15, patient_id: 15, service_id: 4,  cost: 12000.00,  status: 'completed', notes: null },
    { id: 16, visit_id: 16, patient_id: 16, service_id: 15, cost: 45000.00,  status: 'completed', notes: 'In-office whitening — 2 shades lighter' },
    { id: 17, visit_id: 17, patient_id: 17, service_id: 1,  cost: 5000.00,   status: 'completed', notes: null },
    { id: 18, visit_id: 18, patient_id: 18, service_id: 9,  cost: 65000.00,  status: 'completed', notes: 'Root canal tooth 46 — morning appointment' },
    { id: 19, visit_id: 19, patient_id: 19, service_id: 11, cost: 15000.00,  status: 'completed', notes: 'Extraction tooth 45' },
    { id: 20, visit_id: 20, patient_id: 20, service_id: 6,  cost: 20000.00,  status: 'completed', notes: 'Sealants on 16, 26, 36, 46 — 4 teeth' },
    { id: 21, visit_id: 21, patient_id: 21, service_id: 4,  cost: 12000.00,  status: 'completed', notes: 'Manual only — pacemaker patient' },
    { id: 22, visit_id: 22, patient_id: 22, service_id: 7,  cost: 18000.00,  status: 'completed', notes: 'Replace old amalgam with composite tooth 37' },
    { id: 23, visit_id: 23, patient_id: 23, service_id: 1,  cost: 5000.00,   status: 'completed', notes: null },
    { id: 24, visit_id: 24, patient_id: 24, service_id: 16, cost: 95000.00,  status: 'planned',   notes: 'Veneer quote accepted — schedule prep' },
    { id: 25, visit_id: 25, patient_id: 25, service_id: 9,  cost: 65000.00,  status: 'completed', notes: 'Root canal tooth 16 — 3 canals' },
    { id: 26, visit_id: 26, patient_id: 26, service_id: 12, cost: 35000.00,  status: 'completed', notes: 'Surgical extraction tooth 38 — latex-free' },
    { id: 27, visit_id: 27, patient_id: 27, service_id: 10, cost: 85000.00,  status: 'completed', notes: 'New crown tooth 16' },
    { id: 28, visit_id: 28, patient_id: 28, service_id: 1,  cost: 5000.00,   status: 'completed', notes: null },
    { id: 29, visit_id: 29, patient_id: 29, service_id: 11, cost: 15000.00,  status: 'completed', notes: 'Extraction tooth 35 — INR checked' },
    { id: 30, visit_id: 30, patient_id: 30, service_id: 20, cost: 25000.00,  status: 'completed', notes: 'Perio clean — Sjögren patient' },
    { id: 31, visit_id: 31, patient_id: 31, service_id: 4,  cost: 12000.00,  status: 'completed', notes: 'Hand instruments only' },
    { id: 32, visit_id: 32, patient_id: 32, service_id: 15, cost: 45000.00,  status: 'completed', notes: null },
    { id: 33, visit_id: 33, patient_id: 33, service_id: 7,  cost: 18000.00,  status: 'completed', notes: 'Composite restoration tooth 25' },
    { id: 34, visit_id: 34, patient_id: 34, service_id: 3,  cost: 2500.00,   status: 'completed', notes: 'Periapical X-ray teeth 13, 23' },
    { id: 35, visit_id: 35, patient_id: 35, service_id: 11, cost: 15000.00,  status: 'completed', notes: 'Extraction tooth 36 — aspirin allergy noted' },
    { id: 36, visit_id: 36, patient_id: 36, service_id: 2,  cost: 8000.00,   status: 'completed', notes: null },
    { id: 37, visit_id: 37, patient_id: 37, service_id: 4,  cost: 12000.00,  status: 'completed', notes: null },
    { id: 38, visit_id: 38, patient_id: 38, service_id: 20, cost: 25000.00,  status: 'completed', notes: 'Stage III perio — careful with bisphosphonate' },
    { id: 39, visit_id: 39, patient_id: 40, service_id: 9,  cost: 65000.00,  status: 'completed', notes: 'Root canal tooth 37' },
    { id: 40, visit_id: 40, patient_id: 41, service_id: 14, cost: 250000.00, status: 'planned',   notes: 'Implant fixture placement — awaiting scan' },
    { id: 41, visit_id: 41, patient_id: 42, service_id: 7,  cost: 18000.00,  status: 'completed', notes: 'Composite enamel fracture tooth 11' },
    { id: 42, visit_id: 42, patient_id: 25, service_id: 10, cost: 85000.00,  status: 'completed', notes: 'Crown prep tooth 16 — post-RCT' },
    { id: 43, visit_id: 43, patient_id: 11, service_id: 7,  cost: 18000.00,  status: 'completed', notes: 'Composite tooth 22' },
    { id: 44, visit_id: 44, patient_id: 17, service_id: 7,  cost: 54000.00,  status: 'completed', notes: 'Three composites — teeth 15, 25, 35' },
    { id: 45, visit_id: 45, patient_id: 5,  service_id: 10, cost: 85000.00,  status: 'planned',   notes: 'Crown for tooth 36 post-RCT' },
  ];
  _nextId['treatments'] = 46;

  // =============================================
  // 9. TREATMENT_TEETH (47 rows)
  // =============================================
  db.treatment_teeth = [
    { id: 1,  treatment_id: 1,  tooth_number: 14, surface: 'occlusal' },
    { id: 2,  treatment_id: 2,  tooth_number: 11, surface: null },
    { id: 3,  treatment_id: 2,  tooth_number: 12, surface: null },
    { id: 4,  treatment_id: 2,  tooth_number: 13, surface: null },
    { id: 5,  treatment_id: 3,  tooth_number: 14, surface: 'mesial' },
    { id: 6,  treatment_id: 4,  tooth_number: 17, surface: 'occlusal' },
    { id: 7,  treatment_id: 5,  tooth_number: 36, surface: null },
    { id: 8,  treatment_id: 6,  tooth_number: 11, surface: null },
    { id: 9,  treatment_id: 7,  tooth_number: 48, surface: null },
    { id: 10, treatment_id: 8,  tooth_number: 24, surface: null },
    { id: 11, treatment_id: 9,  tooth_number: 25, surface: null },
    { id: 12, treatment_id: 10, tooth_number: 17, surface: 'occlusal' },
    { id: 13, treatment_id: 11, tooth_number: 24, surface: 'distal' },
    { id: 14, treatment_id: 12, tooth_number: 14, surface: null },
    { id: 15, treatment_id: 12, tooth_number: 15, surface: null },
    { id: 16, treatment_id: 13, tooth_number: 26, surface: null },
    { id: 17, treatment_id: 14, tooth_number: 16, surface: null },
    { id: 18, treatment_id: 14, tooth_number: 26, surface: null },
    { id: 19, treatment_id: 14, tooth_number: 36, surface: null },
    { id: 20, treatment_id: 14, tooth_number: 46, surface: null },
    { id: 21, treatment_id: 15, tooth_number: 16, surface: null },
    { id: 22, treatment_id: 16, tooth_number: 11, surface: null },
    { id: 23, treatment_id: 16, tooth_number: 12, surface: null },
    { id: 24, treatment_id: 16, tooth_number: 21, surface: null },
    { id: 25, treatment_id: 16, tooth_number: 22, surface: null },
    { id: 26, treatment_id: 17, tooth_number: 15, surface: 'occlusal' },
    { id: 27, treatment_id: 17, tooth_number: 25, surface: 'occlusal' },
    { id: 28, treatment_id: 17, tooth_number: 35, surface: 'occlusal' },
    { id: 29, treatment_id: 18, tooth_number: 46, surface: null },
    { id: 30, treatment_id: 19, tooth_number: 45, surface: null },
    { id: 31, treatment_id: 20, tooth_number: 16, surface: 'occlusal' },
    { id: 32, treatment_id: 20, tooth_number: 26, surface: 'occlusal' },
    { id: 33, treatment_id: 20, tooth_number: 36, surface: 'occlusal' },
    { id: 34, treatment_id: 20, tooth_number: 46, surface: 'occlusal' },
    { id: 35, treatment_id: 21, tooth_number: 18, surface: null },
    { id: 36, treatment_id: 21, tooth_number: 28, surface: null },
    { id: 37, treatment_id: 22, tooth_number: 37, surface: 'occlusal' },
    { id: 38, treatment_id: 25, tooth_number: 16, surface: null },
    { id: 39, treatment_id: 26, tooth_number: 38, surface: null },
    { id: 40, treatment_id: 27, tooth_number: 16, surface: null },
    { id: 41, treatment_id: 29, tooth_number: 35, surface: null },
    { id: 42, treatment_id: 33, tooth_number: 25, surface: 'buccal' },
    { id: 43, treatment_id: 35, tooth_number: 36, surface: null },
    { id: 44, treatment_id: 39, tooth_number: 37, surface: null },
    { id: 45, treatment_id: 42, tooth_number: 16, surface: null },
    { id: 46, treatment_id: 41, tooth_number: 11, surface: 'buccal' },
    { id: 47, treatment_id: 44, tooth_number: 15, surface: 'occlusal' },
    { id: 48, treatment_id: 44, tooth_number: 25, surface: 'mesial' },
  ];
  _nextId['treatment_teeth'] = 49;

  // =============================================
  // 10. INVOICES (45 rows)
  // =============================================
  db.invoices = [
    { id: 1,  visit_id: 1,  patient_id: 1,  issued_date: new Date('2024-01-08'), due_date: new Date('2024-01-22'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 2,  visit_id: 2,  patient_id: 2,  issued_date: new Date('2024-01-08'), due_date: new Date('2024-01-22'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 3,  visit_id: 3,  patient_id: 3,  issued_date: new Date('2024-01-09'), due_date: new Date('2024-01-23'), total_amount: 18000.00,  discount: 0,    status: 'paid' },
    { id: 4,  visit_id: 4,  patient_id: 4,  issued_date: new Date('2024-01-09'), due_date: new Date('2024-01-23'), total_amount: 5000.00,   discount: 0,    status: 'paid' },
    { id: 5,  visit_id: 5,  patient_id: 5,  issued_date: new Date('2024-01-10'), due_date: new Date('2024-01-24'), total_amount: 65000.00,  discount: 5000, status: 'paid' },
    { id: 6,  visit_id: 6,  patient_id: 6,  issued_date: new Date('2024-01-10'), due_date: new Date('2024-01-24'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 7,  visit_id: 7,  patient_id: 7,  issued_date: new Date('2024-01-11'), due_date: new Date('2024-01-25'), total_amount: 15000.00,  discount: 0,    status: 'paid' },
    { id: 8,  visit_id: 8,  patient_id: 8,  issued_date: new Date('2024-01-11'), due_date: new Date('2024-01-25'), total_amount: 5000.00,   discount: 0,    status: 'paid' },
    { id: 9,  visit_id: 9,  patient_id: 9,  issued_date: new Date('2024-01-12'), due_date: new Date('2024-01-26'), total_amount: 8000.00,   discount: 0,    status: 'paid' },
    { id: 10, visit_id: 10, patient_id: 10, issued_date: new Date('2024-01-12'), due_date: new Date('2024-01-26'), total_amount: 5000.00,   discount: 0,    status: 'paid' },
    { id: 11, visit_id: 11, patient_id: 11, issued_date: new Date('2024-01-15'), due_date: new Date('2024-01-29'), total_amount: 18000.00,  discount: 0,    status: 'paid' },
    { id: 12, visit_id: 12, patient_id: 12, issued_date: new Date('2024-01-15'), due_date: new Date('2024-01-29'), total_amount: 25000.00,  discount: 2500, status: 'paid' },
    { id: 13, visit_id: 13, patient_id: 13, issued_date: new Date('2024-01-16'), due_date: new Date('2024-01-30'), total_amount: 85000.00,  discount: 0,    status: 'paid' },
    { id: 14, visit_id: 14, patient_id: 14, issued_date: new Date('2024-01-16'), due_date: new Date('2024-01-30'), total_amount: 4000.00,   discount: 0,    status: 'paid' },
    { id: 15, visit_id: 15, patient_id: 15, issued_date: new Date('2024-01-17'), due_date: new Date('2024-01-31'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 16, visit_id: 16, patient_id: 16, issued_date: new Date('2024-01-17'), due_date: new Date('2024-01-31'), total_amount: 45000.00,  discount: 0,    status: 'paid' },
    { id: 17, visit_id: 17, patient_id: 17, issued_date: new Date('2024-01-18'), due_date: new Date('2024-02-01'), total_amount: 5000.00,   discount: 0,    status: 'paid' },
    { id: 18, visit_id: 18, patient_id: 18, issued_date: new Date('2024-01-18'), due_date: new Date('2024-02-01'), total_amount: 65000.00,  discount: 10000,status: 'paid' },
    { id: 19, visit_id: 19, patient_id: 19, issued_date: new Date('2024-01-19'), due_date: new Date('2024-02-02'), total_amount: 15000.00,  discount: 0,    status: 'paid' },
    { id: 20, visit_id: 20, patient_id: 20, issued_date: new Date('2024-01-19'), due_date: new Date('2024-02-02'), total_amount: 20000.00,  discount: 1000, status: 'paid' },
    { id: 21, visit_id: 21, patient_id: 21, issued_date: new Date('2024-01-22'), due_date: new Date('2024-02-05'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 22, visit_id: 22, patient_id: 22, issued_date: new Date('2024-01-22'), due_date: new Date('2024-02-05'), total_amount: 18000.00,  discount: 0,    status: 'paid' },
    { id: 23, visit_id: 23, patient_id: 23, issued_date: new Date('2024-01-23'), due_date: new Date('2024-02-06'), total_amount: 5000.00,   discount: 0,    status: 'paid' },
    { id: 24, visit_id: 24, patient_id: 24, issued_date: new Date('2024-01-23'), due_date: new Date('2024-02-06'), total_amount: 95000.00,  discount: 0,    status: 'issued' },
    { id: 25, visit_id: 25, patient_id: 25, issued_date: new Date('2024-01-24'), due_date: new Date('2024-02-07'), total_amount: 65000.00,  discount: 0,    status: 'paid' },
    { id: 26, visit_id: 26, patient_id: 26, issued_date: new Date('2024-01-24'), due_date: new Date('2024-02-07'), total_amount: 35000.00,  discount: 0,    status: 'paid' },
    { id: 27, visit_id: 27, patient_id: 27, issued_date: new Date('2024-01-25'), due_date: new Date('2024-02-08'), total_amount: 85000.00,  discount: 5000, status: 'paid' },
    { id: 28, visit_id: 28, patient_id: 28, issued_date: new Date('2024-01-25'), due_date: new Date('2024-02-08'), total_amount: 5000.00,   discount: 0,    status: 'paid' },
    { id: 29, visit_id: 29, patient_id: 29, issued_date: new Date('2024-01-26'), due_date: new Date('2024-02-09'), total_amount: 15000.00,  discount: 0,    status: 'paid' },
    { id: 30, visit_id: 30, patient_id: 30, issued_date: new Date('2024-01-26'), due_date: new Date('2024-02-09'), total_amount: 25000.00,  discount: 0,    status: 'paid' },
    { id: 31, visit_id: 31, patient_id: 31, issued_date: new Date('2024-01-29'), due_date: new Date('2024-02-12'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 32, visit_id: 32, patient_id: 32, issued_date: new Date('2024-01-29'), due_date: new Date('2024-02-12'), total_amount: 45000.00,  discount: 0,    status: 'paid' },
    { id: 33, visit_id: 33, patient_id: 33, issued_date: new Date('2024-01-30'), due_date: new Date('2024-02-13'), total_amount: 18000.00,  discount: 0,    status: 'paid' },
    { id: 34, visit_id: 34, patient_id: 34, issued_date: new Date('2024-01-30'), due_date: new Date('2024-02-13'), total_amount: 2500.00,   discount: 0,    status: 'paid' },
    { id: 35, visit_id: 35, patient_id: 35, issued_date: new Date('2024-01-31'), due_date: new Date('2024-02-14'), total_amount: 15000.00,  discount: 0,    status: 'paid' },
    { id: 36, visit_id: 36, patient_id: 36, issued_date: new Date('2024-01-31'), due_date: new Date('2024-02-14'), total_amount: 8000.00,   discount: 0,    status: 'paid' },
    { id: 37, visit_id: 37, patient_id: 37, issued_date: new Date('2024-02-01'), due_date: new Date('2024-02-15'), total_amount: 12000.00,  discount: 0,    status: 'paid' },
    { id: 38, visit_id: 38, patient_id: 38, issued_date: new Date('2024-02-01'), due_date: new Date('2024-02-15'), total_amount: 25000.00,  discount: 0,    status: 'paid' },
    { id: 39, visit_id: 39, patient_id: 40, issued_date: new Date('2024-02-02'), due_date: new Date('2024-02-16'), total_amount: 65000.00,  discount: 0,    status: 'paid' },
    { id: 40, visit_id: 40, patient_id: 41, issued_date: new Date('2024-02-05'), due_date: new Date('2024-02-19'), total_amount: 250000.00, discount: 0,    status: 'issued' },
    { id: 41, visit_id: 41, patient_id: 42, issued_date: new Date('2024-02-05'), due_date: new Date('2024-02-19'), total_amount: 18000.00,  discount: 0,    status: 'paid' },
    { id: 42, visit_id: 42, patient_id: 25, issued_date: new Date('2024-02-10'), due_date: new Date('2024-02-24'), total_amount: 85000.00,  discount: 0,    status: 'paid' },
    { id: 43, visit_id: 43, patient_id: 11, issued_date: new Date('2024-02-12'), due_date: new Date('2024-02-26'), total_amount: 18000.00,  discount: 0,    status: 'paid' },
    { id: 44, visit_id: 44, patient_id: 17, issued_date: new Date('2024-02-14'), due_date: new Date('2024-02-28'), total_amount: 54000.00,  discount: 4000, status: 'overdue' },
    { id: 45, visit_id: 45, patient_id: 5,  issued_date: new Date('2024-02-20'), due_date: new Date('2024-03-05'), total_amount: 85000.00,  discount: 0,    status: 'issued' },
  ];
  _nextId['invoices'] = 46;

  // =============================================
  // 11. PAYMENTS (45 rows)
  // =============================================
  db.payments = [
    { id: 1,  invoice_id: 1,  patient_id: 1,  amount: 12000.00,  method: 'cash',      payment_date: new Date('2024-01-08'), notes: null },
    { id: 2,  invoice_id: 2,  patient_id: 2,  amount: 12000.00,  method: 'card',      payment_date: new Date('2024-01-08'), notes: null },
    { id: 3,  invoice_id: 3,  patient_id: 3,  amount: 18000.00,  method: 'cash',      payment_date: new Date('2024-01-09'), notes: null },
    { id: 4,  invoice_id: 4,  patient_id: 4,  amount: 5000.00,   method: 'card',      payment_date: new Date('2024-01-09'), notes: null },
    { id: 5,  invoice_id: 5,  patient_id: 5,  amount: 60000.00,  method: 'transfer',  payment_date: new Date('2024-01-10'), notes: 'Discount of 5000 applied' },
    { id: 6,  invoice_id: 6,  patient_id: 6,  amount: 12000.00,  method: 'cash',      payment_date: new Date('2024-01-10'), notes: null },
    { id: 7,  invoice_id: 7,  patient_id: 7,  amount: 15000.00,  method: 'card',      payment_date: new Date('2024-01-11'), notes: null },
    { id: 8,  invoice_id: 8,  patient_id: 8,  amount: 5000.00,   method: 'cash',      payment_date: new Date('2024-01-11'), notes: null },
    { id: 9,  invoice_id: 9,  patient_id: 9,  amount: 8000.00,   method: 'card',      payment_date: new Date('2024-01-12'), notes: null },
    { id: 10, invoice_id: 10, patient_id: 10, amount: 5000.00,   method: 'cash',      payment_date: new Date('2024-01-12'), notes: null },
    { id: 11, invoice_id: 11, patient_id: 11, amount: 18000.00,  method: 'card',      payment_date: new Date('2024-01-15'), notes: null },
    { id: 12, invoice_id: 12, patient_id: 12, amount: 22500.00,  method: 'insurance', payment_date: new Date('2024-01-15'), notes: 'Insurance covered partial — discount 2500' },
    { id: 13, invoice_id: 13, patient_id: 13, amount: 85000.00,  method: 'transfer',  payment_date: new Date('2024-01-16'), notes: null },
    { id: 14, invoice_id: 14, patient_id: 14, amount: 4000.00,   method: 'cash',      payment_date: new Date('2024-01-16'), notes: null },
    { id: 15, invoice_id: 15, patient_id: 15, amount: 12000.00,  method: 'card',      payment_date: new Date('2024-01-17'), notes: null },
    { id: 16, invoice_id: 16, patient_id: 16, amount: 45000.00,  method: 'card',      payment_date: new Date('2024-01-17'), notes: null },
    { id: 17, invoice_id: 17, patient_id: 17, amount: 5000.00,   method: 'cash',      payment_date: new Date('2024-01-18'), notes: null },
    { id: 18, invoice_id: 18, patient_id: 18, amount: 55000.00,  method: 'insurance', payment_date: new Date('2024-01-18'), notes: 'Insurance paid 55000, discount 10000 applied' },
    { id: 19, invoice_id: 19, patient_id: 19, amount: 15000.00,  method: 'cash',      payment_date: new Date('2024-01-19'), notes: null },
    { id: 20, invoice_id: 20, patient_id: 20, amount: 19000.00,  method: 'card',      payment_date: new Date('2024-01-19'), notes: 'Discount 1000 applied' },
    { id: 21, invoice_id: 21, patient_id: 21, amount: 12000.00,  method: 'cash',      payment_date: new Date('2024-01-22'), notes: null },
    { id: 22, invoice_id: 22, patient_id: 22, amount: 18000.00,  method: 'card',      payment_date: new Date('2024-01-22'), notes: null },
    { id: 23, invoice_id: 23, patient_id: 23, amount: 5000.00,   method: 'cash',      payment_date: new Date('2024-01-23'), notes: null },
    { id: 24, invoice_id: 25, patient_id: 25, amount: 65000.00,  method: 'transfer',  payment_date: new Date('2024-01-24'), notes: null },
    { id: 25, invoice_id: 26, patient_id: 26, amount: 35000.00,  method: 'card',      payment_date: new Date('2024-01-24'), notes: null },
    { id: 26, invoice_id: 27, patient_id: 27, amount: 80000.00,  method: 'transfer',  payment_date: new Date('2024-01-25'), notes: 'Discount 5000 applied' },
    { id: 27, invoice_id: 28, patient_id: 28, amount: 5000.00,   method: 'cash',      payment_date: new Date('2024-01-25'), notes: null },
    { id: 28, invoice_id: 29, patient_id: 29, amount: 15000.00,  method: 'card',      payment_date: new Date('2024-01-26'), notes: null },
    { id: 29, invoice_id: 30, patient_id: 30, amount: 25000.00,  method: 'insurance', payment_date: new Date('2024-01-26'), notes: null },
    { id: 30, invoice_id: 31, patient_id: 31, amount: 12000.00,  method: 'cash',      payment_date: new Date('2024-01-29'), notes: null },
    { id: 31, invoice_id: 32, patient_id: 32, amount: 45000.00,  method: 'card',      payment_date: new Date('2024-01-29'), notes: null },
    { id: 32, invoice_id: 33, patient_id: 33, amount: 18000.00,  method: 'cash',      payment_date: new Date('2024-01-30'), notes: null },
    { id: 33, invoice_id: 34, patient_id: 34, amount: 2500.00,   method: 'cash',      payment_date: new Date('2024-01-30'), notes: null },
    { id: 34, invoice_id: 35, patient_id: 35, amount: 15000.00,  method: 'card',      payment_date: new Date('2024-01-31'), notes: null },
    { id: 35, invoice_id: 36, patient_id: 36, amount: 8000.00,   method: 'cash',      payment_date: new Date('2024-01-31'), notes: null },
    { id: 36, invoice_id: 37, patient_id: 37, amount: 12000.00,  method: 'card',      payment_date: new Date('2024-02-01'), notes: null },
    { id: 37, invoice_id: 38, patient_id: 38, amount: 25000.00,  method: 'insurance', payment_date: new Date('2024-02-01'), notes: null },
    { id: 38, invoice_id: 39, patient_id: 40, amount: 65000.00,  method: 'transfer',  payment_date: new Date('2024-02-02'), notes: null },
    { id: 39, invoice_id: 41, patient_id: 42, amount: 18000.00,  method: 'cash',      payment_date: new Date('2024-02-05'), notes: null },
    { id: 40, invoice_id: 42, patient_id: 25, amount: 85000.00,  method: 'transfer',  payment_date: new Date('2024-02-10'), notes: null },
    { id: 41, invoice_id: 43, patient_id: 11, amount: 18000.00,  method: 'card',      payment_date: new Date('2024-02-12'), notes: null },
    { id: 42, invoice_id: 44, patient_id: 17, amount: 25000.00,  method: 'cash',      payment_date: new Date('2024-02-20'), notes: 'Partial payment — remaining 25000 overdue' },
    { id: 43, invoice_id: 45, patient_id: 5,  amount: 40000.00,  method: 'card',      payment_date: new Date('2024-02-25'), notes: 'Partial deposit for crown fabrication' },
    { id: 44, invoice_id: 9,  patient_id: 9,  amount: 8000.00,   method: 'cash',      payment_date: new Date('2024-02-15'), notes: 'Second visit payment — cleaning follow-up' },
    { id: 45, invoice_id: 10, patient_id: 10, amount: 5000.00,   method: 'card',      payment_date: new Date('2024-02-17'), notes: 'Follow-up exam payment' },
  ];
  _nextId['payments'] = 46;
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
