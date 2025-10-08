import { useLanguage } from "../contexts/LangContext"

function LangSwitch() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="language-switch">
      <label className="switch">
        <input type="checkbox" onChange={toggleLanguage} checked={language === "pl"} />
        <span className="slider"></span>
      </label>
      <p>{language === "pl" ? "PL" : "EN"}</p>
    </div>
  )
}

export default LangSwitch
