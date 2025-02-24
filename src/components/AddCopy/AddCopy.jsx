import { Link } from "react-router-dom";
import "./AddCopy.css";
import { FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";

const AddCopy = ({ link, onClick }) => {
  return (
    <button
      className="add-copy-button accent-background"
      onClick={onClick ? onClick : null}
    >
      {link ? (
        <Link to={link}>
          <FaPlus size={24} />
        </Link>
      ) : (
        <FaPlus size={24} />
      )}
    </button>
  );
};
AddCopy.propTypes = {
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default AddCopy;
