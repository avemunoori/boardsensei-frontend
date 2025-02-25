import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import { FaBook, FaQuestionCircle, FaTrophy, FaChartLine } from "react-icons/fa"
import AIChessCoach from "../AIChessCoach/AIChessCoach"
import "./Dashboard.css"

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState({ lessonsCompleted: [], quizzesCompleted: [] })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found. Please log in.")
          setLoading(false)
          return
        }
        const userId = JSON.parse(atob(token.split(".")[1])).id
        const response = await API.get(`/auth/users/progress/${userId}`)
        
        if (response.data && response.data.progress) {
          setUserProgress(response.data.progress)
        } else {
          setUserProgress({ lessonsCompleted: [], quizzesCompleted: [] })
        }
      } catch (err) {
        console.error("Error fetching user progress:", err)
        if (err.response?.status !== 400) {
          setError(err.response?.data?.message || "Failed to fetch user progress")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserProgress()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Dashboard</h1>
        <p className="error-message">{error}</p>
      </div>
    )
  }

  const hasProgress = userProgress.lessonsCompleted.length > 0 || userProgress.quizzesCompleted.length > 0

  return (
    <div className="dashboard-container">
      <h1>{hasProgress ? "Your Chess Journey" : "Welcome to BoardSensei!"}</h1>
      <div className="dashboard-grid">
        <DashboardCard
          icon={FaBook}
          title="Lessons"
          count={userProgress.lessonsCompleted.length}
          action={() => navigate("/lessons")}
          buttonText="Explore Lessons"
        />
        <DashboardCard
          icon={FaQuestionCircle}
          title="Quizzes"
          count={userProgress.quizzesCompleted.length}
          action={() => navigate("/quizzes")}
          buttonText="Take a Quiz"
        />
        <DashboardCard
          icon={FaTrophy}
          title="Grandmaster Games"
          action={() => navigate("/grandmaster-games")}
          buttonText="Explore Games"
        />
        <DashboardCard
          icon={FaChartLine}
          title="Your Progress"
          action={() => navigate("/profile")}
          buttonText="View Profile"
        />
      </div>
      {!hasProgress && (
        <div className="get-started-container">
          <h2>Get Started with BoardSensei</h2>
          <p>Welcome to your personal chess improvement journey! Here are some ways to begin:</p>
          <ul>
            <li>Take your first lesson to learn new concepts</li>
            <li>Challenge yourself with a quiz to test your knowledge</li>
            <li>Analyze grandmaster games to improve your strategic thinking</li>
            <li>Use the AI Chess Coach for personalized advice</li>
          </ul>
          <p>Your progress will be tracked as you complete lessons and quizzes. Good luck!</p>
        </div>
      )}
      <AIChessCoach />
    </div>
  )
}

const DashboardCard = ({ icon: Icon, title, count, action, buttonText }) => (
  <div className="dashboard-card">
    <Icon className="card-icon" />
    <h2>{title}</h2>
    {count !== undefined && <p className="card-count">{count}</p>}
    <button onClick={action} className="card-button">
      {buttonText}
    </button>
  </div>
)

export default Dashboard