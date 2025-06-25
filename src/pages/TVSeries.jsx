import { getPopularTVSeries, getTopTVSeries } from "../services/api"
import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"

function TVSeries() {

    const [popularTVSeries, setPopularTVSeries] = useState([])
    const [topTVSeries, setTopTVSeries] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const loadData = async () => {
        try {
        const popularTVsData = await getPopularTVSeries()
        setPopularTVSeries(popularTVsData)
        const topTVData = await getTopTVSeries()
        setTopTVSeries(topTVData)
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

    
    return (
        <div className="container">
        {error && <div className="error-message">{error}</div>}
        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
                <>
                    <h2 className="home-title">Now popular TV series</h2>
                    <div className="movies-grid">
                        {popularTVSeries.slice(0, 6).map(movie => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))}
                    </div>

                    <h2 className="home-title">Top rated TV series</h2>
                    <div className="movies-grid">
                        {topTVSeries.slice(0, 6).map(movie => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default TVSeries