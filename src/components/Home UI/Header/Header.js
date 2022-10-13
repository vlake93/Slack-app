import React from "react";
import "./Header.scss";

function Header() {
  return (
    <div className="home-header">
      <nav className="home-nav">
        <ul className="home-nav-left">
          <img />
          <p>Product</p>
          <p>Solutions</p>
          <p>Enterprise</p>
          <p>Resources</p>
          <p>Pricing</p>
        </ul>
        <ul className="home-nav-right">
          <img />
          <p></p>
          <button>TALK TO SALES</button>
          <button>TRY FOR FREE</button>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
