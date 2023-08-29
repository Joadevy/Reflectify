import mongoose from "mongoose";
import { Schema } from "mongoose";

const ReflectionSchema = new Schema({
  id: { type: String, required: true },
  country: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  likes: { type: Number, required: true },
});

const Reflection = mongoose.model("Reflection", ReflectionSchema);

export default Reflection;
