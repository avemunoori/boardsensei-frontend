import axios from "axios";

// Backend API Configuration
const backendAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "https://boardsensei-backend-production.up.railway.app/api",
});

// Add Authorization Header
backendAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API Endpoints
export const fetchLessons = () => backendAPI.get("/lessons");
export const fetchLessonById = (id) => backendAPI.get(`/lessons/${id}`);
export const fetchQuizzes = () => backendAPI.get("/quizzes");
export const fetchQuizById = (id) => backendAPI.get(`/quizzes/${id}`);
export const submitQuizAnswers = (id, answers) =>
  backendAPI.post(`/quizzes/${id}/submit`, { answers });
export const fetchUserProgress = (userId) =>
  backendAPI.get(`/auth/users/progress/${userId}`);
export const loginUser = (credentials) =>
  backendAPI.post("/auth/login", credentials);
export const registerUser = (userDetails) =>
  backendAPI.post("/auth/register", userDetails);

// Chess.com API Configuration
const chessAPI = axios.create({
  baseURL: "https://api.chess.com/pub/player",
});

// Chess.com API Endpoints
export const fetchGrandmasterGames = (username, year, month) =>
  chessAPI.get(`/${username}/games/${year}/${month}`);

export default backendAPI;
