import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import { AuthProvider } from './contexts/AuthContext'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVSeries from './pages/TVSeries'
import MoviePage from './pages/MoviePage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PersonPage from './pages/PersonPage'
import TVSeriesPage from './pages/TVSeriesPage'
import Watchlist from './pages/Watchlist'
import FullCast from './pages/FullCast'
import SearchResults from './pages/SearchResults'
import TopRatedMovies from './pages/TopRatedMovies'
import TopRatedTVSeries from './pages/TopRatedTVSeries'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'

function App() {

  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar/>
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/search" element={<SearchResults/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/top-movies" element={<TopRatedMovies/>} />
            <Route path="/tvseries" element={<TVSeries/>} />
            <Route path="/top-tvseries" element={<TopRatedTVSeries/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/watchlist" element={<Watchlist/>} />
            <Route path="/movie/:id" element={<MoviePage/>} />
            <Route path="/tv/:id" element={<TVSeriesPage/>} />
            <Route path="/person/:id" element={<PersonPage/>} />
            <Route path="/:mediaTypeURL/:id/cast" element={<FullCast/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/users/:username" element={<UserProfile/>} />
          </Routes>
        </main>
        <Footer/>
      </MovieProvider>
    </AuthProvider>
  )
}


export default App
