/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        cream: "#f4f8fa",
        lightBlue: "#eef4f9",
        border: "#d4dfed",
        navy: "#032b52",
        primary: "#075a97",
        secondary: "#0a84be",
        accent: "#17b5e7",
        dark: "#020202",
        text: "#334155",
        muted: "#64748b",
      },
      borderRadius: {
        '20': '20px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(7, 90, 151, 0.08)',
        'premium': '0 20px 50px rgba(23, 181, 231, 0.12)',
        'subtle': '0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

