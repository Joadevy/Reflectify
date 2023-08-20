// src/server/index.ts
import express from "express"
const PORT = process.env.PORT || 5000
// import { api } from "./api"

const app = express()
// app.use(api)

app.use('/api', (req, res) => {
    res.json({ message: 'dear user, I\'m the server!' });
});

app.listen(5000, () => console.log("Server started"))