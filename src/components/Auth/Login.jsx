"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import "./Auth.css" // Import Auth.css

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false) // State for loading
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true) // Start loading
    setError("") // Clear previous errors
    try {
      const { data } = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", data.token) // Save token
      setIsAuthenticated(true) // Update authentication state
      navigate("/dashboard") // Redirect to Dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed") // Set error message
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>} {/* Display errors */}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Logging in..." : "Login"} {/* Show loading state */}
          </button>
        </form>
        <p>
          Don't have an account? <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  )
}

export default Login

