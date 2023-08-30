import Reflection from "../models/Reflection.js";

export const createNewReflection = async (req, res) => {
  Reflection.create({
    country: req.body.country,
    username: req.body.username,
    id: req.body.id,
    date: req.body.date,
    description: req.body.description,
    likes: req.body.likes,
  })
    .then((reflection) => {
      res.status(201).json({
        ok: true,
        message: "Reflection created successfully",
        data: reflection,
      });
    })
    .catch(
      res.status(500).json({ ok: false, message: "Error creating reflection" }),
    );
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
  // quiero ver los url params
  try {
    const thought = await Reflection.findOneAndUpdate(
      { id: req.params.reflectionId },
      { $inc: { likes: 1 } },
      { new: true },
    );

    res.status(200).json({
      ok: true,
      message: "Reflection liked successfully",
      data: thought,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error liking reflection" });
  }
};

export const handleDislikeReflection = async (req, res) => {
  try {
    const thought = await Reflection.findOneAndUpdate(
      { id: req.params.reflectionId },
      { $inc: { likes: -1 } },
      { new: true },
    );

    res.status(200).json({
      ok: true,
      message: "Reflection disliked successfully",
      data: thought,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error disliking reflection" });
  }
};
