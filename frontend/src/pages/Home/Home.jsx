import './Home.css';

/* ---------- data (later you can load this from your API) ---------- */
const STATS = [
  ['120+', 'Institutions (sample)'],
  ['800+', 'Courses (sample)'],
  ['150+', 'Scholarships (sample)'],
  ['Free', 'For every student'],
];

const PORTALS = [
  ['After O/L', 'Search A/L, NVQ, diplomas'],
  ['After A/L', 'Search degrees and HNDs'],
  ['Professional', 'Search ACCA, CIMA, AAT'],
  ['Scholarships', 'Search funding options'],
  ['Study Abroad', 'UK, Australia, Canada…'],
  ['IELTS', 'Prepare and book'],
];

/* ---------- hero illustration ---------- */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice">
      <rect x="150" y="150" width="200" height="150" fill="#fff" opacity=".9" />
      <path d="M130 155 250 95l120 60z" fill="#142B4D" />
      <g fill="#BFD4FF">
        <rect x="175" y="180" width="26" height="120" />
        <rect x="237" y="180" width="26" height="120" />
        <rect x="299" y="180" width="26" height="120" />
      </g>
      <circle cx="250" cy="130" r="10" fill="#4AA3DF" />
      <circle cx="120" cy="340" r="26" fill="#F4C79B" />
      <path d="M88 334l32-15 32 15-32 13z" fill="#2563EB" />
      <rect x="92" y="368" width="56" height="90" rx="20" fill="#6655D9" />
      <circle cx="260" cy="350" r="26" fill="#D9A06E" />
      <path d="M228 344l32-15 32 15-32 13z" fill="#142B4D" />
      <rect x="232" y="378" width="56" height="80" rx="20" fill="#4AA3DF" />
      <rect x="170" y="400" width="60" height="40" rx="6" fill="#F59E0B" />
    </svg>
  );
}

/* ---------- page ---------- */
export default function Home() {
  return (
    <main id="top">
      {/* HERO */}
      <div className="hero">
        <div className="wrap">
          <div className="visual" aria-hidden="true">
            <div className="ribbon r1" />
            <div className="ribbon r2" />
            <div className="photo"><HeroIllustration /></div>
          </div>

          <div>
            <h1>Discover Your Future. <span>Build Your Path.</span></h1>
            <p className="l">
              Your complete guide to education and career opportunities after O/L and A/L.
            </p>
            <div className="who">
              <a href="#">
                <i>🏛️</i>
                <b>I'm an institution</b>
                <span>Promote your courses</span>
              </a>
              <a href="#">
                <i>🎓</i>
                <b>I'm a student</b>
                <span>Start course search</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section>
        <div className="wrap">
          <div className="stats">
            {STATS.map(([number, label]) => (
              <div key={label}>
                <b>{number}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND YOUR PERFECT COURSE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <h2>Find your perfect course</h2>
            <p>Find and compare all your study options in one place.</p>
          </div>
          <div className="portals">
            {PORTALS.map(([title, text]) => (
              <a className="portal" href="#" key={title}>
                <div>
                  <b>{title}</b>
                  <span>{text}</span>
                </div>
                <em>›</em>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI CAREER GUIDE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ai">
            <div>
              <h2>Let's Discover Your Future Together!</h2>
              <p>
                Tell us about your education, interests and dreams. Our AI Career Guide suggests
                paths. Suggestions are guidance, not verified admission requirements.
              </p>
            </div>
            <a className="btn" href="#">Ask AI Career Guide</a>
          </div>
        </div>
      </section>
    </main>
  );
}
