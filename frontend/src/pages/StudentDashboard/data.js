// All sample data in one place. The names come from your Scholar Pathway pages.
// Later you can replace these arrays with data loaded from your API.

export const OL_SUBJECTS = [
  ['language', 'First language (Sinhala / Tamil)'],
  ['religion', 'Religion'],
  ['english', 'English'],
  ['maths', 'Mathematics'],
  ['science', 'Science'],
  ['history', 'History'],
  ['b1', 'Basket subject 1'],
  ['b2', 'Basket subject 2'],
  ['b3', 'Basket subject 3'],
];

export const OL_GRADES = ['A', 'B', 'C', 'S', 'W']; // W = not passed
export const AL_GRADES = ['A', 'B', 'C', 'S', 'F']; // F = not passed

export const STREAMS = {
  'Physical Science': ['Combined Mathematics', 'Physics', 'Chemistry', 'ICT'],
  'Biological Science': ['Biology', 'Chemistry', 'Physics', 'Agricultural Science'],
  Commerce: ['Accounting', 'Business Studies', 'Economics', 'ICT'],
  Arts: ['Geography', 'History', 'Logic and Scientific Method', 'Political Science', 'Economics', 'English Literature'],
  Technology: ['Engineering Technology', 'Science for Technology', 'ICT', 'Bio-systems Technology'],
};

export const UNIVERSITIES = [
  { name: 'University of Colombo', type: 'Government', place: 'Colombo', faculties: ['Science', 'Law', 'Arts'] },
  { name: 'University of Moratuwa', type: 'Government', place: 'Moratuwa', faculties: ['Engineering', 'IT', 'Architecture'] },
  { name: 'University of Peradeniya', type: 'Government', place: 'Peradeniya', faculties: ['Medicine', 'Engineering', 'Agriculture'] },
  { name: 'University of Sri Jayewardenepura', type: 'Government', place: 'Nugegoda', faculties: ['Management', 'Applied Sciences'] },
  { name: 'SLIIT', type: 'Private', place: 'Malabe', faculties: ['IT', 'Business', 'Engineering'] },
  { name: 'NSBM Green University', type: 'Private', place: 'Homagama', faculties: ['Computing', 'Business'] },
  { name: 'IIT', type: 'Private', place: 'Colombo', faculties: ['Computing', 'Business'] },
];

// which A/L streams usually lead to which faculty (indicative only)
export const FACULTY_STREAMS = {
  Science: ['Physical Science', 'Biological Science'],
  Law: ['Any'],
  Arts: ['Arts', 'Commerce'],
  Engineering: ['Physical Science'],
  IT: ['Physical Science'],
  Architecture: ['Physical Science'],
  Medicine: ['Biological Science'],
  Agriculture: ['Biological Science'],
  Management: ['Commerce', 'Arts'],
  'Applied Sciences': ['Physical Science', 'Biological Science'],
  Business: ['Any'],
  Computing: ['Any'],
};

export const COURSES = [
  { id: 'it-sliit', title: 'BSc (Hons) in Information Technology', level: 'Degree', institution: 'SLIIT', duration: '3–4 years', sector: 'Private' },
  { id: 'eng-uom', title: 'BSc Engineering (Hons)', level: 'Degree', institution: 'University of Moratuwa', duration: '4 years', sector: 'Government' },
  { id: 'cs-ucsc', title: 'BSc in Computer Science', level: 'Degree', institution: 'University of Colombo', duration: '3–4 years', sector: 'Government' },
  { id: 'hnd-it', title: 'Higher National Diploma in IT', level: 'Diploma', institution: 'SLIATE', duration: '2 years', sector: 'Government' },
  { id: 'nvq4', title: 'NVQ Level 4 in Software Development', level: 'NVQ', institution: 'VTA institutes', duration: '1 year', sector: 'Vocational' },
  { id: 'bba', title: 'BBA (Hons) in Business Management', level: 'Degree', institution: 'NSBM Green University', duration: '3–4 years', sector: 'Private' },
];

export const SCHOLARSHIPS = [
  { name: 'Mahapola Higher Education Scholarship', group: 'Local', funding: 'Need-based', where: 'Sri Lanka · Government', when: 'After admission to a government university' },
  { name: 'University Bursary', group: 'Local', funding: 'Need-based', where: 'Sri Lanka · Government', when: 'After admission to a government university' },
  { name: 'Commonwealth Scholarships', group: 'International', funding: 'Fully funded', where: 'United Kingdom · International', when: 'Usually for postgraduate study, so plan for later' },
  { name: 'Chevening Scholarships', group: 'International', funding: 'Fully funded', where: 'United Kingdom · International', when: 'Usually for postgraduate study, so plan for later' },
  { name: 'MEXT Scholarship', group: 'International', funding: 'Fully funded', where: 'Japan · International', when: 'Some programmes are open after A/L. Check the official site' },
  { name: 'DAAD Scholarships', group: 'International', funding: 'Partially funded', where: 'Germany · International', when: 'Depends on the programme level. Check the official site' },
];