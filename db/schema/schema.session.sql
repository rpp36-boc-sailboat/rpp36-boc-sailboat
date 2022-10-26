/*
Execute this file from the command line by typing:
  psql postgres < db/schema/schema.session.sql
*/

\c encompass;

CREATE TABLE session (
  sid CHARACTER VARYING PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL
);

CREATE INDEX IDX_session_expire ON public.session USING btree (expire);