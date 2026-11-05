import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validateRegister from '../utils/validateRegister.js';

function makeToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function publicUser(user) {
  return {
    id: user._id, name: user.name, email: user.email, phone: user.phone,
    educationLevel: user.educationLevel, district: user.district, role: user.role,
  };
}

export async function register(req, res, next) {
  try {
    const { errors, clean } = validateRegister(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Please fix the errors and try again', errors });
    }

    const existing = await User.findOne({ email: clean.email });
    if (existing) {
      return res.status(409).json({ message: 'This email is already registered' });
    }

    const user = await User.create(clean); // role எப்பவும் 'student'

    res.status(201).json({ token: makeToken(user), user: publicUser(user) });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This email is already registered' });
    }
    next(err);
  }
}