import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyGames.scss";
import GameCard from "../GameCard/GameCard";
import Axios from "axios";
import { API_KEY, GENRES_GAME, prevYear } from "../../utils/API";

export default function MyGames(props) {
  const [myGame, setMyGame] = useState([]);

  useEffect(() => {
    callApiMyGame();
  }, []);

  const callApiMyGame = async () => {
    try {
      const myGameListAPI = await Axios({
        method: "GET",
        url: `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&genres=${GENRES_GAME}&page_size=4&dates=${prevYear}-01-01,${props.today}`,
      });
      setMyGame(myGameListAPI.data.results);
    } catch (error) {
      console.log("GameShop", error);
    }
  };

  const renderMyGameList = () => {
    return myGame.map((item, index) => {
      return <GameCard game={item} key={index} />;
    });
  };

  return (
    <section id="my_game">
      <h1>My Game-Library</h1>
      <div className="my_game_container">{renderMyGameList()}</div>
      <Link to="/mygames">
        <button className="btn">Go to library</button>
      </Link>
    </section>
  );
}
