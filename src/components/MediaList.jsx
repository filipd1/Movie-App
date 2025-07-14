import MediaCard from "./MediaCard"
import { Link } from "react-router-dom"
import "../css/MediaList.css"

function MediaList({ mediaList, mediaListHeader, mediaNumber = null, URLto}) {


    if (mediaList === null) {
        return <div className="loading">Loading media list</div>
    }

    return (
        <>
            <Link to={URLto}><h2 className="movie-list-title" >{mediaListHeader}</h2></Link>
            {mediaList.length > 0 ? (
                <div className="movies-grid">
                    {(mediaNumber ? mediaList.slice(0, mediaNumber) : mediaList).map(movie => (
                        <MediaCard movie={movie} key={movie.id}/>
                    ))}
                </div>
                ) : (
                    <div className="movie-list-empty">
                        <h2>No movies found</h2>
                    </div>
                )}
                
        </>
    )
}

export default MediaList