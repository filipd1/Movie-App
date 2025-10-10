import { createContext, useState, useContext, useEffect } from "react"
import { setCurrentLanguage } from "./LangContextHelper"

const LangContext = createContext()

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en")

    useEffect(() => {
        setCurrentLanguage(language)
        localStorage.setItem("language", language)
    }, [language])

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "pl" : "en"))
        window.location.reload()
    }

    return (
        <LangContext.Provider value={{ language, toggleLanguage }}>
        {children}
        </LangContext.Provider>
    )
}

export const useLanguage = () => useContext(LangContext)
