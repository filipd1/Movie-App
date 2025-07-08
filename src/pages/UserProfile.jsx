import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "../css/UserProfile.css"
import Favorites from "../components/Favorites.jsx"
import Watchlist from "../components/Watchlist.jsx"

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [votesShown, setVotesShown] = useState(true)
  const [favoritesShown, setfavoritesShown] = useState(false)
  const [watchlistShown, setwatchlistShown] = useState(false)

  useEffect(() => {
    axios.get(`/api/users/${username}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
  }, [username])

  if (!user) return <div>Loading...</div>

  return (
    <div className="container">

        <div className="user-info-wrapepr">
          <img src="https://avatar.iran.liara.run/public/boy" alt="user-avatar" />
          <div className="user-info">
            <p>{user.username}</p>
            <p>E-mail: {user.email}</p>
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

      <div className="user-button-wrapper">
        <button
          className={`user-button ${votesShown && "user-button-active"}`}
          onClick={() => {
            setVotesShown(true)
            setfavoritesShown(false)
            setwatchlistShown(false)
          }}
        >
          Votes
        </button>

        <button
          className={`user-button ${watchlistShown&& "user-button-active"}`}
          onClick={() => {
            setVotesShown(false)
            setfavoritesShown(false)
            setwatchlistShown(true)
          }}
        >
          Watchlist
        </button>

        <button
          className={`user-button ${favoritesShown && "user-button-active"}`}
          onClick={() => {
            setVotesShown(false)
            setfavoritesShown(true)
            setwatchlistShown(false)
          }}
        >
          Favorites
        </button>
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
