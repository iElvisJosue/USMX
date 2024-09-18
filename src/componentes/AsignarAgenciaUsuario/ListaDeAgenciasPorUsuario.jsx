/* eslint-disable react/prop-types */

// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import MensajeGeneral from "../MensajeGeneral";
import Cargando from "../Cargando";
import ModalInformacionDeLaAgencia from "../AsignarAgenciaUsuario/ModalInformacionDeLaAgencia";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasAsignadasYNoAsignadasPorUsuario from "../../hooks/useBuscarAgenciasAsignadasYNoAsignadasPorUsuario";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AsignarAgenciaUsuario/ListaDeAgenciasPorUsuario.css";

export default function ListaDeAgenciasPorUsuario({
  establecerVista,
  informacionDelUsuario,
  informacionDeLaAgencia,
  establecerInformacionDeLaAgencia,
}) {
  const [mostrarModal, establecerMostrarModal] = useState(false);
  const { DesasignarAgenciaAlUsuario } = useUsuarios();
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
    agenciasAsignadasYNoAsignadasDelUsuario,
    cargandoAgenciasAsignadasYNoAsignadasDelUsuario,
    filtroAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelUsuario,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
  } = useBuscarAgenciasAsignadasYNoAsignadasPorUsuario(
    informacionDelUsuario.idUsuario
  );

  useEffect(() => {
    if (agenciasAsignadasYNoAsignadasDelUsuario) {
      const { AgenciasNoAsignadas } = agenciasAsignadasYNoAsignadasDelUsuario;
      const cantidadDePaginasEnAgencias = Math.ceil(
        AgenciasNoAsignadas.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [agenciasAsignadasYNoAsignadasDelUsuario]);

  const obtenerAgencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgenciasAsignadasYNoAsignadasDelUsuario(valorIntroducido);
      reiniciarValores();
    }
  };
  const MostrarModalYAsignarAgencia = (infAgencia, Editable) => {
    infAgencia.Editable = Editable;
    establecerMostrarModal(true);
    establecerInformacionDeLaAgencia(infAgencia);
  };

  const PeticionDesasignarAgenciaAlUsuario = async (idUnionAgencia) => {
    try {
      const res = await DesasignarAgenciaAlUsuario({
        CookieConToken: COOKIE_CON_TOKEN,
        idUnionAgencia,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario(
          !buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario
        );
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  if (cargandoAgenciasAsignadasYNoAsignadasDelUsuario)
    return <Cargando colSpan={"Cinco"} />;

  const { AgenciasAsignadas, AgenciasNoAsignadas } =
    agenciasAsignadasYNoAsignadasDelUsuario;

  return (
    <div className="ListaDeAgenciasPorUsuario">
      {mostrarModal && (
        <ModalInformacionDeLaAgencia
          informacionDelUsuario={informacionDelUsuario}
          informacionDeLaAgencia={informacionDeLaAgencia}
          establecerMostrarModal={establecerMostrarModal}
          buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario={
            buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario
          }
          establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario={
            establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario
          }
        />
      )}
      <span className="ListaDeAgenciasPorUsuario__Regresar">
        <button
          className="ListaDeAgenciasPorUsuario__Regresar__Boton"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon> Regresar
        </button>
        <small className="ListaDeAgenciasPorUsuario__Regresar__Usuario">
          Usuario seleccionado:{" "}
          <b>{informacionDelUsuario.Usuario.toUpperCase()}</b>
        </small>
      </span>
      {AgenciasAsignadas.length > 0 && (
        <>
          <h1 className="ListaDeAgenciasPorUsuario__Titulo">
            Agencias asignadas
          </h1>
          {AgenciasAsignadas.map((infAgencia, index) => (
            <section
              className="ListaDeAgenciasPorUsuario__Agencia Asignadas"
              key={index}
            >
              <ion-icon name="business"></ion-icon>
              <p>{infAgencia.NombreAgencia}</p>

              <button
                className="ListaDeAgenciasPorUsuario__Agencia__Eliminar"
                onClick={() =>
                  PeticionDesasignarAgenciaAlUsuario(
                    infAgencia.idUnionUsuariosAgencias
                  )
                }
              >
                <ion-icon name="close"></ion-icon>
              </button>
              <button
                className="ListaDeAgenciasPorUsuario__Agencia__Detalles"
                onClick={() => MostrarModalYAsignarAgencia(infAgencia, false)}
              >
                <ion-icon name="information"></ion-icon>
              </button>
            </section>
          ))}
        </>
      )}
      <h1 className="ListaDeAgenciasPorUsuario__Titulo">
        Asignar nueva agencia
      </h1>
      <span className="ListaDeAgenciasPorUsuario__Buscar">
        <input
          type="text"
          placeholder="Buscar agencia"
          onChange={obtenerAgencias}
        />
        <span className="ListaDeAgenciasPorUsuario__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {AgenciasNoAsignadas.length > 0 ? (
        <>
          <small className="ListaDeAgenciasPorUsuario__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {AgenciasNoAsignadas.length} resultados{" "}
          </small>
          <div className="ListaDeAgenciasPorUsuario__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeAgenciasPorUsuario__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < AgenciasNoAsignadas.length && (
              <button
                className="ListaDeAgenciasPorUsuario__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {AgenciasNoAsignadas.slice(indiceInicial, indiceFinal).map(
            (infAgencia, index) => (
              <section
                className="ListaDeAgenciasPorUsuario__Agencia"
                key={index}
                onClick={() => MostrarModalYAsignarAgencia(infAgencia, true)}
              >
                <ion-icon name="business"></ion-icon>
                <p>{infAgencia.NombreAgencia}</p>
                <ion-icon name="location"></ion-icon>
                <p>{infAgencia.DireccionAgencia}</p>
                <p>
                  {infAgencia.CiudadAgencia}, {infAgencia.EstadoAgencia}{" "}
                  {infAgencia.CodigoPostalAgencia}
                </p>
              </section>
            )
          )}
          <small className="ListaDeAgenciasPorUsuario__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados para "${filtroAgenciasAsignadasYNoAsignadasDelUsuario}"`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Registrar-Agencia"}
          TextoBoton={"Registrar Agencia"}
        />
      )}
    </div>
  );
}
