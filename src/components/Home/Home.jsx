import React from "react";
import "./Home.css";

const Home = ({ setIsAuthenticated }) => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to BoardSensei</h1>
        <p>Master chess openings, take quizzes, and learn from grandmasters.</p>
        <div className="home-actions">
          <button onClick={() => (window.location.href = "/login")} className="home-button">
            Login
          </button>
          <button onClick={() => (window.location.href = "/register")} className="home-button">
            Register
          </button>
        </div>
      </div>

      <div className="feature-cards">
        <div className="feature-card">
          <h3>Learn Openings</h3>
          <p>Explore and master popular chess openings to improve your game.</p>
        </div>
        <div className="feature-card">
          <h3>Take Quizzes</h3>
          <p>Test your knowledge with interactive quizzes and track your progress.</p>
        </div>
        <div className="feature-card">
          <h3>Grandmaster Games</h3>
          <p>Study games from top grandmasters and learn from the best.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
