import { useMovieContext } from "../contexts/MovieContext"
import "../css/MovieDetails.css"
import { Link } from "react-router-dom"
import ActorCard from "./ActorCard"

function MovieDetails({movie, reviews, credits}) {
    const {addFavorites, removeFavorites, isFavorite} = useMovieContext()
    const favorite = isFavorite(movie.id)

        function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFavorites(movie.id)
            else addFavorites(movie)
    }

    return (
        <>
            <div className="movie-page-details">
                <div className="movie-page-container-left">
                    <h1 className="movie-page-title">{movie.title}</h1>
                    <p>{movie.release_date?.split('-')[0]}</p>
                    <p className="movie-page-subtitle">{movie.tagline}</p>

                    <div className="movie-page-flex">{movie.genres?.map((m, i) => (
                            <p className="movie-page-genres" key={i}>{m.name}</p>
                        ))}
                    </div>

                    <div className="movie-page-votes">
                        <p className={`vote-avg ${movie.vote_average >= 6 ? "high" : "low"}`}>Vote Average: {movie.vote_average}</p>
                        <p>Vote Count: {movie.vote_count}</p>
                    </div>

                    <p>Popularity: {movie.popularity}</p>
                    <div className="movie-page-flex">Producent: {movie.production_companies?.map((company, i) => (
                        <p key={i}>{company.name} {company.origin_country}, </p>
                        ))}
                    </div>

                    <p>{movie.overview}</p>
                    <ActorCard movie={movie} credits={credits}/>
                </div>

                <div className="movie-page-container-right">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                </div>
            </div>

            <div className="movie-page-reviews">
                <p>Reviews</p>
                {reviews.results?.map((review, i) => (
                    <div key={i} className="movie-review">
                        <p className="review-author">{review.author}</p>
                        <p className="review-content">{review.content.slice(0, 200) + "..."}<Link to={review.url} target="blank" className="review-link"> read more</Link></p>
                        <p className="review-content review-created">{review.created_at.replace("T", " ").split(".")[0]}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MovieDetails