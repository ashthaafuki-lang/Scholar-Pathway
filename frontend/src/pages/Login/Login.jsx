
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (password === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    setMessage('');

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);
      console.log("USER ROLE:", data.user?.role);


      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save JWT token and user information
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setMessage('Login successful!');

      // Role-based redirect
      if (data.user.role === 'student') {
        navigate('/student/dashboard');
      } else if (data.user.role === 'institution') {
        navigate('/institution/dashboard');
      } else if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <h2>Your Future Starts Here!</h2>
        <p>
          Log in to save courses and scholarships and get guidance
          after O/L and A/L.
        </p>
        <div className="login-emoji">🎓 📚 🏛️</div>
      </div>

      <div className="login-right">
        <form className="login-box" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <p className="login-small">
            Log in to your Scholar Pathway account
          </p>

          {message && (
            <div className="login-message">{message}</div>
          )}

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="login-error">{errors.email}</p>
          )}

          <label>Password</label>
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className="login-error">{errors.password}</p>
          )}

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="login-small center">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
