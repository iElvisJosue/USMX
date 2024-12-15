/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS
import { useSistema } from "../../context/SistemaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_AJUSTES_LOGO,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { HOST_IMAGENES } from "../../helpers/Urls";
import { ESTILOS_WARNING } from "../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ajustes/AjustesActualizarLogo.css";

export default function AjustesActualizarLogo({
  Idioma,
  infSistema,
  obtenerInformacionNuevamente,
  establecerObtenerInformacionNuevamente,
  establecerVistaAjustes,
}) {
  const { ActualizarLogoSistema } = useSistema();
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
  const { handleSubmit } = useForm({
    criteriaMode: "all",
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      toast.error(
        "Solo puedes subir una imagen, por favor inténtalo de nuevo.",
        {
          style: ESTILOS_WARNING,
        }
      );
    } else {
      establecerImagenSeleccionada(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const ValidarImagenDelLogo = handleSubmit(async () => {
    const imagenActual = imagenSeleccionada;
    if (!imagenActual.type.startsWith("image")) {
      return ManejarMensajesDeRespuesta({
        status: 404,
        data: "Uno de los archivos seleccionados no es una imagen.",
      });
    }
    if (imagenActual.size > 10000000) {
      return ManejarMensajesDeRespuesta({
        status: 404,
        data: "Una de las imágenes sobrepasa el tamaño máximo permitido (10MB).",
      });
    }
    GuardarLogoDelSistema();
  });

  const GuardarLogoDelSistema = async () => {
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("LogoActual", infSistema.LogoSistema);
      formData.append("Imagen", imagenSeleccionada);
      const res = await ActualizarLogoSistema(formData);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
        establecerVistaAjustes(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  const LogoDelSistema = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : HOST_IMAGENES + "/" + infSistema.LogoSistema;

  return (
    <form className="AjustesActualizarLogo" onSubmit={ValidarImagenDelLogo}>
      <span className="AjustesActualizarLogo__Boton Izquierda">
        <button onClick={() => establecerVistaAjustes(0)}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      </span>
      <h1 className="AjustesActualizarLogo__Titulo">
        📷 <br />
        {DICCIONARIO_AJUSTES_LOGO[Idioma].ActualizarLogoDelSistema}
      </h1>
      <span className="AjustesActualizarLogo__SeleccionarImagen">
        <picture
          {...getRootProps()}
          className="AjustesActualizarLogo__SeleccionarImagen__Label"
        >
          <input {...getInputProps()} accept="image/*" multiple={false} />
          {isDragActive ? (
            <img src="imagenes/AgregarImagen.png" alt="Agregar Imagen" />
          ) : (
            <img src={LogoDelSistema} alt="Logo Del Sistema" />
          )}
        </picture>
      </span>
      <small className="AjustesActualizarLogo__Texto">
        {DICCIONARIO_AJUSTES_LOGO[Idioma].MensajeActualizarLogoUno}
        <br />
        {DICCIONARIO_AJUSTES_LOGO[Idioma].MensajeActualizarLogoDos}
      </small>
      {imagenSeleccionada && (
        <span className="AjustesActualizarLogo__Boton Centro">
          <button type="submit">{DICCIONARIO_BOTONES[Idioma].Guardar}</button>
        </span>
      )}
    </form>
  );
}
