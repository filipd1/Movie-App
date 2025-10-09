import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LangContext"
import axios from "axios"
import "../css/Login.css"
import directorIcon from "../assets/director-icon.svg"
import AuthForm from "../components/AuthForm"
import { translations } from "../services/translations"

function Login() {

    const { language } = useLanguage()
    const t = translations[language]

    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [haveAccount, setHaveAccount] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Login"
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            const { username, password } = formData
            const res = await axios.post("https://movie-app-backend-xcuo.onrender.com/login", {username, password})
            setSuccess(res.data.message)
            login(res.data.token, res.data.user)
            navigate("/")
            window.location.reload()
        } catch (err) {
            console.log("Login error:", err)
            setError(err.response?.data?.message || "Something went wrong")
        }
    }

    const handleRegisterSubmit = async (e) => {
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
            setTimeout(() => window.location.reload(), 1000)
        } catch (err) {
            console.log("Register error:", err)
            setError(err.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="login-container">
            <div className="form-wrapper">
                {haveAccount ? (
                    <AuthForm
                        fields={[
                            { name: "username", type: "text", placeholder: "Username", value: formData.username, required: true },
                            { name: "password", type: "password", placeholder: "Password", value: formData.password, required: true }
                        ]}
                        buttonText="Login"
                        onSubmit={handleLoginSubmit}
                        handleChange={handleChange}
                        success={success}
                        error={error}
                    />
                    ) : (
                    <AuthForm
                        fields={[
                            { name: "username", type: "text", placeholder: "Username", value: formData.username, required: true },
                            { name: "email", type: "email", placeholder: "Email", value: formData.email, required: true },
                            { name: "password", type: "password", placeholder: "Password", value: formData.password, required: true },
                            { name: "confirmPassword", type: "password", placeholder: "Confirm password", value: formData.confirmPassword, required: true }
                        ]}
                        buttonText="Register"
                        onSubmit={handleRegisterSubmit}
                        handleChange={handleChange}
                        success={success}
                        error={error}
                    />
                )}

                <div className="form-desc">
                    <div className="flex">
                        <img src={directorIcon} alt="icon" />
                        <p>{t.loginFormDesc1}</p>
                    </div>
                    <div className="flex">
                        <img src={directorIcon} alt="icon" />
                        <p>{t.loginFormDesc2}.</p>
                    </div>
                    <div className="flex">
                        <img src={directorIcon} alt="icon" />
                        <p>{t.loginFormDesc3}</p>
                    </div>
                    <div className="flex">
                        <img src={directorIcon} alt="icon" />
                        <p>{t.loginFormDesc4}</p>
                    </div>

                    <p className="form-desc-paragraph">{t.loginFormDesc5}</p>
                    <button type="submit" className="form-btn" onClick={() => setHaveAccount(prev => !prev)}>{haveAccount ? t.loginFormButton1 : t.loginFormButton2}</button>
                </div>
            </div>
        </div>
    )
}

export default Login