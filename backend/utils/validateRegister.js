const DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
];

const LEVELS = ['O/L Student', 'A/L Student', 'Completed A/L', 'Undergraduate', 'Other'];

function validateRegister(body) {
  const errors = {};
  const text = (value) => (typeof value === 'string' ? value.trim() : '');

  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const phone = text(body.phone);
  const educationLevel = text(body.educationLevel);
  const district = text(body.district);
  const password = typeof body.password === 'string' ? body.password : '';

  if (name.length < 3 || name.length > 60) {
    errors.name = 'Name must be 3 to 60 characters';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!/^(0|\+94)7\d{8}$/.test(phone)) {
    errors.phone = 'Enter a valid mobile number, e.g. 0771234567';
  }
  if (!LEVELS.includes(educationLevel)) {
    errors.educationLevel = 'Please select a valid education level';
  }
  if (!DISTRICTS.includes(district)) {
    errors.district = 'Please select a valid district';
  }
  if (password.length < 8 || password.length > 72) {
    errors.password = 'Password must be 8 to 72 characters';
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = 'Password must contain letters and numbers';
  }

  return { errors, clean: { name, email, phone, educationLevel, district, password } };
}

export default validateRegister;