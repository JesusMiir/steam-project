// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"], // <- JS instead of TS
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
