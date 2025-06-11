import "../css/MovieDetails.css"
import { Link } from "react-router-dom"

function MovieDetails({movie, reviews}) {

    return (
        <div className="movie-page-container">
            <div className="movie-page-container-left">
                <h1 className="movie-page-title">{movie.title}</h1>
                <p>{movie.release_date?.split('-')[0]}</p>
                <p className="movie-page-subtitle">{movie.tagline}</p>
                <div className="movie-page-votes">
                    <p className={`${movie.vote_average >= 6 ? "vote-avg-high" : "vote-avg-low"}`}>Vote Average: {movie.vote_average}</p>
                    <p>Vote Count: {movie.vote_count}</p>
                </div>
                <p>Popularity: {movie.popularity}</p>
                <div>Producent: {movie.production_companies?.map((company, i) => (
                    <span key={i}>{company.name} {company.origin_country}, </span>
                    ))}
                </div>
                <p>{movie.overview}</p>
                <div>
                    <p>Reviews</p>
                    {reviews.results?.map((review, i) => (
                        <div key={i} className="movie-page-review">
                            <p className="review-author">{review.author}</p>
                            <p className="review-content">{review.content.slice(0, 200) + "..."}<Link to={review.url} target="blank" className="review-link"> read more</Link></p>
                            <p className="review-content review-created">{review.created_at.replace("T", " ").split(".")[0]}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="movie-page-container-right">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
        </div>
    )
}

export default MovieDetails