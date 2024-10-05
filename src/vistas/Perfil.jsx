// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerInformacionDeUnUsuario from "../hooks/useObtenerInformacionDeUnUsuario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Perfil.css";

export default function Perfil() {
  const { usuario } = useGlobal();
  const { informacionDelUsuario, cargandoInformacionDelUsuario } =
    useObtenerInformacionDeUnUsuario(usuario?.idUsuario);

  const IconosPerfil = {
    Administrador: <ion-icon name="shield-checkmark"></ion-icon>,
    Moderador: <ion-icon name="glasses"></ion-icon>,
    Usuario: <ion-icon name="person-circle"></ion-icon>,
  };

  if (cargandoInformacionDelUsuario) return <Cargando />;

  const {
    idUsuario,
    Usuario,
    Permisos,
    Correo,
    Telefono,
    FechaCreacionUsuario,
    HoraCreacionUsuario,
    Direccion,
  } = informacionDelUsuario[0];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado icono="person-circle" seccion="Perfil" />
      <div className="Perfil">
        <div className="Perfil__Contenido">
          <span className="Perfil__Contenido__Editar">
            <button>
              <ion-icon name="color-wand"></ion-icon>
            </button>
          </span>
          <img
            src="Perfil.png"
            alt="Logo del perfil"
            className="Perfil__Contenido__Foto"
          />
          <h1 className="Perfil__Contenido__Usuario">{Usuario}</h1>
          <small className={`Perfil__Contenido__Permisos ${Permisos}`}>
            {Permisos}
            {IconosPerfil[Permisos]}
          </small>
          <hr className="Perfil__Separador" />
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="person"></ion-icon>
              ID
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">{idUsuario}</p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="mail"></ion-icon>
              Correo
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {Correo ?? "-"}
            </p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="call"></ion-icon>
              Teléfono
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {Telefono ?? "-"}
            </p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="calendar"></ion-icon>
              Fecha creación
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {FormatearFecha(FechaCreacionUsuario.slice(0, 10))} a las{" "}
              {HoraCreacionUsuario}
            </p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="location"></ion-icon>
              Ubicación
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {Direccion ?? "-"}
            </p>
          </span>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
