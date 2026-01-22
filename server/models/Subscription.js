import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  // FIXED: Renamed to paymentDate to match your Frontend and AddSubForm logic
  paymentDate: { 
    type: Date, 
    required: true,
    default: Date.now 
  }
}, { timestamps: true });

// Logic: Models should only export the Schema. 
// Formatting logic (like formatDate) should stay in the Frontend components.
export default mongoose.model('Subscription', subscriptionSchema);