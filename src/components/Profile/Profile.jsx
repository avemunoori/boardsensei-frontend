import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./Profile.css";

const Profile = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }

        // Decode userId from JWT
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        const { data } = await API.get(`/auth/users/progress/${userId}`);
        setUserProgress(data.progress);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch progress");
      }
    };

    fetchUserProgress();
  }, []);

  if (error) {
    return (
      <div className="profile-container">
        <h1>Your Profile</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div className="profile-container">
        <h1>Your Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-content">
        {/* Lessons Completed */}
        <div className="progress-section">
          <h2>Lessons Completed</h2>
          <ul>
            {userProgress.lessonsCompleted.map((lesson) => (
              <li key={lesson._id}>{lesson.name}</li>
            ))}
          </ul>
        </div>

        {/* Quizzes Completed */}
        <div className="progress-section">
          <h2>Quizzes Completed</h2>
          <ul>
            {userProgress.quizzesCompleted.map((quiz) => {
              // Use quiz.openingName if it exists, fallback to quiz.lesson?.name or "Unknown Quiz"
              const quizTitle = quiz.openingName 
                ? quiz.openingName 
                : quiz.lesson?.name || "Unknown Quiz";

              return (
                <li key={quiz._id}>{`Quiz on ${quizTitle}`}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
