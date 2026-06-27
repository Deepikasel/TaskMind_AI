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


router.use(protect);

router.post("/tags", generateAITags);


router.post("/category", generateCategory);


router.post("/summarize", generateSummary);


router.post("/parse-task", parseNaturalTask);


router.get("/daily-summary", dailySummary);


router.get("/suggestions", productivitySuggestions);

module.exports = router;