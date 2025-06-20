import { useMovieContext } from "../contexts/MovieContext"
import "../css/MovieDetails.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import actorIcon from "../assets/actor-icon.svg"
import directorIcon from "../assets/director-icon.svg"


function MovieDetails({ movie, credits, images }) {
    const [lightboxImage, setLightboxImage] = useState(null)

    const {addFavorites, removeFavorites, isFavorite} = useMovieContext()
    const favorite = isFavorite(movie.id)
    const directors = credits.crew?.filter(c => c.job === "Director")

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFavorites(movie.id)
            else addFavorites(movie)
    }

    return (
        <div className="movie-details">
            <div className="movie-poster-wrapper">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                </button>
            </div>

            <div className="movie-desc">
                <div className="movie-genres-wrapper">{movie.genres?.map((m, i) => (
                        <p className="movie-genre" key={i}>{m.name}</p>
                    ))}
                </div>

                {directors && directors.length > 0 && (
                    <div className="movie-director">
                        <img src={directorIcon} alt="director-icon" />
                        {directors.map((d, i) => (
                            <Link key={i} to={`/person/${d.id}`}>{d.name}</Link>
                        ))}
                    </div>
                )}

                <div className="movie-actors">
                    <img src={actorIcon} alt="actor-icon" />
                    {credits?.cast.slice(0, 3).map((actor, i) => (
                        <Link key={i} to={`/person/${actor.id}`}>{actor.name}</Link>
                    ))}
                </div>
                
                <p className="movie-overview">{movie.overview}</p>

                <div className="movie-votes">
                    <p className={`vote_average ${movie.vote_average >= 6 ? "high" : "low"}`}>
                        {movie.vote_average.toFixed(1)}
                    </p>
                    <p>{movie.vote_count} votes</p>
                </div>


            </div>

            <div className="movie-media">
                {images?.backdrops.slice(0, 8).map((image, i) => (
                    <img
                        key={i}
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt={`image.title img-${i}`}
                        onClick={() => setLightboxImage(`https://image.tmdb.org/t/p/original${image.file_path}`)}
                        className="movie-thumbnail"
                    />
                ))}

            </div>

            {lightboxImage && (
            <div className="lightbox" onClick={() => setLightboxImage(null)}>
                <img src={lightboxImage} alt="Full size" />
                <span className="close-lightbox">&times;</span>
            </div>
            )}

        </div>
    )
}

export default MovieDetails