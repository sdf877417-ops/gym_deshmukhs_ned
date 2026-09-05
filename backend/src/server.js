import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import memberRoutes from "./routes/members.js";
import paymentRoutes from "./routes/payments.js";
import connectDB from "./config/connectDB.js";
import Member from "./models/Member.js";

const app = express();
const PORT = process.env.PORT || 5000;

// console.log(`MONGO_URI is :`, process.env.MONGO_URI)

// connecting dataabse
connectDB(process.env.MONGO_URI)

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Deshmukh Gym API is running" });
});


app.get("/getdata",async (_req, res) => {
  const data = await Member.find()
  console.log(`value in data :`, data)
  res.json({ ok: true, message: "Deshmukh Gym API is running", data:data });
});

app.use("/auth", authRoutes);
app.use("/members", memberRoutes);
app.use("/payments", paymentRoutes);

// demo checking 
app.get('/',(req,res)=>{
  res.send("welcome at deshmukh_gym_nanded backend at render")
})


app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});


app.listen(PORT, () => {
  console.log(`server is listening on PORT : ${PORT}`);
});
