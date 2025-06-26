import MovieCard from "./MovieCard"
import "../css/MovieList.css"

function MovieList({ movieList, movieListHeader, movieNumber = null}) {


    if (movieList === null) {
        return <div className="loading">Loading movie list</div>
    }

    return (
        <>
            <h1 className="movie-list-title" >{movieListHeader}</h1>
            {movieList.length > 0 ? (
                <div className="movies-grid">
                    {(movieNumber ? movieList.slice(0, movieNumber) : movieList).map(movie => (
                        <MovieCard movie={movie} key={movie.id} pageType="favorites"/>
                    ))}
                </div>
                ) : (
                    <div className="movie-list-empty">
                        <h2>No added movies yet</h2>
                        <p>Start adding your favorite movies or TV shows</p>
                    </div>
                )}
                
        </>
    )
}

export default MovieList