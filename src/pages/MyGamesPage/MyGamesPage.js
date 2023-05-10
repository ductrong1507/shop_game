import React, { useEffect, useState } from "react";
import "./MyGamesPage.scss";
import GameCard from "../../components/GameCard/GameCard";
import Axios from "axios";
import { API_KEY, GENRES_GAME, prevYear } from "../../utils/API";

export default function MyGamesPage(props) {
  const [myGame, setMyGame] = useState([]);

  useEffect(() => {
    callApiMyGame();
  }, []);

  const callApiMyGame = async () => {
    try {
      const myGameListAPI = await Axios({
        method: "GET",
        url: `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&genres=${GENRES_GAME}&page_size=20&dates=${prevYear}-01-01,${props.today}`,
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
    <main id="my_game_page">
      <h1>My Game</h1>
      {myGame.length ? (
        <section className="my_game_page_container">
          {renderMyGameList()}
        </section>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
}
