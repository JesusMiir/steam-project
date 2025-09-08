// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    user: null,
  }),
}));

describe("<Navbar />", () => {
  test("muestra título y enlaces clave", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // heading "Steam Clone"
    expect(
      screen.getByRole("heading", { name: /steam clone/i })
    ).toBeInTheDocument();

    // enlaces visibles
    expect(screen.getByRole("link", { name: /games/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /library/i })).toBeInTheDocument();

    // botón de login
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
