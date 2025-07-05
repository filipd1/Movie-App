import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"

function Login() {

    const { login } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            const res = await axios.post("http://localhost:5000/api/login", formData)
            setSuccess(res.data.message)
            login(res.data.token, res.data.user)
            setTimeout(() => navigate("/"), 1000)
        } catch (err) {
            console.log("Login error:", err)
            setError(err.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="container">
            <h2 className="container-title">Login</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                <Link to="/register">register</Link>
            </form>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default Login