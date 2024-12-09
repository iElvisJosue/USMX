// IMPORTAMOS LAS LIBRERías A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import MenuOpciones from "./MenuOpciones";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { useConfiguracion } from "../../context/ConfiguracionContext";

// IMPORTAMOS LOS HOOKS A USAR
import useCerrarSesion from "../../hooks/useCerrarSesion";
import OpcionesDelMenu from "../../helpers/OpcionesDelMenu";

// IMPORTAMOS LAS AYUDAS
import { HOST, HOST_IMAGENES } from "../../helpers/Urls";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_BOTONES } from "../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Menu/Menu.css";

export default function Menu() {
  const { infSistema } = useSistema();
  const { infUsuario } = useUsuarios();
  const { idioma } = useConfiguracion();
  const { CerrandoSesion } = useCerrarSesion();
  const { OpcionesMenu } = OpcionesDelMenu(idioma);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const ClaseMenu = mostrarMenu ? "Menu Activo" : "Menu";

  return (
    <aside className={ClaseMenu}>
      <span className="Menu__Encabezado">
        <img
          src={`${HOST_IMAGENES}/${infSistema.LogoSistema}`}
          alt={infSistema.NombreSistema}
          onClick={() => (window.location.href = `${HOST}Bienvenida`)}
        />
        <a href={`${HOST}Bienvenida`}>{infSistema.NombreSistema}</a>
        <ion-icon
          name="close-circle"
          class="Menu__Encabezado--MostrarMenu"
          onClick={() => setMostrarMenu(false)}
        ></ion-icon>
      </span>
      <div className="Menu__Cuerpo">
        {OpcionesMenu[infUsuario.Permisos].map(
          ({ icono, nombre, url, opcionesSecundarias }, index) => (
            <MenuOpciones
              key={index}
              OpcionPrincipal={{
                icono,
                nombre,
                url,
              }}
              OpcionSecundaria={opcionesSecundarias}
            />
          )
        )}
      </div>
      <ion-icon
        name="menu"
        class="Menu__MostrarMenu"
        onClick={() => setMostrarMenu(true)}
      ></ion-icon>
      <button className="Menu__CerrarSesion" onClick={CerrandoSesion}>
        <ion-icon name="log-out"></ion-icon>{" "}
        {DICCIONARIO_BOTONES[idioma].CerrarSesion}
      </button>
    </aside>
  );
}
