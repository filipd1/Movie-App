import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPersonById, getPersonCombinedCredits } from "../services/api"
import PersonDetails from "../components/PersonDetails"
import PersonCredits from "../components/PersonCredits"
import Loading from "../components/Loading"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function PersonPage() {
    const { id } = useParams()
    const [person, setPerson] = useState([])
    const [personCredits, setPersonCredits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { language } = useLanguage()
    const t = translations[language]

    useEffect(() => {
        const loadPersonData = async () => {
            try {
                const [personData, personCreditsData] = await Promise.all([
                    getPersonById(id),
                    getPersonCombinedCredits(id)
                ]) 
                setPerson(personData)
                setPersonCredits(personCreditsData)
            } catch (err) {
                console.log(err)
                setError(t.failedLoad)
            } finally {
                setLoading(false)
            }
        }
        loadPersonData()
    }, [id])

    useEffect(() => {
      if (person?.name) {
        document.title = person.name
      } else {
        document.title = t.loading
      }
    }, [person])

    return (
        <div className="container">
            {error && <div>{error}</div>}
            {loading ? <Loading/> : (
                <>
                    <PersonDetails person={person} />
                    <PersonCredits credits={personCredits} person={person}/>
                </>
                )}             
        </div>
    )
}

export default PersonPage