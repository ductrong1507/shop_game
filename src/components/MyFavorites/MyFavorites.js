import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyFavorites.scss";
import GameCard from "../GameCard/GameCard";

export default function MyFavorites(props) {
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
    <section id="my_favorites">
      <h1>My Favourites</h1>
      <div className="my_favorites_container">
        {/* <GameCard game={props.mygames[1]} /> */}
        {renderMyFavoritesList()}
      </div>

      <Link to="/favorites">
        <button className="btn">Go to favorites</button>
      </Link>
    </section>
  );
}
