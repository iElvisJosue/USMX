/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import AdministrarRegistro from "../../AdministrarRegistro";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_LISTA_DE_USUARIOS,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

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
  const { ActualizarEstadoUsuario } = useUsuarios();

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
    Usuario: "person-circle",
    Moderador: "glasses",
    Administrador: "shield-checkmark",
    Chofer: "car",
    Bodega: "cube",
    Desactivado: "ban",
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
            <p className="ListaDeUsuarios__Clasificacion--Texto">
              <ion-icon name="person-circle"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Usuario}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto">
              <ion-icon name="glasses"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Moderador}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto">
              <ion-icon name="car"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Chofer}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto">
              <ion-icon name="cube"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_USUARIOS[Idioma].Bodega}
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto">
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
          {usuarios.slice(indiceInicial, indiceFinal).map((infUsuario) => (
            <AdministrarRegistro
              key={infUsuario.idUsuario}
              Status={infUsuario.StatusUsuario}
              idRegistro={infUsuario.idUsuario}
              NombreRegistro={infUsuario.Permisos}
              ImagenRegistro={infUsuario.Foto}
              Secciones={[
                {
                  Icono: IconosPorTipoDeUsuario[infUsuario.Permisos],
                  TextoUno: infUsuario.Permisos,
                  TextoDos: infUsuario.Usuario,
                },
              ]}
              OpcionesBotones={[
                {
                  TituloBoton: "Agencias",
                  IconoBoton: "business",
                  ColorBoton: "Verde",
                  FuncionBoton: EstablecerInformacionDelUsuarioSeleccionado,
                },
                {
                  TituloBoton: "Editar",
                  IconoBoton: "create",
                  ColorBoton: "Azul",
                  FuncionBoton: EstablecerInformacionDelUsuarioAEditar,
                },
              ]}
              infRegistro={infUsuario}
              FuncionActivarDesactivar={ActualizarEstadoUsuario}
              obtenerListaNuevamente={obtenerUsuariosNuevamente}
              establecerObtenerListaNuevamente={
                establecerObtenerUsuariosNuevamente
              }
              MostrarBotonActivarDesactivar={
                infUsuario.Permisos === "Administrador" ? false : true
              }
              MostrarOpciones={
                infUsuario.Permisos === "Administrador" ? false : true
              }
            />
          ))}

          <small className="ListaDeUsuarios__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
