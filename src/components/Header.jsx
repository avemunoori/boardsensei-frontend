import { useNavigate } from "react-router-dom"
import { FaChess, FaSignOutAlt } from "react-icons/fa"
import "./Header.css"

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate("/")}>
          <FaChess className="logo-icon" />
          <h1>BoardSensei</h1>
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

