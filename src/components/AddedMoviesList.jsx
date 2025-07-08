import MovieCard from "./MovieCard"

function AddedMoviesList({ movieList, pageType}) {

    if (!movieList) {
    return <div className="loading">Loading movie list</div>
    }
    
    const filteredTVSeries = movieList.filter(f => f.media_type === "tv")
    const filteredMovies = movieList.filter(f => f.media_type === "movie")

    return (
        <>
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