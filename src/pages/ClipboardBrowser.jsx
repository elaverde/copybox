import React, { useState, useEffect, useCallback } from "react";
import TextCopy from "../components/TextCopy/TextCopy";
import HeaderBrowser from "../components/HeaderBrowser/HeaderBrowser";
import Folder from "../components/FolderItems/FolderItems";
import AddCopy from "../components/AddCopy/AddCopy";
import { useCopybox } from "../context/CopyboxContext.jsx";
import PropTypes from "prop-types";

const ClipboardBrowser = ({ onEditItem }) => {
  const {
    data,
    isActiveKey,
    getActiveKey,
    selectKey,
    deleteObjectFromKey,
    listObjectsSearch,
  } = useCopybox();

  const [arrCopyText, setArrCopyText] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const indexKey = getActiveKey();

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleDelete = useCallback(
    (key, index) => {
      deleteObjectFromKey(key, index);
      setArrCopyText((prev) => prev.filter((_, i) => i !== index));
    },
    [deleteObjectFromKey]
  );

  useEffect(() => {
    if (searchTerm) return; // Si hay búsqueda activa, no actualizar aquí
    const objects =
      indexKey === "Todos"
        ? data.flatMap((item) => item.objects)
        : data.find((item) => item.key === indexKey)?.objects || [];
    setArrCopyText(objects);
    if (indexKey !== "Todos") {
      setSearchTerm(""); // Limpia la búsqueda si cambia a una carpeta específica
    }
  }, [indexKey]);

  useEffect(() => {
    if (!searchTerm) return;
    setArrCopyText(listObjectsSearch(searchTerm));
    if (indexKey !== "Todos") selectKey("Todos");
  }, [searchTerm]);

  const handleSelectFolder = useCallback(
    (key) => {
      selectKey(key);
      setSearchTerm("");
    },
    [selectKey, setSearchTerm]
  );

  // función para detectar el scroll
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    // detectamos el inicio del scroll
    if (scrollTop === 0) {
      setIsScrolling(false);
    }
    else
    {
      setIsScrolling(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="browser">
      <nav className="browser_nav">
        <HeaderBrowser searchTerm={searchTerm} onSearch={handleSearch} />
        <Folder
          menuItems={data}
          onGetActive={isActiveKey}
          onSelectActive={handleSelectFolder}
        />
      </nav>

      <div className="browser_content">
        {arrCopyText.map((obj, index) =>
          obj.type === "text" ? (
            <TextCopy
              key={`${obj.key}-${index}`}
              title={obj.text}
              valueCopy={obj.value}
              onUpdate={() => onEditItem(obj)}
              onDelete={() => handleDelete(obj.key, index)}
            />
          ) : null
        )}
        <div
          style={{
            transition: "opacity 0.3s",
            opacity: isScrolling ? 0 : 1,
            pointerEvents: isScrolling ? "none" : "auto",
          }}
        >
          {!isScrolling && <AddCopy link="/clipboard-creator" />}
        </div>
      </div>
    </div>
  );
};

ClipboardBrowser.propTypes = {
  onEditItem: PropTypes.func.isRequired,
};

export default ClipboardBrowser;
