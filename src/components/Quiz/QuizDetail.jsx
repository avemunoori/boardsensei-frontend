import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./QuizDetail.css"; // Similar style as your "Quiz.css"

const QuizDetail = () => {
  const { id } = useParams(); // e.g. /quizzes/:id
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
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

  // Handle user answer selection
  const handleAnswerChange = (questionIndex, chosenChoice) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: chosenChoice,
    }));
  };

  // Handle quiz submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    try {
      // Convert userAnswers into { questionId, answer } if your backend expects that
      // If each question has an _id, we can use that; otherwise, fallback to index
      const answersArray = quiz.questions.map((q, idx) => ({
        questionId: q._id || idx,
        answer: userAnswers[idx], // The user-chosen option
      }));

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
      {/* Use openingName instead of quiz.name */}
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
                {/* Use question.choices instead of question.options */}
                {question.choices.map((choice) => (
                  <label key={choice}>
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={choice}
                      onChange={() => handleAnswerChange(idx, choice)}
                      required
                    />
                    {choice}
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
