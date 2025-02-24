import React, { useState } from "react";
import { FaCopy, FaEllipsisV } from "react-icons/fa"; // Importar los íconos necesarios
import Swal from "sweetalert2";
import "./TextCopy.css";
import PropTypes from "prop-types";

const TextCopy = ({
  title = "Copiar texto",
  valueCopy = "",
  onDelete,
  onUpdate,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(valueCopy)
      .then(() => {
        alert("Texto copiado al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar texto: ", err);
      });
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleEdit = () => {
    console.log("Level 1 Editando...");
    onUpdate();
    setShowDropdown(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
    setShowDropdown(false);
  };

  return (
    <div className="text-copy-container secondary-background">
      <h2 className="text-copy-title">
        {title}
        <div className="dropdown-container">
          <button onClick={toggleDropdown} className="dropdown-button">
            <FaEllipsisV />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleEdit} className="dropdown-item">
                Editar
              </button>
              <button onClick={handleDelete} className="dropdown-item">
                Eliminar
              </button>
            </div>
          )}
        </div>
      </h2>

      <div className="text-copy-row">
        <input
          type="text"
          disabled
          value={valueCopy}
          className="text-copy-input"
        />
        <button
          onClick={copyToClipboard}
          className="text-copy-button accent-background"
        >
          <FaCopy />
        </button>
      </div>
    </div>
  );
};
TextCopy.propTypes = {
  title: PropTypes.string,
  valueCopy: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TextCopy;
