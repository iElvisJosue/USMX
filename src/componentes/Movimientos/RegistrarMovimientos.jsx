/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOperaciones } from "../../context/OperacionesContext";

// IMPORTAMOS LAS AYUDAS
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../helpers/Regexs";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { MensajePeticionPendiente } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_REGISTRAR_MOVIMIENTO,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/Movimientos/RegistrarMovimientos.css";

export default function RegistrarMovimiento({
  Idioma,
  obtenerMovimientosNuevamente,
  establecerObtenerMovimientosNuevamente,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { RegistrarMovimiento } = useOperaciones();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardarInformacionDelMovimiento = handleSubmit(async (info) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await RegistrarMovimiento(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerMovimientosNuevamente(!obtenerMovimientosNuevamente);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  const ReiniciarFormulario = () => {
    reset();
  };

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
      <h1 className="RegistrarMovimiento__Titulo">
        {DICCIONARIO_REGISTRAR_MOVIMIENTO[Idioma].RegistrarMovimiento}
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="bag-check"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_MOVIMIENTO[Idioma].EstadoDelMovimiento}
        </p>
        <input
          id="EstadoMovimiento"
          type="text"
          name="EstadoMovimiento"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("EstadoMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeDeError("EstadoMovimiento")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="locate"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_MOVIMIENTO[Idioma].OrigenDelMovimiento}
        </p>
        <input
          id="OrigenMovimiento"
          type="text"
          name="OrigenMovimiento"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("OrigenMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeDeError("OrigenMovimiento")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="apps"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_MOVIMIENTO[Idioma].CategoriaDelMovimiento}
        </p>
        <select
          name="CategoriaMovimiento"
          id="CategoriaMovimiento"
          {...register("CategoriaMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
          })}
        >
          <option value="Inicial">Inicial</option>
          <option value="Recoleccion">Recoleccion</option>
          <option value="Devolucion">Devolucion</option>
          <option value="Entrada Bodega">Entrada Bodega</option>
          <option value="Salida Bodega">Salida Bodega</option>
          <option value="Movimento Bodega">Movimento Bodega</option>
        </select>
        {MensajeDeError("CategoriaMovimiento")}
      </span>
      <span className="GrupoDeInputs Completo">
        <p>
          <ion-icon name="document-text"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_MOVIMIENTO[Idioma].DetallesDelMovimiento}
        </p>
        <input
          id="DetallesMovimiento"
          type="text"
          name="DetallesMovimiento"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("DetallesMovimiento", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max1000,
            },
          })}
        />
        {MensajeDeError("DetallesMovimiento")}
      </span>
      <footer className="RegistrarMovimiento__Footer">
        <button
          type="button"
          className="RegistrarMovimiento__Footer__Boton Cancelar"
          onClick={ReiniciarFormulario}
        >
          {DICCIONARIO_BOTONES[Idioma].Cancelar}
        </button>
        <button
          type="submit"
          className="RegistrarMovimiento__Footer__Boton Guardar"
        >
          {DICCIONARIO_BOTONES[Idioma].Guardar}
        </button>
      </footer>
    </form>
  );
}
