// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/RegistrarAgencia/RegistrarAgencia.css";

export default function RegistrarAgencia() {
  const { RegistrarAgencia } = useAgencias();
  // ESTADOS PARA ALMACENAR LOS DATOS DE LA DIRECCION
  const [codigoDelPaisSeleccionado, establecerCodigoDelPaisSeleccionado] =
    useState(null);
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
  const { coloniasPorCP } = useObtenerColoniasPorCP(cpColonia);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (coloniasPorCP?.length > 0) {
      establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia); // Selecciona la primera colonia
    }
  }, [coloniasPorCP]);

  const GuardaInformacionDeLaAgencia = handleSubmit(async (info) => {
    try {
      const { CodigoPais } = DividirCodigoDelNombrePais(info.PaisAgencia);
      info.CodigoPaisAgencia = CodigoPais;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarAgencia(info);
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
    }
  });
  const EstablecerCodigoPais = (InfPais) => {
    ReiniciarValoresDeLasDirecciones();
    const { CodigoPais } = DividirCodigoDelNombrePais(InfPais);
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
      EstadoAgencia: "",
      CiudadAgencia: "",
      CodigoPostalAgencia: "",
      DireccionAgencia: "",
    });

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
            <small key={type} className="RegistrarAgencia__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };
  const ReiniciarFormulario = () => {
    reset();
  };
  return (
    <div className="RegistrarAgencia">
      <form
        className="RegistrarAgencia__InformacionDeLaAgencia"
        onSubmit={GuardaInformacionDeLaAgencia}
      >
        <h1 className="RegistrarAgencia__InformacionDeLaAgencia__Titulo">
          Registrar Agencia
        </h1>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="business"></ion-icon> Nombre de la agencia
          </p>
          <input
            id="NombreAgencia"
            name="NombreAgencia"
            placeholder="Escriba aquí..."
            tabIndex={-1}
            {...register("NombreAgencia", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("NombreAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre del contacto
          </p>
          <input
            id="NombreContacto"
            name="NombreContacto"
            placeholder="Escriba aquí..."
            {...register("NombreContacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("NombreContacto")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="call"></ion-icon> Teléfono del contacto
          </p>
          <input
            id="TelefonoContacto"
            name="TelefonoContacto"
            placeholder="Escriba aquí..."
            {...register("TelefonoContacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
              },
              minLength: {
                value: 10,
                message:
                  "¡Este campo no puede tener menos de 10 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("TelefonoContacto")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="mail"></ion-icon> Correo del contacto
          </p>
          <input
            id="CorreoContacto"
            name="CorreoContacto"
            placeholder="Escriba aquí..."
            {...register("CorreoContacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("CorreoContacto")}
        </span>
        {paises && (
          <span
            className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo"
            onChange={(e) => EstablecerCodigoPais(e.target.value)}
          >
            <p>
              <ion-icon name="flag"></ion-icon> País
            </p>
            <select
              name="PaisAgencia"
              id="PaisAgencia"
              {...register("PaisAgencia", {
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
            {MensajeError("PaisAgencia")}
          </span>
        )}
        {estadosPorCodigoDelPais && (
          <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
            <p>
              <ion-icon name="location"></ion-icon> Estado
            </p>
            <select
              name="EstadoAgencia"
              id="EstadoAgencia"
              {...register("EstadoAgencia", {
                required: "¡Este campo es obligatorio! ⚠️",
              })}
              defaultValue={""}
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                establecerIdEstado(selectedOption.id);
                document.getElementById("CiudadAgencia").value = "";
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
            {MensajeError("EstadoAgencia")}
          </span>
        )}
        {ciudadesPorEstado && (
          <>
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
              <p>
                <ion-icon name="locate"></ion-icon> Ciudad
              </p>
              <select
                name="CiudadAgencia"
                id="CiudadAgencia"
                {...register("CiudadAgencia", {
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
              {MensajeError("CiudadAgencia")}
            </span>
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
              <p>
                <ion-icon name="pin"></ion-icon> Código Postal
              </p>
              <input
                name="CodigoPostalAgencia"
                id="CodigoPostalAgencia"
                {...register("CodigoPostalAgencia", {
                  required: "¡Este campo es obligatorio! ⚠️",
                  pattern: REGEX_SOLO_NUMEROS,
                  maxLength: {
                    value: 5,
                    message:
                      "¡Este campo no puede tener más de 5 caracteres! 🔠",
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
              {MensajeError("CodigoPostalAgencia")}
            </span>
          </>
        )}
        {coloniasPorCP &&
          (coloniasPorCP?.length > 0 ? (
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Tres">
              <p>
                <ion-icon name="trail-sign"></ion-icon> Colonia
              </p>
              <select
                name="DireccionAgencia"
                id="DireccionAgencia"
                {...register("DireccionAgencia", {
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
              {MensajeError("DireccionAgencia")}
            </span>
          ) : (
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Tres">
              <p>
                <ion-icon name="trail-sign"></ion-icon> Dirección
              </p>
              <input
                name="DireccionAgencia"
                id="DireccionAgencia"
                {...register("DireccionAgencia", {
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
              {MensajeError("DireccionAgencia")}
            </span>
          ))}
        <footer className="RegistrarAgencia__InformacionDeLaAgencia__Footer">
          <button
            type="button"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Guardar"
          >
            Guardar
          </button>
        </footer>
      </form>
    </div>
  );
}
