import { useMovieContext } from "../contexts/MovieContext"
import "../css/MovieDetails.css"
import Cast from "./Cast"
import Reviews from "./Reviews"
import SimilarMovies from "./SimilarMovies"
import { Link } from "react-router-dom"

function MovieDetails({movie, reviews, credits, similarMovies, person}) {
    const {addFavorites, removeFavorites, isFavorite} = useMovieContext()
    const favorite = isFavorite(movie.id)
    const directors = credits.crew?.filter(c => c.job === "Director")

        function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFavorites(movie.id)
            else addFavorites(movie)
    }

    return (
        <>
            <div className="movie-details">
                <div className="movie-container-left">

                    <div className="movie-title-wrapper"> 
                        <div className="flex">
                            <h1 className="movie-title">{movie.title}</h1>
                            <p className="movie-release-date">{movie.release_date?.split('-')[0]}</p>
                        </div>
                        <p className="movie-subtitle">{movie.tagline}</p>
                    </div>

                    <hr className="movie-hr"/>

                    <div className="movie-genres-wrapper">{movie.genres?.map((m, i) => (
                            <p className="movie-genre" key={i}>{m.name}</p>
                        ))}
                    </div>
                    
                    <p className="movie-overview">{movie.overview}</p>

                    {directors && directors.length > 0 && (
                        <div className="movie-director">Director: {directors.map((d, i) => (
                            <Link key={i} to={`/person/${d.id}`}>{d.name}</Link>
                            ))}
                        </div>
                    )}

                    <div className="movie-producent">Producent: {movie.production_companies?.map((company, i) => (
                        <p key={i}>{company.name},</p>
                    ))}
                    </div>

                    <Cast movie={movie} credits={credits} person={person}/>
                </div>

                <div className="movie-container-right">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                    </button>

                    <div className="movie-votes">
                        <p>Vote Count: {movie.vote_count}</p>
                        <p>Vote Average:
                            <span className={`vote_average ${movie.vote_average >= 6 ? "high" : "low"}`}>
                                {movie.vote_average.toFixed(1)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <Reviews reviews={reviews} />
            <SimilarMovies movie={similarMovies} />
        </>
    )
}

export default MovieDetails