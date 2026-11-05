
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
];

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    district: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function validate() {
    const newErrors = {};

    if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!/^(0|\+94)7\d{8}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid mobile number, e.g. 0771234567';
    }

    if (!form.district) {
      newErrors.district = 'Please select your district';
    }

    if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (
      !/[A-Za-z]/.test(form.password) ||
      !/\d/.test(form.password)
    ) {
      newErrors.password = 'Use both letters and numbers';
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!form.terms) {
      newErrors.terms = 'You must accept the terms to continue';
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    setMessage('');

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.fullName.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
            phone: form.phone.trim(),
            district: form.district,
            role: 'student',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage('Registration successful! Please login.');

      // Go to Login page after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reg-page">
      <div className="reg-left">
        <h2>Start your journey today</h2>
        <p>
          Create a free account to save courses, track scholarships
          and get guidance after O/L and A/L.
        </p>

        <ul>
          <li>✓ Free for every student</li>
          <li>✓ Save universities and courses</li>
          <li>✓ Ask the AI Career Guide</li>
        </ul>

        <div className="reg-emoji">🎓 📚 🏛️</div>
      </div>

      <div className="reg-right">
        <form className="reg-box" onSubmit={handleSubmit} noValidate>
          <h1>Create your account</h1>

          <p className="reg-small">
            Join Scholar Pathway. It only takes a minute.
          </p>

          {message && (
            <div className="reg-message">{message}</div>
          )}

          <div className="reg-grid">
            <div className="reg-full">
              <label>Full name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Nimali Perera"
                value={form.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="reg-error">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="reg-error">{errors.email}</p>
              )}
            </div>

            <div>
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="0771234567"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="reg-error">{errors.phone}</p>
              )}
            </div>

            <div>
              <label>District</label>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
              >
                <option value="">Select district</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.district && (
                <p className="reg-error">{errors.district}</p>
              )}
            </div>

            <div>
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="reg-error">{errors.password}</p>
              )}
            </div>

            <div>
              <label>Confirm password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="reg-error">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <label className="reg-check">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show passwords
          </label>

          <label className="reg-check">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            I agree to the Terms and Conditions and Privacy Policy
          </label>

          {errors.terms && (
            <p className="reg-error">{errors.terms}</p>
          )}

          <button
            type="submit"
            className="reg-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="reg-small center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
