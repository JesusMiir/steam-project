// src/components/__tests__/Navbar.test.jsx
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProvider.js";
import Navbar from "../Navbar.jsx"; // adjust path/name

describe("Navbar", () => {
  it("renders core links", () => {
    renderWithProviders(<Navbar />);
    // Adjust these to your real link texts
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /store|games/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  it("allows clicking a link", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />, ["/"]);
    await user.click(screen.getByRole("link", { name: /cart/i }));
    // In a pure component test we can assert the link exists or an active class if your component sets one.
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });
});
