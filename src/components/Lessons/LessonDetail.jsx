// LessonDetail.jsx (example of marking a lesson complete)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./LessonDetail.css";

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await API.get(`/lessons/${id}`);
        setLesson(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lesson");
      }
    };
    fetchLesson();
  }, [id]);

  const handleCompleteLesson = async () => {
    try {
      await API.post(`/lessons/${id}/complete`);
      setIsCompleted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete lesson");
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!lesson) return <p>Loading lesson...</p>;

  return (
    <div className="lesson-detail">
      <h1>{lesson.name}</h1>
      <p>{lesson.description}</p>
      {lesson.steps && lesson.steps.length > 0 && (
        <ul>
          {lesson.steps.map((step, i) => (
            <li key={i}>
              <strong>{step.move}:</strong> {step.explanation}
            </li>
          ))}
        </ul>
      )}

      {!isCompleted ? (
        <button onClick={handleCompleteLesson}>Mark Lesson Complete</button>
      ) : (
        <p>You have completed this lesson!</p>
      )}
    </div>
  );
};

export default LessonDetail;
