import AddedMediaList from "../components/AddedMediaList"
import { useMediaContext } from "../contexts/MediaContext"
import { getMovieById, getTVSeriesById } from "../services/api"
import { useEffect, useState } from "react"

function Watchlist() {
    const { watchlist } = useMediaContext()
    const [watchlistDetails, setWatchlistDetails] = useState([])

    useEffect(() => {
        if (!watchlist || watchlist.length === 0) {
            setWatchlistDetails([])
            return
        }

        async function fetchWatchlistDetails() {
            try {
                const results = await Promise.all(
                    watchlist.map(async (fav) => {
                        const { id, media_type } = fav

                        if (media_type === "movie") {
                            const movie = await getMovieById(id)
                            return { ...movie, media_type }
                        } else if (media_type === "tv") {
                            const tv = await getTVSeriesById(id)
                            return { ...tv, media_type }
                        }
                        return null
                    })
                )
                const filtered = results.filter(Boolean)
                setWatchlistDetails(filtered)
            } catch (err) {
                console.error("Error fetching watchlist details:", err)
                setWatchlistDetails([])
            }
        }

        fetchWatchlistDetails()
    }, [watchlist])

    return (
        <>
            {!watchlist && <div className="loading">Loading watchlist...</div>}
            <AddedMediaList mediaList={watchlistDetails} pageType="watchlist" />
        </>
    )
}

export default Watchlist
