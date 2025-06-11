import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies, getTopMovies } from "../services/api"
import { Link } from "react-router-dom"
import "../css/Home.css"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const popularMoviesData = await getPopularMovies()
        setPopularMovies(popularMoviesData)
        const topMoviesData = await getTopMovies()
        setTopMovies(topMoviesData)
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

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setIsSearching(true)
    try {
      const results = await searchMovies(searchQuery)
      setSearchResults(results)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("No matching movies")
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = async () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
    setLoading(true)
    try {
      const popularMoviesData = await getPopularMovies()
      setPopularMovies(popularMoviesData)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to load movies...")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movie.."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
        {isSearching && (
          <button type="button" onClick={clearSearch}>
            Clear search
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {isSearching ? (
            <>
              <h1 className="home-title">Search results</h1>
              <div className="movies-grid">
                {searchResults.length > 0 ? (
                  searchResults.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                      <MovieCard movie={movie} />
                    </Link>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="home-title">Today popular movies</h1>
              <div className="movies-grid">
                {popularMovies.slice(0, 8).map(movie => (
                  <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </div>

              <h1 className="home-title">Top rated movies</h1>
              <div className="movies-grid">
                {topMovies.slice(0, 8).map(movie => (
                  <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Home
