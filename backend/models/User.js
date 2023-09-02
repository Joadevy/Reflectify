import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  id: { type: String, required: true },
  country: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  registration_date: { type: Date, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
