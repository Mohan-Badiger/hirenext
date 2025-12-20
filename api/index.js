const express = require('express');
const cors = require('cors');
const pool = require('../backend/utils/DBPool');
require('dotenv').config();

const app = express();

/* CORS */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://assigmnet2.vercel.app',
    'https://hirenext-only-client.vercel.app'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

/* Database check */
pool.connect()
  .then(client => {
    console.log('✅ Database connected');
    client.release();
  })
  .catch(err => {
    console.error('❌ DB error:', err.message);
  });

/* Routers */
const authRouter = require('../backend/router/authRouter');
const dataRouter = require('../backend/router/dataRouter');

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);

/* EXPORT APP (IMPORTANT) */
module.exports = app;
