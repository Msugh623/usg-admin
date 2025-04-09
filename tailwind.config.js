/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        extend: {
          fontFamily: {
            poppins: ["Monda", "sans"],
          },
        },
      },
    },
    plugins: [],
  };
  