let currentLanguage = "en-US"

export const setCurrentLanguage = (lang) => {
    currentLanguage = lang === "pl" ? "pl-PL" : "en-US"
}

export const getCurrentLanguage = () => currentLanguage
