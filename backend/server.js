// src/server/index.ts
import express from "express"
const PORT = process.env.PORT || 5000
// import { api } from "./api"

const app = express()
// app.use(api)

app.use(express.json());

// app.get('/api', (req, res) => {
//     res.json({ message: 'dear user, I\'m the server!' });
// });

app.post('/api', (req, res) => {
    console.log(req.body)
    res.status(201).json({ message: 'Reflection created successfully`' });
});

app.listen(5000, () => console.log("Server started"))