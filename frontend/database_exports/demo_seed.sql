-- PrimeCore demo data seed.
-- Run this only on a development database after importing schema.sql/current_data.sql.
-- The script is additive: it does not delete or truncate existing records.

BEGIN;

-- Core roles, in case the seed is run against a fresh schema.
INSERT INTO public.roles (created_at, description, role_name)
VALUES
  (now(), 'System administrator', 'ADMIN'),
  (now(), 'Bank officer user', 'BANK_OFFICER'),
  (now(), 'Bank customer user', 'BANK_CUSTOMER'),
  (now(), 'Public customer user', 'PUBLIC_CUSTOMER')
ON CONFLICT (role_name) DO UPDATE
SET description = EXCLUDED.description;

-- Reference data used by LoanSense detail views.
INSERT INTO public.risk_adjustments (created_at, description, multiplier, risk_level, updated_at)
VALUES
  (now(), 'Strong repayment profile with controlled utilization.', 1.00, 'HIGH', now()),
  (now(), 'Moderate profile with some debt pressure.', 0.85, 'MEDIUM', now()),
  (now(), 'Conservative lending limit due to repayment or utilization risk.', 0.70, 'LOW', now())
ON CONFLICT (risk_level) DO UPDATE
SET description = EXCLUDED.description,
    multiplier = EXCLUDED.multiplier,
    updated_at = now();

-- Extra branches so admin branch-management has enough rows for filters and pagination.
INSERT INTO public.branches (
  address,
  branch_code,
  branch_email,
  branch_name,
  branch_phone,
  created_at,
  status,
  updated_at
)
VALUES
  ('No 44, Lake Road, Kandy', 'KAN-002', 'kandy.city@primecore.local', 'Kandy City', '0812001201', now(), 'ACTIVE', now()),
  ('No 12, Fort Street, Galle', 'GAL-003', 'galle.fort@primecore.local', 'Galle Fort', '0912001301', now(), 'ACTIVE', now()),
  ('No 88, Main Street, Kurunegala', 'KUR-004', 'kurunegala.main@primecore.local', 'Kurunegala Main', '0372001401', now(), 'ACTIVE', now()),
  ('No 21, Hospital Road, Jaffna', 'JAF-005', 'jaffna.central@primecore.local', 'Jaffna Central', '0212001501', now(), 'INACTIVE', now())
ON CONFLICT (branch_code) DO UPDATE
SET address = EXCLUDED.address,
    branch_email = EXCLUDED.branch_email,
    branch_name = EXCLUDED.branch_name,
    branch_phone = EXCLUDED.branch_phone,
    status = EXCLUDED.status,
    updated_at = now();

-- Extra users for admin user-management, officer-management, and customer-management pages.
WITH seed_users (
  address,
  dob,
  email,
  first_name,
  last_name,
  nic,
  password_hash,
  phone,
  province,
  status,
  username,
  role_name
) AS (
  VALUES
    ('No 12, Reid Avenue, Colombo', DATE '1988-02-14', 'seed.officer01@primecore.local', 'Ravindu', 'Perera', '880214900101', 'Demo@1234', '0774010101', 'Western', 'ACTIVE', 'seed.officer01', 'BANK_OFFICER'),
    ('No 32, Temple Road, Kandy', DATE '1991-07-09', 'seed.officer02@primecore.local', 'Hashini', 'Fernando', '910709900102', 'Demo@1234', '0774010102', 'Central', 'ACTIVE', 'seed.officer02', 'BANK_OFFICER'),
    ('No 8, Sea Street, Galle', DATE '1986-11-23', 'seed.officer03@primecore.local', 'Malith', 'Jayawardena', '861123900103', 'Demo@1234', '0774010103', 'Southern', 'INACTIVE', 'seed.officer03', 'BANK_OFFICER'),
    ('No 18, Lake View, Kurunegala', DATE '1993-04-19', 'seed.officer04@primecore.local', 'Nethmi', 'Gunasekara', '930419900104', 'Demo@1234', '0774010104', 'North Western', 'ACTIVE', 'seed.officer04', 'BANK_OFFICER'),
    ('No 5, Station Road, Jaffna', DATE '1990-09-30', 'seed.officer05@primecore.local', 'Arun', 'Nadarajah', '900930900105', 'Demo@1234', '0774010105', 'Northern', 'ACTIVE', 'seed.officer05', 'BANK_OFFICER'),
    ('No 31, Union Place, Colombo', DATE '1992-01-12', 'seed.bankcustomer01@primecore.local', 'Amila', 'Silva', '920112900201', 'Demo@1234', '0774020201', 'Western', 'ACTIVE', 'seed.bankcustomer01', 'BANK_CUSTOMER'),
    ('No 10, Hill Street, Kandy', DATE '1989-05-05', 'seed.bankcustomer02@primecore.local', 'Malani', 'Jayasinha', '890505900202', 'Demo@1234', '0774020202', 'Central', 'ACTIVE', 'seed.bankcustomer02', 'BANK_CUSTOMER'),
    ('No 19, Beach Road, Galle', DATE '1994-06-22', 'seed.bankcustomer03@primecore.local', 'Dinesh', 'Fernando', '940622900203', 'Demo@1234', '0774020203', 'Southern', 'ACTIVE', 'seed.bankcustomer03', 'BANK_CUSTOMER'),
    ('No 2, Green Lane, Colombo', DATE '1996-03-17', 'seed.bankcustomer04@primecore.local', 'Nadeesha', 'Perera', '960317900204', 'Demo@1234', '0774020204', 'Western', 'INACTIVE', 'seed.bankcustomer04', 'BANK_CUSTOMER'),
    ('No 72, High Level Road, Nugegoda', DATE '1987-08-28', 'seed.bankcustomer05@primecore.local', 'Sahan', 'Wijesinghe', '870828900205', 'Demo@1234', '0774020205', 'Western', 'ACTIVE', 'seed.bankcustomer05', 'BANK_CUSTOMER'),
    ('No 14, Main Street, Kurunegala', DATE '1995-12-04', 'seed.bankcustomer06@primecore.local', 'Tharushi', 'Bandara', '951204900206', 'Demo@1234', '0774020206', 'North Western', 'ACTIVE', 'seed.bankcustomer06', 'BANK_CUSTOMER'),
    ('No 44, River Road, Matara', DATE '1990-10-11', 'seed.bankcustomer07@primecore.local', 'Kasun', 'Rathnayake', '901011900207', 'Demo@1234', '0774020207', 'Southern', 'ACTIVE', 'seed.bankcustomer07', 'BANK_CUSTOMER'),
    ('No 7, Market Road, Jaffna', DATE '1998-07-13', 'seed.bankcustomer08@primecore.local', 'Yalini', 'Sivakumar', '980713900208', 'Demo@1234', '0774020208', 'Northern', 'ACTIVE', 'seed.bankcustomer08', 'BANK_CUSTOMER'),
    ('No 22, Park Road, Colombo', DATE '1993-02-07', 'seed.bankcustomer09@primecore.local', 'Kavindu', 'Dias', '930207900209', 'Demo@1234', '0774020209', 'Western', 'ACTIVE', 'seed.bankcustomer09', 'BANK_CUSTOMER'),
    ('No 37, Cross Street, Gampaha', DATE '1991-09-14', 'seed.bankcustomer10@primecore.local', 'Ishara', 'Madushani', '910914900210', 'Demo@1234', '0774020210', 'Western', 'ACTIVE', 'seed.bankcustomer10', 'BANK_CUSTOMER'),
    ('No 61, Temple Lane, Kandy', DATE '1985-04-24', 'seed.bankcustomer11@primecore.local', 'Ruwan', 'Senanayake', '850424900211', 'Demo@1234', '0774020211', 'Central', 'ACTIVE', 'seed.bankcustomer11', 'BANK_CUSTOMER'),
    ('No 9, New Road, Negombo', DATE '1997-11-29', 'seed.bankcustomer12@primecore.local', 'Sanduni', 'Costa', '971129900212', 'Demo@1234', '0774020212', 'Western', 'ACTIVE', 'seed.bankcustomer12', 'BANK_CUSTOMER')
)
INSERT INTO public.users (
  address,
  created_at,
  dob,
  email,
  first_name,
  last_name,
  nic,
  password_hash,
  phone,
  profile_picture_url,
  province,
  status,
  updated_at,
  username,
  role_id
)
SELECT
  su.address,
  now(),
  su.dob,
  su.email,
  su.first_name,
  su.last_name,
  su.nic,
  su.password_hash,
  su.phone,
  NULL,
  su.province,
  su.status,
  now(),
  su.username,
  r.role_id
