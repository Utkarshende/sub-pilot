const express = require('express');
const router=express.Router();
const Subscription=require('../models/Subscription')

router.get('/',async(req,res)=>{
    try{
        const sub = await Subscription.find();
res.json(sub);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    }
)

router.post('/',async (req,res)=>{
    const sub=new  Subscription({
        name:req.body.name,
        amount:req.body.amount,
        category:req.body.category
    });
    try{
        const newSub = await sub.save();
        res.status(201).json(newSub);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})
