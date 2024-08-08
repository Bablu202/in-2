import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://aware9758:FdQXZulWt4oYhGXR@cluster0.5inrg.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URI!, { dbName: "in-2", bufferCommands: true });
  } catch (err: any) {
    console.log("Error", err);
    throw new Error(err);
  }
};
export default connect;
