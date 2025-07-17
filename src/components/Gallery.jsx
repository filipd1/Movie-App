import { useState } from "react"
import trailerIcon from "../assets/trailer.svg"
import "../css/Gallery.css"

function Gallery({ videos, photos }) {
    const [active, setActive] = useState("videos")
  
    return (
        <div className="media-container">
            <div className="flex">
                <img src={trailerIcon} alt="media-icon" />
                <h2 className="container-title">Media</h2>
            </div>

            <div className="flex">
                <button
                    className={`media-switch-button ${active === "videos" ? "active" : ""}`}
                    onClick={() => setActive("videos")}
                >
                    Trailers
                </button>
                <button
                    className={`media-switch-button ${active === "photos" ? "active" : ""}`}
                    onClick={() => setActive("photos")}
                >
                    Photos
                </button>
            </div>

            {active === "videos" ? (
                !videos || videos.length === 0 ? (
                    <p className="component-empty">No videos found</p>
                ) : (
                    <>
                        {videos.slice(0, 1).map((video) => (
                            <div className="media-main-video" key={video.key}>
                                {video.site === "YouTube" && (
                                    <iframe
                                        className="media-main"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        ))}
                        <h4 className="media-slider-title">All trailers</h4>
                        <div className="media-slider">
                            {videos.length > 1 ? (
                                videos.slice(1).map((video, i) =>
                                    video.site === "YouTube" ? (
                                        <iframe
                                            className="media-item"
                                            key={video.key || i}
                                            src={`https://www.youtube.com/embed/${video.key}`}
                                            title={video.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                ) : null
                            )
                            ) : (
                                <p className="component-empty">No more videos found</p>
                            )}

                        </div>
                    </>
                )
            ) : !photos || !photos.backdrops || photos.backdrops.length === 0 ? (
                <p className="component-empty">No photos found</p>
            ) : (
                <>
                    {photos.backdrops.slice(0, 1).map((photo, i) => (
                        <div className="media-main-video" key={i}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
                                alt={`image.title img-${i}`}
                                className="media-main"
                            />
                        </div>
                    ))}
                    <h4 className="media-slider-title">All images</h4>
                    <div className="media-slider">
                        {photos.backdrops.length > 1 ? (
                            photos.backdrops.slice(1).map((photo, i) => (
                                <img
                                    key={i}
                                    src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
                                    alt={`image.title img-${i}`}
                                    className="media-item"
                                />
                        ))
                        ) : (
                            <p className="component-empty">No more photos found</p>
                        )}

                    </div>
                </>
            )}
        </div>
    );
}

export default Gallery
