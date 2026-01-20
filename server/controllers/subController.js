const Subscription = require('../models/Subscription');

// Get all subscriptions
exports.getSubs = async (req, res) => {
    try {
        const subs = await Subscription.find();
        res.json(subs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a subscription
exports.createSub = async (req, res) => {
    const sub = new Subscription(req.body);
    try {
        const newSub = await sub.save();
        res.status(201).json(newSub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a subscription
exports.deleteSub = async (req, res) => {
    try {
        await Subscription.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};