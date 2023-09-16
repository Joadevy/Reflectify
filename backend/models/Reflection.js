import mongoose from "mongoose";
import { Schema } from "mongoose";

const ReflectionSchema = new Schema({
  id: { type: String, required: true },
  country: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  likes: { type: [String], default: [] },
});

const Reflection = mongoose.model("Reflection", ReflectionSchema);

export class ReflectionModel {
  static create = async ({ data }) => {
    const reflection = await Reflection.create({
      ...data,
    });

    return reflection;
  };

  static getLast20 = async () => {
    // Find 20 reflections by date, descending order (newest first)
    const reflections = await Reflection.find().sort({ date: -1 }).limit(20);

    return reflections;
  };

  static getPageWithLimit = async ({ page, limit }) => {
    const reflections = await Reflection.find()
      .sort({ date: -1 })
      .skip(page * limit)
      .limit(limit);

    return reflections;
  };

  static count = async () => {
    const count = await Reflection.countDocuments();

    return count;
  };

  static like = async ({ reflectionId, username }) => {
    const reflection = await Reflection.findOneAndUpdate(
      { id: reflectionId },
      { $addToSet: { likes: username } },
      { new: true },
    );

    return reflection;
  };

  static dislike = async ({ reflectionId, username }) => {
    const reflection = await Reflection.findOneAndUpdate(
      { id: reflectionId },
      { $pull: { likes: username } },
      { new: true },
    );

    return reflection;
  };
}
