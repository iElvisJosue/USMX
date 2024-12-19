/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerMovimientosDeEntrada from "../../../../hooks/Bodega/Entradas/useObtenerMovimientosDeEntrada";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_FORMULARIO_DATOS_ENTRADA,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import GrupoDeBotonesInferior from "../../../Globales/GrupoDeBotonesInferior";

// IMPORTAMOS LAS AYUDAS
import {
  ESTILOS_SUCCESS,
  ESTILOS_WARNING,
} from "../../../../helpers/SonnerEstilos";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../../estilos/componentes/Bodega/EntradasBodega/CrearEntrada/FormularioDatosEntrada.css";

export default function FormularioDatosDeEntrada({
  Idioma,
  informacionDeLaEntrada,
  establecerInformacionDeLaEntrada,
  establecerVista,
}) {
  const { movimientosEntrada } = useObtenerMovimientosDeEntrada();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (informacionDeLaEntrada) {
      setValue(
        "NombreTransportista",
        informacionDeLaEntrada.NombreTransportista
      );
      setValue("Remolque", informacionDeLaEntrada.Remolque);
      setValue("Tracto", informacionDeLaEntrada.Tracto);
      setValue("Candado", informacionDeLaEntrada.Candado);
      setValue("HoraDeEntrada", informacionDeLaEntrada.HoraDeEntrada);
    }
  }, [informacionDeLaEntrada]);

  const EstablecerInformacionDelFormulario = handleSubmit(async (data) => {
    const { idMovimientoEntrada } = data;
    if (idMovimientoEntrada === "Invalido")
      return toast.error(
        "¡Por favor selecciona un movimiento para tus entradas!",
        { style: ESTILOS_WARNING }
      );

    establecerInformacionDeLaEntrada(data);
    establecerVista(1);
    return toast.success("¡Formulario completado!", { style: ESTILOS_SUCCESS });
  });

  const MensajeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small
              key={type}
              className="FormularioDatosDeEntrada__MensajeDeError"
            >
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="FormularioDatosDeEntrada"
      onSubmit={EstablecerInformacionDelFormulario}
    >
      <h1 className="FormularioDatosDeEntrada__Titulo">
        {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].EntradaBodega}
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="swap-horizontal"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].SeleccionaElMovimiento}
        </p>
        <select
          id="idMovimientoEntrada"
          name="idMovimientoEntrada"
          {...register("idMovimientoEntrada")}
        >
          <option value="Invalido" defaultValue={true}>
            {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].Seleccionar}
          </option>
          {movimientosEntrada?.map((movEntrada) => (
            <option
              key={movEntrada.idMovimiento}
              value={movEntrada.idMovimiento}
            >
              {movEntrada.EstadoMovimiento}
            </option>
          ))}
        </select>
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].NombreDelTransportista}
        </p>
        <input
          type="text"
          id="NombreTransportista"
          name="NombreTransportista"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreTransportista", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("NombreTransportista")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="build"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].Remolque}
        </p>
        <input
          type="text"
          id="Remolque"
          name="Remolque"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("Remolque", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("Remolque")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="build"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].Tracto}
        </p>
        <input
          type="text"
          id="Tracto"
          name="Tracto"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("Tracto", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("Tracto")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="lock-closed"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].Candado}
        </p>
        <input
          type="text"
          id="Candado"
          name="Candado"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("Candado", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("Candado")}
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="lock-closed"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_ENTRADA[Idioma].HoraDeEntrada}
        </p>
        <input
          type="time"
          id="HoraDeEntrada"
          name="HoraDeEntrada"
          step="1"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("HoraDeEntrada", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("HoraDeEntrada")}
      </span>
      <GrupoDeBotonesInferior Idioma={Idioma} BotonSiguiente={true} />
    </form>
  );
}
