/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_PERFIL_FOTO,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { HOST_IMAGENES } from "../../helpers/Urls";
import { ESTILOS_WARNING } from "../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Perfil/PerfilActualizarFoto.css";

export default function PerfilActualizarImagen({
  Idioma,
  obtenerInformacionNuevamente,
  establecerObtenerInformacionNuevamente,
  infUsuario,
  establecerVistaPerfil,
}) {
  const { ActualizarFotoUsuario } = useUsuarios();
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

  const ValidarImagenDePerfil = handleSubmit(async () => {
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
    GuardarImagenDePerfil();
  });

  const GuardarImagenDePerfil = async () => {
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("idUsuario", infUsuario.idUsuario);
      formData.append("FotoActual", infUsuario.Foto);
      formData.append("Imagen", imagenSeleccionada);
      const res = await ActualizarFotoUsuario(formData);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
        establecerVistaPerfil(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  const ImagenDePerfil = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : HOST_IMAGENES + "/" + infUsuario.Foto;

  return (
    <form className="PerfilActualizarFoto" onSubmit={ValidarImagenDePerfil}>
      <div className="PerfilActualizarFoto__Boton Izquierda">
        <button onClick={() => establecerVistaPerfil(0)}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      </div>
      <h1 className="PerfilActualizarFoto__Titulo">
        📷 <br />
        {DICCIONARIO_PERFIL_FOTO[Idioma].ActualizarFotoDePerfil}
      </h1>
      <div className="PerfilActualizarFoto__SeleccionarImagen">
        <picture
          {...getRootProps()}
          className="PerfilActualizarFoto__SeleccionarImagen__Label"
        >
          <input {...getInputProps()} accept="image/*" multiple={false} />
          {isDragActive ? (
            <img src="imagenes/AgregarImagen.png" alt="Agregar Imagen" />
          ) : (
            <img src={ImagenDePerfil} alt="Foto de Perfil" />
          )}
        </picture>
      </div>
      <small className="PerfilActualizarFoto__Texto">
        {DICCIONARIO_PERFIL_FOTO[Idioma].MensajeFotoDePerfilUno}
        <br />
        {DICCIONARIO_PERFIL_FOTO[Idioma].MensajeFotoDePerfilDos}
      </small>
      {imagenSeleccionada && (
        <div className="PerfilActualizarFoto__Boton Centro">
          <button type="submit">{DICCIONARIO_BOTONES[Idioma].Guardar}</button>
        </div>
      )}
    </form>
  );
}
