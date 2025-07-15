import { useMediaContext } from "../contexts/MediaContext"
import "../css/MediaDetails.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import actorIcon from "../assets/actor-icon.svg"
import directorIcon from "../assets/director-icon.svg"
import favoriteIcon from "../assets/heart.svg"
import watchLaterIcon from "../assets/eye.svg"
import starIcon from "../assets/star.svg"
import starFilledIcon from "../assets/star-filled.svg"
import ratingIcon from "../assets/star-icon.svg"


function MediaDetails({ media, credits, images }) {
    const [lightboxImage, setLightboxImage] = useState(null)
    const [isInFavorites, setIsInFavorites] = useState(false)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [isFavoritesClicked, setIsFavoritesClicked] = useState(false)
    const [isWatchlistClicked, setIsWatchlistClicked] = useState(false)
    const [isFavoritesUnclicked, setIsFavoritesUnclicked] = useState(false)
    const [isWatchlistUnclicked, setIsWatchlistUnclicked] = useState(false)
    const [hoverRating, setHoverRating] = useState(null)
    const [userRating, setUserRating] = useState(null)

    const mediaType = media?.first_air_date ? "tv" : "movie"
    const directors = credits.crew?.filter(c => c.job === "Director")

    const {
        favorites,
        watchlist,
        ratings,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        rateMedia,
        removeRating
    } = useMediaContext()

    const userCurrentRatingObj = ratings.find(
        (item) => item.id === media.id && item.media_type === mediaType
    )
    const userCurrentRating = userCurrentRatingObj?.rating

    useEffect(() => {
        setIsInFavorites(favorites?.some(fav => fav.id === media.id) || false)
        setIsInWatchlist(watchlist?.some(w => w.id === media.id) || false)
    }, [favorites, watchlist, media.id])


    useEffect(() => {
        setUserRating(userCurrentRating)
    }, [userCurrentRating])

    const handleFavorites = () => {
        if (isInFavorites) {
            removeFromFavorites(media.id, mediaType)
            setIsFavoritesUnclicked(true)
            setTimeout(() => setIsFavoritesUnclicked(false), 400)
        } else {
            addToFavorites(media.id, mediaType)
            setIsFavoritesClicked(true)
            setTimeout(() => setIsFavoritesClicked(false), 400)
        }
    }

    const handleWatchlist = () => {
        if (isInWatchlist) {
            removeFromWatchlist(media.id, mediaType)
        } else {
            addToWatchlist(media.id, mediaType)
        }
        setIsWatchlistClicked(true)
        setTimeout(() => setIsWatchlistClicked(false), 400)
    }

    const handleRate = (value) => {
        if (userRating === value) {
            setUserRating(null)
            removeRating(media.id, mediaType)
        } else {
            setUserRating(value)
            rateMedia(media.id, mediaType, value)
        }
    }

    return (
        <div className="movie-details">
        
            <div className={`bg-image ${media.backdrop_path ? "" : "no-bg-img"}`}>
                {media.backdrop_path && <img src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`} alt={media.title} />}
            </div>
            
            <div className="movie-poster-wrapper">
                <img
                    src={media.poster_path
                        ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                        : "/poster_placeholder.png"}
                    alt={media.title}
                />
            </div>

            <div className="movie-desc">
                <div className="movie-genres-wrapper">{media.genres?.map((m, i) => (
                        <p className="movie-genre" key={i}>{m.name}</p>
                    ))}
                </div>

            <div className="movie-director">
                <img src={directorIcon} alt="director-icon" />
                
                {media.title && directors && directors.length > 0 ? (
                    directors.map((d, i) => (
                        <Link key={i} to={`/person/${d.id}`}>{d.name}</Link>
                    ))
                ) : media.created_by && media.created_by.length > 0 ? (
                    media.created_by.map((c, i) => (
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
                
            <p className="movie-overview">{media.overview}</p>

            <div className="movie-votes">
                <p className={`vote-average ${media.vote_average >= 6.5 ? "high" : (media.vote_average < 4 ? "low" : "mid")}`}>
                    {media.vote_average != null
                        ? media.vote_average.toFixed(1)
                        : "N/A"
                    }
                </p>
                <p>{media.vote_count} votes</p>
            </div>

            <div className="movie-rating">
                <div>
                    <img src={ratingIcon} alt="rating-star" />
                    <p>Your rating: {userCurrentRating ? `${userCurrentRating}/10` : "none"}</p>
                </div>
                {Array(10).fill().map((_, index) => {
                    const starValue = index +1
                    const isFilled = hoverRating >= starValue || userRating >= starValue
                    return (
                        <img
                            key={index}
                            src={isFilled ? starFilledIcon : starIcon}
                            alt="rating-star"
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => handleRate(starValue)}
                            className="rating-star"
                        />
                    )
                })}
            </div>

            <div className="movie-buttons">
                <button onClick={handleFavorites}
                    className={`
                        ${isFavoritesClicked ? "btn-anim" : ""}
                        ${isFavoritesUnclicked ? "btn-anim-back" : ""}
                        ${isInFavorites ? "btn-clicked" : ""}
                    `}>
                    <img src={favoriteIcon} alt="favorite" />
                    <span className={isInFavorites ? "hide-text" : ""}>Add to favorites</span>
                </button>
                <button onClick={handleWatchlist}
                    className={`
                        ${isWatchlistClicked ? "btn-anim" : ""}
                        ${isWatchlistUnclicked ? "btn-anim-back" : ""}
                        ${isInWatchlist ? "btn-clicked" : ""}
                        `}>
                    <img src={watchLaterIcon} alt="watch later" />
                    <span>{isInWatchlist ? "" : "Add to watchlist"}</span>
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

export default MediaDetails