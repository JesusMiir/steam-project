import { vi } from "vitest";

let __authState = {
  user: null,
  role: "guest",
  loading: false,
  logoutLocal: vi.fn(),
};

export const setAuthState = (patch) => {
  __authState = { ...__authState, ...patch };
};

export const resetAuthState = () => {
  __authState = {
    user: null,
    role: "guest",
    loading: false,
    logoutLocal: vi.fn(),
  };
};

export const authMockFactory = () => ({
  useAuth: () => __authState,
});
