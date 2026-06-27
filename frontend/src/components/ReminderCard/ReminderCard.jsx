import "./ReminderCard.css";

function ReminderCard({
  title,
  reminderDate,
  category,
  status,
  onEdit,
  onDelete
}) {
  return (
    <div className="reminder-card">

      <h3>{title}</h3>

      <p>
        <strong>Date:</strong> {reminderDate}
      </p>

      <p>
        <strong>Category:</strong> {category}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <div className="reminder-actions">

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

export default ReminderCard;