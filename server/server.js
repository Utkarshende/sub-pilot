import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userLink from './routes/userRoutes.js';
import subLink from './routes/subRoutes.js';

dotenv.config(); 
connectDB(); 
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/users', userLink);
app.use('/api/subscriptions', subLink);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});