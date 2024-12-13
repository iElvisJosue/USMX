/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarSalidasABodegaPorFecha from "../../../../hooks/Bodega/Salidas/useBuscarSalidasABodegaPorFecha";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_SALIDAS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/SalidasBodega/ListaDeTodasLasSalidas/ListaSalidasPorFecha.css";

export default function ListaSalidasPorFecha({
  Idioma,
  EstablecerLosDetallesDeLaSalida,
}) {
  const {
    salidasPorFecha,
    cargandoSalidasPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarSalidasABodegaPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoSalidasPorFecha) return <Cargando />;

  return (
    <div className="ListaSalidasPorFecha">
      <h1 className="ListaSalidasPorFecha__Titulo">
        {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].BuscarSalidasPorFecha}
        <small className="ListaSalidasPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaSalidasPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaSalidasPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaSalidasPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {salidasPorFecha.length > 0 ? (
        <>
          <small className="ListaSalidasPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {salidasPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <div className="ListaSalidasPorFecha__Cuerpo">
            <table className="ListaSalidasPorFecha__Cuerpo__Tabla">
              <thead className="ListaSalidasPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].idSalida}
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].FechaCreacion}
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaSalidasPorFecha__Cuerpo__Tabla__Cuerpo">
                {salidasPorFecha.map((infSalida, index) => (
                  <tr key={index}>
                    <td>{infSalida.idSalidaBodega}</td>
                    <td>{infSalida.CantidadSalidas}</td>
                    <td>{infSalida.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        infSalida.FechaCreacionSalida.slice(0, 10)
                      )}{" "}
                      {infSalida.HoraCreacionSalida}
                    </td>
                    <td>
                      <button
                        className="ListaSalidasPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaSalida(infSalida)
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
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Bodega-Salidas"}
          TextoBoton={DICCIONARIO_LISTA_SALIDAS_POR_FECHA[Idioma].CrearSalida}
        />
      )}
    </div>
  );
}
