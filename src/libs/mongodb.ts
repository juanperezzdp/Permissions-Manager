import mongoose from "mongoose";

const MONGO_URI = "mongodb://0.0.0.0:27017/auth-next";

export const connectMongodb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connet DB");
  } catch (error) {
    console.log(error);
  }
};