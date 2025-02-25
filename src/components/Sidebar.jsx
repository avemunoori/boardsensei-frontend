import React from "react"
import { NavLink } from "react-router-dom"
import { FaChessBoard, FaBook, FaQuestionCircle, FaTrophy, FaUser, FaTimes } from "react-icons/fa"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white shadow-soft`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={toggleSidebar}
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <nav className="space-y-2 mt-8">
          {[
            { to: "/dashboard", icon: FaChessBoard, text: "Dashboard" },
            { to: "/lessons", icon: FaBook, text: "Lessons" },
            { to: "/quizzes", icon: FaQuestionCircle, text: "Quizzes" },
            { to: "/grandmaster-games", icon: FaTrophy, text: "Grandmaster Games" },
            { to: "/profile", icon: FaUser, text: "Profile" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center p-2 text-base font-normal rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-white bg-primary-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
              onClick={toggleSidebar}
            >
              <item.icon className="w-6 h-6 transition duration-75" />
              <span className="ml-3">{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar