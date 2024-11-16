/* eslint-disable react/prop-types */
// IMPORTAMOS LAS AYUDAS
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

export default function ModalSubirArchivoSubiendo({ idioma }) {
  return (
    <section className="ModalSubirArchivo__Contenido--Subiendo">
      <div className="ModalSubirArchivo__Contenido--Subiendo--Barra"></div>
      <small className="ModalSubirArchivo__Contenido--Subiendo--Texto">
        {ListaDeIdiomas.ModalSubirArchivoSubiendo[idioma].Subiendo} <br />
        <b>
          {
            ListaDeIdiomas.ModalSubirArchivoSubiendo[idioma]
              .NoCierresEstaVentana
          }
        </b>
      </small>
    </section>
  );
}
