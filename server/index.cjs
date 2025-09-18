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

app.get("/movie/popular", (req, res) => fetchFromTMDB("/movie/popular", res))
app.get("/movie/top", (req, res) => fetchFromTMDB("/movie/top_rated", res))
app.get("/movie/upcoming", (req, res) => fetchFromTMDB("/movie/upcoming", res))
app.get("/movie/:id", (req, res) => fetchFromTMDB(`/movie/${req.params.id}`, res))
app.get("/movie/:id/reviews", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/reviews`, res))
app.get("/movie/:id/credits", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/credits`, res))
app.get("/movie/:id/similar", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/similar`, res))
app.get("/movie/:id/images", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/images`, res))
app.get("/movie/:id/videos", (req, res) => fetchFromTMDB(`/movie/${req.params.id}/videos`, res))

app.get("/tv/popular", (req, res) => fetchFromTMDB("/tv/popular", res))
app.get("/tv/top", (req, res) => fetchFromTMDB("/tv/top_rated", res))
app.get("/tv/:id", (req, res) => fetchFromTMDB(`/tv/${req.params.id}`, res))
app.get("/tv/:id/reviews", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/reviews`, res))
app.get("/tv/:id/credits", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/aggregate_credits`, res))
app.get("/tv/:id/similar", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/similar`, res))
app.get("/tv/:id/images", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/images`, res))
app.get("/tv/:id/videos", (req, res) => fetchFromTMDB(`/tv/${req.params.id}/videos`, res))

app.get("/person/:id", (req, res) => fetchFromTMDB(`/person/${req.params.id}`, res))
app.get("/person/:id/credits", (req, res) => fetchFromTMDB(`/person/${req.params.id}/combined_credits`, res))

app.get("/movie/top/multi", (req, res) => {
  const pages = parseInt(req.query.pages) || 1
  fetchMultiplePagesFromTMDB("/movie/top_rated", pages, res)
})

app.get("/movie/popular/multi", (req, res) => {
  const pages = parseInt(req.query.pages) || 1
  fetchMultiplePagesFromTMDB("/movie/popular", pages, res)
})

app.get("/tv/top/multi", (req, res) => {
  const pages = parseInt(req.query.pages) || 1
  fetchMultiplePagesFromTMDB("/tv/top_rated", pages, res)
})

app.get("/tv/popular/multi", (req, res) => {
  const pages = parseInt(req.query.pages) || 1
  fetchMultiplePagesFromTMDB("/tv/popular", pages, res)
})

app.get("/search", async (req, res) => {
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

app.post("/register", async (req,res) => {
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

app.post("/login", async (req,res) => {
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
          { expiresIn: "30d" }
      )

      res.status(200).json({ message: "Login successful", token, user: { id: user._id, username: user.username} })
  } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server error" })
  }
})

app.get("/users/:username", async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username }).select("-password")
      if (!user) return res.status(404).json({ message: "User not found" })

      res.json(user)
  } catch (err) {
      res.status(500).json({ message: "Server error" })
  }
})

app.post("/users/:username/favorites", auth, async (req, res) => {
  try {
    const { id, media_type } = req.body
    if (!id || !media_type) {
      return res.status(400).json({ message: "id and media_type are required" })
    }

    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const result = await User.updateOne(
      { username: req.params.username },
      { $addToSet: { favorites: { id, media_type } } }
    )

    const updatedUser = await User.findOne({ username: req.params.username })
    res.json({ favorites: updatedUser.favorites })
  } catch (err) {
    console.error("Error adding favorite:", err)
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

app.delete("/users/:username/favorites/:media_type/:id", auth, async (req, res) => {
  try {
    const { username, media_type, id } = req.params

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: "User not found" })

    user.favorites = user.favorites.filter(fav => !(fav.id == id && fav.media_type === media_type))
    await user.save()

    res.json({ favorites: user.favorites })
  } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Server error", error: err.message })
    }
})

app.get("/users/:username/favorites", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) return res.status(404).json({ message: "User not found" })

    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/users/:username/watchlist", auth, async (req, res) => {
  try {
    const { id, media_type } = req.body
    if (!id || !media_type) {
      return res.status(400).json({ message: "id and media_type are required" })
    }

    const user = await User.findOne({ username: req.params.username })
    if (!user) return res.status(404).json({ message: "User not found" })

    const exists = user.watchlist.some(item => item.id === id && item.media_type === media_type)
    if (!exists) {
      user.watchlist.push({ id, media_type })
      await user.save()
    }

    res.json({ watchlist: user.watchlist })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/users/:username/watchlist/:media_type/:id", auth, async (req, res) => {
  try {
    const { username, media_type, id } = req.params

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: "User not found" })

    user.watchlist = user.watchlist.filter(item => !(item.id == id && item.media_type === media_type))
    await user.save()

    res.json({ watchlist: user.watchlist })
  } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Server error", error: err.message })
    }
})

app.get("/users/:username/watchlist", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) return res.status(404).json({ message: "User not found" })

    res.json({ watchlist: user.watchlist })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/users/:username/ratings", auth, async (req, res) => {
  try {
    const { id, media_type, rating } = req.body
    if (!id || !media_type || typeof rating !== "number") {
      return res.status(400).json({ message: "id, media_type and rating are required" })
    }

    const user = await User.findOne({ username: req.params.username })
    if (!user) return res.status(404).json({ message: "User not found" })

    const existingIndex = user.ratings.findIndex(item => item.id === id && item.media_type === media_type)
    if (existingIndex >= 0) {
      user.ratings[existingIndex].rating = rating
    } else {
      user.ratings.push({ id, media_type, rating })
    }

    await user.save()
    res.json({ ratings: user.ratings })
  } catch (err) {
    console.error("POST ratings error", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.delete("/users/:username/ratings/:media_type/:id", auth, async (req, res) => {
  try {
    const { username, media_type, id } = req.params

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ message: "User not found" })

    user.ratings = user.ratings.filter(rating => !(rating.id == id && rating.media_type === media_type))
    await user.save()

    res.json({ ratings: user.ratings })
  } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Server error", error: err.message })
    }
})

app.get("/users/:username/ratings", auth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("ratings")
    if (!user) return res.status(404).json({ message: "User not found" })

    res.json({ ratings: user.ratings })
  } catch (err) {
    console.error("GET ratings error", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/ratings/all", async (req, res) => {
  try {
    const usersRatings = await User.find({}, "username ratings")
    res.json( { usersRatings } )
  } catch (err) {
    console.error("Could not get ratings", err)
    res.status(500).json({ message: "Server error" })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))