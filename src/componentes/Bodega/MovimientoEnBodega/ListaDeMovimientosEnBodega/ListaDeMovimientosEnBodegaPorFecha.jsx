/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarMovimientosBodegaPorFecha from "../../../../hooks/Bodega/Movimientos/useBuscarMovimientosBodegaPorFecha";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
  // DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/ListaDeMovimientosEnBodega/ListaDeMovimientosEnBodegaPorFecha.css";

export default function ListaDeMovimientosEnBodegaPorFecha({
  idioma,
  // EstablecerLosDetallesDelMovimiento,
}) {
  const {
    movimientosPorFecha,
    cargandoMovimientosPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarMovimientosBodegaPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoMovimientosPorFecha) return <Cargando />;

  return (
    <div className="ListaDeMovimientosEnBodegaPorFecha">
      <h1 className="ListaDeMovimientosEnBodegaPorFecha__Titulo">
        {
          DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[idioma]
            .BuscarMovimientosPorFecha
        }
        <small className="ListaDeMovimientosEnBodegaPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaDeMovimientosEnBodegaPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaDeMovimientosEnBodegaPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaDeMovimientosEnBodegaPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {movimientosPorFecha.length > 0 ? (
        <>
          <small className="ListaDeMovimientosEnBodegaPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos}{" "}
            {movimientosPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaDeMovimientosEnBodegaPorFecha__Cuerpo">
            <table className="ListaDeMovimientosEnBodegaPorFecha__Cuerpo__Tabla">
              <thead className="ListaDeMovimientosEnBodegaPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[idioma]
                        .idMovimientoB
                    }
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[idioma]
                        .FechaCreacion
                    }
                  </th>
                </tr>
              </thead>
              <tbody className="ListaDeMovimientosEnBodegaPorFecha__Cuerpo__Tabla__Cuerpo">
                {movimientosPorFecha.map((infMovimiento, index) => (
                  <tr key={index}>
                    <td>{infMovimiento.idMovimientoBodega}</td>
                    <td>{infMovimiento.CantidadMovimientosEnBodega}</td>
                    <td>{infMovimiento.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        infMovimiento.FechaCreacionMovimientoBodega.slice(0, 10)
                      )}{" "}
                      {infMovimiento.HoraCreacionMovimientoBodega}
                    </td>
                    {/* <td>
                      <button
                        className="ListaDeMovimientosEnBodegaPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDelMovimiento(infMovimiento)
                        }
                      >
                        {DICCIONARIO_BOTONES[idioma].Ver}
                      </button>
                    </td> */}
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
          UrlBoton={"/Bodega-Movimientos"}
          TextoBoton={
            DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[idioma].CrearMovimiento
          }
        />
      )}
    </div>
  );
}
