// src/test/setup.ts
import { afterEach, beforeAll, afterAll, expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers"; // 👈 así
import "whatwg-fetch";
import { cleanup } from "@testing-library/react";
import { server } from "./testServer";

// registra los matchers (toBeInTheDocument, etc.)
expect.extend(matchers as any);

// mock global de Auth0 para todos los tests (ajusta si quieres estados autenticados)
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    user: null,
  }),
}));

// MSW
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
