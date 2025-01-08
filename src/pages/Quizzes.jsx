import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./Quizzes.css";

const Quiz = () => {
  const { id } = useParams(); // Get quiz ID from URL
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

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const answersArray = Object.entries(userAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      const { data } = await API.post(`/quizzes/${id}/submit`, { answers: answersArray });
      setScore(data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz");
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {error && <p className="error-message">{error}</p>}
      {!quiz ? (
        <p>Loading...</p>
      ) : score !== null ? (
        <div className="quiz-results">
          <h2>Your Score: {score}/{quiz.questions.length}</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((question) => (
            <div key={question._id} className="quiz-question">
              <h3>{question.question}</h3>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    onChange={() => handleAnswerChange(question._id, option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" className="quiz-submit-button">Submit Quiz</button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
