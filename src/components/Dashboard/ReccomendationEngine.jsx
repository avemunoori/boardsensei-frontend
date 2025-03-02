"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaLightbulb, FaArrowRight, FaChessKnight, FaQuestionCircle } from "react-icons/fa"
import "./RecommendationEngine.css"

const RecommendationEngine = ({ userProgress, lessons, quizzes }) => {
  const [recommendations, setRecommendations] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (userProgress && lessons && quizzes) {
      generateRecommendations()
    }
  }, [userProgress, lessons, quizzes])

  const generateRecommendations = () => {
    const completedLessonIds = new Set(userProgress.lessonsCompleted.map((lesson) => lesson._id))

    const completedQuizIds = new Set(userProgress.quizzesCompleted.map((quiz) => quiz._id))

    const newRecommendations = []

    // If user has completed no lessons, recommend the first lesson
    if (completedLessonIds.size === 0 && lessons.length > 0) {
      newRecommendations.push({
        type: "lesson",
        id: lessons[0]._id,
        title: lessons[0].name,
        reason: "Start your chess journey with this introductory lesson",
        priority: "high",
      })
    }

    // Find uncompleted lessons
    const uncompletedLessons = lessons.filter((lesson) => !completedLessonIds.has(lesson._id))

    // Find uncompleted quizzes
    const uncompletedQuizzes = quizzes.filter((quiz) => !completedQuizIds.has(quiz._id))

    // Recommend a quiz related to a completed lesson
    const lessonRelatedQuizzes = uncompletedQuizzes.filter(
      (quiz) => quiz.lesson && completedLessonIds.has(quiz.lesson._id),
    )

    if (lessonRelatedQuizzes.length > 0) {
      const recommendedQuiz = lessonRelatedQuizzes[0]
      const relatedLesson = lessons.find((l) => l._id === recommendedQuiz.lesson)

      newRecommendations.push({
        type: "quiz",
        id: recommendedQuiz._id,
        title: recommendedQuiz.openingName || "Quiz",
        reason: `Test your knowledge on ${relatedLesson ? relatedLesson.name : "this topic"}`,
        priority: "medium",
      })
    }

    // Recommend next logical lesson based on difficulty or sequence
    if (uncompletedLessons.length > 0) {
      // For simplicity, just recommend the first uncompleted lesson
      // In a real app, you might have a more sophisticated algorithm
      newRecommendations.push({
        type: "lesson",
        id: uncompletedLessons[0]._id,
        title: uncompletedLessons[0].name,
        reason: "Continue your learning path with this lesson",
        priority: "medium",
      })
    }

    // If user has completed several lessons but few quizzes, recommend a quiz
    if (completedLessonIds.size > 2 && completedQuizIds.size < 2 && uncompletedQuizzes.length > 0) {
      newRecommendations.push({
        type: "quiz",
        id: uncompletedQuizzes[0]._id,
        title: uncompletedQuizzes[0].openingName || "Quiz",
        reason: "Test your knowledge with this quiz",
        priority: "high",
      })
    }

    // Sort recommendations by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    newRecommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

    // Limit to 3 recommendations
    setRecommendations(newRecommendations.slice(0, 3))
  }

  const handleRecommendationClick = (recommendation) => {
    if (recommendation.type === "lesson") {
      navigate(`/lessons/${recommendation.id}`)
    } else if (recommendation.type === "quiz") {
      navigate(`/quizzes/${recommendation.id}`)
    }
  }

  if (!recommendations.length) {
    return null
  }

  return (
    <div className="recommendations-container">
      <h2>
        <FaLightbulb /> Recommended for You
      </h2>

      <div className="recommendations-list">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className={`recommendation-card priority-${recommendation.priority}`}
            onClick={() => handleRecommendationClick(recommendation)}
          >
            <div className="recommendation-icon">
              {recommendation.type === "lesson" ? <FaChessKnight /> : <FaQuestionCircle />}
            </div>
            <div className="recommendation-content">
              <h3>{recommendation.title}</h3>
              <p>{recommendation.reason}</p>
              <div className="recommendation-type">{recommendation.type === "lesson" ? "Lesson" : "Quiz"}</div>
            </div>
            <FaArrowRight className="recommendation-arrow" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationEngine

