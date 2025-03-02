"use client"

import { useState, useEffect } from "react"
import { FaTrophy, FaMedal, FaStar, FaLock, FaCheck } from "react-icons/fa"
import "./AchievementSystem.css"

const achievements = [
  {
    id: "first_lesson",
    title: "First Steps",
    description: "Complete your first chess lesson",
    icon: <FaStar />,
    condition: (progress) => progress.lessonsCompleted.length >= 1,
    xp: 50,
  },
  {
    id: "lesson_streak",
    title: "Knowledge Seeker",
    description: "Complete 5 lessons",
    icon: <FaMedal />,
    condition: (progress) => progress.lessonsCompleted.length >= 5,
    xp: 100,
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Complete 3 quizzes",
    icon: <FaTrophy />,
    condition: (progress) => progress.quizzesCompleted.length >= 3,
    xp: 150,
  },
  {
    id: "chess_enthusiast",
    title: "Chess Enthusiast",
    description: "Complete 10 total activities (lessons + quizzes)",
    icon: <FaTrophy />,
    condition: (progress) => progress.lessonsCompleted.length + progress.quizzesCompleted.length >= 10,
    xp: 200,
  },
  {
    id: "grandmaster_path",
    title: "Path to Grandmaster",
    description: "Complete 15 lessons and 5 quizzes",
    icon: <FaTrophy />,
    condition: (progress) => progress.lessonsCompleted.length >= 15 && progress.quizzesCompleted.length >= 5,
    xp: 500,
  },
]

const AchievementSystem = ({ userProgress }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [totalXP, setTotalXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [showUnlocked, setShowUnlocked] = useState(true)

  useEffect(() => {
    if (userProgress) {
      const unlocked = achievements.filter((achievement) => achievement.condition(userProgress))

      setUnlockedAchievements(unlocked)

      // Calculate total XP
      const xp = unlocked.reduce((total, achievement) => total + achievement.xp, 0)
      setTotalXP(xp)

      // Calculate level (1 level per 100 XP)
      setLevel(Math.max(1, Math.floor(xp / 100)))
    }
  }, [userProgress])

  const toggleView = () => {
    setShowUnlocked(!showUnlocked)
  }

  const filteredAchievements = showUnlocked
    ? achievements.filter((a) => unlockedAchievements.some((ua) => ua.id === a.id))
    : achievements

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h2>
          <FaTrophy /> Achievements
        </h2>
        <div className="achievements-stats">
          <div className="xp-display">
            <span className="xp-label">XP</span>
            <span className="xp-value">{totalXP}</span>
          </div>
          <div className="level-display">
            <span className="level-label">Level</span>
            <span className="level-value">{level}</span>
          </div>
        </div>
      </div>

      <div className="view-toggle">
        <button className={`toggle-button ${showUnlocked ? "active" : ""}`} onClick={toggleView}>
          Unlocked
        </button>
        <button className={`toggle-button ${!showUnlocked ? "active" : ""}`} onClick={toggleView}>
          All
        </button>
      </div>

      <div className="achievements-grid">
        {filteredAchievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.some((a) => a.id === achievement.id)

          return (
            <div key={achievement.id} className={`achievement-card ${isUnlocked ? "unlocked" : "locked"}`}>
              <div className="achievement-icon">{isUnlocked ? achievement.icon : <FaLock />}</div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-xp">
                  <span>{achievement.xp} XP</span>
                  {isUnlocked && <FaCheck className="check-icon" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="no-achievements">
          <p>No achievements unlocked yet. Keep learning!</p>
        </div>
      )}
    </div>
  )
}

export default AchievementSystem

