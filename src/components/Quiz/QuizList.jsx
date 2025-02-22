"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import { FaSearch, FaQuestionCircle, FaFilter, FaTrophy, FaArrowRight } from "react-icons/fa"
import "./QuizList.css"

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const { data } = await API.get("/quizzes")
      setQuizzes(data.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch quizzes")
    } finally {
      setLoading(false)
    }
  }

  const filteredQuizzes = quizzes.filter((quiz) => {
    const quizTitle = quiz.openingName || ""
    return quizTitle.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleStartQuiz = (quizId) => {
    navigate(`/quizzes/${quizId}`)
  }

  if (loading) {
    return (
      <div className="quizzes-loading">
        <div className="trophy-loader">
          <FaTrophy className="loader-icon" />
        </div>
        <p>Preparing your chess challenges...</p>
      </div>
    )
  }

  return (
    <div className="quiz-list-container">
      <div className="quiz-header">
        <h1>
          <FaQuestionCircle className="header-icon" />
          Test Your Chess Skills
        </h1>
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className={`filters-section ${showFilters ? "show" : ""}`}>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a specific quiz..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="quiz-grid">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <div className="quiz-card-content">
              <FaQuestionCircle className="quiz-icon" />
              <h2>{quiz.openingName || "Chess Quiz"}</h2>
              {quiz.lesson && <p>Related to: {quiz.lesson.name}</p>}
            </div>

            <button onClick={() => handleStartQuiz(quiz._id)} className="start-quiz-button">
              Take Quiz <FaArrowRight className="button-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizList

