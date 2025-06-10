import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieById, getMovieReviews } from "../services/api"
import MovieDetails from "../components/MovieDetails"

function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState([])
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loadMovieById = async () => {
            try {
                const movieId = await getMovieById(id)
                setMovie(movieId)
            } catch (err) {
                console.log(err)
                setError("Failed to load movie...")
            } finally {
                setLoading(false)
            }
        }
        loadMovieById()
    }, [id])

    useEffect(() => {
        const loadRewievs = async () => {
            try {
                const movieId = await getMovieReviews(id)
                setReview(movieId)
                console.log(movieId)
            } catch (err) {
                console.log(err)
                setError("Failed to load movie...")
            } finally {
                setLoading(false)
            }
        }
        loadRewievs()
    }, [id])

    return (
        <div className="movie-page-wrapper">
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <MovieDetails movie={movie} reviews={review}/>
                )}
        </div>
    )

}

export default MoviePage