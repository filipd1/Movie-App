import { Link } from "react-router-dom"
import "../css/MediaChart.css"

function MediaChart( { movies, header } ) {

    return (
        <div className="movie-chart">
            <h1 className="container-title">{header}</h1>
            {movies?.map((m, i) => (
                <div className="movie-chart-item" key={i}>
                    <Link to={m.title ? `/movie/${m.id}` : `/tv/${m.id}`}>
                        <img
                            src={m.poster_path
                                ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                                : "/poster_placeholder.png"}
                            alt={m.title}
                        />
                    </Link>
                    <div className="chart-item-desc">
                        <Link to={m.title ? `/movie/${m.id}` : `/tv/${m.id}`}><p>{i+1}. {movies[0].title ? m.title : m.name}</p></Link>
                        <p>{m.tagline}</p>
                        <p className="movie-time">{movies[0].title ? m.release_date?.split('-')[0] : m.first_air_date?.split('-')[0]}</p>
                        <div className="movie-desc">
                            <div className="movie-genres-wrapper">{m.genres?.map((m, i) => (
                                    <p className="movie-genre" key={i}>{m.name}</p>
                                ))}
                            </div>
                            
                            <p className="movie-overview">
                                {m.overview.length > 150
                                    ? m.overview.slice(0, 150).slice(0, m.overview.slice(0, 150).lastIndexOf(" ")) + " ..."
                                    : m.overview
                                }
                                {m.overview.length > 150 &&
                                    <Link to={m.title ? `/movie/${m.id}` : `/tv/${m.id}`}> read more</Link>
                                }
                            </p>
                            

                            <div className="movie-votes">
                                <p className={`vote-average ${m.vote_average >= 6 ? "high" : "low"}`}>
                                    {m.vote_average != null
                                        ? m.vote_average.toFixed(1)
                                        : "N/A"
                                    }
                                </p>
                                <p>{m.vote_count} votes</p>
                            </div>
                        </div>
                    </div>
                </div>          
            ))}
        </div>
    )
}

export default MediaChart