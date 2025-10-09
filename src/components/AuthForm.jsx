import { useLanguage } from "../contexts/LangContext"
import { translations } from "../services/translations"

function AuthForm({ fields, buttonText, onSubmit, handleChange, success, error }) {

  const { language } = useLanguage()
  const t = translations[language]

  return (
    <form className="login-form" onSubmit={onSubmit}>
    <h2 className="container-title login-form-title">{t.loginTitle} <span>FilmScope</span></h2>
    <p className="login-form-subtitle">{t.loginSubtitle}</p>

      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          onChange={handleChange}
          required={field.required}
        />
      ))}

      <button type="submit" className="form-btn login-btn">{buttonText}</button>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  )
}

export default AuthForm