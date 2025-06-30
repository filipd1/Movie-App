import { Link } from "react-router-dom"
import "../css/Navbar.css"
import searchIcon from "../assets/search.svg"
import dropdownIcon from "../assets/dropdown.svg"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

function NavBar() {
    const [query, setQuery] = useState("")
    const [showSearchForm, setShowSearchForm] = useState(false)
    const searchRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setQuery("")
            setShowSearchForm(false)
        }
    }

    useEffect(() => {
        const handleClickOutsideForm = (e) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target)
            )
        setShowSearchForm(false)
        }

        document.addEventListener("mousedown", handleClickOutsideForm)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideForm)
        }
    }, [])

    return (
        <header>
            <nav className="navbar">
                <Link to="/"><img src="/Logo.png" alt="movie app" /></Link>
                <div className="navbar-links">
                    <Link to="/movies" className="nav-link">Movies</Link>
                    <Link to="/tvseries" className="nav-link">TV Series</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                    <Link to="/watchlist" className="nav-link">Watchlist</Link>
                </div>
                <div className="navbar-account">
                    
                        <form
                            className={`search-form navbar-search-form ${showSearchForm ? "show" : ""}`}
                            onSubmit={handleSubmit}
                            ref={searchRef}>
                                <input
                                    type="text"
                                    placeholder="Search.."
                                    className="search-input navbar-search-input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                        </form>
                    <button className="navbar-search-button" onClick={() => setShowSearchForm(prev => !prev)}>
                        <img src={searchIcon} alt="search" />
                    </button>
                    <img className="navbar-avatar" src="/Profile_photo.png" alt="avatar" />
                    <p className="navbar-name">Henryk</p>
                    <img src={dropdownIcon} alt="dropdown" />
                </div>
            </nav>
        </header>
    )
}

export default NavBar