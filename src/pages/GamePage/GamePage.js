import React, { useEffect, useState } from "react";
import "./GamePage.scss";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { API_KEY } from "../../utils/API";

import GameDetail from "../../components/GameDetail/GameDetail";

export default function GamePage(props) {
  const [gameDetail, setGameDetail] = useState("");
  const params = useParams();
  const gameId = params.gameId.split("_")[1];

  useEffect(() => {
    callAPIGameDetail();
  }, []);

  const callAPIGameDetail = async () => {
    try {
      let genres = "";
      let platforms = "";
      const gameDetailApi = await Axios({
        method: "GET",
        url: `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`,
      });
      const gameDetailBuyApi = await Axios({
        method: "GET",
        url: `https://api.rawg.io/api/games/${gameId}/stores?key=${API_KEY}`,
      });

      gameDetailApi.data.genres.forEach((item) => {
        genres += `${item.name}, `;
      });
      gameDetailApi.data.platforms.forEach((item) => {
        platforms += `${item.platform.name}, `;
      });
      setGameDetail({
        id: gameDetailApi.data.id,
        name: gameDetailApi.data.name,
        background_image: gameDetailApi.data.background_image,
        description_raw: gameDetailApi.data.description_raw
          ? gameDetailApi.data.description_raw
          : gameDetailApi.data.description,
        genres: genres.trim().slice(0, -1),
        released: gameDetailApi.data.released,
        publishers: gameDetailApi.data.publishers[0]
          ? gameDetailApi.data.publishers[0].name
          : "API no data",
        platforms: platforms ? platforms.trim().slice(0, -1) : "API no data",
        linkBuy: gameDetailBuyApi.data.results[0]
          ? gameDetailBuyApi.data.results[0].url
          : `https://api.rawg.io/api/games/${gameId}/stores?key=${API_KEY}`,
      });
    } catch (error) {
      console.log("GameShop", error);
    }
  };

  return (
    <main id="game_page">
      {gameDetail ? (
        <GameDetail gameDetail={gameDetail} />
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
}
