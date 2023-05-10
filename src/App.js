import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";

import "./App.scss";
import GameShopPage from "./pages/GameShopPage/GameShopPage";
import MyGamesPage from "./pages/MyGamesPage/MyGamesPage";
import MyFavoritesPage from "./pages/MyFavoritesPage/MyFavoritesPage";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return (
    <BrowserRouter>
      <div className="app w-90">
        <NavBar />

        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route
            path="/gameshop"
            element={<GameShopPage today={formattedDate} />}
          />
          <Route
            path="/mygames"
            element={<MyGamesPage today={formattedDate} />}
          />
          <Route path="/favorites" element={<MyFavoritesPage />} />
          <Route path="/game/:gameId" element={<GamePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
