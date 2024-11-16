/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO } from "../../../diccionario/Diccionario";

export default function ModalSubirArchivoSubiendo({ idioma }) {
  return (
    <section className="ModalSubirArchivo__Contenido--Subiendo">
      <div className="ModalSubirArchivo__Contenido--Subiendo--Barra"></div>
      <small className="ModalSubirArchivo__Contenido--Subiendo--Texto">
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO[idioma].Subiendo} <br />
        <b>
          {
            DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO[idioma]
              .NoCierresEstaVentana
          }
        </b>
      </small>
    </section>
  );
}
