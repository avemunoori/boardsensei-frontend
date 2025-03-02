"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"
import API from "../../services/api"
import AIExplanation from "./AIExplanation"
import { FaArrowLeft, FaArrowRight, FaCheck, FaTimes, FaTrophy, FaPlay } from "react-icons/fa"
import "./LessonDetail.css"

const LessonDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [game, setGame] = useState(new Chess())
  const [userMoveAttempt, setUserMoveAttempt] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState("")
  const [completedSteps, setCompletedSteps] = useState([])
  const [isStarted, setIsStarted] = useState(false)
  const [showAIInsight, setShowAIInsight] = useState(false)
  const [moveResult, setMoveResult] = useState(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await API.get(`/lessons/${id}`)
        setLesson(data.data)
        resetGame()
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lesson")
      }
    }
    fetchLesson()
  }, [id])

  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setCurrentStepIndex(0)
    setCompletedSteps([])
    setIsStarted(false)
    setShowAIInsight(false)
    setUserMoveAttempt(null)
    setMoveResult(null)
  }

  const handleMove = (move) => {
    if (!isStarted) return false

    setUserMoveAttempt(move)
    const gameCopy = new Chess(game.fen())
    const result = gameCopy.move(move)
    if (result) {
      setGame(gameCopy)
      checkMoveCorrectness(move)
      return true
    }
    return false
  }

  const checkMoveCorrectness = (move) => {
    const currentStep = lesson.steps[currentStepIndex]
    if (move.san === currentStep.move) {
      setMoveResult("correct")
      const newCompletedSteps = [...completedSteps, currentStepIndex]
      setCompletedSteps(newCompletedSteps)
      setShowAIInsight(true)
      if (newCompletedSteps.length === lesson.steps.length) {
        handleLessonCompletion()
      }
    } else {
      setMoveResult("incorrect")
      setShowAIInsight(true)
    }
  }

  const handleLessonCompletion = async () => {
    try {
      await API.post(`/lessons/${id}/complete`)
      setIsCompleted(true)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete lesson")
    }
  }

  const handleNextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setShowAIInsight(false)
      setUserMoveAttempt(null)
      setMoveResult(null)
    }
  }

  const handleStartLesson = () => {
    setIsStarted(true)
  }

  const handleTryAgain = () => {
    setGame(new Chess(game.fen())) // Reset to the position before the incorrect move
    setUserMoveAttempt(null)
    setMoveResult(null)
    setShowAIInsight(false)
  }

  if (error) return <p className="error-message">{error}</p>
  if (!lesson) return <p className="lesson-loading">Loading lesson...</p>

  const currentStep = lesson.steps[currentStepIndex]

  return (
    <div className="lesson-detail-container">
      <button onClick={() => navigate("/lessons")} className="back-button">
        <FaArrowLeft /> Back to Lessons
      </button>

      <h1>{lesson.name}</h1>
      <p className="lesson-description">{lesson.description}</p>

      <div className="lesson-content">
        <div className="chessboard-container">
          <Chessboard
            position={game.fen()}
            onPieceDrop={(sourceSquare, targetSquare) =>
              handleMove({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to queen for simplicity
              })
            }
          />
        </div>

        <div className="lesson-steps">
          <h2>
            Step {currentStepIndex + 1} of {lesson.steps.length}
          </h2>
          {!isStarted ? (
            <button onClick={handleStartLesson} className="start-button">
              <FaPlay /> Start Lesson
            </button>
          ) : (
            <>
              <p className="step-explanation">{currentStep.explanation}</p>

              {moveResult && (
                <div className={`move-feedback ${moveResult}`}>
                  {moveResult === "correct" ? (
                    <p className="correct-move">
                      <FaCheck /> Correct move!
                    </p>
                  ) : (
                    <p className="incorrect-move">
                      <FaTimes /> Incorrect move. Try again.
                    </p>
                  )}
                </div>
              )}

              {showAIInsight && (
                <AIExplanation position={game.fen()} correctMove={currentStep.move} userMove={userMoveAttempt} />
              )}

              {moveResult === "correct" && (
                <button onClick={handleNextStep} className="next-step-button">
                  Next Step <FaArrowRight />
                </button>
              )}

              {moveResult === "incorrect" && (
                <button onClick={handleTryAgain} className="try-again-button">
                  Try Again
                </button>
              )}
            </>
          )}

          {isCompleted && (
            <div className="lesson-completed">
              <FaTrophy className="completed-icon" />
              <h3>All done! Congratulations on completing this lesson.</h3>
            </div>
          )}

          <div className="lesson-progress">
            <h3>Lesson Progress</h3>
            <div className="progress-bar">
              {lesson.steps.map((_, index) => (
                <div key={index} className={`progress-step ${completedSteps.includes(index) ? "completed" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonDetail

