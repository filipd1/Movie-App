import { useEffect, useState } from "react"
import { getMovieById, getTVSeriesById } from "../services/api"
import AddedMediaList from "./AddedMediaList"
import Loading from "../components/Loading"

function Ratings({ ratings }) {
    const [ratingsDetails, setRatingsDetails] = useState([])

    useEffect(() => {
        if (!ratings || ratings.length === 0) {
            setRatingsDetails([])
            return
        }

        async function fetchRatingsDetails(paras) {
            try {
                const results = await Promise.all(
                    ratings.map(async (movieRating) => {
                        const {id, media_type, rating } = movieRating

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
                setRatingsDetails(filtered)
                
            } catch (err) {
                console.err("Error fetching ratings:", err)
                setRatingsDetails([])
            }
        }
        fetchRatingsDetails()
    }, [ratings])

    return (
        <>
            {!ratings && <Loading/>}
            <AddedMediaList mediaList={ratingsDetails} pageType="ratings" />
        </>
    )
}

export default Ratings