import mongoose from "mongoose";

export const dbconnections = async () => {
  try {
    let connections = await mongoose.connect("mongodb://localhost:27017");
    console.log("Connect to MongoDB", connections.connection.host);
  } catch (error) {
    exit(1);
    console.error(error);
  }
};
