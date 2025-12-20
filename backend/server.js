const express = require('express');
const cors = require('cors');
const pool = require('./utils/DBPool');
require('dotenv').config();

const app = express();

// ✅ CORS (simplified for Vercel)
app.use(cors());

// ✅ Parsers
app.use(express.json());

// ✅ Database connection
pool.connect()
  .then(client => {
    console.log('✅ Database connected successfully!');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.stack);
  });

// ✅ Routers
const authRouter = require('./router/authRouter');
const dataRouter = require('./router/dataRouter');

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok from vercel' });
});


// ✅ EXPORT APP (MANDATORY FOR VERCEL)
module.exports = app;
