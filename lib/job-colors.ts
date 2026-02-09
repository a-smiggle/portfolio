export type EmploymentTypeColor = { bg: string; border: string };

export function getEmploymentTypeColor(type: string): EmploymentTypeColor {
  switch (type) {
    case "Full-time":
      return { bg: "rgba(34,197,94,0.35)", border: "#22c55e" }; // green
    case "Contract":
      return { bg: "rgba(245,158,11,0.35)", border: "#f59e0b" }; // amber
    case "Part-time":
      return { bg: "rgba(59,130,246,0.35)", border: "#3b82f6" }; // blue
    case "Internship":
      return { bg: "rgba(168,85,247,0.35)", border: "#a855f7" }; // purple
    default:
      return { bg: "rgba(156,163,175,0.35)", border: "#9ca3af" }; // gray
  }
}
