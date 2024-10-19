/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";
// import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPaisesPorFiltro from "../../hooks/useBuscarPaisesPorFiltro";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AdministrarPaises/ListaDePaises.css";

export default function ListaDePaises({
  establecerVista,
  establecerInformacionDeLaAgencia,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infPais, establecerinfPais] = useState(null);
  const {
    paises,
    cargandoPaises,
    establecerFiltroPaises,
    // obtenerPaisesNuevamente,
    // establecerObtenerPaisesNuevamente,
  } = useBuscarPaisesPorFiltro();
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
    if (paises) {
      const cantidadDePaginasEnPaises = Math.ceil(
        paises.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnPaises);
    }
  }, [paises]);

  const ObtenerLosPaises = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroPaises(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infPais) => {
    establecerinfPais(infPais);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infPais) => {
    establecerinfPais(infPais);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDeLaAgenciaSeleccionada = (infPais) => {
    establecerInformacionDeLaAgencia(infPais);
    establecerVista(1);
  };
  const EstablecerInformacionDeLaAgenciaAEditar = (infPais) => {
    establecerInformacionDeLaAgencia(infPais);
    establecerVista(2);
  };

  if (cargandoPaises) return <Cargando />;

  return (
    <div className="ListaDePaises">
      {/* {mostrarModalConfirmacion && (
        <ModalConfirmacionAgencias
          Activar={activar}
          infPais={infPais}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerAgenciasNuevamente={obtenerAgenciasNuevamente}
          establecerObtenerAgenciasNuevamente={
            establecerObtenerAgenciasNuevamente
          }
        />
      )} */}
      <h1 className="ListaDePaises__Titulo">Administrar Países</h1>
      <span className="ListaDePaises__Buscar">
        <input
          type="text"
          placeholder="Buscar país por nombre o código del país"
          onChange={ObtenerLosPaises}
        />
        <span className="ListaDePaises__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {paises.length > 0 ? (
        <>
          <small className="ListaDePaises__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos {paises.length}{" "}
            resultados{" "}
          </small>
          <h2 className="ListaDePaises__Clasificacion">
            Estatus de los países:
          </h2>
          <span className="ListaDePaises__Colores">
            <p className="ListaDePaises__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon> Activo
            </p>
            <p className="ListaDePaises__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          <div className="ListaDePaises__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDePaises__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < paises.length && (
              <button
                className="ListaDePaises__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {paises.slice(indiceInicial, indiceFinal).map((infPais) =>
            infPais.ActivoPais === "Activo" ? (
              <section className="ListaDePaises__Pais" key={infPais.idPais}>
                <span className="ListaDePaises__Pais__Detalles">
                  <ion-icon name="earth"></ion-icon>
                  <p>
                    {infPais.CodigoPais} | {infPais.NombrePais}
                  </p>
                </span>
                <span className="ListaDePaises__Pais__Opciones">
                  <button
                    className="ListaDePaises__Pais__Opciones--Boton Editar"
                    title="Editar país"
                    // onClick={() =>
                    //   EstablecerInformacionDeLaAgenciaAEditar(infPais)
                    // }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDePaises__Pais__Opciones--Boton Desactivar"
                    // onClick={() => MostrarModalDesactivar(infPais)}
                    title="Desactivar país"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDePaises__Pais Desactivada"
                key={infPais.idPais}
              >
                <span className="ListaDePaises__Pais__Detalles">
                  <ion-icon name="earth"></ion-icon>
                  <p>
                    {infPais.CodigoPais} | {infPais.NombrePais}
                  </p>
                </span>
                <span className="ListaDePaises__Pais__Opciones">
                  <button
                    className="ListaDePaises__Pais__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infPais)}
                    title="Activar país"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDePaises__TextoPaginas">
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
