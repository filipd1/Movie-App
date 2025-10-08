import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { MediaProvider } from './contexts/MediaContext'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LangContext'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVSeries from './pages/TVSeries'
import MoviePage from './pages/MoviePage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PersonPage from './pages/PersonPage'
import TVSeriesPage from './pages/TVSeriesPage'
import FullCast from './pages/FullCast'
import SearchResults from './pages/SearchResults'
import TopRatedMovies from './pages/TopRatedMovies'
import TopRatedTVSeries from './pages/TopRatedTVSeries'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import PopularMovies from './pages/PopularMovies'
import PopularTVSeries from './pages/PopularTVSeries'
import NotFound from './pages/NotFound'

function App() {
  
  return (
    <AuthProvider>
      <MediaProvider>
        <LanguageProvider>
          <NavBar/>
          <main className='main-content'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/search" element={<SearchResults/>} />
              <Route path="/movies" element={<Movies/>} />
              <Route path="/top-movies" element={<TopRatedMovies/>} />
              <Route path="/popular-movies" element={<PopularMovies/>} />
              <Route path="/tvseries" element={<TVSeries/>} />
              <Route path="/top-tvseries" element={<TopRatedTVSeries/>} />
              <Route path="/popular-tvseries" element={<PopularTVSeries/>} />
              <Route path="/movie/:id" element={<MoviePage/>} />
              <Route path="/tv/:id" element={<TVSeriesPage/>} />
              <Route path="/person/:id" element={<PersonPage/>} />
              <Route path="/:mediaTypeURL/:id/cast" element={<FullCast/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/users/:username" element={<UserProfile/>} />
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </main>
          <Footer/>
        </LanguageProvider>
      </MediaProvider>
    </AuthProvider>
  )
}


export default App
