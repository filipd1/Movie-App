import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import searchIcon from "../assets/search.svg"
import dropdownIcon from "../assets/dropdown.svg"
import menuIcon from "../assets/menu.svg"
import exitIcon from "../assets/exit.svg"
import "../css/Navbar.css"
import LangSwitch from "./LangSwitch"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function NavBar() {
    const [query, setQuery] = useState("")
    const [showSearchForm, setShowSearchForm] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)

    const {userLoggedIn, user, logout} = useContext(AuthContext)

    const searchRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const menuButtonRef = useRef(null)
    const dropdownMenuRef = useRef(null)
    const dropdownMenuButtonRef = useRef(null)
    const navigate = useNavigate()

    const { language } = useLanguage()
    const t = translations[language]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setQuery("")
            setShowSearchForm(false)
        }
    }

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
        setShowDropdownMenu(false)
        setShowMobileMenu(false)
        setShowSearchForm(false)
        navigate("/")
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
            if (
                showDropdownMenu &&
                dropdownMenuRef.current &&
                !dropdownMenuRef.current.contains(e.target) &&
                dropdownMenuButtonRef.current &&
                !dropdownMenuButtonRef.current.contains(e.target)
            )
                setShowDropdownMenu(false)
        }

        document.addEventListener("mousedown", handleClickOutsideForm)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideForm)
        }
    }, [showSearchForm, showMobileMenu, showDropdownMenu])

    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="navbar-logo"><img src="/Logo2.png" alt="movie app" /><span>FilmScope</span></Link>
                <div className="navbar-links">
                    <NavLink to="/movies" className="nav-link ">{t.navbarMovies}</NavLink>
                    <NavLink to="/tvseries" className="nav-link">{t.navbarTV}</NavLink>
                </div>
                <div className="navbar-account">
                    <button className="navbar-search-button" onClick={() => setShowSearchForm(prev => !prev)}>
                        <img src={searchIcon} alt="search" />
                    </button>
                    <form
                        className={`search-form navbar-search-form ${showSearchForm ? "show" : ""}`}
                        onSubmit={handleSubmit}
                        ref={searchRef}>
                            <input
                                type="text"
                                placeholder={`${t.searchText}...`}
                                className="search-input navbar-search-input"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                    </form>


                    {userLoggedIn ? (
                        <>
                            <Link to={`/users/${user.username}`}><img className="navbar-avatar" src="https://avatar.iran.liara.run/public/boy" alt="avatar" /></Link>
                            <Link to={`/users/${user.username}`}><p className="navbar-name">{user?.username}</p></Link>
                            <button onClick={() => setShowDropdownMenu(prev => !prev)} className="dropdown-menu-button" ref={dropdownMenuButtonRef}>
                                <img src={dropdownIcon} alt="dropdown" />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="button-main button-nav">Login</Link>
                    )}

                    <LangSwitch></LangSwitch>

                    <div className={`dropdown-menu ${showDropdownMenu ? "show" : ""}`} ref={dropdownMenuRef} aria-hidden={!showDropdownMenu}>
                        <div className="dropdown-menu-links">
                            <Link to="/movies" className="dropdown-menu-link" onClick={() => setShowMobileMenu(false)}>{t.dropdownMenuItem1}</Link>
                            <Link to="/tvseries" className="dropdown-menu-link" onClick={() => setShowMobileMenu(false)}>{t.dropdownMenuItem2}</Link>
                            <Link to={user ? `/users/${user.username}` : "#"} className="dropdown-menu-link" onClick={() => setShowDropdownMenu(false)}>{t.dropdownMenuItem3}</Link>
                            <Link to="/" className="dropdown-menu-link" onClick={handleLogout}>{t.dropdownMenuItem4}</Link>
                        </div>
                    </div>
                    
                </div>

                <button onClick={() => setShowMobileMenu(prev => !prev)} className="mobile-menu-button" ref={menuButtonRef}>
                    <img src={showMobileMenu ? exitIcon : menuIcon} className="mobile-menu-icon" alt="mobile-menu" />
                </button>
                
                <div className={`mobile-menu ${showMobileMenu ? "mobile-menu-active" : ""}`} ref={mobileMenuRef}>
                    <div className="mobile-menu-links">
                        <Link to="/movies" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>{t.dropdownMenuItem1}</Link>
                        <Link to="/tvseries" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>{t.dropdownMenuItem2}</Link>
                        <Link to="/" className="mobile-menu-link" onClick={() => setShowMobileMenu(false)}>{t.dropdownMenuItem3}</Link>
                        {userLoggedIn ? <Link to="/" className="mobile-menu-link" onClick={handleLogout}>{t.dropdownMenuItem4}</Link> : <Link to="/login" className="mobile-menu-link">Login</Link>}
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default NavBar