import "./DashboardStats.css";

function DashboardStats({
  totalTasks = 0,
  completedTasks = 0,
  pendingTasks = 0,
  notes = 0,
  reminders = 0
}) {
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks
    },
    {
      title: "Completed",
      value: completedTasks
    },
    {
      title: "Pending",
      value: pendingTasks
    },
    {
      title: "Notes",
      value: notes
    },
    {
      title: "Reminders",
      value: reminders
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div
          className="stat-card"
          key={index}
        >
          <h3>{item.value}</h3>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;