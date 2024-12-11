// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerInformacionDeUnUsuario from "../hooks/useObtenerInformacionDeUnUsuario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../helpers/FuncionesGenerales";
import { DICCIONARIO_PERFIL } from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Perfil.css";

export default function Perfil() {
  const { infUsuario } = useUsuarios();
  const { idioma } = useConfiguracion();

  const { informacionDelUsuario, cargandoInformacionDelUsuario } =
    useObtenerInformacionDeUnUsuario(infUsuario?.idUsuario);

  const IconosPerfil = {
    Administrador: <ion-icon name="shield-checkmark"></ion-icon>,
    Chofer: <ion-icon name="car"></ion-icon>,
    Bodega: <ion-icon name="cube"></ion-icon>,
    Moderador: <ion-icon name="glasses"></ion-icon>,
    Usuario: <ion-icon name="person-circle"></ion-icon>,
    Error: <ion-icon name="close-outline"></ion-icon>,
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
  } = informacionDelUsuario[0] || [];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="person-circle"
        seccion={DICCIONARIO_PERFIL[idioma].Perfil}
      />
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
          <h1 className="Perfil__Contenido__Usuario">{Usuario || "Usuario"}</h1>
          <small
            className={`Perfil__Contenido__Permisos ${Permisos || "Error"}`}
          >
            {Permisos || "Permisos"}
            {IconosPerfil[Permisos] || IconosPerfil["Error"]}
          </small>
          <hr className="Perfil__Separador" />
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="person"></ion-icon>
              ID
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {idUsuario || "0"}
            </p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="mail"></ion-icon>
              {DICCIONARIO_PERFIL[idioma].Correo}
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {Correo || "-"}
            </p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="call"></ion-icon>
              {DICCIONARIO_PERFIL[idioma].Telefono}
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {Telefono || "-"}
            </p>
          </span>
          <span className="Perfil__Contenido__Detalles">
            <p className="Perfil__Contenido__Detalles--Texto">
              <ion-icon name="calendar"></ion-icon>
              {DICCIONARIO_PERFIL[idioma].FechaDeCreacion}
            </p>
            <p className="Perfil__Contenido__Detalles--Valor">
              {FechaCreacionUsuario
                ? FormatearFecha(FechaCreacionUsuario?.slice(0, 10))
                : "00/00/0000"}{" "}
              - {HoraCreacionUsuario || "00:00:00"}
            </p>
          </span>
        </div>
      </div>
    </main>
  );
}
