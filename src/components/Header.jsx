import { useNavigate } from "react-router-dom"
import { FaChess, FaSignOutAlt, FaBars } from "react-icons/fa"
import "./Header.css"

const Header = ({ isAuthenticated, setIsAuthenticated, toggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="header-container">
        {isAuthenticated && (
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars className="sidebar-toggle-icon" />
          </button>
        )}
        <div className="logo-container">
          <FaChess className="logo-icon" />
          <h1 className="logo-text">BoardSensei</h1>
        </div>
        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" /> Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

