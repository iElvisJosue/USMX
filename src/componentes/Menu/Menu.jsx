// IMPORTAMOS LOS COMPONENTES A USAR
import MenuOpciones from "./MenuOpciones";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useCerrarSesion from "../../hooks/useCerrarSesion";

// IMPORTAMOS LAS AYUDAS
import { OpcionesDelMenu } from "../../helpers/OpcionesDelMenu";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Menu/Menu.css";

export default function Menu() {
  const { CerrandoSesion } = useCerrarSesion();
  const { usuario } = useGlobal();

  return (
    <aside className="Menu">
      <span className="Menu__Encabezado">
        <img src="Logo-USMX.png" alt="Logo del menu" />
        <h1>USMX</h1>
      </span>
      <div className="Menu__Cuerpo">
        {OpcionesDelMenu[usuario.Permisos].map(
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
      <button className="Menu__CerrarSesion" onClick={CerrandoSesion}>
        <ion-icon name="log-out"></ion-icon> Cerrar sesión
      </button>
    </aside>
  );
}
