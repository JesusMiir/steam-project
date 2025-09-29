import { vi } from "vitest";
vi.mock("@/auth/AuthContext", async () => {
  const m = await import("./authMock.js");
  return m.authMockFactory();
});
