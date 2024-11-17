/* eslint-disable react/prop-types */

// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import MensajeGeneral from "../../MensajeGeneral";
import Cargando from "../../Cargando";
import ModalInformacionDeLaAgencia from "./ModalInformacionDeLaAgencia";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasAsignadasYNoAsignadasPorProducto from "../../../hooks/useBuscarAgenciasAsignadasYNoAsignadasPorProducto";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/AdministrarAgenciasDelProducto.css";

export default function AdministrarAgenciasDelProducto({
  idioma,
  establecerVistaProductos,
  informacionDelProducto,
  informacionDeLaAgencia,
  establecerInformacionDeLaAgencia,
}) {
  const [mostrarModal, establecerMostrarModal] = useState(false);
  const { DesasignarAgenciaAlProducto } = useProductos();
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

  const {
    agenciasAsignadasYNoAsignadasDelProducto,
    cargandoAgenciasAsignadasYNoAsignadasDelProducto,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelProducto,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  } = useBuscarAgenciasAsignadasYNoAsignadasPorProducto(
    informacionDelProducto.idProducto
  );

  useEffect(() => {
    if (agenciasAsignadasYNoAsignadasDelProducto) {
      const { AgenciasNoAsignadas } = agenciasAsignadasYNoAsignadasDelProducto;
      const cantidadDePaginasEnAgencias = Math.ceil(
        AgenciasNoAsignadas.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [agenciasAsignadasYNoAsignadasDelProducto]);

  const obtenerAgencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgenciasAsignadasYNoAsignadasDelProducto(
        valorIntroducido
      );
      reiniciarValores();
    }
  };
  const MostrarModalYAsignarAgencia = (infAgencia, Editable) => {
    infAgencia.Editable = Editable;
    establecerMostrarModal(true);
    establecerInformacionDeLaAgencia(infAgencia);
  };

  const PeticionDesasignarAgenciaAlProducto = async (
    idUnionAgenciasProductos
  ) => {
    try {
      const res = await DesasignarAgenciaAlProducto({
        CookieConToken: COOKIE_CON_TOKEN,
        idUnionAgenciasProductos,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto(
          !buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto
        );
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  if (cargandoAgenciasAsignadasYNoAsignadasDelProducto) return <Cargando />;

  const { AgenciasAsignadas, AgenciasNoAsignadas } =
    agenciasAsignadasYNoAsignadasDelProducto;

  return (
    <div className="AdministrarAgenciasDelProducto">
      {mostrarModal && (
        <ModalInformacionDeLaAgencia
          idioma={idioma}
          informacionDelProducto={informacionDelProducto}
          informacionDeLaAgencia={informacionDeLaAgencia}
          establecerMostrarModal={establecerMostrarModal}
          buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto={
            buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto
          }
          establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto={
            establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto
          }
        />
      )}
      <span className="AdministrarAgenciasDelProducto__Regresar">
        <button
          className="AdministrarAgenciasDelProducto__Regresar__Boton"
          onClick={() => establecerVistaProductos(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <small className="AdministrarAgenciasDelProducto__Regresar__Usuario">
          {
            DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO[idioma]
              .ProductoSeleccionado
          }{" "}
          <b>{informacionDelProducto.NombreProducto.toUpperCase()}</b>
        </small>
      </span>
      {AgenciasAsignadas.length > 0 && (
        <>
          <h1 className="AdministrarAgenciasDelProducto__Titulo">
            {
              DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO[idioma]
                .AgenciasAsignadas
            }
          </h1>
          {AgenciasAsignadas.map((infAgencia, index) => (
            <section
              className="AdministrarAgenciasDelProducto__Agencia Asignadas"
              key={index}
            >
              <ion-icon name="business"></ion-icon>
              <p>
                {infAgencia.idEspecial} <br /> {infAgencia.NombreAgencia}
              </p>

              <button
                className="AdministrarAgenciasDelProducto__Agencia__Eliminar"
                onClick={() =>
                  PeticionDesasignarAgenciaAlProducto(
                    infAgencia.idUnionAgenciasProductos
                  )
                }
              >
                <ion-icon name="close"></ion-icon>
              </button>
              <button
                className="AdministrarAgenciasDelProducto__Agencia__Detalles"
                onClick={() => MostrarModalYAsignarAgencia(infAgencia, false)}
              >
                <ion-icon name="information"></ion-icon>
              </button>
            </section>
          ))}
        </>
      )}
      <h1 className="AdministrarAgenciasDelProducto__Titulo">
        {
          DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO[idioma]
            .AsignarNuevaAgencia
        }
      </h1>
      <span className="AdministrarAgenciasDelProducto__Buscar">
        <input
          type="text"
          placeholder={
            DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO[idioma].BuscarAgencia
          }
          onChange={obtenerAgencias}
        />
        <span className="AdministrarAgenciasDelProducto__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {AgenciasNoAsignadas.length > 0 ? (
        <>
          <small className="AdministrarAgenciasDelProducto__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos}{" "}
            {AgenciasNoAsignadas.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="AdministrarAgenciasDelProducto__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="AdministrarAgenciasDelProducto__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < AgenciasNoAsignadas.length && (
              <button
                className="AdministrarAgenciasDelProducto__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {AgenciasNoAsignadas.slice(indiceInicial, indiceFinal).map(
            (infAgencia, index) => (
              <section
                className="AdministrarAgenciasDelProducto__Agencia"
                key={index}
                onClick={() => MostrarModalYAsignarAgencia(infAgencia, true)}
              >
                <ion-icon name="business"></ion-icon>
                <p>
                  {infAgencia.idEspecial}
                  <br /> {infAgencia.NombreAgencia}
                </p>
                <ion-icon name="location"></ion-icon>
                <p>
                  {infAgencia.EstadoAgencia}, {infAgencia.CiudadAgencia}
                </p>
                <p>
                  {infAgencia.DireccionAgencia} {infAgencia.CodigoPostalAgencia}
                </p>
              </section>
            )
          )}
          <small className="AdministrarAgenciasDelProducto__TextoPaginas">
            {DICCIONARIO_PAGINACION[idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[idioma].De} {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Agencias"}
          TextoBoton={
            DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO[idioma]
              .RegistrarAgencia
          }
        />
      )}
    </div>
  );
}
