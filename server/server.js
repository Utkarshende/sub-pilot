const express= require ('express');
const mongoose=require ('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();

//middleware
app.use(cors());
app.use(express.json());

//health api
app.get('/',(req,res)=>res.send('API is running...'));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log('MongoDB conn error:',err));