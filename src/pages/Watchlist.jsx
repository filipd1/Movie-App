import { useMovieContext } from "../contexts/MovieContext"
import MovieList from "../components/MovieList"

function Watchlist() {

    const {watchlist} = useMovieContext()

    if (watchlist === null) {
        return <div className="loading">Loading watchlist</div>
    }

    return (
        <MovieList movieList={watchlist} movieListType="Watchlist"/>
    )
}

export default Watchlist