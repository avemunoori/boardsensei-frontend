"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import { FaBook, FaQuestionCircle, FaTrophy, FaChartLine } from "react-icons/fa"
import AIChessCoach from "../AIChessCoach/AIChessCoach"
import ProgressChart from "./ProgressChart"
import AchievementSystem from "./AchievementSystem"
import RecommendationEngine from "./RecommendationEngine"
import "./Dashboard.css"

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState({ lessonsCompleted: [], quizzesCompleted: [] })
  const [lessons, setLessons] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found. Please log in.")
          setLoading(false)
          return
        }

        // Fetch user progress
        const userId = JSON.parse(atob(token.split(".")[1])).id
        const progressResponse = await API.get(`/auth/users/progress/${userId}`)

        if (progressResponse.data && progressResponse.data.progress) {
          setUserProgress(progressResponse.data.progress)
        } else {
          setUserProgress({ lessonsCompleted: [], quizzesCompleted: [] })
        }

        // Fetch lessons and quizzes for recommendations
        const [lessonsResponse, quizzesResponse] = await Promise.all([API.get("/lessons"), API.get("/quizzes")])

        setLessons(lessonsResponse.data.data)
        setQuizzes(quizzesResponse.data.data)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        if (err.response?.status !== 400) {
          setError(err.response?.data?.message || "Failed to fetch user data")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

      {/* Quick Access Cards */}
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

      {/* Personalized Recommendations */}
      <RecommendationEngine userProgress={userProgress} lessons={lessons} quizzes={quizzes} />

      {/* Progress Visualization */}
      <ProgressChart userProgress={userProgress} />

      {/* Achievement System */}
      <AchievementSystem userProgress={userProgress} />

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

