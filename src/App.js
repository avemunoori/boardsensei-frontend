import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import LessonsList from "./components/Lessons/LessonsList"
import LessonDetail from "./components/Lessons/LessonDetail"
import QuizList from "./components/Quiz/QuizList"
import QuizDetail from "./components/Quiz/QuizDetail"
import GrandmasterGames from "./components/GrandmasterGames/GrandmasterGames"
import Profile from "./components/Profile/Profile"
import Home from "./components/Home/Home"
import Header from "./components/Header"
import { FaBars } from "react-icons/fa"
import "./App.css"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="content-wrapper">
          <Header 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated}
            toggleSidebar={toggleSidebar}
          />
          <main className="main-content">
            {isAuthenticated && (
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FaBars />
              </button>
            )}
            <Routes>
              {!isAuthenticated ? (
                <>
                  <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/lessons" element={<LessonsList />} />
                  <Route path="/lessons/:id" element={<LessonDetail />} />
                  <Route path="/quizzes" element={<QuizList />} />
                  <Route path="/quizzes/:id" element={<QuizDetail />} />
                  <Route path="/grandmaster-games" element={<GrandmasterGames />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App