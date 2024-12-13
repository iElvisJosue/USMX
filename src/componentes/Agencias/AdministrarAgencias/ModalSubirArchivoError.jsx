/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import {
  DICCIONARIO_MODAL_SUBIR_ARCHIVO_ERROR,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// LOS ESTILOS ESTÁN EN ModalSubirArchivo.css
export default function ModalSubirArchivoError({
  Idioma,
  esRemitente,
  establecerContenidoModal,
}) {
  return (
    <section className="ModalSubirArchivo__Contenido--Error">
      <img
        src="SubidaError.png"
        alt="Imagen de subida no completada"
        className="ModalSubirArchivo__Contenido--Error--Imagen"
      />
      <p className="ModalSubirArchivo__Contenido--Error--Texto">
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_ERROR[Idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_ERROR[Idioma].Remitentes} `
            : `${DICCIONARIO_MODAL_SUBIR_ARCHIVO_ERROR[Idioma].Destinatarios} `}
        </b>
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_ERROR[Idioma].MensajeParteDos}
      </p>
      <button
        className="ModalSubirArchivo__Contenido--Error--Boton"
        type="button"
        onClick={() => establecerContenidoModal(0)}
      >
        {DICCIONARIO_BOTONES[Idioma].Regresar}
      </button>
    </section>
  );
}
