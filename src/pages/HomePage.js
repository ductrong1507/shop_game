import React from "react";

import "./HomePage.scss";
import GameShop from "../components/GameShop/GameShop";
import MyGames from "../components/MyGames/MyGames";
import MyFavorites from "../components/MyFavorites/MyFavorites";

export default function HomePage(props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return (
    <main id="home_page">
      <GameShop today={formattedDate} />
      <div className="home_page_container">
        <MyGames today={formattedDate} />
        <MyFavorites />
      </div>
    </main>
  );
}
