import { Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useMovieContext } from "../contexts/MovieContext"
import "../css/Favorites.css"

function Favorites() {
    const {favorites} = useMovieContext()

    if (favorites === null) {
        return <div className="loading">Loading favorites...</div>
    }

        return (
            <div className="favorites">
                {favorites.length > 0 ? (
                    <div className="movies-grid">
                        {favorites.map(movie => (
                            <MovieCard movie={movie} key={movie.id}/>
                        ))}
                    </div>)
                : (<div className="favorites-empty">
                    <h2>No favorite movies yet</h2>
                    <p>Start adding your favorite movies and they will appear here</p>
                </div>)}
            </div>
        )
    
}

export default Favorites