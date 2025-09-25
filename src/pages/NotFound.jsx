import "../css/NotFound.css"
function NotFound() {
  return (
    <div className="container error-page">
      <h1>404</h1>
      <h2>Page not found</h2>
      <a href="/" className="error-page-link">← Back to Home Page</a>
    </div>
  )
}

export default NotFound
