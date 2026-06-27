import "./TaskCard.css";

function TaskCard({
  title,
  category,
  priority,
  status,
  dueDate,
  onEdit,
  onDelete,
  onComplete
}) {
  return (
    <div className="task-card">

      <div className="task-header">
        <h3>{title}</h3>

        <span className={`priority ${priority?.toLowerCase()}`}>
          {priority}
        </span>
      </div>

      <div className="task-details">
        <p>
          <strong>Category:</strong> {category}
        </p>

        <p>
          <strong>Status:</strong> {status}
        </p>

        <p>
          <strong>Due Date:</strong> {dueDate}
        </p>
      </div>

      <div className="task-actions">
        <button
          className="complete-btn"
          onClick={onComplete}
        >
          Complete
        </button>

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default TaskCard;