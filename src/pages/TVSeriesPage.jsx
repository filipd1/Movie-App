import { getTVSeriesById, getTVSeriesCredits, getTVSeriesImages, getTVSeriesReviews, getSimilarTVSeries, getTVSeriesVideos, getUserRatings} from "../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MediaDetails from "../components/MediaDetails"
import Cast from "../components/Cast"
import Reviews from "../components/Reviews"
import Similar from "../components/Similar"
import Gallery from "../components/Gallery"
import UserRatings from "../components/UserRatings"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function TVSeriesPage() {

   const { id } = useParams()
   const [tv, setTV] = useState([])
   const [tvCredts, setTVCredits] = useState([])
   const [tvImages, setTVImages] = useState([])
   const [tvReviews, setTVReviews] = useState([])
   const [similarTVShows, setSimilarTVShows] = useState([])
   const [tvVideos, setTVVideos] = useState([])
   const [userRatings, setUserRatings] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   const { language } = useLanguage()
   const t = translations[language]


   useEffect(() => {
      const loadTVSeriesData = async () => {
         try {
            const [tvData, tvCreditsData, tvImagesData, tvReviewsData, tvSimilarData, tvVideosData, ratingsData] = await Promise.all([
               getTVSeriesById(id),
               getTVSeriesCredits(id),
               getTVSeriesImages(id),
               getTVSeriesReviews(id),
               getSimilarTVSeries(id),
               getTVSeriesVideos(id),
               getUserRatings()
            ]) 
            setTV(tvData)
            setTVCredits(tvCreditsData)
            setTVImages(tvImagesData)
            setTVReviews(tvReviewsData)
            setSimilarTVShows(tvSimilarData)
            setTVVideos(tvVideosData)
            setUserRatings(ratingsData)
         } catch (err) {
            console.log(err)
            setError(t.failedLoad)
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
         document.title = t.loading
      }
   }, [tv])

   return (
      <>
         {error && <div className="error-message">{error}</div>}
         {loading ? <Loading/> : (
            <div className="container">
               <div className="movie-title-wrapper">
                  <h5 className="media-type">{t.tvSeries}</h5>
                  <h1 className="movie-title">{tv.name}</h1>
                  <p className="movie-subtitle">{tv.tagline}</p>

                  <div className="flex">
                        <p className="movie-time">
                           {`${tv.first_air_date?.split('-')[0]} - ${tv.status === "Ended" ? tv.last_air_date?.split('-')[0] : ""}`}
                        </p>
                        <p className="movie-time">{tv.number_of_seasons} {t.seasons}</p>
                  </div>
                  
               </div>

               <MediaDetails
                  media={tv}
                  credits={tvCredts}
                  images={tvImages}
               />
               <Cast movie={tv} credits={tvCredts}/>
                  <div className="movie-media-wrapper">
                        <Gallery videos={tvVideos} photos={tvImages}/>
                        <Similar movie={similarTVShows}/>
                  </div>
               <Reviews reviews={tvReviews} mediaType="tv show"/>
               <UserRatings ratings={userRatings}/>
            </div>
         )}
      </>
   )
}

export default TVSeriesPage