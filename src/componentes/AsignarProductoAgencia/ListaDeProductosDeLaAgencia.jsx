/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERías A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import MensajeGeneral from "../MensajeGeneral";
import Cargando from "../Cargando";
import ModalInformacionDelProducto from "./ModalInformacionDelProducto";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarProductosAsignadosYNoAsignadosPorAgencia from "../../hooks/useBuscarProductosAsignadosYNoAsignadosPorAgencia";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AsignarProductoAgencia/ListaDeProductosDeLaAgencia.css";

export default function ListaDeProductosDeLaAgencia({
  agencia,
  establecerPaso,
}) {
  const { DesasignarProductoAgencia } = useAgencias();
  const [informacionDelProducto, establecerInformacionDelProducto] =
    useState(null);
  const [mostrarModal, establecerMostrarModal] = useState(false);
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

  const {
    productosAsignadosYNoAsignadosPorAgencia,
    cargandoProductosAsignadosYNoAsignadosPorAgencia,
    filtroProductosAsignadosYNoAsignadosPorAgencia,
    establecerFiltroProductosAsignadosYNoAsignadosPorAgencia,
    buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
    establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  } = useBuscarProductosAsignadosYNoAsignadosPorAgencia(agencia.idAgencia);

  useEffect(() => {
    if (productosAsignadosYNoAsignadosPorAgencia) {
      const { ProductosNoAsignados } = productosAsignadosYNoAsignadosPorAgencia;
      const cantidadDePaginasEnProductos = Math.ceil(
        ProductosNoAsignados.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnProductos);
    }
  }, [productosAsignadosYNoAsignadosPorAgencia]);

  const obtenerProductos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroProductosAsignadosYNoAsignadosPorAgencia(
        valorIntroducido
      );
      reiniciarValores();
    }
  };

  const MostrarModalYAsignarProducto = (infProducto, Editable) => {
    infProducto.Editable = Editable;
    establecerMostrarModal(true);
    establecerInformacionDelProducto(infProducto);
  };

  const PeticionDesasignarProductoAgencia = async (
    idUnionAgenciasProductos
  ) => {
    try {
      const res = await DesasignarProductoAgencia({
        CookieConToken: COOKIE_CON_TOKEN,
        idUnionAgenciasProductos,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia(
          !buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
        );
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  if (cargandoProductosAsignadosYNoAsignadosPorAgencia) return <Cargando />;

  const { ProductosAsignados, ProductosNoAsignados } =
    productosAsignadosYNoAsignadosPorAgencia;

  return (
    <div className="ListaDeProductosDeLaAgencia">
      {mostrarModal && (
        <ModalInformacionDelProducto
          agencia={agencia}
          informacionDelProducto={informacionDelProducto}
          establecerMostrarModal={establecerMostrarModal}
          buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia={
            buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
          }
          establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia={
            establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
          }
        />
      )}
      <span className="ListaDeProductosDeLaAgencia__Regresar">
        <button
          className="ListaDeProductosDeLaAgencia__Regresar__Boton"
          onClick={() => establecerPaso(0)}
        >
          <ion-icon name="arrow-back"></ion-icon> Regresar
        </button>
        <small className="ListaDeProductosDeLaAgencia__Regresar__Usuario">
          Agencia seleccionada: <b>{agencia.NombreAgencia.toUpperCase()}</b>
        </small>
      </span>
      {ProductosAsignados.length > 0 && (
        <>
          <h1 className="ListaDeProductosDeLaAgencia__Titulo">
            Productos asignados
          </h1>
          {ProductosAsignados.map((infProducto, index) => (
            <section
              className="ListaDeProductosDeLaAgencia__Agencia Asignadas"
              key={index}
            >
              <ion-icon name="basket"></ion-icon>
              <p>{infProducto.NombreProducto}</p>
              <button
                className="ListaDeProductosDeLaAgencia__Agencia__Eliminar"
                onClick={() =>
                  PeticionDesasignarProductoAgencia(
                    infProducto.idUnionAgenciasProductos
                  )
                }
              >
                <ion-icon name="close"></ion-icon>
              </button>
              <button
                className="ListaDeProductosDeLaAgencia__Agencia__Detalles"
                onClick={() => MostrarModalYAsignarProducto(infProducto, false)}
              >
                <ion-icon name="information"></ion-icon>
              </button>
            </section>
          ))}
        </>
      )}

      <h1 className="ListaDeProductosDeLaAgencia__Titulo">
        Asignar nuevo producto
      </h1>
      <span className="ListaDeProductosDeLaAgencia__Buscar">
        <input
          type="text"
          placeholder="Buscar producto"
          onChange={obtenerProductos}
        />
        <span className="ListaDeProductosDeLaAgencia__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ProductosNoAsignados.length > 0 ? (
        <>
          <small className="ListaDeProductosDeLaAgencia__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {ProductosNoAsignados.length} resultados{" "}
          </small>
          <div className="ListaDeProductosDeLaAgencia__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeProductosDeLaAgencia__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < ProductosNoAsignados.length && (
              <button
                className="ListaDeProductosDeLaAgencia__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {ProductosNoAsignados.slice(indiceInicial, indiceFinal).map(
            (infProducto, index) => (
              <section
                className="ListaDeProductosDeLaAgencia__Agencia"
                key={index}
                onClick={() => MostrarModalYAsignarProducto(infProducto, true)}
              >
                <ion-icon name="basket"></ion-icon>
                <p>{infProducto.NombreProducto}</p>
              </section>
            )
          )}
          <small className="ListaDeProductosDeLaAgencia__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados para "${filtroProductosAsignadosYNoAsignadosPorAgencia}"`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Registrar-Producto"}
          TextoBoton={"Registrar Producto"}
        />
      )}
    </div>
  );
}
