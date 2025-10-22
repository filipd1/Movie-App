import "../css/FullCast.css"
import { getMovieCredits, getTVSeriesCredits } from "../services/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function FullCast() {

    const { id, mediaTypeURL } = useParams()
    const [credits, setCredits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [active, setActive] = useState("cast")

    const { language } = useLanguage()
    const t = translations[language]

    const uniqueCrew = credits.crew
        ? [...new Map(credits.crew.map(member => [member.id, member])).values()]
        : [];

    useEffect(() => {
        const loadCredits = async () => {
            try {
                const credits = mediaTypeURL === "movie"
                    ? await getMovieCredits(id)
                    : await getTVSeriesCredits(id)
                setCredits(credits)
            } catch (err) {
                console.log(err)
                setError(t.failedLoad)
            } finally {
                setLoading(false)
            }
        }
        loadCredits()
    }, [id, mediaTypeURL])

    return (
        <div className="container">
            <h1 className="container-title">{t.castTitle}</h1>
            {error && <div>{error}</div>}
            {loading ? <Loading/> : (
                <>
                    <div className="flex">
                        <button
                            className={`media-switch-button ${active === "cast" ? "active" : ""}`}
                            onClick={() => setActive("cast")}
                        >
                            {t.cast}
                        </button>
                        <button
                            className={`media-switch-button ${active === "crew" ? "active" : ""}`}
                            onClick={() => setActive("crew")}
                        >
                            {t.crew}
                        </button>
                    </div>
                    <hr className="full-cast-hr"/>

                    {active === "cast" ? (   
                        <div className="full-cast-list">
                        {credits.cast?.length > 0 ? (
                            credits.cast.map((p, i) => (
                                <div key={i} className="cast-card">
                                    <Link to={`/person/${p.id}`}>
                                        <img
                                            src={
                                                p.profile_path
                                                ? `https://image.tmdb.org/t/p/w500${p.profile_path}`
                                                : "/person_placeholder.png"
                                            }
                                            alt={p.name}
                                        />
                                    </Link>
                                    <div className="cast-card-info">
                                        <Link to={`/person/${p.id}`}>{p.name}</Link>
                                        {mediaTypeURL === "movie" ? (
                                            <p>{p.character}</p>
                                        ) : (
                                            <p>
                                                {p.roles?.[0]?.character && `${p.roles[0].character}`}
                                                {p.total_episode_count && ` (${p.total_episode_count} episodes)`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                        ))
                            ) : (
                                <p>{t.castEmpty}</p>
                            )}
                        </div>
                    ) : (
                        <div className="full-cast-list">
                            {uniqueCrew.length > 0 ? (
                                uniqueCrew.map((p, i) => (
                                    <div key={i} className="cast-card">
                                    <Link to={`/person/${p.id}`}>
                                        <img
                                            src={
                                                p.profile_path
                                                ? `https://image.tmdb.org/t/p/w500${p.profile_path}`
                                                : "/person_placeholder.png"
                                            }
                                            alt={p.name}
                                        />
                                    </Link>
                                    <div className="cast-card-info">
                                        <Link to={`/person/${p.id}`}>{p.name}</Link>
                                        {mediaTypeURL === "movie" ? (
                                            <p>{p.known_for_department}</p>
                                        ) : (
                                            <p>{p.jobs?.[0]?.job && `${p.jobs[0].job}`}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                                ) : (
                                    <p>{t.crewEmpty}</p>
                            )}
                        </div>
                    )}
                    </>
            )}
        </div>
    )
}

export default FullCast
