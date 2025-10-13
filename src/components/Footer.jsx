import { Link } from "react-router-dom"
import { getUpcomingMovies } from "../services/api"
import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import "../css/Footer.css"
import githubIcon from "../assets/github.svg"
import linkedinIcon from "../assets/linkedin.svg"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function Footer() {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { language } = useLanguage()
    const t = translations[language]

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
                {loading ? ( <Loading/>
                    ) : (
                        <>
                            <h4 className="footer-title">{t.footerText}</h4>
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
                        <Link className="footer-social-link" target="_blank" to="https://github.com/filipd1/Movie-App/tree/master">
                            <img src={githubIcon} alt="github" />
                        </Link>

                        <Link className="footer-social-link" target="_blank" to="https://www.linkedin.com/in/filip-dudziak-36b38332b">
                            <img src={linkedinIcon} alt="linkedin" />
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer