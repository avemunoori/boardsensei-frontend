import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../services/api"
import "./Register.css"

const Register = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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
    <div className="register-container">
      <div className="register-form-container">
        <div>
          <h2>Create your account</h2>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="loading-spinner" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Register"}
            </button>
          </div>
        </form>
        <p className="login-prompt">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="login-link">
            Login here
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register