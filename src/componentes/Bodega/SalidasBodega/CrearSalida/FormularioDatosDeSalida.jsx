/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerMovimientosDeSalida from "../../../../hooks/Bodega/Salidas/useObtenerMovimientosDeSalida";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_FORMULARIO_DATOS_SALIDA,
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
import "../../../../estilos/componentes/Bodega/SalidasBodega/CrearSalida/FormularioDatosDeSalida.css";

export default function FormularioDatosDeSalida({
  Idioma,
  informacionDeLaSalida,
  establecerInformacionDeLaSalida,
  establecerVista,
}) {
  const { movimientosSalida } = useObtenerMovimientosDeSalida();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (informacionDeLaSalida) {
      setValue(
        "NombreTransportista",
        informacionDeLaSalida.NombreTransportista
      );
      setValue("Remolque", informacionDeLaSalida.Remolque);
      setValue("Tracto", informacionDeLaSalida.Tracto);
      setValue("Candado", informacionDeLaSalida.Candado);
      setValue("HoraSalida", informacionDeLaSalida.HoraSalida);
    }
  }, [informacionDeLaSalida]);

  const EstablecerInformacionDelFormulario = handleSubmit(async (data) => {
    const { idMovimientoSalida } = data;
    if (idMovimientoSalida === "Invalido")
      return toast.error(
        "¡Por favor selecciona un movimiento para tus salidas!",
        { style: ESTILOS_WARNING }
      );

    establecerInformacionDeLaSalida(data);
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
              className="FormularioDatosDeSalida__MensajeDeError"
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
      className="FormularioDatosDeSalida"
      onSubmit={EstablecerInformacionDelFormulario}
    >
      <h1 className="FormularioDatosDeSalida__Titulo">
        {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].SalidaBodega}
      </h1>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="swap-horizontal"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].SeleccionaElMovimiento}
        </p>
        <select
          id="idMovimientoSalida"
          name="idMovimientoSalida"
          {...register("idMovimientoSalida")}
        >
          <option value="Invalido" defaultValue={true}>
            {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].Seleccionar}
          </option>
          {movimientosSalida?.map((movSalida) => (
            <option key={movSalida.idMovimiento} value={movSalida.idMovimiento}>
              {movSalida.EstadoMovimiento}
            </option>
          ))}
        </select>
      </span>
      <span className="GrupoDeInputs">
        <p>
          <ion-icon name="person"></ion-icon>
          {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].NombreDelTransportista}
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
          {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].Remolque}
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
          {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].Tracto}
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
          {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].Candado}
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
          {DICCIONARIO_FORMULARIO_DATOS_SALIDA[Idioma].HoraSalida}
        </p>
        <input
          type="time"
          id="HoraSalida"
          name="HoraSalida"
          step="1"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("HoraSalida", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        />
        {MensajeError("HoraSalida")}
      </span>
      <GrupoDeBotonesInferior Idioma={Idioma} BotonSiguiente={true} />
    </form>
  );
}
