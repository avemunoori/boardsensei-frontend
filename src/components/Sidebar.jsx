import { NavLink } from "react-router-dom"
import { FaChessBoard, FaBook, FaQuestionCircle, FaTrophy, FaUser } from "react-icons/fa"
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <FaChessBoard /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/lessons" className="sidebar-link">
          <FaBook /> <span>Lessons</span>
        </NavLink>
        <NavLink to="/quizzes" className="sidebar-link">
          <FaQuestionCircle /> <span>Quizzes</span>
        </NavLink>
        <NavLink to="/grandmaster-games" className="sidebar-link">
          <FaTrophy /> <span>Grandmaster Games</span>
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          <FaUser /> <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar

