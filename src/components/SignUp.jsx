import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_BASE_URL = "https://my-express-server-euxk.onrender.com"; 

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/signup`, {
        email: form.email,
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      // success — store the token and move on
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-screen">
      <div className="signup-card">
        <div className="signup-icon">🌸</div>

        <h1 className="signup-title">Your journey starts here</h1>
        <p className="signup-subtitle">Take the first step</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <span className="input-icon">✉</span>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
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

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="signin-row">
          <span>Already have an account? </span>
          <Link to="/login" className="signin-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}