/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#07598A",
        secondary: "#05A8D6",
        accent: "#0384B4",
        dark: "#020202",
        background: "#F4F8FA",
        white: "#FFFFFF",
        light_blue: "#E8F7FC",
      },
      borderRadius: {
        '20': '20px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(7, 89, 138, 0.05)',
        'layered': '0 20px 50px rgba(7, 89, 138, 0.1)',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

