/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LAS AYUDAS
// import { FormatearFecha } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS COMPONENTES A USAR
import ModalConfirmacionMovimientos from "./ModalConfirmacionMovimientos";
import MensajeGeneral from "../MensajeGeneral";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Movimientos/ListaDeMovimientos.css";

export default function ListaDeMovimientos({
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
        Lista completa de movimientos
      </h1>
      <span className="ListaDeMovimientos__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder="Buscar por Estado, Detalles, Origen ó Status"
          onChange={BuscarMovimientos}
        />
        <span className="ListaDeMovimientos__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {movimientos.length > 0 ? (
        <>
          <small className="ListaDeMovimientos__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {movimientos.length} resultados{" "}
          </small>
          <div className="ListaDeMovimientos__Cuerpo">
            <table className="ListaDeMovimientos__Cuerpo__Tabla">
              <thead className="ListaDeMovimientos__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="bag-check"></ion-icon>
                    <br />
                    Estado
                  </th>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    Detalles
                  </th>
                  <th>
                    <ion-icon name="locate"></ion-icon>
                    <br />
                    Origen
                  </th>
                  <th>
                    <ion-icon name="radio-button-on"></ion-icon>
                    <br />
                    Por Defecto
                  </th>
                  {/* <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    Fecha y Hora
                  </th> */}
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    Acciones
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
                    {/* <td>
                      {FormatearFecha(
                        movimiento.FechaCreacionMovimiento.slice(0, 10)
                      )}{" "}
                      {movimiento.HoraCreacionMovimiento}
                    </td> */}
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
          Texto={"¡Oops! No se encontraron resultados."}
        />
      )}
    </div>
  );
}
