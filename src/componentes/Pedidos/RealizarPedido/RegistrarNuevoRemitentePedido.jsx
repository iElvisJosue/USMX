/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import {
  ESTILOS_SUCCESS,
  ESTILOS_WARNING,
} from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/RegistrarNuevoRemitentePedido.css";

export default function RegistrarNuevoRemitentePedido({
  idioma,
  establecerVistaRemitente,
  remitente,
  establecerRemitente,
  establecerPaso,
  agencia,
  paso,
}) {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (remitente?.idRemitente === false) {
      setValue("NombreRemitente", remitente?.NombreRemitente);
      setValue("ApellidosRemitente", remitente?.ApellidosRemitente);
      setValue("TelefonoUnoRemitente", remitente?.TelefonoUnoRemitente);
      setValue("TelefonoDosRemitente", remitente?.TelefonoDosRemitente);
      setValue("CorreoRemitente", remitente?.CorreoRemitente);
      establecerDetallesDeLaDireccion({
        PAIS_REMITENTE: remitente?.PaisRemitente || "",
        CODIGO_PAIS_REMITENTE: remitente?.CodigoPaisRemitente || "",
        ESTADO_REMITENTE: remitente?.EstadoRemitente || "",
        CODIGO_ESTADO_REMITENTE: remitente?.CodigoEstadoRemitente || "",
        CIUDAD_REMITENTE: remitente?.CiudadRemitente || "",
        CODIGO_POSTAL_REMITENTE: remitente?.CodigoPostalRemitente || "",
        DIRECCION_REMITENTE: remitente?.DireccionRemitente || "",
      });
    }
  }, []);

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para continuar, debe seleccionar una dirección para el remitente!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    // PONEMOS EL ID DEL REMITENTE COMO FALSO PARA QUE SE ALMACENE EN LA BASE DE DATOS
    // Y SE CREE UNA UNION CON LA AGENCIA CORRESPONDIENTE
    data.idRemitente = false;
    data.PaisRemitente = detallesDeLaDireccion.PAIS;
    data.CodigoPaisRemitente = detallesDeLaDireccion.CODIGO_PAIS;
    data.EstadoRemitente = detallesDeLaDireccion.ESTADO;
    data.CodigoEstadoRemitente = detallesDeLaDireccion.CODIGO_ESTADO;
    data.CiudadRemitente = detallesDeLaDireccion.CIUDAD;
    data.CodigoPostalRemitente = detallesDeLaDireccion.CODIGO_POSTAL;
    data.DireccionRemitente = detallesDeLaDireccion.DIRECCION;
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 1 (Remitente) completado con éxito!", {
      style: ESTILOS_SUCCESS,
    });
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["us"],
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RealizarPedido__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarNuevoRemitentePedido"
      onSubmit={GuardaInformacionDelRemitente}
    >
      <span className="RegistrarNuevoRemitentePedido__Opciones">
        <button
          type="button"
          className="RegistrarNuevoRemitentePedido__Opciones--Boton"
          onClick={() => establecerVistaRemitente(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoRemitentePedido__Titulo">
        {
          DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO[idioma]
            .RegistrarNuevoRemitente
        }
      </h1>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO[idioma].Nombre}
        </p>
        <input
          id="NombreRemitente"
          type="text"
          name="NombreRemitente"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("NombreRemitente", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeError("NombreRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO[idioma].Apellidos}
        </p>
        <input
          id="ApellidosRemitente"
          type="text"
          name="ApellidosRemitente"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ApellidosRemitente", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeError("ApellidosRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO[idioma].TelefonoUno}
        </p>
        <input
          id="TelefonoUnoRemitente"
          type="text"
          name="TelefonoUnoRemitente"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("TelefonoUnoRemitente", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
            },
          })}
        />
        {MensajeError("TelefonoUnoRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO[idioma].TelefonoDos}
        </p>
        <input
          id="TelefonoDosRemitente"
          type="text"
          name="TelefonoDosRemitente"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("TelefonoDosRemitente", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Min10,
            },
          })}
        />
        {MensajeError("TelefonoDosRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo Dos">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {
            DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO[idioma]
              .CorreoElectronico
          }
        </p>
        <input
          id="CorreoRemitente"
          type="text"
          name="CorreoRemitente"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("CorreoRemitente", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeError("CorreoRemitente")}
      </span>
      <GoogleAPI {...PropsGoogleAPI} />
      <footer className="RegistrarNuevoRemitentePedido__Footer">
        <button
          type="button"
          className="RegistrarNuevoRemitentePedido__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
        >
          {DICCIONARIO_BOTONES[idioma].Regresar}
        </button>
        <button
          type="submit"
          className="RegistrarNuevoRemitentePedido__Footer__Boton Siguiente"
        >
          {DICCIONARIO_BOTONES[idioma].Siguiente}
        </button>
      </footer>
      <AgenciaSeleccionadaPedido
        idioma={idioma}
        NombreAgencia={agencia?.NombreAgencia}
      />
    </form>
  );
}
