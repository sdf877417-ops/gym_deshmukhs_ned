import mongoose from "mongoose";
process.env.MONGO_URI;

const connectDB = async (dburl) => {
  try {
    const conn = await mongoose.connect(dburl);

    if (conn) {
      console.log(`databse connected successfully !`);
    }
  } catch (error) {
    console.log("error at connect db :", error.message);
  }
};

export default connectDB;
