import AddedMoviesList from "../components/AddedMoviesList"
import { useMovieContext } from "../contexts/MovieContext"
import { getMovieById, getTVSeriesById } from "../services/api"
import { useEffect, useState } from "react"

function Favorites() {
    const { favorites } = useMovieContext()
    const [favoritesDetails, setFavoritesDetails] = useState([])

    useEffect(() => {
        if (!favorites || favorites.length === 0) {
            setFavoritesDetails([])
            return
        }

        async function fetchFavoritesDetails() {
            try {
                const results = await Promise.all(
                    favorites.map(async (fav) => {
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
                setFavoritesDetails(filtered)
            } catch (err) {
                console.error("Error fetching favorites details:", err)
                setFavoritesDetails([])
            }
        }

        fetchFavoritesDetails()
    }, [favorites])

    return (
        <>
            {!favorites && <div className="loading">Loading favorites...</div>}
            <AddedMoviesList movieList={favoritesDetails} pageType="favorites" />
        </>
    )
}

export default Favorites
