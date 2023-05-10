import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./GameDetail.scss";

export default function GameDetail(props) {
  const [favoriteData, setFavoriteData] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const index = favoriteData.findIndex(
    (game) => game.id === props.gameDetail.id
  );

  // handle click add button
  const handelClickFavorite = () => {
    let favoriteState = JSON.parse(localStorage.getItem("favorites")) || [];

    // tìm xem trong list favorite có phim chưa
    const index = favoriteData.findIndex(
      (game) => game.id === props.gameDetail.id
    );

    if (index === -1) {
      favoriteState = [
        ...favoriteState,
        { ...props.gameDetail, isFavorite: true },
      ];

      setFavoriteData((prevSta) => [
        ...prevSta,
        { ...props.gameDetail, isFavorite: true },
      ]);
    } else {
      favoriteState[index].isFavorite = !favoriteState[index].isFavorite;
      setFavoriteData(favoriteState);
    }

    localStorage.setItem("favorites", JSON.stringify(favoriteState));
  };

  return (
    <section id="game_detail">
      <div className="game_detail_image">
        <img src={props.gameDetail.background_image} />
      </div>

      <div className="game_detail_content">
        <h1 className="game_detail_title">{props.gameDetail.name}</h1>
        <p className="game_detail_description">
          {props.gameDetail.description_raw}
        </p>
        <p className="game_detail_genre">Genres: {props.gameDetail.genres}</p>
        <p className="game_detail_released">
          Released: {props.gameDetail.released}
        </p>
        <p className="game_detail_publisher">
          Publisher: {props.gameDetail.publishers}
        </p>
        <p className="game_detail_platforms">
          Platforms: {props.gameDetail.platforms}
        </p>
        <div className="btn_func">
          <Link to={props.gameDetail.linkBuy} target="_blank">
            <button className="btn">BUY</button>
          </Link>
          <button onClick={handelClickFavorite} className="btn favorite">
            {index !== -1 && favoriteData[index].isFavorite
              ? "Remove favorites"
              : "Add to favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}
