import type { Config } from "tailwindcss";
import tailwindcssanimated from "tailwindcss-animated";
import typography from "@tailwindcss/typography";


const config: Config = {
  plugins: [
    tailwindcssanimated,
    typography,
  ],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard-Regular',
          'Pretendard-Bold',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Malgun Gothic',
          '맑은 고딕',
          'Nanum Gothic',
          '나눔고딕',
          '돋움',
          'Dotum',
          'sans-serif',
        ],
      },
      colors: {
        primary: "#00c471",
        secondary: "#9333EA",
        customGray: "#B0BEC5",
      },
    },
  },
};

export default config;
