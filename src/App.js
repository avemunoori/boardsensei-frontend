import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Lessons from "./components/Lessons/Lessons";
import Profile from "./components/Profile/Profile";
import Quiz from "./components/Quiz/Quiz";
import GrandmasterGames from "./components/GrandmasterGames/GrandmasterGames";
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/grandmaster-games" element={<GrandmasterGames />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
