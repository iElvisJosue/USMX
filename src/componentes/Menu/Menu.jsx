// IMPORTAMOS LAS LIBRERías A USAR
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORTAMOS LOS COMPONENTES A USAR
import MenuOpciones from "./MenuOpciones";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";

// IMPORTAMOS LOS HOOKS A USAR
import useCerrarSesion from "../../hooks/Sistema/useCerrarSesion";
import OpcionesDelMenu from "../../helpers/OpcionesDelMenu";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../helpers/Urls";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_BOTONES } from "../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Menu/Menu.css";

export default function Menu() {
  const { infSistema, infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const navigate = useNavigate();
  const { CerrandoSesion } = useCerrarSesion();
  const { OpcionesMenu } = OpcionesDelMenu(Idioma);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const ClaseMenu = mostrarMenu ? "Menu Activo" : "Menu";

  return (
    <aside className={ClaseMenu}>
      <span className="Menu__Encabezado">
        <img
          src={`${HOST_IMAGENES}/${infSistema.LogoSistema}`}
          alt={infSistema.NombreSistema}
          onClick={() => navigate("/Bienvenida")}
        />
        <a onClick={() => navigate("/Bienvenida")}>
          {infSistema.NombreSistema}
        </a>
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
        {DICCIONARIO_BOTONES[Idioma].CerrarSesion}
      </button>
    </aside>
  );
}
