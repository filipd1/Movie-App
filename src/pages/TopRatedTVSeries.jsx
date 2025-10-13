import { useState, useEffect } from "react"
import { getTopTVSeriesMultiPages } from "../services/api"
import MediaChart from "../components/MediaChart"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function TopRatedMovies() {

    const [tv, setTV] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { language } = useLanguage()
    const t = translations[language]

    useEffect(() => {
    const loadData = async () => {
      try {
        const tvData = await getTopTVSeriesMultiPages()
        setTV(tvData)
        setError(null)
        console.log(tvData)
      } catch (err) {
        console.log(err)
        setError("Failed to load tv series...")
      } finally {
        setLoading(false)
      }
    }
      loadData()
      document.title = t.topRatedTVSeries
    }, [])

    return (

    <div className="container">
      {error && <div>{error}</div>}
      {loading ? (
        <Loading/>
      ) : (
        <MediaChart movies={tv} header={t.topRatedTVSeries}/>
      )}
    </div>
    )
}

export default TopRatedMovies