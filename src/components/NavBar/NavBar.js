import React from "react";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <header id="header" className="w-90">
      <div className="header_logo">
        <a href="../">MACs Gamehub</a>
      </div>
      <nav className="header_nav">
        <ul>
          <li>
            <a href="../gameshop">Shop</a>
          </li>
          <li>
            <a href="../mygames">My Games</a>
          </li>
          <li>
            <a href="../favorites">Favorites</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
