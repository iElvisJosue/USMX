/* eslint-disable react/prop-types */

// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Globales/Cargando";
import MensajeGeneral from "../../Globales/MensajeGeneral";
import ModalInformacionDeLaAgencia from "./ModalInformacionDeLaAgencia";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasAsignadasYNoAsignadasPorUsuario from "../../../hooks/Usuarios/useBuscarAgenciasAsignadasYNoAsignadasPorUsuario";
import usePaginacion from "../../../hooks/Globales/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/AdministrarAgenciasDelUsuario.css";

export default function AdministrarAgenciasDelUsuario({
  Idioma,
  establecerVista,
  informacionDelUsuario,
  informacionDeLaAgencia,
  establecerInformacionDeLaAgencia,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
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
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await DesasignarAgenciaAlUsuario({
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
    } finally {
      establecerPeticionPendiente(false);
    }
  };

  if (cargandoAgenciasAsignadasYNoAsignadasDelUsuario) return <Cargando />;

  const { AgenciasAsignadas, AgenciasNoAsignadas } =
    agenciasAsignadasYNoAsignadasDelUsuario;

  return (
    <div className="AdministrarAgenciasDelUsuario">
      {mostrarModal && (
        <ModalInformacionDeLaAgencia
          Idioma={Idioma}
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
      <span className="AdministrarAgenciasDelUsuario__Regresar">
        <button
          className="AdministrarAgenciasDelUsuario__Regresar__Boton"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <small className="AdministrarAgenciasDelUsuario__Regresar__Usuario">
          {
            DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO[Idioma]
              .UsuarioSeleccionado
          }
          <b>{informacionDelUsuario.Usuario.toUpperCase()}</b>
        </small>
      </span>
      {AgenciasAsignadas.length > 0 && (
        <>
          <h1 className="AdministrarAgenciasDelUsuario__Titulo">
            {
              DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO[Idioma]
                .AgenciasAsignadas
            }
          </h1>
          {AgenciasAsignadas.map((infAgencia, index) => (
            <section
              className="AdministrarAgenciasDelUsuario__Agencia Asignadas"
              key={index}
            >
              <ion-icon name="business"></ion-icon>
              <p>
                {infAgencia.idEspecial} <br />
                {infAgencia.NombreAgencia}
              </p>

              <button
                className="AdministrarAgenciasDelUsuario__Agencia__Eliminar"
                onClick={() =>
                  PeticionDesasignarAgenciaAlUsuario(
                    infAgencia.idUnionUsuariosAgencias
                  )
                }
              >
                <ion-icon name="close"></ion-icon>
              </button>
              <button
                className="AdministrarAgenciasDelUsuario__Agencia__Detalles"
                onClick={() => MostrarModalYAsignarAgencia(infAgencia, false)}
              >
                <ion-icon name="information"></ion-icon>
              </button>
            </section>
          ))}
        </>
      )}
      <h1 className="AdministrarAgenciasDelUsuario__Titulo">
        {
          DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO[Idioma]
            .AsignarNuevaAgencia
        }
      </h1>
      <span className="AdministrarAgenciasDelUsuario__Buscar">
        <input
          type="text"
          placeholder={
            DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO[Idioma].BuscarAgencia
          }
          onChange={obtenerAgencias}
        />
        <span className="AdministrarAgenciasDelUsuario__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {AgenciasNoAsignadas.length > 0 ? (
        <>
          <small className="AdministrarAgenciasDelUsuario__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos}{" "}
            {AgenciasNoAsignadas.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="AdministrarAgenciasDelUsuario__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="AdministrarAgenciasDelUsuario__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < AgenciasNoAsignadas.length && (
              <button
                className="AdministrarAgenciasDelUsuario__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {AgenciasNoAsignadas.slice(indiceInicial, indiceFinal).map(
            (infAgencia, index) => (
              <section
                className="AdministrarAgenciasDelUsuario__Agencia"
                key={index}
                onClick={() => MostrarModalYAsignarAgencia(infAgencia, true)}
              >
                <ion-icon name="business"></ion-icon>
                <p>
                  {infAgencia.idEspecial} <br />
                  {infAgencia.NombreAgencia}
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
          <small className="AdministrarAgenciasDelUsuario__TextoPaginas">
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
          UrlBoton={"/Agencias"}
          TextoBoton={
            DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO[Idioma]
              .RegistrarAgencia
          }
        />
      )}
    </div>
  );
}
