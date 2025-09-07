-- -------------------------------------------------------------
-- TablePlus 6.7.0(634)
--
-- https://tableplus.com/
--
-- Database: mydb
-- Generation Time: 2025-09-07 18:10:05.3320
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."transactions";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS transactions_id_seq;

-- Table Definition
CREATE TABLE "public"."transactions" (
    "id" int4 NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    "amount" float8 NOT NULL,
    "currency" varchar NOT NULL,
    "createdAt" timestamp NOT NULL,
    "pgextrainfo" jsonb NOT NULL,
    "status" varchar NOT NULL,
    "belongTo" int4 NOT NULL,
    "updatedAt" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "role" varchar NOT NULL,
    "password" varchar NOT NULL,
    "email" varchar NOT NULL,
    "username" varchar NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."transactions" ("id", "amount", "currency", "createdAt", "pgextrainfo", "status", "belongTo", "updatedAt") VALUES
(1, 150, 'USD', '2025-09-07 12:26:29.083', '{"cardBrand": "Visa", "cardLast4": "1234"}', 'authorized', 2, '2025-09-07 12:26:29.083'),
(2, 150, 'USD', '2025-09-07 12:31:34.884', '{"cardBrand": "Visa", "cardLast4": "1234"}', 'failed', 2, '2025-09-07 12:31:34.884'),
(3, 150, 'USD', '2025-09-07 12:45:36.09', '{"cardBrand": "Visa", "cardLast4": "1234"}', 'failed', 1, '2025-09-07 12:45:36.09'),
(4, 77, 'USD', '2025-09-07 14:20:36.692', '{"cardBrand": "Visa1", "cardLast4": "1234"}', 'captured', 2, '2025-09-07 14:20:36.692'),
(5, 77, 'USD', '2025-09-07 14:20:41.769', '{"cardBrand": "Visa12", "cardLast4": "1234"}', 'authorized', 2, '2025-09-07 14:20:41.769'),
(6, 707, 'USD', '2025-09-07 14:20:45.375', '{"cardBrand": "Visa12", "cardLast4": "1234"}', 'captured', 2, '2025-09-07 14:20:45.375'),
(7, 800, 'USD', '2025-09-07 14:20:54.396', '{"cardBrand": "Visa", "cardLast4": "1234"}', 'authorized', 2, '2025-09-07 14:20:54.396'),
(8, 13, 'USD', '2025-09-07 14:20:57.798', '{"cardBrand": "Visa", "cardLast4": "1234"}', 'refunded', 2, '2025-09-07 14:20:57.798'),
(9, 13, 'USD', '2025-09-07 14:21:00.782', '{"cardBrand": "Visa1", "cardLast4": "1234"}', 'captured', 2, '2025-09-07 14:21:00.782'),
(10, 13, 'USD', '2025-09-07 15:03:24.841', '{"cardBrand": "Visa1", "cardLast4": "1234"}', 'authorized', 2, '2025-09-07 15:03:24.841');

INSERT INTO "public"."users" ("id", "role", "password", "email", "username") VALUES
(1, 'admin', '$2b$10$sbgdgMlSMv/rwi6iN63sgud9E4oimt/BKmlhw6n0ifcxIgiveFtpW', 'hamza@example.com', 'hamza'),
(2, 'vendor', '$2b$10$2SgDmRREv6O3UYv6ttv6I.JrK6YZ.SiR6ZYSy6JNkn3rQANAQbSgC', 'hamza@example.co', 'ham'),
(3, 'admin', '$2b$10$y2X/XEq9oFLl1HHSqG9EBukrjYt0Ghv6yumaAj6AOzaPe478hq.oy', 'hamza@example.co', 'ha'),
(4, 'vendor', '$2b$10$oM02zPjVMY5JYJ4ZnKnPCOq5QEaNzDRoc0OILMeRi7cpr5tO4yxsG', 'hamza@example.co', 'h'),
(5, 'vendor', '$2b$10$Jt1RooQDODdKXJcE7hDxEebpTrMd851n/Be5gIfvMJeK5KINdwuly', 'hamza@example.co', 'user12345'),
(6, 'vendor', '$2b$10$O9Lp0HlwHBloMmc3sXEKnO1XfvhhrKF79uT/yP2neDqgemBc6G3HG', 'hamza@example.co', 'user1234'),
(7, 'vendor', '$2b$10$eG32YJXtMCuQuaVedA7iKO/OCHmGUP/9w4hlUfcMDGTHyhv3aGVWe', 'hamza@example.co', 'user123'),
(8, 'vendor', '$2b$10$cqLjKqhyD6cRq.q.PFBGvumY6pxXmNPYjuc6NC.gRGgiodeCg2hOu', 'hamza@example.co', 'user12'),
(9, 'vendor', '$2b$10$xzojm63HmPRFU8lJh5yPouWFTYjyLtOm0iJG7fNjX9sdEB5dgHGgO', 'hamza@example.co', 'user1'),
(10, 'vendor', '$2b$10$HKUaiVmc3fpPGj5qm70ZYu4kNri795Hr7qvvB3fMSY9UuK/IO8Oqi', 'hamza@example.co', 'user0'),
(11, 'admin', '$2b$10$/XzN8KSC4Z0OuNUS3MgZwehHoyiZ3788CjQewmAjGBfQw3.eHJCnS', 'hamza@example.co', 'user');

ALTER TABLE "public"."transactions" ADD FOREIGN KEY ("belongTo") REFERENCES "public"."users"("id");


-- Indices
CREATE INDEX idx_transactions_status ON public.transactions USING btree (status);
CREATE INDEX idx_transactions_created_at ON public.transactions USING btree ("createdAt");
CREATE INDEX idx_transactions_belong_to ON public.transactions USING btree ("belongTo");
