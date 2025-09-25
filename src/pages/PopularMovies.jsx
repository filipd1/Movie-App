import { useEffect, useState } from "react"
import { getPopularMoviesMultiPages } from "../services/api.js"
import MediaChart from "../components/MediaChart.jsx"
import Loading from "../components/Loading.jsx"

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
            {error && <div>{error}</div>}
            {loading ? (
                <Loading/>
            ) : (
                <MediaChart movies={movies} header="Now popular movies"/>
            )}
        </div>
    )
}

export default PopularMovies