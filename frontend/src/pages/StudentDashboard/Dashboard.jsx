import { useState } from 'react';
import './Dashboard.css';
import { OL_SUBJECTS, OL_GRADES, AL_GRADES, STREAMS } from './data.js';
import {
  summariseOL, summariseAL, evaluateCourses, evaluateScholarships,
  matchingUniversities, buildGuidance, olQualifiesForAL, govEligible,
} from './eligibility.js';

const MENU = [
  ['📊', 'Dashboard'], ['🏛️', 'Universities'], ['📘', 'Courses'], ['🏅', 'Scholarships'],
  ['👤', 'My Profile'], ['🤖', 'AI Career Guide'], ['❤️', 'Saved Items'], ['🔔', 'Notifications'], ['⚙️', 'Settings'],
];

const STATUS_LABEL = {
  match: 'Meets the guideline',
  check: 'Check requirements',
  later: 'Available later',
  no: 'Not matched yet',
};

const EMPTY_FORM = {
  ol: { year: '', language: '', religion: '', english: '', maths: '', science: '', history: '', b1: '', b2: '', b3: '' },
  al: {
    year: '', stream: '', cgt: '',
    subjects: [{ name: '', grade: '' }, { name: '', grade: '' }, { name: '', grade: '' }],
  },
};

// results are kept in the browser so a refresh does not lose them
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem('sp_results')) || null;
  } catch {
    return null;
  }
}

