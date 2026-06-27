/* import { useEffect, useState } from "react";
import "./Reminders.css";

import {
  getReminders,
  createReminder,
  completeReminder,
  deleteReminder,
} from "../../services/reminderService";

function Reminders() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    try {
      const res = await getReminders();

      setReminders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const addReminder = async () => {
    if (!title || !date) return;

    await createReminder({
      title,
      reminderDate: date,
    });

    setTitle("");
    setDate("");

    loadReminders();
  };

  const complete = async (id) => {
    await completeReminder(id);
    loadReminders();
  };

  const remove = async (id) => {
    await deleteReminder(id);
    loadReminders();
  };

  return (
    <div className="reminders-page">

      <h1>Reminders</h1>

      <div className="reminder-form">

        <input
          placeholder="Reminder"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button onClick={addReminder}>
          Add Reminder
        </button>

      </div>

      {reminders.map((item) => (

        <div
          className="reminder-card"
          key={item._id}
        >

          <h3>{item.title}</h3>

          <p>
            {new Date(
              item.reminderDate
            ).toLocaleDateString()}
          </p>

          <p>{item.status}</p>

          <button
            onClick={() =>
              complete(item._id)
            }
          >
            Complete
          </button>

          <button
            onClick={() =>
              remove(item._id)
            }
          >
            Delete
          </button>

        </div>

      ))}
    </div>
  );
}

export default Reminders; */



import { useEffect, useState } from "react";
import "./Reminders.css";

import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import VoiceInput from "../../components/VoiceInput/VoiceInput";

import {
  getReminders,
  createReminder,
  completeReminder,
  deleteReminder,
  updateReminder,
} from "../../services/reminderService";

function Reminders() {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const [reminders, setReminders] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });

  const [editId, setEditId] = useState(null);

  // ======================
  // LOAD REMINDERS
  // ======================
  const loadReminders = async () => {
    try {
      const res = await getReminders();
      setReminders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  // ======================
  // VOICE → AUTO FILL
  // ======================
 useEffect(() => {
  if (!transcript) return;

  setFormData((prev) => {
    // only update if user is currently not typing manually
    if (prev.title && prev.title !== "") return prev;

    return {
      ...prev,
      title: transcript,
    };
  });
}, [transcript]);
  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // ADD / UPDATE REMINDER
  // ======================
  const saveReminder = async () => {
    if (!formData.title || !formData.date) return;

    try {
      if (editId) {
        await updateReminder(editId, {
          title: formData.title,
          reminderDate: formData.date,
        });
      } else {
        await createReminder({
          title: formData.title,
          reminderDate: formData.date,
        });
      }

      setFormData({ title: "", date: "" });
      setEditId(null);
      loadReminders();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // COMPLETE
  // ======================
  const complete = async (id) => {
    try {
      await completeReminder(id);
      loadReminders();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // DELETE
  // ======================
  const remove = async (id) => {
    try {
      await deleteReminder(id);
      loadReminders();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // EDIT (FILL FORM)
  // ======================
  const edit = (item) => {
    setFormData({
      title: item.title,
      date: item.reminderDate?.split("T")[0],
    });

    setEditId(item._id);
  };

  return (
    <div className="reminders-page">

      <h1>Reminders</h1>

      {/* ================= FORM ================= */}
      <div className="reminder-form">

        <input
          placeholder="Reminder (type or speak)"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <VoiceInput
          transcript={transcript}
          listening={listening}
          startListening={startListening}
          stopListening={stopListening}
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />

        <button onClick={saveReminder}>
          {editId ? "Update Reminder" : "Add Reminder"}
        </button>
      </div>

      {/* ================= LIST ================= */}
      {reminders.map((item) => (
        <div className="reminder-card" key={item._id}>

          <h3>{item.title}</h3>

          <p>
            {new Date(item.reminderDate).toLocaleDateString()}
          </p>

          <p>Status: {item.status}</p>

          <div className="btn-group">

            <button onClick={() => complete(item._id)}>
              Complete
            </button>

            <button onClick={() => edit(item)}>
              Edit
            </button>

            <button onClick={() => remove(item._id)}>
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default Reminders;