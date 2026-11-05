import { COURSES, UNIVERSITIES, FACULTY_STREAMS, SCHOLARSHIPS } from './data.js';

// IMPORTANT: these are indicative rules for the prototype.
// Real entry requirements change every year. Always confirm with the
// Department of Examinations, the UGC and each institution.

const PASS = ['A', 'B', 'C', 'S'];
const CREDIT = ['A', 'B', 'C'];
const isPass = (g) => PASS.includes(g);
const isCredit = (g) => CREDIT.includes(g);

// ---------- O/L ----------
export function summariseOL(ol) {
  const grades = Object.entries(ol)
    .filter(([key, value]) => key !== 'year' && value)
    .map(([, value]) => value);
  return {
    entered: grades.length,
    passes: grades.filter(isPass).length,
    credits: grades.filter(isCredit).length,
    languagePass: isPass(ol.language),
    mathsPass: isPass(ol.maths),
  };
}

// guideline: 6 passes, 3 credits, and passes in language and maths
export function olQualifiesForAL(s) {
  const reasons = [];
  if (s.passes < 6) reasons.push(`You have ${s.passes} O/L pass${s.passes === 1 ? '' : 'es'}. About 6 are usually needed.`);
  if (s.credits < 3) reasons.push(`You have ${s.credits} credit pass${s.credits === 1 ? '' : 'es'} (C or better). About 3 are usually needed.`);
  if (!s.languagePass) reasons.push('A pass in your first language is usually needed.');
  if (!s.mathsPass) reasons.push('A pass in Mathematics is usually needed.');
  return { ok: reasons.length === 0, reasons };
}

// ---------- A/L ----------
export function summariseAL(al) {
  const grades = al.subjects.map((s) => s.grade).filter(Boolean);
  const cgt = al.cgt === '' ? null : Number(al.cgt);
  return {
    entered: grades.length,
    passes: grades.filter(isPass).length,
    stream: al.stream,
    cgt,
    cgtOk: cgt !== null && cgt >= 30,
  };
}

// guideline for government universities: 3 passes and 30+ in the Common General Test.
// Selection itself is by Z-score and district cut-off marks.
export function govEligible(a) {
  return a.entered === 3 && a.passes === 3 && a.cgtOk;
}

// ---------- courses ----------
function privateRule(a) {
  if (a.entered === 0) return ['later', 'Add your A/L results to check this course.'];
  if (a.passes >= 3) return ['match', 'You have 3 A/L passes, which is the usual guideline.'];
  if (a.passes === 2) return ['check', 'You have 2 A/L passes. Ask the institute if this is accepted.'];
  return ['no', 'Usually needs 3 A/L passes.'];
}

function govRule(a, neededStream) {
  if (a.entered === 0) return ['later', 'Add your A/L results to check this course.'];
  if (a.stream !== neededStream) return ['no', `Usually needs the ${neededStream} stream.`];
  if (!govEligible(a)) return ['no', 'Needs 3 A/L passes and 30+ marks in the Common General Test.'];
  return ['match', 'You meet the guideline. Selection depends on Z-score and district cut-off.'];
}

export function evaluateCourses(ol, al) {
  const o = summariseOL(ol);
  const a = summariseAL(al);

  return COURSES.map((course) => {
    let result;
    if (course.id === 'it-sliit' || course.id === 'bba') result = privateRule(a);
    else if (course.id === 'eng-uom' || course.id === 'cs-ucsc') result = govRule(a, 'Physical Science');
    else if (course.id === 'hnd-it') result = privateRule(a);
    else if (o.entered === 0) result = ['check', 'Add your O/L results. Entry varies by institute, so confirm with VTA.'];
    else if (o.passes >= 3) result = ['match', 'You have O/L passes. Entry varies by institute, so confirm with VTA.'];
    else result = ['check', 'Entry varies by institute. Ask VTA about your options.'];
    return { ...course, status: result[0], reason: result[1] };
  });
}

// ---------- universities ----------
// returns the faculties that usually fit the student's A/L stream
export function facultiesForStream(faculties, stream) {
  if (!stream) return [];
  return faculties.filter((f) => {
    const streams = FACULTY_STREAMS[f] || [];
    return streams.includes('Any') || streams.includes(stream);
  });
}

export function matchingUniversities(stream) {
  return UNIVERSITIES.map((u) => ({ ...u, fits: facultiesForStream(u.faculties, stream) }));
}

// ---------- scholarships ----------
export function evaluateScholarships(al) {
  const a = summariseAL(al);
  return SCHOLARSHIPS.map((s) => {
    let relevantNow = false;
    if (s.group === 'Local') relevantNow = govEligible(a);
    else if (s.name.startsWith('MEXT') || s.name.startsWith('DAAD')) relevantNow = a.entered > 0;
    return { ...s, relevantNow };
  });
}

// ---------- next steps shown on the dashboard ----------
export function buildGuidance(ol, al) {
  const o = summariseOL(ol);
  const a = summariseAL(al);
  const steps = [];

  if (o.entered === 0 && a.entered === 0) {
    return ['Add your O/L results to see your options.'];
  }

  if (o.entered > 0) {
    const q = olQualifiesForAL(o);
    if (q.ok) {
      steps.push('Your O/L results meet the usual guideline for Advanced Level. Compare the five A/L streams: Physical Science, Biological Science, Commerce, Arts and Technology.');
      steps.push('Vocational training (NVQ and VTA) is another route you can start after O/L.');
    } else {
      q.reasons.forEach((r) => steps.push(r));
      steps.push('You can also look at NVQ, VTA or diploma programmes. Ask your school about re-sitting O/L.');
    }
  }

  if (a.entered > 0) {
    if (govEligible(a)) {
      steps.push('You meet the usual guideline to be considered for government universities. Selection depends on your Z-score and district cut-off marks.');
    } else if (a.entered < 3) {
      steps.push('Select a grade for all three A/L subjects to see the full result.');
    } else if (a.passes < 3) {
      steps.push('Government universities usually need 3 A/L passes. Ask about re-sitting A/L, and look at HND and diploma programmes.');
    } else if (!a.cgtOk) {
      steps.push('Government universities usually need 30+ marks in the Common General Test. Add your marks, or check the re-sit options.');
    }
    if (a.passes >= 3) {
      steps.push('Private universities such as SLIIT, NSBM Green University and IIT usually accept 3 A/L passes. Compare their programmes and fees.');
    }
    const fits = matchingUniversities(a.stream)
      .flatMap((u) => u.fits.map((f) => `${f} at ${u.name}`))
      .slice(0, 4);
    if (fits.length) steps.push(`For the ${a.stream} stream, look at: ${fits.join(', ')}.`);
  }

  steps.push('These are suggestions, not verified admission requirements. Check each official website.');
  return steps;
}

