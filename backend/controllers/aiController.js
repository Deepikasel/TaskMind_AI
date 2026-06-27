const { generateTags, summarizeContent, categorizeText } = require("../services/geminiService");
const { parseTask } = require("../services/taskParserService");
const { generateDailySummary } = require("../services/summaryService");

/*
=====================================================
SAFE ERROR WRAPPER
=====================================================
*/
const safe = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "AI service temporarily unavailable",
    });
  }
};

/*
=====================================================
Generate AI Tags
=====================================================
*/
exports.generateAITags = safe(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: "Text is required" });
  }

  let tags = [];

  try {
    tags = await generateTags(text);
  } catch (e) {
    tags = [];
  }

  res.json({
    success: true,
    data: tags,
  });
});

/*
=====================================================
AI Category
=====================================================
*/
exports.generateCategory = safe(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: "Text is required" });
  }

  let category = "Other";

  try {
    category = await categorizeText(text);
  } catch (e) {
    category = "Other";
  }

  res.json({
    success: true,
    data: category,
  });
});

/*
=====================================================
AI Summary
=====================================================
*/
exports.generateSummary = safe(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: "Text is required" });
  }

  let summary = "";

  try {
    summary = await summarizeContent(text);
  } catch (e) {
    summary = "Summary unavailable";
  }

  res.json({
  success: true,
  data: summary || {
    productivityScore: 0,
    summary: "No data available",
    insights: [],
  },
});
});

/*
=====================================================
TASK PARSER (MAIN FIX AREA)
=====================================================
*/
exports.parseNaturalTask = safe(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Task text is required",
    });
  }

  const parsedTask = await parseTask(text);

  res.json({
    success: true,
    data: parsedTask,
  });
});

/*
=====================================================
Daily Summary
=====================================================
*/
exports.dailySummary = safe(async (req, res) => {
  const summary = await generateDailySummary(req.user.id);

  res.json({
    success: true,
    data: summary,
  });
});

/*
=====================================================
Suggestions
=====================================================
*/
/* exports.productivitySuggestions = safe(async (req, res) => {
  const { generateContent } = require("../services/geminiService");

  const prompt = `
Generate 5 productivity tips.
Return one per line.
`;

  const suggestions = await generateContent(prompt);

  res.json({
    success: true,
    data: suggestions,
  });
}); */

exports.productivitySuggestions = safe(async (req, res) => {
  const prompt = `
Generate 5 productivity tips.
Return one per line.
`;

  try {
    const suggestions = await generateContent(
      prompt,
      "Focus on tasks\nAvoid distractions\nTake breaks\nPlan your day\nStay consistent"
    );

    const list = suggestions
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    res.json({
      success: true,
      data: [
        "Focus on tasks",
        "Avoid distractions",
        "Take breaks",
        "Plan your day",
        "Stay consistent",
      ],
    });
  }
});