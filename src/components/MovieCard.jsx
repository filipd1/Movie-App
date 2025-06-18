import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { Link } from "react-router-dom"

function MovieCard({movie}) {
    const {addFavorites, removeFavorites, isFavorite} = useMovieContext()
    const favorite = isFavorite(movie.id)

    const isPerson = movie.media_type === "person"
    const isTV = movie.media_type === "tv"
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

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFavorites(movie.id)
            else addFavorites(movie)
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
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
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