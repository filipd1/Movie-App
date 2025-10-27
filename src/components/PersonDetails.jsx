import "../css/PersonDetails.css"
import bioIcon from "../assets/bio.svg"
import birthIcon from "../assets/calendar.svg"
import placeIcon from "../assets/location.svg"
import deathIcon from "../assets/tombstone.svg"
import personIcon from "../assets/person.svg"
import { useState, useEffect } from "react"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function PersonDetails({ person }) {

    function formatDate(dateString) {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(date)
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const { language } = useLanguage()
    const t = translations[language]

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768)
        }
            handleResize();
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
    }, [])

    const truncateToWord = (text, limit) => {
        if (!text) return t.personBiographyEmpty
        if (text.length <= limit) return text
        const truncated = text.slice(0, limit)
        const lastSpace = truncated.lastIndexOf(" ")
        return (lastSpace === -1 ? truncated : truncated.slice(0, lastSpace)) + "..."
    }

    const shouldTruncate = isMobile && person && person.biography && person.biography.length > 300
    const displayedBio = shouldTruncate && !isExpanded ? truncateToWord(person.biography, 300) : (person.biography || t.personBiographyEmpty)

    return (
        <div className="person-details">
            <h5 className="media-type">{person.known_for_department}</h5>
            <h1>{person.name}</h1>
            <div className="person-details-inner">
                <div className="person-details-left">
                    <img
                        className="person-img"
                        src={person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : "/person_placeholder.png"}
                        alt={person.name}
                    />
                    <div className="person-left-info">
                        <div className="flex"><img src={birthIcon} alt="birth-icon" /><strong>{t.personBirthday}</strong></div>
                        <p>{formatDate(person.birthday)}</p>
                        <div className="flex"><img src={placeIcon} alt="place-icon" /><strong>{t.personPlaceOfBirth}</strong></div>         
                        <p>{person.place_of_birth}</p>
                        {person.deathday && 
                            <>
                                <div className="flex"><img src={deathIcon} alt="death-icon" /><strong>{t.personDeathday}</strong></div>
                                <p>{formatDate(person.deathday)}</p>
                            </>
                        }
                        <div className="flex"><img src={personIcon} alt="place-icon" /><strong>{t.personGender}</strong></div>         
                        <p>{person.gender === 1 ? t.personGender1 : person.gender === 2 ? t.personGender2 : t.personGender3}</p>
                    </div>
                </div>

                <div className="person-details-right">
                    <div className="flex"><img src={bioIcon} alt="bio-icon" /><h4>{t.personBiography}</h4></div>                   
                    <p className="person-bio">{displayedBio}</p>
                    {shouldTruncate && (
                    <button
                        className="read-more-btn"
                        onClick={() => setIsExpanded(prev => !prev)}
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default PersonDetails