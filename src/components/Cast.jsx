import { Link } from "react-router-dom"
import "../css/Cast.css"
import infoIcon from "../assets/info.svg"

function Cast({ movie, credits }) {

    const directors = credits.crew?.filter(c => c.job === "Director")

    return (
        <div className="cast-container"> 

            <div className="movie-detailed-info">
                <div className="flex">
                    <img src={infoIcon} alt="movie-info" />
                    <p className="movie-info-header"> Information</p>
                </div>
                {movie.title ? (
                    <>
                        <p>Director</p>
                        {directors && directors.length > 0 && (
                            directors.map((d, i) => (
                                <Link to={`/person/${d.id}`} key={i}>
                                    <strong>{d.name} </strong>
                                </Link>
                            ))
                        )}
                    </>
                ) : (
                    <>
                        <p>Creator</p>
                        {movie.created_by && movie.created_by.length > 0 && (
                            movie.created_by.map((c, i) => (
                                <Link to={`/person/${c.id}`} key={i}>
                                    <strong>{c.name} </strong>
                                </Link>
                            ))
                        )}
                    </>
                )}

                <p>Original Language</p>
                <strong>{movie.original_language.toUpperCase()}</strong>
                <p>Production</p>
                {movie.production_companies.slice(0, 1).map((c, i) => (
                    <strong key={i}>{c.name}</strong>
                ))}
                <div className="flex mrg-top">
                    <img src={infoIcon} alt="movie-info" />
                    <p className="movie-info-header">Numbers</p>
                </div>
                {movie.title ? (
                    <>
                        <p>Budget</p>
                        <strong>${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</strong>
                        <p>Revenue</p>
                        <strong>${(movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))}</strong>
                    </>
                ) : (
                    <>
                        <p>Number of Seasons</p>
                        <strong>{movie.number_of_seasons}</strong>
                        <p>Total episodes</p>
                        <strong>{movie.number_of_episodes}</strong>
                    </>
                )}


                </div>

            <div className="cast-wrapper">
                <p className="actor-title">
                    {movie.title ? (`${movie.title}'s cast:`) : (`${movie.name}'s cast:`)}
                </p>
                <div className="actor-slider">
                    {directors && directors.length > 0 && (
                        directors.map((d, i) => (
                            <div className="actor-card" key={i}>
                                <Link to={`/person/${d.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${d.profile_path}`} alt={d.name} />
                                </Link>
                                <Link to={`/person/${d.id}`}>
                                    <p className="actor-name">{d.name}</p>
                                </Link>
                                <p className="actor-role">{d.job}</p>
                            </div>
                        ))

                    )}
                
                    {credits.cast?.map((actor, i) => (
                        actor.profile_path &&
                        <div className="actor-card" key={i}>
                            <Link to={`/person/${actor.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                            </Link>
                            <Link to={`/person/${actor.id}`}>
                                <p className="actor-name">{actor.name}</p>
                            </Link>
                            {movie.title ? (
                                <p className="actor-role">{actor.character}</p>
                            ) : (
                                <div >
                                    {actor.roles.map((r, i) => (
                                        <p className="actor-role" key={i}>{r.character}</p>
                                    ))}
                                </div>
                            )}

                        </div>
                    ))}    
                </div>
            </div>

        </div>
    )
}

export default Cast