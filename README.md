# 🚀 TaskMind AI

A lightweight personal productivity assistant built using the MERN Stack with Google Gemini AI integration. TaskMind AI enables users to efficiently capture, organize, and manage daily tasks, notes, and reminders through a clean and user-friendly interface.

---

# 📌 Problem Statement

**Lightweight Personal Productivity Capture Tool**

Build a personal productivity assistant that allows users to capture and categorize tasks, notes, reminders, and to-dos through natural language input. Focus on efficient capture mechanisms (voice, chat, forms), and optionally explore semantic tagging and basic summarization for future retrieval.

---

# ✨ Features

* 👤 User Authentication (Signup/Login)
* 📋 Task Management

  * Add Tasks
  * Edit Tasks
  * Delete Tasks
  * Mark Tasks as Completed
  * Voice & Text Task Input
* 📝 Notes Management

  * Create Notes
  * Edit Notes
  * Delete Notes
  * Voice & Text Note Input
* ⏰ Reminder Management

  * Create Reminders
  * Edit Reminders
  * Delete Reminders
  * Voice & Text Reminder Input
* 🤖 AI Integration using Google Gemini

  * Smart Task Categorization
  * AI-generated Task Summary
* 📊 Productivity Dashboard

  * Total Tasks
  * Completed Tasks
  * Pending Tasks
  * Notes Count
  * Reminders Count
  * High Priority Tasks
* 📈 Productivity Summary

  * Completion Percentage
  * Productivity Insights

---

# 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Google Gemini AI API

---

# 📂 Project Structure

```
TaskMind_AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Prerequisites

Before running the project, install:

* Node.js (v18 or later)
* npm
* MongoDB Atlas (or Local MongoDB)
* Google Gemini API Key
* Git

---

# 🔧 Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Deepikasel/TaskMind_AI.git

cd TaskMind_AI
```

---

## 2. Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file inside the **backend** folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm start
```

Create a `.env` file inside the **frontend** folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

# 🚀 Usage

1. Register a new account.
2. Login securely.
3. Add Tasks using text or voice.
4. Create Notes.
5. Set Reminders.
6. View Dashboard statistics.
7. Track productivity through the Summary page.

---

# 🤖 Solution Approach

TaskMind AI follows a client-server architecture using the MERN Stack.

* React provides a responsive user interface.
* Express.js exposes REST APIs.
* MongoDB stores user data securely.
* JWT is used for authentication and authorization.
* Google Gemini AI enhances productivity by automatically categorizing tasks and generating summaries.
* Voice input improves the speed of capturing tasks, notes, and reminders.
* Dashboard statistics and summary insights help users monitor their productivity.

---

# 🌐 Live Demo

### Frontend
[https://endearing-shortbread-954e70.netlify.app/]

### Backend API

[https://taskmind-ai-4p3b.onrender.com]

---

# 🎥 Project Demonstration

YouTube Video:

[https://youtu.be/ZLIS834zkmQ?si=GDZAa5PftJnEXsf-]

---

# 👩‍💻 Author

**Deepika**

GitHub: https://github.com/Deepikasel

---

# 📄 License

This project is developed for educational and learning purposes.
