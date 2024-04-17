import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://juanperezbikerr:htIyO1hcZguX9lKM@cluster0.a4icetg.mongodb.net/permissionsmanager?retryWrites=true&w=majority&appName=Cluster0"
    );
  } catch (error) {
    console.log(error);
  }
};
