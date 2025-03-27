import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaFolder, FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import logo from "../../assets/logo.png";
import "./HeaderBrowser.css";

const Header = ({ onSearch, searchTerm }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header primary-background">
      <Link to="/about" className="header-left">
        <img src={logo} width={40} alt="Logo" />
        <h1>CopyBox</h1>
      </Link>
      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          value={searchQuery} // Ahora `searchQuery` siempre reflejará `searchTerm`
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          aria-label="Buscar"
        />
        <button
          className="search-button"
          onClick={handleSearch}
          aria-label="Buscar"
        >
          <FaSearch size={24} />
        </button>
      </div>
      <div className="header-right">
        <Link to="/folder-creator">
          <FaFolder size={24} />
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string, // Agrega `searchTerm` a las PropTypes
};

export default Header;
