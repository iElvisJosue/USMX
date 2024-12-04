/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarEntradasABodegaPorFecha from "../../../../hooks/Bodega/Entradas/useBuscarEntradasABodegaPorFecha";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_ENTRADAS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/EntradasBodega/ListaDeTodasLasEntradas/ListaEntradasPorFecha.css";

export default function ListaEntradasPorFecha({
  idioma,
  EstablecerLosDetallesDeLaEntrada,
}) {
  const {
    entradasPorFecha,
    cargandoEntradasPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarEntradasABodegaPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoEntradasPorFecha) return <Cargando />;

  return (
    <div className="ListaEntradasPorFecha">
      <h1 className="ListaEntradasPorFecha__Titulo">
        {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].BuscarEntradasPorFecha}
        <small className="ListaEntradasPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaEntradasPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaEntradasPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaEntradasPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {entradasPorFecha.length > 0 ? (
        <>
          <small className="ListaEntradasPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos} {entradasPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaEntradasPorFecha__Cuerpo">
            <table className="ListaEntradasPorFecha__Cuerpo__Tabla">
              <thead className="ListaEntradasPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].idEntrada}
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].FechaCreacion}
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaEntradasPorFecha__Cuerpo__Tabla__Cuerpo">
                {entradasPorFecha.map((infEntrada, index) => (
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
                        className="ListaEntradasPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaEntrada(infEntrada, false)
                        }
                      >
                        {DICCIONARIO_BOTONES[idioma].Ver}
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
          Texto={`${
            DICCIONARIO_RESULTADOS[idioma].NoResultadoPorFecha
          } ${primeraFecha.split("-").reverse().join("/")} - ${segundaFecha
            .split("-")
            .reverse()
            .join("/")}.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Bodega-Entradas"}
          TextoBoton={DICCIONARIO_LISTA_ENTRADAS_POR_FECHA[idioma].CrearEntrada}
        />
      )}
    </div>
  );
}
