// Import dependencies
require('dotenv').config();
const { Pool } = require('pg');

// Create connection to database
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'employee_db',
  port: process.env.DB_PORT || 5432,
});

// Test connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = pool;