
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

import { getProfile } from "../../services/authService";
import { taskStats } from "../../services/taskService";
import { getNotes } from "../../services/noteService";
import { getReminders } from "../../services/reminderService";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalNotes: 0,
    totalReminders: 0,
    highPriority: 0,
  });

  const loadDashboard = async () => {
    setLoading(true);

    try {
      const [profileRes, taskStatsRes, notesRes, remindersRes] =
        await Promise.all([
          getProfile(),
          taskStats(),
          getNotes(),
          getReminders(),
        ]);

      setUser(profileRes.data);

      setStats({
        totalTasks: taskStatsRes.data.data.total,
        completedTasks: taskStatsRes.data.data.completed,
        pendingTasks: taskStatsRes.data.data.pending,
        highPriority: taskStatsRes.data.data.priority.high,
        totalNotes: notesRes.data.total,
        totalReminders: remindersRes.data.total,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name || "User"} 👋</h1>
          <p>Manage your productivity with AI.</p>
        </div>

        <button className="refresh-btn" onClick={loadDashboard}>
          Refresh
        </button>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <Link to="/tasks" className="action-card">
          <h3>Create Task</h3>
          <p>Add a new AI-powered task.</p>
        </Link>

        <Link to="/notes" className="action-card">
          <h3>Create Note</h3>
          <p>Save notes with AI tags.</p>
        </Link>

        <Link to="/reminders" className="action-card">
          <h3>Add Reminder</h3>
          <p>Schedule reminders easily.</p>
        </Link>

        <Link to="/summary" className="action-card">
          <h3>AI Summary</h3>
          <p>View today's productivity.</p>
        </Link>
      </div>

      {/* STATS GRID (ONLY ONE PLACE NOW) */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Tasks</h2>
          <span className="big-number">{stats.totalTasks}</span>
        </div>

        <div className="dashboard-card">
          <h2>Completed</h2>
          <span className="big-number success">{stats.completedTasks}</span>
        </div>

        <div className="dashboard-card">
          <h2>Pending</h2>
          <span className="big-number warning">{stats.pendingTasks}</span>
        </div>

        <div className="dashboard-card">
          <h2>Notes</h2>
          <span className="big-number">{stats.totalNotes}</span>
        </div>

        <div className="dashboard-card">
          <h2>Reminders</h2>
          <span className="big-number">{stats.totalReminders}</span>
        </div>

        <div className="dashboard-card">
          <h2>High Priority</h2>
          <span className="big-number danger">{stats.highPriority}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;