import MovieCard from "./MovieCard"
import similarIcon from "../assets/similar.svg"
import "../css/SimilarMovies.css"

function SimilarMovies({ movie }) {

    return (
        <div className="similar-movies-container">
            <div className="flex">
                <img src={similarIcon} alt="similar-icon" />
                <h2 className="container-title">Similar</h2>
            </div>
            <div className="similar-movies">
                {movie.results.length > 0 ? (
                    movie.results.map((m,i) => (
                        <MovieCard movie={m} pageType="favorites" key={i}/>
                    ))
                ) : (
                    <p>Nothing here yet</p>
                )}

            </div>
        </div>
    )
}

export default SimilarMovies