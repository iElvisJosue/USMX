/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";
// import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarEstadosPorFiltro from "../../../../hooks/useBuscarEstadosPorFiltro";
import usePaginacion from "../../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Ubicaciones/Estados/AdministrarEstados/ListaDeEstados.css";

export default function ListaDeEstados({
  establecerVistaEstado,
  establecerInformacionDelEstado,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infEstado, establecerinfEstado] = useState(null);
  const {
    estados,
    cargandoEstados,
    establecerFiltroEstados,
    // obtenerEstadosNuevamente,
    // establecerObtenerEstadosNuevamente,
  } = useBuscarEstadosPorFiltro();
  const {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  } = usePaginacion();

  useEffect(() => {
    if (estados) {
      const cantidadDePaginasEnEstados = Math.ceil(
        estados.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnEstados);
    }
  }, [estados]);

  const ObtenerLosEstados = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroEstados(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infEstado) => {
    establecerinfEstado(infEstado);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infEstado) => {
    establecerinfEstado(infEstado);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const establecerInformacionDelEstadoSeleccionada = (infEstado) => {
    establecerInformacionDelEstado(infEstado);
    establecerVistaEstado(1);
  };
  const establecerInformacionDelEstadoAEditar = (infEstado) => {
    establecerInformacionDelEstado(infEstado);
    establecerVistaEstado(2);
  };

  if (cargandoEstados) return <Cargando />;

  return (
    <div className="ListaDeEstados">
      {/* {mostrarModalConfirmacion && (
        <ModalConfirmacionAgencias
          Activar={activar}
          infEstado={infEstado}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerAgenciasNuevamente={obtenerAgenciasNuevamente}
          establecerObtenerAgenciasNuevamente={
            establecerObtenerAgenciasNuevamente
          }
        />
      )} */}
      <h1 className="ListaDeEstados__Titulo">Administrar Estados</h1>
      <span className="ListaDeEstados__Buscar">
        <input
          type="text"
          placeholder="Buscar estado por nombre o código de país"
          onChange={ObtenerLosEstados}
        />
        <span className="ListaDeEstados__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {estados.length > 0 ? (
        <>
          <small className="ListaDeEstados__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos {estados.length}{" "}
            resultados{" "}
          </small>
          <h2 className="ListaDeEstados__Clasificacion">
            Estatus de los estados:
          </h2>
          <span className="ListaDeEstados__Colores">
            <p className="ListaDeEstados__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon> Activo
            </p>
            <p className="ListaDeEstados__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          <div className="ListaDeEstados__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeEstados__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < estados.length && (
              <button
                className="ListaDeEstados__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {estados.slice(indiceInicial, indiceFinal).map((infEstado) =>
            infEstado.ActivoEstado === "Activo" ? (
              <section
                className="ListaDeEstados__Estado"
                key={infEstado.idEstado}
              >
                <span className="ListaDeEstados__Estado__Detalles">
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infEstado.CodigoPais} | {infEstado.NombreEstado}
                  </p>
                </span>
                <span className="ListaDeEstados__Estado__Opciones">
                  <button
                    className="ListaDeEstados__Estado__Opciones--Boton Editar"
                    title="Editar estado"
                    // onClick={() =>
                    //   establecerInformacionDelEstadoAEditar(infEstado)
                    // }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeEstados__Estado__Opciones--Boton Desactivar"
                    // onClick={() => MostrarModalDesactivar(infEstado)}
                    title="Desactivar estado"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDeEstados__Estado Desactivada"
                key={infEstado.idEstado}
              >
                <span className="ListaDeEstados__Estado__Detalles">
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infEstado.CodigoPais} | {infEstado.NombrePais}
                  </p>
                </span>
                <span className="ListaDeEstados__Estado__Opciones">
                  <button
                    className="ListaDeEstados__Estado__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infEstado)}
                    title="Activar estado"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeEstados__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
        />
      )}
    </div>
  );
}
