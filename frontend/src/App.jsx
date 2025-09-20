import { Routes, Route } from "react-router-dom";
import GamesPage from "./pages/GamesPage";
import CartPage from "./pages/CartPage";
import LibraryPage from "./pages/LibraryPage";
import Navbar from "./components/Navbar";
import LoginSuccess from "./pages/LoginSuccess";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/success" element={<LoginSuccess />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute minRole="user">
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library"
          element={
            <ProtectedRoute minRole="user">
              <LibraryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/games"
          element={
            <ProtectedRoute minRole="admin">
              <div>Admin Games Page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
