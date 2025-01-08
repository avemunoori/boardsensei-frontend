import React, { useEffect, useState } from "react";
import { fetchUserProgress } from "../services/api";
import "./Profile.css";

// Helper function to extract user ID from JWT token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
};

const Profile = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgress = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        setError("User not authenticated");
        return;
      }

      try {
        const { data } = await fetchUserProgress(userId);
        setUserProgress(data.progress);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user progress");
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {error && <p className="error-message">{error}</p>}
      {!userProgress ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-content">
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
        </div>
      )}
    </div>
  );
};

export default Profile;
