import React, { useState } from "react";
import "./MyFavoritesPage.scss";
import GameCard from "../../components/GameCard/GameCard";

export default function MyFavoritesPage() {
  const [favoriteList, setFavoriteList] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const renderMyFavoritesList = () => {
    return favoriteList.map((item, index) => {
      if (item.isFavorite) {
        return <GameCard game={item} key={index} />;
      }
    });
  };
  return (
    <main id="my_favorites_page">
      <h1>My Favorites</h1>
      <section className="my_favorites_page_container">
        {renderMyFavoritesList()}
      </section>
    </main>
  );
}
