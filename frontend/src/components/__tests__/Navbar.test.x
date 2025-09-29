// // src/components/__tests__/Navbar.test.jsx
// import { vi, beforeEach, describe, test, expect } from "vitest";
// import React from "react";
// import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "../Navbar.jsx";
// import { renderWithProviders } from "../../test/renderWithProviders.jsx";
// import { AuthContext } from "../../auth/AuthContext"; // <- ahora sí existe

// let baseAuth;

// beforeEach(() => {
//   baseAuth = {
//     user: null,
//     role: "guest",
//     loading: false,
//     logoutLocal: vi.fn(),
//   };
// });

// function renderWithAuth(ui, value, initialEntries = ["/"]) {
//   return renderWithProviders(
//     <AuthContext.Provider value={value}>{ui}</AuthContext.Provider>,
//     initialEntries
//   );
// }

// describe("Navbar", () => {
//   test("renders core links", () => {
//     const value = { ...baseAuth, user: { id: 1, name: "Jesús" }, role: "user" };
//     renderWithAuth(<Navbar />, value);

//     // Si tus botones son <Button component={Link} .../> el role accesible suele ser "link"
//     expect(screen.getByRole("link", { name: /games/i })).toBeInTheDocument();
//     expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
//     expect(screen.getByRole("link", { name: /library/i })).toBeInTheDocument();
//   });

//   test("allows clicking a link (cart)", async () => {
//     const user = userEvent.setup();
//     const value = { ...baseAuth, user: { id: 1 }, role: "user" };

//     renderWithAuth(
//       <>
//         <Navbar />
//         <Routes>
//           <Route path="/cart" element={<div>Cart Page</div>} />
//         </Routes>
//       </>,
//       value
//     );

//     await user.click(screen.getByRole("link", { name: /cart/i }));
//     expect(screen.getByText(/cart page/i)).toBeInTheDocument();
//   });

//   test("navigates to /games on click", async () => {
//     const user = userEvent.setup();
//     const value = { ...baseAuth, user: { id: 1 }, role: "user" };

//     renderWithAuth(
//       <>
//         <Navbar />
//         <Routes>
//           <Route path="/games" element={<div>Games Page</div>} />
//         </Routes>
//       </>,
//       value
//     );

//     await user.click(screen.getByRole("link", { name: /games/i }));
//     expect(screen.getByText(/games page/i)).toBeInTheDocument();
//   });
// });


