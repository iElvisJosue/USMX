/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarEntradasABodegaPorFiltro from "../../../../hooks/Bodega/Entradas/useBuscarEntradasABodegaPorFiltro";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_ENTRADAS_COMPLETA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/EntradasBodega/ListaDeTodasLasEntradas/ListaEntradasCompleta.css";

export default function ListaEntradasCompleta({
  Idioma,
  EstablecerLosDetallesDeLaEntrada,
}) {
  const { entradas, cargando, filtro, establecerFiltro } =
    useBuscarEntradasABodegaPorFiltro();

  const BuscarEntradas = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaEntradasCompleta">
      <h1 className="ListaEntradasCompleta__Titulo">
        {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].ListaCompletaDeEntradas}
      </h1>
      <span className="ListaEntradasCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].BuscarEntrada
          }
          onChange={BuscarEntradas}
        />
        <span className="ListaEntradasCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {entradas.length > 0 ? (
        <>
          <small className="ListaEntradasCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {entradas.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="ListaEntradasCompleta__Cuerpo">
            <table className="ListaEntradasCompleta__Cuerpo__Tabla">
              <thead className="ListaEntradasCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].idEntrada}
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].FechaCreacion}
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaEntradasCompleta__Cuerpo__Tabla__Cuerpo">
                {entradas.map((infEntrada, index) => (
                  <tr key={index}>
                    <td>{infEntrada.idEntradaBodega}</td>
                    <td>{infEntrada.CantidadEntradas}</td>
                    <td>{infEntrada.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        infEntrada.FechaCreacionEntrada.slice(0, 10)
                      )}{" "}
                      {infEntrada.HoraCreacionEntrada}
                    </td>
                    <td>
                      <button
                        className="ListaEntradasCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaEntrada(infEntrada, true)
                        }
                      >
                        {DICCIONARIO_BOTONES[Idioma].Ver}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Bodega-Entradas"}
          TextoBoton={DICCIONARIO_LISTA_ENTRADAS_COMPLETA[Idioma].CrearEntrada}
        />
      )}
    </div>
  );
}
