import { useState, useEffect } from "react"
import { getTopMoviesMultiPages } from "../services/api"
import MediaChart from "../components/MediaChart"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function TopRatedMovies() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const { language } = useLanguage()
    const t = translations[language]

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
      document.title = t.topRatedMovies
    }, [])

    return (

    <div className="container">
      {error && <div>{error}</div>}
      {loading ? (
        <Loading/>
      ) : (
        <MediaChart movies={movies} header={t.topRatedMovies}/>
      )}
    </div>
    )
}

export default TopRatedMovies