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
  // llamar a la db y traer los ultimos 20 thoughts por ej y mandarlos.
  res.status(200).json([
    {
      country: "Argentina",
      username: "Joaquin",
      id: "12312321213",
      date: "2023-08-26T20:18:48.895Z",
      description: "Mensaje 'guardado', test desde server!",
      likes: 0,
    },
  ]);
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
