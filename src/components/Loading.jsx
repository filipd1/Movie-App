import "../css/Loading.css"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function Loading() {

  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{t.loading}</p>
    </div>
  )
}

export default Loading
