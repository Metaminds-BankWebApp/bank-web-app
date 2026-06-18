--
-- PostgreSQL database dump
--

\restrict fZDYQPyg7ahLKv1OPF5WnoHw7cwlyshJOybxqRSUx1SpB82qIK8LERQ7r3Fj6aO

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-18 11:59:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5342 (class 0 OID 24618)
-- Dependencies: 224
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.accounts VALUES (1, '1000000005', 'SAVINGS', 250000.00, '2026-04-19 19:26:43.337283', 'ACTIVE', '2026-04-19 19:26:43.337283');
INSERT INTO public.accounts VALUES (5, '200000000101', 'SAVINGS', 250000.00, '2026-05-04 13:22:35.752119', 'ACTIVE', '2026-05-04 13:22:35.752119');
INSERT INTO public.accounts VALUES (6, '200000000102', 'SAVINGS', 250000.00, '2026-05-04 13:22:35.752119', 'ACTIVE', '2026-05-04 13:22:35.752119');
INSERT INTO public.accounts VALUES (7, '200000000103', 'SAVINGS', 250000.00, '2026-05-04 13:22:35.752119', 'ACTIVE', '2026-05-04 13:22:35.752119');
INSERT INTO public.accounts VALUES (8, '200000000104', 'SAVINGS', 250000.00, '2026-05-04 13:22:35.752119', 'ACTIVE', '2026-05-04 13:22:35.752119');
INSERT INTO public.accounts VALUES (9, '200000000105', 'SAVINGS', 250000.00, '2026-05-04 13:22:35.752119', 'ACTIVE', '2026-05-04 13:22:35.752119');


--
-- TOC entry 5354 (class 0 OID 24693)
-- Dependencies: 236
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (6, '2026-04-19 19:24:06.291376', 'System administrator', 'ADMIN');
INSERT INTO public.roles VALUES (7, '2026-04-19 19:24:06.291376', 'Bank officer user', 'BANK_OFFICER');
INSERT INTO public.roles VALUES (8, '2026-04-19 19:24:06.291376', 'Bank customer user', 'BANK_CUSTOMER');
INSERT INTO public.roles VALUES (9, '2026-04-19 19:24:06.291376', 'Public customer user', 'PUBLIC_CUSTOMER');


--
-- TOC entry 5356 (class 0 OID 24702)
-- Dependencies: 238
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (5, '325/4/4 Ramanayaka MW Erawwala', '2026-04-19 19:49:34.396901', '2001-06-05', 'demo@primecore.app', 'Demo', 'User', '200325512275', '$2a$10$jaNUhNlmV3.kwK67lq9bnu.8A3bzaMvIcS7KcO0SYTe5GaupHrXcK', '0711961556', NULL, '123', 'ACTIVE', '2026-04-19 19:49:34.396901', '1231', 9);
INSERT INTO public.users VALUES (6, 'Colombo 05', '2026-04-21 20:12:21.944612', '1990-01-15', 'pc.calc01@primecore.local', 'Ayesha', 'Perera', '900101000001', 'Demo@1234', '0779100001', NULL, 'Western', 'ACTIVE', '2026-04-21 20:12:21.944612', 'pc.calc01', 9);
INSERT INTO public.users VALUES (7, 'Galle', '2026-04-21 20:12:21.944612', '1989-03-10', 'pc.calc02@primecore.local', 'Nimal', 'Fernando', '900101000002', 'Demo@1234', '0779100002', NULL, 'Southern', 'ACTIVE', '2026-04-21 20:12:21.944612', 'pc.calc02', 9);
INSERT INTO public.users VALUES (8, 'Kandy', '2026-04-21 20:12:21.944612', '1994-07-21', 'pc.calc03@primecore.local', 'Kavindu', 'Silva', '900101000003', 'Demo@1234', '0779100003', NULL, 'Central', 'ACTIVE', '2026-04-21 20:12:21.944612', 'pc.calc03', 9);
INSERT INTO public.users VALUES (9, 'Kurunegala', '2026-04-21 20:12:21.944612', '1993-11-09', 'pc.calc04@primecore.local', 'Tharushi', 'Jayasena', '900101000004', 'Demo@1234', '0779100004', NULL, 'North Western', 'ACTIVE', '2026-04-21 20:12:21.944612', 'pc.calc04', 9);
INSERT INTO public.users VALUES (10, 'Negombo', '2026-04-21 20:12:21.944612', '1992-05-28', 'pc.calc05@primecore.local', 'Sanduni', 'Wickramasinghe', '900101000005', 'Demo@1234', '0779100005', NULL, 'Western', 'ACTIVE', '2026-04-21 20:12:21.944612', 'pc.calc05', 9);
INSERT INTO public.users VALUES (15, 'Batticaloa', '2026-04-21 20:12:21.944612', '1996-04-12', 'pc.calc10@primecore.local', 'Janani', 'Weerasinghe', '900101000010', 'Demo@1234', '0779100010', NULL, 'Eastern', 'ACTIVE', '2026-04-21 20:12:21.944612', 'pc.calc10', 9);
INSERT INTO public.users VALUES (4, 'Galle', '2026-04-19 19:26:43.337283', '1992-03-12', 'metamindsgrp11@gmail.com', 'Bank', 'customer test', '199212345678', '$2a$10$Pa5PfRuFMc3OX2CUp87zleT.Nbm2MGP8gnV3prPhrFzhe2D/SZGUS', '0771000003', '/profile-images/user-4-5b5139b8-61c9-4224-a5b3-33069dc4dbaf.png', 'Southern', 'ACTIVE', '2026-04-28 19:06:22.098559', 'metamindsgrp12@gmail.com', 8);
INSERT INTO public.users VALUES (11, 'Galle', '2026-04-21 20:12:21.944612', '1991-08-18', 'pc.calc06@primecore.local', 'Dineth', 'Dovindu', '900101000006', '$2a$10$lsEHpqqbVz6rvOPaEdhcMuO4lIH06QKw5oFJ36bSxGecFObD2zCwK', '0711961556', NULL, 'Sabaragamuwa', 'ACTIVE', '2026-04-22 21:02:23.364855', 'kddovindu', 9);
INSERT INTO public.users VALUES (17, 'Baddegama', '2026-04-25 11:51:34.796623', '2003-02-25', 'kgdineth2@gmail.com', 'Dineth', 'Dovindu', '200322532375', '$2a$10$lggKNf/WFA./4GzJxdf1y.AbjeJWWwy8NGMIgHdVxKsFJDaorh0Y2', '0711961556', NULL, 'Western', 'ACTIVE', '2026-04-25 11:51:34.796623', 'kddovindu2', 9);
INSERT INTO public.users VALUES (19, 'metamindsgrp12@gmail.com', '2026-04-27 20:44:00.598836', '2003-02-25', 'metamindsgrp12@gmail.com', 'DIneth_8', 'Dovindu', '202225512275', '$2a$10$qvikxm2anqpPgBLhOFoCyOXeTgmFvposDeYV3M6AJANAvJ4GFb3gu', '0711961556', '/profile-images/user-19-fc79d483-7484-48c2-a9f6-2b8f46437dec.png', 'Western', 'ACTIVE', '2026-05-05 18:45:53.309802', 'bank.customer.demo', 9);
INSERT INTO public.users VALUES (3, 'Jaffna', '2026-04-19 19:26:43.337283', '1993-04-13', 'public.customer.demo@primecore.local', 'Public', 'Customer', '199312345678', '$2a$10$PiLxCG447tsAZY7ntlIF8O/hF4EAW391ic/5uVxoebrAOl976B0SW', '0771000004', '/profile-images/user-3-d2a89001-ee82-4a30-9f98-fda1e5b28dec.png', 'Northern', 'ACTIVE', '2026-04-25 20:05:07.45823', 'public.customer.demo', 9);
INSERT INTO public.users VALUES (2, 'Kandy', '2026-04-19 19:26:43.337283', '1991-02-11', 'officer.demo@primecore.local', 'Officer', 'Demo', '199112345678', '$2a$10$nZm11BogZ/dRcMd0sSClOuXZ/ZdLUMX7FPcGZOWbDceRHle6.L4oK', '0771000002', '/profile-images/user-2-2abb994f-e2db-420b-b5a3-b8f3926b1143.png', 'Western', 'ACTIVE', '2026-04-28 21:16:59.5694', 'officer.demo', 7);
INSERT INTO public.users VALUES (18, 'Jayasiri near the court baddegama', '2026-04-25 12:08:54.219612', '2026-04-25', 'kgdineth333@primecore.com', 'Dineth3', 'Dovindu', '200333512275', '$2a$10$z65JDISxRllD15xlgwjK/OZEcAeCTbr70LkRalLr..URI.lqCcHWK', '0712961556', NULL, 'southern', 'ACTIVE', '2026-04-29 20:03:41.589851', 'dinethdovindu167', 7);
INSERT INTO public.users VALUES (1, 'Colombo', '2026-04-19 19:26:43.337283', '1990-01-10', 'admin.demo@primecore.local', 'Admin', 'Demo', '199012345678', '$2a$10$qsKyr4x8rJo2sJe3FkWI5edjB6HE5FnqF7tq4nLmzY6d34tjfd9pq', '0771000001', '/profile-images/user-1-f50bb37f-a784-45c3-a420-589601a4a32f.jpg', 'Western', 'ACTIVE', '2026-04-29 20:21:31.73182', 'admin.demo', 6);
INSERT INTO public.users VALUES (28, 'Colombo', '2026-05-04 13:22:35.752119', '1987-01-01', 'bankofficer01@primecore.local', 'Bank', 'Officer', '870101999001', '$2a$10$eceefvOZFKkTkBExbco9POXJHfemgNMoaUdxe6g9LZ.NGUjvDddO.', '0772999001', NULL, 'Western', 'ACTIVE', '2026-05-04 13:55:10.666133', 'BankOfficer_01', 7);
INSERT INTO public.users VALUES (34, 'Colombo', '2026-05-04 13:22:35.752119', '1993-05-01', 'publiccustomer01@primecore.local', 'Public', 'Customer', '930501300001', '$2a$10$OJi8kFvZR0Kz8xhnRynuPuo4oIUcpYChBqDwarEXiU3rmksxegKNa', '0773000001', NULL, 'Western', 'ACTIVE', '2026-05-26 15:56:32.26003', 'PublicCustomer_01', 9);
INSERT INTO public.users VALUES (32, 'Galle', '2026-05-04 13:22:35.752119', '1990-02-02', 'bankcustomer02@primecore.local', 'Bank', 'Customer 02', '900202300102', 'Demo@1234', '0773000102', NULL, 'Southern', 'ACTIVE', '2026-05-04 13:55:10.666133', 'BankCustomer_02', 8);
INSERT INTO public.users VALUES (30, 'Kurunegala', '2026-05-04 13:22:35.752119', '1988-04-04', 'bankcustomer04@primecore.local', 'Bank', 'Customer 04', '880404300104', 'Demo@1234', '0773000104', NULL, 'North Western', 'ACTIVE', '2026-05-04 13:55:10.666133', 'BankCustomer_04', 8);
INSERT INTO public.users VALUES (29, 'Ratnapura', '2026-05-04 13:22:35.752119', '1996-05-05', 'bankcustomer05@primecore.local', 'Bank', 'Customer 05', '960505300105', 'Demo@1234', '0773000105', NULL, 'Sabaragamuwa', 'ACTIVE', '2026-05-04 13:55:10.666133', 'BankCustomer_05', 8);
INSERT INTO public.users VALUES (31, 'Kandy', '2026-05-04 13:22:35.752119', '1995-03-03', 'bankcustomer03@primecore.local', 'Bank', 'Customer 03', '950303300103', '$2a$10$LGaCpB52KB4oD4X2efWYkO0AI30Bq4UzQdtDl.xhEDbn5tIHJgDJm', '0773000103', NULL, 'Central', 'ACTIVE', '2026-05-04 14:04:44.067296', 'BankCustomer_03', 8);
INSERT INTO public.users VALUES (33, 'Nugegoda', '2026-05-04 13:22:35.752119', '1991-01-01', 'bankcustomer01@primecore.local', 'Bank', 'Customer', '910101300101', '$2a$10$xDaf0hcUEVi9YwRI9zJkqeEp2c1XleT8i.RDJYV4fNSSI9qp50lZa', '0773000101', NULL, 'Western', 'ACTIVE', '2026-05-26 19:53:46.138297', 'BankCustomer_01', 8);


