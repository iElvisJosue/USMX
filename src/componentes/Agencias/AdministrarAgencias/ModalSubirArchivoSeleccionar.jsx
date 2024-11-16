/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

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
          {ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].Remitentes}
        </button>
        <button
          className="ModalSubirArchivo__Contenido--Opciones--Boton"
          type="button"
          onClick={() => establecerEsRemitente(false)}
        >
          <ion-icon name="location"></ion-icon>
          {ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].Destinatarios}
        </button>
      </section>
      <h1 className="ModalSubirArchivo__Contenido--Titulo">
        {
          ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma]
            .SeleccionarArchivos
        }
      </h1>
      <picture className="ModalSubirArchivo__Contenido--Imagen">
        <img src="SubirExcel.png" alt="Icono de subir excel" />
      </picture>
      <small className="ModalSubirArchivo__Contenido--Texto">
        {ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].Remitentes}`
            : `${ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].Destinatarios}`}
        </b>{" "}
        {ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].MensajeParteDos}{" "}
        <b>{informacionArchivo.NombreAgencia || "N/A"}</b>,{" "}
        {ListaDeIdiomas.ModalSubirArchivoSeleccionar[idioma].MensajeParteTres}
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
          : `${ListaDeIdiomas.Botones[idioma].Seleccionar}`}
      </label>
      {mostrarError && (
        <span className="ModalSubirArchivo__Contenido--Archivo--MensajeDeError">
          {ListaDeIdiomas.MensajesDeError[idioma].Archivo}
        </span>
      )}
      <button className="ModalSubirArchivo__Contenido--Boton">
        {ListaDeIdiomas.Botones[idioma].Subir}
      </button>
    </>
  );
}
