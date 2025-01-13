import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import LessonsList from "./components/Lessons/LessonsList";
import LessonDetail from "./components/Lessons/LessonDetail";
import QuizList from "./components/Quiz/QuizList";     // <-- Quizzes listing
import QuizDetail from "./components/Quiz/QuizDetail"; // <-- Single Quiz detail
import GrandmasterGames from "./components/GrandmasterGames/GrandmasterGames";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Render Sidebar only if user is authenticated */}
        {isAuthenticated && <Sidebar isAuthenticated={isAuthenticated} />}

        <div className="content-container">
          <Routes>
            {/* Unauthenticated Routes */}
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
                {/* Any other path -> go to /login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              /* Authenticated Routes */
              <>
                {/* Default / goes to /dashboard if logged in */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/dashboard" element={<Dashboard />} />

                {/* Lessons */}
                <Route path="/lessons" element={<LessonsList />} />
                <Route path="/lessons/:id" element={<LessonDetail />} />

                {/* Quizzes (list + detail) */}
                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/quizzes/:id" element={<QuizDetail />} />

                {/* Grandmaster Games */}
                <Route path="/grandmaster-games" element={<GrandmasterGames />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />

                {/* Any other path -> go to /dashboard */}
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
