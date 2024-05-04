import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: { type: String },
  credits: { type: Number },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
