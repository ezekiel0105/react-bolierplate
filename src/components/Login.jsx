import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_BASE_URL = "https://my-express-server-euxk.onrender.com";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/login`, form);

      // success — store the token and move on
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-screen">
      <div className="signup-card">
        <div className="signup-icon">🌸</div>

        <h1 className="signup-title">Welcome back</h1>
        <p className="signup-subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              name="username"
              placeholder="Username or e-mail"
              value={form.username}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <a href="#" className="forgot-link">
          Forgot password?
        </a>

        <div className="signin-row">
          <span>Don't have an account? </span>
          <Link to="/signup" className="signin-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
