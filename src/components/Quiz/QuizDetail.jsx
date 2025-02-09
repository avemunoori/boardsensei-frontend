// QuizDetail.jsx (submit answers => update progress)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./QuizDetail.css";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quizzes/${id}`);
        setQuiz(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quiz");
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (qIndex, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    try {
      // Convert userAnswers object to an array of answers
      const answersArray = quiz.questions.map((q, idx) => userAnswers[idx] || "");
      const { data } = await API.post(`/quizzes/${id}/submit`, { answers: answersArray });
      setScore(data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz");
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-detail">
      <h1>{quiz.openingName}</h1>

      {score !== null ? (
        <div className="quiz-results">
          <h2>
            Your Score: {score}/{quiz.questions.length}
          </h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((question, idx) => (
            <div key={idx} className="quiz-question">
              <h3>{question.question}</h3>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={option}
                    onChange={() => handleAnswerChange(idx, option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" className="quiz-submit-button">
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
};

export default QuizDetail;
