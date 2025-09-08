import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"], // 👈 aquí va tu archivo setup
    css: true,
    globals: true,
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      exclude: [
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/**/__mocks__/**",
        "src/**/types/**",
      ],
    },
  },
});
