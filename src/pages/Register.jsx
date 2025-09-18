import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../css/Register.css"

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Register"
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            const { username, email, password } = formData
            const res = await axios.post("https://movie-app-backend-xcuo.onrender.com/register", {
                username,
                email,
                password
            })
            setSuccess(res.data.message)
            setTimeout(() => navigate("/login"), 1000)
        } catch (err) {
            console.log("Register error:", err)
            setError(err.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="container">
            <div className="form-wrapper">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2 className="container-title">Create your account</h2>
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign in</button>
                    <p>Already registered?<Link to="/login"> login</Link></p>
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Register