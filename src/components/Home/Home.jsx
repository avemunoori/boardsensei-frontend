import { Link } from "react-router-dom"
import { FaChess, FaQuestionCircle, FaTrophy, FaGraduationCap } from "react-icons/fa"
import "./Home.css"

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to BoardSensei</h1>
        <p>Elevate your chess game with expert lessons, challenging quizzes, and grandmaster insights.</p>
        <div className="auth-buttons">
          <Link to="/login" className="login-button">
            Sign In
          </Link>
          <Link to="/register" className="register-button">
            Get Started
          </Link>
        </div>
      </div>

      <div className="features-grid">
        {[
          {
            icon: FaGraduationCap,
            title: "Expert Lessons",
            description: "Learn from carefully crafted lessons designed to improve your chess skills at any level.",
          },
          {
            icon: FaQuestionCircle,
            title: "Interactive Quizzes",
            description: "Test your knowledge and reinforce your learning with our engaging chess quizzes.",
          },
          {
            icon: FaTrophy,
            title: "Grandmaster Analysis",
            description: "Study and analyze games from top grandmasters to understand high-level strategies.",
          },
          {
            icon: FaChess,
            title: "AI-Powered Coaching",
            description: "Get personalized advice and insights from our advanced AI chess coach.",
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

