import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection to mongodb : " + conn.connection.host);
  } catch (error) {
      console.log("Failed to connnect to MongoDB" + error);
      process.exit(1);
  }
};
