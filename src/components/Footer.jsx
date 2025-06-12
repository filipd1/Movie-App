import { Link } from "react-router-dom"
import { getUpcomingMovies } from "../services/api"
import { useState, useEffect } from "react"
import "../css/Footer.css"
import github from "../assets/github.svg"
import facebook from "../assets/facebook.svg"
import instagram from "../assets/instagram.svg"
import cs from "../assets/cs.svg"

function Footer() {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

        useEffect(() => {
            const loadUpcomingMovies = async () => {
                try {
                    const upcomingMoviesData = await getUpcomingMovies()
                    setUpcomingMovies(upcomingMoviesData)
                } catch (err) {
                    console.log(err)
                    setError("Failed to load movie...")
                } finally {
                    setLoading(false)
                }
            }
            loadUpcomingMovies()
        }, [])

    return (
        <div className="footer">
            <div className="footer-container">
                {error && <div className="error-message">{error}</div>}
                {loading ? (<div className="loading">Loading...</div>
                    ) : (
                        <>
                            <h4 className="footer-title">Upcoming Movies:</h4>
                            {upcomingMovies?.slice(0,10).map((movie, i) => (
                                <Link className="footer-link" key={i} to={`/movie/${movie.id}`}>
                                    <p>{movie.title}</p>
                                </Link>
                            ))}
                        </>
                    )
                }
            </div>

            <div className="footer-container">
                <div className="footer-social">
                    <Link className="footer-social-link" to="https://github.com/filipd1/Movie-App/tree/master">
                        <img src={github} alt="github" />
                    </Link>

                    <Link className="footer-social-link" to="https://github.com/filipd1/Movie-App/tree/master">
                        <img src={facebook} alt="facebook" />
                    </Link>

                    <Link className="footer-social-link" to="https://github.com/filipd1/Movie-App/tree/master">
                        <img src={instagram} alt="instagram" />
                    </Link>

                    <Link className="footer-social-link" to="https://github.com/filipd1/Movie-App/tree/master">
                        <img src={cs} alt="cs" />
                    </Link>
                </div>
            </div>

            <div className="footer-container">
                <Link className="footer-link" to="/favorites">Favorites</Link>
                <Link className="footer-link" to="/">About</Link>
                <Link className="footer-link" to="/">Contact</Link>
                <Link className="footer-link" to="/">Privacy</Link>
                <Link className="footer-link" to="/">Terms</Link>
            </div>
        </div>
    )
}

export default Footer