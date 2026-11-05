import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <header>
      <div className="wrap nav">
        <Link className="logo" to="/">
          <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#6655D9" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="10" fill="url(#lg)" />
            <path d="M20 9 7 15l13 6 13-6z" fill="#fff" />
            <path d="M13 19v5c0 2 3.2 4 7 4s7-2 7-4v-5l-7 3.2z" fill="#fff" opacity=".85" />
          </svg>
          Scholar<em>Pathway</em>
        </Link>

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">Explore Pathways</a></li>
            <li><a href="#">Universities</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Scholarships</a></li>
            <li><a href="#">Foreign Education</a></li>
            <li><Link to="/ai-guide">AI Career Guide</Link></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>

        <div className="auth">
          <Link className="btn o" to="/login">Login</Link>
          <Link className="btn p" to="/register">Register</Link>
        </div>
      </div>
    </header>
  );
}
