/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";
// import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarColoniasPorFiltro from "../../../../hooks/useBuscarColoniasPorFiltro";
import usePaginacion from "../../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Ubicaciones/Colonias/AdministrarColonias/ListaDeColonias.css";

export default function ListaDeColonias({
  establecerVistaColonia,
  establecerInformacionDeLaColonia,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infColonia, establecerinfColonia] = useState(null);
  const {
    colonias,
    cargandoColonias,
    establecerFiltroColonias,
    // obtenerColoniasNuevamente,
    // establecerObtenerColoniasNuevamente,
  } = useBuscarColoniasPorFiltro();
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
    if (colonias) {
      const cantidadDePaginasEnColonias = Math.ceil(
        colonias.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnColonias);
    }
  }, [colonias]);

  const ObtenerLasColonias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroColonias(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infColonia) => {
    establecerinfColonia(infColonia);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infColonia) => {
    establecerinfColonia(infColonia);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDeLaColoniaSeleccionada = (infColonia) => {
    establecerInformacionDeLaColonia(infColonia);
    establecerVistaColonia(1);
  };
  const EstablecerInformacionDeLaColoniaAEditar = (infColonia) => {
    establecerInformacionDeLaColonia(infColonia);
    establecerVistaColonia(2);
  };

  if (cargandoColonias) return <Cargando />;

  return (
    <div className="ListaDeColonias">
      {/* {mostrarModalConfirmacion && (
        <ModalConfirmacionAgencias
          Activar={activar}
          infColonia={infColonia}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerAgenciasNuevamente={obtenerAgenciasNuevamente}
          establecerObtenerAgenciasNuevamente={
            establecerObtenerAgenciasNuevamente
          }
        />
      )} */}
      <h1 className="ListaDeColonias__Titulo">Administrar colonias</h1>
      <span className="ListaDeColonias__Buscar">
        <input
          type="text"
          placeholder="Buscar colonia por nombre o estado"
          onChange={ObtenerLasColonias}
        />
        <span className="ListaDeColonias__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {colonias.length > 0 ? (
        <>
          <small className="ListaDeColonias__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {colonias.length} resultados{" "}
          </small>
          <h2 className="ListaDeColonias__Clasificacion">
            Estatus de las colonias:
          </h2>
          <span className="ListaDeColonias__Colores">
            <p className="ListaDeColonias__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon> Activa
            </p>
            <p className="ListaDeColonias__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
          <div className="ListaDeColonias__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeColonias__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < colonias.length && (
              <button
                className="ListaDeColonias__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {colonias.slice(indiceInicial, indiceFinal).map((infColonia) =>
            infColonia.ActivaColonia === "Activa" ? (
              <section
                className="ListaDeColonias__Colonia"
                key={infColonia.idColonia}
              >
                <span className="ListaDeColonias__Colonia__Detalles">
                  <ion-icon name="trail-sign"></ion-icon>
                  <p>{infColonia.NombreColonia}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infColonia.PaisColonia}
                    <br />
                    {infColonia.NombreRegionDosColonia},{" "}
                    {infColonia.NombreRegionUnoColonia}
                  </p>
                </span>
                <span className="ListaDeColonias__Colonia__Opciones">
                  <button
                    className="ListaDeColonias__Colonia__Opciones--Boton Editar"
                    title="Editar colonia"
                    // onClick={() =>
                    //   EstablecerInformacionDeLaColoniaAEditar(infColonia)
                    // }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeColonias__Colonia__Opciones--Boton Desactivar"
                    // onClick={() => MostrarModalDesactivar(infColonia)}
                    title="Desactivar colonia"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDeColonias__Colonia Desactivada"
                key={infColonia.idColonia}
              >
                <span className="ListaDeColonias__Colonia__Detalles">
                  <ion-icon name="trail-sign"></ion-icon>
                  <p>{infColonia.NombreColonia}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infColonia.PaisColonia}
                    <br />
                    {infColonia.NombreRegionDosColonia},{" "}
                    {infColonia.NombreRegionUnoColonia}
                  </p>
                </span>
                <span className="ListaDeColonias__Colonia__Opciones">
                  <button
                    className="ListaDeColonias__Colonia__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infColonia)}
                    title="Activar colonia"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeColonias__TextoPaginas">
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
