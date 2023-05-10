import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./GameShopPage.scss";
import { API_KEY, prevYear } from "../../utils/API";
import { Link } from "react-router-dom";

export default function GameShopPage(props) {
  const [gameShopList, setGameShopList] = useState([]);

  // call API list game và API link buy
  const callApiGameList = async () => {
    try {
      const gameListAPI = await Axios({
        method: "GET",
        url: `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&page_size=10&dates=${prevYear}-01-01,${props.today}`,
      });
      gameListAPI.data.results.forEach(async (item) => {
        const link = await Axios({
          method: "GET",
          url: `https://api.rawg.io/api/games/${item.id}/stores?key=${API_KEY}`,
        });
        setGameShopList((prevState) => [
          ...prevState,
          {
            id: item.id,
            slug: item.slug,
            name: item.name,
            released: item.released,
            background_image: item.background_image,
            genres: item.genres,
            url: link.data.results[0]
              ? link.data.results[0].url
              : `https://api.rawg.io/api/games/${item.id}/stores?key=${API_KEY}`,
          },
        ]);
      });
    } catch (error) {
      console.log("GameShop", error);
    }
  };

  useEffect(() => {
    callApiGameList();
  }, []);

  const renderGameShopList = () => {
    if (gameShopList.length !== 0) {
      return gameShopList.map((game, index) => {
        let genres = "";
        game.genres.forEach((item) => {
          genres += `${item.name}, `;
        });
        return (
          <div key={game.id} className="game_shop_page_content_item">
            <div className="game_shop_page_content_item_image">
              <img src={game.background_image} />
            </div>

            <div className="game_shop_page_content_item_main">
              <h3>{game.name}</h3>
              <p>{genres.trim().slice(0, -1)}</p>
              <Link to={game.url} target="_blank">
                <button className="btn">BUY</button>
              </Link>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <main id="game_shop_page">
      <section className="game_shop_page_heading">
        <h1>GameShop</h1>
      </section>
      {gameShopList.length ? (
        <section className="game_shop_page_content">
          {renderGameShopList()}
        </section>
      ) : (
        <h1>Loading....</h1>
      )}
    </main>
  );
}
