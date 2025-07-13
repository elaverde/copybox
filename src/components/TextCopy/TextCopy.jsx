import React, { useState } from "react";
import { FaCopy, FaEllipsisV } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import copySound from "../../assets/copy.mp3";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "./TextCopy.css";

const TextCopy = ({
  title = "Copiar texto",
  valueCopy = "",
  onDelete,
  onUpdate,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  /** 🔹 Alternar visibilidad del menú desplegable */
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  /** 🔹 Copiar texto al portapapeles con sonido y notificación */
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(valueCopy)
      .then(() => {
        new Audio(copySound).play(); // Reproducir sonido
        toast.success(t("copybox.msg-success-copy"));
      })
      .catch((err) => {
        console.error("Error al copiar texto: ", err);
        toast.error(t("copybox.msg-error-copy"));
      });
  };

  /** 🔹 Editar el texto */
  const handleEdit = () => {
    onUpdate();
    setShowDropdown(false);
  };

  /** 🔹 Confirmar eliminación */
  const handleDelete = () => {
    Swal.fire({
      title: t("alert-delete.title"),
      text: t("alert-delete.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("alert-delete.confirmButtonText"),
      cancelButtonText: t("alert-delete.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });

    setShowDropdown(false);
  };

  return (
    <div className="text-copy-container secondary-background">
      {/* 🔹 Título con menú de opciones */}
      <h2 className="text-copy-title">
        {title}
        <div className="dropdown-container">
          <button
            onClick={toggleDropdown}
            className="dropdown-button"
            aria-label="Opciones"
          >
            <FaEllipsisV />
          </button>

          {/* 🔹 Menú desplegable */}
          {showDropdown && (
            <div className="dropdown-menu" role="menu">
              <button
                onClick={handleEdit}
                className="dropdown-item"
                role="menuitem"
              >
                {t("copybox.option-edit")}
              </button>
              <button
                onClick={handleDelete}
                className="dropdown-item"
                role="menuitem"
              >
                {t("copybox.option-delete")}
              </button>
            </div>
          )}
        </div>
      </h2>
      {/* 🔹 Input y botón para copiar */}
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
          aria-label="Copiar"
        >
          <FaCopy />
        </button>
      </div>
      <Toaster position="top-right" /> {/* 🔹 Renderizar notificaciones */}
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
