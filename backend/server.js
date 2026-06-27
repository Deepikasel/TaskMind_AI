require("dotenv").config();
console.log(process.env.GEMINI_API_KEY);
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const noteRoutes =
  require("./routes/noteRoutes");

const reminderRoutes =
  require("./routes/reminderRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const {
  errorHandler,
} = require(
  "./middleware/errorMiddleware"
);

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "TaskMind AI Backend Running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/notes",
  noteRoutes
);

app.use(
  "/api/reminders",
  reminderRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});