FROM seed_users su
JOIN public.roles r ON r.role_name = su.role_name
ON CONFLICT (email) DO UPDATE
SET address = EXCLUDED.address,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    phone = EXCLUDED.phone,
    province = EXCLUDED.province,
    status = EXCLUDED.status,
    updated_at = now(),
    role_id = EXCLUDED.role_id;

-- Extra officers for admin officer-management pages.
WITH seed_officers (username, employee_code, branch_code) AS (
  VALUES
    ('seed.officer01', 'EMP-SEED-001', 'KAN-002'),
    ('seed.officer02', 'EMP-SEED-002', 'GAL-003'),
    ('seed.officer03', 'EMP-SEED-003', 'KUR-004'),
    ('seed.officer04', 'EMP-SEED-004', 'COL-001'),
    ('seed.officer05', 'EMP-SEED-005', 'JAF-005')
)
INSERT INTO public.bank_officers (
  created_at,
  employee_code,
  updated_at,
  branch_id,
  created_by_admin_user_id,
  user_id
)
SELECT
  now(),
  so.employee_code,
  now(),
  b.branch_id,
  admin_user.user_id,
  u.user_id
FROM seed_officers so
JOIN public.users u ON u.username = so.username
JOIN public.branches b ON b.branch_code = so.branch_code
LEFT JOIN public.users admin_user ON admin_user.username = 'admin.demo'
ON CONFLICT (employee_code) DO UPDATE
SET updated_at = now(),
    branch_id = EXCLUDED.branch_id,
    created_by_admin_user_id = EXCLUDED.created_by_admin_user_id,
    user_id = EXCLUDED.user_id;

-- Accounts for new bank customers.
WITH seed_accounts (account_number, account_type, balance, status) AS (
  VALUES
    ('300000000101', 'SAVINGS', 485000.00, 'ACTIVE'),
    ('300000000102', 'SAVINGS', 152000.00, 'ACTIVE'),
    ('300000000103', 'CURRENT', 730000.00, 'ACTIVE'),
    ('300000000104', 'SAVINGS', 28000.00, 'INACTIVE'),
    ('300000000105', 'SAVINGS', 925000.00, 'ACTIVE'),
    ('300000000106', 'CURRENT', 318000.00, 'ACTIVE'),
    ('300000000107', 'SAVINGS', 64000.00, 'ACTIVE'),
    ('300000000108', 'SAVINGS', 212000.00, 'ACTIVE'),
    ('300000000109', 'CURRENT', 535000.00, 'ACTIVE'),
    ('300000000110', 'SAVINGS', 87000.00, 'ACTIVE'),
    ('300000000111', 'SAVINGS', 1190000.00, 'ACTIVE'),
    ('300000000112', 'SAVINGS', 405000.00, 'ACTIVE')
)
INSERT INTO public.accounts (
  account_number,
  account_type,
  balance,
  created_at,
  status,
  updated_at
)
SELECT
  account_number,
  account_type,
  balance,
  now(),
  status,
  now()
FROM seed_accounts
ON CONFLICT (account_number) DO UPDATE
SET account_type = EXCLUDED.account_type,
    balance = EXCLUDED.balance,
    status = EXCLUDED.status,
    updated_at = now();

-- Extra bank customers assigned to the existing demo officer EMP-BO-00001.
-- This makes the bank-officer all-customers table useful when logged in as officer.demo.
WITH seed_bank_customers (
  username,
  customer_code,
  account_number,
  branch_code,
  officer_code,
  access_status
) AS (
  VALUES
    ('seed.bankcustomer01', 'BC-SEED-0001', '300000000101', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer02', 'BC-SEED-0002', '300000000102', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer03', 'BC-SEED-0003', '300000000103', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer04', 'BC-SEED-0004', '300000000104', 'COL-001', 'EMP-BO-00001', 'INACTIVE'),
    ('seed.bankcustomer05', 'BC-SEED-0005', '300000000105', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer06', 'BC-SEED-0006', '300000000106', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer07', 'BC-SEED-0007', '300000000107', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer08', 'BC-SEED-0008', '300000000108', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer09', 'BC-SEED-0009', '300000000109', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer10', 'BC-SEED-0010', '300000000110', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer11', 'BC-SEED-0011', '300000000111', 'COL-001', 'EMP-BO-00001', 'ACTIVE'),
    ('seed.bankcustomer12', 'BC-SEED-0012', '300000000112', 'COL-001', 'EMP-BO-00001', 'ACTIVE')
)
INSERT INTO public.bank_customers (
  access_status,
  created_at,
  customer_code,
  updated_at,
  account_id,
  branch_id,
  officer_id,
  user_id
)
SELECT
  sbc.access_status,
  now(),
  sbc.customer_code,
  now(),
  a.account_id,
  b.branch_id,
  bo.officer_id,
  u.user_id
FROM seed_bank_customers sbc
JOIN public.users u ON u.username = sbc.username
JOIN public.accounts a ON a.account_number = sbc.account_number
JOIN public.branches b ON b.branch_code = sbc.branch_code
JOIN public.bank_officers bo ON bo.employee_code = sbc.officer_code
ON CONFLICT (customer_code) DO UPDATE
SET access_status = EXCLUDED.access_status,
    updated_at = now(),
    account_id = EXCLUDED.account_id,
    branch_id = EXCLUDED.branch_id,
    officer_id = EXCLUDED.officer_id,
    user_id = EXCLUDED.user_id;

-- Current financial records for the new officer-demo customers.
WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  total_monthly_income,
  total_monthly_debt_payment,
  total_card_limit,
  total_card_outstanding,
  missed_payments_count,
  active_facilities_count,
  risk_level,
  total_risk_points,
  dti_ratio,
  credit_utilization_ratio,
  dti_points,
  utilization_points,
  income_stability_points,
  payment_history_points,
  exposure_points
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 135000.00, 42000.00, 180000.00, 50400.00, 0, 2, 'HIGH', 82, 0.3111, 0.2800, 12, 20, 15, 30, 5),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 96000.00, 38000.00, 120000.00, 72000.00, 1, 3, 'MEDIUM', 59, 0.3958, 0.6000, 12, 10, 15, 18, 4),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 220000.00, 55000.00, 260000.00, 41600.00, 0, 2, 'HIGH', 88, 0.2500, 0.1600, 25, 20, 15, 30, 8),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 78000.00, 52000.00, 90000.00, 81000.00, 3, 4, 'LOW', 24, 0.6667, 0.9000, 0, 0, 8, 8, 8),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 180000.00, 62500.00, 200000.00, 90000.00, 1, 3, 'MEDIUM', 67, 0.3472, 0.4500, 12, 10, 15, 18, 12),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 145000.00, 32000.00, 150000.00, 30000.00, 0, 1, 'HIGH', 91, 0.2207, 0.2000, 25, 20, 15, 30, 1),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 85000.00, 47000.00, 110000.00, 77000.00, 2, 4, 'LOW', 33, 0.5529, 0.7000, 0, 8, 8, 8, 9),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 112000.00, 41000.00, 130000.00, 45500.00, 1, 2, 'MEDIUM', 61, 0.3661, 0.3500, 12, 20, 8, 18, 3),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 165000.00, 58000.00, 180000.00, 54000.00, 0, 3, 'HIGH', 79, 0.3515, 0.3000, 12, 20, 15, 30, 2),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 72000.00, 49000.00, 95000.00, 80750.00, 3, 5, 'LOW', 21, 0.6806, 0.8500, 0, 0, 8, 8, 5),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 260000.00, 72000.00, 320000.00, 96000.00, 0, 3, 'HIGH', 86, 0.2769, 0.3000, 25, 20, 15, 30, 6),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 124000.00, 51500.00, 145000.00, 79750.00, 2, 4, 'MEDIUM', 52, 0.4153, 0.5500, 12, 10, 8, 18, 4)
)
INSERT INTO public.bank_customer_financial_records (
  created_at,
  data_source,
  updated_at,
  bank_customer_id,
  verified_by_officer_id
)
SELECT
  scp.record_created_at,
  'MANUAL',
  scp.record_created_at,
  bc.bank_customer_id,
  bo.officer_id
FROM seed_credit_profiles scp
JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
JOIN public.bank_officers bo ON bo.employee_code = 'EMP-BO-00001'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.bank_customer_financial_records fr
  WHERE fr.bank_customer_id = bc.bank_customer_id
    AND fr.created_at = scp.record_created_at
);

WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  total_monthly_income,
  total_monthly_debt_payment,
  total_card_limit,
  total_card_outstanding,
  missed_payments_count,
  active_facilities_count
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 135000.00, 42000.00, 180000.00, 50400.00, 0, 2),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 96000.00, 38000.00, 120000.00, 72000.00, 1, 3),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 220000.00, 55000.00, 260000.00, 41600.00, 0, 2),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 78000.00, 52000.00, 90000.00, 81000.00, 3, 4),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 180000.00, 62500.00, 200000.00, 90000.00, 1, 3),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 145000.00, 32000.00, 150000.00, 30000.00, 0, 1),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 85000.00, 47000.00, 110000.00, 77000.00, 2, 4),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 112000.00, 41000.00, 130000.00, 45500.00, 1, 2),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 165000.00, 58000.00, 180000.00, 54000.00, 0, 3),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 72000.00, 49000.00, 95000.00, 80750.00, 3, 5),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 260000.00, 72000.00, 320000.00, 96000.00, 0, 3),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 124000.00, 51500.00, 145000.00, 79750.00, 2, 4)
),
records AS (
  SELECT scp.*, fr.bank_record_id
  FROM seed_credit_profiles scp
  JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
  JOIN public.bank_customer_financial_records fr
    ON fr.bank_customer_id = bc.bank_customer_id
   AND fr.created_at = scp.record_created_at
)
INSERT INTO public.bank_customer_incomes (
  amount,
  created_at,
  duration_months,
  employment_type,
  income_category,
  income_stability,
  salary_type,
  bank_record_id
)
SELECT
  r.total_monthly_income,
  r.record_created_at + INTERVAL '5 minutes',
  24,
  'PERMANENT',
  'SALARY',
  'STABLE',
  'FIXED_BASIC_SALARY',
  r.bank_record_id
FROM records r
WHERE NOT EXISTS (
  SELECT 1 FROM public.bank_customer_incomes i WHERE i.bank_record_id = r.bank_record_id
);

WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  total_monthly_debt_payment,
  total_card_limit,
  total_card_outstanding,
  missed_payments_count,
  active_facilities_count
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 42000.00, 180000.00, 50400.00, 0, 2),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 38000.00, 120000.00, 72000.00, 1, 3),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 55000.00, 260000.00, 41600.00, 0, 2),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 52000.00, 90000.00, 81000.00, 3, 4),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 62500.00, 200000.00, 90000.00, 1, 3),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 32000.00, 150000.00, 30000.00, 0, 1),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 47000.00, 110000.00, 77000.00, 2, 4),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 41000.00, 130000.00, 45500.00, 1, 2),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 58000.00, 180000.00, 54000.00, 0, 3),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 49000.00, 95000.00, 80750.00, 3, 5),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 72000.00, 320000.00, 96000.00, 0, 3),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 51500.00, 145000.00, 79750.00, 2, 4)
),
records AS (
  SELECT scp.*, fr.bank_record_id
  FROM seed_credit_profiles scp
  JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
  JOIN public.bank_customer_financial_records fr
    ON fr.bank_customer_id = bc.bank_customer_id
   AND fr.created_at = scp.record_created_at
)
INSERT INTO public.bank_customer_loans (
  created_at,
  loan_type,
  monthly_emi,
  remaining_balance,
  bank_record_id
)
SELECT
  r.record_created_at + INTERVAL '10 minutes',
  'PERSONAL_LOAN',
  ROUND(r.total_monthly_debt_payment * 0.72, 2),
  ROUND(r.total_monthly_debt_payment * 22.00, 2),
  r.bank_record_id
FROM records r
WHERE NOT EXISTS (
  SELECT 1 FROM public.bank_customer_loans l WHERE l.bank_record_id = r.bank_record_id
);

WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  total_monthly_debt_payment,
  total_card_limit,
  total_card_outstanding,
  missed_payments_count
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 42000.00, 180000.00, 50400.00, 0),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 38000.00, 120000.00, 72000.00, 1),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 55000.00, 260000.00, 41600.00, 0),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 52000.00, 90000.00, 81000.00, 3),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 62500.00, 200000.00, 90000.00, 1),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 32000.00, 150000.00, 30000.00, 0),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 47000.00, 110000.00, 77000.00, 2),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 41000.00, 130000.00, 45500.00, 1),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 58000.00, 180000.00, 54000.00, 0),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 49000.00, 95000.00, 80750.00, 3),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 72000.00, 320000.00, 96000.00, 0),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 51500.00, 145000.00, 79750.00, 2)
),
records AS (
  SELECT scp.*, fr.bank_record_id
  FROM seed_credit_profiles scp
  JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
  JOIN public.bank_customer_financial_records fr
    ON fr.bank_customer_id = bc.bank_customer_id
   AND fr.created_at = scp.record_created_at
)
INSERT INTO public.bank_customer_cards (
  created_at,
  credit_limit,
  outstanding_balance,
  provider,
  bank_record_id
)
SELECT
  r.record_created_at + INTERVAL '15 minutes',
  r.total_card_limit,
  r.total_card_outstanding,
  'PrimeCore Visa',
  r.bank_record_id
FROM records r
WHERE NOT EXISTS (
  SELECT 1 FROM public.bank_customer_cards c WHERE c.bank_record_id = r.bank_record_id
);

WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  total_monthly_debt_payment,
  missed_payments_count
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 42000.00, 0),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 38000.00, 1),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 55000.00, 0),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 52000.00, 3),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 62500.00, 1),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 32000.00, 0),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 47000.00, 2),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 41000.00, 1),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 58000.00, 0),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 49000.00, 3),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 72000.00, 0),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 51500.00, 2)
),
records AS (
  SELECT scp.*, fr.bank_record_id
  FROM seed_credit_profiles scp
  JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
  JOIN public.bank_customer_financial_records fr
    ON fr.bank_customer_id = bc.bank_customer_id
   AND fr.created_at = scp.record_created_at
)
INSERT INTO public.bank_customer_liabilities (
  created_at,
  description,
  monthly_amount,
  bank_record_id
)
SELECT
  r.record_created_at + INTERVAL '20 minutes',
  'Utilities and subscription commitments',
  ROUND(r.total_monthly_debt_payment * 0.18, 2),
  r.bank_record_id
FROM records r
WHERE NOT EXISTS (
  SELECT 1 FROM public.bank_customer_liabilities li WHERE li.bank_record_id = r.bank_record_id
);

WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  missed_payments_count
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 0),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 1),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 0),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 3),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 1),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 0),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 2),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 1),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 0),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 3),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 0),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 2)
),
records AS (
  SELECT scp.*, fr.bank_record_id
  FROM seed_credit_profiles scp
  JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
  JOIN public.bank_customer_financial_records fr
    ON fr.bank_customer_id = bc.bank_customer_id
   AND fr.created_at = scp.record_created_at
)
INSERT INTO public.bank_customer_missed_payments (
  created_at,
  missed_payments,
  bank_record_id
)
SELECT
  r.record_created_at + INTERVAL '25 minutes',
  r.missed_payments_count,
  r.bank_record_id
FROM records r
WHERE NOT EXISTS (
  SELECT 1 FROM public.bank_customer_missed_payments mp WHERE mp.bank_record_id = r.bank_record_id
);

