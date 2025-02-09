import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./QuizDetail.css";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // Maps questionIndex -> chosenOption
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No quiz ID found. Please visit /quizzes/:id");
      return;
    }

    const fetchQuizById = async () => {
      try {
        const { data } = await API.get(`/quizzes/${id}`);
        setQuiz(data.data); // The quiz object
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quiz");
      }
    };

    fetchQuizById();
  }, [id]);

  // Handle user choosing an option for a given question
  const handleAnswerChange = (questionIndex, chosenOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: chosenOption,
    }));
  };

  // Handle quiz submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    try {
      // The backend expects an array of strings, one per question index
      // e.g. ["option1", "option2", ...]
      const answersArray = quiz.questions.map((q, idx) => {
        return userAnswers[idx] || "";
      });

      // Send the array of strings to the server
      const { data } = await API.post(`/quizzes/${id}/submit`, { answers: answersArray });
      setScore(data.score);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz");
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-detail-container">
      {/* Display the quiz's openingName (not quiz.name) */}
      <h1>{quiz.openingName}</h1>

      {score !== null ? (
        <div className="quiz-results">
          <h2>
            Your Score: {score}/{quiz.questions?.length ?? 0}
          </h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {Array.isArray(quiz.questions) && quiz.questions.length > 0 ? (
            quiz.questions.map((question, idx) => (
              <div key={idx} className="quiz-question">
                <h3>{question.question}</h3>
                {/* Use question.options instead of question.choices */}
                {question.options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={option}
                      onChange={() => handleAnswerChange(idx, option)}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))
          ) : (
            <p>No questions available for this quiz.</p>
          )}

          <button type="submit" className="quiz-submit-button">
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
};

export default QuizDetail;
