import HeaderPage from "../components/HeaderPage/HeaderPage"; // Asegúrate de que la ruta sea correcta
import { useState } from "react";
import { useCopybox } from "../context/CopyboxContext.jsx";
import { Toaster, toast } from "react-hot-toast";

const ClipboardCreator = ({ item, onClose }) => {
  const [type, setType] = useState("text");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const { addObjectToKey, updateObjectInKey, keyExists, getActiveKey, addKey } =
    useCopybox();
  const handleClose = () => {
    onClose();
  };
  useState(() => {
    if (item) {
      setType(item.type);
      setTitle(item.text);
      setValue(item.value);
    }
  }, [item]);
  const handleSave = () => {
    if (!title || !value) {
      toast.error("Por favor, ingrese un título y un valor");
      return;
    }
    const data = {
      type: type,
      text: title,
      value: value,
    };
    let keyActivated = getActiveKey();
    /**
     *  si keyActivated es Todos, no se puede guardar para ello vamos revisar
     *  si existe la carpeta otros, si no existe la creamos y guardamos el campo
     */
    let key =
      item?.key === undefined || item?.key === null ? keyActivated : item?.key;
    // si el objeto item es undefined, entonces estamos creando un nuevo campo
    if (item === undefined || item === null) {
      if (keyActivated === "Todos") {
        if (!keyExists("Otros")) {
          if (!addKey("Otros")) {
            toast.error("Error al agregar el campo");
            return;
          }
          keyActivated = "Otros";
        } else {
          keyActivated = "Otros";
        }
      }
      if (addObjectToKey(key, data)) {
        toast.success("Campo agregado con éxito");
        setTitle("");
        setValue("");
      } else {
        toast.error("Error al agregar el campo");
      }
    } else {
      // si el objeto item no es undefined, entonces estamos editando un campo existente
      if (updateObjectInKey(key, item, data)) {
        toast.success("Campo actualizado con éxito");
        setTitle("");
        setValue("");
      } else {
        toast.error("Error al actualizar el campo");
      }
    }
    // redireccionar a la página anterior
    onClose();
    window.history.back();
  };
  return (
    <div>
      <HeaderPage title="Agregar Campo" onClose={handleClose} />
      <div className="row">
        <label>Tipo</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="text">Texto</option>
        </select>
      </div>
      <div className="row">
        <label>Titulo</label>
        <input
          type="text"
          placeholder="Ingrese el título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="row">
        <label>Valor</label>
        <input
          type="text"
          placeholder="Ingrese el valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="row">
        <button onClick={handleSave}>Guardar</button>
      </div>
      <Toaster position="top-right" /> {/* Renderizar notificaciones */}
    </div>
  );
};
export default ClipboardCreator;
