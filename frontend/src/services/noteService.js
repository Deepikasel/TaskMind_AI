import API from "./api";

export const getNotes = (params = {}) => {
  return API.get("/notes", { params });
};

export const getNote = (id) => {
  return API.get(`/notes/${id}`);
};

export const createNote = (note) => {
  return API.post("/notes", note);
};

export const updateNote = (id, note) => {
  return API.put(`/notes/${id}`, note);
};

export const deleteNote = (id) => {
  return API.delete(`/notes/${id}`);
};

export const favoriteNote = (id) => {
  return API.patch(`/notes/${id}/favorite`);
};

export const noteStats = () => {
  return API.get("/notes/stats");
};

export const recentNotes = () => {
  return API.get("/notes/recent");
};