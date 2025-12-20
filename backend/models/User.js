const pool = require('../utils/DBPool');
const bcrypt = require('bcrypt');
 const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(query);
  console.log('✅ Users table ready');
};

// ✅ Add a new user (with hashed password)
 const addUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at;
  `;
  const values = [email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// ✅ Verify login credentials
 const verifyUser = async (email, password) => {
  const query = `SELECT * FROM users WHERE mail = $1`;
  const { rows } = await pool.query(query, [email]);
  const user = rows[0];

  if (!user) return false;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : false;
};

// ✅ Update user password
 const updatePassword = async (email, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  const query = `
    UPDATE users
    SET password = $1
    WHERE mail = $2
    RETURNING id, mail;
  `;
  const values = [hashed, email];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password, created_at
    FROM users
    WHERE email = $1;
  `;
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};
module.exports = {
  createUsersTable,
  addUser,
  verifyUser,
  updatePassword,
  getUserByEmail
}