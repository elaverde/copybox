import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const About = () => {
  const [file, setFile] = useState(null);

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
        alert("✅ Datos importados correctamente.");
      } catch (error) {
        alert("❌ Error al importar los datos.");
      }
    };
    reader.readAsText(file);
    // refrescar la página
    window.location.reload();
  };

  return (
    <div>
      <header className="header primary-background">
        <div className="header-left">
          <img src={logo} width={40} alt="Logo" />
          <h1>CopyBox</h1>
        </div>
        <div className="header-right close-button">
          <Link to="/">
            <FaTimes size={24} />
          </Link>
        </div>
      </header>
      <div className="about">
        <h1>¡Apoya CopyBox! 🚀</h1>
        <p>
          CopyBox es una herramienta gratuita diseñada para hacerte la vida más
          fácil al copiar texto con un solo clic. Si te ha sido útil y quieres
          ayudar a mantener su desarrollo, considera hacer una donación.
        </p>
        <p>💙 Cada aporte nos ayuda a mejorar y mantener CopyBox en línea. </p>
        <p>🔹 Dona aquí: 👉 Haz tu donación con PayPal</p>
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
        ¡Gracias por tu apoyo! 🙌
        <h2>Exportar</h2>
        <button onClick={exportData}>📤 Exportar Datos</button>
        <h2>Importar</h2>
        <input type="file" accept=".json" onChange={importData} />
      </div>
    </div>
  );
};

export default About;
