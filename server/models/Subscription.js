const mongoose=require('mongoose');

const subscriptionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add name'],
        trim:true,
    },
    amount:{
type:String,
required:[true,'Please add amount']
    },
    category:{
        type:String,
        required:true,
        enum:['Entertainment','Education','Productivity','Health','Other'],
    },
    date : {
        type:date,
        default:Date.now
    }
});
module.exports= mongoose.model ('Subscription',subscriptionschema);
