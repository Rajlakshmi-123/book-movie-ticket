import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ Database Connected");
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/quickso`);
  } catch (error) {                                                 
    console.log("❌ Database Connection Error:", error.message);
  }
};

export default connectDB;