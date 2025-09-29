// src/components/__tests__/GamesGrid.test.jsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/renderWithProviders";
import GamesGrid from "../GamesGrid";

describe("GamesGrid", () => {
    it("renders provided games", () => {
        const games = [
            { id: 1, title: "Portal 2", price: 9.99, genre: "Puzzle" },
            { id: 2, title: "Hades", price: 19.99, genre: "Roguelike" },
        ];
        renderWithProviders(<GamesGrid games={games} />);
        expect(screen.getByText(/portal 2/i)).toBeInTheDocument();
        expect(screen.getByText(/hades/i)).toBeInTheDocument();
    });

    it("renders empty state if no games", () => {
        renderWithProviders(<GamesGrid games={[]} />);
        // depende de cómo manejes el caso vacío en tu componente
        expect(screen.getByText(/no games/i)).toBeInTheDocument();
    });
});
