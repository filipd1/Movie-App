import MediaChart from "../components/MediaChart";
import { useState, useEffect } from "react";
import { getPopularTVSeriesMultiPages } from "../services/api";

function PopularTVSeries() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const moviesData = await getPopularTVSeriesMultiPages() 
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
        document.title = "Now popular TV Series"
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

export default PopularTVSeries