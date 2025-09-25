import { useState, useEffect } from "react"
import trailerIcon from "../assets/trailer.svg"
import "../css/Gallery.css"

function Gallery({ videos, photos }) {
    const [active, setActive] = useState("videos")
    const [activeVideo, setActiveVideo] = useState(null)
    const [activePhoto, setActivePhoto] = useState(null)
    const [lightboxImage, setLightboxImage] = useState(null)

    useEffect(() => {
        if (videos && videos.length > 0) setActiveVideo(videos[0])
        if (photos?.backdrops && photos.backdrops.length > 0) setActivePhoto(photos.backdrops[0])
    }, [videos, photos])

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
                        <div className="media-main-video">
                            {activeVideo && activeVideo.site === "YouTube" && (
                                <iframe
                                    className="media-main"
                                    src={`https://www.youtube.com/embed/${activeVideo.key}`}
                                    title={activeVideo.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                        <h4 className="media-slider-title">All trailers</h4>
                        <div className="media-slider">
                            {videos.length > 1 ? (
                                videos.map((video, i) =>
                                    video.site === "YouTube" ? (
                                        <iframe
                                            className="media-item"
                                            key={video.key || i}
                                            src={`https://www.youtube.com/embed/${video.key}`}
                                            title={video.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            onClick={() => setActiveVideo(video)}
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
                    <div className="media-main-video">
                        {activePhoto && (
                            <img
                                src={`https://image.tmdb.org/t/p/original${activePhoto.file_path}`}
                                alt={`main`}
                                className="media-main"
                                onClick={() => setLightboxImage(`https://image.tmdb.org/t/p/original${activePhoto.file_path}`)}
                            />
                        )}
                    </div>

                    <h4 className="media-slider-title">All images</h4>
                    <div className="media-slider">
                        {photos.backdrops.length > 1 ? (
                            photos.backdrops.map((photo, i) => (
                                <img
                                    key={i}
                                    src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
                                    alt={`image.title img-${i}`}
                                    className="media-item"
                                    onClick={() => setActivePhoto(photo)}
                                />
                        ))
                        ) : (
                            <p className="component-empty">No more photos found</p>
                        )}
                    </div>

                    {lightboxImage && (
                    <div className="lightbox" onClick={() => setLightboxImage(null)}>
                        <img src={lightboxImage} alt="Full size" />
                        <span className="close-lightbox">&times;</span>
                    </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Gallery
