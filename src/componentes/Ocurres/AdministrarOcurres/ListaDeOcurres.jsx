/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacionOcurres from "./ModalConfirmacionOcurres";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOcurresPorFiltro from "../../../hooks/useBuscarOcurresPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ocurres/AdministrarOcurres/ListaDeOcurres.css";

export default function ListaDeOcurres({
  establecerVistaOcurres,
  establecerInformacionDelOcurre,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infOcurre, establecerInfOcurre] = useState(null);
  const {
    ocurres,
    cargandoOcurres,
    establecerFiltroOcurres,
    obtenerOcurresNuevamente,
    establecerObtenerOcurresNuevamente,
  } = useBuscarOcurresPorFiltro();
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
    if (ocurres) {
      const cantidadDePaginasEnOcurres = Math.ceil(
        ocurres.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnOcurres);
    }
  }, [ocurres]);

  const ObtenerLasOcurrencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroOcurres(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infOcurre) => {
    establecerInfOcurre(infOcurre);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infOcurre) => {
    establecerInfOcurre(infOcurre);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };
  const EstablecerInformacionDelOcurreAEditar = (infOcurre) => {
    establecerInformacionDelOcurre(infOcurre);
    establecerVistaOcurres(1);
  };

  if (cargandoOcurres) return <Cargando />;

  return (
    <div className="ListaDeOcurres">
      {mostrarModalConfirmacion && (
        <ModalConfirmacionOcurres
          Activar={activar}
          infOcurre={infOcurre}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerOcurresNuevamente={obtenerOcurresNuevamente}
          establecerObtenerOcurresNuevamente={
            establecerObtenerOcurresNuevamente
          }
        />
      )}
      <h1 className="ListaDeOcurres__Titulo">Administrar ocurres</h1>
      <span className="ListaDeOcurres__Buscar">
        <input
          type="text"
          placeholder="Buscar ocurre"
          onChange={ObtenerLasOcurrencias}
        />
        <span className="ListaDeOcurres__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ocurres.length > 0 ? (
        <>
          <small className="ListaDeOcurres__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos {ocurres.length}{" "}
            resultados{" "}
          </small>
          <h2 className="ListaDeOcurres__Clasificacion">
            Estatus de los ocurres:
          </h2>
          <span className="ListaDeOcurres__Colores">
            <p className="ListaDeOcurres__Clasificacion--Texto Activa">
              <ion-icon name="alert-circle"></ion-icon> Activo
            </p>
            <p className="ListaDeOcurres__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          <div className="ListaDeOcurres__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeOcurres__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < ocurres.length && (
              <button
                className="ListaDeOcurres__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {ocurres.slice(indiceInicial, indiceFinal).map((infOcurre) =>
            infOcurre.StatusOcurre === "Activa" ? (
              <section
                className="ListaDeOcurres__Ocurre"
                key={infOcurre.idOcurre}
              >
                <span className="ListaDeOcurres__Ocurre__Detalles">
                  <ion-icon name="alert-circle"></ion-icon>
                  <p>{infOcurre.NombreOcurre}</p>
                  <ion-icon name="earth"></ion-icon>
                  <p>{infOcurre.PaisOcurre}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infOcurre.EstadoOcurre}, {infOcurre.CiudadOcurre},{" "}
                    {infOcurre.DireccionOcurre} {infOcurre.CodigoPostalOcurre}
                  </p>
                  <ion-icon name="business"></ion-icon>
                  <p>{infOcurre.OperadorLogisticoOcurre}</p>
                </span>
                <span className="ListaDeOcurres__Ocurre__Opciones">
                  <button
                    className="ListaDeOcurres__Ocurre__Opciones--Boton Editar"
                    title="Editar ocurre"
                    onClick={() =>
                      EstablecerInformacionDelOcurreAEditar(infOcurre)
                    }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeOcurres__Ocurre__Opciones--Boton Desactivar"
                    onClick={() => MostrarModalDesactivar(infOcurre)}
                    title="Desactivar ocurre"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDeOcurres__Ocurre Desactivada"
                key={infOcurre.idOcurre}
              >
                <span className="ListaDeOcurres__Ocurre__Detalles">
                  <ion-icon name="alert-circle"></ion-icon>
                  <p>{infOcurre.NombreOcurre}</p>
                  <ion-icon name="earth"></ion-icon>
                  <p>{infOcurre.PaisOcurre}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infOcurre.EstadoOcurre}, {infOcurre.CiudadOcurre},{" "}
                    {infOcurre.DireccionOcurre} {infOcurre.CodigoPostalOcurre}
                  </p>
                  <ion-icon name="business"></ion-icon>
                  <p>{infOcurre.OperadorLogisticoOcurre}</p>
                </span>
                <span className="ListaDeOcurres__Ocurre__Opciones">
                  <button
                    className="ListaDeOcurres__Ocurre__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infOcurre)}
                    title="Activar ocurre"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeOcurres__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Ocurres"}
          TextoBoton={"Registrar Ocurre"}
        />
      )}
    </div>
  );
}
