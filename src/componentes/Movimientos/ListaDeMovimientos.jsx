/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_LISTA_DE_MOVIMIENTOS,
  DICCIONARIO_RESULTADOS,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import ModalConfirmacionMovimientos from "./ModalConfirmacionMovimientos";
import MensajeGeneral from "../MensajeGeneral";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Movimientos/ListaDeMovimientos.css";

export default function ListaDeMovimientos({
  idioma,
  movimientos,
  establecerVista,
  filtro,
  establecerFiltro,
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
  informacionDelMovimiento,
  establecerInformacionDelMovimiento,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);

  const BuscarMovimientos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  const MostrarModalActivar = (infMovimiento) => {
    establecerInformacionDelMovimiento(infMovimiento);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infMovimiento) => {
    establecerInformacionDelMovimiento(infMovimiento);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };
  const EditarMovimiento = (infMovimiento) => {
    establecerInformacionDelMovimiento(infMovimiento);
    establecerVista(1);
  };

  return (
    <div className="ListaDeMovimientos">
      {mostrarModalConfirmacion && (
        <ModalConfirmacionMovimientos
          idioma={idioma}
          Activar={activar}
          movimientos={movimientos}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerMovimientosNuevamente={obtenerMovimientosNuevamente}
          establecerObtenerMovimientosNuevamente={
            establecerObtenerMovimientosNuevamente
          }
          informacionDelMovimiento={informacionDelMovimiento}
        />
      )}
      <h1 className="ListaDeMovimientos__Titulo">
        {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].ListaCompletaDeMovimientos}
      </h1>
      <span className="ListaDeMovimientos__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder={
            DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].BuscarMovimientos
          }
          onChange={BuscarMovimientos}
        />
        <span className="ListaDeMovimientos__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {movimientos.length > 0 ? (
        <>
          <small className="ListaDeMovimientos__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[idioma].Obtuvimos} {movimientos.length}{" "}
            {DICCIONARIO_RESULTADOS[idioma].Resultados}{" "}
          </small>
          <div className="ListaDeMovimientos__Cuerpo">
            <table className="ListaDeMovimientos__Cuerpo__Tabla">
              <thead className="ListaDeMovimientos__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="bag-check"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].Estado}
                  </th>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].Detalles}
                  </th>
                  <th>
                    <ion-icon name="locate"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].Origen}
                  </th>
                  <th>
                    <ion-icon name="radio-button-on"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].PorDefecto}
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].FechaCreacion}
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    {DICCIONARIO_LISTA_DE_MOVIMIENTOS[idioma].Acciones}
                  </th>
                </tr>
              </thead>
              <tbody className="ListaDeMovimientos__Cuerpo__Tabla__Cuerpo">
                {movimientos.map((movimiento) => (
                  <tr
                    key={movimiento.idListaMovimiento}
                    className={`ListaDeMovimientos__Cuerpo__Tabla__Cuerpo--TR ${
                      movimiento.ActivoMovimiento === "Activo"
                        ? ""
                        : "Desactivado"
                    }`}
                  >
                    <td>{movimiento.EstadoMovimiento.toUpperCase()}</td>
                    <td>{movimiento.DetallesMovimiento}</td>
                    <td>{movimiento.OrigenMovimiento}</td>
                    <td>{movimiento.PorDefectoMovimiento}</td>
                    <td>
                      {FormatearFecha(
                        movimiento.FechaCreacionMovimiento.slice(0, 10)
                      )}{" "}
                      {movimiento.HoraCreacionMovimiento}
                    </td>
                    <td className="ListaDeMovimientos__Cuerpo__Tabla__Cuerpo__Acciones">
                      {movimiento.ActivoMovimiento === "Activo" ? (
                        <>
                          <button
                            onClick={() => EditarMovimiento(movimiento)}
                            title="Editar Movimiento"
                          >
                            <ion-icon name="color-wand"></ion-icon>
                          </button>
                          <button>
                            <ion-icon
                              name="ban"
                              onClick={() => MostrarModalDesactivar(movimiento)}
                              title="Desactivar Movimiento"
                            ></ion-icon>
                          </button>
                        </>
                      ) : (
                        <button>
                          <ion-icon
                            name="power"
                            onClick={() => MostrarModalActivar(movimiento)}
                            title="Activar Movimiento"
                          ></ion-icon>
                        </button>
                      )}
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
        />
      )}
    </div>
  );
}
