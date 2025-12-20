const express = require('express');
const cors = require('cors');
const pool = require('./utils/DBPool');
require('dotenv').config();

const app = express();

/* ============================
   CORS – REQUIRED FOR VERCEL
   ============================ */
app.use(cors());           // allow all origins
app.options('*', cors());  // allow preflight OPTIONS requests

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
   HEALTH CHECK (DEBUG)
   ============================ */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok from vercel' });
});

/* ============================
   EXPORT APP (NO app.listen)
   ============================ */
module.exports = app;
