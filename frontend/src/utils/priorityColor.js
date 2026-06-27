export const getPriorityColor = (
  priority
) => {
  switch (
    priority?.toLowerCase()
  ) {
    case "high":
      return "#ef4444";

    case "medium":
      return "#f59e0b";

    case "low":
      return "#10b981";

    default:
      return "#64748b";
  }
};

export const getPriorityBackground = (
  priority
) => {
  switch (
    priority?.toLowerCase()
  ) {
    case "high":
      return "#fee2e2";

    case "medium":
      return "#fef3c7";

    case "low":
      return "#dcfce7";

    default:
      return "#e2e8f0";
  }
};