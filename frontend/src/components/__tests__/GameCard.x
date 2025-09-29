// src/components/__tests__/GameCard.test.jsx
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import GameCard from "../GameCard";
import { vi } from "vitest";

const sample = { id: 1, title: "Elden Ring", price: 59.99, genre: "RPG" };

describe("GameCard", () => {
    it("shows title and price", () => {
        renderWithProviders(<GameCard game={sample} />);
        expect(screen.getByText(/Elden Ring/i)).toBeInTheDocument();
        expect(screen.getByText(/59\.99/)).toBeInTheDocument();
    });

    it("calls onAddToCart if provided", async () => {
        const user = userEvent.setup();
        const onAdd = vi.fn();
        renderWithProviders(<GameCard game={sample} onAddToCart={onAdd} />);
        await user.click(screen.getByRole("button", { name: /add to cart/i }));
        expect(onAdd).toHaveBeenCalledWith(sample);
    });
});
