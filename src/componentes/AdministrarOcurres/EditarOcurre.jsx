/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../context/OcurreContext";

// IMPORTAMOS LAS AYUDAS
import { CamposOcurre } from "../../helpers/Ocurre/CamposOcurre";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR (ESTILOS REUTILIZADOS)
import "../../estilos/componentes/Ocurre/InformacionOcurre.css";

export default function EditarOcurre({
  informacionDelOcurre,
  establecerVista,
}) {
  const { ActualizarInformacionOcurre } = useOcurre();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("NombreOcurre", informacionDelOcurre?.NombreOcurre);
    setValue(
      "OperadorLogisticoOcurre",
      informacionDelOcurre?.OperadorLogisticoOcurre
    );
    setValue("TelefonoOcurre", informacionDelOcurre?.TelefonoOcurre);
    setValue("CorreoOcurre", informacionDelOcurre?.CorreoOcurre);
    setValue("ColoniaOcurre", informacionDelOcurre?.ColoniaOcurre);
    setValue(
      "MunicipioDelegacionOcurre",
      informacionDelOcurre?.MunicipioDelegacionOcurre
    );
    setValue("CodigoPostalOcurre", informacionDelOcurre?.CodigoPostalOcurre);
    setValue("CiudadOcurre", informacionDelOcurre?.CiudadOcurre);
    setValue("EstadoOcurre", informacionDelOcurre?.EstadoOcurre);
    setValue("DireccionOcurre", informacionDelOcurre?.DireccionOcurre);
    setValue("ReferenciaOcurre", informacionDelOcurre?.ReferenciaOcurre);
    setValue("ObservacionesOcurre", informacionDelOcurre?.ObservacionesOcurre);
  }, [informacionDelOcurre]);

  const GuardarInformacionDelOcurre = handleSubmit(async (info) => {
    try {
      info.idOcurre = informacionDelOcurre?.idOcurre;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionOcurre(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarOcurre__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form className="InformacionOcurre" onSubmit={GuardarInformacionDelOcurre}>
      <div className="InformacionOcurre__Opciones">
        <button
          className="InformacionOcurre__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="InformacionOcurre__Titulo">Editar Ocurre</h1>
      {CamposOcurre.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            placeholderCampo,
            tipoCampo,
            claseCampo,
            validadorCampo,
          },
          index
        ) => (
          <span className={claseCampo} key={index}>
            <p>
              <ion-icon name={iconoCampo}></ion-icon> {tituloCampo}
            </p>
            {tipoCampo === "text" && (
              <>
                <input
                  id={idCampo}
                  type="text"
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                {MensajeError(nombreCampo)}
              </>
            )}
            {tipoCampo === "select" && (
              <>
                <select
                  name={nombreCampo}
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="FedEx">FedEx</option>
                  <option value="Estafeta">Estafeta</option>
                  <option value="DHL">DHL</option>
                  <option value="UPS">UPS</option>
                  <option value="Paquetexpress">Paquetexpress</option>
                  <option value="Redpack">Redpack</option>
                  <option value="99 Minutos">99 Minutos</option>
                </select>
                {MensajeError(nombreCampo)}
              </>
            )}
          </span>
        )
      )}
      <footer className="InformacionOcurre__Footer">
        <button
          type="submit"
          className="InformacionOcurre__Footer__Boton Siguiente"
        >
          Actualizar
        </button>
      </footer>
    </form>
  );
}
