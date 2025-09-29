import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: true,
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      all: true,
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/main.jsx",
        "src/**/__mocks__/**",
        "src/**/types/**",
        "src/test/**",
      ],
    },
  },
});
