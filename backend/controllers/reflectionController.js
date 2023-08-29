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
      console.log("Reflection created in db: ", reflection);
      res.status(201).json({
        ok: true,
        message: "Reflection created successfully",
        data: reflection,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ ok: false, message: "Error creating reflection" });
    });
};

export const getAllReflections = async (req, res) => {
  // Find 20 reflections by date, descending order (newest first)
  try {
    const tasks = await Reflection.find().sort({ date: -1 }).limit(20);

    res.status(200).json({
      ok: true,
      data: tasks,
    });
  } catch {
    res.status(500).json({ ok: false, message: "Error getting reflections" });
  }
};

export const handleLikeReflection = async (req, res) => {
  console.log(req.body);
  // actualizar en la db el thought que le llega en el body, probablemente porque aumentaron los likes
  res.status(200).json({ message: "Reflection liked successfully" });
};

export const handleDislikeReflection = async (req, res) => {
  console.log(req.body);
  // actualizar en la db el thought que le llega en el body, probablemente porque aumentaron los likes
  res.status(200).json({ message: "Reflection disliked successfully" });
};
