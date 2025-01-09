import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>BoardSensei</h1>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/lessons" className="sidebar-link" activeClassName="active">
          Lessons
        </NavLink>
        <NavLink to="/quiz" className="sidebar-link" activeClassName="active">
          Quizzes
        </NavLink>
        <NavLink to="/grandmaster-games" className="sidebar-link" activeClassName="active">
          Grandmaster Games
        </NavLink>
        <NavLink to="/profile" className="sidebar-link" activeClassName="active">
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
