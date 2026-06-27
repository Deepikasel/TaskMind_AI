import API from "./api";

export const getTasks = (params = {}) => {
  return API.get("/tasks", { params });
};

export const getTask = (id) => {
  return API.get(`/tasks/${id}`);
};

export const createTask = (task) => {
  return API.post("/tasks", task);
};

export const updateTask = (id, task) => {
  return API.put(`/tasks/${id}`, task);
};

export const deleteTask = (id) => {
  return API.delete(`/tasks/${id}`);
};

export const completeTask = (id) => {
  return API.patch(`/tasks/${id}/complete`);
};

export const archiveTask = (id) => {
  return API.patch(`/tasks/${id}/archive`);
};

export const taskStats = () => {
  return API.get("/tasks/stats");
}; 