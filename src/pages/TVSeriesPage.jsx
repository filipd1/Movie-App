import { getTVSeriesById } from "../services/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import TVSeriesDetails from "../components/TVSeriesDetails"

function TVSeriesPage() {

   const { id } = useParams()
   const [tv, setTV] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const loadTVSeriesData = async () => {
         try {
               const [tvData] = await Promise.all([
                  getTVSeriesById(id),
               ]) 
               setTV(tvData)
         } catch (err) {
               console.log(err)
               setError("Failed to load series...")
         } finally {
               setLoading(false)
         }
      }
      loadTVSeriesData()

   }, [id])
   
   return (
      <>
         {error && <div className="error-message">{error}</div>}
         {loading ? <div className="loading">Loading...</div> : (
            <TVSeriesDetails tv={tv}/>
         )}
      </>
   )
}

export default TVSeriesPage