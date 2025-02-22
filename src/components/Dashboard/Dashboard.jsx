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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found. Please log in.")
          return
        }
        const userId = JSON.parse(atob(token.split(".")[1])).id
        const { data } = await API.get(`/auth/users/progress/${userId}`)
        setUserProgress(data.progress)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user progress")
      }
    }

    fetchUserProgress()
  }, [])

  if (error) {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <p className="error-message">{error}</p>
      </div>
    )
  }

  if (!userProgress) {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <p className="loading-message">Loading your chess journey...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Chess Journey</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaBook className="card-icon" />
          <h2>Lessons Completed</h2>
          <p className="card-number">{userProgress.lessonsCompleted.length}</p>
          <button onClick={() => navigate("/lessons")}>Explore Lessons</button>
        </div>
        <div className="dashboard-card">
          <FaQuestionCircle className="card-icon" />
          <h2>Quizzes Completed</h2>
          <p className="card-number">{userProgress.quizzesCompleted.length}</p>
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
          <p>Track your chess journey</p>
          <button onClick={() => navigate("/profile")}>View Profile</button>
        </div>
      </div>
      <AIChessCoach />
    </div>
  )
}

export default Dashboard

