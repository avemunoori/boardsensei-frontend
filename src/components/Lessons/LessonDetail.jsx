import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import ChessBoard from "../ChessBoard/ChessBoard"; 
import "./LessonDetail.css";

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await API.get(`/lessons/${id}`);
        setLesson(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lesson details");
      }
    };
    fetchLesson();
  }, [id]);

  // Helper: convert each step’s "e4 c5" into ["e4","c5"], flattening across all steps
  const parseLessonMoves = (steps) => {
    const halfMoves = [];
    steps.forEach(({ move }) => {
      const splitted = move.trim().split(/\s+/); 
      halfMoves.push(...splitted);
    });
    return halfMoves;
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!lesson) {
    return <p className="loading-message">Loading lesson...</p>;
  }

  // Turn the entire lesson’s steps into an array of half-moves
  const movesForChessBoard = parseLessonMoves(lesson.steps || []);

  return (
    <div className="lesson-detail-container">
      <div className="lesson-info-card">
        <h1>{lesson.name}</h1>
        <p className="lesson-description">{lesson.description}</p>
      </div>

      {/* Interactive Chessboard showing all moves */}
      <ChessBoard moves={movesForChessBoard} />

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
    </div>
  );
};

export default LessonDetail;
