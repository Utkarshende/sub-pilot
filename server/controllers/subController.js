import Subscription from "../models/Subscription.js";

// 1. GET ALL SUBSCRIPTIONS
export const getSubscriptions = async (req, res) => {
  try {
    // LOGIC: Only find subs belonging to the logged-in user
    const subs = await Subscription.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

// 2. ADD NEW SUBSCRIPTION
export const addSubscription = async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    
    const newSub = new Subscription({
      name,
      amount,
      category,
      user: req.user.id // Assigning ownership
    });

    const savedSub = await newSub.save();
    res.status(201).json(savedSub);
  } catch (err) {
    res.status(500).json({ message: "Error saving data" });
  }
};

// 3. DELETE SUBSCRIPTION
export const deleteSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    
    if (!sub) return res.status(404).json({ message: "Not found" });

    // LOGIC: Security check - Is this sub actually yours?
    if (sub.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await sub.deleteOne();
    res.status(200).json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};