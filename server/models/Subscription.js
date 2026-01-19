const mongoose = require('mongoose');

// Define the Blueprint
const subscriptionSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please provide the subscription name'], 
        trim: true 
    },
    amount: { 
        type: Number, 
        required: [true, 'Please provide the monthly cost'] 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Entertainment', 'Utilities', 'Work', 'Food', 'Other'],
        default: 'Other'
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

// Export the Model
module.exports = mongoose.model('Subscription', subscriptionSchema);