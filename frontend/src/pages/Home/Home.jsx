
import "./Home.css";
import { Link } from "react-router-dom";
import { FaTasks, FaStickyNote, FaBell, FaMicrophone, FaChartPie } from "react-icons/fa";

function Home() {
  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-left">
            <h1>Capture Tasks, Notes & Reminders Effortlessly</h1>

            <p>
              TaskMind AI helps you quickly capture your daily thoughts,
              tasks, and reminders using simple typing or voice input.
              Stay organized with a clean and minimal productivity system.
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="primary-btn">
                Get Started
              </Link>

              <Link to="/about" className="secondary-btn">
                Learn More
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <h3>Quick Capture Example</h3>
              <p>"Call dentist tomorrow at 5 PM"</p>
              <span>Saved instantly as a reminder</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="feature-section container">
        <h2>What You Can Do</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <FaTasks className="feature-icon" />
            <h3>Tasks</h3>
            <p>
              Add and manage your daily tasks using simple input or voice capture.
            </p>
          </div>

          <div className="feature-card">
            <FaStickyNote className="feature-icon" />
            <h3>Notes</h3>
            <p>
              Quickly save ideas, thoughts, and important information in one place.
            </p>
          </div>

          <div className="feature-card">
            <FaBell className="feature-icon" />
            <h3>Reminders</h3>
            <p>
              Set reminders for important events, deadlines, and daily activities.
            </p>
          </div>

          <div className="feature-card">
            <FaMicrophone className="feature-icon" />
            <h3>Voice Input</h3>
            <p>
              Speak naturally to capture tasks and reminders faster.
            </p>
          </div>

          <div className="feature-card">
            <FaChartPie className="feature-icon" />
            <h3>Productivity Summary</h3>
            <p>
              View your daily completion percentage and track your progress.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;