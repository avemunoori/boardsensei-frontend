// File: src/components/Dashboard/Dashboard.jsx

"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import { FaBook, FaQuestionCircle, FaTrophy, FaChartLine } from "react-icons/fa"
import AIChessCoach from "../AIChessCoach/AIChessCoach"
import "./Dashboard.css"

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState(null)
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
        const { data } = await API.get(`/auth/users/progress/${userId}`)
        setUserProgress(data.progress)
      } catch (err) {
        console.error("Error fetching user progress:", err)
        setError(err.response?.data?.message || "Failed to fetch user progress")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProgress()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-container">
        <h1>Loading your chess journey...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <p className="error-message">{error}</p>
      </div>
    )
  }

  const hasProgress = userProgress && (userProgress.lessonsCompleted.length > 0 || userProgress.quizzesCompleted.length > 0)

  return (
    <div className="dashboard-container">
      <h1>{hasProgress ? "Your Chess Journey" : "Welcome to BoardSensei!"}</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaBook className="card-icon" />
          <h2>Lessons</h2>
          {hasProgress ? (
            <p className="card-number">{userProgress.lessonsCompleted.length}</p>
          ) : (
            <p>Start your first lesson</p>
          )}
          <button onClick={() => navigate("/lessons")}>Explore Lessons</button>
        </div>
        <div className="dashboard-card">
          <FaQuestionCircle className="card-icon" />
          <h2>Quizzes</h2>
          {hasProgress ? (
            <p className="card-number">{userProgress.quizzesCompleted.length}</p>
          ) : (
            <p>Test your knowledge</p>
          )}
          <button onClick={() => navigate("/quizzes")}>Take a Quiz</button>
        </div>
        <div className="dashboard-card">
          <FaTrophy className="card-icon" />
          <h2>Grandmaster Games</h2>
          <p>Analyze games from the best</p>
          <button onClick={() => navigate("/grandmaster-games")}>Explore Games</button>
        </div>
        <div className="dashboard-card">
          <FaChartLine className="card-icon" />
          <h2>Your Progress</h2>
          {hasProgress ? (
            <p>Track your improvement</p>
          ) : (
            <p>Start your journey</p>
          )}
          <button onClick={() => navigate("/profile")}>View Profile</button>
        </div>
      </div>
      {!hasProgress && (
        <div className="welcome-message">
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

export default Dashboard