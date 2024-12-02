// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
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
import useObtenerTiposDeCarga from "../hooks/useObtenerTiposDeCarga";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../helpers/Regexs";
import { ESTILOS_ERROR } from "../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_CARGAS,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_RESULTADOS,
  DICCIONARIO_PLACEHOLDERS,
} from "../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS
import "../estilos/vistas/Cargas.css";

export default function Cargas() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { idioma, RegistrarTipoDeCarga, EliminarTipoDeCarga } =
    useConfiguracion();
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
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
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
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  const EliminarCarga = async (idCarga) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    if (cargas.length === 1)
      return toast.error(
        "No puedes eliminar todos los tipos de cargas del sistema.",
        {
          style: ESTILOS_ERROR,
        }
      );
    establecerPeticionPendiente(true);
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

  if (cargandoCargas) return <Cargando />;

  return (
    <main className="Main">
      <Menu />
      <Encabezado icono="archive" seccion={DICCIONARIO_CARGAS[idioma].Cargas} />
      <form className="Cargas" onSubmit={RegistrarNuevaCarga}>
        <h2 className="Cargas__Titulo">{DICCIONARIO_CARGAS[idioma].Cargas}</h2>
        <h4 className="Cargas__Subtitulo">
          {DICCIONARIO_CARGAS[idioma].DescripcionCargas}
        </h4>
        <hr className="Cargas__Separador" />
        {cargas.length > 0 ? (
          <div className="Cargas__Cuerpo">
            <section className="Cargas__Formulario">
              <b className="Cargas__Formulario--Titulo">
                {DICCIONARIO_CARGAS[idioma].TiposDeCargas}
              </b>
              <p className="Cargas__Formulario--Subtitulo">
                {DICCIONARIO_CARGAS[idioma].DescripcionTiposDeCargas}
              </p>
              <div className="Cargas__Formulario--Inputs">
                <span className="Cargas__Cuerpo__Inputs--Span">
                  <input
                    type="text"
                    name="TipoCarga"
                    placeholder={DICCIONARIO_PLACEHOLDERS[idioma].Carga}
                    {...register("TipoCarga", {
                      required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
                      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
                    })}
                  />
                  {MensajeDeError("TipoCarga")}
                </span>
                <span className="Cargas__Cuerpo__Inputs--Span">
                  <input
                    type="text"
                    name="PorcentajeCarga"
                    placeholder={DICCIONARIO_PLACEHOLDERS[idioma].Porcentaje}
                    {...register("PorcentajeCarga", {
                      required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
                      pattern: REGEX_SOLO_NUMEROS,
                      maxLength: {
                        value: 3,
                        message:
                          DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max3Numeros,
                      },
                    })}
                  />
                  {MensajeDeError("PorcentajeCarga")}
                </span>
                <button>{DICCIONARIO_BOTONES[idioma].Añadir}</button>
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
        ) : (
          <MensajeGeneral
            Imagen="SinResultados.png"
            Texto={DICCIONARIO_RESULTADOS[idioma].NoResultados}
          />
        )}
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
