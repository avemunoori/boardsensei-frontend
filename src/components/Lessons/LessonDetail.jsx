// LessonDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import ChessBoard from "../ChessBoard/ChessBoard";
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

  // parse all steps' "move" fields into a single array of half-moves
  // e.g. "e4 c5" => ["e4", "c5"]
  const parseLessonMoves = (steps) => {
    const halfMoves = [];
    steps.forEach((step) => {
      const splitted = step.move.trim().split(/\s+/);
      halfMoves.push(...splitted);
    });
    return halfMoves;
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!lesson) return <p>Loading lesson...</p>;

  // Create an array of moves for the ChessBoard
  const movesForChessBoard = parseLessonMoves(lesson.steps || []);

  return (
    <div className="lesson-detail-container">
      <h1>{lesson.name}</h1>
      <p>{lesson.description}</p>

      {/* Interactive Chessboard with next/prev/autoplay */}
      <ChessBoard moves={movesForChessBoard} />

      {/* Detailed steps list */}
      {lesson.steps && lesson.steps.length > 0 && (
        <div className="lesson-steps-section">
          <h2>Detailed Steps:</h2>
          <ul className="lesson-steps-list">
            {lesson.steps.map((step, index) => (
              <li key={index} className="lesson-step">
                <div className="step-header">
                  <span className="step-index">Step {index + 1}:</span>
                  <span className="step-move">{step.move}</span>
                </div>
                <div className="step-explanation">{step.explanation}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isCompleted ? (
        <button onClick={handleCompleteLesson} className="complete-lesson-button">
          Lesson Complete
        </button>
      ) : (
        <p className="completed-message">You have completed this lesson!</p>
      )}
    </div>
  );
};

export default LessonDetail;
