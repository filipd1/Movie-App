function ActorCard({ movie, credits }) {

    return (
        <>
            <p>{movie.title}'s cast:</p>
            <div className="movie-page-flex">  {credits.cast?.slice(0,6).map((actor, i) => (
                <div className="actor-card" key={i}>
                    <p>{actor.name}</p>
                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                    <p>{actor.character}</p>
                </div>
                ))}    
            </div>
        </>
    )
}

export default ActorCard