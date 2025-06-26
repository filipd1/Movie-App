import { useMovieContext } from "../contexts/MovieContext"
import AddedMoviesList from "../components/AddedMoviesList"
import { useEffect } from "react"

function Watchlist() {

    const {watchlist} = useMovieContext()

    useEffect(() => {
        document.title = "Watchlist"
    }, [])

    if (watchlist === null) {
        return <div className="loading">Loading watchlist</div>
    }

    return (
        <div className="container">
            <AddedMoviesList movieList={watchlist} movieListType="Watchlist"/>
        </div>
    )
}

export default Watchlist