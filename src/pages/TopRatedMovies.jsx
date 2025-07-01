import { useState, useEffect } from "react"
import { getTopMoviesMultiPages } from "../services/api"
import MovieChart from "../components/MovieChart"

function TopRatedMovies() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const loadData = async () => {
        try {
            const moviesData = await getTopMoviesMultiPages()
            setMovies(moviesData)
            setError(null)
            console.log(moviesData)
        } catch (err) {
            console.log(err)
            setError("Failed to load movies...")
        } finally {
            setLoading(false)
        }
    }
        loadData()
        document.title = "Top Rated Movies"
    }, [])

    return (

    <div className="container">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <MovieChart movies={movies}/>
      )}
    </div>
    )
}

export default TopRatedMovies