/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../context/OperacionesContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_EDITAR_MOVIMIENTO,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../helpers/Regexs";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR (ESTILOS RECICLADOS)
import "../../estilos/componentes/Movimientos/RegistrarMovimientos.css";

export default function EditarMovimiento({
  idioma,
  informacionDelMovimiento,
  establecerVista,
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
}) {
  const { EditarMovimiento } = useOperaciones();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("EstadoMovimiento", informacionDelMovimiento?.EstadoMovimiento);
    setValue("OrigenMovimiento", informacionDelMovimiento?.OrigenMovimiento);
    setValue(
      "DetallesMovimiento",
      informacionDelMovimiento?.DetallesMovimiento
    );
    setValue(
      "PorDefectoMovimiento",
      informacionDelMovimiento?.PorDefectoMovimiento
    );
  }, []);

  const GuardarInformacionDelMovimiento = handleSubmit(async (info) => {
    try {
      info.idListaMovimiento = informacionDelMovimiento?.idListaMovimiento;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await EditarMovimiento(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerMovimientosNuevamente(!obtenerMovimientosNuevamente);
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const MensajeDeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="Movimientos__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarMovimiento"
      onSubmit={GuardarInformacionDelMovimiento}
    >
      <div className="RegistrarMovimiento__Opciones">
        <button
          className="RegistrarMovimiento__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="RegistrarMovimiento__Titulo">
        {DICCIONARIO_EDITAR_MOVIMIENTO[idioma].EditarMovimiento}
      </h1>
      <span className="RegistrarMovimiento__Titulo__Campo">
        <p>
          <ion-icon name="bag-check"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_MOVIMIENTO[idioma].EstadoDelMovimiento}
        </p>
        <input
          id="EstadoMovimiento"
          type="text"
          name="EstadoMovimiento"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("EstadoMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeDeError("EstadoMovimiento")}
      </span>
      <span className="RegistrarMovimiento__Titulo__Campo">
        <p>
          <ion-icon name="locate"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_MOVIMIENTO[idioma].OrigenDelMovimiento}
        </p>
        <input
          id="OrigenMovimiento"
          type="text"
          name="OrigenMovimiento"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("OrigenMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeDeError("OrigenMovimiento")}
      </span>
      <span className="RegistrarMovimiento__Titulo__Campo">
        <p>
          <ion-icon name="radio-button-on"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_MOVIMIENTO[idioma].MovimientoPorDefecto}
        </p>
        <select
          name="PorDefectoMovimiento"
          id="PorDefectoMovimiento"
          {...register("PorDefectoMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
          })}
        >
          <option value="No">No</option>
          <option value="Si">Si</option>
        </select>
        {MensajeDeError("PorDefectoMovimiento")}
      </span>
      <span className="RegistrarMovimiento__Titulo__Campo Dos">
        <p>
          <ion-icon name="document-text"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_MOVIMIENTO[idioma].DetallesDelMovimiento}
        </p>
        <input
          id="DetallesMovimiento"
          type="text"
          name="DetallesMovimiento"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("DetallesMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max1000,
            },
          })}
        />
        {MensajeDeError("DetallesMovimiento")}
      </span>
      <footer className="RegistrarMovimiento__Footer">
        <button
          type="submit"
          className="RegistrarMovimiento__Footer__Boton Guardar"
        >
          {DICCIONARIO_BOTONES[idioma].Actualizar}
        </button>
      </footer>
    </form>
  );
}
