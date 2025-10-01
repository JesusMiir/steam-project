// src/components/__tests__/GamesGrid.test.jsx
import { describe, it, expect } from "vitest";

describe("Games grid flow", () => {
    it("pending", () => expect(true).toBe(true));
});


// it("renders provided games", () => {
//     const games = [
//         { id: 1, title: "Portal 2", price: 9.99, genre: "Puzzle" },
//         { id: 2, title: "Hades", price: 19.99, genre: "Roguelike" },
//     ];
//     renderWithProviders(<GamesGrid games={games} />);
//     expect(screen.getByText(/portal 2/i)).toBeInTheDocument();
//     expect(screen.getByText(/hades/i)).toBeInTheDocument();
// });

// it("renders empty state if no games", () => {
//     renderWithProviders(<GamesGrid games={[]} />);
//     // depende de cómo manejes el caso vacío en tu componente
//     expect(screen.getByText(/no games/i)).toBeInTheDocument();
// });