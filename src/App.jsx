import './css/App.css'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVSeries from './pages/TVSeries'
import MoviePage from './pages/MoviePage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import PersonPage from './pages/PersonPage'
import TVSeriesPage from './pages/TVSeriesPage'
import Watchlist from './pages/Watchlist'
import FullCast from './pages/FullCast'
import SearchResults from './pages/SearchResults'

function App() {

  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<SearchResults/>} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/tvseries" element={<TVSeries/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/watchlist" element={<Watchlist/>} />
          <Route path="/movie/:id" element={<MoviePage/>} />
          <Route path="/tv/:id" element={<TVSeriesPage/>} />
          <Route path="/person/:id" element={<PersonPage/>} />
          <Route path="/:mediaTypeURL/:id/cast/" element={<FullCast/>} />
        </Routes>
      </main>
      <Footer/>
    </MovieProvider>
  )
}


export default App
