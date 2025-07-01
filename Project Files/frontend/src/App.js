import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Common components
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";

// Admin & User components
import AdminHome from "./components/admin/AdminHome";
import UserHome from "./components/user/UserHome";
import UserAppointments from "./components/user/UserAppointments";
import BookAppointmentApp from "./components/user/BookAppointment"; // Renamed here to avoid name conflict

function App() {
  const userData = localStorage.getItem("userData");
  const userLoggedIn = !!userData;
  const user = userLoggedIn ? JSON.parse(userData) : null;

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            {userLoggedIn && user.type === "admin" && (
              <Route path="/adminhome" element={<AdminHome />} />
            )}

            {/* User Routes */}
            {userLoggedIn && user.type === "user" && (
              <>
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/book" element={<BookAppointmentApp />} />
                <Route path="/appointments" element={<UserAppointments />} />
              </>
            )}

            {/* Redirect unauthenticated users */}
            {!userLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}

            {/* Redirect unknown paths to home for logged in users */}
            {userLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
          </Routes>
        </div>

        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">© 2025 Copyright: MediCareBook</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
