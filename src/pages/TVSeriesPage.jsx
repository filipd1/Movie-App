import { getTVSeriesById, getTVSeriesCredits, getTVSeriesImages, getTVSeriesReviews, getSimilarTVSeries, getTVSeriesVideos} from "../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MovieDetails from "../components/MovieDetails"
import Cast from "../components/Cast"
import Reviews from "../components/Reviews"
import SimilarMovies from "../components/SimilarMovies"
import Media from "../components/Media"

function TVSeriesPage() {

   const { id } = useParams()
   const [tv, setTV] = useState([])
   const [tvCredts, setTVCredits] = useState([])
   const [tvImages, setTVImages] = useState([])
   const [tvReviews, setTVReviews] = useState([])
   const [similarTVShows, setSimilarTVShows] = useState([])
   const [tvVideos, setTVVideos] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const loadTVSeriesData = async () => {
         try {
               const [tvData, tvCreditsData, tvImagesData, tvReviewsData, tvSimilarData, tvVideosData] = await Promise.all([
                  getTVSeriesById(id),
                  getTVSeriesCredits(id),
                  getTVSeriesImages(id),
                  getTVSeriesReviews(id),
                  getSimilarTVSeries(id),
                  getTVSeriesVideos(id)
               ]) 
               setTV(tvData)
               setTVCredits(tvCreditsData)
               setTVImages(tvImagesData)
               setTVReviews(tvReviewsData)
               setSimilarTVShows(tvSimilarData)
               setTVVideos(tvVideosData)
         } catch (err) {
               console.log(err)
               setError("Failed to load tv series...")
         } finally {
               setLoading(false)
         }
      }
      loadTVSeriesData()
      window.scrollTo(0,0)
   }, [id])

   useEffect(() => {
      if (tv?.name) {
         document.title = tv.name
      } else {
         document.title = "Loading..."
      }
   }, [tv])

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
                  <div className="movie-media-wrapper">
                        <Media videos={tvVideos} photos={tvImages}/>
                        <SimilarMovies movie={similarTVShows}/>
                  </div>
               <Reviews reviews={tvReviews} mediaType="tv show"/>
            </div>
         )}
      </>
   )
}

export default TVSeriesPage