import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connec = await mongoose.connect(
      `${process.env.MONGODB_URI}${DB_NAME}`
    );
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Failed to connect to DB", error);
    process.exit(-1);
  }
};

export { connectDB };
