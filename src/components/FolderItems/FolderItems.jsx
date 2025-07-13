import { useRef } from "react";
import PropTypes from "prop-types";
import "./FolderItems.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { t } from "i18next";
const FolderItems = ({ menuItems, onGetActive, onSelectActive }) => {
  const listRef = useRef(null);

  const scrollLeft = () => {
    listRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    listRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="folder-container">
      <button onClick={scrollLeft} className="scroll-button">
        <FaArrowLeft />
      </button>
      <ul className="folder-list" ref={listRef}>
        <li
          className={onGetActive("Todos") ? "active" : ""}
          onClick={() => {
            onSelectActive("Todos");
          }}
        >
          {t("category-all")}
        </li>
        {menuItems
          .filter((item) => item.key !== "Otros")
          .concat(menuItems.filter((item) => item.key === "Otros"))
          .map((item, index) => (
            <li
              className={onGetActive(item.key) ? "active" : ""}
              onClick={() => {
                onSelectActive(item.key);
              }}
              key={index}
            >
              {item.key}
            </li>
          ))}
      </ul>
      <button onClick={scrollRight} className="scroll-button">
        <FaArrowRight />
      </button>
    </div>
  );
};
FolderItems.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  onGetActive: PropTypes.func.isRequired,
  onSelectActive: PropTypes.func.isRequired,
};

export default FolderItems;
