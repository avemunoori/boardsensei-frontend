import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../../services/api"
import { FaEnvelope, FaLock, FaChess } from "react-icons/fa"
import "./Login.css"

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const { data } = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", data.token)
      setIsAuthenticated(true)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-logo">
          <FaChess className="auth-logo-icon" />
          <h1>BoardSensei</h1>
        </div>
        <h2>Sign in to your account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-switch-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login