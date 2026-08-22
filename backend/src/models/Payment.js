import mongoose from "mongoose";

const schema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  memberName: { type: String, required: true },
  section: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card", "Bank Transfer"],
    default: "Cash"
  },
  paymentDate: { type: Date, default: Date.now },
  notes: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Payment", schema);
