const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription'); // Capital 'S' for Model

// @route   GET /api/subscriptions
// @desc    Get all subscriptions
router.get('/', async (req, res) => {
    try {
        const subs = await Subscription.find().sort({ date: -1 }); // Newest first
        res.status(200).json(subs);
    } catch (err) {
        res.status(500).json({ message: "Server Error: Could not fetch data" });
    }
});

// @route   POST /api/subscriptions
// @desc    Create a new subscription
router.post('/', async (req, res) => {
    try {
        const { name, amount, category } = req.body;
        
        // Create new instance
        const newSub = new Subscription({
            name,
            amount,
            category
        });

        const savedSub = await newSub.save();
        res.status(201).json(savedSub); // 201 = Created
    } catch (err) {
        res.status(400).json({ message: "Validation Error: " + err.message });
    }
});

// @route   DELETE /api/subscriptions/:id
// @desc    Delete a subscription
router.delete('/:id', async (req, res) => {
    try {
        const sub = await Subscription.findByIdAndDelete(req.params.id);
        if (!sub) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting subscription" });
    }
});

// IMPORTANT: Do not forget this line!
module.exports = router;