/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

// LOS ESTILOS ESTÁN EN ModalSubirArchivo.css
export default function ModalSubirArchivoError({
  idioma,
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
        {ListaDeIdiomas.ModalSubirArchivoError[idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${ListaDeIdiomas.ModalSubirArchivoError[idioma].Remitentes} `
            : `${ListaDeIdiomas.ModalSubirArchivoError[idioma].Destinatarios} `}
        </b>
        {ListaDeIdiomas.ModalSubirArchivoError[idioma].MensajeParteDos}
      </p>
      <button
        className="ModalSubirArchivo__Contenido--Error--Boton"
        type="button"
        onClick={() => establecerContenidoModal(0)}
      >
        {ListaDeIdiomas.Botones[idioma].Regresar}
      </button>
    </section>
  );
}
