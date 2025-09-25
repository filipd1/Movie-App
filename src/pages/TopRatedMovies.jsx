import { useState, useEffect } from "react"
import { getTopMoviesMultiPages } from "../services/api"
import MediaChart from "../components/MediaChart"
import Loading from "../components/Loading"

function TopRatedMovies() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

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
      document.title = "Top Rated Movies"
    }, [])

    return (

    <div className="container">
      {error && <div>{error}</div>}
      {loading ? (
        <Loading/>
      ) : (
        <MediaChart movies={movies} header="Top rated movies of all time"/>
      )}
    </div>
    )
}

export default TopRatedMovies