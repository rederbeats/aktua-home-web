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
        ink: "#111111",
        paper: "#f7f7f6",
        brand: {
          red: "#c81022",
          dark: "#050505"
        }
      },
      boxShadow: {
        soft: "0 16px 45px rgba(17, 17, 17, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
