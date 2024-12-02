/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import ModalSubirArchivoSeleccionar from "./ModalSubirArchivoSeleccionar";
import ModalSubirArchivoCompletado from "./ModalSubirArchivoCompletado";
import ModalSubirArchivoError from "./ModalSubirArchivoError";
import ModalSubirArchivoSubiendo from "./ModalSubirArchivoSubiendo";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ModalSubirArchivo.css";

export default function ModalSubirArchivo({
  idioma,
  informacionArchivo,
  establecerMostrarModalSubirArchivo,
}) {
  const [contenidoModal, establecerContenidoModal] = useState(0);
  const [esRemitente, establecerEsRemitente] = useState(true);
  const [hayArchivo, establecerHayArchivo] = useState(null);
  const [mostrarError, establecerMostrarError] = useState(false);
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });
  const { SubirArchivoRemitentes, SubirArchivoDestinatarios } = useAgencias();
  const ManejarCambiosEnElArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ESTABLECEMOS LA IMAGEN SELECCIONADA EN EL INPUT FILE
      const reader = new FileReader();
      reader.readAsDataURL(file);
      establecerHayArchivo(file);
      establecerMostrarError(false);
    }
  };

  const ValidarArchivoExcel = handleSubmit(async () => {
    if (hayArchivo) {
      // Verificar si el archivo es un Excel
      const esExcel =
        hayArchivo.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        hayArchivo.type === "application/vnd.ms-excel";

      if (!esExcel) {
        ManejarMensajesDeRespuesta({
          status: 404,
          data: "El archivo seleccionado no es un Excel. Por favor, selecciona un archivo en formato XLSX o XLS.",
        });
        return;
      }
      // Si el archivo es válido, procede a subirlo
      SubirArchivoExcel();
    } else {
      establecerMostrarError(true);
    }
  });

  const SubirArchivoExcel = async () => {
    try {
      establecerContenidoModal(3);
      const formData = new FormData();
      formData.append("ArchivoExcel", hayArchivo);
      formData.append("idAgencia", informacionArchivo.idAgencia);
      formData.append("CookieConToken", COOKIE_CON_TOKEN);
      const res = esRemitente
        ? await SubirArchivoRemitentes(formData)
        : await SubirArchivoDestinatarios(formData);
      if (res.response) {
        establecerContenidoModal(2);
        establecerHayArchivo(null);
        establecerMostrarError(false);
      } else {
        establecerContenidoModal(1);
        establecerHayArchivo(null);
        establecerMostrarError(false);
      }
    } catch (error) {
      console.log(error);
      establecerContenidoModal(2);
    }
  };

  const ValoresParaLosComponentes = {
    idioma,
    informacionArchivo,
    esRemitente,
    establecerEsRemitente,
    hayArchivo,
    mostrarError,
    ManejarCambiosEnElArchivo,
    establecerContenidoModal,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ModalSubirArchivoSeleccionar,
    1: ModalSubirArchivoCompletado,
    2: ModalSubirArchivoError,
    3: ModalSubirArchivoSubiendo,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[contenidoModal];

  return (
    <form
      className="ModalSubirArchivo"
      encType="multipart/form-data"
      onSubmit={ValidarArchivoExcel}
    >
      <article className="ModalSubirArchivo__Contenido">
        <button
          type="button"
          className="ModalSubirArchivo__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalSubirArchivo(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <ComponenteParaRenderizar {...ValoresParaLosComponentes} />
      </article>
    </form>
  );
}
