/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../context/AgenciasContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerPaisesActivos from "../../hooks/useObtenerPaisesActivos";
import useObtenerEstadosPorCodigoDelPais from "../../hooks/useObtenerEstadosPorCodigoDelPais";
import useObtenerCiudadesPorEstado from "../../hooks/useObtenerCiudadesPorEstado";
import useObtenerColoniasPorCP from "../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import { CamposAgencia } from "../../helpers/RegistrarAgencia/CamposAgencia";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/AdministrarAgencias/EditarAgencia.css";

export default function EditarAgencia({
  informacionDeLaAgencia,
  establecerVista,
}) {
  const { ActualizarInformacionAgencia } = useAgencias();
  // ESTADOS PARA ALMACENAR LOS DATOS DE LA DIRECCIÓN
  const [codigoDelPaisSeleccionado, establecerCodigoDelPaisSeleccionado] =
    useState(informacionDeLaAgencia.CodigoPaisAgencia);
  const [idEstado, establecerIdEstado] = useState(null);
  const [cpColonia, establecerCpColonia] = useState(
    informacionDeLaAgencia.CodigoPostalAgencia
  );
  // ESTE ESTADO ES PARA NO MOSTRAR UN CAMPO EN BLANCO A LA HORA DE ITERAR
  // MUCHO CON LA COLONIA Y EL CP
  const [coloniaSeleccionada, establecerColoniaSeleccionada] = useState(
    informacionDeLaAgencia.DireccionAgencia
  );
  // ESTE ESTADO ES PARA CAMBIAR EL VALOR DE LA COLONIA POR DEFECTO DE LA BD
  const [cambiarValorDeLaColonia, establecerCambiarValorDeLaColonia] =
    useState(false);
  // ESTE ESTADO ES PARA CAMBIAR EL VALOR DE LA CIUDAD POR DEFECTO DE LA BD
  const [cambiarValorDeLaCiudad, establecerCambiarValorDeLaCiudad] =
    useState(false);

  const { paises } = useObtenerPaisesActivos();
  const { estadosPorCodigoDelPais } = useObtenerEstadosPorCodigoDelPais(
    codigoDelPaisSeleccionado
  );
  const { ciudadesPorEstado } = useObtenerCiudadesPorEstado(idEstado);
  const { coloniasPorCP } = useObtenerColoniasPorCP(cpColonia);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  // CAMBIAMOS LA COLONIA SELECCIONADA POR DEFECTO UNICAMENTE CUANDO SE CAMBIA EL CP
  useEffect(() => {
    if (coloniasPorCP?.length > 0 && cambiarValorDeLaColonia) {
      establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia);
    }
  }, [coloniasPorCP, cpColonia]);

  // ESTE USE EFFECT SE ENCARGA DE ESTABLECER EL ID DEL ESTADO
  // PERO PRIMERO NOS DEBEMOS ASEGURAR DE QUE LOS ESTADOS HAYAN CARGADO
  useEffect(() => {
    if (estadosPorCodigoDelPais) {
      const selectElement = document.getElementById("EstadoAgencia");
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      establecerIdEstado(selectedOption.id);
    }
  }, [estadosPorCodigoDelPais]);

  // ESTE USE EFFECT SE ENCARGA DE ESTABLECER LA CIUDAD SELECCIONADA POR DEFECTO
  // UNICAMENTE CUANDO SE INICIA EL COMPONENTE, POR ESO AGREGAMOS EL ESTADO DE cambiarValorDeLaCiudad
  useEffect(() => {
    if (ciudadesPorEstado && !cambiarValorDeLaCiudad) {
      setValue("CiudadAgencia", informacionDeLaAgencia.CiudadAgencia);
    }
  }, [ciudadesPorEstado]);

  useEffect(() => {
    setValue("NombreAgencia", informacionDeLaAgencia.NombreAgencia);
    setValue("NombreContacto", informacionDeLaAgencia.NombreContactoAgencia);
    setValue(
      "TelefonoContacto",
      informacionDeLaAgencia.TelefonoContactoAgencia
    );
    setValue("CorreoContacto", informacionDeLaAgencia.CorreoContactoAgencia);
    setValue("PaisAgencia", informacionDeLaAgencia.PaisAgencia);
    setValue("EstadoAgencia", informacionDeLaAgencia.EstadoAgencia);
    setValue("CodigoPostalAgencia", informacionDeLaAgencia.CodigoPostalAgencia);
    setValue("DireccionAgencia", informacionDeLaAgencia.DireccionAgencia);
    if (informacionDeLaAgencia?.NombreAgencia === "USMX Express") {
      document
        .getElementById("NombreAgencia")
        .classList.add("DesactivarNombreAgencia");
      document
        .getElementById("NombreAgencia")
        .setAttribute("disabled", "disabled");
    }
  }, []);

  const ActualizarInformacionDeLaAgencia = handleSubmit(async (info) => {
    if (
      informacionDeLaAgencia.NombreAgencia === "USMX Express" &&
      info.NombreAgencia !== "USMX Express"
    ) {
      return toast.error(
        "El nombre de la agencia USMX Express no puede ser cambiado ❌"
      );
    }
    try {
      const { CodigoPais } = DividirCodigoDelNombrePais(info.PaisAgencia);
      info.CodigoPaisAgencia = CodigoPais;
      info.idAgencia = informacionDeLaAgencia?.idAgencia;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVista(0);
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

    establecerCambiarValorDeLaCiudad(true);
    establecerCodigoDelPaisSeleccionado(null);
    establecerIdEstado(null);
    establecerCpColonia(null);
    establecerCambiarValorDeLaColonia(false);
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

  // LOS ESTILOS DE LOS CAMPOS ESTÁN EN COMPONENTES > REGISTRAR AGENCIA > INFORMACIÓN DE LA AGENCIA
  return (
    <form className="EditarAgencia" onSubmit={ActualizarInformacionDeLaAgencia}>
      <div className="EditarAgencia__Opciones">
        <button
          className="EditarAgencia__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarAgencia__Titulo">Editar Agencia</h1>
      {CamposAgencia.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            placeholderCampo,
            claseCampo,
            validadorCampo,
          },
          index
        ) => (
          <span className={claseCampo} key={index}>
            <p>
              <ion-icon name={iconoCampo}></ion-icon> {tituloCampo}
            </p>
            <input
              id={idCampo}
              type="text"
              name={nombreCampo}
              placeholder={placeholderCampo}
              {...register(nombreCampo, validadorCampo)}
            />
            {MensajeError(nombreCampo)}
          </span>
        )
      )}
      {paises && (
        <span
          className="InformacionDeLaAgencia__Titulo__Campo"
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
          >
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
        <span className="InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="location"></ion-icon> Estado
          </p>
          <select
            name="EstadoAgencia"
            id="EstadoAgencia"
            {...register("EstadoAgencia", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              establecerIdEstado(selectedOption.id);
              establecerCambiarValorDeLaCiudad(true);
              document.getElementById("CiudadAgencia").value = "";
            }}
            defaultValue={""}
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
          <span className="InformacionDeLaAgencia__Titulo__Campo Dos">
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
          <span className="InformacionDeLaAgencia__Titulo__Campo">
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
                establecerCpColonia(e.target.value);
                establecerCambiarValorDeLaColonia(true);
              }}
              maxLength={5}
            ></input>
            {MensajeError("CodigoPostalAgencia")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP.length > 0 ? (
          <span className="InformacionDeLaAgencia__Titulo__Campo Tres">
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
          <span className="InformacionDeLaAgencia__Titulo__Campo Tres">
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

      <footer className="EditarAgencia__Footer">
        <button type="submit" className="EditarAgencia__Footer__Boton Guardar">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
