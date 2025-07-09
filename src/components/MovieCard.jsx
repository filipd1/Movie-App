import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import watchLaterIcon from "../assets/eye.svg"
import Toast from "./Toast"

function MovieCard({movie, pageType}) {
    const {
        favorites,
        watchlist,
        ratings,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist
    } = useMovieContext()

    const {userLoggedIn} = useContext(AuthContext)

    const [isInFavorites, setIsInFavorites] = useState(false)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [toastVisible, setToastVisible] = useState(false)

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

    const userCurrentRatingObj = ratings.find(
        (item) => item.id === movie.id && item.media_type === mediaType
    )
    const userCurrentRating = userCurrentRatingObj?.rating

    useEffect(() => {
        if (favorites) {
            setIsInFavorites(favorites.some(fav => fav.id === movie.id))
        }
        if (watchlist) {
            setIsInWatchlist(watchlist.some(watch => watch.id === movie.id))
        }
    }, [favorites, watchlist, movie.id])

    const handleFavorites = () => {
        if (isInFavorites) {
            removeFromFavorites(movie.id, mediaType)
        } else {
            addToFavorites(movie.id, mediaType)
        }
        setToastVisible(true)
        setTimeout(() => {
            setToastVisible(false)
        }, 2000)
    }

    const handleWatchlist = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie.id, mediaType)
        } else {
            addToWatchlist(movie.id, mediaType)
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
                        {pageType === "favorites" ? (
                            userLoggedIn &&
                                <button
                                    className={
                                        `favorite-btn ${isInFavorites ? "active" : ""}`
                                    }
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleFavorites()
                                        }}
                                >
                                    ♥
                                </button>
                        ) : (
                            pageType === "watchlist" && (
                                <button
                                    className={
                                        `favorite-btn ${isInWatchlist ? "active" : ""}`
                                    }
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleWatchlist()
                                    }}
                                >
                                    <img src={watchLaterIcon} alt="eye icon" />
                                </button>
                            )
                        )}

                    </div>
                </div>
                {userCurrentRating &&
                    <p
                        className={`user-rating ${userCurrentRating >= 6.5 ?
                        "high" : 
                        (userCurrentRating < 4 ? "low" : "mid")}`}>{userCurrentRating}
                    </p>
                }
                <div className="movie-info">
                    <h3>{title}</h3>
                    <p>{year}</p>
                </div>
            </div>
            <Toast message={!isInFavorites ? "Removed!" : "Added!"} visible={toastVisible} />
        </Link> 
    )

}

export default MovieCard