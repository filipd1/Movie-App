import { useState, useEffect } from "react"
import { getPopularMovies, getTopMovies } from "../services/api"
import MediaList from "../components/MediaList"

function Movies() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

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
        setError("Failed to load movies...")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    document.title = "Movies"
  }, [])

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <MediaList mediaList={popularMovies} mediaListHeader="Now popular movies" mediaNumber={6} URLto="/popular-movies"/>
          <MediaList mediaList={topMovies} mediaListHeader="Top rated movies" mediaNumber={6} URLto="/top-movies"/>
        </>
      )}
    </div>
  )
}

export default Movies
