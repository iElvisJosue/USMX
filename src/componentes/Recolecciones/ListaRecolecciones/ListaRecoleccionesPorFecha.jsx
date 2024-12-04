/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarRecoleccionesPorFecha from "../../../hooks/Recolecciones/useBuscarRecoleccionesPorFecha";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Recolecciones/ListaRecolecciones/ListaRecoleccionesPorFecha.css";

export default function ListaRecoleccionesPorFecha({
  idioma,
  EstablecerLosDetallesDeLaRecoleccion,
}) {
  const {
    recoleccionesPorFecha,
    cargandoRecoleccionesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarRecoleccionesPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoRecoleccionesPorFecha) return <Cargando />;

  return (
    <div className="ListaRecoleccionesPorFecha">
      <h1 className="ListaRecoleccionesPorFecha__Titulo">
        {
          DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma]
            .BuscarRecoleccionesPorFecha
        }
        <small className="ListaRecoleccionesPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaRecoleccionesPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaRecoleccionesPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaRecoleccionesPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {recoleccionesPorFecha.length > 0 ? (
        <>
          <small className="ListaRecoleccionesPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos}{" "}
            {recoleccionesPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaRecoleccionesPorFecha__Cuerpo">
            <table className="ListaRecoleccionesPorFecha__Cuerpo__Tabla">
              <thead className="ListaRecoleccionesPorFecha__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma]
                        .idRecoleccion
                    }
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma]
                        .FechaCreacion
                    }
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaRecoleccionesPorFecha__Cuerpo__Tabla__Cuerpo">
                {recoleccionesPorFecha.map((recoleccion, index) => (
                  <tr key={index}>
                    <td>{recoleccion.idRecoleccion}</td>
                    <td>{recoleccion.CantidadRecoleccion}</td>
                    <td>{recoleccion.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        recoleccion.FechaCreacionRecoleccion.slice(0, 10)
                      )}{" "}
                      {recoleccion.HoraCreacionRecoleccion}
                    </td>
                    <td>
                      <button
                        className="ListaRecoleccionesPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDeLaRecoleccion(
                            recoleccion,
                            false
                          )
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
          UrlBoton={"/Recolecciones"}
          TextoBoton={
            DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[idioma].CrearRecoleccion
          }
        />
      )}
    </div>
  );
}
