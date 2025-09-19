function AuthForm({ fields, buttonText, onSubmit, handleChange, success, error }) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
    <h2 className="container-title login-form-title">Welcome to <span>FilmScope</span></h2>
    <p className="login-form-subtitle">Your universe of movies, reviews & ratings</p>

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