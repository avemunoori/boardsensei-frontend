import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Quiz.css";

const Quiz = () => {
  const { id } = useParams();          // Get quiz ID from URL, e.g. /quizzes/:id
  const navigate = useNavigate();       // Optional: to redirect if ID is missing
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  // Fetch the quiz once we have a valid ID
  useEffect(() => {
    // If there's no 'id', redirect or set an error
    if (!id) {
      setError("No quiz ID found in the URL. Make sure you're visiting /quizzes/:id.");
      // Optionally, navigate("/somewhere") if you want to auto-redirect
      return;
    }

    const fetchQuiz = async () => {
      try {
        const response = await API.get(`/quizzes/${id}`); // GET /quizzes/:id
        setQuiz(response.data.data);                     // quiz object is in data.data
      } catch (err) {
        // If server returns an error or 404
        setError(err.response?.data?.message || "Failed to fetch quiz");
      }
    };

    fetchQuiz();
  }, [id]);

  // Handle user answer selection
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Handle quiz submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return; // no quiz loaded, can't submit

    try {
      // Convert the userAnswers object into an array of { questionId, answer }
      const answersArray = Object.entries(userAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      // POST /quizzes/:id/submit with the user’s answers
      const response = await API.post(`/quizzes/${id}/submit`, { answers: answersArray });
      setScore(response.data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz");
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      {/* Display any error messages at the top */}
      {error && <p className="error-message">{error}</p>}

      {/* If we have no quiz and no error, assume it's still loading */}
      {!quiz && !error && <p>Loading quiz...</p>}

      {/* If the quiz is loaded and we have a score, show results */}
      {quiz && score !== null && (
        <div className="quiz-results">
          <h2>
            Your Score: {score}/{quiz.questions?.length || 0}
          </h2>
        </div>
      )}

      {/* If the quiz is loaded but no score yet, show the quiz form */}
      {quiz && score === null && (
        <form onSubmit={handleSubmit}>
          {/* Check if quiz.questions is an array with length > 0 */}
          {Array.isArray(quiz.questions) && quiz.questions.length > 0 ? (
            quiz.questions.map((question, idx) => (
              <div key={idx} className="quiz-question">
                <h3>{question.question}</h3>
                {question.options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={question.question} // or question._id, if you prefer
                      value={option}
                      onChange={() => handleAnswerChange(question._id || idx, option)}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))
          ) : (
            <p>No questions found for this quiz.</p>
          )}

          <button type="submit" className="quiz-submit-button">
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
