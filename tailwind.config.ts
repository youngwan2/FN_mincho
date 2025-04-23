import tailwindcssanimated from "tailwindcss-animated";
import type { Config } from "tailwindcss";
const config:Config = {
    
  plugins: [
    tailwindcssanimated
  ],
    theme: {
      extend: {
        colors: {
          primary: "#05D182",
          secondary: "#9333EA",
          customGray: "#B0BEC5", // 새로운 색상 추가
        },
      },
    },

  };
  
  export default config;