WITH seed_credit_profiles (
  customer_code,
  record_created_at,
  total_monthly_income,
  total_monthly_debt_payment,
  total_card_limit,
  total_card_outstanding,
  missed_payments_count,
  active_facilities_count,
  risk_level,
  total_risk_points,
  dti_ratio,
  credit_utilization_ratio,
  dti_points,
  utilization_points,
  income_stability_points,
  payment_history_points,
  exposure_points
) AS (
  VALUES
    ('BC-SEED-0001', TIMESTAMP '2026-06-01 09:00:00', 135000.00, 42000.00, 180000.00, 50400.00, 0, 2, 'HIGH', 82, 0.3111, 0.2800, 12, 20, 15, 30, 5),
    ('BC-SEED-0002', TIMESTAMP '2026-06-01 09:05:00', 96000.00, 38000.00, 120000.00, 72000.00, 1, 3, 'MEDIUM', 59, 0.3958, 0.6000, 12, 10, 15, 18, 4),
    ('BC-SEED-0003', TIMESTAMP '2026-06-01 09:10:00', 220000.00, 55000.00, 260000.00, 41600.00, 0, 2, 'HIGH', 88, 0.2500, 0.1600, 25, 20, 15, 30, 8),
    ('BC-SEED-0004', TIMESTAMP '2026-06-01 09:15:00', 78000.00, 52000.00, 90000.00, 81000.00, 3, 4, 'LOW', 24, 0.6667, 0.9000, 0, 0, 8, 8, 8),
    ('BC-SEED-0005', TIMESTAMP '2026-06-01 09:20:00', 180000.00, 62500.00, 200000.00, 90000.00, 1, 3, 'MEDIUM', 67, 0.3472, 0.4500, 12, 10, 15, 18, 12),
    ('BC-SEED-0006', TIMESTAMP '2026-06-01 09:25:00', 145000.00, 32000.00, 150000.00, 30000.00, 0, 1, 'HIGH', 91, 0.2207, 0.2000, 25, 20, 15, 30, 1),
    ('BC-SEED-0007', TIMESTAMP '2026-06-01 09:30:00', 85000.00, 47000.00, 110000.00, 77000.00, 2, 4, 'LOW', 33, 0.5529, 0.7000, 0, 8, 8, 8, 9),
    ('BC-SEED-0008', TIMESTAMP '2026-06-01 09:35:00', 112000.00, 41000.00, 130000.00, 45500.00, 1, 2, 'MEDIUM', 61, 0.3661, 0.3500, 12, 20, 8, 18, 3),
    ('BC-SEED-0009', TIMESTAMP '2026-06-01 09:40:00', 165000.00, 58000.00, 180000.00, 54000.00, 0, 3, 'HIGH', 79, 0.3515, 0.3000, 12, 20, 15, 30, 2),
    ('BC-SEED-0010', TIMESTAMP '2026-06-01 09:45:00', 72000.00, 49000.00, 95000.00, 80750.00, 3, 5, 'LOW', 21, 0.6806, 0.8500, 0, 0, 8, 8, 5),
    ('BC-SEED-0011', TIMESTAMP '2026-06-01 09:50:00', 260000.00, 72000.00, 320000.00, 96000.00, 0, 3, 'HIGH', 86, 0.2769, 0.3000, 25, 20, 15, 30, 6),
    ('BC-SEED-0012', TIMESTAMP '2026-06-01 09:55:00', 124000.00, 51500.00, 145000.00, 79750.00, 2, 4, 'MEDIUM', 52, 0.4153, 0.5500, 12, 10, 8, 18, 4)
)
INSERT INTO public.bank_credit_evaluations (
  active_facilities_count,
  created_at,
  credit_utilization_ratio,
  dti_points,
  dti_ratio,
  evaluation_source,
  exposure_points,
  income_stability_points,
  missed_payments_count,
  payment_history_points,
  remarks,
  report_generated,
  risk_level,
  total_card_limit,
  total_card_outstanding,
  total_monthly_debt_payment,
  total_monthly_income,
  total_risk_points,
  utilization_points,
  bank_customer_id,
  bank_record_id,
  evaluated_by_officer_id
)
SELECT
  scp.active_facilities_count,
  scp.record_created_at + INTERVAL '30 minutes',
  scp.credit_utilization_ratio,
  scp.dti_points,
  scp.dti_ratio,
  'MANUAL',
  scp.exposure_points,
  scp.income_stability_points,
  scp.missed_payments_count,
  scp.payment_history_points,
  'Demo seed evaluation for officer portfolio testing',
  true,
  scp.risk_level,
  scp.total_card_limit,
  scp.total_card_outstanding,
  scp.total_monthly_debt_payment,
  scp.total_monthly_income,
  scp.total_risk_points,
  scp.utilization_points,
  bc.bank_customer_id,
  fr.bank_record_id,
  bo.officer_id
FROM seed_credit_profiles scp
JOIN public.bank_customers bc ON bc.customer_code = scp.customer_code
JOIN public.bank_customer_financial_records fr
  ON fr.bank_customer_id = bc.bank_customer_id
 AND fr.created_at = scp.record_created_at
JOIN public.bank_officers bo ON bo.employee_code = 'EMP-BO-00001'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.bank_credit_evaluations bce
  WHERE bce.bank_record_id = fr.bank_record_id
    AND bce.bank_customer_id = bc.bank_customer_id
);

-- Transact beneficiaries.
WITH seed_beneficiaries (customer_code, account_no, nick_name, remark) AS (
  VALUES
    ('BC-MENTOR-12M-001', '500000000101', 'Green Mart', 'Groceries and retail'),
    ('BC-MENTOR-12M-001', '500000000102', 'Metro Utilities', 'Monthly utility bills'),
    ('BC-MENTOR-12M-001', '500000000103', 'Nuwan Fernando', 'Family transfer'),
    ('BC-00001', '500000000201', 'Lanka Leasing', 'Vehicle lease'),
    ('BC-00001', '500000000202', 'City Pharmacy', 'Healthcare payments')
)
INSERT INTO public.bank_customer_beneficiaries (
  beneficiary_account_no,
  created_at,
  nick_name,
  remark,
  updated_at,
  bank_customer_id
)
SELECT
  sb.account_no,
  now(),
  sb.nick_name,
  sb.remark,
  now(),
  bc.bank_customer_id
FROM seed_beneficiaries sb
JOIN public.bank_customers bc ON bc.customer_code = sb.customer_code
ON CONFLICT (bank_customer_id, beneficiary_account_no) DO UPDATE
SET nick_name = EXCLUDED.nick_name,
    remark = EXCLUDED.remark,
    updated_at = now();

-- Transact history for bank customer and officer transaction tables.
WITH seed_transactions (
  customer_code,
  reference_no,
  transaction_date,
  receiver_account_no,
  receiver_name,
  amount,
  remark,
  status,
  otp_verified,
  expense_tracking_enabled,
  failure_reason
) AS (
  VALUES
    ('BC-MENTOR-12M-001', 'TRX-SEED-0001', TIMESTAMP '2026-06-18 09:15:00', '500000000101', 'Green Mart', 3450.00, 'Weekly groceries', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0002', TIMESTAMP '2026-06-17 15:40:00', '500000000102', 'Metro Utilities', 12850.00, 'Electricity bill', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0003', TIMESTAMP '2026-06-16 11:05:00', '500000000103', 'Nuwan Fernando', 25000.00, 'Family support', 'SUCCESS', true, false, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0004', TIMESTAMP '2026-06-15 18:20:00', '500000000104', 'City Pharmacy', 6450.00, 'Medicine purchase', 'FAILED', false, true, 'OTP verification failed'),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0005', TIMESTAMP '2026-06-14 08:35:00', '500000000105', 'Lanka Fuel', 7800.00, 'Fuel refill', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0006', TIMESTAMP '2026-06-13 20:10:00', '500000000106', 'EduPay Institute', 18500.00, 'Course payment', 'PENDING_OTP', false, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0007', TIMESTAMP '2026-06-12 13:50:00', '500000000107', 'Cafe Aroma', 2850.00, 'Team lunch', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0008', TIMESTAMP '2026-06-11 10:25:00', '500000000108', 'Online Store', 21900.00, 'Office chair', 'CANCELLED', false, true, 'Customer cancelled before OTP verification'),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0009', TIMESTAMP '2026-06-10 16:30:00', '500000000109', 'Home Needs', 9400.00, 'Household items', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0010', TIMESTAMP '2026-06-09 12:10:00', '500000000110', 'Quick Taxi', 1650.00, 'Taxi ride', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0011', TIMESTAMP '2026-06-08 17:45:00', '500000000111', 'HealthPlus Lab', 11200.00, 'Medical tests', 'SUCCESS', true, true, NULL),
    ('BC-MENTOR-12M-001', 'TRX-SEED-0012', TIMESTAMP '2026-06-07 19:05:00', '500000000112', 'StreamBox', 2200.00, 'Subscription renewal', 'SUCCESS', true, true, NULL),
    ('BC-00001', 'TRX-SEED-0101', TIMESTAMP '2026-06-18 10:00:00', '500000000201', 'Lanka Leasing', 42000.00, 'Lease installment', 'SUCCESS', true, true, NULL),
    ('BC-00001', 'TRX-SEED-0102', TIMESTAMP '2026-06-17 09:30:00', '500000000202', 'City Pharmacy', 5300.00, 'Prescription refill', 'SUCCESS', true, true, NULL),
    ('BC-00001', 'TRX-SEED-0103', TIMESTAMP '2026-06-16 14:15:00', '500000000203', 'Green Mart', 8700.00, 'Groceries', 'FAILED', false, true, 'Insufficient balance at verification'),
    ('BC-00001', 'TRX-SEED-0104', TIMESTAMP '2026-06-15 16:50:00', '500000000204', 'Metro Utilities', 9600.00, 'Water bill', 'SUCCESS', true, true, NULL),
    ('BC-SEED-0001', 'TRX-SEED-0201', TIMESTAMP '2026-06-14 09:10:00', '500000000301', 'Supplier One', 15000.00, 'Business supplies', 'SUCCESS', true, true, NULL),
    ('BC-SEED-0002', 'TRX-SEED-0202', TIMESTAMP '2026-06-13 12:25:00', '500000000302', 'Travel Desk', 23500.00, 'Travel booking', 'SUCCESS', true, true, NULL),
    ('BC-SEED-0003', 'TRX-SEED-0203', TIMESTAMP '2026-06-12 15:45:00', '500000000303', 'School Office', 18000.00, 'School fee', 'SUCCESS', true, true, NULL),
    ('BC-SEED-0004', 'TRX-SEED-0204', TIMESTAMP '2026-06-11 18:05:00', '500000000304', 'Retail World', 4200.00, 'Card settlement', 'FAILED', false, true, 'Customer account inactive'),
    ('BC-SEED-0005', 'TRX-SEED-0205', TIMESTAMP '2026-06-10 20:30:00', '500000000305', 'Event Hub', 12500.00, 'Event ticket', 'PENDING_OTP', false, true, NULL),
    ('BC-SEED-0006', 'TRX-SEED-0206', TIMESTAMP '2026-06-09 11:15:00', '500000000306', 'Insurance Co', 28500.00, 'Insurance premium', 'SUCCESS', true, true, NULL)
)
INSERT INTO public.bank_customer_transactions (
  amount,
  created_at,
  expense_tracking_enabled,
  failure_reason,
  otp_verified,
  receiver_account_no,
  receiver_name,
  reference_no,
  remark,
  sender_account_no,
  status,
  transaction_date,
  updated_at,
  bank_customer_id
)
SELECT
  st.amount,
  st.transaction_date,
  st.expense_tracking_enabled,
  st.failure_reason,
  st.otp_verified,
  st.receiver_account_no,
  st.receiver_name,
  st.reference_no,
  st.remark,
  a.account_number,
  st.status,
  st.transaction_date,
  st.transaction_date + INTERVAL '2 minutes',
  bc.bank_customer_id
