import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import marketRoutes from './routes/market.js';

// Add after other middleware
app.use('/api/market', marketRoutes);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Kissan Connect API is running!' });
});

// Mock routes for demo
app.post('/api/analyze-crop', (req, res) => {
  const analysis = {
    quality_score: Math.floor(Math.random() * 30) + 70,
    freshness_days: Math.floor(Math.random() * 7) + 3,
    suggested_price: Math.floor(Math.random() * 20) + 30,
    price_reasons: [
      "High quality score",
      "Good market demand", 
      "Optimal freshness"
    ]
  };
  res.json({ success: true, analysis });
});

app.post('/api/upload-crop', (req, res) => {
  res.json({ success: true, message: 'Crop uploaded successfully' });
});

// Function to find available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
  });
};

// Start server on available port
findAvailablePort(5000).then(port => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📡 API available at: http://localhost:${port}`);
  });
});