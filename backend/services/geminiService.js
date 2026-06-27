

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/*
=====================================================
SAFE CORE GENERATOR (NEW)
=====================================================
*/
const generateContent = async (prompt, fallback = "") => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return result.text || fallback;
  } catch (error) {
    console.log("Gemini Error → Using fallback:", error.message);

    return fallback;
  }
};

/*
=====================================================
Generate Tags
=====================================================
*/
const generateTags = async (text) => {
  const prompt = `
Generate 5 short tags for the following text.
Return ONLY a JSON array.

Example:
["Study","Java","DSA"]

Text:
${text}
`;

  const output = await generateContent(prompt, "[]");

  try {
    return JSON.parse(output);
  } catch {
    return [];
  }
};

/*
=====================================================
Generate Category
=====================================================
*/
const categorizeText = async (text) => {
  const prompt = `
Choose ONE category.

Study, Work, Career, Health, Personal, Shopping, Finance, Meeting, Project, Other

Return only category.

Task:
${text}
`;

  const output = await generateContent(prompt, "Other");

  return output.trim() || "Other";
};

/*
=====================================================
Generate Summary
=====================================================
*/
const summarizeContent = async (text) => {
  const prompt = `
Summarize in less than 50 words.

Text:
${text}
`;

  const output = await generateContent(
    prompt,
    "Summary unavailable at the moment."
  );

  return output.trim();
};

/*
=====================================================
Parse Task AI (SAFE)
=====================================================
*/
const parseTaskAI = async (text) => {
  const prompt = `
Extract task JSON:

{
"title":"",
"description":"",
"category":"",
"priority":"",
"dueDate":"",
"tags":[]
}

Rules:
- category: Study, Work, Career, Health, Personal, Shopping, Finance, Meeting, Project, Other
- priority: Low, Medium, High
- dueDate: YYYY-MM-DD or ""
- tags max 5

Task:
${text}
`;

  const output = await generateContent(
    prompt,
    JSON.stringify({
      title: text,
      description: text,
      category: "Other",
      priority: "Medium",
      dueDate: "",
      tags: [],
    })
  );

  try {
    return JSON.parse(output);
  } catch (err) {
    return {
      title: text,
      description: text,
      category: "Other",
      priority: "Medium",
      dueDate: "",
      tags: [],
    };
  }
};

module.exports = {
  generateContent,
  generateTags,
  categorizeText,
  summarizeContent,
  parseTaskAI,
};