FROM seed_transactions st
JOIN public.bank_customers bc ON bc.customer_code = st.customer_code
JOIN public.accounts a ON a.account_id = bc.account_id
ON CONFLICT (reference_no) DO UPDATE
SET amount = EXCLUDED.amount,
    expense_tracking_enabled = EXCLUDED.expense_tracking_enabled,
    failure_reason = EXCLUDED.failure_reason,
    otp_verified = EXCLUDED.otp_verified,
    receiver_account_no = EXCLUDED.receiver_account_no,
    receiver_name = EXCLUDED.receiver_name,
    remark = EXCLUDED.remark,
    sender_account_no = EXCLUDED.sender_account_no,
    status = EXCLUDED.status,
    transaction_date = EXCLUDED.transaction_date,
    updated_at = EXCLUDED.updated_at,
    bank_customer_id = EXCLUDED.bank_customer_id;

-- OTP logs for transaction dashboards.
INSERT INTO public.bank_customer_transaction_otp_logs (
  created_at,
  expires_at,
  otp_code_hash,
  otp_status,
  resend_count,
  sent_to_email,
  updated_at,
  verified_at,
  transaction_id
)
SELECT
  t.created_at,
  t.created_at + INTERVAL '5 minutes',
  'seed-otp-hash-' || t.reference_no,
  CASE
    WHEN t.status = 'SUCCESS' THEN 'VERIFIED'
    WHEN t.status = 'FAILED' THEN 'FAILED'
    WHEN t.status = 'CANCELLED' THEN 'EXPIRED'
    ELSE 'SENT'
  END,
  0,
  u.email,
  t.updated_at,
  CASE WHEN t.status = 'SUCCESS' THEN t.updated_at ELSE NULL END,
  t.transaction_id
FROM public.bank_customer_transactions t
JOIN public.bank_customers bc ON bc.bank_customer_id = t.bank_customer_id
JOIN public.users u ON u.user_id = bc.user_id
WHERE t.reference_no LIKE 'TRX-SEED-%'
  AND NOT EXISTS (
    SELECT 1
    FROM public.bank_customer_transaction_otp_logs o
    WHERE o.transaction_id = t.transaction_id
  );

INSERT INTO public.transaction_otp_logs (
  created_at,
  expires_at,
  otp_code_hash,
  otp_status,
  resend_count,
  sent_to_email,
  updated_at,
  verified_at,
  transaction_id
)
SELECT
  t.created_at,
  t.created_at + INTERVAL '5 minutes',
  'seed-otp-hash-' || t.reference_no,
  CASE
    WHEN t.status = 'SUCCESS' THEN 'VERIFIED'
    WHEN t.status = 'FAILED' THEN 'FAILED'
    WHEN t.status = 'CANCELLED' THEN 'EXPIRED'
    ELSE 'SENT'
  END,
  0,
  u.email,
  t.updated_at,
  CASE WHEN t.status = 'SUCCESS' THEN t.updated_at ELSE NULL END,
  t.transaction_id
FROM public.bank_customer_transactions t
JOIN public.bank_customers bc ON bc.bank_customer_id = t.bank_customer_id
JOIN public.users u ON u.user_id = bc.user_id
WHERE t.reference_no LIKE 'TRX-SEED-%'
  AND NOT EXISTS (
    SELECT 1
    FROM public.transaction_otp_logs o
    WHERE o.transaction_id = t.transaction_id
  );

-- SpendIQ categories for two existing customer demo accounts.
WITH target_spendiq_users AS (
  SELECT user_id
  FROM public.users
  WHERE username IN ('BankCustomer_01', 'metamindsgrp12@gmail.com')
),
category_seed (category_name, category_type) AS (
  VALUES
    ('Food', 'VARIABLE'),
    ('Transport', 'VARIABLE'),
    ('Bills', 'FIXED'),
    ('Shopping', 'VARIABLE'),
    ('Health', 'VARIABLE'),
    ('Education', 'FIXED'),
    ('Entertainment', 'VARIABLE'),
    ('Savings', 'FIXED')
)
INSERT INTO public.expense_categories (
  category_name,
  category_type,
  created_at,
  user_id
)
SELECT
  cs.category_name,
  cs.category_type,
  now(),
  tu.user_id
FROM target_spendiq_users tu
CROSS JOIN category_seed cs
WHERE NOT EXISTS (
  SELECT 1
  FROM public.expense_categories ec
  WHERE ec.user_id = tu.user_id
    AND lower(ec.category_name) = lower(cs.category_name)
);

