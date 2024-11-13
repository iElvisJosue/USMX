/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

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
import "../../../estilos/componentes/Pedidos/RealizarPedido/RegistrarNuevoDestinatarioPedido.css";

export default function RegistrarNuevoDestinatarioPedido({
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
        Registrar nuevo destinatario
      </h1>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Nombre
        </p>
        <input
          name="NombreDestinatario"
          id="NombreDestinatario"
          placeholder="Escriba aquí..."
          {...register("NombreDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("NombreDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Apellidos
        </p>
        <input
          name="ApellidosDestinatario"
          id="ApellidosDestinatario"
          placeholder="Escriba aquí..."
          {...register("ApellidosDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("ApellidosDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono #1
        </p>
        <input
          name="TelefonoUnoDestinatario"
          id="TelefonoUnoDestinatario"
          placeholder="Escriba aquí..."
          {...register("TelefonoUnoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("TelefonoUnoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono #2 (Opcional)
        </p>
        <input
          name="TelefonoDosDestinatario"
          id="TelefonoDosDestinatario"
          placeholder="Escriba aquí..."
          {...register("TelefonoDosDestinatario", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        ></input>
        {MensajeError("TelefonoDosDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioPedido__Campo Dos">
        <p>
          <ion-icon name="mail"></ion-icon> Correo electrónico
        </p>
        <input
          name="CorreoDestinatario"
          id="CorreoDestinatario"
          placeholder="Escriba aquí..."
          {...register("CorreoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
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
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatarioPedido__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionadaPedido NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
