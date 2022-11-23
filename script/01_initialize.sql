CREATE USER db_user WITH  CREATEDB PASSWORD 'passw0rd';

CREATE DATABASE stock_db;

\c stock_db

-- GRANT ALL TABLES ON SCHEMA public db_user TO stock_db;
GRANT ALL PRIVILEGES ON SCHEMA public TO db_user;

