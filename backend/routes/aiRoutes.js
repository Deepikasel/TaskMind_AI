const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");



const {
  generateAITags,
  generateCategory,
  generateSummary,
  parseNaturalTask,
  dailySummary,
  productivitySuggestions,
} = require("../controllers/aiController");

// Protect all AI routes
router.use(protect);
/*
==========================================
AI Semantic Tags
POST /api/ai/tags
==========================================
*/
router.post("/tags", generateAITags);

/*
==========================================
AI Category
POST /api/ai/category
==========================================
*/
router.post("/category", generateCategory);

/*
==========================================
AI Summary
POST /api/ai/summarize
==========================================
*/
router.post("/summarize", generateSummary);

/*
==========================================
Natural Language Task Parser
POST /api/ai/parse-task
==========================================
*/
router.post("/parse-task", parseNaturalTask);

/*
==========================================
Daily Productivity Summary
GET /api/ai/daily-summary
==========================================
*/
router.get("/daily-summary", dailySummary);

/*
==========================================
AI Productivity Suggestions
GET /api/ai/suggestions
==========================================
*/
router.get("/suggestions", productivitySuggestions);

module.exports = router;