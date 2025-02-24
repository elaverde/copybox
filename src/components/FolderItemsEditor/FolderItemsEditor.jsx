import { useState } from "react";
import PropTypes from "prop-types";
import "./FolderItemsEditor.css";
import { FaTrash } from "react-icons/fa";

const FolderItemsEditor = ({ items, onDelete, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [oldKey, setOldKey] = useState("");

  const handleDoubleClick = (index, value) => {
    setEditingIndex(index);
    setEditingValue(value);
    setOldKey(value); // Actualiza oldKey con el valor actual
  };

  const handleChange = (e) => {
    setEditingValue(e.target.value);
  };

  const handleBlur = () => {
    setEditingIndex(null);
    if (onUpdate) {
      onUpdate(oldKey, editingValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          onDoubleClick={() =>
            handleDoubleClick(index, item.key ? item.key : JSON.stringify(item))
          }
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {editingIndex === index ? (
            <input
              type="text"
              value={editingValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : item.key ? (
            item.key
          ) : (
            JSON.stringify(item)
          )}
          <FaTrash onClick={() => onDelete(item.key)} />
        </li>
      ))}
    </ul>
  );
};
FolderItemsEditor.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};

export default FolderItemsEditor;
