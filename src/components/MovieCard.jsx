import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { Link } from "react-router-dom"

function MovieCard({movie}) {
    const {addItem, removeItem, isAdded} = useMovieContext()

    const mediaType = movie.first_air_date ? "tv" : "movie"

    const isPerson = movie.media_type === "person"
    const isTV = movie.media_type === "tv" || movie.name
    const isMovie = movie.media_type === "movie"

    const imagePath = isPerson
        ? movie.profile_path
        : movie.poster_path

    const title = isPerson
        ? movie.name
        : movie.title || movie.name

    const year = isPerson
        ? ""
        : movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || ""

    const linkPath = isPerson
        ? `/person/${movie.id}`
        : isTV
        ? `/tv/${movie.id}`
        : `/movie/${movie.id}`

    function onButtonClick(e) {
    e.preventDefault()
    if (isAdded(movie.id, mediaType, "favorites")) {
        removeItem(movie.id, mediaType, "favorites")
    } else {
        addItem({ ...movie, media_type: mediaType }, "favorites")
    }
    }

    return (
        <Link to={linkPath}>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={
                        imagePath
                        ? `https://image.tmdb.org/t/p/w500${imagePath}`
                        : "/poster_placeholder.png"
                    }
                    alt={title} />
                    <div className="movie-overlay">
                        <button
                            className={
                                `favorite-btn ${isAdded(movie.id, mediaType, "favorites") ? "active" : ""}`
                            }
                            onClick={onButtonClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{title}</h3>
                    <p>{year}</p>
                </div>
            </div>
        </Link> 
    )

}

export default MovieCard