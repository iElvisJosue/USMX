// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerTiposDeEnvio from "../../hooks/useObtenerTiposDeEnvio";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Configuracion/Envios.css";

export default function Envios() {
  const { RegistrarTipoDeEnvio, EliminarTipoDeEnvio } = useConfiguracion();
  const {
    envios,
    cargandoEnvios,
    obtenerEnviosNuevamente,
    establecerObtenerEnviosNuevamente,
  } = useObtenerTiposDeEnvio();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const RegistrarNuevoEnvio = handleSubmit(async (info) => {
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarTipoDeEnvio(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerEnviosNuevamente(!obtenerEnviosNuevamente);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const EliminarEnvio = async (idTipoEnvio) => {
    if (envios.length === 1)
      return toast.error(
        "No puedes eliminar todos los tipos de envío del sistema. ❌"
      );
    try {
      const res = await EliminarTipoDeEnvio({
        CookieConToken: COOKIE_CON_TOKEN,
        idTipoEnvio,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerEnviosNuevamente(!obtenerEnviosNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  const MensajeDeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarProducto__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  if (cargandoEnvios) return <Cargando />;

  return (
    <form className="Envios" onSubmit={RegistrarNuevoEnvio}>
      <div className="Envios__Texto">
        <b>Tipos de envios</b>
        <p>Registra los tipos de envios con los que trabajan.</p>
        <div className="Envios__Texto--Inputs">
          <span className="Envios__Texto--Inputs--Span">
            <input
              type="text"
              name="TipoEnvio"
              placeholder="Envío"
              {...register("TipoEnvio", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
            />
            {MensajeDeError("TipoEnvio")}
          </span>
          <button>Añadir</button>
        </div>
      </div>
      <ul className="Envios__Lista">
        {envios.map((envio) => (
          <li key={envio.idTipoEnvio}>
            <p>{envio.TipoEnvio}</p>
            <button
              type="button"
              onClick={() => EliminarEnvio(envio.idTipoEnvio)}
            >
              <ion-icon name="close"></ion-icon>
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
