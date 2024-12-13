/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_LISTA_DE_PRODUCTOS,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PAGINACION,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacionProductos from "./ModalConfirmacionProductos";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarProductosPorFiltro from "../../../hooks/useBuscarProductosPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ListaDeProductos.css";

export default function ListaDeProductos({
  Idioma,
  establecerVistaProductos,
  establecerInformacionDelProducto,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infProducto, establecerInfProducto] = useState(null);
  const {
    productos,
    cargandoProductos,
    establecerFiltroProductos,
    buscarProductosNuevamente,
    establecerBuscarProductosNuevamente,
  } = useBuscarProductosPorFiltro();
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
    if (productos) {
      const cantidadDePaginasEnProductos = Math.ceil(
        productos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnProductos);
    }
  }, [productos]);

  const ObtenerLosProductos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroProductos(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infProducto) => {
    establecerInfProducto(infProducto);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infProducto) => {
    establecerInfProducto(infProducto);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDeLaAgenciaSeleccionada = (infProducto) => {
    establecerInformacionDelProducto(infProducto);
    establecerVistaProductos(1);
  };
  const EstablecerInformacionDelProductoAEditar = (infProducto) => {
    establecerInformacionDelProducto(infProducto);
    establecerVistaProductos(2);
  };

  if (cargandoProductos) return <Cargando />;

  return (
    <div className="ListaDeProductos">
      {mostrarModalConfirmacion && (
        <ModalConfirmacionProductos
          Idioma={Idioma}
          Activar={activar}
          infProducto={infProducto}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          buscarProductosNuevamente={buscarProductosNuevamente}
          establecerBuscarProductosNuevamente={
            establecerBuscarProductosNuevamente
          }
        />
      )}
      <h1 className="ListaDeProductos__Titulo">
        {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].AdministrarProductos}
      </h1>
      <span className="ListaDeProductos__Buscar">
        <input
          type="text"
          placeholder={DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].BuscarProducto}
          onChange={ObtenerLosProductos}
        />
        <span className="ListaDeProductos__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {productos.length > 0 ? (
        <>
          <small className="ListaDeProductos__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {DICCIONARIO_RESULTADOS[Idioma].Obtuvimos} {productos.length}{" "}
            {DICCIONARIO_RESULTADOS[Idioma].Resultados}{" "}
          </small>
          <h2 className="ListaDeProductos__Clasificacion">
            {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].EstatusDeLosProductos}
          </h2>
          <span className="ListaDeProductos__Colores">
            <p className="ListaDeProductos__Clasificacion--Texto Activa">
              <ion-icon name="basket"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].Activo}
            </p>
            <p className="ListaDeProductos__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon>{" "}
              {DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].Desactivado}
            </p>
          </span>
          <div className="ListaDeProductos__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeProductos__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < productos.length && (
              <button
                className="ListaDeProductos__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {productos.slice(indiceInicial, indiceFinal).map((infProducto) =>
            infProducto.StatusProducto === "Activo" ? (
              <section
                className="ListaDeProductos__Producto"
                key={infProducto.idProducto}
              >
                <span className="ListaDeProductos__Producto__Detalles">
                  <ion-icon name="basket"></ion-icon>
                  <p>{infProducto.NombreProducto}</p>
                </span>

                <span className="ListaDeProductos__Producto__Opciones">
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Administrar"
                    title="Administrar Agencias"
                    onClick={() =>
                      EstablecerInformacionDeLaAgenciaSeleccionada(infProducto)
                    }
                  >
                    <p>
                      <ion-icon name="business"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Editar"
                    title="Editar producto"
                    onClick={() =>
                      EstablecerInformacionDelProductoAEditar(infProducto)
                    }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Desactivar"
                    onClick={() => MostrarModalDesactivar(infProducto)}
                    title="Desactivar producto"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDeProductos__Producto Desactivado"
                key={infProducto.idProducto}
              >
                <span className="ListaDeProductos__Producto__Detalles">
                  <ion-icon name="basket"></ion-icon>
                  <p>{infProducto.NombreProducto}</p>
                </span>
                <span className="ListaDeProductos__Producto__Opciones">
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Activar"
                    title="Activar Producto"
                    onClick={() => MostrarModalActivar(infProducto)}
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeProductos__TextoPaginas">
            {DICCIONARIO_PAGINACION[Idioma].Pagina} {paginaParaMostrar}{" "}
            {DICCIONARIO_PAGINACION[Idioma].De} {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Productos"}
          TextoBoton={DICCIONARIO_LISTA_DE_PRODUCTOS[Idioma].RegistrarProducto}
        />
      )}
    </div>
  );
}