--
-- TOC entry 5412 (class 0 OID 32795)
-- Dependencies: 294
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.audit_logs VALUES (1, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 10:19:13.008443', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (2, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-05-02 10:19:21.084806', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (3, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 10:19:26.703868', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (4, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 19:29:14.400008', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (5, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 20:17:25.857372', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (6, 'POST_LOGOUT_FAILED', 'Bank customer test', 'BANK_CUSTOMER', '2026-05-02 20:17:30.482762', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 4);
INSERT INTO public.audit_logs VALUES (7, 'POST_LOGOUT_FAILED', 'System', 'SYSTEM', '2026-05-02 20:17:42.43365', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (8, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 20:17:47.735875', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (9, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 20:31:28.855081', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (10, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-02 20:32:22.172891', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 3);
INSERT INTO public.audit_logs VALUES (11, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 20:32:30.384374', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (12, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 20:32:38.943233', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (13, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-05-02 20:32:41.560925', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (14, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 20:32:59.416743', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (15, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 20:33:03.718213', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (16, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-02 20:33:19.190725', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 3);
INSERT INTO public.audit_logs VALUES (17, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 20:33:48.392297', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (18, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-05-02 20:33:50.533244', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (19, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 21:26:17.701591', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (20, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 21:34:27.960202', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (21, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 21:42:22.509426', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (22, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 21:42:29.379387', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (23, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 21:43:35.780259', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (24, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-02 21:50:19.023282', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (25, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-02 21:50:23.814177', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (26, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-03 10:07:20.207863', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (27, 'POST_LOGOUT_FAILED', 'System', 'SYSTEM', '2026-05-04 13:24:47.259515', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (28, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:25:41.63072', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (29, 'POST_LOGOUT_FAILED', 'Dinuka Public', 'PUBLIC_CUSTOMER', '2026-05-04 13:27:52.585032', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (30, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:28:19.44572', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (31, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:35:28.763126', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (32, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:41:56.473658', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (33, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:42:26.295123', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (34, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-05-04 13:43:17.860227', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (35, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:43:37.047616', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (36, 'POST_LOGOUT_FAILED', 'Mentor Officer', 'BANK_OFFICER', '2026-05-04 13:50:47.579401', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 28);
INSERT INTO public.audit_logs VALUES (37, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:55:28.517476', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (38, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 13:55:48.613922', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (39, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 14:04:44.067296', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (40, 'POST_LOGOUT_FAILED', 'System', 'SYSTEM', '2026-05-04 16:16:27.846299', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (41, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:16:33.678087', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (42, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:16:43.968472', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/income', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (89, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-12 16:39:26.918367', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (43, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:16:44.514745', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/loans', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (44, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:16:45.119364', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/cards', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (45, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:16:46.182345', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (46, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:17:12.639169', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (50, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:17:34.532241', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (51, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:18:01.218291', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (53, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:18:36.528163', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (54, 'POST_LOGOUT_FAILED', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:18:44.219454', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (47, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:17:31.245339', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/income', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (48, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:17:33.183541', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/loans', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (49, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:17:33.715617', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/cards', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (52, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-05-04 16:18:03.214843', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (55, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:19:02.415012', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (56, 'POST_LOGOUT_FAILED', 'Bank Customer 01', 'BANK_CUSTOMER', '2026-05-04 16:19:06.336323', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (57, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:19:09.388437', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (58, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:19:22.960073', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (59, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:19:31.13213', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/income', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (60, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:19:31.450057', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/loans', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (61, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:19:31.889519', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/cards', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (62, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:19:33.649778', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (63, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-04 16:19:37.430896', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (64, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 16:53:36.963811', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (65, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 17:40:33.644276', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (66, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-04 17:41:26.59639', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (67, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-04 17:41:33.353105', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (68, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-04 17:42:06.511369', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (69, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-04 17:42:11.335816', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (70, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 17:43:56.173177', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (71, 'POST_LOGOUT_FAILED', 'DIneth_8 Dovindu', 'PUBLIC_CUSTOMER', '2026-05-04 17:44:10.742076', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 19);
INSERT INTO public.audit_logs VALUES (72, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 17:44:37.638847', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (73, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 17:44:52.70048', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (74, 'POST_LOGOUT_FAILED', 'DIneth_8 Dovindu', 'PUBLIC_CUSTOMER', '2026-05-04 17:44:57.879208', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 19);
INSERT INTO public.audit_logs VALUES (75, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-04 17:45:17.966574', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (76, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-05 17:32:48.865551', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (77, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-05 17:58:54.287443', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/income', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (78, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-05 17:58:54.373163', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/loans', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (79, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-05 17:58:54.68366', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/cards', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (80, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-05 17:58:55.112781', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (81, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-05 17:59:13.205423', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (82, 'PUT_FINANCIAL_RECORD', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-05 18:36:36.352153', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (83, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-05 18:43:36.835698', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (84, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-05 18:43:55.145847', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (85, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-05 18:44:04.015673', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (86, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-05 18:44:12.797027', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (87, 'POST_PROFILE', 'DIneth_8 Dovindu', 'PUBLIC_CUSTOMER', '2026-05-05 18:45:53.320764', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'PROFILE', 'Executed POST on /api/users/profile/image', 'INFO', 19);
INSERT INTO public.audit_logs VALUES (88, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-12 15:54:36.795125', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (90, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-12 16:40:23.001931', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (91, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 09:36:02.025117', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (92, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 09:36:13.392491', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (93, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 13:32:55.781369', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (94, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 15:27:07.960067', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (95, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 15:35:46.867432', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (96, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 15:35:59.471293', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (97, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-16 15:36:31.689146', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (98, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-24 18:58:16.131657', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (99, 'POST_LOGOUT_FAILED', 'Public Customer 01', 'PUBLIC_CUSTOMER', '2026-05-24 19:07:51.520092', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (100, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-24 19:07:58.971849', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (101, 'POST_LOGOUT_FAILED', 'Bank Customer 01', 'BANK_CUSTOMER', '2026-05-24 19:08:20.867128', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (102, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-24 19:08:28.647133', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (103, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-24 19:08:37.827209', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (104, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-24 19:10:29.315723', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (105, 'POST_LOGOUT_FAILED', 'System', 'SYSTEM', '2026-05-25 21:22:56.877717', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (106, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-25 21:23:04.226061', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (107, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-26 15:53:36.983454', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (108, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 15:53:42.493363', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (109, 'PUT_PROFILE', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 15:54:08.293331', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'PROFILE', 'Executed PUT on /api/users/profile', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (110, 'PUT_PROFILE', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 15:55:12.266466', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'PROFILE', 'Executed PUT on /api/users/profile', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (111, 'PUT_PROFILE_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 15:55:54.99252', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'PROFILE', 'Failed PUT on /api/users/profile', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (112, 'PUT_PROFILE', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 15:56:32.26822', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'PROFILE', 'Executed PUT on /api/users/profile', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (113, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 15:56:38.879606', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (114, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-05-26 15:56:55.752686', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (115, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 15:57:03.482222', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (116, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 15:57:38.324973', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (117, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 18:49:29.625453', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (118, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 19:42:57.963233', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (119, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 19:44:25.326719', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (120, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 19:46:20.828754', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (121, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 19:53:01.062131', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (122, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 19:53:37.537834', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (123, 'PUT_PROFILE', 'Bank Customer', 'BANK_CUSTOMER', '2026-05-26 19:53:46.155536', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'PROFILE', 'Executed PUT on /api/users/profile', 'INFO', 33);
INSERT INTO public.audit_logs VALUES (124, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 20:41:09.681052', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (125, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 20:41:13.513172', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (126, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 21:31:03.600817', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (127, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 21:31:16.572193', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/income', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (128, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 21:31:17.242135', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/loans', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (129, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 21:31:17.785196', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/cards', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (130, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 21:31:18.547081', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (131, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-05-26 21:31:24.844247', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (132, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 21:31:27.964886', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (133, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 21:41:22.410513', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (134, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 21:47:16.02202', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (135, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 21:47:38.115083', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (136, 'POST_LOGIN', 'System', 'SYSTEM', '2026-05-26 21:53:27.33422', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (137, 'POST_LOGOUT_FAILED', 'System', 'SYSTEM', '2026-06-17 08:03:59.623947', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (138, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 08:04:04.834205', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (139, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 09:07:43.899211', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (140, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 09:08:33.229979', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '16', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/16/financial-records/steps/liabilities', 'INFO', 34);
INSERT INTO public.audit_logs VALUES (141, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 18:58:22.017258', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (142, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 18:58:51.531022', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 34);
INSERT INTO public.audit_logs VALUES (143, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 18:58:55.965621', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (144, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:10:22.770561', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (145, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:09.536572', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/loans', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (146, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:17.883347', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/loans', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (147, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:19.161374', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/cards', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (148, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:29.553118', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/cards', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (149, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:34.57755', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (150, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:39.834455', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/income', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (151, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:40.302739', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/loans', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (152, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:11:41.851146', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/cards', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (153, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:12:55.271513', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/income', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (154, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:12:55.659714', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/loans', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (155, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:12:56.056551', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/cards', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (156, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:12:56.59721', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (157, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:13:28.144528', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (158, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:13:34.227515', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (159, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:13:40.356487', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/cards', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (160, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:13:41.538985', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (161, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:13:48.022245', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (162, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:13:53.130196', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (163, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:00.29414', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (164, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:13.186725', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (165, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:15.907023', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (166, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:18.289609', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (167, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:23.797216', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (168, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:31.881364', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (169, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:56.487097', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/cards', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (170, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:14:57.038688', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (171, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:15:01.094304', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/liabilities', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (172, 'PUT_FINANCIAL_RECORD', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:15:15.966076', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', '1', 'FINANCIAL_RECORD', 'Executed PUT on /api/public-customers/1/financial-records/steps/loans', 'INFO', 3);
INSERT INTO public.audit_logs VALUES (173, 'POST_LOGOUT_FAILED', 'Public Customer', 'PUBLIC_CUSTOMER', '2026-06-17 20:16:29.222283', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 3);
INSERT INTO public.audit_logs VALUES (174, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-06-17 20:17:12.133125', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (175, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:17:13.925255', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (176, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-17 20:24:19.751818', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (177, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:24:30.227048', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (178, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-06-17 20:26:43.797019', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (179, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:26:50.071483', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (180, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-17 20:27:37.346195', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (181, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:27:43.116272', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (182, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-17 20:28:12.957402', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (183, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:28:39.576346', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (184, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:54:00.50533', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (185, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:54:52.660921', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (186, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-17 20:55:26.304909', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (187, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 20:56:01.700465', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (188, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-17 21:12:59.257681', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (189, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 21:13:03.754928', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (190, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-17 21:15:59.334678', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (191, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-06-17 21:16:05.37582', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (192, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-17 21:30:01.933553', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (193, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 10:28:14.950257', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (194, 'POST_LOGIN_FAILED', 'System', 'SYSTEM', '2026-06-18 10:30:25.433092', 'HTTP 401 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Failed POST on /api/auth/login', 'ERROR', NULL);
INSERT INTO public.audit_logs VALUES (195, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 10:32:05.844344', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (196, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 10:37:08.185099', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (197, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 10:37:12.147712', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (198, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-18 10:40:06.838237', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (199, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 10:40:30.061052', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (200, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:02:53.667051', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (201, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-18 11:06:08.71639', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (202, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:06:26.91465', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (203, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 11:08:30.249698', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (204, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:08:37.942942', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (205, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:10:56.133383', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (206, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 11:12:25.007502', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (207, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:12:28.833251', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (208, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:25:57.099715', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (209, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 11:26:39.639243', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (210, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:26:44.60536', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (211, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:28:05.402572', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (212, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-18 11:28:30.944095', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (213, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:28:38.266095', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (214, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-18 11:28:45.274071', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (215, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:28:53.427224', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (216, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-18 11:29:27.698403', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (217, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:29:31.906449', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (218, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-18 11:36:59.763271', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (219, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:37:04.887578', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (220, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-18 11:41:03.472242', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (221, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:41:08.836033', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (222, 'POST_LOGOUT_FAILED', 'Bank Customer', 'BANK_CUSTOMER', '2026-06-18 11:41:40.119489', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 33);
INSERT INTO public.audit_logs VALUES (223, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:41:45.302159', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (224, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 11:41:53.919074', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (225, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:41:57.716387', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (226, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-18 11:42:14.732672', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (227, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:42:58.092579', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (228, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 11:43:07.3772', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (229, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:43:10.978132', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (230, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:48:14.152408', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (231, 'POST_LOGOUT_FAILED', 'Officer Demo', 'BANK_OFFICER', '2026-06-18 11:48:26.229122', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 2);
INSERT INTO public.audit_logs VALUES (232, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:48:31.050352', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (233, 'POST_LOGOUT_FAILED', 'Admin Demo', 'ADMIN', '2026-06-18 11:48:38.459779', 'HTTP 400 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGOUT', 'Failed POST on /api/auth/logout', 'ERROR', 1);
INSERT INTO public.audit_logs VALUES (234, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:48:43.616427', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);
INSERT INTO public.audit_logs VALUES (235, 'POST_LOGIN', 'System', 'SYSTEM', '2026-06-18 11:48:57.316275', 'HTTP 200 | Handler HandlerMethod', '0:0:0:0:0:0:0:1', NULL, 'LOGIN', 'Executed POST on /api/auth/login', 'INFO', NULL);


--
-- TOC entry 5348 (class 0 OID 24658)
-- Dependencies: 230
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.branches VALUES (2, 'No 1, Main Street, Colombo', 'COL-001', 'colombo.main@primecore.local', 'Colombo Main', '0112000001', '2026-04-19 19:26:43.337283', 'ACTIVE', '2026-04-19 19:26:43.337283');
INSERT INTO public.branches VALUES (4, 'Demo Branch, Colombo', 'MENTOR-001', 'mentor.branch@primecore.local', 'Mentor Demo Branch', '0112999001', '2026-05-04 13:22:35.752119', 'ACTIVE', '2026-05-04 13:22:35.752119');


--
-- TOC entry 5346 (class 0 OID 24646)
-- Dependencies: 228
-- Data for Name: bank_officers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_officers VALUES (1, '2026-04-19 19:26:43.337283', 'EMP-BO-00001', '2026-04-19 19:26:43.337283', 2, 1, 2);
INSERT INTO public.bank_officers VALUES (2, '2026-04-25 12:08:54.360562', 'EMP-BO-00002', '2026-04-25 12:08:54.360562', 2, 1, 18);
INSERT INTO public.bank_officers VALUES (4, '2026-05-04 13:22:35.752119', 'EMP-MENTOR-001', '2026-05-04 13:22:35.752119', 4, NULL, 28);


--
-- TOC entry 5344 (class 0 OID 24631)
-- Dependencies: 226
-- Data for Name: bank_customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customers VALUES (1, 'ACTIVE', '2026-04-19 19:26:43.337283', 'BC-00001', '2026-04-19 19:26:43.337283', 1, 2, 1, 4);
INSERT INTO public.bank_customers VALUES (5, 'ACTIVE', '2026-05-04 13:22:35.752119', 'BC-MENTOR-12M-001', '2026-05-04 13:22:35.752119', 5, 4, 4, 33);
INSERT INTO public.bank_customers VALUES (6, 'ACTIVE', '2026-05-04 13:22:35.752119', 'BC-MENTOR-12M-002', '2026-05-04 13:22:35.752119', 6, 4, 4, 32);
INSERT INTO public.bank_customers VALUES (7, 'ACTIVE', '2026-05-04 13:22:35.752119', 'BC-MENTOR-12M-003', '2026-05-04 13:22:35.752119', 7, 4, 4, 31);
INSERT INTO public.bank_customers VALUES (8, 'ACTIVE', '2026-05-04 13:22:35.752119', 'BC-MENTOR-12M-004', '2026-05-04 13:22:35.752119', 8, 4, 4, 30);
INSERT INTO public.bank_customers VALUES (9, 'ACTIVE', '2026-05-04 13:22:35.752119', 'BC-MENTOR-12M-005', '2026-05-04 13:22:35.752119', 9, 4, 4, 29);


--
-- TOC entry 5372 (class 0 OID 24921)
-- Dependencies: 254
-- Data for Name: bank_customer_financial_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customer_financial_records VALUES (3, '2025-12-01 10:00:00', 'MANUAL', '2025-12-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (4, '2025-11-01 10:00:00', 'MANUAL', '2025-11-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (5, '2026-04-01 10:00:00', 'MANUAL', '2026-04-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (6, '2025-08-01 10:00:00', 'MANUAL', '2025-08-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (7, '2025-06-01 10:00:00', 'MANUAL', '2025-06-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (8, '2025-12-01 10:00:00', 'MANUAL', '2025-12-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (9, '2025-09-01 10:00:00', 'MANUAL', '2025-09-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (10, '2026-01-01 10:00:00', 'MANUAL', '2026-01-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (11, '2026-02-01 10:00:00', 'MANUAL', '2026-02-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (12, '2026-03-01 10:00:00', 'MANUAL', '2026-03-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (13, '2026-05-01 10:00:00', 'MANUAL', '2026-05-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (14, '2025-07-01 10:00:00', 'MANUAL', '2025-07-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (15, '2025-10-01 10:00:00', 'MANUAL', '2025-10-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (16, '2026-01-01 10:00:00', 'MANUAL', '2026-01-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (17, '2025-10-01 10:00:00', 'MANUAL', '2025-10-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (18, '2026-03-01 10:00:00', 'MANUAL', '2026-03-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (19, '2026-05-01 10:00:00', 'MANUAL', '2026-05-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (20, '2025-11-01 10:00:00', 'MANUAL', '2025-11-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (21, '2025-12-01 10:00:00', 'MANUAL', '2025-12-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (22, '2025-11-01 10:00:00', 'MANUAL', '2025-11-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (23, '2025-06-01 10:00:00', 'MANUAL', '2025-06-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (24, '2025-07-01 10:00:00', 'MANUAL', '2025-07-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (25, '2025-09-01 10:00:00', 'MANUAL', '2025-09-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (26, '2026-04-01 10:00:00', 'MANUAL', '2026-04-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (27, '2025-08-01 10:00:00', 'MANUAL', '2025-08-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (28, '2026-02-01 10:00:00', 'MANUAL', '2026-02-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (29, '2025-07-01 10:00:00', 'MANUAL', '2025-07-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (30, '2025-09-01 10:00:00', 'MANUAL', '2025-09-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (31, '2026-01-01 10:00:00', 'MANUAL', '2026-01-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (32, '2026-02-01 10:00:00', 'MANUAL', '2026-02-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (33, '2025-10-01 10:00:00', 'MANUAL', '2025-10-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (34, '2026-05-01 10:00:00', 'MANUAL', '2026-05-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (35, '2025-07-01 10:00:00', 'MANUAL', '2025-07-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (36, '2026-02-01 10:00:00', 'MANUAL', '2026-02-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (37, '2025-09-01 10:00:00', 'MANUAL', '2025-09-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (38, '2025-12-01 10:00:00', 'MANUAL', '2025-12-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (39, '2025-06-01 10:00:00', 'MANUAL', '2025-06-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (40, '2026-03-01 10:00:00', 'MANUAL', '2026-03-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (41, '2025-08-01 10:00:00', 'MANUAL', '2025-08-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (42, '2026-04-01 10:00:00', 'MANUAL', '2026-04-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (43, '2025-11-01 10:00:00', 'MANUAL', '2025-11-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (44, '2026-03-01 10:00:00', 'MANUAL', '2026-03-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (45, '2026-01-01 10:00:00', 'MANUAL', '2026-01-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (46, '2026-01-01 10:00:00', 'MANUAL', '2026-01-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (47, '2025-10-01 10:00:00', 'MANUAL', '2025-10-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (48, '2025-11-01 10:00:00', 'MANUAL', '2025-11-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (49, '2026-05-01 10:00:00', 'MANUAL', '2026-05-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (50, '2025-10-01 10:00:00', 'MANUAL', '2025-10-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (51, '2026-05-01 10:00:00', 'MANUAL', '2026-05-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (52, '2025-09-01 10:00:00', 'MANUAL', '2025-09-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (53, '2025-12-01 10:00:00', 'MANUAL', '2025-12-01 10:00:00', 8, 4);
INSERT INTO public.bank_customer_financial_records VALUES (54, '2025-06-01 10:00:00', 'MANUAL', '2025-06-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (55, '2026-02-01 10:00:00', 'MANUAL', '2026-02-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (56, '2025-08-01 10:00:00', 'MANUAL', '2025-08-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (57, '2026-04-01 10:00:00', 'MANUAL', '2026-04-01 10:00:00', 7, 4);
INSERT INTO public.bank_customer_financial_records VALUES (58, '2025-06-01 10:00:00', 'MANUAL', '2025-06-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (59, '2025-07-01 10:00:00', 'MANUAL', '2025-07-01 10:00:00', 6, 4);
INSERT INTO public.bank_customer_financial_records VALUES (60, '2026-03-01 10:00:00', 'MANUAL', '2026-03-01 10:00:00', 5, 4);
INSERT INTO public.bank_customer_financial_records VALUES (61, '2025-08-01 10:00:00', 'MANUAL', '2025-08-01 10:00:00', 9, 4);
INSERT INTO public.bank_customer_financial_records VALUES (62, '2026-04-01 10:00:00', 'MANUAL', '2026-04-01 10:00:00', 9, 4);


--
-- TOC entry 5384 (class 0 OID 25068)
-- Dependencies: 266
-- Data for Name: bank_credit_evaluations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_credit_evaluations VALUES (4, 3, '2025-08-01 11:00:00', 0.6023, 12, 0.4733, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'MEDIUM', 120000.00, 72272.73, 54431.82, 115000.00, 35, 10, 9, 61, 4);
INSERT INTO public.bank_credit_evaluations VALUES (5, 3, '2026-02-01 11:00:00', 0.3028, 0, 0.1603, 'MANUAL', 5, 0, 0, 0, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 78727.27, 38481.81, 240000.00, 5, 0, 8, 36, 4);
INSERT INTO public.bank_credit_evaluations VALUES (9, 3, '2026-03-01 11:00:00', 0.8144, 25, 0.5397, 'MANUAL', 5, 0, 3, 18, '12-month mentor demo evaluation', false, 'HIGH', 120000.00, 97727.27, 62068.18, 115000.00, 68, 20, 9, 40, 4);
INSERT INTO public.bank_credit_evaluations VALUES (14, 3, '2025-07-01 11:00:00', 0.5126, 12, 0.3902, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 92272.73, 62431.82, 160000.00, 45, 10, 6, 59, 4);
INSERT INTO public.bank_credit_evaluations VALUES (20, 3, '2026-03-01 11:00:00', 0.2685, 0, 0.1494, 'MANUAL', 5, 0, 0, 0, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 69818.18, 35854.54, 240000.00, 5, 0, 8, 18, 4);
INSERT INTO public.bank_credit_evaluations VALUES (21, 3, '2025-09-01 11:00:00', 0.4741, 0, 0.2151, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 123272.73, 51618.19, 240000.00, 23, 10, 8, 37, 4);
INSERT INTO public.bank_credit_evaluations VALUES (24, 3, '2025-11-01 11:00:00', 0.4520, 12, 0.3322, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 81363.64, 53159.09, 160000.00, 45, 10, 6, 48, 4);
INSERT INTO public.bank_credit_evaluations VALUES (25, 3, '2025-07-01 11:00:00', 0.5427, 0, 0.2370, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 141090.91, 56872.73, 240000.00, 23, 10, 8, 35, 4);
INSERT INTO public.bank_credit_evaluations VALUES (27, 3, '2025-09-01 11:00:00', 0.6326, 12, 0.4828, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 120000.00, 75909.09, 55522.72, 115000.00, 45, 10, 9, 30, 4);
INSERT INTO public.bank_credit_evaluations VALUES (28, 3, '2026-01-01 11:00:00', 0.3371, 0, 0.1713, 'MANUAL', 5, 0, 0, 0, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 87636.36, 41109.09, 240000.00, 5, 0, 8, 46, 4);
INSERT INTO public.bank_credit_evaluations VALUES (30, 3, '2025-06-01 11:00:00', 0.5417, 12, 0.4543, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'MEDIUM', 120000.00, 65000.00, 52250.00, 115000.00, 35, 10, 9, 58, 4);
INSERT INTO public.bank_credit_evaluations VALUES (32, 3, '2025-08-01 11:00:00', 0.5084, 0, 0.2260, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 132181.82, 54245.46, 240000.00, 23, 10, 8, 6, 4);
INSERT INTO public.bank_credit_evaluations VALUES (34, 3, '2025-06-01 11:00:00', 0.5278, 12, 0.4047, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 95000.00, 64750.00, 160000.00, 45, 10, 6, 23, 4);
INSERT INTO public.bank_credit_evaluations VALUES (36, 3, '2025-11-01 11:00:00', 0.4056, 0, 0.1932, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 105454.55, 46363.64, 240000.00, 23, 10, 8, 43, 4);
INSERT INTO public.bank_credit_evaluations VALUES (38, 3, '2025-12-01 11:00:00', 0.3713, 0, 0.1822, 'MANUAL', 5, 0, 0, 0, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 96545.45, 43736.36, 240000.00, 5, 0, 8, 53, 4);
INSERT INTO public.bank_credit_evaluations VALUES (39, 3, '2026-01-01 11:00:00', 0.7538, 25, 0.5208, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'HIGH', 120000.00, 90454.55, 59886.36, 115000.00, 68, 20, 9, 10, 4);
INSERT INTO public.bank_credit_evaluations VALUES (40, 3, '2026-01-01 11:00:00', 0.4217, 12, 0.3033, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 75909.09, 48522.72, 160000.00, 35, 10, 6, 45, 4);
INSERT INTO public.bank_credit_evaluations VALUES (42, 3, '2026-02-01 11:00:00', 0.4066, 0, 0.2888, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 180000.00, 73181.82, 46204.55, 160000.00, 23, 10, 6, 55, 4);
INSERT INTO public.bank_credit_evaluations VALUES (23, 3, '2025-10-01 11:00:00', 0.8250, 25, 0.6717, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 132000.00, 87327.27, 130000.00, 88, 20, 7, 47, 4);
INSERT INTO public.bank_credit_evaluations VALUES (22, 3, '2025-09-01 11:00:00', 0.8375, 25, 0.6865, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 134000.00, 89245.46, 130000.00, 88, 20, 7, 25, 4);
INSERT INTO public.bank_credit_evaluations VALUES (35, 3, '2025-08-01 11:00:00', 0.8500, 25, 0.7013, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 136000.00, 91163.64, 130000.00, 88, 20, 7, 56, 4);
INSERT INTO public.bank_credit_evaluations VALUES (12, 2, '2026-05-01 11:00:00', 0.3611, 0, 0.2453, 'MANUAL', 0, 8, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 180000.00, 65000.00, 39250.00, 160000.00, 16, 0, 6, 19, 4);
INSERT INTO public.bank_credit_evaluations VALUES (31, 3, '2026-05-01 11:00:00', 0.7375, 25, 0.5685, 'MANUAL', 5, 8, 4, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 118000.00, 73900.00, 130000.00, 88, 20, 7, 49, 4);
INSERT INTO public.bank_credit_evaluations VALUES (18, 3, '2026-03-01 11:00:00', 0.7625, 25, 0.5980, 'MANUAL', 5, 8, 4, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 122000.00, 77736.36, 130000.00, 88, 20, 7, 44, 4);
INSERT INTO public.bank_credit_evaluations VALUES (37, 3, '2026-02-01 11:00:00', 0.7750, 25, 0.6127, 'MANUAL', 5, 8, 4, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 124000.00, 79654.54, 130000.00, 88, 20, 7, 28, 4);
INSERT INTO public.bank_credit_evaluations VALUES (13, 3, '2025-12-01 11:00:00', 0.8000, 25, 0.6422, 'MANUAL', 5, 8, 4, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 128000.00, 83490.91, 130000.00, 88, 20, 7, 8, 4);
INSERT INTO public.bank_credit_evaluations VALUES (26, 3, '2025-11-01 11:00:00', 0.8125, 25, 0.6570, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 130000.00, 85409.09, 130000.00, 88, 20, 7, 20, 4);
INSERT INTO public.bank_credit_evaluations VALUES (8, 3, '2025-07-01 11:00:00', 0.8625, 25, 0.7160, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 138000.00, 93081.82, 130000.00, 88, 20, 7, 29, 4);
INSERT INTO public.bank_credit_evaluations VALUES (33, 3, '2025-06-01 11:00:00', 0.8750, 25, 0.7308, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 140000.00, 95000.00, 130000.00, 88, 20, 7, 54, 4);
INSERT INTO public.bank_credit_evaluations VALUES (43, 3, '2025-10-01 11:00:00', 0.4672, 12, 0.3467, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 84090.91, 55477.28, 160000.00, 45, 10, 6, 17, 4);
INSERT INTO public.bank_credit_evaluations VALUES (45, 3, '2026-04-01 11:00:00', 0.2343, 0, 0.1384, 'MANUAL', 5, 0, 0, 0, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 60909.09, 33227.27, 240000.00, 5, 0, 8, 5, 4);
INSERT INTO public.bank_credit_evaluations VALUES (47, 3, '2026-02-01 11:00:00', 0.7841, 25, 0.5302, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'HIGH', 120000.00, 94090.91, 60977.28, 115000.00, 68, 20, 9, 32, 4);
INSERT INTO public.bank_credit_evaluations VALUES (48, 3, '2025-10-01 11:00:00', 0.4399, 0, 0.2041, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 114363.64, 48990.91, 240000.00, 23, 10, 8, 15, 4);
INSERT INTO public.bank_credit_evaluations VALUES (49, 3, '2025-10-01 11:00:00', 0.6629, 12, 0.4923, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 120000.00, 79545.45, 56613.64, 115000.00, 45, 10, 9, 50, 4);
INSERT INTO public.bank_credit_evaluations VALUES (51, 3, '2025-09-01 11:00:00', 0.4823, 12, 0.3612, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 86818.18, 57795.45, 160000.00, 45, 10, 6, 52, 4);
INSERT INTO public.bank_credit_evaluations VALUES (53, 3, '2025-07-01 11:00:00', 0.5720, 12, 0.4638, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'MEDIUM', 120000.00, 68636.36, 53340.91, 115000.00, 35, 10, 9, 24, 4);
INSERT INTO public.bank_credit_evaluations VALUES (55, 3, '2025-11-01 11:00:00', 0.6932, 25, 0.5018, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 120000.00, 83181.82, 57704.54, 115000.00, 58, 10, 9, 22, 4);
INSERT INTO public.bank_credit_evaluations VALUES (56, 3, '2026-04-01 11:00:00', 0.3763, 0, 0.2598, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 180000.00, 67727.27, 41568.18, 160000.00, 13, 0, 6, 26, 4);
INSERT INTO public.bank_credit_evaluations VALUES (57, 3, '2025-08-01 11:00:00', 0.4975, 12, 0.3757, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 89545.45, 60113.63, 160000.00, 45, 10, 6, 27, 4);
INSERT INTO public.bank_credit_evaluations VALUES (58, 3, '2026-04-01 11:00:00', 0.8447, 25, 0.5492, 'MANUAL', 5, 0, 3, 18, '12-month mentor demo evaluation', false, 'HIGH', 120000.00, 101363.64, 63159.09, 115000.00, 68, 20, 9, 62, 4);
INSERT INTO public.bank_credit_evaluations VALUES (59, 3, '2026-03-01 11:00:00', 0.3914, 0, 0.2743, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 180000.00, 70454.55, 43886.37, 160000.00, 13, 0, 6, 12, 4);
INSERT INTO public.bank_credit_evaluations VALUES (61, 3, '2025-06-01 11:00:00', 0.5769, 0, 0.2479, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 150000.00, 59500.00, 240000.00, 23, 10, 8, 7, 4);
INSERT INTO public.bank_credit_evaluations VALUES (62, 3, '2025-12-01 11:00:00', 0.4369, 12, 0.3178, 'MANUAL', 5, 0, 1, 8, '12-month mentor demo evaluation', false, 'MEDIUM', 180000.00, 78636.36, 50840.91, 160000.00, 35, 10, 6, 38, 4);
INSERT INTO public.bank_credit_evaluations VALUES (63, 3, '2025-12-01 11:00:00', 0.7235, 25, 0.5113, 'MANUAL', 5, 0, 2, 18, '12-month mentor demo evaluation', false, 'HIGH', 120000.00, 86818.18, 58795.46, 115000.00, 68, 20, 9, 3, 4);
INSERT INTO public.bank_credit_evaluations VALUES (44, 2, '2026-05-01 11:00:00', 0.2000, 0, 0.1275, 'MANUAL', 0, 8, 0, 0, '12-month mentor demo evaluation', false, 'LOW', 260000.00, 52000.00, 30600.00, 240000.00, 8, 0, 8, 13, 4);
INSERT INTO public.bank_credit_evaluations VALUES (50, 3, '2026-05-01 11:00:00', 0.8750, 25, 0.5587, 'MANUAL', 5, 8, 3, 18, '12-month mentor demo evaluation', false, 'HIGH', 120000.00, 105000.00, 64250.00, 115000.00, 76, 20, 9, 51, 4);
INSERT INTO public.bank_credit_evaluations VALUES (64, 5, '2025-06-01 11:00:00', 0.6500, 25, 0.6660, 'MANUAL', 10, 15, 5, 30, '12-month mentor demo trend: 90 down to 30', false, 'HIGH', 150000.00, 97500.00, 119875.00, 180000.00, 90, 10, 5, 39, 4);
INSERT INTO public.bank_credit_evaluations VALUES (65, 3, '2025-07-01 11:00:00', 0.8000, 25, 0.5444, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo trend: 90 down to 30', false, 'HIGH', 150000.00, 120000.00, 98000.00, 180000.00, 88, 20, 5, 14, 4);
INSERT INTO public.bank_credit_evaluations VALUES (66, 3, '2025-08-01 11:00:00', 0.6000, 25, 0.5361, 'MANUAL', 5, 8, 5, 30, '12-month mentor demo trend: 90 down to 30', false, 'HIGH', 150000.00, 90000.00, 96500.00, 180000.00, 78, 10, 5, 41, 4);
INSERT INTO public.bank_credit_evaluations VALUES (67, 2, '2025-09-01 11:00:00', 0.6000, 25, 0.5139, 'MANUAL', 0, 8, 5, 30, '12-month mentor demo trend: 90 down to 30', false, 'HIGH', 150000.00, 90000.00, 92500.00, 180000.00, 73, 10, 5, 9, 4);
INSERT INTO public.bank_credit_evaluations VALUES (68, 3, '2025-10-01 11:00:00', 0.6000, 25, 0.5139, 'MANUAL', 5, 8, 2, 18, '12-month mentor demo trend: 90 down to 30', false, 'MEDIUM', 150000.00, 90000.00, 92500.00, 180000.00, 66, 10, 5, 33, 4);
INSERT INTO public.bank_credit_evaluations VALUES (69, 2, '2025-11-01 11:00:00', 0.6000, 25, 0.5250, 'MANUAL', 0, 8, 2, 18, '12-month mentor demo trend: 90 down to 30', false, 'MEDIUM', 150000.00, 90000.00, 94500.00, 180000.00, 61, 10, 5, 4, 4);
INSERT INTO public.bank_credit_evaluations VALUES (70, 3, '2025-12-01 11:00:00', 0.5000, 12, 0.4097, 'MANUAL', 5, 8, 2, 18, '12-month mentor demo trend: 90 down to 30', false, 'MEDIUM', 150000.00, 75000.00, 73750.00, 180000.00, 53, 10, 5, 21, 4);
INSERT INTO public.bank_credit_evaluations VALUES (71, 3, '2026-01-01 11:00:00', 0.3000, 12, 0.4069, 'MANUAL', 5, 8, 2, 18, '12-month mentor demo trend: 90 down to 30', false, 'MEDIUM', 150000.00, 45000.00, 73250.00, 180000.00, 43, 0, 5, 31, 4);
INSERT INTO public.bank_credit_evaluations VALUES (72, 2, '2026-02-01 11:00:00', 0.5000, 12, 0.3542, 'MANUAL', 0, 8, 1, 8, '12-month mentor demo trend: 90 down to 30', false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 38, 10, 5, 11, 4);
INSERT INTO public.bank_credit_evaluations VALUES (73, 3, '2026-03-01 11:00:00', 0.5000, 12, 0.3542, 'MANUAL', 5, 8, 0, 0, '12-month mentor demo trend: 90 down to 30', false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 35, 10, 5, 60, 4);
INSERT INTO public.bank_credit_evaluations VALUES (74, 3, '2026-04-01 11:00:00', 0.3000, 12, 0.3847, 'MANUAL', 5, 8, 1, 8, '12-month mentor demo trend: 90 down to 30', false, 'LOW', 150000.00, 45000.00, 69250.00, 180000.00, 33, 0, 5, 42, 4);
INSERT INTO public.bank_credit_evaluations VALUES (52, 3, '2026-04-01 11:00:00', 0.7500, 25, 0.5832, 'MANUAL', 5, 8, 4, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 120000.00, 75818.18, 130000.00, 88, 20, 7, 57, 4);
INSERT INTO public.bank_credit_evaluations VALUES (54, 3, '2026-01-01 11:00:00', 0.7875, 25, 0.6275, 'MANUAL', 5, 8, 4, 30, '12-month mentor demo evaluation', false, 'HIGH', 160000.00, 126000.00, 81572.73, 130000.00, 88, 20, 7, 16, 4);
INSERT INTO public.bank_credit_evaluations VALUES (75, 2, '2026-05-01 11:00:00', 0.5000, 12, 0.3542, 'MANUAL', 0, 8, 0, 0, '12-month mentor demo trend: 90 down to 30', false, 'LOW', 150000.00, 75000.00, 63750.00, 180000.00, 30, 10, 5, 34, 4);


--
-- TOC entry 5368 (class 0 OID 24897)
-- Dependencies: 250
-- Data for Name: bank_customer_beneficiaries; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5370 (class 0 OID 24910)
-- Dependencies: 252
-- Data for Name: bank_customer_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customer_cards VALUES (8, '2025-11-01 10:15:00', 160000.00, 130000.00, 'Commercial Bank', 20);
INSERT INTO public.bank_customer_cards VALUES (9, '2025-09-01 10:15:00', 160000.00, 134000.00, 'Commercial Bank', 25);
INSERT INTO public.bank_customer_cards VALUES (10, '2026-04-01 10:15:00', 180000.00, 67727.27, 'Commercial Bank', 26);
INSERT INTO public.bank_customer_cards VALUES (11, '2025-08-01 10:15:00', 180000.00, 89545.45, 'Commercial Bank', 27);
INSERT INTO public.bank_customer_cards VALUES (14, '2025-10-01 10:15:00', 180000.00, 84090.91, 'Commercial Bank', 17);
INSERT INTO public.bank_customer_cards VALUES (16, '2026-04-01 10:15:00', 160000.00, 120000.00, 'Commercial Bank', 57);
INSERT INTO public.bank_customer_cards VALUES (19, '2026-03-01 10:15:00', 180000.00, 70454.55, 'Commercial Bank', 12);
INSERT INTO public.bank_customer_cards VALUES (20, '2026-01-01 10:15:00', 120000.00, 90454.55, 'Commercial Bank', 10);
INSERT INTO public.bank_customer_cards VALUES (21, '2026-03-01 10:15:00', 260000.00, 69818.18, 'Commercial Bank', 18);
INSERT INTO public.bank_customer_cards VALUES (22, '2025-10-01 10:15:00', 160000.00, 132000.00, 'Commercial Bank', 47);
INSERT INTO public.bank_customer_cards VALUES (23, '2026-01-01 10:15:00', 260000.00, 87636.36, 'Commercial Bank', 46);
INSERT INTO public.bank_customer_cards VALUES (24, '2025-10-01 10:15:00', 260000.00, 114363.64, 'Commercial Bank', 15);
INSERT INTO public.bank_customer_cards VALUES (25, '2025-08-01 10:15:00', 160000.00, 136000.00, 'Commercial Bank', 56);
INSERT INTO public.bank_customer_cards VALUES (26, '2026-03-01 10:15:00', 120000.00, 97727.27, 'Commercial Bank', 40);
INSERT INTO public.bank_customer_cards VALUES (27, '2026-05-01 10:15:00', 260000.00, 52000.00, 'Commercial Bank', 13);
INSERT INTO public.bank_customer_cards VALUES (29, '2026-04-01 10:15:00', 260000.00, 60909.09, 'Commercial Bank', 5);
INSERT INTO public.bank_customer_cards VALUES (30, '2026-05-01 10:15:00', 180000.00, 65000.00, 'Commercial Bank', 19);
INSERT INTO public.bank_customer_cards VALUES (31, '2025-09-01 10:15:00', 180000.00, 86818.18, 'Commercial Bank', 52);
INSERT INTO public.bank_customer_cards VALUES (32, '2025-09-01 10:15:00', 260000.00, 123272.73, 'Commercial Bank', 37);
INSERT INTO public.bank_customer_cards VALUES (33, '2026-02-01 10:15:00', 120000.00, 94090.91, 'Commercial Bank', 32);
INSERT INTO public.bank_customer_cards VALUES (34, '2025-07-01 10:15:00', 120000.00, 68636.36, 'Commercial Bank', 24);
INSERT INTO public.bank_customer_cards VALUES (35, '2026-02-01 10:15:00', 180000.00, 73181.82, 'Commercial Bank', 55);
INSERT INTO public.bank_customer_cards VALUES (36, '2025-12-01 10:15:00', 180000.00, 78636.36, 'Commercial Bank', 38);
INSERT INTO public.bank_customer_cards VALUES (37, '2025-12-01 10:15:00', 160000.00, 128000.00, 'Commercial Bank', 8);
INSERT INTO public.bank_customer_cards VALUES (38, '2025-11-01 10:15:00', 180000.00, 81363.64, 'Commercial Bank', 48);
INSERT INTO public.bank_customer_cards VALUES (39, '2026-02-01 10:15:00', 160000.00, 124000.00, 'Commercial Bank', 28);
INSERT INTO public.bank_customer_cards VALUES (40, '2025-09-01 10:15:00', 120000.00, 75909.09, 'Commercial Bank', 30);
INSERT INTO public.bank_customer_cards VALUES (41, '2026-04-01 10:15:00', 120000.00, 101363.64, 'Commercial Bank', 62);
INSERT INTO public.bank_customer_cards VALUES (42, '2025-10-01 10:15:00', 120000.00, 79545.45, 'Commercial Bank', 50);
INSERT INTO public.bank_customer_cards VALUES (43, '2026-05-01 10:15:00', 120000.00, 105000.00, 'Commercial Bank', 51);
INSERT INTO public.bank_customer_cards VALUES (45, '2025-07-01 10:15:00', 180000.00, 92272.73, 'Commercial Bank', 59);
INSERT INTO public.bank_customer_cards VALUES (46, '2025-08-01 10:15:00', 260000.00, 132181.82, 'Commercial Bank', 6);
INSERT INTO public.bank_customer_cards VALUES (47, '2025-07-01 10:15:00', 160000.00, 138000.00, 'Commercial Bank', 29);
INSERT INTO public.bank_customer_cards VALUES (49, '2026-01-01 10:15:00', 160000.00, 126000.00, 'Commercial Bank', 16);
INSERT INTO public.bank_customer_cards VALUES (50, '2025-06-01 10:15:00', 160000.00, 140000.00, 'Commercial Bank', 54);
INSERT INTO public.bank_customer_cards VALUES (51, '2026-02-01 10:15:00', 260000.00, 78727.27, 'Commercial Bank', 36);
INSERT INTO public.bank_customer_cards VALUES (53, '2025-12-01 10:15:00', 260000.00, 96545.45, 'Commercial Bank', 53);
INSERT INTO public.bank_customer_cards VALUES (54, '2025-06-01 10:15:00', 180000.00, 95000.00, 'Commercial Bank', 23);
INSERT INTO public.bank_customer_cards VALUES (55, '2026-03-01 10:15:00', 160000.00, 122000.00, 'Commercial Bank', 44);
INSERT INTO public.bank_customer_cards VALUES (56, '2025-06-01 10:15:00', 120000.00, 65000.00, 'Commercial Bank', 58);
INSERT INTO public.bank_customer_cards VALUES (57, '2026-05-01 10:15:00', 160000.00, 118000.00, 'Commercial Bank', 49);
INSERT INTO public.bank_customer_cards VALUES (58, '2025-11-01 10:15:00', 120000.00, 83181.82, 'Commercial Bank', 22);
INSERT INTO public.bank_customer_cards VALUES (59, '2026-01-01 10:15:00', 180000.00, 75909.09, 'Commercial Bank', 45);
INSERT INTO public.bank_customer_cards VALUES (61, '2025-11-01 10:15:00', 260000.00, 105454.55, 'Commercial Bank', 43);
INSERT INTO public.bank_customer_cards VALUES (62, '2025-12-01 10:15:00', 120000.00, 86818.18, 'Commercial Bank', 3);
INSERT INTO public.bank_customer_cards VALUES (63, '2025-08-01 10:15:00', 120000.00, 72272.73, 'Commercial Bank', 61);
INSERT INTO public.bank_customer_cards VALUES (65, '2025-07-01 10:15:00', 260000.00, 141090.91, 'Commercial Bank', 35);
INSERT INTO public.bank_customer_cards VALUES (67, '2025-06-01 10:15:00', 260000.00, 150000.00, 'Commercial Bank', 7);
INSERT INTO public.bank_customer_cards VALUES (68, '2025-06-01 10:15:00', 150000.00, 97500.00, 'Commercial Bank', 39);
INSERT INTO public.bank_customer_cards VALUES (69, '2025-07-01 10:15:00', 150000.00, 120000.00, 'Commercial Bank', 14);
INSERT INTO public.bank_customer_cards VALUES (70, '2025-08-01 10:15:00', 150000.00, 90000.00, 'Commercial Bank', 41);
INSERT INTO public.bank_customer_cards VALUES (71, '2025-09-01 10:15:00', 150000.00, 90000.00, 'Commercial Bank', 9);
INSERT INTO public.bank_customer_cards VALUES (72, '2025-10-01 10:15:00', 150000.00, 90000.00, 'Commercial Bank', 33);
INSERT INTO public.bank_customer_cards VALUES (73, '2025-11-01 10:15:00', 150000.00, 90000.00, 'Commercial Bank', 4);
INSERT INTO public.bank_customer_cards VALUES (74, '2025-12-01 10:15:00', 150000.00, 75000.00, 'Commercial Bank', 21);
INSERT INTO public.bank_customer_cards VALUES (75, '2026-01-01 10:15:00', 150000.00, 45000.00, 'Commercial Bank', 31);
INSERT INTO public.bank_customer_cards VALUES (76, '2026-02-01 10:15:00', 150000.00, 75000.00, 'Commercial Bank', 11);
INSERT INTO public.bank_customer_cards VALUES (77, '2026-03-01 10:15:00', 150000.00, 75000.00, 'Commercial Bank', 60);
INSERT INTO public.bank_customer_cards VALUES (78, '2026-04-01 10:15:00', 150000.00, 45000.00, 'Commercial Bank', 42);
INSERT INTO public.bank_customer_cards VALUES (79, '2026-05-01 10:15:00', 150000.00, 75000.00, 'Commercial Bank', 34);


--
-- TOC entry 5404 (class 0 OID 25323)
-- Dependencies: 286
-- Data for Name: bank_customer_crib_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5406 (class 0 OID 25348)
-- Dependencies: 288
-- Data for Name: bank_customer_incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customer_incomes VALUES (7, 130000.00, '2025-11-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 20);
INSERT INTO public.bank_customer_incomes VALUES (8, 130000.00, '2025-09-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 25);
INSERT INTO public.bank_customer_incomes VALUES (9, 160000.00, '2026-04-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 26);
INSERT INTO public.bank_customer_incomes VALUES (10, 160000.00, '2025-08-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 27);
INSERT INTO public.bank_customer_incomes VALUES (13, 160000.00, '2025-10-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 17);
INSERT INTO public.bank_customer_incomes VALUES (15, 130000.00, '2026-04-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 57);
INSERT INTO public.bank_customer_incomes VALUES (18, 160000.00, '2026-03-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 12);
INSERT INTO public.bank_customer_incomes VALUES (19, 115000.00, '2026-01-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 10);
INSERT INTO public.bank_customer_incomes VALUES (20, 240000.00, '2026-03-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 18);
INSERT INTO public.bank_customer_incomes VALUES (21, 130000.00, '2025-10-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 47);
INSERT INTO public.bank_customer_incomes VALUES (22, 240000.00, '2026-01-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 46);
INSERT INTO public.bank_customer_incomes VALUES (23, 240000.00, '2025-10-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 15);
INSERT INTO public.bank_customer_incomes VALUES (24, 130000.00, '2025-08-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 56);
INSERT INTO public.bank_customer_incomes VALUES (25, 115000.00, '2026-03-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 40);
INSERT INTO public.bank_customer_incomes VALUES (26, 240000.00, '2026-05-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 13);
INSERT INTO public.bank_customer_incomes VALUES (28, 240000.00, '2026-04-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 5);
INSERT INTO public.bank_customer_incomes VALUES (29, 160000.00, '2026-05-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 19);
INSERT INTO public.bank_customer_incomes VALUES (30, 160000.00, '2025-09-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 52);
INSERT INTO public.bank_customer_incomes VALUES (31, 240000.00, '2025-09-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 37);
INSERT INTO public.bank_customer_incomes VALUES (32, 115000.00, '2026-02-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 32);
INSERT INTO public.bank_customer_incomes VALUES (33, 115000.00, '2025-07-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 24);
INSERT INTO public.bank_customer_incomes VALUES (34, 160000.00, '2026-02-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 55);
INSERT INTO public.bank_customer_incomes VALUES (35, 160000.00, '2025-12-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 38);
INSERT INTO public.bank_customer_incomes VALUES (36, 130000.00, '2025-12-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 8);
INSERT INTO public.bank_customer_incomes VALUES (37, 160000.00, '2025-11-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 48);
INSERT INTO public.bank_customer_incomes VALUES (38, 130000.00, '2026-02-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 28);
INSERT INTO public.bank_customer_incomes VALUES (39, 115000.00, '2025-09-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 30);
INSERT INTO public.bank_customer_incomes VALUES (40, 115000.00, '2026-04-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 62);
INSERT INTO public.bank_customer_incomes VALUES (41, 115000.00, '2025-10-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 50);
INSERT INTO public.bank_customer_incomes VALUES (42, 115000.00, '2026-05-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 51);
INSERT INTO public.bank_customer_incomes VALUES (44, 160000.00, '2025-07-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 59);
INSERT INTO public.bank_customer_incomes VALUES (45, 240000.00, '2025-08-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 6);
INSERT INTO public.bank_customer_incomes VALUES (46, 130000.00, '2025-07-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 29);
INSERT INTO public.bank_customer_incomes VALUES (48, 130000.00, '2026-01-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 16);
INSERT INTO public.bank_customer_incomes VALUES (49, 130000.00, '2025-06-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 54);
INSERT INTO public.bank_customer_incomes VALUES (50, 240000.00, '2026-02-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 36);
INSERT INTO public.bank_customer_incomes VALUES (52, 240000.00, '2025-12-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 53);
INSERT INTO public.bank_customer_incomes VALUES (53, 160000.00, '2025-06-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 23);
INSERT INTO public.bank_customer_incomes VALUES (54, 130000.00, '2026-03-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 44);
INSERT INTO public.bank_customer_incomes VALUES (55, 115000.00, '2025-06-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 58);
INSERT INTO public.bank_customer_incomes VALUES (56, 130000.00, '2026-05-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 49);
INSERT INTO public.bank_customer_incomes VALUES (57, 115000.00, '2025-11-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 22);
INSERT INTO public.bank_customer_incomes VALUES (58, 160000.00, '2026-01-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 45);
INSERT INTO public.bank_customer_incomes VALUES (60, 240000.00, '2025-11-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 43);
INSERT INTO public.bank_customer_incomes VALUES (61, 115000.00, '2025-12-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 3);
INSERT INTO public.bank_customer_incomes VALUES (62, 115000.00, '2025-08-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 61);
INSERT INTO public.bank_customer_incomes VALUES (64, 240000.00, '2025-07-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 35);
INSERT INTO public.bank_customer_incomes VALUES (66, 240000.00, '2025-06-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 7);
INSERT INTO public.bank_customer_incomes VALUES (67, 180000.00, '2025-06-01 10:05:00', NULL, 'FREELANCE', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 39);
INSERT INTO public.bank_customer_incomes VALUES (68, 180000.00, '2025-07-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 14);
INSERT INTO public.bank_customer_incomes VALUES (69, 180000.00, '2025-08-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 41);
INSERT INTO public.bank_customer_incomes VALUES (70, 180000.00, '2025-09-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 9);
INSERT INTO public.bank_customer_incomes VALUES (71, 180000.00, '2025-10-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 33);
INSERT INTO public.bank_customer_incomes VALUES (72, 180000.00, '2025-11-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 4);
INSERT INTO public.bank_customer_incomes VALUES (73, 180000.00, '2025-12-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 21);
INSERT INTO public.bank_customer_incomes VALUES (74, 180000.00, '2026-01-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 31);
INSERT INTO public.bank_customer_incomes VALUES (75, 180000.00, '2026-02-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 11);
INSERT INTO public.bank_customer_incomes VALUES (76, 180000.00, '2026-03-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 60);
INSERT INTO public.bank_customer_incomes VALUES (77, 180000.00, '2026-04-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 42);
INSERT INTO public.bank_customer_incomes VALUES (78, 180000.00, '2026-05-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 34);


--
-- TOC entry 5374 (class 0 OID 24944)
-- Dependencies: 256
-- Data for Name: bank_customer_liabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customer_liabilities VALUES (5, '2025-11-01 10:20:00', 'Other monthly commitments', 15272.73, 20);
INSERT INTO public.bank_customer_liabilities VALUES (6, '2025-09-01 10:20:00', 'Other monthly commitments', 16363.64, 25);
INSERT INTO public.bank_customer_liabilities VALUES (7, '2026-04-01 10:20:00', 'Other monthly commitments', 727.27, 26);
INSERT INTO public.bank_customer_liabilities VALUES (8, '2025-08-01 10:20:00', 'Other monthly commitments', 6545.45, 27);
INSERT INTO public.bank_customer_liabilities VALUES (9, '2025-10-01 10:20:00', 'Other monthly commitments', 5090.91, 17);
INSERT INTO public.bank_customer_liabilities VALUES (10, '2026-04-01 10:20:00', 'Other monthly commitments', 12545.45, 57);
INSERT INTO public.bank_customer_liabilities VALUES (11, '2026-03-01 10:20:00', 'Other monthly commitments', 1454.55, 12);
INSERT INTO public.bank_customer_liabilities VALUES (12, '2026-01-01 10:20:00', 'Other monthly commitments', 7545.45, 10);
INSERT INTO public.bank_customer_liabilities VALUES (13, '2026-03-01 10:20:00', 'Other monthly commitments', 1818.18, 18);
INSERT INTO public.bank_customer_liabilities VALUES (14, '2025-10-01 10:20:00', 'Other monthly commitments', 15818.18, 47);
INSERT INTO public.bank_customer_liabilities VALUES (15, '2026-01-01 10:20:00', 'Other monthly commitments', 3636.36, 46);
INSERT INTO public.bank_customer_liabilities VALUES (16, '2025-10-01 10:20:00', 'Other monthly commitments', 6363.64, 15);
INSERT INTO public.bank_customer_liabilities VALUES (17, '2025-08-01 10:20:00', 'Other monthly commitments', 16909.09, 56);
INSERT INTO public.bank_customer_liabilities VALUES (18, '2026-03-01 10:20:00', 'Other monthly commitments', 8272.73, 40);
INSERT INTO public.bank_customer_liabilities VALUES (19, '2026-04-01 10:20:00', 'Other monthly commitments', 909.09, 5);
INSERT INTO public.bank_customer_liabilities VALUES (20, '2025-09-01 10:20:00', 'Other monthly commitments', 5818.18, 52);
INSERT INTO public.bank_customer_liabilities VALUES (21, '2025-09-01 10:20:00', 'Other monthly commitments', 7272.73, 37);
INSERT INTO public.bank_customer_liabilities VALUES (22, '2026-02-01 10:20:00', 'Other monthly commitments', 7909.09, 32);
INSERT INTO public.bank_customer_liabilities VALUES (23, '2025-07-01 10:20:00', 'Other monthly commitments', 5363.64, 24);
INSERT INTO public.bank_customer_liabilities VALUES (24, '2026-02-01 10:20:00', 'Other monthly commitments', 2181.82, 55);
INSERT INTO public.bank_customer_liabilities VALUES (25, '2025-12-01 10:20:00', 'Other monthly commitments', 3636.36, 38);
INSERT INTO public.bank_customer_liabilities VALUES (26, '2025-12-01 10:20:00', 'Other monthly commitments', 14727.27, 8);
INSERT INTO public.bank_customer_liabilities VALUES (27, '2025-11-01 10:20:00', 'Other monthly commitments', 4363.64, 48);
INSERT INTO public.bank_customer_liabilities VALUES (28, '2026-02-01 10:20:00', 'Other monthly commitments', 13636.36, 28);
INSERT INTO public.bank_customer_liabilities VALUES (29, '2025-09-01 10:20:00', 'Other monthly commitments', 6090.91, 30);
INSERT INTO public.bank_customer_liabilities VALUES (30, '2026-04-01 10:20:00', 'Other monthly commitments', 8636.36, 62);
INSERT INTO public.bank_customer_liabilities VALUES (31, '2025-10-01 10:20:00', 'Other monthly commitments', 6454.55, 50);
INSERT INTO public.bank_customer_liabilities VALUES (32, '2026-05-01 10:20:00', 'Other monthly commitments', 9000.00, 51);
INSERT INTO public.bank_customer_liabilities VALUES (33, '2025-07-01 10:20:00', 'Other monthly commitments', 7272.73, 59);
INSERT INTO public.bank_customer_liabilities VALUES (34, '2025-08-01 10:20:00', 'Other monthly commitments', 8181.82, 6);
INSERT INTO public.bank_customer_liabilities VALUES (35, '2025-07-01 10:20:00', 'Other monthly commitments', 17454.55, 29);
INSERT INTO public.bank_customer_liabilities VALUES (36, '2026-01-01 10:20:00', 'Other monthly commitments', 14181.82, 16);
INSERT INTO public.bank_customer_liabilities VALUES (37, '2025-06-01 10:20:00', 'Other monthly commitments', 18000.00, 54);
INSERT INTO public.bank_customer_liabilities VALUES (38, '2026-02-01 10:20:00', 'Other monthly commitments', 2727.27, 36);
INSERT INTO public.bank_customer_liabilities VALUES (39, '2025-12-01 10:20:00', 'Other monthly commitments', 4545.45, 53);
INSERT INTO public.bank_customer_liabilities VALUES (40, '2025-06-01 10:20:00', 'Other monthly commitments', 8000.00, 23);
INSERT INTO public.bank_customer_liabilities VALUES (41, '2026-03-01 10:20:00', 'Other monthly commitments', 13090.91, 44);
INSERT INTO public.bank_customer_liabilities VALUES (42, '2025-06-01 10:20:00', 'Other monthly commitments', 5000.00, 58);
INSERT INTO public.bank_customer_liabilities VALUES (43, '2026-05-01 10:20:00', 'Other monthly commitments', 12000.00, 49);
INSERT INTO public.bank_customer_liabilities VALUES (44, '2025-11-01 10:20:00', 'Other monthly commitments', 6818.18, 22);
INSERT INTO public.bank_customer_liabilities VALUES (45, '2026-01-01 10:20:00', 'Other monthly commitments', 2909.09, 45);
INSERT INTO public.bank_customer_liabilities VALUES (46, '2025-11-01 10:20:00', 'Other monthly commitments', 5454.55, 43);
INSERT INTO public.bank_customer_liabilities VALUES (47, '2025-12-01 10:20:00', 'Other monthly commitments', 7181.82, 3);
INSERT INTO public.bank_customer_liabilities VALUES (48, '2025-08-01 10:20:00', 'Other monthly commitments', 5727.27, 61);
INSERT INTO public.bank_customer_liabilities VALUES (49, '2025-07-01 10:20:00', 'Other monthly commitments', 9090.91, 35);
INSERT INTO public.bank_customer_liabilities VALUES (50, '2025-06-01 10:20:00', 'Other monthly commitments', 10000.00, 7);
INSERT INTO public.bank_customer_liabilities VALUES (51, '2025-06-01 10:20:00', 'Trend demo liability 1', 10000.00, 39);
INSERT INTO public.bank_customer_liabilities VALUES (52, '2025-06-01 10:20:00', 'Trend demo liability 2', 10000.00, 39);
INSERT INTO public.bank_customer_liabilities VALUES (53, '2025-06-01 10:20:00', 'Trend demo liability 3', 10000.00, 39);
INSERT INTO public.bank_customer_liabilities VALUES (54, '2025-07-01 10:20:00', 'Trend demo liability 1', 12000.00, 14);
INSERT INTO public.bank_customer_liabilities VALUES (55, '2025-08-01 10:20:00', 'Trend demo liability 1', 8000.00, 41);
INSERT INTO public.bank_customer_liabilities VALUES (56, '2025-10-01 10:20:00', 'Trend demo liability 1', 8000.00, 33);
INSERT INTO public.bank_customer_liabilities VALUES (57, '2025-12-01 10:20:00', 'Trend demo liability 1', 10000.00, 21);
INSERT INTO public.bank_customer_liabilities VALUES (58, '2026-01-01 10:20:00', 'Trend demo liability 1', 9000.00, 31);
INSERT INTO public.bank_customer_liabilities VALUES (59, '2026-03-01 10:20:00', 'Trend demo liability 1', 8000.00, 60);
INSERT INTO public.bank_customer_liabilities VALUES (60, '2026-04-01 10:20:00', 'Trend demo liability 1', 7000.00, 42);


--
-- TOC entry 5376 (class 0 OID 24955)
-- Dependencies: 258
-- Data for Name: bank_customer_loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customer_loans VALUES (7, '2025-11-01 10:10:00', 'PERSONAL_LOAN', 63636.36, 1309090.91, 20);
INSERT INTO public.bank_customer_loans VALUES (8, '2025-09-01 10:10:00', 'PERSONAL_LOAN', 66181.82, 1385454.55, 25);
INSERT INTO public.bank_customer_loans VALUES (9, '2026-04-01 10:10:00', 'PERSONAL_LOAN', 37454.55, 818181.82, 26);
INSERT INTO public.bank_customer_loans VALUES (10, '2025-08-01 10:10:00', 'PERSONAL_LOAN', 49090.91, 1123636.36, 27);
INSERT INTO public.bank_customer_loans VALUES (13, '2025-10-01 10:10:00', 'PERSONAL_LOAN', 46181.82, 1047272.73, 17);
INSERT INTO public.bank_customer_loans VALUES (15, '2026-04-01 10:10:00', 'PERSONAL_LOAN', 57272.73, 1118181.82, 57);
INSERT INTO public.bank_customer_loans VALUES (18, '2026-03-01 10:10:00', 'PERSONAL_LOAN', 38909.09, 856363.64, 12);
INSERT INTO public.bank_customer_loans VALUES (19, '2026-01-01 10:10:00', 'PERSONAL_LOAN', 47818.18, 870909.09, 10);
INSERT INTO public.bank_customer_loans VALUES (20, '2026-03-01 10:10:00', 'PERSONAL_LOAN', 30545.45, 689090.91, 18);
INSERT INTO public.bank_customer_loans VALUES (21, '2025-10-01 10:10:00', 'PERSONAL_LOAN', 64909.09, 1347272.73, 47);
INSERT INTO public.bank_customer_loans VALUES (22, '2026-01-01 10:10:00', 'PERSONAL_LOAN', 33090.91, 758181.82, 46);
INSERT INTO public.bank_customer_loans VALUES (23, '2025-10-01 10:10:00', 'PERSONAL_LOAN', 36909.09, 861818.18, 15);
INSERT INTO public.bank_customer_loans VALUES (24, '2025-08-01 10:10:00', 'PERSONAL_LOAN', 67454.55, 1423636.36, 56);
INSERT INTO public.bank_customer_loans VALUES (25, '2026-03-01 10:10:00', 'PERSONAL_LOAN', 48909.09, 885454.55, 40);
INSERT INTO public.bank_customer_loans VALUES (26, '2026-05-01 10:10:00', 'PERSONAL_LOAN', 28000.00, 620000.00, 13);
INSERT INTO public.bank_customer_loans VALUES (28, '2026-04-01 10:10:00', 'PERSONAL_LOAN', 29272.73, 654545.45, 5);
INSERT INTO public.bank_customer_loans VALUES (29, '2026-05-01 10:10:00', 'PERSONAL_LOAN', 36000.00, 780000.00, 19);
INSERT INTO public.bank_customer_loans VALUES (30, '2025-09-01 10:10:00', 'PERSONAL_LOAN', 47636.36, 1085454.55, 52);
INSERT INTO public.bank_customer_loans VALUES (31, '2025-09-01 10:10:00', 'PERSONAL_LOAN', 38181.82, 896363.64, 37);
INSERT INTO public.bank_customer_loans VALUES (32, '2026-02-01 10:10:00', 'PERSONAL_LOAN', 48363.64, 878181.82, 32);
INSERT INTO public.bank_customer_loans VALUES (33, '2025-07-01 10:10:00', 'PERSONAL_LOAN', 44545.45, 827272.73, 24);
INSERT INTO public.bank_customer_loans VALUES (34, '2026-02-01 10:10:00', 'PERSONAL_LOAN', 40363.64, 894545.45, 55);
INSERT INTO public.bank_customer_loans VALUES (35, '2025-12-01 10:10:00', 'PERSONAL_LOAN', 43272.73, 970909.09, 38);
INSERT INTO public.bank_customer_loans VALUES (36, '2025-12-01 10:10:00', 'PERSONAL_LOAN', 62363.64, 1270909.09, 8);
INSERT INTO public.bank_customer_loans VALUES (37, '2025-11-01 10:10:00', 'PERSONAL_LOAN', 44727.27, 1009090.91, 48);
INSERT INTO public.bank_customer_loans VALUES (38, '2026-02-01 10:10:00', 'PERSONAL_LOAN', 59818.18, 1194545.45, 28);
INSERT INTO public.bank_customer_loans VALUES (39, '2025-09-01 10:10:00', 'PERSONAL_LOAN', 45636.36, 841818.18, 30);
INSERT INTO public.bank_customer_loans VALUES (40, '2026-04-01 10:10:00', 'PERSONAL_LOAN', 49454.55, 892727.27, 62);
INSERT INTO public.bank_customer_loans VALUES (41, '2025-10-01 10:10:00', 'PERSONAL_LOAN', 46181.82, 849090.91, 50);
INSERT INTO public.bank_customer_loans VALUES (42, '2026-05-01 10:10:00', 'PERSONAL_LOAN', 50000.00, 900000.00, 51);
INSERT INTO public.bank_customer_loans VALUES (44, '2025-07-01 10:10:00', 'PERSONAL_LOAN', 50545.45, 1161818.18, 59);
INSERT INTO public.bank_customer_loans VALUES (45, '2025-08-01 10:10:00', 'PERSONAL_LOAN', 39454.55, 930909.09, 6);
INSERT INTO public.bank_customer_loans VALUES (46, '2025-07-01 10:10:00', 'PERSONAL_LOAN', 68727.27, 1461818.18, 29);
INSERT INTO public.bank_customer_loans VALUES (48, '2026-01-01 10:10:00', 'PERSONAL_LOAN', 61090.91, 1232727.27, 16);
INSERT INTO public.bank_customer_loans VALUES (49, '2025-06-01 10:10:00', 'PERSONAL_LOAN', 70000.00, 1500000.00, 54);
INSERT INTO public.bank_customer_loans VALUES (50, '2026-02-01 10:10:00', 'PERSONAL_LOAN', 31818.18, 723636.36, 36);
INSERT INTO public.bank_customer_loans VALUES (52, '2025-12-01 10:10:00', 'PERSONAL_LOAN', 34363.64, 792727.27, 53);
INSERT INTO public.bank_customer_loans VALUES (53, '2025-06-01 10:10:00', 'PERSONAL_LOAN', 52000.00, 1200000.00, 23);
INSERT INTO public.bank_customer_loans VALUES (54, '2026-03-01 10:10:00', 'PERSONAL_LOAN', 58545.45, 1156363.64, 44);
INSERT INTO public.bank_customer_loans VALUES (55, '2025-06-01 10:10:00', 'PERSONAL_LOAN', 44000.00, 820000.00, 58);
INSERT INTO public.bank_customer_loans VALUES (56, '2026-05-01 10:10:00', 'PERSONAL_LOAN', 56000.00, 1080000.00, 49);
INSERT INTO public.bank_customer_loans VALUES (57, '2025-11-01 10:10:00', 'PERSONAL_LOAN', 46727.27, 856363.64, 22);
INSERT INTO public.bank_customer_loans VALUES (58, '2026-01-01 10:10:00', 'PERSONAL_LOAN', 41818.18, 932727.27, 45);
INSERT INTO public.bank_customer_loans VALUES (60, '2025-11-01 10:10:00', 'PERSONAL_LOAN', 35636.36, 827272.73, 43);
INSERT INTO public.bank_customer_loans VALUES (61, '2025-12-01 10:10:00', 'PERSONAL_LOAN', 47272.73, 863636.36, 3);
INSERT INTO public.bank_customer_loans VALUES (62, '2025-08-01 10:10:00', 'PERSONAL_LOAN', 45090.91, 834545.45, 61);
INSERT INTO public.bank_customer_loans VALUES (64, '2025-07-01 10:10:00', 'PERSONAL_LOAN', 40727.27, 965454.55, 35);
INSERT INTO public.bank_customer_loans VALUES (66, '2025-06-01 10:10:00', 'PERSONAL_LOAN', 42000.00, 1000000.00, 7);
INSERT INTO public.bank_customer_loans VALUES (67, '2025-06-01 10:10:00', 'PERSONAL_LOAN', 85000.00, 1700000.00, 39);
INSERT INTO public.bank_customer_loans VALUES (68, '2025-07-01 10:10:00', 'PERSONAL_LOAN', 80000.00, 1580000.00, 14);
INSERT INTO public.bank_customer_loans VALUES (69, '2025-08-01 10:10:00', 'PERSONAL_LOAN', 84000.00, 1460000.00, 41);
INSERT INTO public.bank_customer_loans VALUES (70, '2025-09-01 10:10:00', 'PERSONAL_LOAN', 88000.00, 1340000.00, 9);
INSERT INTO public.bank_customer_loans VALUES (71, '2025-10-01 10:10:00', 'PERSONAL_LOAN', 80000.00, 1220000.00, 33);
INSERT INTO public.bank_customer_loans VALUES (72, '2025-11-01 10:10:00', 'PERSONAL_LOAN', 90000.00, 1100000.00, 4);
INSERT INTO public.bank_customer_loans VALUES (73, '2025-12-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 980000.00, 21);
INSERT INTO public.bank_customer_loans VALUES (74, '2026-01-01 10:10:00', 'PERSONAL_LOAN', 62000.00, 880000.00, 31);
INSERT INTO public.bank_customer_loans VALUES (75, '2026-02-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 790000.00, 11);
INSERT INTO public.bank_customer_loans VALUES (76, '2026-03-01 10:10:00', 'PERSONAL_LOAN', 52000.00, 720000.00, 60);
INSERT INTO public.bank_customer_loans VALUES (77, '2026-04-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 670000.00, 42);
INSERT INTO public.bank_customer_loans VALUES (78, '2026-05-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 620000.00, 34);


--
-- TOC entry 5378 (class 0 OID 24967)
-- Dependencies: 260
-- Data for Name: bank_customer_missed_payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bank_customer_missed_payments VALUES (123, '2025-06-01 10:25:00', 5, 39);
INSERT INTO public.bank_customer_missed_payments VALUES (124, '2025-07-01 10:25:00', 5, 14);
INSERT INTO public.bank_customer_missed_payments VALUES (125, '2025-08-01 10:25:00', 5, 41);
INSERT INTO public.bank_customer_missed_payments VALUES (3, '2025-12-01 10:25:00', 2, 3);
INSERT INTO public.bank_customer_missed_payments VALUES (5, '2026-04-01 10:25:00', 0, 5);
INSERT INTO public.bank_customer_missed_payments VALUES (6, '2025-08-01 10:25:00', 1, 6);
INSERT INTO public.bank_customer_missed_payments VALUES (7, '2025-06-01 10:25:00', 1, 7);
INSERT INTO public.bank_customer_missed_payments VALUES (8, '2025-12-01 10:25:00', 4, 8);
INSERT INTO public.bank_customer_missed_payments VALUES (10, '2026-01-01 10:25:00', 2, 10);
INSERT INTO public.bank_customer_missed_payments VALUES (12, '2026-03-01 10:25:00', 1, 12);
INSERT INTO public.bank_customer_missed_payments VALUES (13, '2026-05-01 10:25:00', 0, 13);
INSERT INTO public.bank_customer_missed_payments VALUES (15, '2025-10-01 10:25:00', 1, 15);
INSERT INTO public.bank_customer_missed_payments VALUES (16, '2026-01-01 10:25:00', 4, 16);
INSERT INTO public.bank_customer_missed_payments VALUES (17, '2025-10-01 10:25:00', 2, 17);
INSERT INTO public.bank_customer_missed_payments VALUES (18, '2026-03-01 10:25:00', 0, 18);
INSERT INTO public.bank_customer_missed_payments VALUES (19, '2026-05-01 10:25:00', 1, 19);
INSERT INTO public.bank_customer_missed_payments VALUES (20, '2025-11-01 10:25:00', 5, 20);
INSERT INTO public.bank_customer_missed_payments VALUES (22, '2025-11-01 10:25:00', 2, 22);
INSERT INTO public.bank_customer_missed_payments VALUES (23, '2025-06-01 10:25:00', 2, 23);
INSERT INTO public.bank_customer_missed_payments VALUES (24, '2025-07-01 10:25:00', 1, 24);
INSERT INTO public.bank_customer_missed_payments VALUES (25, '2025-09-01 10:25:00', 5, 25);
INSERT INTO public.bank_customer_missed_payments VALUES (26, '2026-04-01 10:25:00', 1, 26);
INSERT INTO public.bank_customer_missed_payments VALUES (27, '2025-08-01 10:25:00', 2, 27);
INSERT INTO public.bank_customer_missed_payments VALUES (28, '2026-02-01 10:25:00', 4, 28);
INSERT INTO public.bank_customer_missed_payments VALUES (29, '2025-07-01 10:25:00', 5, 29);
INSERT INTO public.bank_customer_missed_payments VALUES (30, '2025-09-01 10:25:00', 2, 30);
INSERT INTO public.bank_customer_missed_payments VALUES (32, '2026-02-01 10:25:00', 2, 32);
INSERT INTO public.bank_customer_missed_payments VALUES (35, '2025-07-01 10:25:00', 1, 35);
INSERT INTO public.bank_customer_missed_payments VALUES (36, '2026-02-01 10:25:00', 0, 36);
INSERT INTO public.bank_customer_missed_payments VALUES (37, '2025-09-01 10:25:00', 1, 37);
INSERT INTO public.bank_customer_missed_payments VALUES (38, '2025-12-01 10:25:00', 1, 38);
INSERT INTO public.bank_customer_missed_payments VALUES (40, '2026-03-01 10:25:00', 3, 40);
INSERT INTO public.bank_customer_missed_payments VALUES (43, '2025-11-01 10:25:00', 1, 43);
INSERT INTO public.bank_customer_missed_payments VALUES (44, '2026-03-01 10:25:00', 4, 44);
INSERT INTO public.bank_customer_missed_payments VALUES (45, '2026-01-01 10:25:00', 1, 45);
INSERT INTO public.bank_customer_missed_payments VALUES (46, '2026-01-01 10:25:00', 0, 46);
INSERT INTO public.bank_customer_missed_payments VALUES (47, '2025-10-01 10:25:00', 5, 47);
INSERT INTO public.bank_customer_missed_payments VALUES (48, '2025-11-01 10:25:00', 2, 48);
INSERT INTO public.bank_customer_missed_payments VALUES (49, '2026-05-01 10:25:00', 4, 49);
INSERT INTO public.bank_customer_missed_payments VALUES (50, '2025-10-01 10:25:00', 2, 50);
INSERT INTO public.bank_customer_missed_payments VALUES (51, '2026-05-01 10:25:00', 3, 51);
INSERT INTO public.bank_customer_missed_payments VALUES (52, '2025-09-01 10:25:00', 2, 52);
INSERT INTO public.bank_customer_missed_payments VALUES (53, '2025-12-01 10:25:00', 0, 53);
INSERT INTO public.bank_customer_missed_payments VALUES (54, '2025-06-01 10:25:00', 5, 54);
INSERT INTO public.bank_customer_missed_payments VALUES (55, '2026-02-01 10:25:00', 1, 55);
INSERT INTO public.bank_customer_missed_payments VALUES (56, '2025-08-01 10:25:00', 5, 56);
INSERT INTO public.bank_customer_missed_payments VALUES (57, '2026-04-01 10:25:00', 4, 57);
INSERT INTO public.bank_customer_missed_payments VALUES (58, '2025-06-01 10:25:00', 1, 58);
INSERT INTO public.bank_customer_missed_payments VALUES (59, '2025-07-01 10:25:00', 2, 59);
INSERT INTO public.bank_customer_missed_payments VALUES (61, '2025-08-01 10:25:00', 1, 61);
INSERT INTO public.bank_customer_missed_payments VALUES (62, '2026-04-01 10:25:00', 3, 62);
INSERT INTO public.bank_customer_missed_payments VALUES (126, '2025-09-01 10:25:00', 5, 9);
INSERT INTO public.bank_customer_missed_payments VALUES (127, '2025-10-01 10:25:00', 2, 33);
INSERT INTO public.bank_customer_missed_payments VALUES (128, '2025-11-01 10:25:00', 2, 4);
INSERT INTO public.bank_customer_missed_payments VALUES (129, '2025-12-01 10:25:00', 2, 21);
INSERT INTO public.bank_customer_missed_payments VALUES (130, '2026-01-01 10:25:00', 2, 31);
INSERT INTO public.bank_customer_missed_payments VALUES (131, '2026-02-01 10:25:00', 1, 11);
INSERT INTO public.bank_customer_missed_payments VALUES (132, '2026-03-01 10:25:00', 0, 60);
INSERT INTO public.bank_customer_missed_payments VALUES (133, '2026-04-01 10:25:00', 1, 42);
INSERT INTO public.bank_customer_missed_payments VALUES (134, '2026-05-01 10:25:00', 0, 34);


--
-- TOC entry 5382 (class 0 OID 24992)
-- Dependencies: 264
-- Data for Name: bank_customer_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5380 (class 0 OID 24977)
-- Dependencies: 262
-- Data for Name: bank_customer_transaction_otp_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5390 (class 0 OID 25164)
-- Dependencies: 272
-- Data for Name: expense_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.expense_categories VALUES (1, 'Food', 'VARIABLE', '2026-04-25 12:29:08.712597', 4);
INSERT INTO public.expense_categories VALUES (2, 'Transport', 'VARIABLE', '2026-04-25 12:29:08.734668', 4);
INSERT INTO public.expense_categories VALUES (3, 'Bills', 'FIXED', '2026-04-25 12:29:08.73718', 4);
INSERT INTO public.expense_categories VALUES (4, 'Shopping', 'VARIABLE', '2026-04-25 12:29:08.73831', 4);
INSERT INTO public.expense_categories VALUES (5, 'Health', 'VARIABLE', '2026-04-25 12:29:08.739317', 4);
INSERT INTO public.expense_categories VALUES (6, 'Education', 'FIXED', '2026-04-25 12:29:08.748558', 4);
INSERT INTO public.expense_categories VALUES (7, 'Entertainment', 'VARIABLE', '2026-04-25 12:29:08.750553', 4);
INSERT INTO public.expense_categories VALUES (8, 'Savings', 'FIXED', '2026-04-25 12:29:08.751556', 4);
INSERT INTO public.expense_categories VALUES (9, 'Food', 'VARIABLE', '2026-04-28 20:47:29.94423', 3);
INSERT INTO public.expense_categories VALUES (10, 'Transport', 'VARIABLE', '2026-04-28 20:47:29.950238', 3);
INSERT INTO public.expense_categories VALUES (11, 'Bills', 'FIXED', '2026-04-28 20:47:29.951239', 3);
INSERT INTO public.expense_categories VALUES (12, 'Shopping', 'VARIABLE', '2026-04-28 20:47:29.952748', 3);
INSERT INTO public.expense_categories VALUES (13, 'Health', 'VARIABLE', '2026-04-28 20:47:29.954265', 3);
INSERT INTO public.expense_categories VALUES (14, 'Education', 'FIXED', '2026-04-28 20:47:29.956273', 3);
INSERT INTO public.expense_categories VALUES (15, 'Entertainment', 'VARIABLE', '2026-04-28 20:47:29.958283', 3);
INSERT INTO public.expense_categories VALUES (16, 'Savings', 'FIXED', '2026-04-28 20:47:29.960275', 3);
INSERT INTO public.expense_categories VALUES (17, 'Food', 'VARIABLE', '2026-06-18 10:28:20.255646', 33);
INSERT INTO public.expense_categories VALUES (18, 'Transport', 'VARIABLE', '2026-06-18 10:28:20.264252', 33);
INSERT INTO public.expense_categories VALUES (19, 'Bills', 'FIXED', '2026-06-18 10:28:20.266259', 33);
INSERT INTO public.expense_categories VALUES (20, 'Shopping', 'VARIABLE', '2026-06-18 10:28:20.269594', 33);
INSERT INTO public.expense_categories VALUES (21, 'Health', 'VARIABLE', '2026-06-18 10:28:20.271836', 33);
INSERT INTO public.expense_categories VALUES (22, 'Education', 'FIXED', '2026-06-18 10:28:20.276168', 33);
INSERT INTO public.expense_categories VALUES (23, 'Entertainment', 'VARIABLE', '2026-06-18 10:28:20.276168', 33);
INSERT INTO public.expense_categories VALUES (24, 'Savings', 'FIXED', '2026-06-18 10:28:20.279184', 33);


--
-- TOC entry 5388 (class 0 OID 25150)
-- Dependencies: 270
-- Data for Name: budget_limits; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5392 (class 0 OID 25175)
-- Dependencies: 274
-- Data for Name: expense_records; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5394 (class 0 OID 25188)
-- Dependencies: 276
-- Data for Name: income_records; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5400 (class 0 OID 25231)
-- Dependencies: 282
-- Data for Name: loansense_evaluations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.loansense_evaluations VALUES (1, 8250.00, '2026-06-17 20:24:44.276655', 150000.00, 3750.00, 75000.00, 0.3542, 0.00, 72000.00, 0, 180000.00, 'PARTIALLY_ELIGIBLE', 'Some products need more conservative limits because of income, repayment history, or credit risk conditions.', 'LOW', 1.00, 63750.00, 60000.00, '2026-06-17 20:24:44.276655', 5, 75, 34);


--
-- TOC entry 5396 (class 0 OID 25200)
-- Dependencies: 278
-- Data for Name: loan_eligibility_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.loan_eligibility_results VALUES (1, NULL, '2026-06-17 20:24:44.306438', 35, 'Current affordability, age, and policy checks all pass for this product.', 'ELIGIBLE', 8250.00, 17.00, 'PERSONAL', 423076.92, 60, 1);
INSERT INTO public.loan_eligibility_results VALUES (2, NULL, '2026-06-17 20:24:44.317013', 35, 'Vehicle value was not provided; EMI-based recommendation is used.', 'PARTIALLY_ELIGIBLE', 8250.00, 15.00, 'VEHICLE', 602608.70, 84, 1);
INSERT INTO public.loan_eligibility_results VALUES (3, NULL, '2026-06-17 20:24:44.319017', 35, 'Monthly income is below the preferred threshold for this product.', 'PARTIALLY_ELIGIBLE', 8250.00, 12.00, 'EDUCATION', 883928.57, 120, 1);
INSERT INTO public.loan_eligibility_results VALUES (4, NULL, '2026-06-17 20:24:44.320543', 35, 'Monthly income is below the preferred threshold for this product.', 'PARTIALLY_ELIGIBLE', 8250.00, 10.00, 'HOUSING', 1800000.00, 240, 1);


--
-- TOC entry 5398 (class 0 OID 25215)
-- Dependencies: 280
-- Data for Name: loan_policies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.loan_policies VALUES (1, 17.00, '2026-05-02 10:17:48.428603', 'PERSONAL', 60, 0.4000, NULL, 60, 21, 50000.00, 'ACTIVE', '2026-05-02 10:17:48.428603');
INSERT INTO public.loan_policies VALUES (2, 15.00, '2026-05-02 10:17:48.462164', 'VEHICLE', 65, 0.4000, 80.00, 84, 21, 75000.00, 'ACTIVE', '2026-05-02 10:17:48.462164');
INSERT INTO public.loan_policies VALUES (3, 12.00, '2026-05-02 10:17:48.464565', 'EDUCATION', 55, 0.4000, NULL, 120, 18, 200000.00, 'ACTIVE', '2026-05-02 10:17:48.464565');
INSERT INTO public.loan_policies VALUES (4, 10.00, '2026-05-02 10:17:48.466576', 'HOUSING', 60, 0.4000, 90.00, 240, 21, 250000.00, 'ACTIVE', '2026-05-02 10:17:48.466576');


--
-- TOC entry 5350 (class 0 OID 24670)
-- Dependencies: 232
-- Data for Name: public_customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customers VALUES (1, '2026-04-19 19:26:43.337283', 'PC-00001', '2026-04-19 19:26:43.337283', 3);
INSERT INTO public.public_customers VALUES (2, '2026-04-19 19:49:34.443687', 'PC-00005', '2026-04-19 19:49:34.443687', 5);
INSERT INTO public.public_customers VALUES (3, '2026-04-21 20:12:21.944612', 'PC-CALC-00006', '2026-04-21 20:12:21.944612', 11);
INSERT INTO public.public_customers VALUES (5, '2026-04-21 20:12:21.944612', 'PC-CALC-00005', '2026-04-21 20:12:21.944612', 10);
INSERT INTO public.public_customers VALUES (6, '2026-04-21 20:12:21.944612', 'PC-CALC-00010', '2026-04-21 20:12:21.944612', 15);
INSERT INTO public.public_customers VALUES (8, '2026-04-21 20:12:21.944612', 'PC-CALC-00003', '2026-04-21 20:12:21.944612', 8);
INSERT INTO public.public_customers VALUES (9, '2026-04-21 20:12:21.944612', 'PC-CALC-00001', '2026-04-21 20:12:21.944612', 6);
INSERT INTO public.public_customers VALUES (11, '2026-04-21 20:12:21.944612', 'PC-CALC-00004', '2026-04-21 20:12:21.944612', 9);
INSERT INTO public.public_customers VALUES (12, '2026-04-21 20:12:21.944612', 'PC-CALC-00002', '2026-04-21 20:12:21.944612', 7);
INSERT INTO public.public_customers VALUES (14, '2026-04-25 11:51:34.848713', 'PC-00017', '2026-04-25 11:51:34.848713', 17);
INSERT INTO public.public_customers VALUES (15, '2026-04-27 20:44:00.612264', 'PC-00019', '2026-04-27 20:44:00.612264', 19);
INSERT INTO public.public_customers VALUES (16, '2026-05-04 13:22:35.752119', 'PC-MENTOR-12M-001', '2026-05-04 13:22:35.752119', 34);


--
-- TOC entry 5360 (class 0 OID 24810)
-- Dependencies: 242
-- Data for Name: public_customer_financial_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customer_financial_records VALUES (1, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 3);
INSERT INTO public.public_customer_financial_records VALUES (3, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 5);
INSERT INTO public.public_customer_financial_records VALUES (4, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 6);
INSERT INTO public.public_customer_financial_records VALUES (6, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 8);
INSERT INTO public.public_customer_financial_records VALUES (7, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 9);
INSERT INTO public.public_customer_financial_records VALUES (9, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 11);
INSERT INTO public.public_customer_financial_records VALUES (10, '2026-04-21 20:12:21.944612', 'CURRENT', '2026-04-21 20:12:21.944612', 12);
INSERT INTO public.public_customer_financial_records VALUES (33, '2026-05-01 10:00:00', 'CURRENT', '2026-06-17 09:08:33.163072', 16);
INSERT INTO public.public_customer_financial_records VALUES (12, '2026-04-25 11:53:29.466457', 'CURRENT', '2026-04-25 11:54:22.948388', 14);
INSERT INTO public.public_customer_financial_records VALUES (11, '2026-04-22 10:11:59.697076', 'CURRENT', '2026-06-17 20:15:15.960441', 1);
INSERT INTO public.public_customer_financial_records VALUES (18, '2025-11-15 10:00:00', 'ARCHIVED', '2025-11-15 10:05:00', 1);
INSERT INTO public.public_customer_financial_records VALUES (19, '2025-12-15 10:00:00', 'ARCHIVED', '2025-12-15 10:05:00', 1);
INSERT INTO public.public_customer_financial_records VALUES (20, '2026-01-15 10:00:00', 'ARCHIVED', '2026-01-15 10:05:00', 1);
INSERT INTO public.public_customer_financial_records VALUES (21, '2026-02-15 10:00:00', 'ARCHIVED', '2026-02-15 10:05:00', 1);
INSERT INTO public.public_customer_financial_records VALUES (22, '2026-03-15 10:00:00', 'ARCHIVED', '2026-03-15 10:05:00', 1);
INSERT INTO public.public_customer_financial_records VALUES (23, '2026-04-27 20:44:46.665815', 'CURRENT', '2026-04-27 20:46:21.942886', 15);
INSERT INTO public.public_customer_financial_records VALUES (24, '2025-07-01 10:00:00', 'ARCHIVED', '2025-07-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (25, '2026-02-01 10:00:00', 'ARCHIVED', '2026-02-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (26, '2025-09-01 10:00:00', 'ARCHIVED', '2025-09-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (27, '2025-11-01 10:00:00', 'ARCHIVED', '2025-11-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (28, '2026-01-01 10:00:00', 'ARCHIVED', '2026-01-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (29, '2025-12-01 10:00:00', 'ARCHIVED', '2025-12-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (30, '2025-08-01 10:00:00', 'ARCHIVED', '2025-08-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (31, '2026-04-01 10:00:00', 'ARCHIVED', '2026-04-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (32, '2025-06-01 10:00:00', 'ARCHIVED', '2025-06-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (34, '2025-10-01 10:00:00', 'ARCHIVED', '2025-10-01 10:00:00', 16);
INSERT INTO public.public_customer_financial_records VALUES (35, '2026-03-01 10:00:00', 'ARCHIVED', '2026-03-01 10:00:00', 16);


--
-- TOC entry 5358 (class 0 OID 24799)
-- Dependencies: 240
-- Data for Name: public_customer_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customer_cards VALUES (1, '2026-04-21 20:12:21.944612', 25000.00, 20000.00, 'Amex', 1);
INSERT INTO public.public_customer_cards VALUES (2, '2026-04-21 20:12:21.944612', 100000.00, 30000.00, 'Commercial', 10);
INSERT INTO public.public_customer_cards VALUES (4, '2026-04-21 20:12:21.944612', 90000.00, 65000.00, 'HSBC', 3);
INSERT INTO public.public_customer_cards VALUES (6, '2026-04-21 20:12:21.944612', 50000.00, 35000.00, 'Seylan', 4);
INSERT INTO public.public_customer_cards VALUES (8, '2026-04-21 20:12:21.944612', 120000.00, 15000.00, 'HNB', 7);
INSERT INTO public.public_customer_cards VALUES (9, '2026-04-21 20:12:21.944612', 80000.00, 70000.00, 'Sampath', 1);
INSERT INTO public.public_customer_cards VALUES (10, '2026-04-21 20:12:21.944612', 80000.00, 20000.00, 'NDB', 9);
INSERT INTO public.public_customer_cards VALUES (11, '2026-04-21 20:12:21.944612', 30000.00, 20000.00, 'Amex', 6);
INSERT INTO public.public_customer_cards VALUES (13, '2026-04-21 20:12:21.944612', 100000.00, 45000.00, 'Sampath', 6);
INSERT INTO public.public_customer_cards VALUES (15, '2026-04-25 11:54:04.585312', 50000.00, 20000.00, 'Standard Card', 12);
INSERT INTO public.public_customer_cards VALUES (17, '2025-11-15 13:00:00', 70000.00, 60000.00, 'HNB', 18);
INSERT INTO public.public_customer_cards VALUES (18, '2025-11-15 13:00:00', 30000.00, 20000.00, 'Sampath', 18);
INSERT INTO public.public_customer_cards VALUES (19, '2025-12-15 13:00:00', 100000.00, 75000.00, 'Commercial', 19);
INSERT INTO public.public_customer_cards VALUES (20, '2026-01-15 13:00:00', 60000.00, 30000.00, 'BOC', 20);
INSERT INTO public.public_customer_cards VALUES (21, '2026-01-15 13:00:00', 40000.00, 20000.00, 'NDB', 20);
INSERT INTO public.public_customer_cards VALUES (22, '2026-02-15 13:00:00', 80000.00, 20000.00, 'HSBC', 21);
INSERT INTO public.public_customer_cards VALUES (23, '2026-03-15 13:00:00', 100000.00, 80000.00, 'Amana', 22);
INSERT INTO public.public_customer_cards VALUES (24, '2026-04-27 20:46:09.885604', 12000.00, 20000.00, 'Standard Card', 23);
INSERT INTO public.public_customer_cards VALUES (49, '2025-06-01 10:15:00', 150000.00, 97500.00, 'HNB', 32);
INSERT INTO public.public_customer_cards VALUES (50, '2025-07-01 10:15:00', 150000.00, 120000.00, 'HNB', 24);
INSERT INTO public.public_customer_cards VALUES (51, '2025-08-01 10:15:00', 150000.00, 90000.00, 'HNB', 30);
INSERT INTO public.public_customer_cards VALUES (52, '2025-09-01 10:15:00', 150000.00, 90000.00, 'HNB', 26);
INSERT INTO public.public_customer_cards VALUES (53, '2025-10-01 10:15:00', 150000.00, 90000.00, 'HNB', 34);
INSERT INTO public.public_customer_cards VALUES (54, '2025-11-01 10:15:00', 150000.00, 90000.00, 'HNB', 27);
INSERT INTO public.public_customer_cards VALUES (55, '2025-12-01 10:15:00', 150000.00, 75000.00, 'HNB', 29);
INSERT INTO public.public_customer_cards VALUES (56, '2026-01-01 10:15:00', 150000.00, 45000.00, 'HNB', 28);
INSERT INTO public.public_customer_cards VALUES (57, '2026-02-01 10:15:00', 150000.00, 75000.00, 'HNB', 25);
INSERT INTO public.public_customer_cards VALUES (58, '2026-03-01 10:15:00', 150000.00, 75000.00, 'HNB', 35);
INSERT INTO public.public_customer_cards VALUES (59, '2026-04-01 10:15:00', 150000.00, 45000.00, 'HNB', 31);
INSERT INTO public.public_customer_cards VALUES (65, '2026-05-26 21:31:17.773107', 150000.00, 75000.00, 'HNB', 33);
INSERT INTO public.public_customer_cards VALUES (71, '2026-06-17 20:14:56.479576', 100000.00, 60000.00, 'Standard Card', 11);


--
-- TOC entry 5408 (class 0 OID 25359)
-- Dependencies: 290
-- Data for Name: public_customer_incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customer_incomes VALUES (1, 90000.00, '2026-04-21 21:05:21.625889', 4, 'CONTRACT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 1);
INSERT INTO public.public_customer_incomes VALUES (2, 160000.00, '2026-04-21 21:05:21.625889', NULL, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 7);
INSERT INTO public.public_customer_incomes VALUES (3, 50000.00, '2026-04-21 21:05:21.625889', NULL, NULL, 'BUSINESS', 'STABLE', NULL, 10);
INSERT INTO public.public_customer_incomes VALUES (4, 120000.00, '2026-04-21 21:05:21.625889', NULL, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 3);
INSERT INTO public.public_customer_incomes VALUES (6, 95000.00, '2026-04-21 21:05:21.625889', NULL, NULL, 'BUSINESS', 'MEDIUM_FLUCTUATION', NULL, 4);
INSERT INTO public.public_customer_incomes VALUES (7, 140000.00, '2026-04-21 21:05:21.625889', NULL, NULL, 'BUSINESS', 'MEDIUM_FLUCTUATION', NULL, 9);
INSERT INTO public.public_customer_incomes VALUES (8, 100000.00, '2026-04-21 21:05:21.625889', NULL, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 10);
INSERT INTO public.public_customer_incomes VALUES (10, 100000.00, '2026-04-21 21:05:21.625889', 10, 'CONTRACT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 6);
INSERT INTO public.public_customer_incomes VALUES (13, 200000.00, '2026-04-25 11:53:29.480611', NULL, NULL, 'BUSINESS', 'STABLE', NULL, 12);
INSERT INTO public.public_customer_incomes VALUES (16, 100000.00, '2025-11-15 11:00:00', 24, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 18);
INSERT INTO public.public_customer_incomes VALUES (17, 100000.00, '2025-12-15 11:00:00', 12, 'CONTRACT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 19);
INSERT INTO public.public_customer_incomes VALUES (18, 120000.00, '2026-01-15 11:00:00', NULL, NULL, 'BUSINESS', 'MEDIUM_FLUCTUATION', NULL, 20);
INSERT INTO public.public_customer_incomes VALUES (19, 110000.00, '2026-02-15 11:00:00', 24, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 21);
INSERT INTO public.public_customer_incomes VALUES (20, 100000.00, '2026-03-15 11:00:00', 24, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 22);
INSERT INTO public.public_customer_incomes VALUES (21, 200000.00, '2026-04-27 20:44:46.670389', NULL, 'PERMANENT', 'SALARY', NULL, 'FIXED', 23);
INSERT INTO public.public_customer_incomes VALUES (46, 180000.00, '2025-06-01 10:05:00', NULL, 'FREELANCE', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 32);
INSERT INTO public.public_customer_incomes VALUES (47, 180000.00, '2025-07-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 24);
INSERT INTO public.public_customer_incomes VALUES (48, 180000.00, '2025-08-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 30);
INSERT INTO public.public_customer_incomes VALUES (49, 180000.00, '2025-09-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 26);
INSERT INTO public.public_customer_incomes VALUES (50, 180000.00, '2025-10-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 34);
INSERT INTO public.public_customer_incomes VALUES (51, 180000.00, '2025-11-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 27);
INSERT INTO public.public_customer_incomes VALUES (52, 180000.00, '2025-12-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 29);
INSERT INTO public.public_customer_incomes VALUES (53, 180000.00, '2026-01-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 28);
INSERT INTO public.public_customer_incomes VALUES (54, 180000.00, '2026-02-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 25);
INSERT INTO public.public_customer_incomes VALUES (55, 180000.00, '2026-03-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 35);
INSERT INTO public.public_customer_incomes VALUES (56, 180000.00, '2026-04-01 10:05:00', 12, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 31);
INSERT INTO public.public_customer_incomes VALUES (62, 180000.00, '2026-05-26 21:31:16.524172', NULL, 'PERMANENT', 'SALARY', NULL, 'FIXED_BASIC_SALARY', 33);
INSERT INTO public.public_customer_incomes VALUES (64, 100000.00, '2026-06-17 20:12:55.264321', NULL, 'PERMANENT', 'SALARY', NULL, 'FIXED', 11);


--
-- TOC entry 5362 (class 0 OID 24832)
-- Dependencies: 244
-- Data for Name: public_customer_liabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customer_liabilities VALUES (1, '2026-04-21 20:12:21.944612', 'Other Liabilities', 6000.00, 4);
INSERT INTO public.public_customer_liabilities VALUES (2, '2026-04-21 20:12:21.944612', 'Lease Rental', 8000.00, 6);
INSERT INTO public.public_customer_liabilities VALUES (3, '2026-04-21 20:12:21.944612', 'Lease Rental', 12000.00, 1);
INSERT INTO public.public_customer_liabilities VALUES (4, '2026-04-21 20:12:21.944612', 'Family Support', 6000.00, 9);
INSERT INTO public.public_customer_liabilities VALUES (5, '2026-04-21 20:12:21.944612', 'Other Liabilities', 10000.00, 3);
INSERT INTO public.public_customer_liabilities VALUES (9, '2026-04-25 11:54:22.935464', 'Rent', 2000.00, 12);
INSERT INTO public.public_customer_liabilities VALUES (11, '2025-11-15 14:00:00', 'Household Expenses', 10000.00, 18);
INSERT INTO public.public_customer_liabilities VALUES (12, '2025-12-15 14:00:00', 'Rent', 5000.00, 19);
INSERT INTO public.public_customer_liabilities VALUES (13, '2026-01-15 14:00:00', 'Family Support', 10000.00, 20);
INSERT INTO public.public_customer_liabilities VALUES (14, '2026-02-15 14:00:00', 'Rent', 8000.00, 21);
INSERT INTO public.public_customer_liabilities VALUES (15, '2026-03-15 14:00:00', 'Utilities', 4000.00, 22);
INSERT INTO public.public_customer_liabilities VALUES (16, '2026-04-27 20:46:21.935228', 'Rent', 1000.00, 23);
INSERT INTO public.public_customer_liabilities VALUES (38, '2025-06-01 10:20:00', 'Trend demo liability 1', 10000.00, 32);
INSERT INTO public.public_customer_liabilities VALUES (39, '2025-06-01 10:20:00', 'Trend demo liability 2', 10000.00, 32);
INSERT INTO public.public_customer_liabilities VALUES (40, '2025-06-01 10:20:00', 'Trend demo liability 3', 10000.00, 32);
INSERT INTO public.public_customer_liabilities VALUES (41, '2025-07-01 10:20:00', 'Trend demo liability 1', 12000.00, 24);
INSERT INTO public.public_customer_liabilities VALUES (42, '2025-08-01 10:20:00', 'Trend demo liability 1', 8000.00, 30);
INSERT INTO public.public_customer_liabilities VALUES (43, '2025-10-01 10:20:00', 'Trend demo liability 1', 8000.00, 34);
INSERT INTO public.public_customer_liabilities VALUES (44, '2025-12-01 10:20:00', 'Trend demo liability 1', 10000.00, 29);
INSERT INTO public.public_customer_liabilities VALUES (45, '2026-01-01 10:20:00', 'Trend demo liability 1', 9000.00, 28);
INSERT INTO public.public_customer_liabilities VALUES (46, '2026-03-01 10:20:00', 'Trend demo liability 1', 8000.00, 35);
INSERT INTO public.public_customer_liabilities VALUES (47, '2026-04-01 10:20:00', 'Trend demo liability 1', 7000.00, 31);
INSERT INTO public.public_customer_liabilities VALUES (62, '2026-06-17 20:15:01.086275', 'Rent', 10000.00, 11);


--
-- TOC entry 5364 (class 0 OID 24843)
-- Dependencies: 246
-- Data for Name: public_customer_loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customer_loans VALUES (2, '2026-04-21 20:12:21.944612', 'PERSONAL_LOAN', 7000.00, 120000.00, 4);
INSERT INTO public.public_customer_loans VALUES (3, '2026-04-21 20:12:21.944612', 'VEHICLE_LOAN', 20000.00, 350000.00, 10);
INSERT INTO public.public_customer_loans VALUES (4, '2026-04-21 20:12:21.944612', 'HOME_LOAN', 28000.00, 550000.00, 9);
INSERT INTO public.public_customer_loans VALUES (5, '2026-04-21 20:12:21.944612', 'PERSONAL_LOAN', 25000.00, 600000.00, 6);
INSERT INTO public.public_customer_loans VALUES (6, '2026-04-21 20:12:21.944612', 'PERSONAL_LOAN', 9000.00, 140000.00, 9);
INSERT INTO public.public_customer_loans VALUES (7, '2026-04-21 20:12:21.944612', 'VEHICLE_LOAN', 30000.00, 500000.00, 3);
INSERT INTO public.public_customer_loans VALUES (9, '2026-04-21 20:12:21.944612', 'HOME_LOAN', 30000.00, 700000.00, 1);
INSERT INTO public.public_customer_loans VALUES (11, '2026-04-21 20:12:21.944612', 'PERSONAL_LOAN', 18000.00, 400000.00, 7);
INSERT INTO public.public_customer_loans VALUES (12, '2026-04-21 20:12:21.944612', 'HOME_LOAN', 25000.00, 390000.00, 4);
INSERT INTO public.public_customer_loans VALUES (14, '2026-04-21 20:12:21.944612', 'PERSONAL_LOAN', 15000.00, 250000.00, 1);
INSERT INTO public.public_customer_loans VALUES (16, '2026-04-25 11:53:43.644946', 'Vehicle Loan', 20000.00, 18000.00, 12);
INSERT INTO public.public_customer_loans VALUES (19, '2025-11-15 12:00:00', 'HOME_LOAN', 30000.00, 900000.00, 18);
INSERT INTO public.public_customer_loans VALUES (20, '2025-11-15 12:00:00', 'PERSONAL_LOAN', 10000.00, 250000.00, 18);
INSERT INTO public.public_customer_loans VALUES (21, '2025-11-15 12:00:00', 'VEHICLE_LOAN', 8000.00, 180000.00, 18);
INSERT INTO public.public_customer_loans VALUES (22, '2025-12-15 12:00:00', 'PERSONAL_LOAN', 25000.00, 500000.00, 19);
INSERT INTO public.public_customer_loans VALUES (23, '2026-01-15 12:00:00', 'HOME_LOAN', 18000.00, 650000.00, 20);
INSERT INTO public.public_customer_loans VALUES (24, '2026-01-15 12:00:00', 'PERSONAL_LOAN', 10000.00, 220000.00, 20);
INSERT INTO public.public_customer_loans VALUES (25, '2026-02-15 12:00:00', 'VEHICLE_LOAN', 25000.00, 480000.00, 21);
INSERT INTO public.public_customer_loans VALUES (26, '2026-03-15 12:00:00', 'PERSONAL_LOAN', 28000.00, 430000.00, 22);
INSERT INTO public.public_customer_loans VALUES (27, '2026-04-27 20:44:55.46662', 'Personal Loan', 1231231.00, 342341.00, 23);
INSERT INTO public.public_customer_loans VALUES (52, '2025-06-01 10:10:00', 'PERSONAL_LOAN', 85000.00, 1700000.00, 32);
INSERT INTO public.public_customer_loans VALUES (53, '2025-07-01 10:10:00', 'PERSONAL_LOAN', 80000.00, 1580000.00, 24);
INSERT INTO public.public_customer_loans VALUES (54, '2025-08-01 10:10:00', 'PERSONAL_LOAN', 84000.00, 1460000.00, 30);
INSERT INTO public.public_customer_loans VALUES (55, '2025-09-01 10:10:00', 'PERSONAL_LOAN', 88000.00, 1340000.00, 26);
INSERT INTO public.public_customer_loans VALUES (56, '2025-10-01 10:10:00', 'PERSONAL_LOAN', 80000.00, 1220000.00, 34);
INSERT INTO public.public_customer_loans VALUES (57, '2025-11-01 10:10:00', 'PERSONAL_LOAN', 90000.00, 1100000.00, 27);
INSERT INTO public.public_customer_loans VALUES (58, '2025-12-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 980000.00, 29);
INSERT INTO public.public_customer_loans VALUES (59, '2026-01-01 10:10:00', 'PERSONAL_LOAN', 62000.00, 880000.00, 28);
INSERT INTO public.public_customer_loans VALUES (60, '2026-02-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 790000.00, 25);
INSERT INTO public.public_customer_loans VALUES (61, '2026-03-01 10:10:00', 'PERSONAL_LOAN', 52000.00, 720000.00, 35);
INSERT INTO public.public_customer_loans VALUES (62, '2026-04-01 10:10:00', 'PERSONAL_LOAN', 60000.00, 670000.00, 31);
INSERT INTO public.public_customer_loans VALUES (68, '2026-05-26 21:31:17.231115', 'PERSONAL_LOAN', 60000.00, 620000.00, 33);
INSERT INTO public.public_customer_loans VALUES (73, '2026-06-17 20:15:15.956419', 'Vehicle Loan', 25000.00, 680000.00, 11);


--
-- TOC entry 5366 (class 0 OID 24855)
-- Dependencies: 248
-- Data for Name: public_customer_missed_payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.public_customer_missed_payments VALUES (1, '2026-04-21 20:12:21.944612', 0, 7);
INSERT INTO public.public_customer_missed_payments VALUES (2, '2026-04-21 20:12:21.944612', 0, 10);
INSERT INTO public.public_customer_missed_payments VALUES (3, '2026-04-21 20:12:21.944612', 1, 6);
INSERT INTO public.public_customer_missed_payments VALUES (4, '2026-04-21 20:12:21.944612', 2, 9);
INSERT INTO public.public_customer_missed_payments VALUES (5, '2026-04-21 20:12:21.944612', 1, 3);
INSERT INTO public.public_customer_missed_payments VALUES (6, '2026-04-21 20:12:21.944612', 4, 1);
INSERT INTO public.public_customer_missed_payments VALUES (10, '2026-04-21 20:12:21.944612', 1, 4);
INSERT INTO public.public_customer_missed_payments VALUES (12, '2026-04-25 11:54:22.944832', 1, 12);
INSERT INTO public.public_customer_missed_payments VALUES (11, '2026-04-22 10:12:18.400915', 1, 11);
INSERT INTO public.public_customer_missed_payments VALUES (13, '2025-11-15 15:00:00', 4, 18);
INSERT INTO public.public_customer_missed_payments VALUES (14, '2025-12-15 15:00:00', 4, 19);
INSERT INTO public.public_customer_missed_payments VALUES (15, '2026-01-15 15:00:00', 2, 20);
INSERT INTO public.public_customer_missed_payments VALUES (16, '2026-02-15 15:00:00', 4, 21);
INSERT INTO public.public_customer_missed_payments VALUES (17, '2026-03-15 15:00:00', 1, 22);
INSERT INTO public.public_customer_missed_payments VALUES (18, '2026-04-27 20:46:21.940872', 1, 23);
INSERT INTO public.public_customer_missed_payments VALUES (55, '2025-06-01 10:25:00', 5, 32);
INSERT INTO public.public_customer_missed_payments VALUES (56, '2025-07-01 10:25:00', 5, 24);
INSERT INTO public.public_customer_missed_payments VALUES (57, '2025-08-01 10:25:00', 5, 30);
INSERT INTO public.public_customer_missed_payments VALUES (58, '2025-09-01 10:25:00', 5, 26);
INSERT INTO public.public_customer_missed_payments VALUES (59, '2025-10-01 10:25:00', 2, 34);
INSERT INTO public.public_customer_missed_payments VALUES (60, '2025-11-01 10:25:00', 2, 27);
INSERT INTO public.public_customer_missed_payments VALUES (61, '2025-12-01 10:25:00', 2, 29);
INSERT INTO public.public_customer_missed_payments VALUES (62, '2026-01-01 10:25:00', 2, 28);
INSERT INTO public.public_customer_missed_payments VALUES (63, '2026-02-01 10:25:00', 1, 25);
INSERT INTO public.public_customer_missed_payments VALUES (64, '2026-03-01 10:25:00', 0, 35);
INSERT INTO public.public_customer_missed_payments VALUES (65, '2026-04-01 10:25:00', 1, 31);
INSERT INTO public.public_customer_missed_payments VALUES (66, '2026-05-01 10:25:00', 0, 33);


--
-- TOC entry 5352 (class 0 OID 24681)
-- Dependencies: 234
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.refresh_tokens VALUES (1, '2026-04-19 19:41:47.625645', '2026-05-03 19:41:47.600117', NULL, NULL, false, 'd5fe10f53c11a7a6511c2afd63c4ddd3b476903249849b82d8641780e4546b12', 2);
INSERT INTO public.refresh_tokens VALUES (2, '2026-04-19 20:07:45.203485', '2026-05-03 20:07:45.190934', NULL, NULL, false, '2930c53eed2db9f75ecd0f7621224cf9bccb3b5e7e5b4a748375b2f9bfb45b6d', 2);
INSERT INTO public.refresh_tokens VALUES (3, '2026-04-19 21:15:31.182292', '2026-05-03 21:15:31.18129', NULL, NULL, false, '38a7f7914b04b275b68743da101399cbce96d6d73a2654d66b078effdc1fa387', 3);
INSERT INTO public.refresh_tokens VALUES (4, '2026-04-20 11:52:41.930705', '2026-05-04 11:52:41.922542', NULL, NULL, false, 'abb08280d2cd2bb9879fe23f32b2ccc977cc329f43ad8e85f2a51c7a5b070daf', 3);
INSERT INTO public.refresh_tokens VALUES (5, '2026-04-21 12:11:04.926251', '2026-05-05 12:11:04.908348', NULL, NULL, false, '1c16ee3ca5fff1ccfe75c043fc2fbc43979599399ed0615f487d133a63cfd9cd', 3);
INSERT INTO public.refresh_tokens VALUES (6, '2026-04-21 12:45:41.155703', '2026-05-05 12:45:41.139116', NULL, NULL, false, 'b22b3a0694e528ea7e39416b1da74c7ad2fe8f17890f4d4c749e9f3d56b8f8b6', 2);
INSERT INTO public.refresh_tokens VALUES (7, '2026-04-21 20:28:53.246781', '2026-05-05 20:28:53.243246', NULL, NULL, false, '0987e86f0280b6438554ae69017090abb2e6501dc1ef9a40ea0fed2823c73a35', 11);
INSERT INTO public.refresh_tokens VALUES (8, '2026-04-22 10:11:06.463273', '2026-05-06 10:11:06.444335', NULL, NULL, false, '16e1987eed52c1d5315a91d106d6bd7dd9c9e4e12ed47f1840bff0d39162896f', 3);
INSERT INTO public.refresh_tokens VALUES (9, '2026-04-22 11:15:06.739343', '2026-05-06 11:15:06.73037', NULL, NULL, false, '6db00c8810f9e9768f8d4a00c6ce6650e3acb06763191f76a7dac9de14aa6713', 2);
INSERT INTO public.refresh_tokens VALUES (10, '2026-04-22 11:49:52.08924', '2026-05-06 11:49:52.08143', NULL, NULL, false, '224c59cb61768054d9bf35bfce79819905ba52a30ec2057c05ff4feba9421241', 3);
INSERT INTO public.refresh_tokens VALUES (11, '2026-04-22 11:57:16.529887', '2026-05-06 11:57:16.528886', NULL, NULL, false, '8088f5ea77b2e50a7fc2305ff354392e3c4d1a7dc403c5130478e65dec82c14b', 3);
INSERT INTO public.refresh_tokens VALUES (12, '2026-04-22 20:59:48.420854', '2026-05-06 20:59:48.410242', NULL, NULL, false, '6e5cfcca46c3387098998ce44d515a8c872f7a2c007df3a5d59bf0fcce005a54', 11);
INSERT INTO public.refresh_tokens VALUES (13, '2026-04-25 11:53:08.889043', '2026-05-09 11:53:08.888037', NULL, NULL, false, '5f52f704d6af4ff3331e877646fdf876f638f7d8408e7f180200145fe05ac8b5', 17);
INSERT INTO public.refresh_tokens VALUES (14, '2026-04-25 11:56:58.773903', '2026-05-09 11:56:58.773903', NULL, NULL, false, 'a79b9ed9297658713be843e35d05b193261f167f04bb3d146fbe6204e7e17b13', 1);
INSERT INTO public.refresh_tokens VALUES (15, '2026-04-25 12:00:44.963893', '2026-05-09 12:00:44.963893', NULL, NULL, false, '84d65996babb1e1a3a5d9b4e11c624cbee3e442a8b08bbc1d44abcefab59cee1', 1);
INSERT INTO public.refresh_tokens VALUES (16, '2026-04-25 12:11:58.575283', '2026-05-09 12:11:58.575283', NULL, NULL, false, 'a8506fc81ebd2759aabfcb52d8135918843e07e5a26a568382c8243179e5e7c7', 4);
INSERT INTO public.refresh_tokens VALUES (17, '2026-04-25 19:16:44.084445', '2026-05-09 19:16:44.074702', NULL, NULL, false, 'e2baf11142999afdae0ccac2f9ceeb93c8e11b30f69434393214f152422bc5f6', 2);
INSERT INTO public.refresh_tokens VALUES (18, '2026-04-25 19:18:26.627633', '2026-05-09 19:18:26.626631', NULL, NULL, false, 'eabe20b37247a139b5ecf82a185d8b08940c44323d45e055d27f9a6324bfddaa', 3);
INSERT INTO public.refresh_tokens VALUES (19, '2026-04-25 20:13:15.049247', '2026-05-09 20:13:15.041729', NULL, NULL, false, '6463cce12c42c83a44bf6535e4462558556a4666150d1d89ede55c92166ca4ba', 2);
INSERT INTO public.refresh_tokens VALUES (20, '2026-04-25 20:13:48.243553', '2026-05-09 20:13:48.242539', NULL, NULL, false, '91fb212c7d38137872526f4c3e22b97a97170d0f23473fa274fd17b4a9ee2582', 3);
INSERT INTO public.refresh_tokens VALUES (21, '2026-04-25 20:14:35.91106', '2026-05-09 20:14:35.91106', NULL, NULL, false, '4ba75d9f09c6ba08285a55df4f5b0e1c2011083ade5ef381403c064fa9c431ab', 2);
INSERT INTO public.refresh_tokens VALUES (22, '2026-04-25 20:23:27.646793', '2026-05-09 20:23:27.644808', NULL, NULL, false, '3821b59d595a4d64bd9bda4af705830e563cce88a2328ac870daf7a289f5e8c0', 4);
INSERT INTO public.refresh_tokens VALUES (23, '2026-04-26 10:05:42.007385', '2026-05-10 10:05:41.99834', NULL, NULL, false, '32b211f058132410c70d27731d1d44a25e8f2a4a240dc842b817ff18fc3a53e5', 4);
INSERT INTO public.refresh_tokens VALUES (24, '2026-04-26 10:17:04.20666', '2026-05-10 10:17:04.203648', NULL, NULL, false, '3f13e186bd0761c182139c3cc90d9e39e9a40ec767ac1c5767ee016bf1c33555', 4);
INSERT INTO public.refresh_tokens VALUES (25, '2026-04-26 10:44:33.007835', '2026-05-10 10:44:33.003811', NULL, NULL, false, 'a251212adbc1d011339f471c4874385c08e0fb8ba92eb4a46cb8c24f51913324', 2);
INSERT INTO public.refresh_tokens VALUES (26, '2026-04-26 10:45:40.538983', '2026-05-10 10:45:40.537959', NULL, NULL, false, '8e8e9f1c2bd0c3addddfee09e8f1893341986b4c9510f68c3954b2725728ceec', 3);
INSERT INTO public.refresh_tokens VALUES (27, '2026-04-27 19:30:33.448583', '2026-05-11 19:30:33.439365', NULL, NULL, false, '49cc1a431920c57d18e237628521e64eac5c8a98f25be789048e1fed1d58d9c0', 3);
INSERT INTO public.refresh_tokens VALUES (28, '2026-04-27 19:56:56.874782', '2026-05-11 19:56:56.865647', NULL, NULL, false, 'b6ee44a92adb1add728dd24c5ded3047939ae3c69ac4570427df29db8b4b0475', 3);
INSERT INTO public.refresh_tokens VALUES (29, '2026-04-27 20:08:15.433839', '2026-05-11 20:08:15.43035', NULL, NULL, false, '0c518e10508975d460496de96e4353fec96cdb376db7034c053549a29844e14b', 3);
INSERT INTO public.refresh_tokens VALUES (30, '2026-04-27 20:44:17.089873', '2026-05-11 20:44:17.089357', NULL, NULL, false, 'a745c5eb58b869ebede0977193af13e4419113a0836d8c96ea3b2ad7c09f0061', 19);
INSERT INTO public.refresh_tokens VALUES (31, '2026-04-27 20:44:37.264584', '2026-05-11 20:44:37.264584', NULL, NULL, false, '7fae3422c5de230b073edaf8d6d886bf77efb4947f24a7e29340c3b1aa690bc2', 19);
INSERT INTO public.refresh_tokens VALUES (32, '2026-04-28 19:06:22.01201', '2026-05-12 19:06:22.006862', NULL, NULL, false, 'a11d77bd5f405eb08464d1ec844c1bb5687e76e1f11f20419fbefd37247405c5', 4);
INSERT INTO public.refresh_tokens VALUES (33, '2026-04-28 19:06:52.869331', '2026-05-12 19:06:52.868325', NULL, NULL, false, 'c0d05f10af1d29542f54a391b308376d4ce00d850f9b13f0d1f180e6094cc691', 2);
INSERT INTO public.refresh_tokens VALUES (34, '2026-04-28 19:15:40.256352', '2026-05-12 19:15:40.256352', NULL, NULL, false, '017ccd9d16c041e129ee71957938e8d8aab16d36774ba185e632e29e6238c1ec', 3);
INSERT INTO public.refresh_tokens VALUES (35, '2026-04-28 19:34:41.3829', '2026-05-12 19:34:41.381911', NULL, NULL, false, '6ef27c09c6d35b7f922db91993408d3e7e6f2b4bdc8b8d35b72442b37e36bc2f', 2);
INSERT INTO public.refresh_tokens VALUES (36, '2026-04-28 20:47:20.516143', '2026-05-12 20:47:20.502585', NULL, NULL, false, 'f7c43f970766aba78c83251488a0bb8e695bdb00f761b8abff9d87494cd5b5b3', 3);
INSERT INTO public.refresh_tokens VALUES (37, '2026-04-28 21:00:39.164305', '2026-05-12 21:00:39.163799', NULL, NULL, false, '90043c7de3e22f1b00d90567b72d2f563bf3082ee11a8169ebf8443ee0c5c8f9', 1);
INSERT INTO public.refresh_tokens VALUES (38, '2026-04-28 21:07:45.715414', '2026-05-12 21:07:45.715414', NULL, NULL, false, 'e5d41e827659c3416c3d1d8c3d2ff9e3389ce6463f648a8fd200ff6ae9b36f32', 1);
INSERT INTO public.refresh_tokens VALUES (39, '2026-04-28 21:12:26.889237', '2026-05-12 21:12:26.889237', NULL, NULL, false, '1dbf4fa04b76ae0698dda8d8c7a4e4a1360307a47741acae17ea34e471d27fa0', 3);
INSERT INTO public.refresh_tokens VALUES (40, '2026-04-28 21:12:44.842815', '2026-05-12 21:12:44.842815', NULL, NULL, false, '95b9fe0ab39a70b681e43ca60b28389e0a83cc83aeb2dfe3984689792576d6b6', 3);
INSERT INTO public.refresh_tokens VALUES (41, '2026-04-28 21:13:04.021522', '2026-05-12 21:13:04.021522', NULL, NULL, false, '1d7675f535d6448bdc27c2f686c489542d511b07e9d9677a7961aa3900b1e887', 2);
INSERT INTO public.refresh_tokens VALUES (42, '2026-04-28 21:16:47.79256', '2026-05-12 21:16:47.79256', NULL, NULL, false, '3ba8b93592543542da43c16238028063d77418264920d375d107cb2af4fbb9e9', 1);
INSERT INTO public.refresh_tokens VALUES (43, '2026-04-29 19:25:26.186768', '2026-05-13 19:25:26.177412', NULL, NULL, false, '0f7a00e72018523fa78e2082f64fd5638853685afddb4d8c6c2c1123da58685a', 2);
INSERT INTO public.refresh_tokens VALUES (44, '2026-04-29 19:54:36.144182', '2026-05-13 19:54:36.141185', NULL, NULL, false, '77e11efee65f05fdb59dde8df3274acb17d72738bf951ad8b26891255f08f8a7', 3);
INSERT INTO public.refresh_tokens VALUES (45, '2026-04-29 19:56:46.829703', '2026-05-13 19:56:46.828703', NULL, NULL, false, 'bc8987c09aac5004ee3f29ff1f2409b2345c20d2c8c47ac2c11850b8c14e2bed', 2);
INSERT INTO public.refresh_tokens VALUES (46, '2026-04-29 20:01:28.821807', '2026-05-13 20:01:28.820807', NULL, NULL, false, 'e226ec7e865c8c4567bd2f3fbdc530b947a9bd4719125f38ea7b3208dd3d8f6a', 1);
INSERT INTO public.refresh_tokens VALUES (47, '2026-04-29 20:39:39.394192', '2026-05-13 20:39:39.393196', NULL, NULL, false, 'bc037c36c3364c52133f21c7667c4982adf5d1023b7e6738d07a9b8b44a2a304', 2);
INSERT INTO public.refresh_tokens VALUES (48, '2026-04-29 20:44:44.767716', '2026-05-13 20:44:44.766511', NULL, NULL, false, 'c25a57e725f3db34590d76a93f4f98c87b1da4155e0210e25b8bbf01a4163458', 3);
INSERT INTO public.refresh_tokens VALUES (49, '2026-04-29 21:00:12.88182', '2026-05-13 21:00:12.880821', NULL, NULL, false, '2d6ccb851d81078ca51329b1444b719c9cad30ea0e088028b54bfdfa50f57046', 3);
INSERT INTO public.refresh_tokens VALUES (50, '2026-04-29 21:00:29.35734', '2026-05-13 21:00:29.356334', NULL, NULL, false, 'd5cbde4053a68d28611a5b44bfefc19b2cb81c67a9f8fd4b86521a35e0e40806', 2);
INSERT INTO public.refresh_tokens VALUES (51, '2026-04-29 21:00:37.393664', '2026-05-13 21:00:37.392662', NULL, NULL, false, '97c2114f098ad7978b7293e6f5752ba71b6febededf02b1df25d3d888def288c', 4);
INSERT INTO public.refresh_tokens VALUES (52, '2026-04-29 21:21:58.673811', '2026-05-13 21:21:58.663971', NULL, NULL, false, 'd7a6744a84a42f5197e84fc394057ede15d51df3b39b78390b9c8c4aa8ffa704', 2);
INSERT INTO public.refresh_tokens VALUES (53, '2026-04-29 21:22:37.082857', '2026-05-13 21:22:37.081856', NULL, NULL, false, '572f48090281f9806f6219d06efd8351aea88c989f4d9b3837d3e2248be41262', 1);
INSERT INTO public.refresh_tokens VALUES (54, '2026-05-02 10:19:12.83526', '2026-05-16 10:19:12.83526', NULL, NULL, false, '28c9d17dc406225f8e0178e9557c4c6b3e6e6f89556a784acd46dbab7c751f9c', 2);
INSERT INTO public.refresh_tokens VALUES (55, '2026-05-02 10:19:26.69573', '2026-05-16 10:19:26.69573', NULL, NULL, false, '52af2e449a01e5b1b10d8df9966109ece83ad76c491b236ef3c14cec0fc3de41', 3);
INSERT INTO public.refresh_tokens VALUES (56, '2026-05-02 19:29:14.250734', '2026-05-16 19:29:14.238911', NULL, NULL, false, '0883ab20e64e784b53de3f0b41226580629ea8a2ebadc812b82296a34a7435f6', 3);
INSERT INTO public.refresh_tokens VALUES (57, '2026-05-02 20:17:25.831884', '2026-05-16 20:17:25.830358', NULL, NULL, false, 'b1f1a829d9b25f9357c356c1d5eb1d659898ee1ed76a9b557d6967624972e4bd', 4);
INSERT INTO public.refresh_tokens VALUES (58, '2026-05-02 20:31:28.845408', '2026-05-16 20:31:28.845408', NULL, NULL, false, '60ade15c30952f6241d49baff2519fa3a72cc92e490e60ec0a81f1e6a416177b', 3);
INSERT INTO public.refresh_tokens VALUES (59, '2026-05-02 20:32:38.934969', '2026-05-16 20:32:38.934969', NULL, NULL, false, '097cc9158d275432e3dfa1446ac7db4af69b022ddc0e50f135a005100fd6860f', 2);
INSERT INTO public.refresh_tokens VALUES (60, '2026-05-02 20:33:03.708168', '2026-05-16 20:33:03.708168', NULL, NULL, false, 'c11b8652a51c050f4bd33c686cb3faed0bed7775bcb472d9c35f95a6f50111d8', 3);
INSERT INTO public.refresh_tokens VALUES (61, '2026-05-02 20:33:48.387671', '2026-05-16 20:33:48.386663', NULL, NULL, false, '01d49d5cacb20c178b2e2dd4c583ed04cd8be7b771dbab6d1bae0c242b11c809', 2);
INSERT INTO public.refresh_tokens VALUES (62, '2026-05-02 21:34:27.7862', '2026-05-16 21:34:27.777672', NULL, NULL, false, '5f9da853c92ba35b36b40de8916239922bf63a10116b20edcb7e462a53ae2963', 3);
INSERT INTO public.refresh_tokens VALUES (63, '2026-05-02 21:42:29.356183', '2026-05-16 21:42:29.355183', NULL, NULL, false, 'fd982cdbff808b092daa3a8b5215bff08d351f0502323a4bfd5f3fe73ef4e24d', 4);
INSERT INTO public.refresh_tokens VALUES (64, '2026-05-02 21:50:23.710412', '2026-05-16 21:50:23.709402', NULL, NULL, false, '2e11c338d8570d4e1014d66664f560f81dd83733603a7ded2548ff5587443e2d', 3);
INSERT INTO public.refresh_tokens VALUES (65, '2026-05-03 10:07:20.059782', '2026-05-17 10:07:20.044666', NULL, NULL, false, '1e411d52cee6ce9fd56865b65360db891f3603f93dd1ae7e77c7215a31db9eeb', 3);
INSERT INTO public.refresh_tokens VALUES (66, '2026-05-04 13:25:41.546708', '2026-05-18 13:25:41.546708', NULL, NULL, false, '24c1a431355104dea81d335f7b5c9a547b1284791815839f9492de4d9f8281be', 34);
INSERT INTO public.refresh_tokens VALUES (67, '2026-05-04 13:28:19.439604', '2026-05-18 13:28:19.439604', NULL, NULL, false, 'ca95608a2a8d7ca99e11f16a1fb28d1192d4c4dcde7fc018e2add7cde02442e8', 33);
INSERT INTO public.refresh_tokens VALUES (68, '2026-05-04 13:35:28.750213', '2026-05-18 13:35:28.750213', NULL, NULL, false, '88effeb40fdbf781459ea04fc37e83838bee2651fbdf45f2434c424f2da3dfea', 34);
INSERT INTO public.refresh_tokens VALUES (69, '2026-05-04 13:41:56.463754', '2026-05-18 13:41:56.463754', NULL, NULL, false, 'd6818d373278dac04ac55edc6fcdbafe2d0e80d21d128abff4006e59a0776c0a', 33);
INSERT INTO public.refresh_tokens VALUES (70, '2026-05-04 13:42:26.280356', '2026-05-18 13:42:26.280356', NULL, NULL, false, '160b9480f2a3e524abc105daad5363c00b564d34ebd531aeaaf73e18e490632f', 2);
INSERT INTO public.refresh_tokens VALUES (71, '2026-05-04 13:43:37.047616', '2026-05-18 13:43:37.047616', NULL, NULL, false, '4b301e07baf71fa2f1cf6a82945ec665dd8aa6d59672adf6f567b6d7c76a7746', 28);
INSERT INTO public.refresh_tokens VALUES (72, '2026-05-04 13:55:28.516433', '2026-05-18 13:55:28.516433', NULL, NULL, false, '92a1cd2534ee92b5e71a740aea5863f21fa4f00ffb6fba40bb9669718d37f1ce', 34);
INSERT INTO public.refresh_tokens VALUES (73, '2026-05-04 13:55:48.613922', '2026-05-18 13:55:48.613922', NULL, NULL, false, '37c6486b654ae5fc2072d595316cd1a32b022c19627a668a94b2f47f59af6e55', 33);
INSERT INTO public.refresh_tokens VALUES (74, '2026-05-04 14:04:44.064147', '2026-05-18 14:04:44.064147', NULL, NULL, false, 'bc3eaaed6d692480347f6057171589ee0620a1c08298babd7b0b832c7140b4ca', 31);
INSERT INTO public.refresh_tokens VALUES (75, '2026-05-04 16:16:33.664956', '2026-05-18 16:16:33.664956', NULL, NULL, false, '780fa86b3a80428e0b30331708fb9d1516e8e05057b9e134133fd08a6b3a4990', 34);
INSERT INTO public.refresh_tokens VALUES (76, '2026-05-04 16:17:12.638085', '2026-05-18 16:17:12.637569', NULL, NULL, false, 'aa96e52e76421205662bf5a93c41239d205df25ac1661315e793b5d4c174d3bc', 34);
INSERT INTO public.refresh_tokens VALUES (77, '2026-05-04 16:18:01.218291', '2026-05-18 16:18:01.218291', NULL, NULL, false, '9e14e3f03711d6cd78fceef09c9f0b469c92736989b13f92e217baae9155afa7', 2);
INSERT INTO public.refresh_tokens VALUES (78, '2026-05-04 16:18:36.519462', '2026-05-18 16:18:36.519462', NULL, NULL, false, '49b38f4074c4c06b2ea49e08e18e65939c33d24f4a1e223daec293ab39c75807', 34);
INSERT INTO public.refresh_tokens VALUES (79, '2026-05-04 16:19:02.40922', '2026-05-18 16:19:02.40922', NULL, NULL, false, '31a05e7052632227f6ac2b77c19eb3cac6dcf245c3a0eb25c2d64d35929a620e', 33);
INSERT INTO public.refresh_tokens VALUES (80, '2026-05-04 16:19:09.388437', '2026-05-18 16:19:09.388437', NULL, NULL, false, 'f5ef4ee1708ff7b1e8e8efa90f573a4a3bb62ce5214b32b7f2afa904de050f2d', 34);
INSERT INTO public.refresh_tokens VALUES (81, '2026-05-04 16:19:22.949205', '2026-05-18 16:19:22.949205', NULL, NULL, false, 'c854c726d7d1d02c7183eb83fcb8dc63b9a77e228b36bd4e1027c5ebf495b38a', 34);
INSERT INTO public.refresh_tokens VALUES (82, '2026-05-04 16:53:36.949252', '2026-05-18 16:53:36.949252', NULL, NULL, false, '726e11a4e8f8385916dcf800f16a327d41c55267ad3b922dc82ecd1f7be94543', 34);
INSERT INTO public.refresh_tokens VALUES (83, '2026-05-04 17:40:33.62288', '2026-05-18 17:40:33.619882', NULL, NULL, false, '0df38c4a47093cfbe00bbc8179556df53484b5b45e6d0df62ea80d4f79f223ac', 3);
INSERT INTO public.refresh_tokens VALUES (84, '2026-05-04 17:43:56.164614', '2026-05-18 17:43:56.164614', NULL, NULL, false, 'b36c740234cb0aecd0b9e2cac8eb276802efd6af8a6b30ed0d8ad78dc549728f', 19);
INSERT INTO public.refresh_tokens VALUES (85, '2026-05-04 17:44:37.633295', '2026-05-18 17:44:37.632296', NULL, NULL, false, '67cb5dfd6f387f6f8937069be84791dfab890aac930ea4d3db19b80781743e96', 4);
INSERT INTO public.refresh_tokens VALUES (86, '2026-05-04 17:44:52.695884', '2026-05-18 17:44:52.695884', NULL, NULL, false, '580ae2cef2cbd5b88b2ae8609edcb32042d25064eb1c5e7ec095ed1d9a070e92', 19);
INSERT INTO public.refresh_tokens VALUES (87, '2026-05-04 17:45:17.962393', '2026-05-18 17:45:17.962393', NULL, NULL, false, 'e7d84a5f886a4581ab921506bbfd631d5d41dcdc8d6e52fddfbef9fc7dede88f', 19);
INSERT INTO public.refresh_tokens VALUES (88, '2026-05-05 17:32:48.622225', '2026-05-19 17:32:48.61266', NULL, NULL, false, '9f893001c6086a1202acdde50b8b8eefc594d15c790d07a6cf4d4081e5ac8997', 34);
INSERT INTO public.refresh_tokens VALUES (89, '2026-05-05 17:59:13.200217', '2026-05-19 17:59:13.200217', NULL, NULL, false, 'b3efe5617794cbc1b55744898af8d13248fbebfbdf28d0be28426f58bcada62f', 34);
INSERT INTO public.refresh_tokens VALUES (90, '2026-05-05 18:43:36.825521', '2026-05-19 18:43:36.825521', NULL, NULL, false, '701abf59623ffcee50fd070fe2ca9a86b1a1abd21badb79819d7c9bf65e78638', 33);
INSERT INTO public.refresh_tokens VALUES (91, '2026-05-05 18:43:55.13784', '2026-05-19 18:43:55.136641', NULL, NULL, false, 'd0f6206d8deee8e281a59196ac8861ff95cff529c1bdb6d24f7017c9886f0592', 3);
INSERT INTO public.refresh_tokens VALUES (92, '2026-05-05 18:44:04.009118', '2026-05-19 18:44:04.009118', NULL, NULL, false, 'ee78e5aee479c00aec4c597371d7cb12f006718d41eebd40d06ee20daae58915', 4);
INSERT INTO public.refresh_tokens VALUES (93, '2026-05-05 18:44:12.790504', '2026-05-19 18:44:12.790504', NULL, NULL, false, 'a03287b4113a9a4310fc2dda957ba37c01c828d101f669ffe74c8d2031957763', 19);
INSERT INTO public.refresh_tokens VALUES (94, '2026-05-12 15:54:36.523486', '2026-05-26 15:54:36.515842', NULL, NULL, false, '314e08ccc3834f6da7ea0eaead6793d222f12492741270078e020043403f2998', 19);
INSERT INTO public.refresh_tokens VALUES (95, '2026-05-12 16:39:26.660144', '2026-05-26 16:39:26.651161', NULL, NULL, false, '1909b44b45ce291b052d66dd7212ffaa7d460b9ecf8ebb329592f6090fd376fb', 19);
INSERT INTO public.refresh_tokens VALUES (96, '2026-05-12 16:40:22.99533', '2026-05-26 16:40:22.994332', NULL, NULL, false, '01292905497df5026cf10877e5ee2f49a7e444d6173b0a3876c3139289191838', 34);
INSERT INTO public.refresh_tokens VALUES (97, '2026-05-16 09:36:01.858401', '2026-05-30 09:36:01.858401', NULL, NULL, false, 'cc6b6bceaf1df02661290037cd12eea9fd4e9051b4bafd541d18ab53841a7ead', 4);
INSERT INTO public.refresh_tokens VALUES (98, '2026-05-16 09:36:13.375817', '2026-05-30 09:36:13.375817', NULL, NULL, false, 'a48d7d0a9722ca42e4bcc401d0905fbf97a4d31b70dea95575d42aa5a41aa72e', 33);
INSERT INTO public.refresh_tokens VALUES (99, '2026-05-16 13:32:55.721761', '2026-05-30 13:32:55.71476', NULL, NULL, false, '948a8f8414a4330e7354510784e06de843275cc885c0a1ccc7d06e3972e5ca41', 33);
INSERT INTO public.refresh_tokens VALUES (100, '2026-05-16 15:27:07.875828', '2026-05-30 15:27:07.86452', NULL, NULL, false, 'd1f4882af2c315ad047abe5ee4ef68463850b95f7ac9b81a9d0003ca9fe56c94', 33);
INSERT INTO public.refresh_tokens VALUES (101, '2026-05-16 15:35:46.85823', '2026-05-30 15:35:46.857223', NULL, NULL, false, 'c929d844c89ebdd3afb820f912850a56013359ebd43d039372a4254b839f2fc8', 34);
INSERT INTO public.refresh_tokens VALUES (102, '2026-05-16 15:35:59.460295', '2026-05-30 15:35:59.460295', NULL, NULL, false, 'ac8ca9f3a5dd454114357c6704c1c12835204ce450827ab5b86f91c0d9c97ae3', 33);
INSERT INTO public.refresh_tokens VALUES (103, '2026-05-16 15:36:31.683128', '2026-05-30 15:36:31.683128', NULL, NULL, false, '700721602347d3007a3a8230e4822c3bda4e50cc628058239bd6ba05a85b6135', 34);
INSERT INTO public.refresh_tokens VALUES (104, '2026-05-24 18:58:15.966576', '2026-06-07 18:58:15.949', NULL, NULL, false, '86d6f8eb0684aa4d5541edf20fc43379699f68349038f6b6d5c3fb0e991d19fc', 34);
INSERT INTO public.refresh_tokens VALUES (105, '2026-05-24 19:07:58.961246', '2026-06-07 19:07:58.961246', NULL, NULL, false, 'd2401222a899f5e74d70780886d76c16e23ee2f2dbaf4c2b85c3e440898cf39e', 33);
INSERT INTO public.refresh_tokens VALUES (106, '2026-05-24 19:08:28.641377', '2026-06-07 19:08:28.641377', NULL, NULL, false, '399f6aad5ad0225a1664c24b95a7e16ee7addc80aa4ececbd720716450c94691', 34);
INSERT INTO public.refresh_tokens VALUES (107, '2026-05-24 19:08:37.819166', '2026-06-07 19:08:37.819166', NULL, NULL, false, '778f99c64f5ca0ecf7f40a62e8e7fa1a0b44ed40670ded32fcd1c25d2d73c307', 34);
INSERT INTO public.refresh_tokens VALUES (108, '2026-05-24 19:10:29.299776', '2026-06-07 19:10:29.299776', NULL, NULL, false, 'ceeb6216a6dede05b26902213792fa1f2b994f6c91c8262701fea6e05d3f48e3', 33);
INSERT INTO public.refresh_tokens VALUES (109, '2026-05-25 21:23:04.135466', '2026-06-08 21:23:04.13446', NULL, NULL, false, 'e2d923b7d1aedfa7b9a4fa13ab16b1cfa2308d5f7c76833ab38bccea66b1e21a', 34);
INSERT INTO public.refresh_tokens VALUES (110, '2026-05-26 15:53:42.34918', '2026-06-09 15:53:42.348185', NULL, NULL, false, '5f8730f0935dbc9b597a02b6c2f514480030f2cf4d5084a19b94dea18ce42655', 34);
INSERT INTO public.refresh_tokens VALUES (111, '2026-05-26 15:57:03.476222', '2026-06-09 15:57:03.475237', NULL, NULL, false, '2f74c11d2401377732af48425e004c6bc0b4edf37728c029e4b098d6d880059a', 34);
INSERT INTO public.refresh_tokens VALUES (112, '2026-05-26 15:57:38.31671', '2026-06-09 15:57:38.315716', NULL, NULL, false, 'c38ae1a756bdcc3f00f433f42c2f39ebc152c0b51ff80dc25107cfd322bb337b', 34);
INSERT INTO public.refresh_tokens VALUES (113, '2026-05-26 18:49:29.576048', '2026-06-09 18:49:29.559697', NULL, NULL, false, 'c5c6b8c56eb813bfe8742afb6d598e48d00267f941ead05804c095ab4e888448', 34);
INSERT INTO public.refresh_tokens VALUES (114, '2026-05-26 19:44:25.316689', '2026-06-09 19:44:25.316689', NULL, NULL, false, '31c0bad2be614e62a67435c3a79769b578148aca7ffd72cce321a734dba98fba', 34);
INSERT INTO public.refresh_tokens VALUES (115, '2026-05-26 19:46:20.818636', '2026-06-09 19:46:20.817643', NULL, NULL, false, '8ac17c4dbbd8237e178deccc9ab67734a0d87a1f9ae294e51b831bbc1553339f', 34);
INSERT INTO public.refresh_tokens VALUES (116, '2026-05-26 19:53:01.052726', '2026-06-09 19:53:01.052726', NULL, NULL, false, 'e40e81615f30c8fb5bc3f2ec85ffd31568d2ed773b1a4d080c414cbb2fd6d948', 33);
INSERT INTO public.refresh_tokens VALUES (117, '2026-05-26 19:53:37.531839', '2026-06-09 19:53:37.531839', NULL, NULL, false, '0302efd502f08aae95dd936816f999c32de42bace7fa30ef48d357e9b42726e4', 33);
INSERT INTO public.refresh_tokens VALUES (118, '2026-05-26 20:41:09.637351', '2026-06-09 20:41:09.632349', NULL, NULL, false, '11c0bb347c5906f488d394c630dfcd60a371b0e3ea2d5e2b9066b83233220fff', 34);
INSERT INTO public.refresh_tokens VALUES (119, '2026-05-26 21:31:03.577517', '2026-06-09 21:31:03.575032', NULL, NULL, false, '12623aff9e0adb67c145152ba71b2c878247df3b39c0209aaef0322f3e83b5ac', 34);
INSERT INTO public.refresh_tokens VALUES (120, '2026-05-26 21:31:27.95889', '2026-06-09 21:31:27.95889', NULL, NULL, false, '1121e3a4f36296993723fddfe94c257c8f804f731d527c64a787bf9098fe1c93', 34);
INSERT INTO public.refresh_tokens VALUES (121, '2026-05-26 21:41:22.396343', '2026-06-09 21:41:22.396343', NULL, NULL, false, '9c932da854b993f5986e02e466ab543aba5cccc023a99f18d2f96a28d33a2bbe', 34);
INSERT INTO public.refresh_tokens VALUES (122, '2026-05-26 21:47:16.011189', '2026-06-09 21:47:16.010176', NULL, NULL, false, '5c0e09e4c79bf573308c957af419810bba593a3e9ef1537570aa48614e1cf100', 33);
INSERT INTO public.refresh_tokens VALUES (123, '2026-05-26 21:47:38.105146', '2026-06-09 21:47:38.105146', NULL, NULL, false, '708e62d7f72c83e5440ee60c175de0f43c120db290e38abc74a1bf65c15a852e', 34);
INSERT INTO public.refresh_tokens VALUES (124, '2026-05-26 21:53:27.326691', '2026-06-09 21:53:27.326691', NULL, NULL, false, '5fde3d8745a93ef5cee19faeeb4ce3a0d07563c5e2c5bcfae1f55cce3c9500f1', 34);
INSERT INTO public.refresh_tokens VALUES (125, '2026-06-17 08:04:04.750759', '2026-07-01 08:04:04.750759', NULL, NULL, false, '168f925291f204bb468983be5905fc91dd46b8f200c4d215ba3a72ece5ad14af', 34);
INSERT INTO public.refresh_tokens VALUES (126, '2026-06-17 09:07:43.408048', '2026-07-01 09:07:43.373093', NULL, NULL, false, '6efbedf989ec0841d5c0a3bfb50afecd03f9331a909335d74a8ea91c8ba979a2', 34);
INSERT INTO public.refresh_tokens VALUES (127, '2026-06-17 18:58:21.848426', '2026-07-01 18:58:21.832238', NULL, NULL, false, '05449e4cc1ad7f6a68e3a78c0acf5dec61d4344f6f0f91f86c958bf9ceb97cbb', 34);
INSERT INTO public.refresh_tokens VALUES (128, '2026-06-17 18:58:55.948679', '2026-07-01 18:58:55.948679', NULL, NULL, false, 'bba552425bf0a9123bc27a7999d827879b5e6415b908ba345dc3bf565d7ed46e', 33);
INSERT INTO public.refresh_tokens VALUES (129, '2026-06-17 20:10:22.703322', '2026-07-01 20:10:22.689646', NULL, NULL, false, '4d09d124dcceb749495aa946eefb88f344c8c7474c6c9875b29ea8bf5aad2746', 3);
INSERT INTO public.refresh_tokens VALUES (130, '2026-06-17 20:17:13.914218', '2026-07-01 20:17:13.914218', NULL, NULL, false, '44be2d3b3cc33238d887b0009bce4a3948c40470f1c966dfba7320dea7ba8354', 1);
INSERT INTO public.refresh_tokens VALUES (131, '2026-06-17 20:24:30.221541', '2026-07-01 20:24:30.220527', NULL, NULL, false, '409f1cd3e3c7aba2bf8478db4584f248b3532de8c9714680bd3a77584052abad', 33);
INSERT INTO public.refresh_tokens VALUES (132, '2026-06-17 20:26:50.065331', '2026-07-01 20:26:50.065331', NULL, NULL, false, 'e91d96c3249d4d143e87167f8c7c69c0d0f1d78336cce9b31be94f762ff9ddc9', 1);
INSERT INTO public.refresh_tokens VALUES (133, '2026-06-17 20:27:43.111636', '2026-07-01 20:27:43.110889', NULL, NULL, false, 'f3596b81d07175741edd27ecdfe08f348f378f59887a4e2f9b97cf99abffdaca', 33);
INSERT INTO public.refresh_tokens VALUES (134, '2026-06-17 20:28:39.571816', '2026-07-01 20:28:39.570805', NULL, NULL, false, '290711310cf2187beafd4b9db515e5ae471bd1547a78876fe7cc418dc8f16dde', 1);
INSERT INTO public.refresh_tokens VALUES (135, '2026-06-17 20:54:00.477051', '2026-07-01 20:54:00.475055', NULL, NULL, false, '8580025d84aaa90ee271141665f280b504ac5a662b80b4e95256629ec62fbe0e', 33);
INSERT INTO public.refresh_tokens VALUES (136, '2026-06-17 20:54:52.655029', '2026-07-01 20:54:52.655029', NULL, NULL, false, 'a86fc4b479fb524ceed5a4e898d527d4a62bf3cf8fdcd9db8200288dc85b4c8a', 1);
INSERT INTO public.refresh_tokens VALUES (137, '2026-06-17 20:56:01.692616', '2026-07-01 20:56:01.692616', NULL, NULL, false, '79da47742726fc2d90360b00407851118f31db7254a33274812c7453c3f085b6', 2);
INSERT INTO public.refresh_tokens VALUES (138, '2026-06-17 21:13:03.731412', '2026-07-01 21:13:03.730124', NULL, NULL, false, '5f9234c0983f2e3b2c1ee15e50b1952852d775a57a34e33a70e826602603a90c', 33);
INSERT INTO public.refresh_tokens VALUES (139, '2026-06-17 21:30:01.9225', '2026-07-01 21:30:01.9225', NULL, NULL, false, '90f58f87f319948d22bf3f3dc3dfc539d8ba3f9b3c30f978ac5aedeeaff146c1', 33);
INSERT INTO public.refresh_tokens VALUES (140, '2026-06-18 10:28:14.724205', '2026-07-02 10:28:14.706716', NULL, NULL, false, 'd24754ddc258e980cf325f2c04a60807731b8a4c2a66a6aeea7ea934a945aa72', 33);
INSERT INTO public.refresh_tokens VALUES (141, '2026-06-18 10:32:05.821078', '2026-07-02 10:32:05.820082', NULL, NULL, false, '40aec6dd38b6fe31ac9775a0db13dbba5269326ca4e248365bc0fc5c03348f71', 2);
INSERT INTO public.refresh_tokens VALUES (142, '2026-06-18 10:37:12.137586', '2026-07-02 10:37:12.137586', NULL, NULL, false, '285c963eab3e3cfb358de07c8ac954f6235dda1dd2f7f2f4fafbab805bbf922a', 33);
INSERT INTO public.refresh_tokens VALUES (143, '2026-06-18 10:40:30.050289', '2026-07-02 10:40:30.04988', NULL, NULL, false, '1fec31a2f0f1af97a7d51f6f0c9b40ec2153a98e7efeb2de51f3165c8e929877', 1);
INSERT INTO public.refresh_tokens VALUES (144, '2026-06-18 11:02:53.389242', '2026-07-02 11:02:53.381996', NULL, NULL, false, 'cce14b55fd26e1b9308cc2f05fef1a866bf3df0c1c59e7ce57b6d8dab19f082f', 33);
INSERT INTO public.refresh_tokens VALUES (145, '2026-06-18 11:06:26.907135', '2026-07-02 11:06:26.907135', NULL, NULL, false, 'bd6552b5c2a5f2c3f190bf47a753dbb7fbebca40eaf3807233bbaae5a527d415', 2);
INSERT INTO public.refresh_tokens VALUES (146, '2026-06-18 11:08:37.933496', '2026-07-02 11:08:37.933496', NULL, NULL, false, 'a55c5573aa7bd59cd3992ee079c9cf81a00ae297e405b183f1ab9fe505803ffc', 1);
INSERT INTO public.refresh_tokens VALUES (147, '2026-06-18 11:10:56.133383', '2026-07-02 11:10:56.133383', NULL, NULL, false, '088d66fdd23a5997a96f1ad2b917961e4e929d9cc0bd0bf9de07232bc0f66881', 2);
INSERT INTO public.refresh_tokens VALUES (148, '2026-06-18 11:12:28.833251', '2026-07-02 11:12:28.833251', NULL, NULL, false, '892264eef6a505f554940579e70eed2b2241a0a36c2b8870c3371f1a71ad67c3', 33);
INSERT INTO public.refresh_tokens VALUES (149, '2026-06-18 11:25:57.090013', '2026-07-02 11:25:57.082684', NULL, NULL, false, '7410cd141dce1137b108af076c28da3e1d3b7633596a41827708da3d4a07807d', 2);
INSERT INTO public.refresh_tokens VALUES (150, '2026-06-18 11:26:44.600363', '2026-07-02 11:26:44.59936', NULL, NULL, false, 'a69527ad4b12a3bcde7072755f05c96e6750ab5087125e92abe61429ce33e0e0', 33);
INSERT INTO public.refresh_tokens VALUES (151, '2026-06-18 11:28:05.382864', '2026-07-02 11:28:05.382864', NULL, NULL, false, '4dae3111b490161198e2bdd842b1001f1ac753ee56e2e99cc386e2f8b6b64b80', 33);
INSERT INTO public.refresh_tokens VALUES (152, '2026-06-18 11:28:38.266095', '2026-07-02 11:28:38.266095', NULL, NULL, false, 'c8124f0253391bae6daf28ea4115f8d5832f33fd7472e778bbaf3946b668e532', 33);
INSERT INTO public.refresh_tokens VALUES (153, '2026-06-18 11:28:53.416082', '2026-07-02 11:28:53.416082', NULL, NULL, false, '7528d51621fefd1f761908d68c005984789b3506fbe5cc6bb63a80f6bfaa6686', 1);
INSERT INTO public.refresh_tokens VALUES (154, '2026-06-18 11:29:31.893862', '2026-07-02 11:29:31.893862', NULL, NULL, false, '921d634bad4b802899bafe1db4a9a074b5b5d304925aa2f15da7b3ff3bb41d4b', 2);
INSERT INTO public.refresh_tokens VALUES (155, '2026-06-18 11:37:04.887578', '2026-07-02 11:37:04.887578', NULL, NULL, false, '0ae714156927b251d9689613800eb4f3b9e92150c0335e06c78e6604687d6ecb', 1);
INSERT INTO public.refresh_tokens VALUES (156, '2026-06-18 11:41:08.829805', '2026-07-02 11:41:08.829805', NULL, NULL, false, '150cabf9b1a89d643a6c3a881644fec89b43f256da170c02e8312aab90c0766c', 33);
INSERT INTO public.refresh_tokens VALUES (157, '2026-06-18 11:41:45.288784', '2026-07-02 11:41:45.288784', NULL, NULL, false, '95a3eeac59c25a4da6efc2cb2d0f6a5e9083ee20f0977ed139f2cb3897df2d35', 2);
INSERT INTO public.refresh_tokens VALUES (158, '2026-06-18 11:41:57.708217', '2026-07-02 11:41:57.708217', NULL, NULL, false, '5c9476aa9f060b3d5fa8af74d9ca2495688a67162c2b02f3a9c16a3ae7b98e5b', 1);
INSERT INTO public.refresh_tokens VALUES (159, '2026-06-18 11:42:58.085811', '2026-07-02 11:42:58.085811', NULL, NULL, false, '850ab30f3ca8b56468f12b6dffca69b03c3c91b0372cc583311c2d927e47f1e9', 2);
INSERT INTO public.refresh_tokens VALUES (160, '2026-06-18 11:43:10.973127', '2026-07-02 11:43:10.973127', NULL, NULL, false, '063b94699e33e67faba69a5d69bef1ab8665534af98ccebe7bdb29757d2e0cde', 33);
INSERT INTO public.refresh_tokens VALUES (161, '2026-06-18 11:48:14.137302', '2026-07-02 11:48:14.13347', NULL, NULL, false, 'f6484e41e570e8182835f0b5bc476ec31f77009adce0b34ab74c0732114a96cf', 2);
INSERT INTO public.refresh_tokens VALUES (162, '2026-06-18 11:48:31.050352', '2026-07-02 11:48:31.050352', NULL, NULL, false, 'f311e3e7e37effaed2b023a0698703b23fb49130ccdfd85ce21f295bc78b3dc5', 1);
INSERT INTO public.refresh_tokens VALUES (163, '2026-06-18 11:48:43.60164', '2026-07-02 11:48:43.60164', NULL, NULL, false, 'd6257059a8de53f142e2363dba208a2ee6c0829727e4b1307172fe006d137b50', 33);
INSERT INTO public.refresh_tokens VALUES (164, '2026-06-18 11:48:57.299975', '2026-07-02 11:48:57.299975', NULL, NULL, false, '0d4ff10a71103a9010bb5141d722ba5215ba8165205bfb256b5ac5a559f8e778', 33);


--
-- TOC entry 5402 (class 0 OID 25258)
-- Dependencies: 284
-- Data for Name: risk_adjustments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5386 (class 0 OID 25098)
-- Dependencies: 268
-- Data for Name: self_credit_evaluations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.self_credit_evaluations VALUES (1, 4, '2026-04-21 20:33:20.847891', 0.8571, 25, 0.6833, 5, 15, 4, 30, false, 'HIGH', 105000.00, 90000.00, 61500.00, 90000.00, 95, 20, 3, 1);
INSERT INTO public.self_credit_evaluations VALUES (2, 4, '2026-04-21 21:09:33.948595', 0.8571, 25, 0.6833, 5, 15, 4, 30, false, 'HIGH', 105000.00, 90000.00, 61500.00, 90000.00, 95, 20, 3, 1);
INSERT INTO public.self_credit_evaluations VALUES (5, 2, '2026-04-25 11:54:28.310161', 0.4000, 0, 0.1150, 0, 0, 1, 8, false, 'LOW', 50000.00, 20000.00, 23000.00, 200000.00, 8, 0, 14, 12);
INSERT INTO public.self_credit_evaluations VALUES (38, 5, '2025-06-01 11:00:00', 0.6500, 25, 0.6660, 10, 15, 5, 30, false, 'HIGH', 150000.00, 97500.00, 119875.00, 180000.00, 90, 10, 16, 32);
INSERT INTO public.self_credit_evaluations VALUES (39, 3, '2025-07-01 11:00:00', 0.8000, 25, 0.5444, 5, 8, 5, 30, false, 'HIGH', 150000.00, 120000.00, 98000.00, 180000.00, 88, 20, 16, 24);
INSERT INTO public.self_credit_evaluations VALUES (40, 3, '2025-08-01 11:00:00', 0.6000, 25, 0.5361, 5, 8, 5, 30, false, 'HIGH', 150000.00, 90000.00, 96500.00, 180000.00, 78, 10, 16, 30);
INSERT INTO public.self_credit_evaluations VALUES (41, 2, '2025-09-01 11:00:00', 0.6000, 25, 0.5139, 0, 8, 5, 30, false, 'HIGH', 150000.00, 90000.00, 92500.00, 180000.00, 73, 10, 16, 26);
INSERT INTO public.self_credit_evaluations VALUES (43, 2, '2025-11-01 11:00:00', 0.6000, 25, 0.5250, 0, 8, 2, 18, false, 'MEDIUM', 150000.00, 90000.00, 94500.00, 180000.00, 61, 10, 16, 27);
INSERT INTO public.self_credit_evaluations VALUES (44, 3, '2025-12-01 11:00:00', 0.5000, 12, 0.4097, 5, 8, 2, 18, false, 'MEDIUM', 150000.00, 75000.00, 73750.00, 180000.00, 53, 10, 16, 29);
INSERT INTO public.self_credit_evaluations VALUES (45, 3, '2026-01-01 11:00:00', 0.3000, 12, 0.4069, 5, 8, 2, 18, false, 'MEDIUM', 150000.00, 45000.00, 73250.00, 180000.00, 43, 0, 16, 28);
INSERT INTO public.self_credit_evaluations VALUES (46, 2, '2026-02-01 11:00:00', 0.5000, 12, 0.3542, 0, 8, 1, 8, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 38, 10, 16, 25);
INSERT INTO public.self_credit_evaluations VALUES (47, 3, '2026-03-01 11:00:00', 0.5000, 12, 0.3542, 5, 8, 0, 0, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 35, 10, 16, 35);
INSERT INTO public.self_credit_evaluations VALUES (8, 3, '2025-12-25 12:00:00', 0.7500, 12, 0.3375, 5, 8, 4, 30, false, 'HIGH', 100000.00, 75000.00, 33750.00, 100000.00, 75, 20, 1, 19);
INSERT INTO public.self_credit_evaluations VALUES (48, 3, '2026-04-01 11:00:00', 0.3000, 12, 0.3847, 5, 8, 1, 8, true, 'LOW', 150000.00, 45000.00, 69250.00, 180000.00, 33, 0, 16, 31);
INSERT INTO public.self_credit_evaluations VALUES (50, 2, '2026-05-04 16:16:50.193425', 0.5000, 12, 0.3542, 0, 15, 0, 0, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (49, 2, '2026-05-01 11:00:00', 0.5000, 12, 0.3542, 0, 15, 0, 0, true, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (51, 2, '2026-05-04 16:17:41.067458', 0.5000, 12, 0.3542, 0, 15, 0, 0, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (52, 2, '2026-05-04 16:19:46.461389', 0.5000, 12, 0.3542, 0, 15, 0, 0, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (12, 3, '2026-04-27 20:08:17.317479', 0.6000, 12, 0.3800, 5, 15, 1, 8, true, 'MEDIUM', 100000.00, 60000.00, 38000.00, 100000.00, 50, 10, 1, 11);
INSERT INTO public.self_credit_evaluations VALUES (6, 3, '2026-04-26 11:00:16.415748', 0.6000, 12, 0.3800, 5, 15, 1, 8, false, 'MEDIUM', 100000.00, 60000.00, 38000.00, 100000.00, 50, 10, 1, 11);
INSERT INTO public.self_credit_evaluations VALUES (4, 3, '2026-04-22 11:56:46.315975', 0.6000, 12, 0.3800, 5, 15, 1, 8, false, 'MEDIUM', 100000.00, 60000.00, 38000.00, 100000.00, 50, 10, 1, 11);
INSERT INTO public.self_credit_evaluations VALUES (3, 3, '2026-04-22 11:54:41.762294', 0.6000, 12, 0.3800, 5, 15, 1, 8, false, 'MEDIUM', 100000.00, 60000.00, 38000.00, 100000.00, 50, 10, 1, 11);
INSERT INTO public.self_credit_evaluations VALUES (11, 3, '2026-03-25 12:00:00', 0.8000, 12, 0.3600, 5, 0, 1, 8, false, 'MEDIUM', 100000.00, 80000.00, 36000.00, 100000.00, 45, 20, 1, 22);
INSERT INTO public.self_credit_evaluations VALUES (10, 3, '2026-02-25 12:00:00', 0.2500, 12, 0.3091, 5, 0, 4, 30, false, 'MEDIUM', 80000.00, 20000.00, 34000.00, 110000.00, 47, 0, 1, 21);
INSERT INTO public.self_credit_evaluations VALUES (9, 5, '2026-01-25 12:00:00', 0.5000, 12, 0.3375, 10, 8, 2, 18, false, 'MEDIUM', 100000.00, 50000.00, 40500.00, 120000.00, 58, 10, 1, 20);
INSERT INTO public.self_credit_evaluations VALUES (7, 6, '2025-11-25 12:00:00', 0.8000, 25, 0.6200, 10, 0, 4, 30, false, 'HIGH', 100000.00, 80000.00, 62000.00, 100000.00, 85, 20, 1, 18);
INSERT INTO public.self_credit_evaluations VALUES (13, 3, '2026-04-27 20:46:26.574679', 1.6667, 25, 6.1662, 5, 15, 1, 8, false, 'HIGH', 12000.00, 20000.00, 1233231.00, 200000.00, 73, 20, 15, 23);
INSERT INTO public.self_credit_evaluations VALUES (53, 2, '2026-05-05 17:59:03.802221', 0.5000, 12, 0.3542, 0, 15, 0, 0, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (54, 2, '2026-05-05 18:36:45.851498', 0.5000, 12, 0.3542, 0, 15, 0, 0, true, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (55, 2, '2026-05-26 21:31:28.761312', 0.5000, 12, 0.3542, 0, 15, 0, 0, true, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (56, 2, '2026-06-17 09:09:24.456466', 0.5000, 12, 0.3542, 0, 15, 0, 0, false, 'MEDIUM', 150000.00, 75000.00, 63750.00, 180000.00, 37, 10, 16, 33);
INSERT INTO public.self_credit_evaluations VALUES (42, 3, '2025-10-01 11:00:00', 0.6000, 25, 0.5139, 5, 8, 2, 18, true, 'MEDIUM', 150000.00, 90000.00, 92500.00, 180000.00, 66, 10, 16, 34);


--
-- TOC entry 5410 (class 0 OID 32773)
-- Dependencies: 292
-- Data for Name: transaction_otp_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5418 (class 0 OID 0)
-- Dependencies: 223
-- Name: accounts_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_account_id_seq', 14, true);


--
-- TOC entry 5419 (class 0 OID 0)
-- Dependencies: 293
-- Name: audit_logs_audit_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_logs_audit_log_id_seq', 235, true);


--
-- TOC entry 5420 (class 0 OID 0)
-- Dependencies: 265
-- Name: bank_credit_evaluations_bank_evaluation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_credit_evaluations_bank_evaluation_id_seq', 75, true);


--
-- TOC entry 5421 (class 0 OID 0)
-- Dependencies: 249
-- Name: bank_customer_beneficiaries_beneficiary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_beneficiaries_beneficiary_id_seq', 1, false);


--
-- TOC entry 5422 (class 0 OID 0)
-- Dependencies: 251
-- Name: bank_customer_cards_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_cards_card_id_seq', 79, true);


--
-- TOC entry 5423 (class 0 OID 0)
-- Dependencies: 285
-- Name: bank_customer_crib_requests_crib_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_crib_requests_crib_request_id_seq', 7, true);


--
-- TOC entry 5424 (class 0 OID 0)
-- Dependencies: 253
-- Name: bank_customer_financial_records_bank_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_financial_records_bank_record_id_seq', 62, true);


--
-- TOC entry 5425 (class 0 OID 0)
-- Dependencies: 287
-- Name: bank_customer_incomes_income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_incomes_income_id_seq', 78, true);


--
-- TOC entry 5426 (class 0 OID 0)
-- Dependencies: 255
-- Name: bank_customer_liabilities_liability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_liabilities_liability_id_seq', 60, true);


--
-- TOC entry 5427 (class 0 OID 0)
-- Dependencies: 257
-- Name: bank_customer_loans_loan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_loans_loan_id_seq', 78, true);


--
-- TOC entry 5428 (class 0 OID 0)
-- Dependencies: 259
-- Name: bank_customer_missed_payments_missed_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_missed_payments_missed_payment_id_seq', 134, true);


--
-- TOC entry 5429 (class 0 OID 0)
-- Dependencies: 261
-- Name: bank_customer_transaction_otp_logs_otp_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_transaction_otp_logs_otp_log_id_seq', 1, false);


--
-- TOC entry 5430 (class 0 OID 0)
-- Dependencies: 263
-- Name: bank_customer_transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customer_transactions_transaction_id_seq', 1, false);


--
-- TOC entry 5431 (class 0 OID 0)
-- Dependencies: 225
-- Name: bank_customers_bank_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_customers_bank_customer_id_seq', 14, true);


--
-- TOC entry 5432 (class 0 OID 0)
-- Dependencies: 227
-- Name: bank_officers_officer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_officers_officer_id_seq', 4, true);


--
-- TOC entry 5433 (class 0 OID 0)
-- Dependencies: 229
-- Name: branches_branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.branches_branch_id_seq', 5, true);


--
-- TOC entry 5434 (class 0 OID 0)
-- Dependencies: 269
-- Name: budget_limits_budget_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.budget_limits_budget_id_seq', 1, false);


--
-- TOC entry 5435 (class 0 OID 0)
-- Dependencies: 271
-- Name: expense_categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_categories_category_id_seq', 24, true);


--
-- TOC entry 5436 (class 0 OID 0)
-- Dependencies: 273
-- Name: expense_records_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_records_expense_id_seq', 1, false);


--
-- TOC entry 5437 (class 0 OID 0)
-- Dependencies: 275
-- Name: income_records_income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.income_records_income_id_seq', 1, false);


--
-- TOC entry 5438 (class 0 OID 0)
-- Dependencies: 277
-- Name: loan_eligibility_results_loan_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loan_eligibility_results_loan_result_id_seq', 4, true);


--
-- TOC entry 5439 (class 0 OID 0)
-- Dependencies: 279
-- Name: loan_policies_policy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loan_policies_policy_id_seq', 4, true);


--
-- TOC entry 5440 (class 0 OID 0)
-- Dependencies: 281
-- Name: loansense_evaluations_loansense_evaluation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loansense_evaluations_loansense_evaluation_id_seq', 1, true);


--
-- TOC entry 5441 (class 0 OID 0)
-- Dependencies: 239
-- Name: public_customer_cards_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customer_cards_card_id_seq', 71, true);


--
-- TOC entry 5442 (class 0 OID 0)
-- Dependencies: 241
-- Name: public_customer_financial_records_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customer_financial_records_record_id_seq', 35, true);


--
-- TOC entry 5443 (class 0 OID 0)
-- Dependencies: 289
-- Name: public_customer_incomes_income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customer_incomes_income_id_seq', 64, true);


--
-- TOC entry 5444 (class 0 OID 0)
-- Dependencies: 243
-- Name: public_customer_liabilities_liability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customer_liabilities_liability_id_seq', 62, true);


--
-- TOC entry 5445 (class 0 OID 0)
-- Dependencies: 245
-- Name: public_customer_loans_loan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customer_loans_loan_id_seq', 73, true);


--
-- TOC entry 5446 (class 0 OID 0)
-- Dependencies: 247
-- Name: public_customer_missed_payments_missed_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customer_missed_payments_missed_payment_id_seq', 66, true);


--
-- TOC entry 5447 (class 0 OID 0)
-- Dependencies: 231
-- Name: public_customers_public_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.public_customers_public_customer_id_seq', 17, true);


--
-- TOC entry 5448 (class 0 OID 0)
-- Dependencies: 233
-- Name: refresh_tokens_refresh_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_refresh_token_id_seq', 164, true);


--
-- TOC entry 5449 (class 0 OID 0)
-- Dependencies: 283
-- Name: risk_adjustments_adjustment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.risk_adjustments_adjustment_id_seq', 1, false);


--
-- TOC entry 5450 (class 0 OID 0)
-- Dependencies: 235
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 15, true);


--
-- TOC entry 5451 (class 0 OID 0)
-- Dependencies: 267
-- Name: self_credit_evaluations_self_evaluation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.self_credit_evaluations_self_evaluation_id_seq', 56, true);


--
-- TOC entry 5452 (class 0 OID 0)
-- Dependencies: 291
-- Name: transaction_otp_logs_otp_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_otp_logs_otp_log_id_seq', 1, false);


--
-- TOC entry 5453 (class 0 OID 0)
-- Dependencies: 237
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 41, true);


-- Completed on 2026-06-18 11:59:53

--
-- PostgreSQL database dump complete
--

\unrestrict fZDYQPyg7ahLKv1OPF5WnoHw7cwlyshJOybxqRSUx1SpB82qIK8LERQ7r3Fj6aO

