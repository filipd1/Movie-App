import { Link } from "react-router-dom"
import { useState } from "react"
import "../css/Reviews.css"

function Reviews({reviews}) {

    const [loadMoreClicked, setloadMoreClicked] = useState(false)

    function handleLoadMore() {
        setloadMoreClicked(prev => !prev)
    }


    return (
        <div className="reviews-container">
            <h2>Reviews</h2>
            {reviews?.results?.length > 0 ? (
                loadMoreClicked ? (
                    reviews.results?.map((review, i) => (
                        <div key={i} className="movie-review">
                            <p className="review-author">{review.author}</p>
                            <p className="review-content">
                                {review.content.slice(0, 200) + "..."}
                                <Link to={review.url} target="blank" className="review-link"> read more</Link>
                            </p>
                            <p className="review-content review-created">
                                {review.created_at.replace("T", " ").split(".")[0]}
                            </p>
                        </div>
                ))
                ) : (
                    reviews.results?.slice(0, 3).map((review, i) => (
                        <div key={i} className="movie-review">
                            <p className="review-author">{review.author}</p>
                            <p className="review-content">
                                {review.content.slice(0, 200) + "..."}
                                <Link to={review.url} target="blank" className="review-link"> read more</Link>
                            </p>
                            <p className="review-content review-created">
                                {review.created_at.replace("T", " ").split(".")[0]}
                            </p>
                        </div>
                ))
                )

            ) : (
                <p>No reviews for this movie</p>
            )}

            {!loadMoreClicked && reviews?.results?.length > 3 && <button className="show-more-reviews" onClick={handleLoadMore}>Show more</button>}
            

        </div>
    )

}

export default Reviews