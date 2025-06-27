import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMedia } from "../services/api"
import "../css/Home.css"
import MovieList from "../components/MovieList"
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
    document.title = "Rate Your Movie"
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
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <MovieList movieList={popularMovies} movieListHeader="Tranding movies" movieNumber={6}/>
          <MovieList movieList={popularTVSeries} movieListHeader="Tranding series" movieNumber={6}/>
        </>
      )}
    </div>
  )
}

export default Home
