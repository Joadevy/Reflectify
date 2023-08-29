export const createNewReflection = async(req, res) => {
    console.log(req.body)
    // guardar en la db el thought que le llega en el body
    res.status(201).json({ message: 'Reflection created successfully' });   
}

export const getAllReflections = async(req, res) => {
    // llamar a la db y traer los ultimos 20 thoughts por ej y mandarlos.
    res.status(200).json([{ country: "Argentina", username: "Joaquin",id:"12312321213", date: "2023-08-26T20:18:48.895Z", description:"Mensaje 'guardado', test desde server!", likes:0 }]);
}

export const handleLikeReflection =  async(req, res) => {
    console.log(req.body)
    // actualizar en la db el thought que le llega en el body, probablemente porque aumentaron los likes
    res.status(200).json({ message: 'Reflection liked successfully' });
}

export const handleDislikeReflection =  async(req, res) => {
    console.log(req.body)
    // actualizar en la db el thought que le llega en el body, probablemente porque aumentaron los likes
    res.status(200).json({ message: 'Reflection disliked successfully' });
}
