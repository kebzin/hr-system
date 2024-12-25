import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("🚀 Already connected to database.");
    return true;
  }

  if (!process.env.MONGO_DB_CONNECTION_STRING) {
    console.error("🔴 MONGODB_URI is not defined.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log("🚀 Successfully connected to MongoDB.");
    return true;
  } catch (error) {
    console.error("🔴 Failed to connect to MongoDB:", error);
    return false;
  }
};

export default connectDB;
