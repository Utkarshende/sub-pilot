const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());

const subscriptionRoutes=require('./routes/subscriptionRoutes');

app.use(express.json());

app.use('/api/subscriptions', subscriptionRoutes);

app.get('/',(req,res)=>{
    res.status(200).send('API is running...');
});

const PORT = process.env.PORT || 8080;

const MONGO_URI= process.env.MONGODB_URL;

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("MongoDB connected");
    app.listen(PORT,'0.0.0.0', ()=>{
console.log(`Serveris running on PORT ${PORT}`)
    });
})
.catch((err)=>{
    console.log('MongoDB connection failed');
    console.log(err);
})

app.use((err,req, res, next) => {
    console.err(err.stack);
    req.status(500).send('Something broke!');
})