import { useState, useEffect } from "react"
import { getTopTVSeriesMultiPages } from "../services/api"
import MovieChart from "../components/MovieChart"

function TopRatedMovies() {

    const [tv, setTV] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const loadData = async () => {
        try {
            const tvData = await getTopTVSeriesMultiPages()
            setTV(tvData)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to load tv series...")
        } finally {
            setLoading(false)
        }
    }
        loadData()
        document.title = "Top Rated TV Series"
    }, [])

    return (

    <div className="container">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <MovieChart movies={tv}/>
      )}
    </div>
    )
}

export default TopRatedMovies