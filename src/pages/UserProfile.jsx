import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`/api/users/${username}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
  }, [username])

  if (!user) return <div>Loading...</div>

  return (
    <div className="container">
      <h2>Profil użytkownika</h2>
      <p>{user.username}</p>
      <p>Email: {user.email}</p>
      <p>Dołączył: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default UserProfile
