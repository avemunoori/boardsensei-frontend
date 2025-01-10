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
import Home from "./components/Home/Home"; // Import Home component
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isAuthenticated={isAuthenticated} />
        <div className="content-container">
          <Routes>
            {/* Public Routes */}
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

            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lessons" element={<LessonsList />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/grandmaster-games" element={<GrandmasterGames />} />
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              // Redirect to Home if not authenticated
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
