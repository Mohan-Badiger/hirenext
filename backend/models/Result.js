const pool = require('../utils/DBPool');
const {getUserByEmail} = require('./User');
// ✅ Create the results table (run once)
const createResultTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS result (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      test_id INTEGER NOT NULL,
      test_score INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(query);
  console.log('✅ Result table ready');
};

// ✅ Add a new test result
const addResult = async (userId, testId, testScore) => {
  const query = `
    INSERT INTO result (user_id, test_id, test_score)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, test_id, test_score, created_at;
  `;
  const values = [userId, testId, testScore];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getResultsByEmail = async (email) => {
  const query = `
    SELECT r.id, r.test_id, r.test_score, r.created_at
    FROM result r
    JOIN users u ON r.user_id = u.id
    WHERE u.email = $1
    ORDER BY r.created_at DESC;
  `;
  const { rows } = await pool.query(query, [email]);
  return rows;
};

const deleteResultByIdAndEmail = async (resultId, email) => {
  try {
    // 1. Get user using your existing helper
    const user = await getUserByEmail(email);
    console.log("User fetched for deletion:", user);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const userId = user.id;
    console.log("user ID for deletion:", userId);
    console.log("result ID for deletion:", resultId);
    // 2. Delete the result with matching resultId + userId
    const query = `
      DELETE FROM result
      WHERE id = $1 AND user_id = $2
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [resultId, userId]);
    console.log("Rows returned from delete query:", rows);
    if (rows.length === 0) {
      return {
        success: false,
        message: "No result found for this user with given ID",
      };
    }

    return { success: true, deleted: rows[0] };

  } catch (error) {
    console.error("❌ Error deleting result:", error);
    return { success: false, message: "Internal server error" };
  }
};

module.exports = {
  createResultTable,
  addResult,
  getResultsByEmail,
  deleteResultByIdAndEmail
};