import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import memberRoutes from "./routes/members.js";
import paymentRoutes from "./routes/payments.js";
import connectDB from "./config/connectDB.js";

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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Deshmukh Gym API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/payments", paymentRoutes);

// demo checking 
app.get('/',(req,res)=>{
  res.send("welcome")
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
