/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Globales/Cargando";
import MensajeGeneral from "../../../Globales/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarMovimientosBodegaPorFecha from "../../../../hooks/Bodega/Movimientos/useBuscarMovimientosBodegaPorFecha";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/ListaDeMovimientosEnBodega/ListaDeMovimientosEnBodegaPorFecha.css";

export default function ListaDeMovimientosEnBodegaPorFecha({
  Idioma,
  EstablecerLosDetallesDelMovimiento,
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

  const FormatearFechaDeLosMovimientos = () => {
    movimientosPorFecha.map(
      (movimiento) =>
        (movimiento.FechaCreacionMovimientoBodega = FormatearFecha(
          movimiento.FechaCreacionMovimientoBodega.slice(0, 10)
        ))
    );
    return movimientosPorFecha;
  };

  if (cargandoMovimientosPorFecha) return <Cargando />;

  return (
    <div className="ListaDeMovimientosEnBodegaPorFecha">
      <h1 className="ListaDeMovimientosEnBodegaPorFecha__Titulo">
        {
          DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[Idioma]
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
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos}{" "}
            {movimientosPorFecha.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Negro"
            ContenidoTabla={FormatearFechaDeLosMovimientos()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto:
                  DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[Idioma].idMovimientoB,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA[Idioma].Acciones,
              },
            ]}
            FilasTabla={[
              {
                TextoUno: "idMovimientoBodega",
              },
              {
                TextoUno: "CantidadMovimientosEnBodega",
              },
              {
                TextoUno: "Usuario",
              },
              {
                TextoUno: "FechaCreacionMovimientoBodega",
                TextoDos: "HoraCreacionMovimientoBodega",
              },
              {
                Botones: [
                  {
                    FuncionBoton: EstablecerLosDetallesDelMovimiento,
                    IconoBoton: "eye",
                    TituloBoton: "Ver detalles",
                    Completa: false,
                    ColorBoton: "Negro",
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
