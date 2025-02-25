import { NavLink } from "react-router-dom"
import { FaChessBoard, FaBook, FaQuestionCircle, FaTrophy, FaUser, FaTimes } from "react-icons/fa"
import "./Sidebar.css"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <button className="close-button" onClick={toggleSidebar}>
          <FaTimes className="close-icon" />
        </button>
        <nav className="sidebar-nav">
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
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={toggleSidebar}
            >
              <item.icon className="nav-icon" />
              <span className="nav-text">{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

