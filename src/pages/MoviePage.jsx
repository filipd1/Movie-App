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
        const loadMovieData = async () => {
            try {
                const [movieData, reviewData] = await Promise.all([
                    getMovieById(id),
                    getMovieReviews(id)
                ])
                setMovie(movieData)
                setReview(reviewData)
            } catch (err) {
                console.log(err)
                setError("Failed to load movie...")
            } finally {
                setLoading(false)
            }
        }
        loadMovieData()
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