import { useState, useEffect } from "react"
import "../css/Home.css"
import MediaList from "../components/MediaList"
import { getPopularMovies, getPopularTVSeries } from "../services/api"
import { useNavigate } from "react-router-dom"

function Home() {
  const [query, setQuery] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [popularMovies, setPopularMovies] = useState([])
  const [popularTVSeries, setPopularTVSeries] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        const popularMoviesData = await getPopularMovies()
        setPopularMovies(popularMoviesData)
        const popularTVSeriesData = await getPopularTVSeries()
        setPopularTVSeries(popularTVSeriesData)
        setError(null)
      } catch (err) {
        console.log(err)
        setError("Failed to load movies...")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    document.title = "FilmScope"
  }, [])

  const handleSubmit = (e) => {
      e.preventDefault()
      if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query.trim())}`)
          setQuery("")
      }
  }

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search.."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <MediaList mediaList={popularMovies} mediaListHeader="Trending movies" mediaNumber={6} URLto="/popular-movies"/>
          <MediaList mediaList={popularTVSeries} mediaListHeader="Trending series" mediaNumber={6} URLto="/popular-tvseries"/>
        </>
      )}
    </div>
  )
}

export default Home
