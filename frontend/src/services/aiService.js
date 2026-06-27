import API from "./api";

export const parseTask = async (text) => {
  const res = await API.post("/ai/parse-task", { text });
  return res.data.data;
};

export const generateTags = (text) =>
  API.post("/ai/tags", { text });

export const generateCategory = (text) =>
  API.post("/ai/category", { text });

export const generateSummary = (text) =>
  API.post("/ai/summarize", { text });

export const dailySummary = () =>
  API.get("/ai/daily-summary");

export const productivitySuggestions = () =>
  API.get("/ai/suggestions");