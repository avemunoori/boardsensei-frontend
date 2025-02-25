import { Link, useNavigate } from "react-router-dom"
import { FaChess, FaSignOutAlt, FaBars } from "react-icons/fa"
import "./Header.css"

const Header = ({ isAuthenticated, setIsAuthenticated, toggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate("/login")
  }

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard")
    } else {
      navigate("/")
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        {isAuthenticated && (
          <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <FaBars className="sidebar-toggle-icon" />
          </button>
        )}
        <div className="logo-container" onClick={handleLogoClick} role="button" tabIndex={0}>
          <FaChess className="logo-icon" />
          <h1 className="logo-text">BoardSensei</h1>
        </div>
        {isAuthenticated ? (
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" /> Logout
          </button>
        ) : (
          <nav className="auth-nav">
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header