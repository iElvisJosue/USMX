/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import {
  DICCIONARIO_MODAL_SUBIR_ARCHIVO_COMPLETADO,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// LOS ESTILOS ESTÁN EN ModalSubirArchivo.css
export default function ModalSubirArchivoCompletado({
  Idioma,
  esRemitente,
  establecerContenidoModal,
}) {
  return (
    <section className="ModalSubirArchivo__Contenido--Completado">
      <img
        src="SubidaCompletada.png"
        alt="Imagen de subida completada"
        className="ModalSubirArchivo__Contenido--Completado--Imagen"
      />
      <p className="ModalSubirArchivo__Contenido--Completado--Texto">
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_COMPLETADO[Idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_COMPLETADO[Idioma].Remitentes} `
            : `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_COMPLETADO[Idioma].Destinatarios} `}
        </b>
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_COMPLETADO[Idioma].MensajeParteDos}
      </p>
      <button
        className="ModalSubirArchivo__Contenido--Completado--Boton"
        type="button"
        onClick={() => establecerContenidoModal(0)}
      >
        {DICCIONARIO_BOTONES[Idioma].Regresar}
      </button>
    </section>
  );
}
