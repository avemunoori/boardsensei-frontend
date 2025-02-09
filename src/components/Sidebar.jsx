import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Update state so user is no longer authenticated
    setIsAuthenticated(false);
    // Redirect to the public home or login page
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>BoardSensei</h1>
      </div>

      <nav className="sidebar-nav">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink>
            <NavLink to="/lessons" className="sidebar-link">Lessons</NavLink>
            <NavLink to="/quizzes" className="sidebar-link">Quizzes</NavLink>
            <NavLink to="/grandmaster-games" className="sidebar-link">Grandmaster Games</NavLink>
            <NavLink to="/profile" className="sidebar-link">Profile</NavLink>
            {/* Logout Button */}
            <button onClick={handleLogout} className="sidebar-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/" className="sidebar-link">Home</NavLink>
            <NavLink to="/login" className="sidebar-link">Login</NavLink>
            <NavLink to="/register" className="sidebar-link">Register</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
