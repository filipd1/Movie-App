import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies } from "../services/api"
import "../css/Home.css"
import MovieList from "../components/MovieList"
import { getPopularMovies, getPopularTVSeries } from "../services/api"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [popularMovies, setPopularMovies] = useState([])
  const [popularTVSeries, setPopularTVSeries] = useState([])

  const filteredSearchResults = searchResults.sort(
    (a,b) => b.vote_count - a.vote_count
  )

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
              <h2>Search results</h2>
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
              <MovieList movieList={popularMovies} movieListHeader="Tranding movies" movieNumber={6}/>
              <MovieList movieList={popularTVSeries} movieListHeader="Tranding series" movieNumber={6}/>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Home
