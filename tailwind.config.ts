import type { Config } from "tailwindcss";
import tailwindcssanimated from "tailwindcss-animated";
import typography from "@tailwindcss/typography";


const config: Config = {
  plugins: [
    tailwindcssanimated,
    typography,
  ],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // 꼭 이 부분 포함!
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00c471",
        secondary: "#9333EA",
        customGray: "#B0BEC5",
      },
    },
  },
};

export default config;
