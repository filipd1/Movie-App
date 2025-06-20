import { Link } from "react-router-dom"
import "../css/Navbar.css"
import searchIcon from "../assets/search.svg"
import dropdownIcon from "../assets/dropdown.svg"

function NavBar() {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/"><img src="/Logo.png" alt="movie app" /></Link>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/" className="nav-link">Movies</Link>
                    <Link to="/" className="nav-link">TV Series</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </div>
                <div className="navbar-account">
                    <img src={searchIcon} alt="search" />
                    <img className="navbar-avatar" src="/Profile_photo.png" alt="avatar" />
                    <p className="navbar-name">Henryk</p>
                    <img src={dropdownIcon} alt="dropdown" />
                </div>
            </nav>
        </header>
    )
}

export default NavBar