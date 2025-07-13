import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import br from "./locales/br.json"


i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next) // Conecta con React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      br: { translation: br },
    },
  //  lng: "en", // ✅ Idioma inicial forzado
    fallbackLng: "en", // Idioma por defecto
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
