
import { useState, useEffect } from "react";
import "./Tasks.css";

import TaskCard from "../../components/TaskCard/TaskCard";
import Modal from "../../components/Modal/Modal";
import VoiceInput from "../../components/VoiceInput/VoiceInput";

import useSpeechRecognition from "../../hooks/useSpeechRecognition";

import { parseTask } from "../../services/aiService";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} from "../../services/taskService";

function Tasks() {
  const { transcript, listening, startListening, stopListening } =
    useSpeechRecognition();

  const [isOpen, setIsOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low",
    dueDate: "",
    tags: [],
  });

  // LOAD TASKS FROM DB
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data.data || []);
      } catch (err) {
        console.log("Fetch tasks error:", err);
      }
    };

    fetchTasks();
  }, []);

  // VOICE AUTO PARSE
  useEffect(() => {
    if (!transcript) return;
    analyzeTask(transcript);
  }, [transcript]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const analyzeTask = async (textOverride) => {
    const text =
      typeof textOverride === "string"
        ? textOverride
        : formData.title;

    if (!text || !text.trim()) return;

    try {
      setLoadingAI(true);

      const ai = await parseTask(text);

      setFormData((prev) => ({
        ...prev,
        title: ai?.title || prev.title,
        description: ai?.description || "",
        category: ai?.category || "Other",
        priority: ai?.priority || "Low",
        dueDate: ai?.dueDate || "",
        tags: Array.isArray(ai?.tags) ? ai.tags : [],
      }));
    } catch (err) {
      console.log("AI error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  // CREATE / UPDATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await updateTask(editingId, formData);

        setTasks((prev) =>
          prev.map((t) => (t._id === editingId ? res.data.data : t))
        );
      } else {
        const res = await createTask(formData);

        setTasks((prev) => [...prev, res.data.data]);
      }

      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "Low",
      dueDate: "",
      tags: [],
    });

    setEditingId(null);
    setIsOpen(false);
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // COMPLETE TASK
  const handleComplete = async (id) => {
    try {
      const res = await completeTask(id);

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT TASK
  const handleEdit = (task) => {
    setFormData(task);
    setEditingId(task._id);
    setIsOpen(true);
  };

  return (
    <div className="tasks-page">
      <div className="container">

        <div className="page-header">
          <h1>Tasks</h1>

          <button className="add-btn" onClick={() => setIsOpen(true)}>
            + New Task
          </button>
        </div>

        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              category={task.category}
              priority={task.priority}
              status={task.status}
              dueDate={task.dueDate}
              onDelete={() => handleDelete(task._id)}
              onEdit={() => handleEdit(task)}
              onComplete={() => handleComplete(task._id)}
            />
          ))}
        </div>

        <Modal
          isOpen={isOpen}
          title={editingId ? "Edit Task" : "Create Task"}
          onClose={resetForm}
        >
          <form className="task-form" onSubmit={handleSubmit}>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Type or Speak task..."
              required
            />

            <VoiceInput
              transcript={transcript}
              listening={listening}
              startListening={startListening}
              stopListening={stopListening}
            />

            <button type="button" onClick={() => analyzeTask()}>
              {loadingAI ? "Analyzing..." : "✨ AI Analyze"}
            </button>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />

            <input
              readOnly
              value={(formData.tags || []).join(", ")}
              placeholder="Tags"
            />

            <button type="submit">
              {editingId ? "Update Task" : "Save Task"}
            </button>

          </form>
        </Modal>

      </div>
    </div>
  );
}

export default Tasks;