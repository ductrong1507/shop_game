import React from "react";
import { Link } from "react-router-dom";

import "./GameCard.scss";

export default function GameCard(props) {
  if (props.game.length !== 0) {
    let genres = "";
    if (typeof props.game.genres !== "string") {
      props.game.genres.forEach((item) => {
        genres += `${item.name}, `;
      });
    }
    return (
      <Link to={`../game/${props.game.slug + "_" + props.game.id}`}>
        <div id="game_card">
          <div className="game_card_image">
            <img src={props.game.background_image} />
          </div>
          <h3 className="game_card_title">{props.game.name}</h3>
          <p className="game_card_genres">
            {genres ? genres.trim().slice(0, -1) : props.game.genres}
          </p>
        </div>
      </Link>
    );
  }
}
