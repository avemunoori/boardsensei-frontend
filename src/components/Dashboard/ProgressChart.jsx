"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { FaChartLine, FaExchangeAlt } from "react-icons/fa"
import "./ProgressChart.css"

const ProgressChart = ({ userProgress }) => {
  const [chartType, setChartType] = useState("line")
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Transform user progress data into chart-friendly format
    if (userProgress) {
      // Create a timeline of completed lessons and quizzes
      const completedItems = [
        ...(userProgress.lessonsCompleted || []).map((lesson) => ({
          type: "lesson",
          name: lesson.name,
          date: new Date(lesson.createdAt || Date.now()),
          id: lesson._id,
        })),
        ...(userProgress.quizzesCompleted || []).map((quiz) => ({
          type: "quiz",
          name: quiz.openingName || "Quiz",
          date: new Date(quiz.createdAt || Date.now()),
          id: quiz._id,
        })),
      ]

      // Sort by date
      completedItems.sort((a, b) => a.date - b.date)

      // Create cumulative data for chart
      let lessonCount = 0
      let quizCount = 0

      const data = completedItems.map((item) => {
        if (item.type === "lesson") lessonCount++
        if (item.type === "quiz") quizCount++

        return {
          name: item.date.toLocaleDateString(),
          lessons: lessonCount,
          quizzes: quizCount,
          total: lessonCount + quizCount,
        }
      })

      // Add today's date if there's data
      if (data.length > 0) {
        data.push({
          name: new Date().toLocaleDateString(),
          lessons: lessonCount,
          quizzes: quizCount,
          total: lessonCount + quizCount,
        })
      }

      setChartData(data)
    }
  }, [userProgress])

  const toggleChartType = () => {
    setChartType(chartType === "line" ? "area" : "line")
  }

  if (!chartData.length) {
    return (
      <div className="progress-chart-container empty-chart">
        <h2>
          <FaChartLine /> Progress Visualization
        </h2>
        <p>Complete lessons and quizzes to see your progress chart!</p>
      </div>
    )
  }

  return (
    <div className="progress-chart-container">
      <div className="chart-header">
        <h2>
          <FaChartLine /> Your Learning Progress
        </h2>
        <button onClick={toggleChartType} className="chart-toggle-button">
          <FaExchangeAlt /> {chartType === "line" ? "Area Chart" : "Line Chart"}
        </button>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #3b82f6",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="lessons" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="quizzes" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          ) : (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #3b82f6",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="lessons" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="quizzes" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="chart-summary">
        <div className="summary-item">
          <span className="summary-label">Lessons Completed</span>
          <span className="summary-value lessons">{chartData[chartData.length - 1]?.lessons || 0}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Quizzes Completed</span>
          <span className="summary-value quizzes">{chartData[chartData.length - 1]?.quizzes || 0}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Progress</span>
          <span className="summary-value total">{chartData[chartData.length - 1]?.total || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressChart

