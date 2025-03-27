// storage.js
const COPYBOX_BD_KEY = "copybox_bd";
const CONFIG_BD_KEY = "config_bd";
export const getCopyboxBd = () => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(COPYBOX_BD_KEY)) || { Otros: [] };
  } catch (error) {
    console.error("Error reading copybox data:", error);
    return { Otros: [] };
  }
};

export const saveCopyboxBd = (data) => {
  try {
    localStorage.setItem(COPYBOX_BD_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving copybox data:", error);
  }
};

export const getConfigBd = () => {
  if (typeof window === "undefined") return {};
  try {
    return (
      JSON.parse(localStorage.getItem(CONFIG_BD_KEY)) || {
        selectedFolder: "Todos",
      }
    );
  } catch (error) {
    console.error("Error reading config data:", error);
    return { selectedFolder: "Todos" };
  }
};

export const saveConfigBd = (config) => {
  try {
    localStorage.setItem(CONFIG_BD_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Error saving config data:", error);
  }
};
