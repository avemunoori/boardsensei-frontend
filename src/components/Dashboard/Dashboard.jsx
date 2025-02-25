import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import { FaBook, FaQuestionCircle, FaTrophy, FaChartLine } from "react-icons/fa"
import AIChessCoach from "../AIChessCoach/AIChessCoach"

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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const hasProgress = userProgress.lessonsCompleted.length > 0 || userProgress.quizzesCompleted.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-display font-bold mb-8 text-center text-gray-900">{hasProgress ? "Your Chess Journey" : "Welcome to BoardSensei!"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="bg-white shadow-soft rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-display font-bold mb-4 text-primary-600">Get Started with BoardSensei</h2>
          <p className="mb-4 text-gray-700">Welcome to your personal chess improvement journey! Here are some ways to begin:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
            <li>Take your first lesson to learn new concepts</li>
            <li>Challenge yourself with a quiz to test your knowledge</li>
            <li>Analyze grandmaster games to improve your strategic thinking</li>
            <li>Use the AI Chess Coach for personalized advice</li>
          </ul>
          <p className="text-gray-700">Your progress will be tracked as you complete lessons and quizzes. Good luck!</p>
        </div>
      )}
      <AIChessCoach />
    </div>
  )
}

const DashboardCard = ({ icon: Icon, title, count, action, buttonText }) => (
  <div className="bg-white shadow-soft rounded-xl p-6 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
    <Icon className="text-4xl text-primary-600 mb-4" />
    <h2 className="text-xl font-display font-semibold mb-2 text-gray-900">{title}</h2>
    {count !== undefined && <p className="text-3xl font-bold text-primary-600 mb-4">{count}</p>}
    <button
      onClick={action}
      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out"
    >
      {buttonText}
    </button>
  </div>
)

export default Dashboard