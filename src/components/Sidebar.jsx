import { NavLink } from "react-router-dom"
import { FaChessBoard, FaBook, FaQuestionCircle, FaTrophy, FaUser } from "react-icons/fa"
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaChessBoard className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/lessons" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaBook className="sidebar-icon" />
          <span>Lessons</span>
        </NavLink>
        <NavLink to="/quizzes" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaQuestionCircle className="sidebar-icon" />
          <span>Quizzes</span>
        </NavLink>
        <NavLink to="/grandmaster-games" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaTrophy className="sidebar-icon" />
          <span>Grandmaster Games</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <FaUser className="sidebar-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar

