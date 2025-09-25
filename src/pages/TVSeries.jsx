import { getPopularTVSeries, getTopTVSeries } from "../services/api"
import { useState, useEffect } from "react"
import MediaList from "../components/MediaList"
import Loading from "../components/Loading"

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

    useEffect(() => {
        document.title = "TV Series"
    }, [])
    
    return (
        <div className="container">
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <Loading/>
            ) : (
                    <>
                        <MediaList mediaList={popularTVSeries} mediaListHeader="Now popular series" mediaNumber={6} URLto="/popular-tvseries"/>
                        <MediaList mediaList={topTVSeries} mediaListHeader="Top rated series" mediaNumber={6} URLto="/top-tvseries"/>
                    </>
                )}
        </div>
    )
}

export default TVSeries