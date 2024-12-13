/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO } from "../../../diccionario/Diccionario";

export default function ModalSubirArchivoSubiendo({ Idioma }) {
  return (
    <section className="ModalSubirArchivo__Contenido--Subiendo">
      <div className="ModalSubirArchivo__Contenido--Subiendo--Barra"></div>
      <small className="ModalSubirArchivo__Contenido--Subiendo--Texto">
        {DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO[Idioma].Subiendo} <br />
        <b>
          {
            DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO[Idioma]
              .NoCierresEstaVentana
          }
        </b>
      </small>
    </section>
  );
}
