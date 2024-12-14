/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDevolucionesPorFecha from "../../../../hooks/Bodega/Devoluciones/useBuscarDevolucionesPorFecha";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA,
  DICCIONARIO_RESULTADOS,
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

  const FormatearFechaDeLasDevoluciones = () => {
    devolucionesPorFecha.map(
      (devolucion) =>
        (devolucion.FechaCreacionDevolucion = FormatearFecha(
          devolucion.FechaCreacionDevolucion.slice(0, 10)
        ))
    );
    return devolucionesPorFecha;
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
          <Tabla
            ColorTabla="Rojo"
            ContenidoTabla={FormatearFechaDeLasDevoluciones()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto:
                  DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].idDevolucion,
              },
              {
                Icono: "apps",
                Texto:
                  DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma]
                    .FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto:
                  DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idDevolucion",
              },
              {
                TextoUno: "CantidadDevoluciones",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionDevolucion",
                TextoDos: "HoraCreacionDevolucion",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDeLaDevolucion,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: false,
                    ColorBoton: "Rojo",
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
