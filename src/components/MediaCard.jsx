import "../css/MediaCard.css"
import { getMovieById, getTVSeriesById } from "../services/api"
import { MediaContext } from "../contexts/MediaContext"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import watchLaterIcon from "../assets/eye.svg"
import ratingIcon from "../assets/star-filled.svg"
import Toast from "./Toast"

function MediaCard({movie, pageType = "home"}) {
    const {
        favorites,
        watchlist,
        ratings,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist
    } = useContext(MediaContext)

    const [isInFavorites, setIsInFavorites] = useState(false)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [toastVisible, setToastVisible] = useState(false)
    const [genres, setGenres] = useState(movie.genres || [])

    const mediaType = movie.first_air_date ? "tv" : "movie"

    const isPerson = movie.media_type === "person"
    const isTV = movie.media_type === "tv" || movie.name

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

        const loadGenres = async () => {
            try {
                if (!movie.genres || movie.genres.length === 0) {
                    const fullDetails = mediaType === "tv"
                        ? await getTVSeriesById(movie.id)
                        : await getMovieById(movie.id)
                    setGenres(fullDetails.genres || [])
                }
            } catch (err) {
                console.log("Error fetching genres:", err)
            }
        }

        if (favorites) {
            setIsInFavorites(favorites.some(fav => fav.id === movie.id))
        }
        if (watchlist) {
            setIsInWatchlist(watchlist.some(watch => watch.id === movie.id))
        }
        loadGenres()
    }, [favorites, watchlist, movie.id, mediaType])

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
                        {(pageType === "home" || pageType === "watchlist") &&
                            <>
                                <div className="overlay-rating">
                                    <img src={ratingIcon} alt="rating-icon" />
                                    <p>{movie.vote_average.toFixed(1)}</p>

                                </div>
                                    <div className="overlay-genres-wrapper">{genres.map((g, i) => (
                                        <p className="overlay-genre" key={i}>{g.name}</p>
                                        ))}
                                </div>
                            </>
                        }

                        {pageType === "favorites" && 
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
                        }
                        
                        {pageType === "watchlist" && 
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
                        }
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

export default MediaCard