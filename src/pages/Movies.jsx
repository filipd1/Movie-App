import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { getPopularMovies, getTopMovies } from "../services/api"


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

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
              <h2 className="home-title">Now popular movies</h2>
              <div className="movies-grid">
                {popularMovies.slice(0, 6).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
              </div>

              <h2 className="home-title">Top rated movies</h2>
              <div className="movies-grid">
                {topMovies.slice(0, 6).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
              </div>
        </>
      )}
    </div>
  )
}

export default Movies
