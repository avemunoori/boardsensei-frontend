import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import LessonsList from "./components/Lessons/LessonsList";
import Quiz from "./components/Quiz/Quiz";
import GrandmasterGames from "./components/GrandmasterGames/GrandmasterGames";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Render the Sidebar only if the user is authenticated */}
        {isAuthenticated && <Sidebar isAuthenticated={isAuthenticated} />}

        <div className="content-container">
          <Routes>
            {!isAuthenticated ? (
              /* 
                Public routes (unauthenticated):
                - Home (/)
                - Login (/login)
                - Register (/register)

                If user tries any other path while not authenticated,
                redirect them to /login.
              */
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
              /* 
                Protected routes (authenticated):
                - Default "/" goes to /dashboard
                - /dashboard, /lessons, /quiz, /grandmaster-games, /profile

                If user tries unknown path while authenticated,
                redirect them to /dashboard.
              */
              <>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lessons" element={<LessonsList />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/grandmaster-games" element={<GrandmasterGames />} />
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
