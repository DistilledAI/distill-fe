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
          50: "#F6F5F0",
          100: "#E9E3D8",
          500: "#A2845E",
          600: "#83664B",
        },
        green: {
          10: "#34C759",
          500: "#2CB34E",
        },
        orange: {
          600: "#F78500",
        },
        primary: "#363636",
        code: {
          agent: {
            1: "#E7833B",
            2: "#635F80",
            3: "#667F2C",
            4: "#C0494B",
            5: "#7E57A0",
            6: "#4C8898",
            7: "#7E7150",
          },
        },
      },
      backgroundImage: {
        "lgd-code-agent-1":
          "linear-gradient(53deg, #E7833B -2.17%, #F6903D 134.29%)",
        "lgd-code-agent-2":
          "linear-gradient(53deg, #635F80 -2.17%, #7E7AB8 134.29%)",
        "lgd-code-agent-3":
          "linear-gradient(53deg, #667F2C -2.17%, #92A373 134.29%)",
        "lgd-code-agent-4":
          "linear-gradient(53deg, #C0494B -2.17%, #C54B4D 134.29%)",
        "lgd-code-agent-5":
          "linear-gradient(53deg, #7E57A0 -2.17%, #9A7CB4 134.29%)",
        "lgd-code-agent-6":
          "linear-gradient(53deg, #4C8898 -2.17%, #5B99AD 134.29%)",
        "lgd-code-agent-7":
          "linear-gradient(53deg, #7E7150 -2.17%, #8D7C4D 134.29%)",
        "lgd-code-hot-ramp": "linear-gradient(46deg, #FF075A 0%, #FF9035 100%)",
        "fading-orange":
          "linear-gradient(65deg, #F5DCE2 16.01%, #F4E7DC 83.99%)",
        "fading-white":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)",
        "lgd-muted-beige":
          "linear-gradient(90deg, rgba(181, 141, 90, 0.10) 0%, rgba(162, 132, 94, 0.00) 100%)",
        "lgd-muted-beige-2":
          "linear-gradient(90deg, rgba(135, 135, 135, 0.10) 0%, rgba(128, 128, 128, 0.00) 100%)",
      },
      boxShadow: {
        1: "0px 0px 20px 0px rgba(0, 0, 0, 0.01)",
        2: "0px 2.4px 6.4px 0px rgba(0, 0, 0, 0.02), 0px 2.4px 20px 0px rgba(0, 0, 0, 0.05)",
        3: "0px -2px 0px 0px rgba(255, 255, 255, 0.40) inset, 0px 2px 0px 0px #DEDEE0 inset, 0px 16px 32px -4px rgba(24, 24, 25, 0.10), 0px 2px 4px 0px rgba(24, 24, 25, 0.15)",
        4: "0px -32px 30px 0px #FFF inset",
        5: "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.04)",
        6: "0px 16px 32px -4px rgba(24, 24, 25, 0.10), 0px 2px 4px 0px rgba(24, 24, 25, 0.08)",
        7: "0px -16px 32px -4px rgba(24, 24, 25, 0.05), 0px -2px 4px 0px rgba(24, 24, 25, 0.04)",
        8: "0px 16px 32px -4px rgba(24, 24, 25, 0.05), 0px 2px 4px 0px rgba(24, 24, 25, 0.08)",
        9: "0px 16px 40px 0px rgba(24, 24, 25, 0.08), 0px 2px 4px 0px rgba(24, 24, 25, 0.05)",
        10: "0px 16px 43px -4px rgba(24, 24, 25, 0.10)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
