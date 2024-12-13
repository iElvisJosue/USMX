/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacion from "./ModalConfirmacion";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_LISTA_DE_USUARIOS,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../../helpers/Urls";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarUsuariosParaAdministrarPorFiltro from "../../../hooks/useBuscarUsuariosParaAdministrarPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/ListaDeUsuarios.css";

export default function ListaDeUsuarios({
  Idioma,
  establecerVista,
  establecerInformacionDelUsuario,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infUsuario, establecerInfUsuario] = useState(null);
  const {
    usuarios,
    cargandoUsuarios,
    establecerFiltroUsuario,
    obtenerUsuariosNuevamente,
    establecerObtenerUsuariosNuevamente,
  } = useBuscarUsuariosParaAdministrarPorFiltro();
  const {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  } = usePaginacion();

  useEffect(() => {
    if (usuarios) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        usuarios.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [usuarios]);

  const obtenerUsuarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroUsuario(valorIntroducido);
      reiniciarValores();
    }
  };

  const IconosPorTipoDeUsuario = {
    Usuario: <ion-icon name="person-circle"></ion-icon>,
    Moderador: <ion-icon name="glasses"></ion-icon>,
    Administrador: <ion-icon name="shield-checkmark"></ion-icon>,
    Chofer: <ion-icon name="car"></ion-icon>,
    Bodega: <ion-icon name="cube"></ion-icon>,
    Desactivado: <ion-icon name="ban"></ion-icon>,
  };

  const MostrarModalActivar = (infUsuario) => {
    establecerInfUsuario(infUsuario);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infUsuario) => {
    establecerInfUsuario(infUsuario);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDelUsuarioSeleccionado = (infUsuario) => {
    establecerInformacionDelUsuario(infUsuario);
    establecerVista(1);
  };
  const EstablecerInformacionDelUsuarioAEditar = (infUsuario) => {
    establecerInformacionDelUsuario(infUsuario);
    establecerVista(2);
  };

  if (cargandoUsuarios) return <Cargando />;

  return (
    <div className="ListaDeUsuarios">
      {mostrarModalConfirmacion && (
        <ModalConfirmacion
          Idioma={Idioma}
          Activar={activar}
          infUsuario={infUsuario}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerUsuariosNuevamente={obtenerUsuariosNuevamente}
          establecerObtenerUsuariosNuevamente={
            establecerObtenerUsuariosNuevamente
          }
        />
      )}
      <h1 className="ListaDeUsuarios__Titulo">
        {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].AdministrarUsuarios}
      </h1>
      <span className="ListaDeUsuarios__Buscar">
        <input
          type="text"
          placeholder={DICCIONARIO_LISTA_DE_USUARIOS[Idioma].BuscarUsuario}
          onChange={obtenerUsuarios}
        />
        <span className="ListaDeUsuarios__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {usuarios.length > 0 ? (
        <>
          <small className="ListaDeUsuarios__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {usuarios.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <h2 className="ListaDeUsuarios__Clasificacion">
            {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].ClasificacionDePerfiles}
          </h2>
          <span className="ListaDeUsuarios__Colores">
            <p className="ListaDeUsuarios__Clasificacion--Texto Usuario">
              <ion-icon name="person-circle"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Usuario}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Moderador">
              <ion-icon name="glasses"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Moderador}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Chofer">
              <ion-icon name="car"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Chofer}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Bodega">
              <ion-icon name="cube"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Bodega}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Administrador">
              <ion-icon name="shield-checkmark"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Administrador}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Desactivado">
              <ion-icon name="ban"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Desactivado}
            </p>
          </span>
          <div className="ListaDeUsuarios__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeUsuarios__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < usuarios.length && (
              <button
                className="ListaDeUsuarios__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {usuarios.slice(indiceInicial, indiceFinal).map((infUsuario) =>
            infUsuario.EstadoUsuario === "Activo" ? (
              <section
                className={`ListaDeUsuarios__Usuario ${infUsuario.Permisos}`}
                key={infUsuario.idUsuario}
              >
                <span className="ListaDeUsuarios__Usuario__Detalles">
                  <img
                    src={`${HOST_IMAGENES}/${infUsuario.Foto}`}
                    alt="Imagen de perfil"
                  />
                  {IconosPorTipoDeUsuario[infUsuario.Permisos]}
                  <p>{infUsuario.Usuario}</p>
                </span>
                {infUsuario.Permisos !== "Administrador" && (
                  <span className="ListaDeUsuarios__Usuario__Opciones">
                    <button
                      className={`ListaDeUsuarios__Usuario__Opciones--Boton ${infUsuario.Permisos}`}
                      title="Administrar Agencias"
                      onClick={() =>
                        EstablecerInformacionDelUsuarioSeleccionado(infUsuario)
                      }
                    >
                      <p>
                        <ion-icon name="business"></ion-icon>
                      </p>
                    </button>
                    <button
                      className={`ListaDeUsuarios__Usuario__Opciones--Boton ${infUsuario.Permisos}`}
                      title="Editar usuario"
                      onClick={() =>
                        EstablecerInformacionDelUsuarioAEditar(infUsuario)
                      }
                    >
                      <p>
                        <ion-icon name="create"></ion-icon>
                      </p>
                    </button>
                    <button
                      className={`ListaDeUsuarios__Usuario__Opciones--Boton ${infUsuario.Permisos}`}
                      onClick={() => MostrarModalDesactivar(infUsuario)}
                      title="Desactivar usuario"
                    >
                      <p>
                        <ion-icon name="ban"></ion-icon>
                      </p>
                    </button>
                  </span>
                )}
              </section>
            ) : (
              <section
                className="ListaDeUsuarios__Usuario Desactivado"
                key={infUsuario.idUsuario}
              >
                <span className="ListaDeUsuarios__Usuario__Detalles">
                  <ion-icon name="ban"></ion-icon>
                  <p>{infUsuario.Usuario}</p>
                </span>
                <span className="ListaDeUsuarios__Usuario__Opciones">
                  <button
                    className="ListaDeUsuarios__Usuario__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infUsuario)}
                    title="Activar usuario"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeUsuarios__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Usuarios"}
          TextoBoton={DICCIONARIO_LISTA_DE_USUARIOS[Idioma].RegistrarUsuario}
        />
      )}
    </div>
  );
}
