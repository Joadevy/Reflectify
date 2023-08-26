// src/server/index.ts
import express from "express"
const PORT = process.env.PORT || 5000
// import { api } from "./api"

const app = express()
// app.use(api)

app.use(express.json());

app.get('/api', (req, res) => {
    // llamar a la db y traer los ultimos 20 thoughts por ej y mandarlos.
    res.status(200).json([{ country: "Argentina", username: "Joaquin",id:"12312321213", date: "2023-08-26T20:18:48.895Z", description:"Mensaje 'guardado', test desde server!" }]);
});

app.post('/api', (req, res) => {
    console.log(req.body)
    // guardar en la db el thought que le llega en el body
    res.status(201).json({ message: 'Reflection created successfully`' });
});

app.listen(5000, () => console.log("Server started"))