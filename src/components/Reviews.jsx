import reviewsIcon from "../assets/review.svg"
import { useState } from "react"
import "../css/Reviews.css"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function Reviews({ reviews, mediaType }) {
    const [expandedIndex, setExpandedIndex] = useState(null)

    const { language } = useLanguage()
    const t = translations[language]


    const sortedReviews = reviews?.results.slice().sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    })
    
    return (
        <div className="reviews-container">
            <div className="flex">
                <img src={reviewsIcon} alt="reviews-icon" />
                <h2 className="container-title">{t.movieDetailsReviews}</h2>
            </div>

            {sortedReviews.length > 0 ? (
                <div className="reviews-list">
                    {sortedReviews.map((review, i) => (
                        <div key={i} className="movie-review">
                            <strong>{review.author}</strong>
                            <div className="review-content">
                                {review.content.length > 350 ? (
                                    expandedIndex === i ? (
                                        <p>{review.content}</p>
                                    ) : (
                                        <>
                                            <p>{review.content.slice(0, 350)}...</p>
                                            <button
                                                className="read-more-btn"
                                                onClick={() => setExpandedIndex(i)}
                                            >
                                                read more
                                            </button>
                                        </>
                                    )
                                ) : (
                                    <p>{review.content}</p>
                                )}
                            </div>
                            <p className="review-content review-created">
                                {review.created_at.replace("T", " ").split(".")[0]}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="component-empty">{t.movieDetailsReviewsEmpty}</p>
            )}
        </div>
    )
}

export default Reviews;
