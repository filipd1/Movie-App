import "../css/NotFound.css"
import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function NotFound() {

  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container error-page">
      <h1>404</h1>
      <h2>Page not found</h2>
      <a href="/" className="error-page-link">← Back to Home Page</a>
    </div>
  )
}

export default NotFound
