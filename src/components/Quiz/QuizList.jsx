import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./QuizList.css"; // Create a similar style as LessonsList.css

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // GET /quizzes from your backend
        const { data } = await API.get("/quizzes");
        // data.data should hold an array of quizzes
        setQuizzes(data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  // Filter quizzes by the search term
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to the quiz detail page
  const handleStartQuiz = (quizId) => {
    // Navigate to /quizzes/:id (the detail component)
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
        {filteredQuizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h2>{quiz.name}</h2>
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

export default QuizList;
