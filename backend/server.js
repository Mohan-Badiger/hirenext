const express = require('express');
const cors = require('cors');
const pool = require('./utils/DBPool');
require('dotenv').config();

const app = express();

// ✅ CORS FIRST
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://assigmnet2.vercel.app',
    'https://hirenext-only-client.vercel.app'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



// ✅ Then parsers
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
const verifyToken = require('./middleware/authMiddleware');
const authRouter = require('./router/authRouter');
const dataRouter = require('./router/dataRouter');

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
