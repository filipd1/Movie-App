import "../css/FullCast.css"
import { getMovieCredits, getTVSeriesCredits } from "../services/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function FullCast() {

    const { id, mediaTypeURL } = useParams()
    const [credits, setCredits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        const loadCredits = async () => {
            try {
                const credits = mediaTypeURL === "movie"
                    ? await getMovieCredits(id)
                    : await getTVSeriesCredits(id)
                setCredits(credits)
            } catch (err) {
                console.log(err)
                setError("Failed to load credits...")
            } finally {
                setLoading(false)
            }
        }
        loadCredits()
    }, [id, mediaTypeURL])

    return (
        <div className="container">
            <h1>Full credits</h1>
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <>
                    <h2>Cast</h2>
                    <div className="full-cast-list">
                        {credits.cast?.length > 0 ? (
                            credits.cast.map((p, i) => (
                            <p key={i}>{p.name}</p>
                        ))
                            ) : (
                                <p>No cast data available.</p>
                            )}
                    </div>
                    <h2>Crew</h2>
                    <div className="full-cast-list">
                        {credits.crew?.length > 0 ? (
                            credits.crew.map((p, i) => (
                            <p key={i}>{p.name}</p>
                        ))
                            ) : (
                                <p>No crew data available.</p>
                        )}
                    </div>
                </>
            )}
        </div>

    )
}

export default FullCast