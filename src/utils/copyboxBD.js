import { useState, useEffect } from "react";
import {
  getCopyboxBd,
  saveCopyboxBd,
  getConfigBd,
  saveConfigBd,
} from "./storage";

// Custom Hook para React
export const useCopyboxBd = () => {
  // 🟢 ESTADOS PRINCIPALES
  const [data, setData] = useState(getCopyboxBd);
  const [selectedKey, setSelectedKey] = useState(getConfigBd().selectedFolder);
  const [objects, setObjects] = useState([]);

  // 🟢 EFECTOS SECUNDARIOS
  useEffect(() => {
    setObjects(listObjectsInSelectedKey());
  }, [selectedKey, data]); // Se actualiza cuando cambia `selectedKey` o `data`

  // 🔵 FUNCIONES AUXILIARES
  const updateStorage = (newData) => {
    saveCopyboxBd(newData);
    setData(newData);
  };

  const keyExists = (key) => {
    return Boolean(getCopyboxBd()[key]);
  };

  const objectExistsInKey = (key, object) => {
    return data[key]?.some(
      (item) =>
        item.type === object.type &&
        item.text === object.text &&
        item.value === object.value
    );
  };

  // 🟠 OPERACIONES SOBRE CLAVES
  const addKey = (key) => {
    if (keyExists(key) || !key.trim()) return false;
    updateStorage({ ...data, [key]: [] });
    return true;
  };

  const updateKey = (oldKey, newKey) => {
    if (!keyExists(oldKey) || keyExists(newKey) || !newKey.trim()) {
      console.warn(`Error con la clave: "${oldKey}" o "${newKey}"`);
      return false;
    }

    const newData = { ...data, [newKey]: data[oldKey] };
    delete newData[oldKey];
    updateStorage(newData);
    return true;
  };

  const deleteKey = (key) => {
    if (!keyExists(key)) return false;
    const newData = { ...data };
    delete newData[key];
    updateStorage(newData);
    return true;
  };

  const selectKey = (key) => {
    if (!keyExists(key) && key !== "Todos") return false;
    const config = getConfigBd();
    config.selectedFolder = key;
    saveConfigBd(config);
    setSelectedKey(key);
    return true;
  };

  // 🟣 OPERACIONES SOBRE OBJETOS
  const addObjectToKey = (key, object) => {
    if (!keyExists(key) || objectExistsInKey(key, object)) return false;
    const newArray = [...data[key], object];
    updateStorage({ ...data, [key]: newArray });
    return true;
  };

  const updateObjectInKey = (key, oldObject, newObject) => {
    if (!keyExists(key)) return false;
    const index = data[key].findIndex(
      (item) =>
        item.type === oldObject.type &&
        item.text === oldObject.text &&
        item.value === oldObject.value
    );
    if (index === -1) return false;
    const newArray = [...data[key]];
    newArray[index] = newObject;
    updateStorage({ ...data, [key]: newArray });
    return true;
  };

  const deleteObjectFromKey = (key, index) => {
    if (!keyExists(key) || index < 0 || index >= data[key].length) return false;
    const newArray = [...data[key]];
    newArray.splice(index, 1);
    updateStorage({ ...data, [key]: newArray });
    return true;
  };

  // 🔴 FUNCIONES DE LISTADO Y BÚSQUEDA
  const listAllKeys = () => Object.keys(data);

  const listObjectsByKey = (key) => (keyExists(key) ? [...data[key]] : []);

  const listObjectsInSelectedKey = () => {
    if (!selectedKey) return [];
    if (selectedKey === "Todos") {
      return Object.keys(data).flatMap((key) =>
        data[key].map((obj) => ({ ...obj, key }))
      );
    }
    return listObjectsByKey(selectedKey).map((obj) => ({
      ...obj,
      key: selectedKey,
    }));
  };

  const listObjectsSearch = (search) => {
    const allObjects = Object.keys(data).flatMap((key) =>
      data[key].map((obj) => ({ ...obj, key }))
    );
    const filteredObjects = allObjects.filter((obj) =>
      obj.text.toLowerCase().includes(search.toLowerCase())
    );
    setObjects(filteredObjects);
    return filteredObjects;
  };

  // 🟡 ESTADO ACTUAL Y RETORNO
  const getAllData = () => ({ ...data });

  const isActiveKey = (key) => key === selectedKey;

  const getActiveKey = () => selectedKey;

  return {
    data: Object.keys(data).map((key) => ({
      key,
      objects: data[key].map((obj) => ({ ...obj, key })),
    })),
    objects,
    keyExists,
    objectExistsInKey,
    addKey,
    updateKey,
    deleteKey,
    selectKey,
    addObjectToKey,
    updateObjectInKey,
    deleteObjectFromKey,
    listAllKeys,
    listObjectsByKey,
    listObjectsInSelectedKey,
    listObjectsSearch,
    getAllData,
    isActiveKey,
    getActiveKey,
  };
};
