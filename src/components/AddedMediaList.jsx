import MediaCard from "./MediaCard"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function AddedMediaList({ mediaList, pageType}) {

    if (!mediaList) {
        return <Loading/>
    }
    
    const filteredTVSeries = mediaList.filter(f => f.media_type === "tv")
    const filteredMovies = mediaList.filter(f => f.media_type === "movie")

    const { language } = useLanguage()
    const t = translations[language]

    return (
        <>
            {mediaList.length > 0 ? (
                <>
                    {filteredMovies.length > 0 && 
                        <>
                            <h3>{filteredMovies.length} {filteredMovies.length > 1 ? t.navbarMovies : t.navbarMovies.slice(0, -1)}</h3>
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
                            <h3>{filteredTVSeries.length} {filteredTVSeries.length > 1 ? t.navbarTV : t.navbarTV.slice(0, -1)}</h3>
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
                        <h2>{t.addedListTitle}</h2>
                        <p>{t.addedListSubitle}</p>
                    </div>
                )}
        </>
    )
}

export default AddedMediaList