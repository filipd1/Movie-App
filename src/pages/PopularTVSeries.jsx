import MediaChart from "../components/MediaChart";
import { useState, useEffect } from "react";
import { getPopularTVSeriesMultiPages } from "../services/api";
import Loading from "../components/Loading";
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function PopularTVSeries() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const { language } = useLanguage()
    const t = translations[language]

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
        document.title = t.popularTVSeries
    }, [])

    return (
        <div className="container">
            {error && <div>{error}</div>}
            {loading ? (
                <Loading/>
            ) : (
                <MediaChart movies={movies} header={t.popularTVSeries}/>
            )}
        </div>
    )
}

export default PopularTVSeries