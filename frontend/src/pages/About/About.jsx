

import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* subtle background layers */}
      <div className="bg-glow"></div>

      <div className="container about-container">

        <div className="about-header">
          <h1>About TaskMind AI</h1>
          <p>
            A lightweight productivity tool to quickly capture
            tasks, notes, and reminders — structured for fast input
            and simple tracking.
          </p>
        </div>

        <div className="about-grid">

          <div className="about-card">
            <h3>Task Capture</h3>
            <p>
              Add tasks instantly using simple input or voice,
              and organize them efficiently.
            </p>
          </div>

          <div className="about-card">
            <h3>Notes System</h3>
            <p>
              Store ideas, study points, and quick information in a clean workspace.
            </p>
          </div>

          <div className="about-card">
            <h3>Reminders</h3>
            <p>
              Set and track reminders for deadlines, events, and daily activities.
            </p>
          </div>

          <div className="about-card">
            <h3>Summary Insights</h3>
            <p>
              View simple productivity percentage based on completed vs pending items.
            </p>
          </div>

        </div>

        <div className="about-footer">
          Built for fast capture • clean structure • daily productivity tracking
        </div>

      </div>
    </div>
  );
}

export default About;