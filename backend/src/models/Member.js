import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  section: { type: String, enum: ["AC", "Non-AC", "Cardio"], required: true },
  planName: { type: String, required: true },
  durationMonths: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  fee: { type: Number, min: 0, default: 0 },
  paidAmount: { type: Number, min: 0, default: 0 },
  notes: { type: String, default: "" },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Member", schema);
