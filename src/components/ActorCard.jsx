import { Link } from "react-router-dom"
import "../css/ActorCard.css"

function ActorCard({ movie, credits }) {

    return (
        <>
            <p className="actor-title">{movie.title}'s cast:</p>
            <div className="actor-card-wrapper">
                {credits.cast?.slice(0,6).map((actor, i) => (
                <Link key={i} to={`/person/${actor.id}`}>
                    <div className="actor-card">
                        <p className="actor-name">{actor.name}</p>
                        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                        
                        <p className="actor-role">{actor.character}</p>
                    </div>
                </Link>
                ))}    
            </div>
        </>
    )
}

export default ActorCard