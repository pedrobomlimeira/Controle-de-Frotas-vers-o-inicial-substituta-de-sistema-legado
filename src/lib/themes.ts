export type Theme = "light" | "dark" | "blue";

export const themes = {
  light: {
    name: "Light",
    bgPattern:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    bgOverlay: "bg-white/90",
    primary: "bg-blue-600",
    secondary: "bg-gray-100",
  },
  dark: {
    name: "Dark",
    bgPattern:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2083&ixlib=rb-4.0.3",
    bgOverlay: "bg-gray-900/90",
    primary: "bg-blue-500",
    secondary: "bg-gray-800",
  },
  blue: {
    name: "Blue",
    bgPattern:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    bgOverlay: "bg-blue-900/90",
    primary: "bg-blue-400",
    secondary: "bg-blue-800",
  },
};
