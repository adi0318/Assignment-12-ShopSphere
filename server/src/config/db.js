import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);

    process.exit(1);
  }
};

export default connectDB;
