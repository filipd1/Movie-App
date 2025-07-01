import MovieCard from "./MovieCard"
import { useLocation } from "react-router-dom"

function AddedMoviesList({ movieList, movieListType}) {

    const location = useLocation()
    let pageType

    if (location.pathname.includes("favorites")) {
        pageType = "favorites"
    } else if (location.pathname.includes("watchlist")) {
        pageType = "watchlist"
    }

    if (movieList === null) {
        return <div className="loading">Loading movie list</div>
    }

    const filteredTVSeries = movieList.filter(f => f.media_type === "tv")
    const filteredMovies = movieList.filter(f => f.media_type === "movie")

    return (
            <>
                <h1 className="movie-list-title" >{movieListType}</h1>
                {movieList.length > 0 ? (
                    <>
                        {filteredMovies.length > 0 && 
                            <>
                                <h3>{`${filteredMovies.length} ${filteredMovies.length > 1 ? "Movies" : "Movie"}`}</h3>
                                <hr className="movie-list-hr" />
                                <div className="movies-grid">
                                    {filteredMovies.map(movie => (
                                        <MovieCard movie={movie} key={movie.id} pageType={pageType}/>
                                    ))}
                                </div>
                            </>
                        }
                        {filteredTVSeries.length > 0 && 
                            <>
                                <h3>{filteredTVSeries.length} TV Series</h3>
                                <hr className="movie-list-hr" />
                                <div className="movies-grid">
                                    {filteredTVSeries.map(movie => (
                                        <MovieCard movie={movie} key={movie.id} pageType={pageType}/>
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
                    
            </>
    )
}

export default AddedMoviesList