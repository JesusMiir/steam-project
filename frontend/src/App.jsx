import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import CartPage from './pages/CartPage';
import LibraryPage from './pages/LibraryPage';
import Navbar from './components/Navbar';
import LoginSuccess from "./pages/LoginSuccess";

function App() {
  /*
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log(payload);
  */
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/login/success" element={<LoginSuccess />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
