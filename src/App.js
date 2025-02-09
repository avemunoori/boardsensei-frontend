import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import LessonsList from "./components/Lessons/LessonsList";
import LessonDetail from "./components/Lessons/LessonDetail";
import QuizList from "./components/Quiz/QuizList";
import QuizDetail from "./components/Quiz/QuizDetail";
import GrandmasterGames from "./components/GrandmasterGames/GrandmasterGames";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On app mount, check if a token is stored
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally verify token with your backend before setting true
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Show sidebar only when authenticated */}
        {isAuthenticated && (
          <Sidebar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}

        <div className="content-container">
          <Routes>
            {/* Public (unauthenticated) routes */}
            {!isAuthenticated ? (
              <>
                <Route
                  path="/"
                  element={<Home setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                  path="/register"
                  element={<Register setIsAuthenticated={setIsAuthenticated} />}
                />

                {/* Catch-all -> send to /login if not authenticated */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                {/* Private (authenticated) routes */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/lessons" element={<LessonsList />} />
                <Route path="/lessons/:id" element={<LessonDetail />} />

                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/quizzes/:id" element={<QuizDetail />} />

                <Route path="/grandmaster-games" element={<GrandmasterGames />} />
                <Route path="/profile" element={<Profile />} />

                {/* Catch-all -> send to /dashboard if authenticated */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
