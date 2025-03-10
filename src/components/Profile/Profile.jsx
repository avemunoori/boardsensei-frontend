import React, { useEffect, useState } from "react"
import API from "../../services/api"
import { FaChessKnight, FaQuestionCircle } from "react-icons/fa"
import "./Profile.css"

const Profile = () => {
  const [userProgress, setUserProgress] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found. Please log in again.")
          return
        }
        const userId = JSON.parse(atob(token.split(".")[1])).id
        const { data } = await API.get(`/auth/users/progress/${userId}`)
        setUserProgress(data.progress)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch progress")
      }
    }

    fetchUserProgress()
  }, [])

  if (error) {
    return (
      <div className="profile-container">
        <h1>Your Profile</h1>
        <p className="error-message">{error}</p>
      </div>
    )
  }

  if (!userProgress) {
    return (
      <div className="profile-container">
        <h1>Your Profile</h1>
        <p className="loading-message">Loading your chess journey...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <h1>Your Chess Journey</h1>
      <div className="profile-content">
        <div className="progress-section">
          <h2><FaChessKnight /> Lessons Completed</h2>
          <ul>
            {userProgress.lessonsCompleted.map((lesson) => (
              <li key={lesson._id}>{lesson.name}</li>
            ))}
          </ul>
        </div>
        <div className="progress-section">
          <h2><FaQuestionCircle /> Quizzes Completed</h2>
          <ul>
            {userProgress.quizzesCompleted.map((quiz) => {
              const quizTitle = quiz.openingName || quiz.lesson?.name || "Unknown Quiz"
              return <li key={quiz._id}>{`Quiz on ${quizTitle}`}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile