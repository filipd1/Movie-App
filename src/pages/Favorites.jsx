import AddedMoviesList from "../components/AddedMoviesList"
import { useMovieContext } from "../contexts/MovieContext"
import { useEffect } from "react"

function Favorites() {
    const {favorites} = useMovieContext()

    if (favorites === null) {
        return <div className="loading">Loading favorites...</div>
    }

    useEffect(() => {
        document.title = "Favorites"
    }, [])

    return (
        <div className="container">
            <AddedMoviesList movieList={favorites} movieListType="Favorites"/>
        </div>
        
    )
    
}

export default Favorites