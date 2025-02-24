// src/context/CopyboxContext.js
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useCopyboxBd } from "../utils/copyboxBD";

const CopyboxContext = createContext();

export const CopyboxProvider = ({ children }) => {
  const {
    data,
    objects,
    selectKey,
    keyExists,
    objectExistsInKey,
    addKey,
    updateKey,
    addObjectToKey,
    deleteObjectFromKey,
    deleteKey,
    listAllKeys,
    listObjectsByKey,
    getAllData,
    listObjectsInSelectedKey,
    getActiveKey,
    isActiveKey,
  } = useCopyboxBd();

  return (
    <CopyboxContext.Provider
      value={{
        data,
        objects,
        keyExists,
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
        getActiveKey,
        isActiveKey,
      }}
    >
      {children}
    </CopyboxContext.Provider>
  );
};

CopyboxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useCopybox = () => useContext(CopyboxContext);
