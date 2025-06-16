import MovieCard from "./MovieCard"
import "../css/SimilarMovies.css"

function SimilarMovies({ movie }) {
    return (
        <div className="similar-movies-container">
            <h2>Smilar movies</h2>
            <div className="similar-movies">
                {movie.results?.map((m,i) => (
                    <MovieCard movie={m} key={i}/>
                ))}
            </div>
        </div>

    )
}

export default SimilarMovies