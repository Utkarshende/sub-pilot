import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const formatDate = (dateString) => {
  if (!dateString) return "No Date Set";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Logic: Fixes the N/A issue
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export default mongoose.model('Subscription', subscriptionSchema);