import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMovieById, getMovieReviews, getMovieCredits, getSimilarMovies, getMovieImages, getMovieVideos, getUserRatings } from "../services/api"
import MediaDetails from "../components/MediaDetails"
import Cast from "../components/Cast"
import Reviews from "../components/Reviews"
import Similar from "../components/Similar"
import Gallery from "../components/Gallery"
import UserRatings from "../components/UserRatings"
import "../css/MediaPage.css"

function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState([])
    const [review, setReview] = useState([])
    const [credits, setCredits] = useState([])
    const [images, setImages] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [movieVideos, setMovieVideos] = useState([])
    const [userRatings, setUserRatings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loadMovieData = async () => {
            try {
                const [movieData, reviewData, creditsData, similarMovieData, movieImagesData, movieVideosData, ratingsData ] = await Promise.all([
                    getMovieById(id),
                    getMovieReviews(id),
                    getMovieCredits(id),
                    getSimilarMovies(id),
                    getMovieImages(id),
                    getMovieVideos(id),
                    getUserRatings()
                ])
                setMovie(movieData)
                setReview(reviewData)
                setCredits(creditsData)
                setSimilarMovies(similarMovieData)
                setImages(movieImagesData)
                setMovieVideos(movieVideosData)
                setUserRatings(ratingsData)
                console.log(ratingsData)
            } catch (err) {
                console.log(err)
                setError("Failed to load movie...")
            } finally {
                setLoading(false)
            }
        }
        loadMovieData()
        window.scrollTo(0,0)
    }, [id])

    useEffect(() => {
      if (movie?.title) {
         document.title = movie.title
      } else {
         document.title = "Loading..."
      }
    }, [movie])

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <div className="container">
                    <div className="movie-title-wrapper"> 
                        <h5 className="media-type">Movie</h5>
                        <h1 className="movie-title">{movie.title}</h1>
                        <p className="movie-subtitle">{movie.tagline}</p>

                        <div className="flex">
                            <p className="movie-time" title={movie.release_date}>{movie.release_date?.split('-')[0]}</p>
                            <p className="movie-time">{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}</p>
                        </div>
                        
                    </div>

                    <MediaDetails
                        media={movie}
                        credits={credits}
                        images={images}
                    />
                    <Cast movie={movie} credits={credits}/>
                    <div className="movie-media-wrapper">
                        <Gallery videos={movieVideos} photos={images}/>
                        <Similar movie={similarMovies}/>
                    </div>
                    <Reviews reviews={review} mediaType="movie"/>
                    <UserRatings ratings={userRatings}/>
                </div>
                )}
        </>
    )

}

export default MoviePage