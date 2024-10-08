/* eslint-disable react/prop-types */

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Configuracion/MenuConfiguracion.css";

export default function MenuConfiguracion({ vista, establecerVista }) {
  const { usuario } = useGlobal();

  return (
    <>
      <h2 className="Configuración__Titulo">Configuración</h2>
      <h4 className="Configuración__Subtitulo">
        Administre la configuración y preferencias de su cuenta
      </h4>
      <hr className="Configuración__Separador" />
      <section className="Configuracion__Opciones">
        <button
          className={`Configuración__Opciones--Boton ${
            vista === 0 && "Activo"
          }`}
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="color-palette"></ion-icon> Apariencia
        </button>

        {usuario?.Permisos === "Administrador" && (
          <>
            <button
              className={`Configuración__Opciones--Boton ${
                vista === 1 && "Activo"
              }`}
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="tv"></ion-icon> Sitio
            </button>
            <button
              className={`Configuración__Opciones--Boton ${
                vista === 2 && "Activo"
              }`}
              onClick={() => establecerVista(2)}
            >
              <ion-icon name="archive"></ion-icon> Cargas
            </button>
            <button
              className={`Configuración__Opciones--Boton ${
                vista === 3 && "Activo"
              }`}
              onClick={() => establecerVista(3)}
            >
              <ion-icon name="airplane"></ion-icon> Envíos
            </button>
          </>
        )}
      </section>
    </>
  );
}
