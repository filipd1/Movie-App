import MediaCard from "./MediaCard"

function AddedMediaList({ mediaList, pageType}) {

    if (!mediaList) {
    return <div className="loading">Loading movie list</div>
    }
    
    const filteredTVSeries = mediaList.filter(f => f.media_type === "tv")
    const filteredMovies = mediaList.filter(f => f.media_type === "movie")

    return (
        <>
            {mediaList.length > 0 ? (
                <>
                    {filteredMovies.length > 0 && 
                        <>
                            <h3>{`${filteredMovies.length} ${filteredMovies.length > 1 ? "Movies" : "Movie"}`}</h3>
                            <hr className="movie-list-hr" />
                            <div className="movies-grid">
                                {filteredMovies.map(movie => (
                                    <MediaCard movie={movie} key={movie.id} pageType={pageType}/>
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
                                    <MediaCard movie={movie} key={movie.id} pageType={pageType}/>
                                ))}
                            </div>
                        </>
                    }
                </>
                
                ) : (
                    <div className="movie-list-empty">
                        <h2>No added movies yet</h2>
                        <p>Start adding movies or TV shows</p>
                    </div>
                )}
        </>
    )
}

export default AddedMediaList