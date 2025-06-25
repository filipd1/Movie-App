import { getTVSeriesById, getTVSeriesCredits, getTVSeriesImages, getTVSeriesReviews, getSimilarTVSeries} from "../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieDetails from "../components/MovieDetails"
import Cast from "../components/Cast"
import Reviews from "../components/Reviews"
import SimilarMovies from "../components/SimilarMovies"

function TVSeriesPage() {

   const { id } = useParams()
   const [tv, setTV] = useState([])
   const [tvCredts, setTVCredits] = useState([])
   const [tvImages, setTVImages] = useState([])
   const [tvReviews, setTVReviews] = useState([])
   const [similarTVShows, setSimilarTVShows] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const loadTVSeriesData = async () => {
         try {
               const [tvData, tvCreditsData, tvImagesData, tvReviewsData, tvSimilarData] = await Promise.all([
                  getTVSeriesById(id),
                  getTVSeriesCredits(id),
                  getTVSeriesImages(id),
                  getTVSeriesReviews(id),
                  getSimilarTVSeries(id)
               ]) 
               setTV(tvData)
               setTVCredits(tvCreditsData)
               setTVImages(tvImagesData)
               setTVReviews(tvReviewsData)
               setSimilarTVShows(tvSimilarData)
         } catch (err) {
               console.log(err)
               setError("Failed to load series...")
         } finally {
               setLoading(false)
         }
      }
      loadTVSeriesData()
      window.scrollTo(0,0)
   }, [id])

   return (
      <>
         {error && <div className="error-message">{error}</div>}
         {loading ? <div className="loading">Loading...</div> : (
            <div className="container">
               <div className="movie-title-wrapper">
                  <h5 className="media-type">TV Series</h5>
                  <h1 className="movie-title">{tv.name}</h1>
                  <p className="movie-subtitle">{tv.tagline}</p>

                  <div className="flex">
                        <p className="movie-time">
                           {`${tv.first_air_date?.split('-')[0]} - ${tv.status === "Ended" ? tv.last_air_date?.split('-')[0] : ""}`}
                        </p>
                        <p className="movie-time">{tv.number_of_seasons} Seasons</p>
                  </div>
                  
               </div>

               <MovieDetails
                  movie={tv}
                  credits={tvCredts}
                  images={tvImages}
               />
               <Cast movie={tv} credits={tvCredts}/>
               <Reviews reviews={tvReviews} />
               <SimilarMovies movie={similarTVShows}/>
            </div>
         )}
      </>
   )
}

export default TVSeriesPage