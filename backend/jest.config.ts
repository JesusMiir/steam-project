// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.spec.ts"],
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  moduleFileExtensions: ["ts", "js", "json"],
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.(t|j)s",
    "!src/main.ts",
    "!src/**/dto/**",
    "!src/**/config/**",
  ],
  coverageDirectory: "coverage",
  // 👇 clave para que funcione import 'src/...'
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
