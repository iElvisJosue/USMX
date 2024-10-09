// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerTiposDeCarga from "../../hooks/useObtenerTiposDeCarga";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Configuracion/Cargas.css";

export default function Cargas() {
  const { RegistrarTipoDeCarga, EliminarTipoDeCarga } = useConfiguracion();
  const {
    cargas,
    cargandoCargas,
    obtenerCargasNuevamente,
    establecerObtenerCargasNuevamente,
  } = useObtenerTiposDeCarga();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const RegistrarNuevaCarga = handleSubmit(async (info) => {
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarTipoDeCarga(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerCargasNuevamente(!obtenerCargasNuevamente);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const EliminarCarga = async (idCarga) => {
    try {
      const res = await EliminarTipoDeCarga({
        CookieConToken: COOKIE_CON_TOKEN,
        idCarga,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerCargasNuevamente(!obtenerCargasNuevamente);
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

  if (cargandoCargas) return <Cargando />;

  return (
    <form className="Cargas" onSubmit={RegistrarNuevaCarga}>
      <div className="Cargas__Texto">
        <b>Tipos de cargas</b>
        <p>
          Registra los tipos de cargas con los que trabajan y su porcentaje.
        </p>
        <div className="Cargas__Texto--Inputs">
          <span className="Cargas__Texto--Inputs--Span">
            <input
              type="text"
              name="TipoCarga"
              placeholder="Carga"
              {...register("TipoCarga", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
            />
            {MensajeDeError("TipoCarga")}
          </span>
          <span className="Cargas__Texto--Inputs--Span">
            <input
              type="text"
              name="PorcentajeCarga"
              placeholder="Porcentaje"
              {...register("PorcentajeCarga", {
                required: "¡Este campo es obligatorio! ⚠️",
                pattern: {
                  value: /^\d+$/,
                  message: "¡Este campo solo acepta números! 🔢",
                },
              })}
            />
            {MensajeDeError("PorcentajeCarga")}
          </span>
          <button>Añadir</button>
        </div>
      </div>
      <ul className="Cargas__Lista">
        {cargas.map((carga) => (
          <li key={carga.idCarga}>
            <p>{carga.TipoCarga}</p>
            <small>{carga.PorcentajeCarga}%</small>
            <button type="button" onClick={() => EliminarCarga(carga.idCarga)}>
              <ion-icon name="close"></ion-icon>
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
