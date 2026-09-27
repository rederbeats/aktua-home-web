import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f5f5f7",
        paper: "#090a0b",
        brand: {
          red: "#c81022",
          dark: "#0f1011"
        }
      },
      boxShadow: {
        soft: "none"
      }
    }
  },
  plugins: []
};

export default config;
