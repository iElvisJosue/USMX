// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
import { useOperaciones } from "../context/OperacionesContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../componentes/Globales/Cargando";
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import MensajeGeneral from "../componentes/Globales/MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerTiposDeCarga from "../hooks/Operaciones/Cargas/useObtenerTiposDeCarga";

// IMPORTAMOS LAS AYUDAS
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
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const { RegistrarTipoDeCarga, EliminarTipoDeCarga } = useOperaciones();
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

  return (
    <main className="Main">
      <Menu />
      <Encabezado
        icono="code-working"
        seccion={DICCIONARIO_CARGAS[Idioma].Operaciones}
        subseccion={DICCIONARIO_CARGAS[Idioma].Cargas}
      />
      <form className="Cargas" onSubmit={RegistrarNuevaCarga}>
        <h2 className="Cargas__Titulo">{DICCIONARIO_CARGAS[Idioma].Cargas}</h2>
        <h4 className="Cargas__Subtitulo">
          {DICCIONARIO_CARGAS[Idioma].DescripcionCargas}
        </h4>
        <hr className="Cargas__Separador" />
        {cargandoCargas ? (
          <Cargando />
        ) : cargas.length > 0 ? (
          <div className="Cargas__Cuerpo">
            <section className="Cargas__Formulario">
              <b className="Cargas__Formulario--Titulo">
                {DICCIONARIO_CARGAS[Idioma].TiposDeCargas}
              </b>
              <p className="Cargas__Formulario--Subtitulo">
                {DICCIONARIO_CARGAS[Idioma].DescripcionTiposDeCargas}
              </p>
              <div className="Cargas__Formulario--Inputs">
                <span className="Cargas__Cuerpo__Inputs--Span">
                  <input
                    type="text"
                    name="TipoCarga"
                    placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].Carga}
                    {...register("TipoCarga", {
                      required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
                      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
                    })}
                  />
                  {MensajeDeError("TipoCarga")}
                </span>
                <span className="Cargas__Cuerpo__Inputs--Span">
                  <input
                    type="text"
                    name="PorcentajeCarga"
                    placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].Porcentaje}
                    {...register("PorcentajeCarga", {
                      required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
                      pattern: REGEX_SOLO_NUMEROS,
                      maxLength: {
                        value: 3,
                        message:
                          DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max3Numeros,
                      },
                    })}
                  />
                  {MensajeDeError("PorcentajeCarga")}
                </span>
                <button>{DICCIONARIO_BOTONES[Idioma].Añadir}</button>
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
            Texto={DICCIONARIO_RESULTADOS[Idioma].NoResultados}
          />
        )}
      </form>
    </main>
  );
}
