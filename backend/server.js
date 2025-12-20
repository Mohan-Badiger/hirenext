const express = require('express');
const cors = require('cors');
const pool = require('./utils/DBPool');
require('dotenv').config();

const app = express();

/* ============================
   CORS
   ============================ */
app.use(cors());

/* ============================
   BODY PARSER
   ============================ */
app.use(express.json());

/* ============================
   DATABASE CONNECTION
   ============================ */
pool.connect()
  .then(client => {
    console.log('✅ Database connected successfully!');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
  });

/* ============================
   ROUTERS
   ============================ */
const authRouter = require('./router/authRouter');
const dataRouter = require('./router/dataRouter');

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);

/* ============================
   HEALTH CHECK
   ============================ */
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API Working fine' });
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
