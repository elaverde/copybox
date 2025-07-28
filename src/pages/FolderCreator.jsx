import { useState } from "react";
import Modal from "../components/Modal/Modal";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import FolderItemsEditor from "../components/FolderItemsEditor/FolderItemsEditor";
import AddCopy from "../components/AddCopy/AddCopy";
import { useCopybox } from "../context/CopyboxContext.jsx";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
const FolderCreator = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(""); // Nuevo estado para errores
  const { data, addKey, deleteKey, updateKey, getActiveKey, selectKey } =
    useCopybox();
  const [refreshKey, setRefreshKey] = useState(0);
  const handleOpenModal = () => {
    setShowModal(true);
    setIsModalOpen(true);
  };
  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      // setError("El nombre de la carpeta no puede estar vacío");
      toast.error(t("folder.validation-empty"));
      return;
    }
    if (addKey(trimmedValue)) {
      setInputValue("");
      setRefreshKey((prevKey) => prevKey + 1);
      toast.success(t("folder.success-create"));
      handleCloseModal();
    } else {
      toast.error(t("folder.validation-exists"));
      return;
    }
  };
  const handleDelete = (key) => {
    Swal.fire({
      title: t("alert-delete.title"),
      text: t("alert-delete.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("alert-delete.confirmButtonText"),
      cancelButtonText: t("alert-delete.cancelButtonText"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteKey(key);
        setRefreshKey((prevKey) => prevKey + 1);
        if (getActiveKey() === key) {
          selectKey("Todos");
        }
        toast.success(t("folder.success-delete"));
      }
    });
  };
  const handleUpdate = (oldKey, newKey) => {
    if (updateKey(oldKey, newKey)) {
      setRefreshKey((prevKey) => prevKey + 1);
      toast.success(t("folder.success-update"));
    } else {
      toast.error(t("folder.validation-exists"));
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setShowModal(false), 300);
    setInputValue(""); // Limpiar input al cerrar
    setError(""); // Resetear error al cerrar
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim().length > 0) {
      setError(""); // Limpiar el error cuando se empieza a escribir
    }
  };
  return (
    <div>
      <HeaderPage title={t("folder.title")} onClose={handleCloseModal} />
      <FolderItemsEditor
        key={refreshKey}
        items={data}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <AddCopy onClick={handleOpenModal} />
      <Toaster position="top-right" /> {/* Renderizar notificaciones */}
      {showModal && (
        <Modal
          title={t("folder.modal-title")}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <input
            type="text"
            className="modal-input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t("folder.input-title-placeholder")}
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}{" "}
          {/* Muestra el error */}
          <button
            className="modal-button"
            onClick={handleSubmit}
            disabled={inputValue.trim() === ""}
          >
            {t("folder.button-add")}
          </button>
        </Modal>
      )}
    </div>
  );
};
export default FolderCreator;
