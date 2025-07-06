const express = require("express")
const axios = require("axios")
const cors = require("cors")
const connectDB = require("./connect")
const User = require("./models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("./middlewares/auth")
require("dotenv").config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

const fetchFromTMDB = async (url, res) => {
    try {
        const response = await axios.get(`${BASE_URL}${url}`, {
            params: { api_key: API_KEY }
        })
        res.json(response.data)
    } catch (error) {
        const status = error.response?.status || 500
        const message = error.response?.data?.status_message || "Error fetching data from TMDB"
        res.status(status).json({ error: message })
    }
}

const fetchMultiplePagesFromTMDB = async (endpoint, totalPages, res) => {
    try {
        const allResults = []

        for (let page = 1; page <= totalPages; page++) {
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                params: {
                    api_key: API_KEY,
                    page: page
                }
            })
            allResults.push(...response.data.results)
        }

        res.json({ results: allResults })
    } catch (error) {
        const status = error.response?.status || 500
        const message = error.response?.data?.status_message || "Error fetching multiple pages from TMDB"
        res.status(status).json({ error: message })
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
app.get("/api/movie/:id/videos", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/videos`, res))

app.get("/api/tv/popular", (req, res) => fetchFromTMDB("/tv/popular", res))
app.get("/api/tv/top", (req, res) => fetchFromTMDB("/tv/top_rated", res))
app.get("/api/tv/:id", (req, res) => fetchFromTMDB(`/tv/${req.params.id}`, res))
app.get("/api/tv/:id/reviews", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/reviews`, res))
app.get("/api/tv/:id/credits", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/aggregate_credits`, res))
app.get("/api/tv/:id/similar", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/similar`, res))
app.get("/api/tv/:id/images", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/images`, res))
app.get("/api/tv/:id/videos", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/videos`, res))

app.get("/api/person/:id", (req, res) => fetchFromTMDB(`/person/${req.params.id}`, res))
app.get("/api/person/:id/credits", (req, res) => fetchFromTMDB(`/person/${req.params.id}/combined_credits`, res))

app.get("/api/movie/top/multi", (req, res) => {
    const pages = parseInt(req.query.pages) || 1
    fetchMultiplePagesFromTMDB("/movie/top_rated", pages, res)
})

app.get("/api/tv/top/multi", (req, res) => {
    const pages = parseInt(req.query.pages) || 1
    fetchMultiplePagesFromTMDB("/tv/top_rated", pages, res)
})

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

app.post("/api/register", async (req,res) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" })
        }

        const newUser = new User({ username, email, password })
        await newUser.save()

        res.status(201).json({ message: "User successfully registered" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
})

app.post("/api/login", async (req,res) => {
    try {
        const { username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        )

        res.status(200).json({ message: "Login successful", token, user: { id: user._id, username: user.username} })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
})

app.get("/api/users/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password")
        if (!user) return res.status(404).json({ message: "User not found" })

        res.json(user)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))