import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../../services/api"
import { FaUser, FaEnvelope, FaLock, FaChess } from "react-icons/fa"
import "./Register.css"

const Register = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"]

  const validateEmail = (email) => {
    const domain = email.split("@")[1]
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
      <div className="auth-form-container">
        <div className="auth-logo">
          <FaChess className="auth-logo-icon" />
          <h1>BoardSensei</h1>
        </div>
        <h2>Create your account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              autoComplete="new-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register