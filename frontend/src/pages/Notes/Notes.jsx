
import { useState, useEffect } from "react";
import "./Notes.css";

import NoteCard from "../../components/NoteCard/NoteCard";
import Modal from "../../components/Modal/Modal";
import VoiceInput from "../../components/VoiceInput/VoiceInput";

import useSpeechRecognition from "../../hooks/useSpeechRecognition";

import {
  getNotes,
  createNote,
  deleteNote,
  favoriteNote,
} from "../../services/noteService";

function Notes() {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data.data);
    } catch (err) {
      console.log("Fetch notes error:", err);
    }
  };

  
  useEffect(() => {
    if (!transcript) return;

    setFormData((prev) => ({
      ...prev,
      content: transcript,
      title: prev.title || transcript.slice(0, 40),
    }));
  }, [transcript]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const notePayload = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        summary:
          formData.content.length > 100
            ? formData.content.slice(0, 100) + "..."
            : formData.content,
        voiceInput: !!transcript,
      };

      const res = await createNote(notePayload);

      setNotes((prev) => [res.data.data, ...prev]);

      setFormData({
        title: "",
        content: "",
        tags: "",
      });

      setIsOpen(false);
    } catch (err) {
      console.log("Create note error:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  
  const handleFavorite = async (id) => {
    try {
      const res = await favoriteNote(id);

      setNotes((prev) =>
        prev.map((n) => (n._id === id ? res.data.data : n))
      );
    } catch (err) {
      console.log("Favorite error:", err);
    }
  };

  return (
    <div className="notes-page">
      <div className="container">

        <div className="page-header">
          <h1>Notes</h1>

          <button
            className="add-btn"
            onClick={() => setIsOpen(true)}
          >
            + New Note
          </button>
        </div>

        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              content={note.content}
              tags={note.tags}
              summary={note.summary}
              onDelete={() => handleDelete(note._id)}
              onEdit={() => {
                setFormData({
                  title: note.title,
                  content: note.content,
                  tags: note.tags.join(", "),
                });
                setIsOpen(true);
              }}
              onFavorite={() => handleFavorite(note._id)}
            />
          ))}
        </div>

        <Modal
          isOpen={isOpen}
          title="Create Note (Voice + Text)"
          onClose={() => setIsOpen(false)}
        >
          <form className="note-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Title (or speak)"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="content"
              placeholder="Speak or type your note..."
              rows="6"
              value={formData.content}
              onChange={handleChange}
              required
            />

            <VoiceInput
              transcript={transcript}
              listening={listening}
              startListening={startListening}
              stopListening={stopListening}
            />

            <input
              type="text"
              name="tags"
              placeholder="react, ai, notes"
              value={formData.tags}
              onChange={handleChange}
            />

            <button type="submit" className="save-btn">
              {loading ? "Saving..." : "Save Note"}
            </button>

          </form>
        </Modal>

      </div>
    </div>
  );
}

export default Notes;