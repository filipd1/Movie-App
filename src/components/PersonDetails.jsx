import "../css/PersonDetails.css"
import { Link } from "react-router-dom"

function PersonDetails({ person, credits }) {

    const directedMovies = credits.crew?.filter(c => c.job === "Director" && c.media_type !== "tv")
    const uniqueDirectedMovies = Array.from(
        new Map(directedMovies.map(item => [item.id, item])).values()
    )

    const sortedDirectedMovies = uniqueDirectedMovies.sort(
        (a,b) => b.vote_average - a.vote_average
    )

    const castFiltered = credits.cast?.filter(
        c => c.media_type !== "tv"
    )

    return (
        <div className="person-details">
            <div className="person-details-top">
                <div className="person-img-wrapper">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt={person.name}
                    />
                </div>
                <div className="person-desc">
                    <h2>{person.name}</h2>
                    <p>{person.biography}</p>

                    <div className="combined-credits">
                        {person.known_for_department === "Directing" ? (
                            sortedDirectedMovies.map((role, i) => (
                            <div key={i} className="credit-card">
                                <Link to={`/movie/${role.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                        alt={role.title}
                                    />
                                </Link>
                                <p>{role.title}</p>
                            </div>
                            
                        ))
                        ) : (
                            castFiltered.map((role, i) => (
                                <div key={i} className="credit-card">
                                    <Link to={`/movie/${role.id}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                            alt={role.title}
                                        />
                                    </Link>
                                    <p>{role.title}</p>
                                </div>
                            ))
                        )}

                    </div>
                </div>
                
            </div>




        </div>
    )
}

export default PersonDetails