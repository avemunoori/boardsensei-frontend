import React from "react"
import { NavLink } from "react-router-dom"
import { FaChessBoard, FaBook, FaQuestionCircle, FaTrophy, FaUser, FaTimes } from "react-icons/fa"
import "./Sidebar.css"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} onClick={toggleSidebar}>
          <FaChessBoard className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/lessons" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} onClick={toggleSidebar}>
          <FaBook className="sidebar-icon" />
          <span>Lessons</span>
        </NavLink>
        <NavLink to="/quizzes" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} onClick={toggleSidebar}>
          <FaQuestionCircle className="sidebar-icon" />
          <span>Quizzes</span>
        </NavLink>
        <NavLink to="/grandmaster-games" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} onClick={toggleSidebar}>
          <FaTrophy className="sidebar-icon" />
          <span>Grandmaster Games</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} onClick={toggleSidebar}>
          <FaUser className="sidebar-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar