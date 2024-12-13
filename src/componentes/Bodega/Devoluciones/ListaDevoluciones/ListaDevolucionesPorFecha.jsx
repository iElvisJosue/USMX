/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDevolucionesPorFecha from "../../../../hooks/Bodega/Devoluciones/useBuscarDevolucionesPorFecha";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/Devoluciones/ListaDevoluciones/ListaDevolucionesPorFecha.css";

export default function ListaDevolucionesPorFecha({
  Idioma,
  EstablecerLosDetallesDeLaDevolucion,
}) {
  const {
    devolucionesPorFecha,
    cargandoDevolucionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarDevolucionesPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoDevolucionesPorFecha) return <Cargando />;

  return (
    <div className="ListaDevolucionesPorFecha">
      <h1 className="ListaDevolucionesPorFecha__Titulo">
        {
          DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma]
            .BuscarDevolucionesPorFecha
        }
        <small className="ListaDevolucionesPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaDevolucionesPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaDevolucionesPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaDevolucionesPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {devolucionesPorFecha.length > 0 ? (
        <>
          <small className="ListaDevolucionesPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos}{" "}
            {devolucionesPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="ListaDevolucionesPorFecha__Cuerpo">
            <table className="ListaDevolucionesPorFecha__Cuerpo__Tabla">
              <thead className="ListaDevolucionesPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma]
                        .idDevolucion
                    }
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma]
                        .FechaCreacion
                    }
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaDevolucionesPorFecha__Cuerpo__Tabla__Cuerpo">
                {devolucionesPorFecha.map((devolucion, index) => (
                  <tr key={index}>
                    <td>{devolucion.idDevolucion}</td>
                    <td>{devolucion.CantidadDevoluciones}</td>
                    <td>{devolucion.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        devolucion.FechaCreacionDevolucion.slice(0, 10)
                      )}{" "}
                      {devolucion.HoraCreacionDevolucion}
                    </td>
                    <td>
                      <button
                        className="ListaDevolucionesPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaDevolucion(devolucion, false)
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
          Texto={`${
            DICCIONARIO_RESULTADOS[Idioma].NoResultadoPorFecha
          } ${primeraFecha.split("-").reverse().join("/")} - ${segundaFecha
            .split("-")
            .reverse()
            .join("/")}.`}
        />
      )}
    </div>
  );
}
