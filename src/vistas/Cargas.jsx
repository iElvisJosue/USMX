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

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerTiposDeCarga from "../hooks/useObtenerTiposDeCarga";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Cargas.css";

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
    if (cargas.length === 1)
      return toast.error(
        "No puedes eliminar todos los tipos de cargas del sistema. ❌"
      );
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
    <main className="Main">
      <Menu />
      <Encabezado icono="archive" seccion="Cargas" />
      <form className="Cargas" onSubmit={RegistrarNuevaCarga}>
        <h2 className="Cargas__Titulo">Cargas</h2>
        <h4 className="Cargas__Subtitulo">
          Administre la cantidad de cargas que maneja el sistema para sus
          pedidos.
        </h4>
        <hr className="Cargas__Separador" />
        <div className="Cargas__Cuerpo">
          <section className="Cargas__Formulario">
            <b className="Cargas__Formulario--Titulo">Tipos de cargas</b>
            <p className="Cargas__Formulario--Subtitulo">
              Registra los tipos de cargas con los que trabajan.
            </p>
            <div className="Cargas__Formulario--Inputs">
              <span className="Cargas__Cuerpo__Inputs--Span">
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
              <span className="Cargas__Cuerpo__Inputs--Span">
                <input
                  type="text"
                  name="PorcentajeCarga"
                  placeholder="Porcentaje"
                  {...register("PorcentajeCarga", {
                    required: "¡Este campo es obligatorio! ⚠️",
                  })}
                />
                {MensajeDeError("PorcentajeCarga")}
              </span>
              <button>Añadir</button>
            </div>
          </section>
          <section className="Cargas__Lista">
            <ul className="Cargas__Lista__Detalles">
              {cargas.map((carga) => (
                <li key={carga.idCarga}>
                  <p>{carga.TipoCarga}</p>
                  <small>{carga.PorcentajeCarga}%</small>
                  <button
                    type="button"
                    onClick={() => EliminarCarga(carga.idCarga)}
                  >
                    <ion-icon name="close"></ion-icon>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
