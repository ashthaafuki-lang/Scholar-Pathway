import { Routes, Route } from 'react-router-dom';

import Navbar from './pages/Home/Navbar';
import Home from './pages/Home/Home';
import Footer from './pages/Home/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/StudentDashboard/Dashboard';


function StudentDashboard() {
  return <h1>Welcome to Student Dashboard 🎓</h1>;
}

function InstitutionDashboard() {
  return <h1>Welcome to Institution Dashboard 🏛️</h1>;
}

function AdminDashboard() {
  return <h1>Welcome to Admin Dashboard ⚙️</h1>;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based dashboards */}
        {/* <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        /> */}

        <Route
          path="/institution/dashboard"
          element={<InstitutionDashboard />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/student/dashboard"
          element={<Dashboard />}
        />

      </Routes>

      <Footer />
    </>
  );
}
