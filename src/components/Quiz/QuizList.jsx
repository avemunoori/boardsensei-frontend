import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import API from "../../services/api";
import "./QuizList.css"; // CSS styles

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // Fetch all quizzes from "/quizzes"
        const { data } = await API.get("/quizzes");
        // data.data should be an array of quiz objects
        setQuizzes(data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  // Filter quizzes by the 'openingName' field
  const filteredQuizzes = quizzes.filter((quiz) => {
    // If there's no openingName, fallback to an empty string
    const quizTitle = quiz.openingName || "";
    return quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Navigate to a specific quiz detail page
  const handleStartQuiz = (quizId) => {
    navigate(`/quizzes/${quizId}`);
  };

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <h1>Quizzes</h1>
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="quiz-list-grid">
        {filteredQuizzes.map((quiz) => {
          // Safely access openingName
          const quizTitle = quiz.openingName || "No Title";

          return (
            <div key={quiz._id} className="quiz-card">
              <h2>{quizTitle}</h2>
              <button onClick={() => handleStartQuiz(quiz._id)}>
                Start Quiz
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizList;
