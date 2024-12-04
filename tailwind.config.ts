import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(93.31deg, rgba(54, 129, 198, 0.1) 0%, rgba(43, 74, 157, 0.1) 100%)',
        'linear-button-gradient': 'linear-gradient(90deg, #3681c6, #2b4a9d)',
      },
    },
  },
  plugins: [],
} satisfies Config;
