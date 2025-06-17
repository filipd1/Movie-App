import { Link } from "react-router-dom"
import "../css/Cast.css"

function Cast({ movie, credits }) {

    const directors = credits.crew?.filter(c => c.job === "Director")

    return (
        <>
            <p className="actor-title">{movie.title}'s cast:</p>
            <div className="actor-slider">
                {directors && directors.length > 0 && (
                    directors.map((d, i) => (
                        <div className="actor-card" key={i}>
                            <img src={`https://image.tmdb.org/t/p/w500${d.profile_path}`} alt={d.name} />
                            <Link to={`/person/${d.id}`}>
                                <p className="actor-name">{d.name}</p>
                            </Link>
                            <p className="actor-role">{d.job}</p>
                        </div>
                    ))

                )}
               
                {credits.cast?.map((actor, i) => (
                    <div className="actor-card" key={i}>
                        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                        <Link to={`/person/${actor.id}`}>
                            <p className="actor-name">{actor.name}</p>
                        </Link>
                        <p className="actor-role">{actor.character}</p>
                    </div>
                ))}    
            </div>
        </>
    )
}

export default Cast