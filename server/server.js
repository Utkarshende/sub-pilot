import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userLink from './routes/userRoutes.js';
import subLink from './routes/subRoutes.js'; // Import the new routes

dotenv.config(); // Load .env file
connectDB();    // Connect to MongoDB

const app = express();

// MIDDLEWARE
app.use(cors()); // Logic: Allows cross-origin requests from Frontend
app.use(express.json()); // Logic: Allows server to read JSON bodies


// ROUTES
app.use('/api/users', userLink);
// ROUTES
app.use('/api/subscriptions', subLink);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`),
connectDB());