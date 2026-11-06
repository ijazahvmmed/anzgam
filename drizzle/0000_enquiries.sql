CREATE TABLE enquiries (
 id TEXT PRIMARY KEY NOT NULL,
 created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL,
 location TEXT NOT NULL,
 service TEXT NOT NULL,
 budget TEXT NOT NULL DEFAULT '',
 message TEXT NOT NULL DEFAULT '',
 consent INTEGER NOT NULL,
 ip_hash TEXT NOT NULL
);
--> statement-breakpoint
CREATE INDEX enquiries_rate_limit ON enquiries(ip_hash, created_at);
