import MovieCard from "./MovieCard"
import { Link } from "react-router-dom"
import "../css/MovieList.css"

function MovieList({ movieList, movieListHeader, movieNumber = null, URLto}) {


    if (movieList === null) {
        return <div className="loading">Loading movie list</div>
    }

    return (
        <>
            <Link to={URLto}><h2 className="movie-list-title" >{movieListHeader}</h2></Link>
            {movieList.length > 0 ? (
                <div className="movies-grid">
                    {(movieNumber ? movieList.slice(0, movieNumber) : movieList).map(movie => (
                        <MovieCard movie={movie} key={movie.id} pageType="favorites"/>
                    ))}
                </div>
                ) : (
                    <div className="movie-list-empty">
                        <h2>No movies found</h2>
                    </div>
                )}
                
        </>
    )
}

export default MovieList