-- SpendIQ expenses, using tracking_reference for idempotency.
WITH expense_seed (
  username,
  category_name,
  amount,
  expense_date,
  payment_type,
  tracking_reference,
  tracking_source
) AS (
  VALUES
    ('BankCustomer_01', 'Food', 3450.00, DATE '2026-06-18', 'CARD', 'SEED-SPEND-0001', 'TRANSACT'),
    ('BankCustomer_01', 'Bills', 12850.00, DATE '2026-06-17', 'BANK_TRANSFER', 'SEED-SPEND-0002', 'TRANSACT'),
    ('BankCustomer_01', 'Health', 6450.00, DATE '2026-06-15', 'CARD', 'SEED-SPEND-0003', 'TRANSACT'),
    ('BankCustomer_01', 'Transport', 7800.00, DATE '2026-06-14', 'CARD', 'SEED-SPEND-0004', 'TRANSACT'),
    ('BankCustomer_01', 'Education', 18500.00, DATE '2026-06-13', 'BANK_TRANSFER', 'SEED-SPEND-0005', 'TRANSACT'),
    ('BankCustomer_01', 'Food', 2850.00, DATE '2026-06-12', 'CARD', 'SEED-SPEND-0006', 'TRANSACT'),
    ('BankCustomer_01', 'Shopping', 21900.00, DATE '2026-06-11', 'CARD', 'SEED-SPEND-0007', 'TRANSACT'),
    ('BankCustomer_01', 'Bills', 9400.00, DATE '2026-06-10', 'BANK_TRANSFER', 'SEED-SPEND-0008', 'TRANSACT'),
    ('BankCustomer_01', 'Transport', 1650.00, DATE '2026-06-09', 'CASH', 'SEED-SPEND-0009', 'MANUAL'),
    ('BankCustomer_01', 'Health', 11200.00, DATE '2026-06-08', 'CARD', 'SEED-SPEND-0010', 'MANUAL'),
    ('BankCustomer_01', 'Entertainment', 2200.00, DATE '2026-06-07', 'CARD', 'SEED-SPEND-0011', 'MANUAL'),
    ('BankCustomer_01', 'Food', 5600.00, DATE '2026-05-28', 'CARD', 'SEED-SPEND-0012', 'MANUAL'),
    ('BankCustomer_01', 'Shopping', 13200.00, DATE '2026-05-24', 'CARD', 'SEED-SPEND-0013', 'MANUAL'),
    ('BankCustomer_01', 'Bills', 8600.00, DATE '2026-05-18', 'BANK_TRANSFER', 'SEED-SPEND-0014', 'MANUAL'),
    ('BankCustomer_01', 'Savings', 25000.00, DATE '2026-05-10', 'BANK_TRANSFER', 'SEED-SPEND-0015', 'MANUAL'),
    ('metamindsgrp12@gmail.com', 'Food', 4100.00, DATE '2026-06-18', 'CARD', 'SEED-SPEND-0101', 'MANUAL'),
    ('metamindsgrp12@gmail.com', 'Transport', 2500.00, DATE '2026-06-16', 'CASH', 'SEED-SPEND-0102', 'MANUAL'),
    ('metamindsgrp12@gmail.com', 'Bills', 9300.00, DATE '2026-06-12', 'BANK_TRANSFER', 'SEED-SPEND-0103', 'MANUAL'),
    ('metamindsgrp12@gmail.com', 'Shopping', 17800.00, DATE '2026-06-08', 'CARD', 'SEED-SPEND-0104', 'MANUAL'),
    ('metamindsgrp12@gmail.com', 'Education', 12000.00, DATE '2026-05-29', 'BANK_TRANSFER', 'SEED-SPEND-0105', 'MANUAL')
)
INSERT INTO public.expense_records (
  amount,
  created_at,
  expense_date,
  payment_type,
  category_id,
  user_id,
  tracking_reference,
  tracking_source
)
SELECT
  es.amount,
  es.expense_date + TIME '10:00:00',
  es.expense_date,
  es.payment_type,
  category_pick.category_id,
  u.user_id,
  es.tracking_reference,
  es.tracking_source
FROM expense_seed es
JOIN public.users u ON u.username = es.username
JOIN LATERAL (
  SELECT ec.category_id
  FROM public.expense_categories ec
  WHERE ec.user_id = u.user_id
    AND lower(ec.category_name) = lower(es.category_name)
  ORDER BY ec.category_id
  LIMIT 1
) category_pick ON true
WHERE NOT EXISTS (
  SELECT 1
  FROM public.expense_records er
  WHERE er.tracking_reference = es.tracking_reference
);

-- SpendIQ income records.
WITH income_seed (username, source_name, amount, income_date) AS (
  VALUES
    ('BankCustomer_01', 'Monthly Salary', 180000.00, DATE '2026-06-01'),
    ('BankCustomer_01', 'Freelance Consulting', 42000.00, DATE '2026-06-10'),
    ('BankCustomer_01', 'Dividend Income', 18500.00, DATE '2026-06-15'),
    ('BankCustomer_01', 'Monthly Salary', 180000.00, DATE '2026-05-01'),
    ('BankCustomer_01', 'Freelance Consulting', 36000.00, DATE '2026-05-11'),
    ('metamindsgrp12@gmail.com', 'Monthly Salary', 125000.00, DATE '2026-06-01'),
    ('metamindsgrp12@gmail.com', 'Project Bonus', 28000.00, DATE '2026-06-14')
)
INSERT INTO public.income_records (
  amount,
  created_at,
  income_date,
  source_name,
  user_id
)
SELECT
  iseed.amount,
  iseed.income_date + TIME '09:00:00',
  iseed.income_date,
  iseed.source_name,
  u.user_id
FROM income_seed iseed
JOIN public.users u ON u.username = iseed.username
WHERE NOT EXISTS (
  SELECT 1
  FROM public.income_records ir
  WHERE ir.user_id = u.user_id
    AND ir.source_name = iseed.source_name
    AND ir.income_date = iseed.income_date
    AND ir.amount = iseed.amount
);

-- SpendIQ budgets.
WITH budget_seed (username, category_name, budget_amount, month, year) AS (
  VALUES
    ('BankCustomer_01', 'Food', 30000.00, 6, 2026),
    ('BankCustomer_01', 'Transport', 18000.00, 6, 2026),
    ('BankCustomer_01', 'Bills', 35000.00, 6, 2026),
    ('BankCustomer_01', 'Shopping', 40000.00, 6, 2026),
    ('BankCustomer_01', 'Health', 20000.00, 6, 2026),
    ('BankCustomer_01', 'Education', 25000.00, 6, 2026),
    ('BankCustomer_01', 'Entertainment', 12000.00, 6, 2026),
    ('BankCustomer_01', 'Savings', 50000.00, 6, 2026),
    ('metamindsgrp12@gmail.com', 'Food', 24000.00, 6, 2026),
    ('metamindsgrp12@gmail.com', 'Transport', 14000.00, 6, 2026),
    ('metamindsgrp12@gmail.com', 'Bills', 26000.00, 6, 2026),
    ('metamindsgrp12@gmail.com', 'Shopping', 30000.00, 6, 2026)
)
INSERT INTO public.budget_limits (
  budget_amount,
  created_at,
  month,
  updated_at,
  year,
  category_id,
  user_id
)
SELECT
  bs.budget_amount,
  now(),
  bs.month,
  now(),
  bs.year,
  category_pick.category_id,
  u.user_id
FROM budget_seed bs
JOIN public.users u ON u.username = bs.username
JOIN LATERAL (
  SELECT ec.category_id
  FROM public.expense_categories ec
  WHERE ec.user_id = u.user_id
    AND lower(ec.category_name) = lower(bs.category_name)
  ORDER BY ec.category_id
  LIMIT 1
) category_pick ON true
WHERE NOT EXISTS (
  SELECT 1
  FROM public.budget_limits bl
  WHERE bl.user_id = u.user_id
    AND bl.category_id = category_pick.category_id
    AND bl.month = bs.month
    AND bl.year = bs.year
);

