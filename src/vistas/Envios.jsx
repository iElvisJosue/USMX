// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Toaster, toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../componentes/Cargando";
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import MensajeGeneral from "../componentes/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerTiposDeEnvio from "../hooks/useObtenerTiposDeEnvio";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../helpers/Regexs";
import { ESTILOS_ERROR } from "../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Envios.css";

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
        "No puedes eliminar todos los tipos de envío del sistema.",
        {
          style: ESTILOS_ERROR,
        }
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
    <main className="Main">
      <Menu />
      <Encabezado icono="airplane" seccion="Envios" />
      <form className="Envios" onSubmit={RegistrarNuevoEnvio}>
        <h2 className="Envios__Titulo">Envios</h2>
        <h4 className="Envios__Subtitulo">
          Administre la cantidad de envios que maneja el sistema para sus
          pedidos.
        </h4>
        <hr className="Envios__Separador" />
        {envios.length > 0 ? (
          <div className="Envios__Cuerpo">
            <section className="Envios__Formulario">
              <b className="Envios__Formulario--Titulo">Tipos de envios</b>
              <p className="Envios__Formulario--Subtitulo">
                Registra los tipos de envios con los que trabajan.
              </p>
              <div className="Envios__Formulario--Inputs">
                <span className="Envios__Cuerpo__Inputs--Span">
                  <input
                    type="text"
                    name="TipoEnvio"
                    placeholder="Envío"
                    {...register("TipoEnvio", {
                      required: "¡Este campo es obligatorio! ⚠️",
                      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
                    })}
                  />
                  {MensajeDeError("TipoEnvio")}
                </span>
                <button>Añadir</button>
              </div>
            </section>
            <section className="Envios__Lista">
              <ul className="Envios__Lista__Detalles">
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
            </section>
          </div>
        ) : (
          <MensajeGeneral
            Imagen="SinResultados.png"
            Texto="¡Oops! No se encontraron resultados."
          />
        )}
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
