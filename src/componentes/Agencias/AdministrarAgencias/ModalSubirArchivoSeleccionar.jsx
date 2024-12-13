/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import {
  DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
} from "../../../diccionario/Diccionario";

export default function ModalSubirArchivoSeleccionar({
  Idioma,
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
          {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].Remitentes}
        </button>
        <button
          className="ModalSubirArchivo__Contenido--Opciones--Boton"
          type="button"
          onClick={() => establecerEsRemitente(false)}
        >
          <ion-icon name="location"></ion-icon>
          {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].Destinatarios}
        </button>
      </section>
      <h1 className="ModalSubirArchivo__Contenido--Titulo">
        {
          DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma]
            .SeleccionarArchivos
        }
      </h1>
      <picture className="ModalSubirArchivo__Contenido--Imagen">
        <img src="SubirExcel.png" alt="Icono de subir excel" />
      </picture>
      <small className="ModalSubirArchivo__Contenido--Texto">
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].Remitentes}`
            : `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].Destinatarios}`}
        </b>{" "}
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].MensajeParteDos}{" "}
        <b>{informacionArchivo.NombreAgencia || "N/A"}</b>,{" "}
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR[Idioma].MensajeParteTres}
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
          : `${DICCIONARIO_BOTONES[Idioma].Seleccionar}`}
      </label>
      {mostrarError && (
        <span className="ModalSubirArchivo__Contenido--Archivo--MensajeDeError">
          {DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Archivo}
        </span>
      )}
      <button className="ModalSubirArchivo__Contenido--Boton">
        {DICCIONARIO_BOTONES[Idioma].Subir}
      </button>
    </>
  );
}
