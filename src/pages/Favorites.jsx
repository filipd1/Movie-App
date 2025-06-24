import MovieCard from "../components/MovieCard"
import { useMovieContext } from "../contexts/MovieContext"
import "../css/Favorites.css"

function Favorites() {
    const {favorites} = useMovieContext()

    const filteredTVSeries = favorites.filter(f => f.media_type === "tv")
    const filteredMovies = favorites.filter(f => f.media_type === "movie")

    if (favorites === null) {
        return <div className="loading">Loading favorites...</div>
    }

        return (
            <div className="container">
                <h2 className="favorites-title" >Favorites</h2>
                {favorites.length > 0 ? (
                    <>
                        <h3>Movies</h3>
                        <hr className="favorites-hr" />
                        <div className="movies-grid">
                            {filteredMovies.map(movie => (
                                <MovieCard movie={movie} key={movie.id}/>
                            ))}
                        </div>

                        <h3>TV Series</h3>
                        <hr className="favorites-hr" />
                        <div className="movies-grid">
                            {filteredTVSeries.map(movie => (
                                <MovieCard movie={movie} key={movie.id}/>
                            ))}
                        </div>
                    </>
                    ) : (
                        <div className="favorites-empty">
                            <h2>No favorite movies yet</h2>
                            <p>Start adding your favorite movies or TV shows</p>
                        </div>
                    )}
            </div>
        )
    
}

export default Favorites