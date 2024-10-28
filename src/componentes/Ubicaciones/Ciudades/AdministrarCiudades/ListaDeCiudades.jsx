/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../Cargando";
import MensajeGeneral from "../../../MensajeGeneral";
// import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarCiudadesPorFiltro from "../../../../hooks/useBuscarCiudadesPorFiltro";
import usePaginacion from "../../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../../estilos/componentes/Ubicaciones/Ciudades/AdministrarCiudades/ListaDeCiudades.css";

export default function ListaDeCiudades({
  establecerVistaCiudad,
  establecerInformacionDeLaCiudad,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infCiudad, establecerinfCiudad] = useState(null);
  const {
    ciudades,
    cargandoCiudades,
    establecerFiltroCiudades,
    // obtenerCiudadesNuevamente,
    // establecerObtenerCiudadesNuevamente,
  } = useBuscarCiudadesPorFiltro();
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
    if (ciudades) {
      const cantidadDePaginasEnCiudades = Math.ceil(
        ciudades.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnCiudades);
    }
  }, [ciudades]);

  const ObtenerLasCiudades = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroCiudades(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infCiudad) => {
    establecerinfCiudad(infCiudad);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infCiudad) => {
    establecerinfCiudad(infCiudad);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const establecerInformacionDeLaCiudadSeleccionada = (infCiudad) => {
    establecerInformacionDeLaCiudad(infCiudad);
    establecerVistaCiudad(1);
  };
  const establecerInformacionDeLaCiudadAEditar = (infCiudad) => {
    establecerInformacionDeLaCiudad(infCiudad);
    establecerVistaCiudad(2);
  };

  if (cargandoCiudades) return <Cargando />;

  return (
    <div className="ListaDeCiudades">
      {/* {mostrarModalConfirmacion && (
        <ModalConfirmacionAgencias
          Activar={activar}
          infCiudad={infCiudad}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerAgenciasNuevamente={obtenerAgenciasNuevamente}
          establecerObtenerAgenciasNuevamente={
            establecerObtenerAgenciasNuevamente
          }
        />
      )} */}
      <h1 className="ListaDeCiudades__Titulo">Administrar Ciudades</h1>
      <span className="ListaDeCiudades__Buscar">
        <input
          type="text"
          placeholder="Buscar ciudad por nombre"
          onChange={ObtenerLasCiudades}
        />
        <span className="ListaDeCiudades__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ciudades.length > 0 ? (
        <>
          <small className="ListaDeCiudades__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {ciudades.length} resultados{" "}
          </small>
          <h2 className="ListaDeCiudades__Clasificacion">
            Estatus de las ciudades:
          </h2>
          <span className="ListaDeCiudades__Colores">
            <p className="ListaDeCiudades__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon> Activo
            </p>
            <p className="ListaDeCiudades__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
          <div className="ListaDeCiudades__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeCiudades__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < ciudades.length && (
              <button
                className="ListaDeCiudades__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {ciudades.slice(indiceInicial, indiceFinal).map((infCiudad) =>
            infCiudad.ActivaCiudad === "Activa" ? (
              <section
                className="ListaDeCiudades__Ciudad"
                key={infCiudad.idCiudad}
              >
                <span className="ListaDeCiudades__Ciudad__Detalles">
                  <ion-icon name="locate"></ion-icon>
                  <p>
                    {infCiudad.NombreEstado} | {infCiudad.NombreCiudad}
                  </p>
                </span>
                <span className="ListaDeCiudades__Ciudad__Opciones">
                  <button
                    className="ListaDeCiudades__Ciudad__Opciones--Boton Editar"
                    title="Editar ciudad"
                    // onClick={() =>
                    //   establecerInformacionDeLaCiudadAEditar(infCiudad)
                    // }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeCiudades__Ciudad__Opciones--Boton Desactivar"
                    // onClick={() => MostrarModalDesactivar(infCiudad)}
                    title="Desactivar ciudad"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDeCiudades__Ciudad Desactivada"
                key={infCiudad.idCiudad}
              >
                <span className="ListaDeCiudades__Ciudad__Detalles">
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infCiudad.NombreEstado} | {infCiudad.NombreCiudad}
                  </p>
                </span>
                <span className="ListaDeCiudades__Ciudad__Opciones">
                  <button
                    className="ListaDeCiudades__Ciudad__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infCiudad)}
                    title="Activar ciudad"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeCiudades__TextoPaginas">
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
