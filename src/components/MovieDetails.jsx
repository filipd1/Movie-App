import { useMovieContext } from "../contexts/MovieContext"
import "../css/MovieDetails.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import actorIcon from "../assets/actor-icon.svg"
import directorIcon from "../assets/director-icon.svg"
import favoriteIcon from "../assets/heart.svg"
import watchLaterIcon from "../assets/eye.svg"
import starIcon from "../assets/star.svg"
import starFilledIcon from "../assets/star-filled.svg"
import ratingIcon from "../assets/star-icon.svg"


function MovieDetails({ movie, credits, images }) {
    const [lightboxImage, setLightboxImage] = useState(null)
    const {addItem, removeItem, isAdded} = useMovieContext()

    const mediaType = movie.first_air_date ? "tv" : "movie"
    const directors = credits.crew?.filter(c => c.job === "Director")

    function onFavoriteClick(e) {
        e.preventDefault()
        if (isAdded(movie.id, mediaType, "favorites")) 
            removeItem(movie.id, mediaType, "favorites")
        else 
            addItem({ ...movie, media_type: mediaType }, "favorites")
    }

    function onWatchlistClick(e) {
        e.preventDefault()
        if (isAdded(movie.id, mediaType, "watchlist")) 
            removeItem(movie.id, mediaType, "watchlist")
        else 
            addItem({ ...movie, media_type: mediaType }, "watchlist")
    }

    return (
        <div className="movie-details">
        
            <div className={`bg-image ${movie.backdrop_path ? "" : "no-bg-img"}`}>
                {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />}
            </div>
            
            <div className="movie-poster-wrapper">
                <img
                    src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/poster_placeholder.png"}
                    alt={movie.title}
                />
            </div>

            <div className="movie-desc">
                <div className="movie-genres-wrapper">{movie.genres?.map((m, i) => (
                        <p className="movie-genre" key={i}>{m.name}</p>
                    ))}
                </div>

            <div className="movie-director">
                <img src={directorIcon} alt="director-icon" />
                
                {movie.title && directors && directors.length > 0 ? (
                    directors.map((d, i) => (
                        <Link key={i} to={`/person/${d.id}`}>{d.name}</Link>
                    ))
                ) : movie.created_by && movie.created_by.length > 0 ? (
                    movie.created_by.map((c, i) => (
                        <Link key={i} to={`/person/${c.id}`}>{c.name}</Link>
                    ))
                ) : (
                    <p>N/A</p>
                )}
            </div>

            <div className="movie-actors">
                <img src={actorIcon} alt="actor-icon" />
                    {credits?.cast.slice?.(0, 3).map((actor, i) => (
                        <Link key={i} to={`/person/${actor.id}`}>{actor.name}</Link>
                    ))}
            </div>
                
            <p className="movie-overview">{movie.overview}</p>

            <div className="movie-votes">
                <p className={`vote_average ${movie.vote_average >= 6.5 ? "high" : (movie.vote_average < 4 ? "low" : "mid")}`}>
                    {movie.vote_average != null
                        ? movie.vote_average.toFixed(1)
                        : "N/A"
                    }
                </p>
                <p>{movie.vote_count} votes</p>
            </div>

            <div className="movie-rating">
                <div>
                    <img src={ratingIcon} alt="rating-star" />
                    <p>Your rating</p>
                </div> 
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starFilledIcon} alt="rating-star" />
                <img src={starIcon} alt="rating-star" />
                <img src={starIcon} alt="rating-star" />
                <img src={starIcon} alt="rating-star" />
            </div>

            <div className="movie-buttons">
                <button onClick={onFavoriteClick} className={isAdded(movie.id, mediaType, "favorites") ? "btn-clicked" : ""}>
                    <img src={favoriteIcon} alt="favorite" />
                    <span>{isAdded(movie.id, mediaType, "favorites") ? "" : "Add to favorites"}</span>
                </button>
                <button onClick={onWatchlistClick} className={isAdded(movie.id, mediaType, "watchlist") ? "btn-clicked" : ""}>
                    <img src={watchLaterIcon} alt="watch later" />
                    <span>{isAdded(movie.id, mediaType, "watchlist") ? "" : "Add to watchlist"}</span>
                </button>
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