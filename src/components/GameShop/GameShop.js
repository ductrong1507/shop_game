import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { API_KEY, prevYear } from "../../utils/API";
import "./GameShop.scss";

export default function GameShop(props) {
  const [linkBuy, setLinkBuy] = useState([]);

  // call API list game và API link buy
  const callApiGameList = async () => {
    try {
      const gameListAPI = await Axios({
        method: "GET",
        url: `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-released&page_size=3&dates=${prevYear}-01-01,${props.today}`,
      });
      gameListAPI.data.results.forEach(async (item) => {
        const link = await Axios({
          method: "GET",
          url: `https://api.rawg.io/api/games/${item.id}/stores?key=${API_KEY}`,
        });
        setLinkBuy((prevState) => [
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

  const renderGameList = () => {
    if (linkBuy.length !== 0 && linkBuy.length === 3) {
      return linkBuy.map((item, index) => {
        let genres = "";
        item.genres.forEach((item) => {
          genres += `${item.name}, `;
        });

        return (
          <div key={item.id} className="game_shop_content_item">
            <div className="game_shop_content_item_image">
              <img src={item.background_image} />
            </div>

            <div className="game_shop_content_item_main">
              <h3>{item.name}</h3>
              <p>{genres.trim().slice(0, -1)}</p>

              <Link to={item.url} target="_blank">
                <button className="btn">BUY</button>
              </Link>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <section id="game_shop">
      <div className="game_shop_heading">
        <h1>GameShop</h1>
        <Link to="/gameshop">
          <button className="btn">Visit shop</button>
        </Link>
      </div>

      <div className="game_shop_content">{renderGameList()}</div>
    </section>
  );
}
