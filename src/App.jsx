import './css/App.css'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'

function App() {

  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/movie/:id" element={<MoviePage/>} />
        </Routes>
      </main>
      <Footer/>
    </MovieProvider>
  )
}


export default App
