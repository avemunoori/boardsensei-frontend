"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import "./Auth.css" // Import Auth.css

const Register = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("")
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
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      })
      localStorage.setItem("token", data.token) // Save token
      setIsAuthenticated(true) // Update authentication state
      navigate("/dashboard") // Redirect to Dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed") // Set error message
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>} {/* Display errors */}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
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
            {isLoading ? "Registering..." : "Register"} {/* Show loading state */}
          </button>
        </form>
        <p>
          Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  )
}

export default Register

