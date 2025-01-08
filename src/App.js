import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Quizzes from "./pages/Quizzes";
import Profile from "./pages/Profile";
import GrandmasterGames from "./components/GrandmasterGames/GrandmasterGames";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/grandmaster-games" element={<GrandmasterGames />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
