import starIcon from "../assets/ratings.svg"
import { Link } from "react-router-dom"
import "../css/PersonCredits.css"
import { useState } from "react"

function PersonCredits({ credits, person }) {

    const [active, setActive] = useState("acting")

    const directedMovies = credits?.crew.filter(c => c.job === "Director" ) || []
    const uniqueDirectedMovies = Array.from(
        new Map(directedMovies.map(item => [item.id, item])).values()
    )
    const sortedDirectedMoviesByRating = uniqueDirectedMovies.sort(
        (a,b) => b.vote_average - a.vote_average
    )

    const sortedDirectedMoviesByYear = uniqueDirectedMovies
        .filter(item =>
            (item.release_date || item.first_air_date)
        )
        .map(item => ({
            ...item,
            year: item.release_date
            ? parseInt(item.release_date.split("-")[0])
            : parseInt(item.first_air_date.split("-")[0])
        }))
        .sort((a, b) => b.year - a.year)

    const directedMoviesGroupedByYear = sortedDirectedMoviesByYear.reduce((acc, item) => {
        if (!acc[item.year]) {
            acc[item.year] = []
        }
        acc[item.year].push(item)
        return acc
        }, {})

    const actedMovies = credits?.cast || []
    const uniqueActedMovies = Array.from(
        new Map(actedMovies.map(item => [item.id, item])).values()
    )

    const sortedActedMoviesByRating = uniqueActedMovies
        .filter(movie => movie.vote_count >= 1000)
        .sort((a, b) => b.vote_average - a.vote_average)

    const sortedActedMoviesByYear = uniqueActedMovies
        .filter(item =>
            (item.release_date || item.first_air_date) &&
            item.character && item.character.trim() !== ""
        )
        .map(item => ({
            ...item,
            year: item.release_date
            ? parseInt(item.release_date.split("-")[0])
            : parseInt(item.first_air_date.split("-")[0])
        }))
        .sort((a, b) => b.year - a.year)

    const actedMoviesGroupedByYear = sortedActedMoviesByYear.reduce((acc, item) => {
        if (!acc[item.year]) {
            acc[item.year] = []
        }
        acc[item.year].push(item)
        return acc
        }, {})

    return (
        <div className="credits-container">
            <div className="flex">
                <img src={starIcon} alt="star-icon" className="star-icon"/>
                <h2 className="container-title">Known for</h2>
            </div>
            
            <div className="combined-credits">
                {person.known_for_department === "Directing" ? (
                    sortedDirectedMoviesByRating?.map((role, i) => (
                        <div key={i} className="credit-card">
                            <Link to={`/${role.media_type}/${role.id}`}>
                            <img
                                src={role.poster_path ? 
                                    `https://image.tmdb.org/t/p/w500${role.poster_path}`
                                    : "/poster_placeholder.png"
                                    }
                                alt={role.title}
                            />
                            </Link>
                            <p>{role.title ? role.title : role.name}</p>
                        </div>
                ))
                ) : (
                    sortedActedMoviesByRating.map((role, i) => (
                        <div key={i} className="credit-card">
                            <Link to={`/${role.media_type}/${role.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                    alt={role.title}
                                />
                                <p>{role.title ? role.title : role.name}</p>
                            </Link>
                        </div>
                    ))
                )}

            </div>

            <div className="detailed-credits">

                <div className="flex">
                    <button
                        className={`media-switch-button ${active === "acting" ? "active" : ""}`}
                        onClick={() => setActive("acting")}
                    >
                        Acting
                    </button>
                    {uniqueDirectedMovies.length > 0 &&
                        <button
                            className={`media-switch-button ${active === "directing" ? "active" : ""}`}
                            onClick={() => setActive("directing")}
                        >
                            Directing
                        </button>
                    }
                </div>
                <div className="detailed-credits-inner">
                {active === "acting" &&
                    Object.entries(actedMoviesGroupedByYear).sort((a, b) => b[0] - a[0]).map(([year, roles]) => (
                        <div key={year}>
                            <h3>{year}</h3>
                            {roles.map((role, i) => (
                                <div className="detailed-credits-card" key={i}>
                                    <div>
                                        <Link to={`/${role.media_type}/${role.id}`}>
                                            <p>{role.title ? role.title : role.name}</p>
                                        </Link>
                                        <p>as {role.character}</p>
                                    </div>
                                    {role.episode_count && 
                                        <p>{`${role.episode_count} ${role.episode_count === 1 ? "episode" : "episodes"}`}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    ))
                }

                {active === "directing" && 
                    Object.entries(directedMoviesGroupedByYear).sort((a, b) => b[0] - a[0]).map(([year, roles]) => (
                        <div key={year}>
                            <h3>{year}</h3>
                            {roles.map((role, i) => (
                                <div className="detailed-credits-card" key={i}>
                                    <div>
                                        <Link to={`/${role.media_type}/${role.id}`}>
                                            <p>{role.title ? role.title : role.name}</p>
                                        </Link>
                                        <p>director</p>
                                    </div>
                                    {role.episode_count && 
                                        <p>{`${role.episode_count} ${role.episode_count === 1 ? "episode" : "episodes"}`}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    ))
                }
                </div>


            </div>



        </div>
    )
}

export default PersonCredits