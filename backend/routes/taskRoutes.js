const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask,
  archiveTask,
  taskStats,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getTasks);

router.get("/stats", taskStats);

router.get("/:id", getTask);

router.post("/", createTask);

router.put("/:id", updateTask);

router.patch("/:id/complete", completeTask);

router.patch("/:id/archive", archiveTask);

router.delete("/:id", deleteTask);

module.exports = router;