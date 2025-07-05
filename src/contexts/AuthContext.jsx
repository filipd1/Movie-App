import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")
        if (token && userData) {
            setUserLoggedIn(true)
            setUser(JSON.parse(userData))
        } else {
            setUserLoggedIn(false)
            setUser(null)
        }
    }, [])

    const login = (token, userData) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUserLoggedIn(true)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserLoggedIn(false)
        setUser(null)
    }

    const value = {
        userLoggedIn,
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}