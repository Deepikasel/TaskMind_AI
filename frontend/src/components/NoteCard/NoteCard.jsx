import "./NoteCard.css";

function NoteCard({
  title,
  content,
  tags,
  summary,
  onEdit,
  onDelete
}) {
  return (
    <div className="note-card">

      <h3>{title}</h3>

      <p className="note-content">
        {content}
      </p>

      <div className="note-tags">
        {tags?.map((tag, index) => (
          <span key={index}>
            #{tag}
          </span>
        ))}
      </div>

      {summary && (
        <div className="note-summary">
          <strong>AI Summary:</strong>
          <p>{summary}</p>
        </div>
      )}

      <div className="note-actions">
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

export default NoteCard;