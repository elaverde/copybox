import { Link } from "react-router-dom";
import React from "react";
import { FaFolder } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./HeaderBrowser.css";

const Header = () => {
  return (
    <header className="header primary-background">
      <Link to="/about" className="header-left">
        <img src={logo} width={40} alt="Logo" />
        <h1>CopyBox</h1>
      </Link>
      <div className="header-right">
        <Link to="/folder-creator">
          <FaFolder size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
