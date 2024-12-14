/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarMovimientosBodegaPorFiltro from "../../../../hooks/Bodega/Movimientos/useBuscarMovimientosBodegaPorFiltro";

// COMPONENTES A USAR
import Tabla from "../../../Tabla/Tabla";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA,
  DICCIONARIO_RESULTADOS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/ListaDeMovimientosEnBodega/ListaDeMovimientosEnBodegaCompleta.css";

export default function ListaDeMovimientosEnBodegaCompleta({
  Idioma,
  EstablecerLosDetallesDelMovimiento,
}) {
  const { movimientosBodega, cargando, filtro, establecerFiltro } =
    useBuscarMovimientosBodegaPorFiltro();

  const BuscarMovimientosEnBodega = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  const FormatearFechaDeLosMovimientos = () => {
    movimientosBodega.map(
      (movimiento) =>
        (movimiento.FechaCreacionMovimientoBodega = FormatearFecha(
          movimiento.FechaCreacionMovimientoBodega.slice(0, 10)
        ))
    );
    return movimientosBodega;
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaDeMovimientosEnBodegaCompleta">
      <h1 className="ListaDeMovimientosEnBodegaCompleta__Titulo">
        {
          DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma]
            .ListaCompletaDeMovimientos
        }
      </h1>
      <span className="ListaDeMovimientosEnBodegaCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma].BuscarMovimiento
          }
          onChange={BuscarMovimientosEnBodega}
        />
        <span className="ListaDeMovimientosEnBodegaCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {movimientosBodega.length > 0 ? (
        <>
          <small className="ListaDeMovimientosEnBodegaCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos}{" "}
            {movimientosBodega.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <Tabla
            ColorTabla="Negro"
            ContenidoTabla={FormatearFechaDeLosMovimientos()}
            EncabezadoTabla={[
              {
                Icono: "document-text",
                Texto:
                  DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma].idMovimientoB,
              },
              {
                Icono: "apps",
                Texto: DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma].CPedidos,
              },
              {
                Icono: "person-circle",
                Texto: DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma].Usuario,
              },
              {
                Icono: "calendar",
                Texto:
                  DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma].FechaCreacion,
              },
              {
                Icono: "code-working",
                Texto: DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[Idioma].Acciones,
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
                    Completa: true,
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
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
        />
      )}
    </div>
  );
}
