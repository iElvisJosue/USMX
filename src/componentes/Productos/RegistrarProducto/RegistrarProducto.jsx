/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_REGISTRAR_PRODUCTO,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_PLACEHOLDERS,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_DECIMALES,
} from "../../../helpers/Regexs";
import { MensajePeticionPendiente } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Productos/RegistrarProducto/RegistrarProducto.css";

export default function RegistrarProducto({ Idioma }) {
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { RegistrarProducto } = useProductos();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDelProducto = handleSubmit(async (info) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await RegistrarProducto(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
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

  const MensajeError = (NombreCampo) => {
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
    <div className="RegistrarProducto">
      <form
        className="RegistrarProducto__InformacionDelProducto"
        onSubmit={GuardaInformacionDelProducto}
      >
        <h1 className="RegistrarProducto__InformacionDelProducto__Titulo">
          {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].RegistrarProducto}
        </h1>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="basket"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].Nombre}
          </p>
          <input
            id="NombreProducto"
            name="NombreProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("NombreProducto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
              },
            })}
          ></input>
          {MensajeError("NombreProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="swap-horizontal"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].Ancho}
          </p>
          <input
            id="AnchoProducto"
            name="AnchoProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("AnchoProducto", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("AnchoProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="swap-vertical"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].Largo}
          </p>
          <input
            id="LargoProducto"
            name="LargoProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("LargoProducto", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("LargoProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="arrow-up"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].Alto}
          </p>
          <input
            id="AltoProducto"
            name="AltoProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("AltoProducto", {
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("AltoProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="cash"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].Precio}
          </p>
          <input
            id="PrecioProducto"
            name="PrecioProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("PrecioProducto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("PrecioProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="scale"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].CostoLibraExtra}
          </p>
          <input
            id="CostoLibraExtraProducto"
            name="CostoLibraExtraProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("CostoLibraExtraProducto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_DECIMALES,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("CostoLibraExtraProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="thumbs-up"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].PesoSinCobro}
          </p>
          <input
            id="PesoSinCobroProducto"
            name="PesoSinCobroProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("PesoSinCobroProducto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("PesoSinCobroProducto")}
        </span>
        <span className="GrupoDeInputs">
          <p>
            <ion-icon name="warning"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].PesoMaximo}
          </p>
          <input
            id="PesoMaximoProducto"
            name="PesoMaximoProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("PesoMaximoProducto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("PesoMaximoProducto")}
        </span>
        <span className="GrupoDeInputs Comision">
          <p>
            <ion-icon name="receipt"></ion-icon>{" "}
            {DICCIONARIO_REGISTRAR_PRODUCTO[Idioma].Comision}
          </p>
          <input
            id="ComisionProducto"
            name="ComisionProducto"
            placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
            {...register("ComisionProducto", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max5,
              },
            })}
          ></input>
          {MensajeError("ComisionProducto")}
        </span>
        <footer className="RegistrarProducto__InformacionDelProducto__Footer">
          <button
            type="button"
            className="RegistrarProducto__InformacionDelProducto__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            {DICCIONARIO_BOTONES[Idioma].Cancelar}
          </button>
          <button
            type="submit"
            className="RegistrarProducto__InformacionDelProducto__Footer__Boton Guardar"
          >
            {DICCIONARIO_BOTONES[Idioma].Guardar}
          </button>
        </footer>
      </form>
    </div>
  );
}
