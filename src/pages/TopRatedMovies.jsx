import { useState, useEffect } from "react"
import { getTopMoviesMultiPages } from "../services/api"
import MediaChart from "../components/MediaChart"

function TopRatedMovies() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const loadData = async () => {
        try {
            const moviesData = await getTopMoviesMultiPages()
            setMovies(moviesData)
            setError(false)
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
        <MediaChart movies={movies} header="Top rated movies of all time"/>
      )}
    </div>
    )
}

export default TopRatedMovies