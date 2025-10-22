import MediaCard from "./MediaCard"
import { Link } from "react-router-dom"
import "../css/MediaList.css"
import Loading from "./Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function MediaList({ mediaList, mediaListHeader, mediaNumber = null, URLto}) {

    const { language } = useLanguage()
    const t = translations[language]

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
                        <h2>{t.listEmpty}</h2>
                    </div>
                )}
                
        </>
    )
}

export default MediaList