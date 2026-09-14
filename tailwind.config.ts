import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5EE",
        ink: "#1D1B15",
        olive: {
          DEFAULT: "#4A5D3A",
          dark: "#333F27",
          light: "#7C9165",
        },
        clay: "#8A7A5C",
        line: "#E4E0D3",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
