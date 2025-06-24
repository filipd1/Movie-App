import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies } from "../services/api"
import "../css/Home.css"
import TVSeries from "./TVSeries"
import Movies from "./Movies"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const filteredSearchResults = searchResults.sort(
    (a,b) => b.vote_count - a.vote_count
  )

  useEffect(() => {
    if (!isSearching) {
      setLoading(false)
    }
  }, [isSearching])

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
    setLoading(false)
  }

  return (
      <div className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search.."
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
          {isSearching && searchQuery.trim() !== "" ? (
            <>
              <h2 className="home-title">Search results</h2>
              <div className="movies-grid">
                {searchResults.length > 0 ? (
                  filteredSearchResults.map(movie => (
                    (movie.profile_path || movie.poster_path) &&
                      <MovieCard movie={movie} key={movie.id}/>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            </>
          ) : (
            <>
              <Movies></Movies>
              <TVSeries></TVSeries>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Home
