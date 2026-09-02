import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";
import Fuse from "fuse.js";

//for url updating
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//search server setup for igdb
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

//search method for searchbar
app.get("/search", async (req, res) => {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1; 
    const limit = 20;
    const offset = (page-1) * limit; //how far in to begin results

    try {
        console.log(query);
        console.log(page);
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
            limit ${limit};
            offset ${offset};
            `
        });

        const data = await response.json();

        //tried adding fuse dont think it works
        // const fuse = new Fuse(data, {
        //     keys: ["name"],
        //     threshold: 0.1,
        //     ignoreLocation: true,
        // });

        // const results = fuse.search(query).map(r => r.item);

        res.json({page, data, moreToCome: data.length === limit}); // send json to front end
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: "search failed.."});
    }
}); 


//game info pages
app.get(`/api/game/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const token = await getIGDBToken();

        const response = await(fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: `
            fields name, cover.url, summary, first_release_date, platforms.name, rating, 
            involved_companies.company.name,
            involved_companies.developer,
            involved_companies.publisher;
            where id = ${id};
            limit 1;
            `
        }))

        const data = await response.json();  
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: "game failed.."});
    }
    
})

//sets the url for games.html to game
app.get("/games", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "games.html"));
})

//for specific game pages
app.get("/game/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "game.html"));
})

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
})

app.use(express.static("frontend"));

app.listen(3000, () => console.log("server running on port 3000"));