const express = require("express");

const router = express.Router();

const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  noteStats,
  recentNotes,
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getNotes);

router.get("/stats", noteStats);

router.get("/recent", recentNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.put("/:id", updateNote);

router.patch("/:id/favorite", toggleFavorite);

router.delete("/:id", deleteNote);

module.exports = router;