function Dashboard() {
  const [active, setActive] = useState('Dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(loadSaved());
  const [form, setForm] = useState(saved || EMPTY_FORM);
  const [error, setError] = useState('');
  const [uniFilter, setUniFilter] = useState('All');
  const [schFilter, setSchFilter] = useState('All');

  // ----- form handlers -----
  function setOl(key, value) {
    setForm({ ...form, ol: { ...form.ol, [key]: value } });
  }
  function setAl(key, value) {
    // changing the stream clears the three subject names
    if (key === 'stream') {
      const subjects = form.al.subjects.map((s) => ({ ...s, name: '' }));
      setForm({ ...form, al: { ...form.al, stream: value, subjects } });
    } else {
      setForm({ ...form, al: { ...form.al, [key]: value } });
    }
  }
  function setSubject(index, key, value) {
    const subjects = form.al.subjects.map((s, i) => (i === index ? { ...s, [key]: value } : s));
    setForm({ ...form, al: { ...form.al, subjects } });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const o = summariseOL(form.ol);
    const hasAl = form.al.stream !== '';

    if (o.entered === 0 && !hasAl) {
      setError('Please enter at least your O/L results.');
      return;
    }
    if (hasAl && form.al.subjects.some((s) => !s.name || !s.grade)) {
      setError('Choose all three A/L subjects and a grade for each.');
      return;
    }
    const cgt = form.al.cgt;
    if (cgt !== '' && (isNaN(Number(cgt)) || Number(cgt) < 0 || Number(cgt) > 100)) {
      setError('Common General Test marks must be between 0 and 100.');
      return;
    }

    setError('');
    setSaved(form);
    try { localStorage.setItem('sp_results', JSON.stringify(form)); } catch { /* ignore */ }
  }

  function handleClear() {
    setForm(EMPTY_FORM);
    setSaved(null);
    setError('');
    try { localStorage.removeItem('sp_results'); } catch { /* ignore */ }
  }

  function chooseMenu(name) {
    setActive(name);
    setMenuOpen(false);
  }

  // ----- processed results (only when the student has saved results) -----
  const ol = saved ? saved.ol : EMPTY_FORM.ol;
  const al = saved ? saved.al : EMPTY_FORM.al;
  const olSummary = summariseOL(ol);
  const alSummary = summariseAL(al);
  const courses = evaluateCourses(ol, al);
  const guidance = buildGuidance(ol, al);
  const universities = matchingUniversities(al.stream);
  const scholarships = evaluateScholarships(al);
  const olCheck = olQualifiesForAL(olSummary);
  const subjectOptions = form.al.stream ? STREAMS[form.al.stream] : [];

  // ---------------- views ----------------
  function renderResultsForm() {
    return (
      <form className="db-card" onSubmit={handleSubmit} noValidate>
        <h2 className="db-title">Enter your exam results</h2>
        <p className="db-small">Choose the grade you got. Leave a subject empty if you did not sit it.</p>

        <div className="db-grid2 db-tight">
          {/* O/L */}
          <div className="db-box">
            <h3>O/L results</h3>
            <label>Exam year</label>
            <input type="number" placeholder="e.g. 2022" value={form.ol.year}
              onChange={(e) => setOl('year', e.target.value)} />
            {OL_SUBJECTS.map(([key, label]) => (
              <div className="db-field-row" key={key}>
                <span>{label}</span>
                <select value={form.ol[key]} onChange={(e) => setOl(key, e.target.value)}>
                  <option value="">–</option>
                  {OL_GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* A/L */}
          <div className="db-box">
            <h3>A/L results</h3>
            <label>Exam year</label>
            <input type="number" placeholder="e.g. 2024" value={form.al.year}
              onChange={(e) => setAl('year', e.target.value)} />

            <label>Stream</label>
            <select value={form.al.stream} onChange={(e) => setAl('stream', e.target.value)}>
              <option value="">Select stream (if you did A/L)</option>
              {Object.keys(STREAMS).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {form.al.stream && form.al.subjects.map((subject, i) => (
              <div className="db-field-row" key={i}>
                <select value={subject.name} onChange={(e) => setSubject(i, 'name', e.target.value)}>
                  <option value="">Subject {i + 1}</option>
                  {subjectOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={subject.grade} onChange={(e) => setSubject(i, 'grade', e.target.value)}>
                  <option value="">Grade</option>
                  {AL_GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            ))}

            <label>Common General Test marks (0–100)</label>
            <input type="number" placeholder="e.g. 55" value={form.al.cgt}
              onChange={(e) => setAl('cgt', e.target.value)} />
          </div>
        </div>

        {error && <p className="db-error">{error}</p>}
        <div className="db-actions">
          <button type="submit" className="db-primary">Show my options</button>
          <button type="button" className="db-secondary" onClick={handleClear}>Clear results</button>
        </div>
      </form>
    );
  }

  function renderSummary() {
    if (!saved) {
      return <div className="db-empty">Enter your results above and press “Show my options”.</div>;
    }
    return (
      <>
        <div className="db-stats">
          <div className="db-card db-stat"><div><b>{olSummary.passes}</b><span>O/L passes</span></div></div>
          <div className="db-card db-stat"><div><b>{olSummary.credits}</b><span>O/L credits (C or better)</span></div></div>
          <div className="db-card db-stat"><div><b>{alSummary.passes}</b><span>A/L passes</span></div></div>
          <div className="db-card db-stat"><div><b>{alSummary.cgt === null ? '–' : alSummary.cgt}</b><span>Common General Test</span></div></div>
        </div>

        <div className="db-card db-top-gap">
          <h2 className="db-title">Your next steps</h2>
          <ul className="db-steps">
            {guidance.map((g) => <li key={g}>{g}</li>)}
          </ul>
          {olSummary.entered > 0 && (
            <p className="db-small">A/L entry check: {olCheck.ok ? 'meets the usual guideline' : 'not yet meeting the usual guideline'}.
              {alSummary.entered === 3 && ` Government university guideline: ${govEligible(alSummary) ? 'met' : 'not met'}.`}</p>
          )}
        </div>

        <h2 className="db-title">Qualifications that match your results</h2>
        {renderCourses(courses.filter((c) => c.status === 'match' || c.status === 'check'))}
      </>
    );
  }

  function renderCourses(list) {
    if (list.length === 0) return <div className="db-empty">No matching courses yet.</div>;
    return (
      <div className="db-grid2">
        {list.map((c) => (
          <div className="db-card" key={c.id}>
            <span className={`db-status db-st-${c.status}`}>{STATUS_LABEL[c.status]}</span>
            <h3>{c.title}</h3>
            <p>{c.institution} · {c.level} · {c.duration}</p>
            <p className="db-reason">{c.reason}</p>
          </div>
        ))}
      </div>
    );
  }

  function renderUniversities() {
    const list = universities.filter((u) => uniFilter === 'All' || u.type === uniFilter);
    return (
      <>
        <h2 className="db-title">Universities and institutes</h2>
        <div className="db-tabs">
          {['All', 'Government', 'Private'].map((f) => (
            <button key={f} className={uniFilter === f ? 'on' : ''} onClick={() => setUniFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="db-grid3">
          {list.map((u) => (
            <div className="db-card" key={u.name}>
              <span className="db-tag">{u.type}</span>
              <h3>{u.name}</h3>
              <p>📍 {u.place}</p>
              <p>{u.faculties.join(', ')}</p>
              {al.stream && u.fits.length > 0 && (
                <p className="db-fit">✓ Fits your {al.stream} stream: {u.fits.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
        <p className="db-small">Sample listing. Check each institution’s official website for current programmes.</p>
      </>
    );
  }

  function renderScholarships() {
    const list = scholarships.filter((s) => schFilter === 'All' || s.group === schFilter);
    return (
      <>
        <h2 className="db-title">Scholarships</h2>
        <div className="db-tabs">
          {['All', 'Local', 'International'].map((f) => (
            <button key={f} className={schFilter === f ? 'on' : ''} onClick={() => setSchFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="db-grid3">
          {list.map((s) => (
            <div className="db-card" key={s.name}>
              <span className="db-tag">{s.funding}</span>
              {s.relevantNow && <span className="db-status db-st-match">Relevant for you</span>}
              <h3>{s.name}</h3>
              <p>{s.where}</p>
              <p>{s.when}</p>
            </div>
          ))}
        </div>
        <p className="db-small">Check the official site for eligibility and deadlines.</p>
      </>
    );
  }

  function renderView() {
    if (active === 'Dashboard') {
      return (
        <>
          <div className="db-welcome">
            <div>
              <h1>Welcome back, Student!</h1>
              <p>Enter your O/L and A/L results and we will show the education options that fit them.</p>
            </div>
          </div>
          {renderResultsForm()}
          {renderSummary()}
        </>
      );
    }
    if (active === 'Universities') return renderUniversities();
    if (active === 'Courses') {
      return (
        <>
          <h2 className="db-title">Courses directory</h2>
          {!saved && <p className="db-small">Add your results on the Dashboard to see which courses match you.</p>}
          {renderCourses(courses)}
        </>
      );
    }
    if (active === 'Scholarships') return renderScholarships();
    return <div className="db-empty">The “{active}” page is not built yet.</div>;
  }

  return (
    <div className="db-page">
      <aside className={`db-side ${menuOpen ? 'open' : ''}`}>
        <div className="db-brand">🎓 Scholar<span>Pathway</span></div>
        {MENU.map(([icon, name]) => (
          <button key={name} className={`db-menu-item ${active === name ? 'active' : ''}`} onClick={() => chooseMenu(name)}>
            <span>{icon}</span> {name}
          </button>
        ))}
        <button className="db-menu-item db-logout" onClick={() => chooseMenu('Logout')}>
          <span>🚪</span> Logout
        </button>
      </aside>

      <div className="db-main">
        <div className="db-top">
          <button className="db-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">☰</button>
          <div className="db-note">Prototype: guidance only, not verified admission requirements</div>
          <div className="db-user"><div className="db-avatar">S</div><span>Student</span></div>
        </div>
        {renderView()}
      </div>
    </div>
  );
}

export default Dashboard;