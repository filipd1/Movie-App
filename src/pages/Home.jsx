import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api"
import "../css/Home.css"

function Home() {

    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const hadnleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setLoading(true)
        if (loading) return

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch {
            console.log(err)
            setError("No matching movies")
        } finally {
            setLoading(false)
        }
        setSearchQuery("")
    }

    return (
        <div className="home">

            <form action="" className="search-form" onSubmit={hadnleSearch}>
                <input
                    type="text"
                    placeholder="Search for movie.."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> : (
                <div className="movies-grid">
                    {movies.map(movie => (
                        movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>)}

        </div>
    )
}

export default Home