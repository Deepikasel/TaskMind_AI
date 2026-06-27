import API from "./api";

export const getReminders = (params = {}) => {
  return API.get("/reminders", { params });
};

export const getReminder = (id) => {
  return API.get(`/reminders/${id}`);
};

export const createReminder = (data) => {
  return API.post("/reminders", data);
};

export const updateReminder = (id, data) => {
  return API.put(`/reminders/${id}`, data);
};

export const deleteReminder = (id) => {
  return API.delete(`/reminders/${id}`);
};

export const completeReminder = (id) => {
  return API.patch(`/reminders/${id}/complete`);
};

export const reminderStats = () => {
  return API.get("/reminders/stats");
};

export const todayReminders = () => {
  return API.get("/reminders/today");
};

export const upcomingReminders = () => {
  return API.get("/reminders/upcoming");
};