/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasPorFiltro from "../../../hooks/useBuscarAgenciasPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  ObtenerFechaActual,
  ObtenerHoraActual,
} from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ListaDeAgencias.css";

export default function ListaDeAgencias({
  establecerVista,
  establecerInformacionDeLaAgencia,
}) {
  const { CrearYDescargarExcelDeAgencias } = useAgencias();
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infAgencia, establecerInfAgencia] = useState(null);
  const {
    agencias,
    cargandoAgencias,
    establecerFiltroAgencias,
    obtenerAgenciasNuevamente,
    establecerObtenerAgenciasNuevamente,
  } = useBuscarAgenciasPorFiltro();
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
    if (agencias) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        agencias.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [agencias]);
  const ObtenerLasAgencias = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgencias(valorIntroducido);
      reiniciarValores();
    }
  };
  const MostrarModalActivar = (infAgencia) => {
    establecerInfAgencia(infAgencia);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infAgencia) => {
    establecerInfAgencia(infAgencia);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };
  const EstablecerInformacionDeLaAgenciaSeleccionada = (infAgencia) => {
    establecerInformacionDeLaAgencia(infAgencia);
    establecerVista(1);
  };
  const EstablecerInformacionDeLaAgenciaAEditar = (infAgencia) => {
    establecerInformacionDeLaAgencia(infAgencia);
    establecerVista(2);
  };
  const EstablecerAgenciasParaElExcel = async () => {
    const solicitudPromise = CrearYDescargarExcelDeAgencias({
      CookieConToken: COOKIE_CON_TOKEN,
      Agencias: agencias,
    });

    toast.promise(solicitudPromise, {
      loading: "Generando archivo Excel...",
      success:
        "¡El archivo Excel fue generado con éxito y está listo para su descarga!",
      error:
        "¡Oops! Parece que ocurrió un error al generar o descargar el archivo.",
      style: {
        borderRadius: "20px",
        fontSize: "16px",
      },
    });

    try {
      const res = await solicitudPromise;
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        // Crear un objeto URL para el blob de datos del archivo
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        // Configurar el enlace para la descarga
        link.href = url;
        link.setAttribute(
          "download",
          `Lista De Agencias ${ObtenerFechaActual()} a las ${FormatearHoraParaArchivoExcel()}.xlsx`
        ); // nombre del archivo a descargar

        // Añadir temporalmente el enlace al DOM y simular un clic
        document.body.appendChild(link);
        link.click();

        // Eliminar el enlace del DOM después de la descarga
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  const FormatearHoraParaArchivoExcel = () => {
    const HoraActual = ObtenerHoraActual();
    const Hora = parseInt(HoraActual.split(":")[0], 10); // Convertir a número
    if (Hora < 12) {
      return `${HoraActual.replace(/:/g, ".")} AM`;
    } else {
      return `${HoraActual.replace(/:/g, ".")} PM`;
    }
  };

  if (cargandoAgencias) return <Cargando />;

  return (
    <div className="ListaDeAgencias">
      {mostrarModalConfirmacion && (
        <ModalConfirmacionAgencias
          Activar={activar}
          infAgencia={infAgencia}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerAgenciasNuevamente={obtenerAgenciasNuevamente}
          establecerObtenerAgenciasNuevamente={
            establecerObtenerAgenciasNuevamente
          }
        />
      )}
      <h1 className="ListaDeAgencias__Titulo">Administrar Agencias</h1>
      <span className="ListaDeAgencias__Buscar">
        <input
          type="text"
          placeholder="Buscar Agencia (Nombre, País, Estado, Ciudad, CP)"
          onChange={ObtenerLasAgencias}
        />
        <span className="ListaDeAgencias__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {agencias.length > 0 ? (
        <div className="ListaDeAgencias__Contenedor">
          <small className="ListaDeAgencias__Contenedor__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {agencias.length} resultados{" "}
          </small>
          <h2 className="ListaDeAgencias__Contenedor__Clasificacion">
            Estatus de las agencias:
          </h2>
          <span className="ListaDeAgencias__Contenedor__Colores">
            <p className="ListaDeAgencias__Contenedor__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon> Activa
            </p>
            <p className="ListaDeAgencias__Contenedor__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
          <h2 className="ListaDeAgencias__Contenedor__Operaciones">
            Operaciones:
          </h2>
          <span className="ListaDeAgencias__Contenedor__Colores">
            <button
              className="ListaDeAgencias__Contenedor__Operaciones--Boton DescargarExcel"
              onClick={EstablecerAgenciasParaElExcel}
            >
              <ion-icon name="download"></ion-icon> Descargar Excel
            </button>
          </span>
          <div className="ListaDeAgencias__Contenedor__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeAgencias__Contenedor__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < agencias.length && (
              <button
                className="ListaDeAgencias__Contenedor__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {agencias.slice(indiceInicial, indiceFinal).map((infAgencia) =>
            infAgencia.StatusAgencia === "Activa" ? (
              <section
                className="ListaDeAgencias__Contenedor__Agencia"
                key={infAgencia.idAgencia}
              >
                <span className="ListaDeAgencias__Contenedor__Agencia__Detalles">
                  <ion-icon name="business"></ion-icon>
                  <p>
                    {infAgencia.idEspecial}
                    <br /> {infAgencia.NombreAgencia}
                  </p>
                  <ion-icon name="earth"></ion-icon>
                  <p>{infAgencia.PaisAgencia}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infAgencia.EstadoAgencia}, {infAgencia.CiudadAgencia}
                  </p>
                  <p>
                    {infAgencia.DireccionAgencia}{" "}
                    {infAgencia.CodigoPostalAgencia}
                  </p>
                </span>
                <span className="ListaDeAgencias__Contenedor__Agencia__Opciones">
                  <button
                    className="ListaDeAgencias__Contenedor__Agencia__Opciones--Boton Administrar"
                    title="Administrar Productos"
                    onClick={() =>
                      EstablecerInformacionDeLaAgenciaSeleccionada(infAgencia)
                    }
                  >
                    <p>
                      <ion-icon name="basket"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeAgencias__Contenedor__Agencia__Opciones--Boton Editar"
                    title="Editar agencia"
                    onClick={() =>
                      EstablecerInformacionDeLaAgenciaAEditar(infAgencia)
                    }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  {infAgencia.NombreAgencia !== "USMX Express" && (
                    <button
                      className="ListaDeAgencias__Contenedor__Agencia__Opciones--Boton Desactivar"
                      onClick={() => MostrarModalDesactivar(infAgencia)}
                      title="Desactivar agencia"
                    >
                      <p>
                        <ion-icon name="ban"></ion-icon>
                      </p>
                    </button>
                  )}
                </span>
              </section>
            ) : (
              <section
                className="ListaDeAgencias__Contenedor__Agencia Desactivada"
                key={infAgencia.idAgencia}
              >
                <span className="ListaDeAgencias__Contenedor__Agencia__Detalles">
                  <ion-icon name="business"></ion-icon>
                  <p>{infAgencia.NombreAgencia}</p>
                  <ion-icon name="earth"></ion-icon>
                  <p>{infAgencia.PaisAgencia}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>
                    {infAgencia.CiudadAgencia}, {infAgencia.EstadoAgencia}
                  </p>
                  <p>
                    {infAgencia.DireccionAgencia}{" "}
                    {infAgencia.CodigoPostalAgencia}
                  </p>
                </span>
                <span className="ListaDeAgencias__Contenedor__Agencia__Opciones">
                  <button
                    className="ListaDeAgencias__Contenedor__Agencia__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infAgencia)}
                    title="Activar agencia"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}
          <small className="ListaDeAgencias__Contenedor__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </div>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Agencias"}
          TextoBoton={"Registrar Agencia"}
        />
      )}
    </div>
  );
}
