export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const getRelativeDate = (dateString) => {
  const today = new Date();

  const targetDate = new Date(dateString);

  const diffTime =
    targetDate.getTime() -
    today.getTime();

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Tomorrow";
  }

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} day(s) ago`;
  }

  return `${diffDays} day(s) left`;
};