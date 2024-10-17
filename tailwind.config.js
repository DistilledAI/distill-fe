import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      // screens: {
      //   "4xl": { max: "1799px" },
      //   "3xl": { max: "1499px" },
      //   "2xl": { max: "1399px" },
      //   xl: { max: "1199px" },
      //   lg: { max: "991px" },
      //   md: { max: "767px" },
      //   sm: { max: "575px" },
      //   sxm: { max: "380px" },
      // },
      fontSize: {
        10: "0.625rem",
        12: "0.75rem",
        13: "0.8125rem",
        14: "0.875rem",
        15: "0.9375rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        22: "1.375rem",
        24: "1.5rem",
        28: "1.75rem",
        32: "2rem",
        36: "2.25rem",
        40: "2.5rem",
        44: "2.75rem",
        48: "3rem",
        56: "3.5rem",
        60: "3.75rem",
      },
      colors: {
        mercury: {
          30: "#FAFAFA",
          50: "#F6F6F6",
          70: "#F4F4F5",
          100: "#E6E6E6",
          200: "#DFDFDF",
          300: "#C8C8C8",
          400: "#ADADAD",
          500: "#999",
          600: "#888888",
          700: "#7B7B7B",
          800: "#676767",
          900: "#545454",
          950: "#363636",
        },
        black: {
          999: "#000000",
        },
        yellow: {
          10: "#FC0",
        },
        brown: {
          10: "#A2845E",
        },
        green: {
          10: "#34C759",
        },
        primary: "#363636",
        code: {
          agent: {
            1: "#DC6D1E",
            2: "#4A38E9",
            3: "#7EB204",
          },
        },
      },
      backgroundImage: {
        "lgd-code-agent-1":
          "linear-gradient(53deg, #DC6D1E -2.17%, #F17C1C 134.29%)",
        "lgd-code-agent-2":
          "linear-gradient(53deg, #4A38E9 -2.17%, #766CFE 134.29%)",
        "lgd-code-agent-3":
          "linear-gradient(53deg, #7EB204 -2.17%, #94D51D 134.29%)",
        "lgd-code-agent-4":
          "linear-gradient(53deg, #DC3A3C -2.17%, #FA7B7D 134.29%)",
        "lgd-code-agent-5":
          "linear-gradient(53deg, #903ADC -2.17%, #BE7BFA 134.29%)",
        "lgd-code-agent-6":
          "linear-gradient(53deg, #3AB9DC -2.17%, #7BDAFA 134.29%)",
        "lgd-code-agent-6":
          "linear-gradient(53deg, #F4B815 -2.17%, #FBD879 134.29%)",
        "fading-white":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)",
      },
      boxShadow: {
        1: "0px 0px 20px 0px rgba(0, 0, 0, 0.01)",
        2: "0px 2.4px 6.4px 0px rgba(0, 0, 0, 0.02), 0px 2.4px 20px 0px rgba(0, 0, 0, 0.05)",
        3: "0px -2px 0px 0px rgba(255, 255, 255, 0.40) inset, 0px 2px 0px 0px #DEDEE0 inset, 0px 16px 32px -4px rgba(24, 24, 25, 0.10), 0px 2px 4px 0px rgba(24, 24, 25, 0.15)",
        4: "0px -32px 30px 0px #FFF inset",
        5: "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.04)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
