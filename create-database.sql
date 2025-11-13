-- SQL script to create the EDIMS database
-- Run this in phpMyAdmin SQL tab or MySQL command line

-- Create the database
CREATE DATABASE IF NOT EXISTS edims_db;

-- Use the database
USE edims_db;

-- Verify it was created
SHOW DATABASES LIKE 'edims_db';

-- Note: Sequelize will automatically create all tables when you start the backend
-- You don't need to create tables manually!

