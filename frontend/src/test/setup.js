import "@testing-library/jest-dom/vitest";
import "whatwg-fetch";
import { afterEach, beforeAll, afterAll, expect, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "whatwg-fetch";
import { cleanup } from "@testing-library/react";
import { server } from "./testServer";

expect.extend(matchers);

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    user: null,
  }),
}));

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
