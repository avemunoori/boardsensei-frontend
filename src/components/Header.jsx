// components/Header.jsx
import React from "react"
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
    <header className="app-header">
      <div className="header-content">
        {isAuthenticated && (
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        )}
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