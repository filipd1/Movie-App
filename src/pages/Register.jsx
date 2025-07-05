import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
            const res = await axios.post("http://localhost:5000/api/register", formData)
            setSuccess(res.data.message)
            setTimeout(() => navigate("/login"), 2000)
        } catch (err) {
            console.log("Register error:", err)
            setError(err.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="container">
            <h2 className="container-title">Register</h2>
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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
                <button type="submit">Register</button>
                <Link to="/login">login</Link>
            </form>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default Register