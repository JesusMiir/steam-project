import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamesPage from './pages/GamesPage';
import CartPage from './pages/CartPage';
import LibraryPage from './pages/LibraryPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/games" element={<GamesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
