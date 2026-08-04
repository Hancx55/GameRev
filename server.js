import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";

const app = express();

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

//OAuth token
async function getIGDBToken() {
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "client_credentials"
        })
    });

    const data = await res.json();
    return data.access_token;
}

app.get("/search", async (req, res) => {
    const query = req.query.query;

    try {
        console.log(query);
        const token = await getIGDBToken();

        const response = await fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: `
            fields name, cover.url, first_release_date, summary, rating, platforms.name;
            search "${query}";
            limit 20;
            `
        });

        const data = await response.json();
        res.json(data); // send json to front end
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: "search failed.."});
    }
});

app.use(express.static("frontend"));

app.listen(3000, () => console.log("server running on port 3000"));