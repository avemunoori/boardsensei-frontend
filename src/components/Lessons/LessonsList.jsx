import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./LessonsList.css";

const LessonsList = ({ searchTerm }) => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await API.get("/lessons");
        setLessons(data.data); // Assuming lessons are in `data.data`
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lessons");
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lessons-container">
      <h1>Lessons</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="lessons-grid">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson._id}
            className="lesson-card"
            onClick={() => navigate(`/lessons/${lesson._id}`)}
          >
            <h2>{lesson.name}</h2>
            <p>{lesson.description}</p>
            <button>Start Lesson</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
