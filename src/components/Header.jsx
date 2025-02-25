import React from "react"
import { useNavigate } from "react-router-dom"
import { FaChess, FaSignOutAlt, FaBars } from "react-icons/fa"

const Header = ({ isAuthenticated, setIsAuthenticated, toggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {isAuthenticated && (
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={toggleSidebar}
          >
            <FaBars className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center">
          <FaChess className="text-3xl text-primary-600 mr-2" />
          <h1 className="text-2xl font-display font-bold text-gray-900">BoardSensei</h1>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header