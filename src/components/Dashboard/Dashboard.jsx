import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        const { data } = await API.get(`/auth/users/progress/${userId}`);
        setUserProgress(data.progress);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user progress");
      }
    };

    fetchUserProgress();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      {!userProgress ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          <div className="progress-section">
            <h2>Lessons Completed</h2>
            <ul>
              {userProgress.lessonsCompleted.map((lesson) => (
                <li key={lesson._id}>{lesson.name}</li>
              ))}
            </ul>
          </div>
          <div className="progress-section">
            <h2>Quizzes Completed</h2>
            <ul>
              {userProgress.quizzesCompleted.map((quiz) => (
                <li key={quiz._id}>{`Quiz on ${quiz.lesson.name}`}</li>
              ))}
            </ul>
          </div>
          <div className="actions-section">
            <button onClick={() => navigate("/lessons")}>View Lessons</button>
            <button onClick={() => navigate("/quiz")}>Take a Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;