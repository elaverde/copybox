import { useState } from "react";
import Modal from "../components/Modal/Modal";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import FolderItemsEditor from "../components/FolderItemsEditor/FolderItemsEditor";
import AddCopy from "../components/AddCopy/AddCopy";
import { useCopybox } from "../context/CopyboxContext.jsx";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

const FolderCreator = () => {
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
      setError("El nombre de la carpeta no puede estar vacío");
      toast.error("Por favor, ingresa un nombre válido.");
      return;
    }
    if (addKey(trimmedValue)) {
      setInputValue("");
      setRefreshKey((prevKey) => prevKey + 1);
      toast.success("¡Carpeta creada con éxito! 🎉");
      handleCloseModal();
    } else {
      toast.error("Este nombre de carpeta ya existe 😢");
      return;
    }
  };
  const handleDelete = (key) => {
    //toast.success("¡Carpeta eliminada con éxito! 🗑️");
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteKey(key);
        setRefreshKey((prevKey) => prevKey + 1);
        if (getActiveKey() === key) {
          selectKey("Todos");
        }
        toast.success("¡Carpeta eliminada con éxito! 🗑️");
      }
    });
  };
  const handleUpdate = (oldKey, newKey) => {
    if (updateKey(oldKey, newKey)) {
      setRefreshKey((prevKey) => prevKey + 1);
      toast.success("¡Carpeta actualizada con éxito! 🎉");
    } else {
      toast.error("Este nombre de carpeta ya existe 😢");
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
      <HeaderPage title="Carpetas" onClose={handleCloseModal} />
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
          title="Crear Carpeta"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <input
            type="text"
            className="input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Nombre de la carpeta"
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}{" "}
          {/* Muestra el error */}
          <button
            className="button"
            onClick={handleSubmit}
            disabled={inputValue.trim() === ""}
          >
            Crear Carpeta
          </button>
        </Modal>
      )}
    </div>
  );
};
export default FolderCreator;
