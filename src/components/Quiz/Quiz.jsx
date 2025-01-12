import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import API from "../../services/api";
import "./Quiz.css";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // 1) Fetch all quizzes from /quizzes
        const { data } = await API.get("/quizzes");
        // data.data should be an array of quiz objects
        setQuizzes(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  // 2) Filter quizzes by name based on search term
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3) Navigate to the quiz detail page on "Start Quiz"
  const handleStartQuiz = (quizId) => {
    // This navigates to /quizzes/:id
    navigate(`/quizzes/${quizId}`);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Quizzes</h1>
        {/* Search bar to filter quizzes by name */}
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show any errors */}
      {error && <p className="error-message">{error}</p>}

      {/* Display quizzes in a grid (similar to lessons) */}
      <div className="quiz-grid">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h2>{quiz.name}</h2>
            {/* If there's a quiz description, display it here */}
            {quiz.description && <p>{quiz.description}</p>}

            <button onClick={() => handleStartQuiz(quiz._id)}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
