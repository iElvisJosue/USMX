/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";
import { useConfiguracion } from "../../../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalSubirArchivo from "./ModalSubirArchivo";

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
import { ListaDeIdiomas } from "../../../Diccionario/Idiomas";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ListaDeAgencias.css";

export default function ListaDeAgencias({
  establecerVista,
  establecerInformacionDeLaAgencia,
}) {
  const { idioma } = useConfiguracion();
  const { CrearYDescargarExcelDeAgencias, ActualizarEstadoAgencia } =
    useAgencias();
  const [mostrarModalSubirArchivo, establecerMostrarModalSubirArchivo] =
    useState(false);
  const [informacionArchivo, establecerInformacionArchivo] = useState(null);
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
  const ActivarDesactivarAgencia = async (idAgencia, EstadoAgenciaParaBD) => {
    try {
      const res = await ActualizarEstadoAgencia({
        idAgencia: idAgencia,
        StatusAgencia: EstadoAgenciaParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
      }
      establecerObtenerAgenciasNuevamente(!obtenerAgenciasNuevamente);
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
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

  const EstablecerInformacionParaElTipoDeArchivo = (Agencia) => {
    establecerInformacionArchivo({
      idAgencia: Agencia.idAgencia,
      NombreAgencia: Agencia.NombreAgencia,
    });
    establecerMostrarModalSubirArchivo(true);
  };

  if (cargandoAgencias) return <Cargando />;

  return (
    <div className="ListaDeAgencias">
      {mostrarModalSubirArchivo && (
        <ModalSubirArchivo
          informacionArchivo={informacionArchivo}
          establecerMostrarModalSubirArchivo={
            establecerMostrarModalSubirArchivo
          }
          idioma={idioma}
        />
      )}
      <h1 className="ListaDeAgencias__Titulo">
        {ListaDeIdiomas.VistaAdministrarAgencias[idioma].AdministrarAgencias}
      </h1>
      <span className="ListaDeAgencias__Buscar">
        <input
          type="text"
          placeholder={
            ListaDeIdiomas.VistaAdministrarAgencias[idioma].BuscarAgencia
          }
          onChange={ObtenerLasAgencias}
        />
        <span className="ListaDeAgencias__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {agencias.length > 0 ? (
        <div className="ListaDeAgencias__Contenedor">
          <small className="ListaDeAgencias__Contenedor__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>
            {ListaDeIdiomas.Resultados[idioma].Obtuvimos} {agencias.length}{" "}
            {ListaDeIdiomas.Resultados[idioma].Resultados}
          </small>
          <h2 className="ListaDeAgencias__Contenedor__Clasificacion">
            {
              ListaDeIdiomas.VistaAdministrarAgencias[idioma]
                .EstatusDeLasAgencia
            }
          </h2>
          <span className="ListaDeAgencias__Contenedor__Colores">
            <p className="ListaDeAgencias__Contenedor__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon>{" "}
              {ListaDeIdiomas.VistaAdministrarAgencias[idioma].Activa}
            </p>
            <p className="ListaDeAgencias__Contenedor__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon>{" "}
              {ListaDeIdiomas.VistaAdministrarAgencias[idioma].Desactivada}
            </p>
          </span>
          <h2 className="ListaDeAgencias__Contenedor__Operaciones">
            {ListaDeIdiomas.VistaAdministrarAgencias[idioma].Operaciones}
          </h2>
          <span className="ListaDeAgencias__Contenedor__Colores">
            <button
              className="ListaDeAgencias__Contenedor__Operaciones--Boton DescargarExcel"
              onClick={EstablecerAgenciasParaElExcel}
            >
              <ion-icon name="download"></ion-icon>{" "}
              {ListaDeIdiomas.Botones[idioma].DescargarExcel}
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
          {agencias.slice(indiceInicial, indiceFinal).map((infAgencia) => (
            <section
              className={`ListaDeAgencias__Contenedor__Agencia ${
                infAgencia.StatusAgencia !== "Activa" && "Desactivada"
              }`}
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
                  {infAgencia.DireccionAgencia} {infAgencia.CodigoPostalAgencia}
                </p>
                {infAgencia.NombreAgencia !== "USMX Express" && (
                  <span
                    className={`ListaDeAgencias__Contenedor__Agencia__Detalles--Activa ${
                      infAgencia.StatusAgencia === "Activa" ? "Si" : "No"
                    }`}
                  >
                    {infAgencia.StatusAgencia === "Activa" ? (
                      <button
                        title="Desactivar Agencia"
                        onClick={() =>
                          ActivarDesactivarAgencia(
                            infAgencia.idAgencia,
                            "Desactivada"
                          )
                        }
                      >
                        <ion-icon name="business"></ion-icon>
                      </button>
                    ) : (
                      <button
                        title="Activar Agencia"
                        onClick={() =>
                          ActivarDesactivarAgencia(
                            infAgencia.idAgencia,
                            "Activa"
                          )
                        }
                      >
                        <ion-icon name="ban"></ion-icon>
                      </button>
                    )}
                  </span>
                )}
              </span>
              {infAgencia.StatusAgencia === "Activa" && (
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
                    title="Editar Agencia"
                    onClick={() =>
                      EstablecerInformacionDeLaAgenciaAEditar(infAgencia)
                    }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeAgencias__Contenedor__Agencia__Opciones--Boton SubirArchivo"
                    title="Subir Archivo"
                    onClick={() =>
                      EstablecerInformacionParaElTipoDeArchivo(infAgencia)
                    }
                  >
                    <p>
                      <ion-icon name="document-attach"></ion-icon>
                    </p>
                  </button>
                </span>
              )}
            </section>
          ))}
          <small className="ListaDeAgencias__Contenedor__TextoPaginas">
            {ListaDeIdiomas.Paginacion[idioma].Pagina} {paginaParaMostrar}{" "}
            {ListaDeIdiomas.Paginacion[idioma].De} {cantidadDePaginas}
          </small>
        </div>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={ListaDeIdiomas.Resultados[idioma].NoResultados}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Agencias"}
          TextoBoton={
            ListaDeIdiomas.VistaAdministrarAgencias[idioma].RegistrarAgencia
          }
        />
      )}
    </div>
  );
}
