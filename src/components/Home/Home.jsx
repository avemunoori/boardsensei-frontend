import React from "react"
import { Link } from "react-router-dom"
import { FaChess, FaQuestionCircle, FaTrophy } from "react-icons/fa"
import "./Home.css"

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to BoardSensei</h1>
        <p>Master chess openings, take quizzes, and learn from grandmasters.</p>
        <div className="auth-buttons">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      </div>

      <div className="features-grid">
        {[
          { 
            icon: FaChess, 
            title: "Learn Openings", 
            description: "Explore and master popular chess openings to improve your game." 
          },
          { 
            icon: FaQuestionCircle, 
            title: "Take Quizzes", 
            description: "Test your knowledge with interactive quizzes and track your progress." 
          },
          { 
            icon: FaTrophy, 
            title: "Grandmaster Games", 
            description: "Study games from top grandmasters and learn from the best." 
          },
        ].map((feature, index) => (
          <div key={index} className="feature-card">
            <feature.icon className="feature-icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home