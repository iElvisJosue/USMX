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
    const CodigoEstado =
      estadosPorCodigoDelPais.find(
        (estado) => estado.NombreEstado === info.EstadoAgencia
      ).CodigoEstado || "SCE";
    try {
      const { CodigoPais } = DividirCodigoDelNombrePais(info.PaisAgencia);
      info.CodigoPaisAgencia = CodigoPais;
      info.CodigoEstadoAgencia = CodigoEstado;
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
      EstadoAgencia: "",
      CiudadAgencia: "",
      CodigoPostalAgencia: "",
      DireccionAgencia: "",
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
            <ion-icon name="briefcase"></ion-icon> Nombre legal de la agencia
            (DBA)
          </p>
          <input
            id="NombreLegalAgencia"
            name="NombreLegalAgencia"
            placeholder="Escriba aquí..."
            {...register("NombreLegalAgencia", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("NombreLegalAgencia")}
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
          <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
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
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
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
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Cuatro">
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
            <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Cuatro">
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
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="call"></ion-icon> Tel. Agencia
          </p>
          <input
            id="TelefonoAgencia"
            name="TelefonoAgencia"
            placeholder="Escriba aquí..."
            {...register("TelefonoAgencia", {
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
          {MensajeError("TelefonoAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="print"></ion-icon> Fax
          </p>
          <input
            id="FaxAgencia"
            name="FaxAgencia"
            placeholder="Escriba aquí..."
            {...register("FaxAgencia", {
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
          {MensajeError("FaxAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="mail"></ion-icon> Correo Agencia
          </p>
          <input
            id="CorreoAgencia"
            name="CorreoAgencia"
            placeholder="Escriba aquí..."
            {...register("CorreoAgencia", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("CorreoAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="mail"></ion-icon> Correo Agencia #2 (Opcional)
          </p>
          <input
            id="CorreoAgenciaSecundario"
            name="CorreoAgenciaSecundario"
            placeholder="Escriba aquí..."
            {...register("CorreoAgenciaSecundario", {
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("CorreoAgenciaSecundario")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre representante ventas
          </p>
          <input
            id="RepresentanteVentas"
            name="RepresentanteVentas"
            placeholder="Escriba aquí..."
            {...register("RepresentanteVentas", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              required: "¡Este campo es obligatorio! ⚠️",
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("RepresentanteVentas")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="call"></ion-icon> Tel. Representante
          </p>
          <input
            id="TelefonoRepresentanteVentas"
            name="TelefonoRepresentanteVentas"
            placeholder="Escriba aquí..."
            {...register("TelefonoRepresentanteVentas", {
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
          {MensajeError("TelefonoRepresentanteVentas")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre del dueño
          </p>
          <input
            id="NombreDueno"
            name="NombreDueno"
            placeholder="Escriba aquí..."
            {...register("NombreDueno", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("NombreDueno")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="call"></ion-icon> Tel. Dueño
          </p>
          <input
            id="TelefonoDueno"
            name="TelefonoDueno"
            placeholder="Escriba aquí..."
            {...register("TelefonoDueno", {
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
          {MensajeError("TelefonoDueno")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre del manager
          </p>
          <input
            id="NombreManager"
            name="NombreManager"
            placeholder="Escriba aquí..."
            {...register("NombreManager", {
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          ></input>
          {MensajeError("NombreManager")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="call"></ion-icon> Tel. Manager
          </p>
          <input
            id="TelefonoManager"
            name="TelefonoManager"
            placeholder="Escriba aquí..."
            {...register("TelefonoManager", {
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
          {MensajeError("TelefonoManager")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="reader"></ion-icon> No. Licencia
          </p>
          <input
            id="NumeroLicenciaAgencia"
            name="NumeroLicenciaAgencia"
            placeholder="Escriba aquí..."
            {...register("NumeroLicenciaAgencia", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          ></input>
          {MensajeError("NumeroLicenciaAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="reader"></ion-icon> No. Sales Tax
          </p>
          <input
            id="NumeroImpuestosVenta"
            name="NumeroImpuestosVenta"
            placeholder="Escriba aquí..."
            {...register("NumeroImpuestosVenta", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          ></input>
          {MensajeError("NumeroImpuestosVenta")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="reader"></ion-icon> S.S
          </p>
          <input
            id="SS"
            name="SS"
            placeholder="Escriba aquí..."
            {...register("SS", {
              pattern: REGEX_SOLO_NUMEROS,
            })}
          ></input>
          {MensajeError("SS")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="copy"></ion-icon> Copia ID
          </p>
          <select name="CopiaID" id="CopiaID" {...register("CopiaID")}>
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          {MensajeError("CopiaID")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="copy"></ion-icon> Copia Licencia
          </p>
          <select
            name="CopiaLicenciaNegocio"
            id="CopiaLicenciaNegocio"
            {...register("CopiaLicenciaNegocio")}
          >
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          {MensajeError("CopiaLicenciaNegocio")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="copy"></ion-icon> Copia Sales Tax
          </p>
          <select
            name="CopiaImpuestosVenta"
            id="CopiaImpuestosVenta"
            {...register("CopiaImpuestosVenta")}
          >
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          {MensajeError("CopiaImpuestosVenta")}
        </span>
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
