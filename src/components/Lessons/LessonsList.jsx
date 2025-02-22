"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import { FaSearch, FaChessKnight, FaFilter, FaBookOpen, FaArrowRight } from "react-icons/fa"
import "./LessonsList.css"

const LessonsList = () => {
  const [lessons, setLessons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    try {
      const { data } = await API.get("/lessons")
      setLessons(data.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch lessons")
    } finally {
      setLoading(false)
    }
  }

  const filteredLessons = lessons.filter((lesson) => lesson.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleStartLesson = (lessonId) => {
    navigate(`/lessons/${lessonId}`)
  }

  if (loading) {
    return (
      <div className="lessons-loading">
        <div className="chess-loader">
          <FaChessKnight className="loader-icon" />
        </div>
        <p>Preparing your chess lessons...</p>
      </div>
    )
  }

  return (
    <div className="lessons-container">
      <div className="lessons-header">
        <h1>
          <FaBookOpen className="header-icon" />
          Master Chess with Our Lessons
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
            placeholder="Search for a specific lesson..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="lessons-grid">
        {filteredLessons.map((lesson) => (
          <div key={lesson._id} className="lesson-card">
            <div className="lesson-card-content">
              <FaChessKnight className="lesson-icon" />
              <h2>{lesson.name}</h2>
              <p>{lesson.description}</p>
            </div>

            <button onClick={() => handleStartLesson(lesson._id)} className="start-lesson-button">
              Start Lesson <FaArrowRight className="button-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LessonsList

