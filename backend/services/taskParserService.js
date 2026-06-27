const chrono = require("chrono-node");
const { categorizeText, generateTags } = require("./geminiService");

function extractTitle(text) {
  let cleaned = text
    .replace(/\b(urgent|asap|immediately)\b/gi, "")
    .replace(/\b(tomorrow|today|tonight)\b/gi, "")
    .trim();

  const splitWords = [" with ", " for ", " to ", " about "];

  for (const word of splitWords) {
    if (cleaned.includes(word)) {
      cleaned = cleaned.split(word)[0];
      break;
    }
  }

  return cleaned.trim() || text;
}

function getPriority(text) {
  const lower = text.toLowerCase();

  if (/(urgent|asap|immediately)/.test(lower)) return "High";
  if (/(later|whenever|not urgent)/.test(lower)) return "Low";

  return "Medium";
}

function formatDate(date) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

async function parseTask(text) {
  try {
    const date = chrono.parseDate(text);

    const [category, tags] = await Promise.all([
      categorizeText(text).catch(() => "Other"),
      generateTags(text).catch(() => []),
    ]);

    return {
      title: extractTitle(text),
      description: text,
      category,
      priority: getPriority(text),
      dueDate: formatDate(date),
      tags,
      voiceInput: true,
    };
  } catch (err) {
    console.error("parseTask error:", err);

    // fallback so frontend NEVER crashes
    return {
      title: text,
      description: text,
      category: "Other",
      priority: "Medium",
      dueDate: "",
      tags: [],
      voiceInput: true,
    };
  }
}

module.exports = { parseTask };