import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";

const app = express();
const apiKey = process.env.MYAPIKEY;

app.get("/search", async (req, res) => {
    const query = req.query.query;
    

    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&ordering=-rating`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); // send json to front end
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: "search failed"});
    }
});

app.use(express.static("frontend"));

app.listen(3000, () => console.log("server running on port 3000"));