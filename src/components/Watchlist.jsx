import AddedMoviesList from "../components/AddedMoviesList"
import { useMovieContext } from "../contexts/MovieContext"
import { getMovieById, getTVSeriesById } from "../services/api"
import { useEffect, useState } from "react"

function Favorites() {
    const { watchlist } = useMovieContext()
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

                setWatchlistDetails(results.filter(Boolean))
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
            <AddedMoviesList movieList={watchlistDetails} pageType="watchlist" />
        </>
    )
}

export default Favorites
