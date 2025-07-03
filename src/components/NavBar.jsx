import { Link, NavLink, useNavigate } from "react-router-dom"
import "../css/Navbar.css"
import { useState, useEffect, useRef } from "react"
import searchIcon from "../assets/search.svg"
import dropdownIcon from "../assets/dropdown.svg"
import menuIcon from "../assets/menu.svg"
import exitIcon from "../assets/exit.svg"

function NavBar() {
    const [query, setQuery] = useState("")
    const [showSearchForm, setShowSearchForm] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const searchRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const menuButtonRef = useRef(null)
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
                showSearchForm &&
                searchRef.current &&
                !searchRef.current.contains(e.target)
            )
                setShowSearchForm(false)
            if (
                showMobileMenu &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(e.target)
            )
                setShowMobileMenu(false)
        }

        document.addEventListener("mousedown", handleClickOutsideForm)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideForm)
        }
    }, [showSearchForm, showMobileMenu])

    return (
        <header>
            <nav className="navbar">
                <Link to="/"><img src="/Logo.png" alt="movie app" /></Link>
                <div className="navbar-links">
                    <NavLink to="/movies" className="nav-link ">Movies</NavLink>
                    <NavLink to="/tvseries" className="nav-link">TV Series</NavLink>
                    <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
                    <NavLink to="/watchlist" className="nav-link">Watchlist</NavLink>
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

                <button onClick={() => setShowMobileMenu(prev => !prev)} className="mobile-menu-button" ref={menuButtonRef}>
                    <img src={showMobileMenu ? exitIcon : menuIcon} className="mobile-menu-icon" alt="mobile-menu" />
                </button>
                
                {showMobileMenu && 
                    <div className="mobile-menu" ref={mobileMenuRef}>
                        <div className="mobile-menu-links">
                            <Link to="/movies" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>Movies</Link>
                            <Link to="/tvseries" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>TV Series</Link>
                            <Link to="/favorites" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>Favorites</Link>
                            <Link to="/watchlist" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>Watchlist</Link>
                            <Link to="/" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>Account</Link>
                        </div>
                    </div>
                }

            </nav>
        </header>
    )
}

export default NavBar