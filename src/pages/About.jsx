import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { Toaster, toast } from "react-hot-toast";
const About = () => {
  const [file, setFile] = useState(null);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  // Función para Exportar
  const exportData = () => {
    const data = {
      config_bd: JSON.parse(localStorage.getItem("config_bd") || "{}"),
      copybox_bd: JSON.parse(localStorage.getItem("copybox_bd") || "{}"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "copybo_backup.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para Importar
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.config_bd && typeof data.config_bd === "object") {
          localStorage.setItem("config_bd", JSON.stringify(data.config_bd));
        }
        if (data.copybox_bd && typeof data.copybox_bd === "object") {
          localStorage.setItem("copybox_bd", JSON.stringify(data.copybox_bd));
        }
        alert(t("settings.msg-success-import"));
      } catch (error) {
        alert(t("settings.msg-error-import"));
      }
    };
    reader.readAsText(file);
    // refrescar la página
    window.location.reload();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setShowModal(false), 300);
    setInputValue(""); // Limpiar input al cerrar
    setError(""); // Resetear error al cerrar
  };

  return (
    <div>
      <HeaderPage title={t("settings.title")} onClose={handleCloseModal} />
      <div className="about">
        <h1>{t("about.subtitle-about")}</h1>
        {parse(t("about.text-about"))}
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="hosted_button_id" value="UKXCK63HR9PH4" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
            onclick="window.open('https://www.paypal.com/donate?hosted_button_id=UKXCK63HR9PH4', '_blank', 'width=500,height=700'); return false;"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_CO/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
        <div className="settings-container">
          <h3>{t("settings.language")}</h3>
          <select onChange={handleLanguageChange} value={i18n.language}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="br">Português</option>
            <option value="fr">Français</option>

          </select>

          <h3>{t("settings.export")}</h3>
          <button onClick={exportData}>📤 {t("settings.export")}</button>

          <h3>{t("settings.import")}</h3>
          <input type="file" accept=".json" onChange={importData} />
        </div>
      </div>
    </div>
  );
};

export default About;
