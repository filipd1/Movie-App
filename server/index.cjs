const express = require("express")
const axios = require("axios")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const { createServer } = require('http');
const { readFileSync } = require('fs');

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

const fetchFromTMDB = async (url, res) => {
    try {
        const response = await axios.get(`${BASE_URL}${url}`, {
            params: { api_key: API_KEY }
        })
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: "Error fetching data from TMDB" })
    }
}

app.get("/api/movie/popular", (req, res) => fetchFromTMDB("/movie/popular", res))
app.get("/api/movie/top", (req, res) => fetchFromTMDB("/movie/top_rated", res))
app.get("/api/movie/upcoming", (req, res) => fetchFromTMDB("/movie/upcoming", res))
app.get("/api/movie/:id", (req, res) => fetchFromTMDB(`/movie/${req.params.id}`, res))
app.get("/api/movie/:id/reviews", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/reviews`, res))
app.get("/api/movie/:id/credits", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/credits`, res))
app.get("/api/movie/:id/similar", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/similar`, res))
app.get("/api/movie/:id/images", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/images`, res))

app.get("/api/tv/popular", (req, res) => fetchFromTMDB("/tv/popular", res))
app.get("/api/tv/top", (req, res) => fetchFromTMDB("/tv/top_rated", res))
app.get("/api/tv/:id", (req, res) => fetchFromTMDB(`/tv/${req.params.id}`, res))
app.get("/api/tv/:id/reviews", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/reviews`, res))
app.get("/api/tv/:id/credits", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/aggregate_credits`, res))
app.get("/api/tv/:id/similar", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/similar`, res))
app.get("/api/tv/:id/images", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/images`, res))

app.get("/api/person/:id", (req, res) => fetchFromTMDB(`/person/${req.params.id}`, res))
app.get("/api/person/:id/credits", (req, res) => fetchFromTMDB(`/person/${req.params.id}/combined_credits`, res))

app.get("/api/search", async (req, res) => {
    const query = req.query.query
    try {
        const response = await axios.get(`${BASE_URL}/search/multi`, {
            params: {
                api_key: API_KEY,
                query
            }
        })
        res.json(response.data)
    } catch (err) {
        res.status(500).json({ error: "Search failed" })
    }
})

app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
    const html = readFileSync(path.join(__dirname, "dist", "index.html"), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"))
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

console.log('Starting server...')
console.log('PORT:', PORT)
console.log('API_KEY:', API_KEY ? 'set' : 'NOT set')
console.log("__dirname:", __dirname);
console.log("DIST path:", path.join(__dirname, "dist", "index.html"));