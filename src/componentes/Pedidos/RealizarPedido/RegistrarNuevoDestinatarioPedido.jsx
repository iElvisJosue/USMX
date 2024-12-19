/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";
import GoogleAPI from "../../Globales/GoogleAPI";

// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_MENSAJES_DE_ERROR,
  DICCIONARIO_BOTONES,
} from "../../../diccionario/Diccionario";

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
import "../../../estilos/componentes/Pedidos/RealizarPedido/RegistrarNuevoDestinatarioPedido.css";

export default function RegistrarNuevoDestinatarioPedido({
  Idioma,
  establecerVistaDestinatario,
  destinatario,
  establecerDestinatario,
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
    if (destinatario?.idDestinatario === false) {
      setValue("NombreDestinatario", destinatario?.NombreDestinatario);
      setValue("ApellidosDestinatario", destinatario?.ApellidosDestinatario);
      setValue(
        "TelefonoUnoDestinatario",
        destinatario?.TelefonoUnoDestinatario
      );
      setValue(
        "TelefonoDosDestinatario",
        destinatario?.TelefonoDosDestinatario
      );
      setValue("CorreoDestinatario", destinatario?.CorreoDestinatario);
      setValue("ReferenciaDestinatario", destinatario?.ReferenciaDestinatario);
    }
  }, []);

  const GuardarInformacionDelDestinatario = handleSubmit(async (data) => {
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para continuar, debe seleccionar una dirección para el destinatario!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    // PONEMOS EL ID DEL DESTINATARIO COMO FALSO PARA QUE SE ALMACENE EN LA BASE DE DATOS
    // Y SE CREE UNA UNION CON LA AGENCIA CORRESPONDIENTE
    data.idDestinatario = false;
    data.PaisDestinatario = detallesDeLaDireccion.PAIS;
    data.CodigoPaisDestinatario = detallesDeLaDireccion.CODIGO_PAIS;
    data.EstadoDestinatario = detallesDeLaDireccion.ESTADO;
    data.CodigoEstadoDestinatario = detallesDeLaDireccion.CODIGO_ESTADO;
    data.CiudadDestinatario = detallesDeLaDireccion.CIUDAD;
    data.CodigoPostalDestinatario = detallesDeLaDireccion.CODIGO_POSTAL;
    data.DireccionDestinatario = detallesDeLaDireccion.DIRECCION;
    establecerDestinatario(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 2 (Destinatario) completado con éxito!", {
      style: ESTILOS_SUCCESS,
    });
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["mx", "hn", "gt"],
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
      className="RegistrarNuevoDestinatarioPedido"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      <span className="RegistrarNuevoDestinatarioPedido__Opciones">
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedido__Opciones--Boton Lista"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedido__Opciones--Boton Ocurre"
          onClick={() => establecerVistaDestinatario(2)}
        >
          <ion-icon name="alert-circle"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoDestinatarioPedido__Titulo">
        {
          DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO[Idioma]
            .RegistrarNuevoDestinatario
        }
      </h1>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO[Idioma].Nombre}
        </p>
        <input
          name="NombreDestinatario"
          id="NombreDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("NombreDestinatario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("NombreDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO[Idioma].Apellidos}
        </p>
        <input
          name="ApellidosDestinatario"
          id="ApellidosDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("ApellidosDestinatario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("ApellidosDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO[Idioma].TelefonoUno}
        </p>
        <input
          name="TelefonoUnoDestinatario"
          id="TelefonoUnoDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("TelefonoUnoDestinatario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoUnoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO[Idioma].TelefonoDos}
        </p>
        <input
          name="TelefonoDosDestinatario"
          id="TelefonoDosDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("TelefonoDosDestinatario", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max10,
            },
            minLength: {
              value: 10,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Min10,
            },
          })}
        ></input>
        {MensajeError("TelefonoDosDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo Dos">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {
            DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO[Idioma]
              .CorreoElectronico
          }
        </p>
        <input
          name="CorreoDestinatario"
          id="CorreoDestinatario"
          placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].EscribeAqui}
          {...register("CorreoDestinatario", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Requerido,
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[Idioma].Max100,
            },
          })}
        ></input>
        {MensajeError("CorreoDestinatario")}
      </span>
      <GoogleAPI {...PropsGoogleAPI} />
      <footer className="RegistrarNuevoDestinatarioPedido__Footer">
        <button
          className="RegistrarNuevoDestinatarioPedido__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          {DICCIONARIO_BOTONES[Idioma].Regresar}
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatarioPedido__Footer__Boton Siguiente"
        >
          {DICCIONARIO_BOTONES[Idioma].Siguiente}
        </button>
      </footer>
      <AgenciaSeleccionadaPedido
        Idioma={Idioma}
        NombreAgencia={agencia?.NombreAgencia}
      />
    </form>
  );
}
