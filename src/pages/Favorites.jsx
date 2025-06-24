import MovieList from "../components/MovieList"
import { useMovieContext } from "../contexts/MovieContext"

function Favorites() {
    const {favorites} = useMovieContext()

    if (favorites === null) {
        return <div className="loading">Loading favorites...</div>
    }

    return (
        <MovieList movieList={favorites} movieListType="Favorites"/>
    )
    
}

export default Favorites