import Subscription from "../models/Subscription.js";

 export const getSubs=async(req,res)=>{
  const subs = await Subscription.find({user:req.user._id});
  res.json(subs);
};

export const addSub = async (req, res)=>{
  const {name, amount, category}=req.body;
const sub = await Subscription.create({user: req.user._id, naem, amount, category});
req.status(201).json(sub);
};

export const deleteSub = async(req, res)=>{
await Subscription.findByIdAndDelete(req.params.id);
res.json({message:"Subscription Removed"});
};

