const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const flowRoutes = require('./routes/flowRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', flowRoutes);

// checking 
app.get('/', (req, res) => {
  res.json({ status: 'AI Flow API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});