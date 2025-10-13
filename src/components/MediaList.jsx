import MediaCard from "./MediaCard"
import { Link } from "react-router-dom"
import "../css/MediaList.css"
import Loading from "./Loading"

function MediaList({ mediaList, mediaListHeader, mediaNumber = null, URLto}) {


    if (mediaList === null) {
        return <Loading />
    }

    return (
        <>
            <h2 className="movie-list-title" ><Link to={URLto}>{mediaListHeader}</Link></h2>
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