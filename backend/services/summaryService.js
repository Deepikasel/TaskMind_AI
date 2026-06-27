const Task = require("../models/Task");
const Note = require("../models/Note");
const Reminder = require("../models/Reminder");

const {
  generateContent,
} = require("./geminiService");
async function generateDailySummary(userId) {
  const tasks = await Task.find({ user: userId });

  const completed = tasks.filter(t => t.status === "Completed").length;
  const total = tasks.length;

  const productivityScore =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const pendingTasks = total - completed;

  const prompt = `
You are a productivity assistant.

Return ONLY valid JSON:

{
  "summary": "short daily summary",
  "insights": ["insight1", "insight2", "insight3"]
}

User stats:
Completed tasks: ${completed}
Pending tasks: ${pendingTasks}
Total tasks: ${total}
Productivity score: ${productivityScore}%
`;

  const result = await generateContent(prompt);

  let parsed;

  try {
    parsed = JSON.parse(result);
  } catch (e) {
    parsed = {
      summary: "You had a productive day.",
      insights: ["Keep going!", "Stay consistent", "Good progress"],
    };
  }

  return {
    productivityScore,
    ...parsed,
  };
}

module.exports = { generateDailySummary };