import mongoose from "mongoose";

const connectDB = async () => {
  // Conecto localmente a la db (en remoto solo esta autorizada la ip de mi pc)
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error.message));
};

export default connectDB;
