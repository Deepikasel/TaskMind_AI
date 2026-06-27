const express = require("express");

const router = express.Router();

const {
  createReminder,
  getReminders,
  getReminder,
  updateReminder,
  deleteReminder,
  completeReminder,
  todayReminders,
  upcomingReminders,
  reminderStats,
} = require("../controllers/reminderController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getReminders);

router.get("/stats", reminderStats);

router.get("/today", todayReminders);

router.get("/upcoming", upcomingReminders);

router.get("/:id", getReminder);

router.post("/", createReminder);

router.put("/:id", updateReminder);

router.patch("/:id/complete", completeReminder);

router.delete("/:id", deleteReminder);

module.exports = router;