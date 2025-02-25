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
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {isAuthenticated && (
          <button
            className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors md:hidden"
            onClick={toggleSidebar}
          >
            <FaBars className="text-xl" />
          </button>
        )}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <FaChess className="text-3xl text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-white">BoardSensei</h1>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header