-- More LoanSense history for the existing BankCustomer_01 account.
WITH loansense_seed (
  customer_code,
  record_created_at,
  available_emi_capacity,
  credit_card_limit,
  credit_card_min_payment,
  credit_card_outstanding,
  dbr,
  leasing_hire_purchase_payment,
  max_allowed_emi,
  missed_payments_count,
  monthly_income,
  overall_status,
  remarks,
  risk_level,
  risk_multiplier,
  tmdo,
  total_existing_loan_emi
) AS (
  VALUES
    ('BC-MENTOR-12M-001', TIMESTAMP '2025-06-01 10:00:00', 0.00, 150000.00, 4875.00, 97500.00, 0.6660, 10000.00, 72000.00, 5, 180000.00, 'NOT_ELIGIBLE', 'Demo seed LoanSense: high debt pressure and repeated missed payments.', 'HIGH', 0.70, 119875.00, 85000.00),
    ('BC-MENTOR-12M-001', TIMESTAMP '2025-09-01 10:00:00', 6200.00, 150000.00, 4500.00, 90000.00, 0.5139, 8000.00, 72000.00, 5, 180000.00, 'PARTIALLY_ELIGIBLE', 'Demo seed LoanSense: improving but still constrained.', 'HIGH', 0.70, 92500.00, 80000.00),
    ('BC-MENTOR-12M-001', TIMESTAMP '2025-12-01 10:00:00', 18500.00, 150000.00, 3750.00, 75000.00, 0.4097, 6000.00, 72000.00, 2, 180000.00, 'PARTIALLY_ELIGIBLE', 'Demo seed LoanSense: medium risk with usable EMI headroom.', 'MEDIUM', 0.85, 73750.00, 60000.00),
    ('BC-MENTOR-12M-001', TIMESTAMP '2026-02-01 10:00:00', 21000.00, 150000.00, 3750.00, 75000.00, 0.3542, 4000.00, 72000.00, 1, 180000.00, 'ELIGIBLE', 'Demo seed LoanSense: repayment trend improved.', 'MEDIUM', 0.85, 63750.00, 56000.00),
    ('BC-MENTOR-12M-001', TIMESTAMP '2026-03-01 10:00:00', 28500.00, 150000.00, 3750.00, 75000.00, 0.3542, 3000.00, 72000.00, 0, 180000.00, 'ELIGIBLE', 'Demo seed LoanSense: good affordability across products.', 'MEDIUM', 0.85, 63750.00, 52000.00),
    ('BC-MENTOR-12M-001', TIMESTAMP '2026-04-01 10:00:00', 12000.00, 150000.00, 2250.00, 45000.00, 0.3847, 7000.00, 72000.00, 1, 180000.00, 'PARTIALLY_ELIGIBLE', 'Demo seed LoanSense: lower risk but reduced capacity this month.', 'LOW', 0.70, 69250.00, 60000.00)
),
source_rows AS (
  SELECT
    ls.*,
    bc.bank_customer_id,
    fr.bank_record_id,
    bce.bank_evaluation_id
  FROM loansense_seed ls
  JOIN public.bank_customers bc ON bc.customer_code = ls.customer_code
  JOIN public.bank_customer_financial_records fr
    ON fr.bank_customer_id = bc.bank_customer_id
   AND fr.created_at = ls.record_created_at
  JOIN public.bank_credit_evaluations bce
    ON bce.bank_customer_id = bc.bank_customer_id
   AND bce.bank_record_id = fr.bank_record_id
)
INSERT INTO public.loansense_evaluations (
  available_emi_capacity,
  created_at,
  credit_card_limit,
  credit_card_min_payment,
  credit_card_outstanding,
  dbr,
  leasing_hire_purchase_payment,
  max_allowed_emi,
  missed_payments_count,
  monthly_income,
  overall_status,
  remarks,
  risk_level,
  risk_multiplier,
  tmdo,
  total_existing_loan_emi,
  updated_at,
  bank_customer_id,
  bank_evaluation_id,
  bank_record_id
)
SELECT
  sr.available_emi_capacity,
  sr.record_created_at + INTERVAL '1 hour',
  sr.credit_card_limit,
  sr.credit_card_min_payment,
  sr.credit_card_outstanding,
  sr.dbr,
  sr.leasing_hire_purchase_payment,
  sr.max_allowed_emi,
  sr.missed_payments_count,
  sr.monthly_income,
  sr.overall_status,
  sr.remarks,
  sr.risk_level,
  sr.risk_multiplier,
  sr.tmdo,
  sr.total_existing_loan_emi,
  sr.record_created_at + INTERVAL '1 hour',
  sr.bank_customer_id,
  sr.bank_evaluation_id,
  sr.bank_record_id
FROM source_rows sr
WHERE NOT EXISTS (
  SELECT 1
  FROM public.loansense_evaluations le
  WHERE le.bank_customer_id = sr.bank_customer_id
    AND le.bank_record_id = sr.bank_record_id
    AND le.bank_evaluation_id = sr.bank_evaluation_id
);

WITH loan_options (loan_type, interest_rate, tenure_months, min_emi_needed, amount_factor) AS (
  VALUES
    ('PERSONAL', 17.00, 60, 7000.00, 42.00),
    ('VEHICLE', 15.00, 84, 10000.00, 60.00),
    ('EDUCATION', 12.00, 120, 9000.00, 72.00),
    ('HOUSING', 10.00, 240, 15000.00, 120.00)
),
target_evaluations AS (
  SELECT le.*
  FROM public.loansense_evaluations le
  JOIN public.bank_customers bc ON bc.bank_customer_id = le.bank_customer_id
  WHERE bc.customer_code = 'BC-MENTOR-12M-001'
    AND le.remarks LIKE 'Demo seed LoanSense:%'
)
INSERT INTO public.loan_eligibility_results (
  asset_value,
  created_at,
  customer_age,
  decision_reason,
  eligibility_status,
  estimated_emi,
  interest_rate,
  loan_type,
  recommended_max_amount,
  tenure_months,
  loansense_evaluation_id
)
SELECT
  NULL,
  te.created_at + INTERVAL '2 minutes',
  35,
  CASE
    WHEN te.available_emi_capacity < 3000 THEN 'Debt burden is too high for this product right now.'
    WHEN te.available_emi_capacity < lo.min_emi_needed THEN 'A smaller facility is recommended until EMI capacity improves.'
    ELSE 'Current affordability and policy checks pass for this product.'
  END,
  CASE
    WHEN te.available_emi_capacity < 3000 THEN 'NOT_ELIGIBLE'
    WHEN te.available_emi_capacity < lo.min_emi_needed THEN 'PARTIALLY_ELIGIBLE'
    ELSE 'ELIGIBLE'
  END,
  ROUND(LEAST(GREATEST(te.available_emi_capacity, 0), lo.min_emi_needed * 1.40), 2),
  lo.interest_rate,
  lo.loan_type,
  ROUND(GREATEST(te.available_emi_capacity, 0) * lo.amount_factor * te.risk_multiplier, 2),
  lo.tenure_months,
  te.loansense_evaluation_id
FROM target_evaluations te
CROSS JOIN loan_options lo
WHERE NOT EXISTS (
  SELECT 1
  FROM public.loan_eligibility_results ler
  WHERE ler.loansense_evaluation_id = te.loansense_evaluation_id
    AND ler.loan_type = lo.loan_type
);

-- CRIB request history for officer customer detail flows.
WITH crib_seed (
  customer_code,
  request_type,
  request_status,
  report_status,
  requested_at,
  expires_at,
  response_received_at
) AS (
  VALUES
    ('BC-MENTOR-12M-001', 'FULL_REPORT', 'COMPLETED', 'AVAILABLE', TIMESTAMP '2026-06-16 09:00:00', TIMESTAMP '2026-06-23 09:00:00', TIMESTAMP '2026-06-16 09:12:00'),
    ('BC-00001', 'FULL_REPORT', 'COMPLETED', 'AVAILABLE', TIMESTAMP '2026-06-15 14:20:00', TIMESTAMP '2026-06-22 14:20:00', TIMESTAMP '2026-06-15 14:33:00'),
    ('BC-SEED-0001', 'FULL_REPORT', 'PENDING', 'PENDING', TIMESTAMP '2026-06-18 08:45:00', TIMESTAMP '2026-06-25 08:45:00', NULL),
    ('BC-SEED-0004', 'FULL_REPORT', 'FAILED', 'FAILED', TIMESTAMP '2026-06-14 11:30:00', TIMESTAMP '2026-06-21 11:30:00', TIMESTAMP '2026-06-14 11:45:00')
)
INSERT INTO public.bank_customer_crib_requests (
  created_at,
  expires_at,
  report_status,
  request_status,
  request_type,
  requested_at,
  response_received_at,
  updated_at,
  bank_customer_id,
  requested_by_officer_id
)
SELECT
  cs.requested_at,
  cs.expires_at,
  cs.report_status,
  cs.request_status,
  cs.request_type,
  cs.requested_at,
  cs.response_received_at,
  COALESCE(cs.response_received_at, cs.requested_at),
  bc.bank_customer_id,
  bo.officer_id
FROM crib_seed cs
JOIN public.bank_customers bc ON bc.customer_code = cs.customer_code
JOIN public.bank_officers bo ON bo.employee_code = 'EMP-BO-00001'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.bank_customer_crib_requests cr
  WHERE cr.bank_customer_id = bc.bank_customer_id
    AND cr.requested_at = cs.requested_at
    AND cr.request_type = cs.request_type
);

