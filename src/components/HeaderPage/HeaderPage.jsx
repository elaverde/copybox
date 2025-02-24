import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaTimes } from 'react-icons/fa';

import './HeaderPage.css';


const HeaderPage = ({ title, onClose }) => {
    return (
        <div className="header">
            <h1 className="header-left">{title}</h1>
            <div className="header-right close-button" onClick={onClose}>
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