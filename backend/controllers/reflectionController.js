import Reflection from "../models/Reflection.js";
import { validateReflection } from "../models/ZodSchemas/Reflection.js";
import { partialValidateUser } from "../models/ZodSchemas/User.js";

export const createNewReflection = async (req, res) => {
  try {
    const validatedReflection = validateReflection(req.body);

    if (!validatedReflection.success)
      return res.status(400).json({
        ok: false,
        message: validatedReflection.error.message,
      });

    const reflection = await Reflection.create({
      ...validatedReflection.data,
    });

    res.status(201).json({
      ok: true,
      message: "Reflection created successfully",
      data: reflection,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error creating reflection" });
  }
};

export const getAllReflections = async (req, res) => {
  // Find 20 reflections by date, descending order (newest first)
  try {
    const reflections = await Reflection.find().sort({ date: -1 }).limit(20);

    res.status(200).json({
      ok: true,
      data: reflections,
    });
  } catch {
    res.status(500).json({ ok: false, message: "Error getting reflections" });
  }
};

export const handleLikeReflection = async (req, res) => {
  try {
    const validatedUser = partialValidateUser(req.body);

    if (!validatedUser.success)
      return res.status(400).json({
        ok: false,
        message: validatedUser.error.message,
      });

    const reflection = await Reflection.findOneAndUpdate(
      { id: req.params.reflectionId },
      { $addToSet: { likes: validatedUser.data.username } },
      { new: true },
    );

    res.status(200).json({
      ok: true,
      message: "Reflection liked successfully",
      data: reflection,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error liking reflection" });
  }
};

export const handleDislikeReflection = async (req, res) => {
  try {
    const validatedUser = partialValidateUser(req.body);

    if (!validatedUser.success)
      return res.status(400).json({
        ok: false,
        message: validatedUser.error.message,
      });

    const reflection = await Reflection.findOneAndUpdate(
      { id: req.params.reflectionId },
      // { $pull: { likes: "1" } },
      { $pull: { likes: validatedUser.data.username } },
      { new: true },
    );

    res.status(200).json({
      ok: true,
      message: "Reflection disliked successfully",
      data: reflection,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error disliking reflection" });
  }
};
