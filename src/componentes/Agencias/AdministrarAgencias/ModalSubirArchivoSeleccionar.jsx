/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import {
  DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
} from "../../../diccionario/Diccionario";

export default function ModalSubirArchivoSeleccionar({
  idioma,
  informacionArchivo,
  esRemitente,
  establecerEsRemitente,
  hayArchivo,
  mostrarError,
  ManejarCambiosEnElArchivo,
}) {
  return (
    <>
      <section
        className={`ModalSubirArchivo__Contenido--Opciones ${
          esRemitente ? "Remitentes" : "Destinatarios"
        }`}
      >
        <button
          className="ModalSubirArchivo__Contenido--Opciones--Boton"
          type="button"
          onClick={() => establecerEsRemitente(true)}
        >
          <ion-icon name="person-circle"></ion-icon>
          {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].Remitentes}
        </button>
        <button
          className="ModalSubirArchivo__Contenido--Opciones--Boton"
          type="button"
          onClick={() => establecerEsRemitente(false)}
        >
          <ion-icon name="location"></ion-icon>
          {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].Destinatarios}
        </button>
      </section>
      <h1 className="ModalSubirArchivo__Contenido--Titulo">
        {
          DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma]
            .SeleccionarArchivos
        }
      </h1>
      <picture className="ModalSubirArchivo__Contenido--Imagen">
        <img src="SubirExcel.png" alt="Icono de subir excel" />
      </picture>
      <small className="ModalSubirArchivo__Contenido--Texto">
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].Remitentes}`
            : `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].Destinatarios}`}
        </b>{" "}
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].MensajeParteDos}{" "}
        <b>{informacionArchivo.NombreAgencia || "N/A"}</b>,{" "}
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[idioma].MensajeParteTres}
      </small>
      <label className="ModalSubirArchivo__Contenido--Archivo">
        <input
          type="file"
          accept=".xlsx"
          name="Excel"
          onChange={ManejarCambiosEnElArchivo}
        />
        {hayArchivo
          ? hayArchivo?.name
          : `${DICCIONARIO_BOTONES[idioma].Seleccionar}`}
      </label>
      {mostrarError && (
        <span className="ModalSubirArchivo__Contenido--Archivo--MensajeDeError">
          {DICCIONARIO_MENSAJES_DE_ERROR[idioma].Archivo}
        </span>
      )}
      <button className="ModalSubirArchivo__Contenido--Boton">
        {DICCIONARIO_BOTONES[idioma].Subir}
      </button>
    </>
  );
}
