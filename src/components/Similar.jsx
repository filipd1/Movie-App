import MediaCard from "./MediaCard"
import similarIcon from "../assets/similar.svg"
import "../css/Similar.css"

function Similar({ movie }) {

    return (
        <div className="similar-movies-container">
            <div className="flex">
                <img src={similarIcon} alt="similar-icon" />
                <h2 className="container-title">Similar</h2>
            </div>
            <div className="similar-movies">
                {movie.results.length > 0 ? (
                    movie.results.map((m,i) => (
                        <MediaCard movie={m} pageType="favorites" key={i}/>
                    ))
                ) : (
                    <p>Nothing here yet</p>
                )}

            </div>
        </div>
    )
}

export default Similar