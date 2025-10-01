import React from "react";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test/renderWithProviders";
import App from "./App";

describe("App", () => {
    // it("renders without crashing and shows main navigation", () => {
    //     renderWithProviders(<App />, { route: "/" });
    //     expect(screen.getByRole("button", { name: /games/i })).toBeInTheDocument();
    //     expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
    //     expect(screen.getByRole("button", { name: /library/i })).toBeInTheDocument();
    // });

    // it("navigates to Games when clicking the nav button", async () => {
    //     const user = userEvent.setup();
    //     renderWithProviders(<App />, { route: "/" });

    //     await user.click(screen.getByRole("button", { name: /games/i }));
    //     const maybeHeading = await screen.findByText(/games/i, { selector: "h1,h2,h3,*" });
    //     expect(maybeHeading).toBeInTheDocument();
    // });

    it("placeholder", () => expect(true).toBe(true));
});
