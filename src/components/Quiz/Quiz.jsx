import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./Quiz.css";

const Quiz = () => {
  const { id } = useParams(); // Get quiz ID from URL
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1) If there's no 'id', we cannot fetch the quiz
    if (!id) {
      setError("No quiz ID found in the URL. Please make sure you're visiting /quizzes/:id.");
      return;
    }

    console.log("Quiz ID from URL:", id);

    // 2) Fetch Quiz Data
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quizzes/${id}`);
        // data.data should hold the quiz object
        setQuiz(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quiz");
      }
    };

    fetchQuiz();
  }, [id]);

  // Handle user answer selection
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return; // If quiz data isn't loaded, do nothing

    try {
      const answersArray = Object.entries(userAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      console.log("Submitting answers =>", answersArray);

      const { data } = await API.post(`/quizzes/${id}/submit`, { answers: answersArray });
      setScore(data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz");
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      {/* Display errors */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading State */}
      {!quiz && !error && <p>Loading...</p>}

      {/* If we have a score, show results */}
      {quiz && score !== null && (
        <div className="quiz-results">
          <h2>
            Your Score: {score}/{quiz.questions?.length || 0}
          </h2>
        </div>
      )}

      {/* If we have quiz data and no score yet, show the quiz form */}
      {quiz && score === null && (
        <form onSubmit={handleSubmit}>
          {Array.isArray(quiz.questions) && quiz.questions.length > 0 ? (
            quiz.questions.map((question) => (
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
