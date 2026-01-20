const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subRoutes = require('./routes/subRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect Routes
app.use('/api/subscriptions', subRoutes);

mongoose.connect('your_mongodb_url')
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

app.listen(8080, () => console.log("Server running on 8080"));