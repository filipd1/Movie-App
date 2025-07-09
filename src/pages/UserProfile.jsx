import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../css/UserProfile.css"
import Favorites from "../components/Favorites.jsx"
import Watchlist from "../components/Watchlist.jsx"
import { useMovieContext } from "../contexts/MovieContext"

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [votesShown, setVotesShown] = useState(true)
  const [favoritesShown, setfavoritesShown] = useState(false)
  const [watchlistShown, setwatchlistShown] = useState(false)
  const { favorites, watchlist } = useMovieContext();

  useEffect(() => {
    axios.get(`/api/users/${username}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err))

    if (username) {
      document.title = username + "'s Profile"
    } else {
      document.title = "Ładowanie..."
    }
  }, [username])

  if (!user) return <div>Loading...</div>

  return (
    <div className="container">

      <div className="user-profile">
        <div className="user-info-wrapepr">
          <img src="https://avatar.iran.liara.run/public/boy" alt="user-avatar" />
          <div className="user-info">
            <h2>{user.username}</h2>
            <p>E-mail: {user.email}</p>
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <hr className="user-hr"/>

        <div className="user-button-wrapper">
          <button
            className={`user-button ${votesShown ? "user-button-active" : ""}`}
            onClick={() => {
              setVotesShown(true)
              setfavoritesShown(false)
              setwatchlistShown(false)
            }}
          >
            Votes
          </button>

          <button
            className={`user-button ${watchlistShown ? "user-button-active" : ""}`}
            onClick={() => {
              setVotesShown(false)
              setfavoritesShown(false)
              setwatchlistShown(true)
            }}
          >
            Watchlist ({watchlist.length})
          </button>

          <button
            className={`user-button ${favoritesShown ? "user-button-active" : ""}`}
            onClick={() => {
              setVotesShown(false)
              setfavoritesShown(true)
              setwatchlistShown(false)
            }}
          >
            Favorites ({favorites.length})
          </button>
        </div>
      </div>

      {votesShown &&
       <div className="user-votes">Votes</div>
      }

      {watchlistShown && <Watchlist/>}
      {favoritesShown && <Favorites/>}
      
    </div>
  )
}

export default UserProfile
