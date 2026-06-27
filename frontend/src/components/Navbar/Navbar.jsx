
// src/components/Navbar/Navbar.jsx
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* LOGO SECTION (CLICKABLE) */}
        <Link to="/" className="logo-container">
          <div className="logo-circle">
            TM
          </div>

          <h2 className="logo-text">TaskMind AI</h2>
        </Link>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;