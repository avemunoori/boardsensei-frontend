import React from "react"
import { NavLink } from "react-router-dom"
import { FaChessBoard, FaBook, FaQuestionCircle, FaTrophy, FaUser, FaTimes } from "react-icons/fa"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-800 md:translate-x-0`}>
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-white md:hidden"
        onClick={toggleSidebar}
      >
        <FaTimes className="text-xl" />
      </button>
      <nav className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {[
            { to: "/dashboard", icon: FaChessBoard, text: "Dashboard" },
            { to: "/lessons", icon: FaBook, text: "Lessons" },
            { to: "/quizzes", icon: FaQuestionCircle, text: "Quizzes" },
            { to: "/grandmaster-games", icon: FaTrophy, text: "Grandmaster Games" },
            { to: "/profile", icon: FaUser, text: "Profile" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive
                      ? 'text-white bg-blue-600'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
                onClick={toggleSidebar}
              >
                <item.icon className="w-6 h-6 transition duration-75" />
                <span className="ml-3">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar