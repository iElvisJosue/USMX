/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarMovimientosBodegaPorFiltro from "../../../../hooks/Bodega/Movimientos/useBuscarMovimientosBodegaPorFiltro";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_BOTONES,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Bodega/MovimientosEnBodega/ListaDeMovimientosEnBodega/ListaDeMovimientosEnBodegaCompleta.css";

export default function ListaDeMovimientosEnBodegaCompleta({
  idioma,
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

  if (cargando) return <Cargando />;

  return (
    <div className="ListaDeMovimientosEnBodegaCompleta">
      <h1 className="ListaDeMovimientosEnBodegaCompleta__Titulo">
        {
          DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma]
            .ListaCompletaDeMovimientos
        }
      </h1>
      <span className="ListaDeMovimientosEnBodegaCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma].BuscarMovimiento
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
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos}{" "}
            {movimientosBodega.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaDeMovimientosEnBodegaCompleta__Cuerpo">
            <table className="ListaDeMovimientosEnBodegaCompleta__Cuerpo__Tabla">
              <thead className="ListaDeMovimientosEnBodegaCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma]
                        .idMovimientoB
                    }
                  </th>
                  <th>
                    <ion-icon name="apps"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma].CPedidos}
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma].Usuario}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {
                      DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma]
                        .FechaCreacion
                    }
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaDeMovimientosEnBodegaCompleta__Cuerpo__Tabla__Cuerpo">
                {movimientosBodega.map((movBodega, index) => (
                  <tr key={index}>
                    <td>{movBodega.idMovimientoBodega}</td>
                    <td>{movBodega.CantidadMovimientosEnBodega}</td>
                    <td>{movBodega.Usuario}</td>
                    <td>
                      {FormatearFecha(
                        movBodega.FechaCreacionMovimientoBodega.slice(0, 10)
                      )}{" "}
                      {movBodega.HoraCreacionMovimientoBodega}
                    </td>
                    <td>
                      <button
                        className="ListaDeMovimientosEnBodegaCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDelMovimiento(movBodega, true)
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
          Texto={DICCIONARIO_RESULTADOS[idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Bodega-Movimientos"}
          TextoBoton={
            DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA[idioma].CrearMovimiento
          }
        />
      )}
    </div>
  );
}
