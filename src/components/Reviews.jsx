import { Link } from "react-router-dom"
import reviewsIcon from "../assets/review.svg"
import "../css/Reviews.css"

function Reviews({reviews, mediaType}) {


    const sortedReviews = reviews?.results.slice().sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });


    return (
        <div className="reviews-container">

            <div className="flex">
                <img src={reviewsIcon} alt="reviews-icon" />
                <h2 className="container-title">Reviews</h2>
            </div>
            
            {sortedReviews.length > 0 ? (
                <div className="reviews-list">
                    {sortedReviews.map((review, i) => (
                        <div key={i} className="movie-review">
                            <strong>{review.author}</strong>
                            <p className="review-content">
                                {review.content.length > 350 ? (
                                    <>
                                        {review.content.slice(0, 350) + "..."}
                                        <Link to={review.url} target="_blank" className="review-link"> read more</Link>
                                    </>
                                    ) : (
                                        review.content
                                    )}
                            </p>
                            <p className="review-content review-created">
                                {review.created_at.replace("T", " ").split(".")[0]}
                            </p>
                        </div>
                ))}
                </div>

            ) : (
                <p>No reviews for this {mediaType}</p>
            )}  
                      
        </div>
    )

}

export default Reviews