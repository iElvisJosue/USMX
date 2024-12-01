/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/ModalInformacionDeLaAgencia.css";

export default function ModalInformacionDeLaAgencia({
  idioma,
  informacionDelUsuario,
  informacionDeLaAgencia,
  establecerMostrarModal,
  buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
  establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
}) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { AsignarAgenciaAlUsuario } = useUsuarios();

  const PeticionAsignarAgenciaAlUsuario = async (idAgencia) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await AsignarAgenciaAlUsuario({
        CookieConToken: COOKIE_CON_TOKEN,
        idUsuario: informacionDelUsuario.idUsuario,
        idAgencia,
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
      establecerMostrarModal(false);
      establecerPeticionPendiente(false);
    }
  };

  return (
    <div className="ModalInformacionDeLaAgencia">
      <article className="ModalInformacionDeLaAgencia__Contenido">
        <button
          className="ModalInformacionDeLaAgencia__Contenido--CerrarModal"
          onClick={() => establecerMostrarModal(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDeLaAgencia__Contenido--Titulo">
          {
            DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA[idioma]
              .InformacionDeLaAgencia
          }
        </h1>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion Col2">
          <ion-icon name="business"></ion-icon>
          <b>{DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA[idioma].Agencia}</b>
          {informacionDeLaAgencia.NombreAgencia}
          {informacionDeLaAgencia.NombreLegalAgencia && (
            <>
              <br />
              {informacionDeLaAgencia.NombreLegalAgencia}
            </>
          )}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion">
          <ion-icon name="person-circle"></ion-icon>
          <b>
            {DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA[idioma].Representante}
          </b>{" "}
          {informacionDeLaAgencia.RepresentanteVentas || "N/A"} <br />
          {informacionDeLaAgencia.TelefonoRepresentanteVentas && (
            <>Tel. {informacionDeLaAgencia.TelefonoRepresentanteVentas}</>
          )}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>
            {DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA[idioma].TelAgencia}
          </b>{" "}
          {informacionDeLaAgencia.TelefonoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>
            {DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA[idioma].Correos}
          </b>{" "}
          {informacionDeLaAgencia.CorreoAgencia}
          {informacionDeLaAgencia.CorreoAgenciaSecundario && (
            <>
              <br />
              {informacionDeLaAgencia.CorreoAgenciaSecundario}
            </>
          )}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion Col2">
          <ion-icon name="location"></ion-icon>
          <b>{DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA[idioma].Locacion}</b>
          {informacionDeLaAgencia.PaisAgencia}
          <br />
          {informacionDeLaAgencia.CiudadAgencia},{" "}
          {informacionDeLaAgencia.EstadoAgencia},{" "}
          {informacionDeLaAgencia.DireccionAgencia}{" "}
          {informacionDeLaAgencia.CodigoPostalAgencia}
        </small>
        {informacionDeLaAgencia.Editable && (
          <button
            className="ModalInformacionDeLaAgencia__Contenido--Boton"
            onClick={() =>
              PeticionAsignarAgenciaAlUsuario(informacionDeLaAgencia.idAgencia)
            }
          >
            {DICCIONARIO_BOTONES[idioma].Asignar}
          </button>
        )}
      </article>
    </div>
  );
}
