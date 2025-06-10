import "../css/MovieDetails.css"

function MovieDetails({movie, reviews}) {

    return (
        <div className="movie-page-container">
            <div className="movie-page-container-left">
                <h1 className="movie-page-title">{movie.title}</h1>
                <p className="movie-page-text">{movie.release_date?.split('-')[0]}</p>
                <p className="movie-page-text movie-page-subtitle">{movie.tagline}</p>
                <div className="movie-page-votes">
                    <p className={`movie-page-text ${movie.vote_average >= 6 ? "vote-avg-high" : "vote-avg-low"}`}>Vote Average: {movie.vote_average}</p>
                    <p className="movie-page-text">Vote Count: {movie.vote_count}</p>
                </div>
                <p className="movie-page-text">Popularity: {movie.popularity}</p>
                <div className="movie-page-text">Producent: {movie.production_companies.map((company, i) => (
                    <span key={i}>{company.name} {company.origin_country}, </span>
                    ))}
                </div>
                <p className="movie-page-text">{movie.overview}</p>
                <div>
                    <p className="movie-page-text">Reviews</p>
                    {reviews.results?.map((review, i) => (
                        <div key={i} className="movie-page-review">
                            <p className="review-author">{review.author}</p>
                            <p className="review-content">{review.content.slice(0, 200) + "..."}</p>
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