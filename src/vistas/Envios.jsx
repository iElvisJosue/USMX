// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../componentes/Cargando";
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import MensajeGeneral from "../componentes/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerTiposDeEnvio from "../hooks/useObtenerTiposDeEnvio";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../helpers/Regexs";
import { ESTILOS_ERROR } from "../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_ENVIOS,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PLACEHOLDERS,
} from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Envios.css";

export default function Envios() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const { RegistrarTipoDeEnvio, EliminarTipoDeEnvio } = useOperaciones();
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
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
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
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  const EliminarEnvio = async (idTipoEnvio) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    if (envios.length === 1)
      return toast.error(
        "No puedes eliminar todos los tipos de envío del sistema.",
        {
          style: ESTILOS_ERROR,
        }
      );
    establecerPeticionPendiente(true);
    try {
      const res = await EliminarTipoDeEnvio({
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
    } finally {
      establecerPeticionPendiente(false);
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

  return (
    <main className="Main">
      <Menu />
      <Encabezado
        icono="code-working"
        seccion={DICCIONARIO_ENVIOS[Idioma].Operaciones}
        subseccion={DICCIONARIO_ENVIOS[Idioma].Envios}
      />
      <form className="Envios" onSubmit={RegistrarNuevoEnvio}>
        <h2 className="Envios__Titulo">{DICCIONARIO_ENVIOS[Idioma].Envios}</h2>
        <h4 className="Envios__Subtitulo">
          {DICCIONARIO_ENVIOS[Idioma].DescripcionEnvios}
        </h4>
        <hr className="Envios__Separador" />
        {cargandoEnvios ? (
          <Cargando />
        ) : envios.length > 0 ? (
          <div className="Envios__Cuerpo">
            <section className="Envios__Formulario">
              <b className="Envios__Formulario--Titulo">
                {DICCIONARIO_ENVIOS[Idioma].TiposDeEnvios}
              </b>
              <p className="Envios__Formulario--Subtitulo">
                {DICCIONARIO_ENVIOS[Idioma].DescripcionTiposDeEnvios}
              </p>
              <div className="Envios__Formulario--Inputs">
                <span className="Envios__Cuerpo__Inputs--Span">
                  <input
                    type="text"
                    name="TipoEnvio"
                    placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].Envio}
                    {...register("TipoEnvio", {
                      required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
                      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
                    })}
                  />
                  {MensajeDeError("TipoEnvio")}
                </span>
                <button>{DICCIONARIO_BOTONES[Idioma].Añadir}</button>
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
            Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          />
        )}
      </form>
    </main>
  );
}
