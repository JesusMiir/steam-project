import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/games", () =>
    HttpResponse.json([
      { id: 1, title: "Portal 2", price: 9.99, genre: "Puzzle" },
      { id: 2, title: "Hades", price: 19.99, genre: "Roguelike" },
    ])
  ),
];

export const server = setupServer(...handlers);
