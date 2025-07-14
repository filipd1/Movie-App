import { useEffect, useState } from "react"
import MediaChart from "../components/MediaChart.jsx"
import { getPopularMoviesMultiPages } from "../services/api.js"

function PopularMovies() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const moviesData = await getPopularMoviesMultiPages()
                setMovies(moviesData)
                setError(false)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies")
            } finally {
                setLoading(false)
            }
        }
        loadData()
        document.title = "Now popular movies"
    }, [])

    return (
        <div className="container">
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <MediaChart movies={movies} header="Now popular movies"/>
            )}
        </div>
    )
}

export default PopularMovies