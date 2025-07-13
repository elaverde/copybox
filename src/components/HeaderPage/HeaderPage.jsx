import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./HeaderPage.css";

const HeaderPage = ({ title, onClose }) => {
  return (
    <div className="header_page">
      <h1 className="header_page-left">
        <img src={logo} width={40} alt="Logo" />
        {title}
      </h1>
      <div className="header_page-right close-button" onClick={onClose}>
        <Link to="/">
          <FaTimes size={24} />
        </Link>
      </div>
    </div>
  );
};

HeaderPage.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HeaderPage;
