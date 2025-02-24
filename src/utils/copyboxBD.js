import { useState, useEffect } from "react";

// utils/copyboxBD.js
export const getCopyboxBd = () => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem("copybox_bd");
  const defaultData = { Otros: [] };
  if (!data) {
    saveCopyboxBd(defaultData);
    return defaultData;
  }
  getConfigBd();
  return data ? JSON.parse(data) : {};
};

export const getConfigBd = () => {
  if (typeof window === "undefined") return {};
  const configData = localStorage.getItem("config_bd");
  const defaultConfig = { selectedFolder: "Todos" };
  if (!configData) {
    localStorage.setItem("config_bd", JSON.stringify(defaultConfig));
    return defaultConfig;
  }
  return configData ? JSON.parse(configData) : {};
};

export const saveConfigBd = (config) => {
  localStorage.setItem("config_bd", JSON.stringify(config));
};

const saveCopyboxBd = (data) => {
  localStorage.setItem("copybox_bd", JSON.stringify(data));
};

// Custom Hook para React
export const useCopyboxBd = () => {
  const [data, setData] = useState(getCopyboxBd);
  const initialConfig = getConfigBd();
  const [selectedKey, setSelectedKey] = useState(initialConfig.selectedFolder);
  const [objects, setObjects] = useState([]);
  const updateStorage = (newData) => {
    saveCopyboxBd(newData);
    setData(newData);
    setTimeout(() => {
      listObjectsInSelectedKey();
    }, 100);
  };

  const keyExists = (key) => {
    // forzamos a recargamos la data
    const updatedData = getCopyboxBd();
    setData((prevData) => {
      const newData = { ...prevData, ...updatedData };
      return newData;
    });
    return Boolean(updatedData[key]);
  };

  const objectExistsInKey = (key, object) => {
    if (!data[key]) return false;
    return data[key].some(
      (item) =>
        item.type === object.type &&
        item.text === object.text &&
        item.value === object.value
    );
  };

  const updateKey = (oldKey, newKey) => {
    if (!keyExists(oldKey)) {
      console.warn(`La clave "${oldKey}" no existe`);
      return false;
    }

    if (keyExists(newKey)) {
      console.warn(`La clave "${newKey}" ya existe`);
      return false;
    }

    if (!newKey || typeof newKey !== "string") {
      console.error("La nueva clave debe ser un string válido");
      return false;
    }

    const newData = { ...data, [newKey]: data[oldKey] };
    delete newData[oldKey];
    updateStorage(newData);
    return true;
  };

  const addKey = (key) => {
    if (keyExists(key)) {
      console.warn(`La clave "${key}" ya existe`);
      return false;
    }

    if (!key || typeof key !== "string") {
      console.error("La clave debe ser un string válido");
      return false;
    }

    updateStorage({ ...data, [key]: [] });
    return true;
  };

  const addObjectToKey = (key, object) => {
    if (!keyExists(key)) {
      console.warn(`La clave "${key}" no existe`);
      return false;
    }

    if (!object || typeof object !== "object") {
      console.error("El objeto debe ser un objeto válido");
      return false;
    }

    const requiredProps = ["type", "text", "value"];
    if (!requiredProps.every((prop) => prop in object)) {
      console.error(
        "El objeto debe contener las propiedades: type, text, value"
      );
      return false;
    }

    if (objectExistsInKey(key, object)) {
      console.warn("El objeto ya existe en esta clave");
      return false;
    }
    const updatedData = getCopyboxBd();
    setData((prevData) => {
      const newData = { ...prevData, ...updatedData };
      return newData;
    });
    const newArray = [...data[key], object];
    updateStorage({ ...data, [key]: newArray });
    // actualizamos la lista de objetos si la clave seleccionada es la misma
    setTimeout(() => {
      setObjects([...data[key]]);
    }, 1000);
    return true;
  };

  const deleteObjectFromKey = (key, index) => {
    if (!keyExists(key)) {
      console.warn(`La clave "${key}" no existe`);
      return false;
    }
    // Eliminamos el objeto que tenga el índice indicado
    const newArray = [...data[key]];
    newArray.splice(index, 1);
    updateStorage({ ...data, [key]: newArray });
    return true;
  };

  const deleteKey = (key) => {
    if (!keyExists(key)) {
      console.warn(`La clave "${key}" no existe`);
      return false;
    }

    const newData = { ...data };
    delete newData[key];
    updateStorage(newData);
    return true;
  };

  // Nuevos métodos agregados
  const listAllKeys = () => {
    return Object.keys(data);
  };

  const listObjectsByKey = (key) => {
    if (!keyExists(key)) {
      console.warn(`La clave "${key}" no existe`);
      return [];
    }
    return [...data[key]]; // Devolvemos copia para evitar mutaciones
  };

  const getAllData = () => {
    return { ...data }; // Devolvemos copia del objeto completo
  };

  // Nuevas funciones para manejar la carpeta seleccionada
  const selectKey = (key) => {
    if (!keyExists(key) && key !== "Todos") {
      console.warn(`La clave "${key}" no existe`);
      return false;
    }
    const config = getConfigBd();
    config.selectedFolder = key;
    saveConfigBd(config);
    setSelectedKey(key);
    listObjectsInSelectedKey();
    return true;
  };

  const listObjectsInSelectedKey = () => {
    setObjects([]);
    if (!selectedKey) {
      console.warn("No hay ninguna clave seleccionada");
      return [];
    }
    if (selectedKey === "Todos") {
      const allData = getAllData();
      const allObjects = Object.keys(allData).reduce((acc, key) => {
        const objectsWithKey = allData[key].map((obj) => ({ ...obj, key }));
        return [...acc, ...objectsWithKey];
      }, []);
      setObjects(allObjects);
      return allObjects;
    } else {
      const objectsWithKey = listObjectsByKey(selectedKey).map((obj) => ({
        ...obj,
        key: selectedKey,
      }));
      setObjects(objectsWithKey);
      return objectsWithKey;
    }
  };

  const isActiveKey = (key) => {
    return key === selectedKey;
  };
  const getActiveKey = () => {
    return selectedKey;
  };

  const dataArray = Object.keys(data).map((key) => ({
    key,
    objects: data[key].map((obj) => ({ ...obj, key })),
  }));

  return {
    data: dataArray,
    keyExists,
    objects,
    objectExistsInKey,
    addKey,
    updateKey,
    addObjectToKey,
    deleteObjectFromKey,
    deleteKey,
    listAllKeys,
    listObjectsByKey,
    getAllData,
    selectKey,
    listObjectsInSelectedKey,
    isActiveKey,
    getActiveKey,
  };
};
