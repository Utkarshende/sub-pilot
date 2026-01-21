const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription'); // Capital 'S' for Model

router.get('/', async (req, res) => {
    try {
        const subs = await Subscription.find().sort({ date: -1 }); // Newest first
        res.status(200).json(subs);
    } catch (err) {
        res.status(500).json({ message: "Server Error: Could not fetch data" });
    }
});


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

router.delete(':id',async(req,res)=>{
    try{
        const response= await Subscription.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Delete Successfully"});
    }
    catch(error){
response.status(500).json({message: error.message});
}
})

// IMPORTANT: Do not forget this line!
module.exports = router;