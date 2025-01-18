/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            "segoe": ["Segoe Script", "sans-serif"],
            "liber": ["Liberation Sans", "sans-serif"],
        }
    },
  },
  plugins: [
      require('daisyui'),
  ],
}

