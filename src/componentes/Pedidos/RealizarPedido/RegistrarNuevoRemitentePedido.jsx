/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaPedido from "./AgenciaSeleccionadaPedido";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_SUCCESS } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Pedidos/RealizarPedido/RegistrarNuevoRemitentePedido.css";

export default function RegistrarNuevoRemitentePedido({
  establecerVistaRemitente,
  remitente,
  establecerRemitente,
  establecerPaso,
  agencia,
  paso,
}) {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  // ESTADOS PARA ALMACENAR LOS DATOS DE LA DIRECCIÓN
  const [codigoDelPaisSeleccionado, establecerCodigoDelPaisSeleccionado] =
    useState(null);
  const [paisSeleccionado, establecerPaisSeleccionado] = useState(null);
  const [idEstado, establecerIdEstado] = useState(null);
  const [cpColonia, establecerCpColonia] = useState(null);
  // ESTE ESTADO ES PARA NO MOSTRAR UN CAMPO EN BLANCO A LA HORA DE ITERAR
  // MUCHO CON LA COLONIA Y EL CP
  const [coloniaSeleccionada, establecerColoniaSeleccionada] = useState("");

  // OBTENEMOS LOS DATOS
  const { paises } = useObtenerPaisesActivos();
  const { estadosPorCodigoDelPais } = useObtenerEstadosPorCodigoDelPais(
    codigoDelPaisSeleccionado
  );
  const { ciudadesPorEstado } = useObtenerCiudadesPorEstado(idEstado);
  const { coloniasPorCP } = useObtenerColoniasPorCP(
    cpColonia,
    paisSeleccionado
  );

  useEffect(() => {
    if (coloniasPorCP?.length > 0) {
      establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia); // Selecciona la primera colonia
    }
  }, [coloniasPorCP]);

  useEffect(() => {
    if (remitente?.idRemitente === false) {
      setValue("NombreRemitente", remitente?.NombreRemitente);
      setValue("ApellidosRemitente", remitente?.ApellidosRemitente);
      setValue("TelefonoUnoRemitente", remitente?.TelefonoUnoRemitente);
      setValue("TelefonoDosRemitente", remitente?.TelefonoDosRemitente);
      setValue("CorreoRemitente", remitente?.CorreoRemitente);
      setValue("ReferenciaRemitente", remitente?.ReferenciaRemitente);
    }
  }, []);

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    // PONEMOS EL ID DEL REMITENTE COMO FALSO PARA QUE SE ALMACENE EN LA BASE DE DATOS
    // Y SE CREE UNA UNION CON LA AGENCIA CORRESPONDIENTE
    data.idRemitente = false;
    const { CodigoPais } = DividirCodigoDelNombrePais(data.PaisRemitente);
    data.CodigoPaisRemitente = CodigoPais;
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 1 (Remitente) completado con éxito!", {
      style: ESTILOS_SUCCESS,
    });
  });

  const EstablecerCodigoPais = (InfPais) => {
    ReiniciarValoresDeLasDirecciones();
    const { CodigoPais, NombrePais } = DividirCodigoDelNombrePais(InfPais);
    establecerPaisSeleccionado(NombrePais);
    establecerCodigoDelPaisSeleccionado(CodigoPais);
  };

  const DividirCodigoDelNombrePais = (PaisPorDividir) => {
    // ESTAMOS OBTENIENDO POR EJEMPLO: MX | Mexico
    const CodigoPais = PaisPorDividir.split(" | ")[0];
    const NombrePais = PaisPorDividir.split(" | ")[1];
    return { CodigoPais, NombrePais };
  };

  const ReiniciarValoresDeLasDirecciones = () => {
    reset({
      EstadoRemitente: "",
      CiudadRemitente: "",
      CodigoPostalRemitente: "",
      DireccionRemitente: "",
    });

    establecerPaisSeleccionado(null);
    establecerCodigoDelPaisSeleccionado(null);
    establecerIdEstado(null);
    establecerCpColonia(null);
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
        Registrar Nuevo Remitente
      </h1>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Nombre
        </p>
        <input
          id="NombreRemitente"
          type="text"
          name="NombreRemitente"
          placeholder="Escriba aquí..."
          {...register("NombreRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("NombreRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Apellidos
        </p>
        <input
          id="ApellidosRemitente"
          type="text"
          name="ApellidosRemitente"
          placeholder="Escriba aquí..."
          {...register("ApellidosRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ApellidosRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono #1
        </p>
        <input
          id="TelefonoUnoRemitente"
          type="text"
          name="TelefonoUnoRemitente"
          placeholder="Escriba aquí..."
          {...register("TelefonoUnoRemitente", {
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
        />
        {MensajeError("TelefonoUnoRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono #2 (Opcional)
        </p>
        <input
          id="TelefonoDosRemitente"
          type="text"
          name="TelefonoDosRemitente"
          placeholder="Escriba aquí..."
          {...register("TelefonoDosRemitente", {
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
        />
        {MensajeError("TelefonoDosRemitente")}
      </span>
      <span className="RegistrarNuevoRemitentePedido__Campo Dos">
        <p>
          <ion-icon name="mail"></ion-icon> Correo electrónico
        </p>
        <input
          id="CorreoRemitente"
          type="text"
          name="CorreoRemitente"
          placeholder="Escriba aquí..."
          {...register("CorreoRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CorreoRemitente")}
      </span>
      {paises && (
        <span
          className="RegistrarNuevoRemitentePedido__Campo"
          onChange={(e) => EstablecerCodigoPais(e.target.value)}
        >
          <p>
            <ion-icon name="flag"></ion-icon> País
          </p>
          <select
            name="PaisRemitente"
            id="PaisRemitente"
            {...register("PaisRemitente", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona un país
            </option>
            {paises.map((pais) => (
              <option
                key={pais.idPais}
                value={`${pais.CodigoPais} | ${pais.NombrePais}`}
              >
                {pais.CodigoPais} | {pais.NombrePais}
              </option>
            ))}
          </select>
          {MensajeError("PaisRemitente")}
        </span>
      )}
      {estadosPorCodigoDelPais && (
        <span className="RegistrarNuevoRemitentePedido__Campo">
          <p>
            <ion-icon name="location"></ion-icon> Estado
          </p>
          <select
            name="EstadoRemitente"
            id="EstadoRemitente"
            {...register("EstadoRemitente", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
            defaultValue={""}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              establecerIdEstado(selectedOption.id);
              document.getElementById("CiudadRemitente").value = "";
            }}
          >
            <option value="" disabled>
              Selecciona un estado
            </option>
            {estadosPorCodigoDelPais.map((estado) => (
              <option
                key={estado.idEstado}
                value={estado.NombreEstado}
                id={estado.idEstado}
              >
                {estado.NombreEstado}
              </option>
            ))}
          </select>
          {MensajeError("EstadoRemitente")}
        </span>
      )}
      {ciudadesPorEstado && (
        <>
          <span className="RegistrarNuevoRemitentePedido__Campo">
            <p>
              <ion-icon name="locate"></ion-icon> Ciudad
            </p>
            <select
              name="CiudadRemitente"
              id="CiudadRemitente"
              {...register("CiudadRemitente", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
              defaultValue={""}
            >
              <option value="" disabled>
                Selecciona una ciudad
              </option>
              {ciudadesPorEstado.map((ciudad) => (
                <option
                  key={ciudad.idCiudad}
                  value={ciudad.NombreCiudad}
                  id={ciudad.idCiudad}
                >
                  {ciudad.NombreCiudad}
                </option>
              ))}
            </select>
            {MensajeError("CiudadRemitente")}
          </span>
          <span className="RegistrarNuevoRemitentePedido__Campo">
            <p>
              <ion-icon name="pin"></ion-icon> Código Postal
            </p>
            <input
              name="CodigoPostalRemitente"
              id="CodigoPostalRemitente"
              {...register("CodigoPostalRemitente", {
                required: "¡Este campo es obligatorio! ⚠️",
                pattern: REGEX_SOLO_NUMEROS,
                maxLength: {
                  value: 5,
                  message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
                },
                minLength: {
                  value: 5,
                  message:
                    "¡Este campo no puede tener menos de 5 caracteres! 🔠",
                },
              })}
              placeholder="Escriba aquí..."
              onChange={(e) => {
                // PONEMOS 5 PORQUE ES EL MÍNIMO Y MAXIMO DE UN CP
                establecerCpColonia(
                  e.target.value.length === 5 ? e.target.value : null
                );
              }}
            ></input>
            {MensajeError("CodigoPostalRemitente")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP?.length > 0 ? (
          <span className="RegistrarNuevoRemitentePedido__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Colonia
            </p>
            <select
              name="DireccionRemitente"
              id="DireccionRemitente"
              {...register("DireccionRemitente", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
              value={coloniaSeleccionada}
              onChange={(e) => establecerColoniaSeleccionada(e.target.value)}
            >
              {coloniasPorCP.map((colonia) => (
                <option
                  key={colonia.idColonia}
                  value={colonia.NombreColonia}
                  id={colonia.idColonia}
                >
                  {colonia.NombreColonia}
                </option>
              ))}
            </select>
            {MensajeError("DireccionRemitente")}
          </span>
        ) : (
          <span className="RegistrarNuevoRemitentePedido__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Dirección
            </p>
            <input
              name="DireccionRemitente"
              id="DireccionRemitente"
              {...register("DireccionRemitente", {
                required: "¡Este campo es obligatorio! ⚠️",
                pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
                maxLength: {
                  value: 1000,
                  message:
                    "¡Este campo no puede tener más de 1000 caracteres! 🔠",
                },
              })}
              placeholder="Escriba aquí..."
            ></input>
            {MensajeError("DireccionRemitente")}
          </span>
        ))}
      <span className="RegistrarNuevoRemitentePedido__Campo Tres">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          id="ReferenciaRemitente"
          type="text"
          name="ReferenciaRemitente"
          placeholder="Escriba aquí..."
          {...register("ReferenciaRemitente", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ReferenciaRemitente")}
      </span>
      <footer className="RegistrarNuevoRemitentePedido__Footer">
        <button
          type="button"
          className="RegistrarNuevoRemitentePedido__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoRemitentePedido__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionadaPedido NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
