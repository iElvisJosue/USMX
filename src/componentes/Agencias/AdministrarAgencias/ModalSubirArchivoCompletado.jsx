/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

// LOS ESTILOS ESTÁN EN ModalSubirArchivo.css
export default function ModalSubirArchivoCompletado({
  idioma,
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
        {ListaDeIdiomas.ModalSubirArchivoCompletado[idioma].MensajeParteUno}{" "}
        <b>
          {esRemitente
            ? `${ListaDeIdiomas.ModalSubirArchivoCompletado[idioma].Remitentes} `
            : `${ListaDeIdiomas.ModalSubirArchivoCompletado[idioma].Destinatarios} `}
        </b>
        {ListaDeIdiomas.ModalSubirArchivoCompletado[idioma].MensajeParteDos}
      </p>
      <button
        className="ModalSubirArchivo__Contenido--Completado--Boton"
        type="button"
        onClick={() => establecerContenidoModal(0)}
      >
        {ListaDeIdiomas.Botones[idioma].Regresar}
      </button>
    </section>
  );
}
