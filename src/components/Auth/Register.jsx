"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import "./Auth.css"

const Register = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // List of allowed email domains
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']

  const validateEmail = (email) => {
    const domain = email.split('@')[1]
    return allowedDomains.includes(domain)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!validateEmail(email)) {
      setError("Please use a valid email domain (gmail.com, yahoo.com, outlook.com, or hotmail.com)")
      setIsLoading(false)
      return
    }

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      })
      localStorage.setItem("token", data.token)
      setIsAuthenticated(true)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
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
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
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