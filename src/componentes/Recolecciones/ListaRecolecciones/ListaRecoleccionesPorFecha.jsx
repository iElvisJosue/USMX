/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarRecoleccionesPorFecha from "../../../hooks/Recolecciones/useBuscarRecoleccionesPorFecha";

// COMPONENTES A USAR
import Tabla from "../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA,
  DICCIONARIO_RESULTADOS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Recolecciones/ListaRecolecciones/ListaRecoleccionesPorFecha.css";

export default function ListaRecoleccionesPorFecha({
  Idioma,
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

  const FormatearFechaDeLasRecolecciones = () => {
    recoleccionesPorFecha.map(
      (recoleccion) =>
        (recoleccion.FechaCreacionRecoleccion = FormatearFecha(
          recoleccion.FechaCreacionRecoleccion.slice(0, 10)
        ))
    );
    return recoleccionesPorFecha;
  };

  if (cargandoRecoleccionesPorFecha) return <Cargando />;

  return (
    <div className="ListaRecoleccionesPorFecha">
      <h1 className="ListaRecoleccionesPorFecha__Titulo">
        {
          DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[Idioma]
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
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos}{" "}
            {recoleccionesPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ContenidoTabla={FormatearFechaDeLasRecolecciones()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[Idioma]
                    .idRecoleccion,
              },
              {
                Icono: "apps",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[Idioma]
                    .FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto:
                  DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idRecoleccion",
              },
              {
                TextoUno: "CantidadRecoleccion",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionRecoleccion",
                TextoDos: "HoraCreacionRecoleccion",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDeLaRecoleccion,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: false,
                  },
                ],
              },
            ]}
          />
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
