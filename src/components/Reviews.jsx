import { Link } from "react-router-dom"
import "../css/Reviews.css"

function Reviews({reviews}) {
    return (
        <div className="reviews-container">
            {reviews?.results?.length > 0 ? (
                <div className="reviews-container">
                    <p>Reviews</p>
                    {reviews.results?.map((review, i) => (
                        <div key={i} className="movie-review">
                            <p className="review-author">{review.author}</p>
                            <p className="review-content">{review.content.slice(0, 200) + "..."}<Link to={review.url} target="blank" className="review-link"> read more</Link></p>
                            <p className="review-content review-created">{review.created_at.replace("T", " ").split(".")[0]}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews for this movie</p>
            )}
        </div>
    )

}

export default Reviews