import { Link } from "react-router-dom"
import { getUpcomingMovies } from "../services/api"
import { useState, useEffect } from "react"
import "../css/Footer.css"
import githubIcon from "../assets/github.svg"
import linkedinIcon from "../assets/linkedin.svg"

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
                <div>
                {error && <div className="error-message">{error}</div>}
                {loading ? (<div className="loading">Loading...</div>
                    ) : (
                        <>
                            <h4 className="footer-title">Upcoming Movies:</h4>
                            <div className="footer-movies-container">
                                {upcomingMovies?.slice(0,10).map((movie, i) => (
                                    <Link className="footer-link" key={i} to={`/movie/${movie.id}`}>
                                        <p>{movie.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )
                }
                </div>

                <div>
                    <div className="footer-social">
                        <Link className="footer-social-link" to="https://github.com/filipd1/Movie-App/tree/master">
                            <img src={githubIcon} alt="github" />
                        </Link>

                        <Link className="footer-social-link" to="https://github.com/filipd1/Movie-App/tree/master">
                            <img src={linkedinIcon} alt="linkedin" />
                        </Link>
                    </div>

                    <div>
                        <Link className="footer-link" to="/favorites">Favorites</Link>
                        <Link className="footer-link" to="/">About</Link>
                        <Link className="footer-link" to="/">Contact</Link>
                        <Link className="footer-link" to="/">Privacy</Link>
                        <Link className="footer-link" to="/">Terms</Link>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer