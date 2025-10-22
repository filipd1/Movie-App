import { useState, useEffect } from "react"
import "../css/Home.css"
import MediaList from "../components/MediaList"
import Loading from "../components/Loading"
import { getPopularMovies, getPopularTVSeries } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function Home() {
  const [query, setQuery] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [popularMovies, setPopularMovies] = useState([])
  const [popularTVSeries, setPopularTVSeries] = useState([])

  const navigate = useNavigate()

  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const loadData = async () => {
      try {
        const popularMoviesData = await getPopularMovies()
        setPopularMovies(popularMoviesData)
        const popularTVSeriesData = await getPopularTVSeries()
        setPopularTVSeries(popularTVSeriesData)
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
    document.title = "FilmScope"
  }, [])

  const handleSubmit = (e) => {
      e.preventDefault()
      if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query.trim())}`)
          setQuery("")
      }
  }

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`${t.searchText}...`}
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">{t.searchText}</button>
      </form>

      {error && <div>{error}</div>}
      {loading ? (
        <Loading/>
      ) : (
        <>
          <MediaList mediaList={popularMovies} mediaListHeader={t.homeText1} mediaNumber={6} URLto="/popular-movies"/>
          <MediaList mediaList={popularTVSeries} mediaListHeader={t.homeText2} mediaNumber={6} URLto="/popular-tvseries"/>
        </>
      )}
    </div>
  )
}

export default Home
