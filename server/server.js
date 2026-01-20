const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const subRoutes = require('./routes/subscriptionRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Connect Routes
app.use('/api/subscriptions', subRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

app.listen(8080, () => console.log("Server running on 8080"));