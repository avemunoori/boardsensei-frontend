import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./LessonsList.css";

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

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
      <div className="lessons-header">
        <h1>Lessons</h1>
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="lessons-grid">
        {filteredLessons.map((lesson) => (
          <div key={lesson._id} className="lesson-card">
            <h2>{lesson.name}</h2>
            <p>{lesson.description}</p>
            <button onClick={() => alert(`Start Lesson: ${lesson.name}`)}>
              Start Lesson
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
