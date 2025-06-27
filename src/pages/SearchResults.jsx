import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { searchMedia } from "../services/api"
import MovieCard from "../components/MovieCard"

function SearchResults() {

    const [searchResults, setSearchResults] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const query = new URLSearchParams(location.search).get("q")

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setSearchResults([])
                setLoading(false)
                return
            }
            setLoading(true)
            try {
                const results = await searchMedia(query)
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
        fetchSearchResults()
    }, [query])

    useEffect(() => {
      if (query) {
         document.title = `Search for: ${query}`
      } else {
         document.title = "Loading..."
      }
    }, [query])

    const filteredSearchResults = searchResults.sort(
        (a,b) => b.vote_count - a.vote_count
    )

    return (
    <div className="container">
        <h2>Search results for: <i>{query}</i></h2>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
        <div className="loading">Loading...</div>
            ) : (
              <div className="movies-grid">
                {searchResults.length > 0 ? (
                  filteredSearchResults.map(movie => (
                    (movie.profile_path || movie.poster_path) &&
                      <MovieCard movie={movie} key={movie.id}/>
                  ))
                ) : (
                  <p>No matching movies</p>
                )}
              </div>
          )}
    </div>
  )
}
    


export default SearchResults