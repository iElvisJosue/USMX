/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ModalSubirArchivo.css";

export default function ModalSubirArchivo({
  informacionArchivo,
  establecerMostrarModalSubirArchivo,
}) {
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
    const formData = new FormData();
    formData.append("ArchivoExcel", hayArchivo);
    formData.append("idAgencia", informacionArchivo.idAgencia);
    formData.append("CookieConToken", COOKIE_CON_TOKEN);

    try {
      // Crea una promesa que lanza un error explícito en caso de respuesta no exitosa
      const solicitudPromise = (
        esRemitente
          ? SubirArchivoRemitentes(formData)
          : SubirArchivoDestinatarios(formData)
      ).then((res) => {
        // Si el servidor devuelve un código de error, lanzamos un error explícito
        if (res.status !== 200) {
          throw new Error(`Error ${res.status}: ${res.data}`);
        }
        return res;
      });

      // Usamos toast.promise para manejar el estado de carga, éxito y error
      const res = toast.promise(solicitudPromise, {
        loading: `Insertando información de los ${
          esRemitente ? "REMITENTES" : "DESTINATARIOS"
        }...`,
        success: `¡La información de los ${
          esRemitente ? "REMITENTES" : "DESTINATARIOS"
        } ha sido insertada con éxito!`,
        error: `¡Oops! Parece que algo salió mal al insertar la información de los ${
          esRemitente ? "REMITENTES" : "DESTINATARIOS"
        }. Por favor, intenta de nuevo.`,
        style: {
          borderRadius: "20px",
          fontSize: "16px",
        },
      });

      // Manejo de la respuesta exitosa (si no hay error)
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        establecerMostrarModalSubirArchivo(false);
      }
    } catch (error) {
      // Maneja el mensaje de error desde el servidor o errores de red inesperados
      if (error.response) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
  };

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
        <section
          className={`ModalSubirArchivo__Contenido--Opciones ${
            esRemitente ? "Remitentes" : "Destinatarios"
          }`}
        >
          <button
            className="ModalSubirArchivo__Contenido--Opciones--Boton"
            type="button"
            onClick={() => establecerEsRemitente(true)}
          >
            <ion-icon name="person-circle"></ion-icon>
            Remitentes
          </button>
          <button
            className="ModalSubirArchivo__Contenido--Opciones--Boton"
            type="button"
            onClick={() => establecerEsRemitente(false)}
          >
            <ion-icon name="location"></ion-icon> Destinatarios
          </button>
        </section>
        <h1 className="ModalSubirArchivo__Contenido--Titulo">
          SELECCIONAR ARCHIVO
        </h1>
        <picture className="ModalSubirArchivo__Contenido--Imagen">
          <img src="SubirExcel.png" alt="Icono de subir excel" />
        </picture>
        <small className="ModalSubirArchivo__Contenido--Texto">
          Para subir la información de los{" "}
          {esRemitente ? "REMITENTES" : "DESTINATARIOS"}, debes seleccionar un
          archivo en formato XLSX.
        </small>
        <label className="ModalSubirArchivo__Contenido--Archivo">
          <input
            type="file"
            accept=".xlsx"
            name="Excel"
            onChange={ManejarCambiosEnElArchivo}
          />
          {hayArchivo ? hayArchivo?.name : "Seleccionar"}
        </label>
        {mostrarError && (
          <span className="ModalSubirArchivo__Contenido--Archivo--MensajeDeError">
            ¡Por favor, selecciona un archivo! ⚠️
          </span>
        )}

        <button className="ModalSubirArchivo__Contenido--Boton">
          Realizar
        </button>
      </article>
    </form>
  );
}
