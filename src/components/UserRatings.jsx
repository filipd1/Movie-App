import { useParams, useLocation } from "react-router-dom"
import starIcon from "../assets/star.svg"
import starFilledIcon from "../assets/star-filled.svg"
import ratingIcon from "../assets/ratings.svg"
import "../css/UserRatings.css"

function userRatings({ ratings }) {

    const { id } = useParams()
    const location = useLocation()

    const mediaType = location.pathname.startsWith("/movie") ? "movie" : "tv"
    const usersRatings = ratings
        .flatMap(user =>
            user.ratings
                .filter(r => r.id === Number(id) && r.media_type === mediaType)
                .map(r => ({ ...r, username: user.username }))
        )

    return (
        <>
            <div className="flex">
                <img src={ratingIcon} alt="" className="star-icon"/>
                <h2 className="container-title">All ratings for this movie</h2>
            </div>
            {usersRatings.length > 0 ? (
                <div className="user-ratings">
                    {usersRatings.map((rating, i) => (
                        <div key={i} className="rating-stars-wrapper">
                            <p>{rating.username}</p>
                            <div>
                                {Array(10).fill().map((_, i) => {
                                    return (
                                        <img
                                            key={i}
                                            src={i < rating.rating ? starFilledIcon : starIcon}
                                            alt="rating-star"
                                            className="rating-star user-ratings-star"
                                        />
                                    )
                                })}
                            </div>
                            <p>{rating.rating}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="component-empty">Be first to rate this {mediaType === "movie" ? "movie" : "TV series"}</p>
            )}

        </>
    )
}

export default userRatings