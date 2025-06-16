import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPersonById } from "../services/api"

function PersonPage() {
    const { id } = useParams()
    const [person, setPerson] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const loadPersonData = async () => {
            try {
                const personData = await getPersonById(id)
                setPerson(personData)
                console.log(personData)
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
        <div className="movie-page-wrapper">
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <p>{person.name}</p>
                )}
        </div>
    )
}

export default PersonPage