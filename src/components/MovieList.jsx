import MovieCard from "../components/MovieCard"
import "../css/MovieList.css"

function MovieList({ movieList, movieListType}) {


    if (movieList === null) {
        return <div className="loading">Loading movie list</div>
    }

    const filteredTVSeries = movieList.filter(f => f.media_type === "tv")
    const filteredMovies = movieList.filter(f => f.media_type === "movie")

    return (
            <div className="container">
                <h1 className="movie-list-title" >{movieListType}</h1>
                {movieList.length > 0 ? (
                    <>
                        {filteredMovies.length > 0 && 
                            <>
                                <h3>Movies</h3>
                                <hr className="movie-list-hr" />
                                <div className="movies-grid">
                                    {filteredMovies.map(movie => (
                                        <MovieCard movie={movie} key={movie.id}/>
                                    ))}
                                </div>
                            </>
                        }
                        {filteredTVSeries.length > 0 && 
                            <>
                                <h3>TV Series</h3>
                                <hr className="movie-list-hr" />
                                <div className="movies-grid">
                                    {filteredTVSeries.map(movie => (
                                        <MovieCard movie={movie} key={movie.id}/>
                                    ))}
                                </div>
                            </>
                        }
                    </>
                    
                    ) : (
                        <div className="movie-list-empty">
                            <h2>No added movies yet</h2>
                            <p>Start adding your favorite movies or TV shows</p>
                        </div>
                    )}
                    
            </div>
    )
}

export default MovieList