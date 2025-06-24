import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPersonById, getPersonCombinedCredits } from "../services/api"
import PersonDetails from "../components/PersonDetails"

function PersonPage() {
    const { id } = useParams()
    const [person, setPerson] = useState([])
    const [personCredits, setPersonCredits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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
                setError("Failed to load details...")
            } finally {
                setLoading(false)
            }
        }
        loadPersonData()
    }, [id])

    return (
        <div className="container">
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <PersonDetails person={person} credits={personCredits}/>
                )}
        </div>
    )
}

export default PersonPage