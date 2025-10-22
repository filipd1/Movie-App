import { useState, useEffect } from "react"
import { getPopularMovies, getTopMovies } from "../services/api"
import MediaList from "../components/MediaList"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function Movies() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const loadData = async () => {
      try {
        const popularMoviesData = await getPopularMovies()
        setPopularMovies(popularMoviesData)
        const topMoviesData = await getTopMovies()
        setTopMovies(topMoviesData)
        setError(null)
      } catch (err) {
        console.log(err)
        setError(t.failedLoad)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    document.title = t.navbarMovies
  }, [])

  return (
    <div className="container">
      {error && <div>{error}</div>}
      {loading ? (
        <Loading/>
      ) : (
        <>
          <MediaList mediaList={popularMovies} mediaListHeader={t.moviePage1} mediaNumber={6} URLto="/popular-movies"/>
          <MediaList mediaList={topMovies} mediaListHeader={t.moviePage2} mediaNumber={6} URLto="/top-movies"/>
        </>
      )}
    </div>
  )
}

export default Movies
