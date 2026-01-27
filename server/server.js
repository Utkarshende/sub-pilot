import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'
import subRoutes from './routes/subRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB();
const app=express();

app.use(cors());
app.use(express,json());

app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subRoutes);

const PORT = 5000;

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));