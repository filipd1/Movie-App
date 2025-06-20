import MovieCard from "./MovieCard"
import "../css/SimilarMovies.css"
import { useState } from "react"

function SimilarMovies({ movie }) {

    const [loadMoreClicked, setloadMoreClicked] = useState(false)

    function handleLoadMore() {
        setloadMoreClicked(prev => !prev)
    }

    return (
        <div className="similar-movies-container">
            <h2>Smilar movies</h2>
            <div className="similar-movies">
                {loadMoreClicked ? (
                    movie.results?.map((m,i) => (
                    <MovieCard movie={m} key={i}/>
                ))
                ) : (
                    movie.results?.slice(0,5).map((m,i) => (
                    <MovieCard movie={m} key={i}/>
                ))
                )}
                {movie.results.length > 0 ? (
                    <button
                        className="show-more-movies"
                        onClick={handleLoadMore}>{loadMoreClicked ? ("Hide") : ("Show more")}
                    </button>
                    ) : (
                        <p>No similar movies yet</p>
                    )
                }
            </div>
        </div>
    )
}

export default SimilarMovies