-- Extra recent audit logs for admin audit-log filters.
WITH audit_seed (
  action_type,
  actor_name,
  actor_role,
  created_at,
  details,
  ip_address,
  target_id,
  target_type,
  title,
  tone,
  actor_username
) AS (
  VALUES
    ('SEED_BRANCH_CREATED', 'Admin Demo', 'ADMIN', TIMESTAMP '2026-06-18 08:30:00', 'Created demo branch Kandy City', '127.0.0.1', 'KAN-002', 'BRANCH', 'Created demo branch', 'SUCCESS', 'admin.demo'),
    ('SEED_OFFICER_ASSIGNED', 'Admin Demo', 'ADMIN', TIMESTAMP '2026-06-18 08:35:00', 'Assigned Ravindu Perera to Kandy City', '127.0.0.1', 'EMP-SEED-001', 'BANK_OFFICER', 'Assigned bank officer', 'INFO', 'admin.demo'),
    ('SEED_CUSTOMER_CREATED', 'Officer Demo', 'BANK_OFFICER', TIMESTAMP '2026-06-18 08:40:00', 'Created demo bank customer BC-SEED-0001', '127.0.0.1', 'BC-SEED-0001', 'BANK_CUSTOMER', 'Created bank customer', 'SUCCESS', 'officer.demo'),
    ('SEED_TRANSACTION_SUCCESS', 'Bank Customer 01', 'BANK_CUSTOMER', TIMESTAMP '2026-06-18 09:17:00', 'Transfer TRX-SEED-0001 completed', '127.0.0.1', 'TRX-SEED-0001', 'TRANSACTION', 'Transaction completed', 'SUCCESS', 'BankCustomer_01'),
    ('SEED_TRANSACTION_FAILED', 'Bank Customer 01', 'BANK_CUSTOMER', TIMESTAMP '2026-06-15 18:22:00', 'Transfer TRX-SEED-0004 failed OTP verification', '127.0.0.1', 'TRX-SEED-0004', 'TRANSACTION', 'Transaction failed', 'ERROR', 'BankCustomer_01'),
    ('SEED_LOANSENSE_EVALUATED', 'Bank Customer 01', 'BANK_CUSTOMER', TIMESTAMP '2026-06-17 20:24:00', 'LoanSense generated demo eligibility options', '127.0.0.1', 'BC-MENTOR-12M-001', 'LOANSENSE', 'LoanSense evaluation generated', 'INFO', 'BankCustomer_01'),
    ('SEED_CREDIT_REVIEW', 'Officer Demo', 'BANK_OFFICER', TIMESTAMP '2026-06-18 09:00:00', 'Reviewed credit profile for BC-SEED-0004', '127.0.0.1', 'BC-SEED-0004', 'CREDITLENS', 'Reviewed credit profile', 'WARNING', 'officer.demo')
)
INSERT INTO public.audit_logs (
  action_type,
  actor_name,
  actor_role,
  created_at,
  details,
  ip_address,
  target_id,
  target_type,
  title,
  tone,
  actor_user_id
)
SELECT
  aus.action_type,
  aus.actor_name,
  aus.actor_role,
  aus.created_at,
  aus.details,
  aus.ip_address,
  aus.target_id,
  aus.target_type,
  aus.title,
  aus.tone,
  u.user_id
FROM audit_seed aus
LEFT JOIN public.users u ON u.username = aus.actor_username
WHERE NOT EXISTS (
  SELECT 1
  FROM public.audit_logs al
  WHERE al.action_type = aus.action_type
    AND al.created_at = aus.created_at
    AND COALESCE(al.target_id, '') = COALESCE(aus.target_id, '')
);

-- Move identity sequences after the current max IDs for touched tables.
SELECT setval(pg_get_serial_sequence('public.accounts', 'account_id'), COALESCE((SELECT MAX(account_id) FROM public.accounts), 1), (SELECT COUNT(*) > 0 FROM public.accounts));
SELECT setval(pg_get_serial_sequence('public.audit_logs', 'audit_log_id'), COALESCE((SELECT MAX(audit_log_id) FROM public.audit_logs), 1), (SELECT COUNT(*) > 0 FROM public.audit_logs));
SELECT setval(pg_get_serial_sequence('public.bank_credit_evaluations', 'bank_evaluation_id'), COALESCE((SELECT MAX(bank_evaluation_id) FROM public.bank_credit_evaluations), 1), (SELECT COUNT(*) > 0 FROM public.bank_credit_evaluations));
SELECT setval(pg_get_serial_sequence('public.bank_customer_beneficiaries', 'beneficiary_id'), COALESCE((SELECT MAX(beneficiary_id) FROM public.bank_customer_beneficiaries), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_beneficiaries));
SELECT setval(pg_get_serial_sequence('public.bank_customer_cards', 'card_id'), COALESCE((SELECT MAX(card_id) FROM public.bank_customer_cards), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_cards));
SELECT setval(pg_get_serial_sequence('public.bank_customer_crib_requests', 'crib_request_id'), COALESCE((SELECT MAX(crib_request_id) FROM public.bank_customer_crib_requests), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_crib_requests));
SELECT setval(pg_get_serial_sequence('public.bank_customer_financial_records', 'bank_record_id'), COALESCE((SELECT MAX(bank_record_id) FROM public.bank_customer_financial_records), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_financial_records));
SELECT setval(pg_get_serial_sequence('public.bank_customer_incomes', 'income_id'), COALESCE((SELECT MAX(income_id) FROM public.bank_customer_incomes), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_incomes));
SELECT setval(pg_get_serial_sequence('public.bank_customer_liabilities', 'liability_id'), COALESCE((SELECT MAX(liability_id) FROM public.bank_customer_liabilities), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_liabilities));
SELECT setval(pg_get_serial_sequence('public.bank_customer_loans', 'loan_id'), COALESCE((SELECT MAX(loan_id) FROM public.bank_customer_loans), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_loans));
SELECT setval(pg_get_serial_sequence('public.bank_customer_missed_payments', 'missed_payment_id'), COALESCE((SELECT MAX(missed_payment_id) FROM public.bank_customer_missed_payments), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_missed_payments));
SELECT setval(pg_get_serial_sequence('public.bank_customer_transaction_otp_logs', 'otp_log_id'), COALESCE((SELECT MAX(otp_log_id) FROM public.bank_customer_transaction_otp_logs), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_transaction_otp_logs));
SELECT setval(pg_get_serial_sequence('public.bank_customer_transactions', 'transaction_id'), COALESCE((SELECT MAX(transaction_id) FROM public.bank_customer_transactions), 1), (SELECT COUNT(*) > 0 FROM public.bank_customer_transactions));
SELECT setval(pg_get_serial_sequence('public.bank_customers', 'bank_customer_id'), COALESCE((SELECT MAX(bank_customer_id) FROM public.bank_customers), 1), (SELECT COUNT(*) > 0 FROM public.bank_customers));
SELECT setval(pg_get_serial_sequence('public.bank_officers', 'officer_id'), COALESCE((SELECT MAX(officer_id) FROM public.bank_officers), 1), (SELECT COUNT(*) > 0 FROM public.bank_officers));
SELECT setval(pg_get_serial_sequence('public.branches', 'branch_id'), COALESCE((SELECT MAX(branch_id) FROM public.branches), 1), (SELECT COUNT(*) > 0 FROM public.branches));
SELECT setval(pg_get_serial_sequence('public.budget_limits', 'budget_id'), COALESCE((SELECT MAX(budget_id) FROM public.budget_limits), 1), (SELECT COUNT(*) > 0 FROM public.budget_limits));
SELECT setval(pg_get_serial_sequence('public.expense_categories', 'category_id'), COALESCE((SELECT MAX(category_id) FROM public.expense_categories), 1), (SELECT COUNT(*) > 0 FROM public.expense_categories));
SELECT setval(pg_get_serial_sequence('public.expense_records', 'expense_id'), COALESCE((SELECT MAX(expense_id) FROM public.expense_records), 1), (SELECT COUNT(*) > 0 FROM public.expense_records));
SELECT setval(pg_get_serial_sequence('public.income_records', 'income_id'), COALESCE((SELECT MAX(income_id) FROM public.income_records), 1), (SELECT COUNT(*) > 0 FROM public.income_records));
SELECT setval(pg_get_serial_sequence('public.loan_eligibility_results', 'loan_result_id'), COALESCE((SELECT MAX(loan_result_id) FROM public.loan_eligibility_results), 1), (SELECT COUNT(*) > 0 FROM public.loan_eligibility_results));
SELECT setval(pg_get_serial_sequence('public.loansense_evaluations', 'loansense_evaluation_id'), COALESCE((SELECT MAX(loansense_evaluation_id) FROM public.loansense_evaluations), 1), (SELECT COUNT(*) > 0 FROM public.loansense_evaluations));
SELECT setval(pg_get_serial_sequence('public.risk_adjustments', 'adjustment_id'), COALESCE((SELECT MAX(adjustment_id) FROM public.risk_adjustments), 1), (SELECT COUNT(*) > 0 FROM public.risk_adjustments));
SELECT setval(pg_get_serial_sequence('public.roles', 'role_id'), COALESCE((SELECT MAX(role_id) FROM public.roles), 1), (SELECT COUNT(*) > 0 FROM public.roles));
SELECT setval(pg_get_serial_sequence('public.transaction_otp_logs', 'otp_log_id'), COALESCE((SELECT MAX(otp_log_id) FROM public.transaction_otp_logs), 1), (SELECT COUNT(*) > 0 FROM public.transaction_otp_logs));
SELECT setval(pg_get_serial_sequence('public.users', 'user_id'), COALESCE((SELECT MAX(user_id) FROM public.users), 1), (SELECT COUNT(*) > 0 FROM public.users));

COMMIT;
