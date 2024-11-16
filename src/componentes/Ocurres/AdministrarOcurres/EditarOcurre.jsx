/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useOcurre } from "../../../context/OcurreContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LOS DICCIONARIOS A USAR
import {
  DICCIONARIO_EDITAR_OCURRE,
  DICCIONARIO_PLACEHOLDERS,
  DICCIONARIO_BOTONES,
  DICCIONARIO_MENSAJES_DE_ERROR,
} from "../../../diccionario/Diccionario";

// IMPORTAMOS LOS HOOKS A USAR
// import useObtenerPaisesActivos from "../../../hooks/useObtenerPaisesActivos";
// import useObtenerEstadosPorCodigoDelPais from "../../../hooks/useObtenerEstadosPorCodigoDelPais";
// import useObtenerCiudadesPorEstado from "../../../hooks/useObtenerCiudadesPorEstado";
// import useObtenerColoniasPorCP from "../../../hooks/useObtenerColoniasPorCP";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";
import { ESTILOS_WARNING } from "../../../helpers/SonnerEstilos";

// IMPORTAMOS LOS ESTILOS A USAR (ESTILOS REUTILIZADOS)
import "../../../estilos/componentes/Ocurres/AdministrarOcurres/EditarOcurre.css";

export default function EditarOcurre({
  idioma,
  informacionDelOcurre,
  establecerVistaOcurres,
}) {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] = useState({
    PAIS: informacionDelOcurre.PaisOcurre,
    CODIGO_PAIS: informacionDelOcurre.CodigoPaisOcurre,
    ESTADO: informacionDelOcurre.EstadoOcurre,
    CODIGO_ESTADO: informacionDelOcurre.CodigoEstadoOcurre,
    CIUDAD: informacionDelOcurre.CiudadOcurre,
    CODIGO_POSTAL: informacionDelOcurre.CodigoPostalOcurre,
    DIRECCION: informacionDelOcurre.DireccionOcurre,
  });
  const { ActualizarInformacionOcurre } = useOcurre();
  // // ESTADOS PARA ALMACENAR LOS DATOS DE LA DIRECCIÓN
  // const [codigoDelPaisSeleccionado, establecerCodigoDelPaisSeleccionado] =
  //   useState(informacionDelOcurre.CodigoPaisOcurre);
  // const [paisSeleccionado, establecerPaisSeleccionado] = useState(null);

  // const [idEstado, establecerIdEstado] = useState(null);
  // const [cpColonia, establecerCpColonia] = useState(
  //   informacionDelOcurre.CodigoPostalOcurre
  // );
  // // ESTE ESTADO ES PARA NO MOSTRAR UN CAMPO EN BLANCO A LA HORA DE ITERAR
  // // MUCHO CON LA COLONIA Y EL CP
  // const [coloniaSeleccionada, establecerColoniaSeleccionada] = useState(
  //   informacionDelOcurre.DireccionOcurre
  // );
  // // ESTE ESTADO ES PARA CAMBIAR EL VALOR DE LA COLONIA POR DEFECTO DE LA BD
  // const [cambiarValorDeLaColonia, establecerCambiarValorDeLaColonia] =
  //   useState(false);
  // // ESTE ESTADO ES PARA CAMBIAR EL VALOR DE LA CIUDAD POR DEFECTO DE LA BD
  // const [cambiarValorDeLaCiudad, establecerCambiarValorDeLaCiudad] =
  //   useState(false);

  // const { paises } = useObtenerPaisesActivos();
  // const { estadosPorCodigoDelPais } = useObtenerEstadosPorCodigoDelPais(
  //   codigoDelPaisSeleccionado
  // );
  // const { ciudadesPorEstado } = useObtenerCiudadesPorEstado(idEstado);
  // const { coloniasPorCP } = useObtenerColoniasPorCP(
  //   cpColonia,
  //   paisSeleccionado
  // );
  const {
    handleSubmit,
    register,
    setValue,
    // reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  // CAMBIAMOS LA COLONIA SELECCIONADA POR DEFECTO UNICAMENTE CUANDO SE CAMBIA EL CP
  // useEffect(() => {
  //   if (coloniasPorCP?.length > 0 && cambiarValorDeLaColonia) {
  //     establecerColoniaSeleccionada(coloniasPorCP[0].NombreColonia);
  //   }
  // }, [coloniasPorCP, cpColonia]);

  // ESTE USE EFFECT SE ENCARGA DE ESTABLECER EL ID DEL ESTADO
  // PERO PRIMERO NOS DEBEMOS ASEGURAR DE QUE LOS ESTADOS HAYAN CARGADO
  // useEffect(() => {
  //   if (estadosPorCodigoDelPais) {
  //     const selectElement = document.getElementById("EstadoOcurre");
  //     const selectedOption = selectElement.options[selectElement.selectedIndex];
  //     establecerIdEstado(selectedOption.id);
  //   }
  // }, [estadosPorCodigoDelPais]);

  // ESTE USE EFFECT SE ENCARGA DE ESTABLECER LA CIUDAD SELECCIONADA POR DEFECTO
  // UNICAMENTE CUANDO SE INICIA EL COMPONENTE, POR ESO AGREGAMOS EL ESTADO DE cambiarValorDeLaCiudad
  // useEffect(() => {
  //   if (ciudadesPorEstado && !cambiarValorDeLaCiudad) {
  //     setValue("CiudadOcurre", informacionDelOcurre.CiudadOcurre);
  //   }
  // }, [ciudadesPorEstado]);

  useEffect(() => {
    setValue("NombreOcurre", informacionDelOcurre?.NombreOcurre);
    setValue(
      "OperadorLogisticoOcurre",
      informacionDelOcurre?.OperadorLogisticoOcurre
    );
    setValue("TelefonoUnoOcurre", informacionDelOcurre?.TelefonoUnoOcurre);
    setValue("TelefonoDosOcurre", informacionDelOcurre?.TelefonoDosOcurre);
    setValue("CorreoOcurre", informacionDelOcurre?.CorreoOcurre);
    // setValue("PaisOcurre", informacionDelOcurre?.PaisOcurre);
    // setValue("EstadoOcurre", informacionDelOcurre?.EstadoOcurre);
    // setValue("CodigoPostalOcurre", informacionDelOcurre?.CodigoPostalOcurre);
    // setValue("DireccionOcurre", informacionDelOcurre?.DireccionOcurre);
    // setValue("ReferenciaOcurre", informacionDelOcurre?.ReferenciaOcurre);
    setValue("ObservacionesOcurre", informacionDelOcurre?.ObservacionesOcurre);
    // ESTABLECEMOS EL NOMBRE DEL PAIS
    // const { NombrePais } = DividirCodigoDelNombrePais(
    //   informacionDelOcurre?.PaisOcurre
    // );
    // establecerPaisSeleccionado(NombrePais);
  }, [informacionDelOcurre]);

  const GuardarInformacionDelOcurre = handleSubmit(async (info) => {
    if (!detallesDeLaDireccion) {
      return toast.error(
        "¡Para actualizar el ocurre, debe seleccionar una dirección!",
        {
          style: ESTILOS_WARNING,
        }
      );
    }
    try {
      // const { CodigoPais } = DividirCodigoDelNombrePais(info.PaisOcurre);
      // info.CodigoPaisOcurre = CodigoPais;
      info.idOcurre = informacionDelOcurre?.idOcurre;
      info.PaisOcurre = detallesDeLaDireccion.PAIS;
      info.CodigoPaisOcurre = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoOcurre = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoOcurre = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadOcurre = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalOcurre = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionOcurre = detallesDeLaDireccion.DIRECCION;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionOcurre(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVistaOcurres(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["mx"],
  };

  // const EstablecerCodigoPais = (InfPais) => {
  //   ReiniciarValoresDeLasDirecciones();
  //   const { CodigoPais, NombrePais } = DividirCodigoDelNombrePais(InfPais);
  //   establecerPaisSeleccionado(NombrePais);
  //   establecerCodigoDelPaisSeleccionado(CodigoPais);
  // };

  // const DividirCodigoDelNombrePais = (PaisPorDividir) => {
  //   // ESTAMOS OBTENIENDO POR EJEMPLO: MX | Mexico
  //   const CodigoPais = PaisPorDividir.split(" | ")[0];
  //   const NombrePais = PaisPorDividir.split(" | ")[1];
  //   return { CodigoPais, NombrePais };
  // };

  // const ReiniciarValoresDeLasDirecciones = () => {
  //   reset({
  //     EstadoOcurre: "",
  //     CiudadOcurre: "",
  //     CodigoPostalOcurre: "",
  //     DireccionOcurre: "",
  //   });

  //   establecerPaisSeleccionado(null);
  //   establecerCambiarValorDeLaCiudad(true);
  //   establecerCodigoDelPaisSeleccionado(null);
  //   establecerIdEstado(null);
  //   establecerCpColonia(null);
  //   establecerCambiarValorDeLaColonia(false);
  // };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarOcurre__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form className="EditarOcurre" onSubmit={GuardarInformacionDelOcurre}>
      <div className="EditarOcurre__Opciones">
        <button
          className="EditarOcurre__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVistaOcurres(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarOcurre__Titulo">
        {DICCIONARIO_EDITAR_OCURRE[idioma].EditarOcurre}
      </h1>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="alert-circle"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_OCURRE[idioma].NombreDelOcurre}
        </p>
        <input
          id="NombreOcurre"
          type="text"
          name="NombreOcurre"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("NombreOcurre", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeError("NombreOcurre")}
      </span>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="business"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_OCURRE[idioma].OperadorLogistico}
        </p>
        <select
          name="OperadorLogisticoOcurre"
          id="OperadorLogisticoOcurre"
          {...register("OperadorLogisticoOcurre")}
        >
          <option value="FedEx">FedEx</option>
          <option value="Estafeta">Estafeta</option>
          <option value="DHL">DHL</option>
          <option value="UPS">UPS</option>
          <option value="Paquetexpress">Paquetexpress</option>
          <option value="Redpack">Redpack</option>
          <option value="99 Minutos">99 Minutos</option>
        </select>
      </span>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_OCURRE[idioma].TelefonoUno}
        </p>
        <input
          id="TelefonoUnoOcurre"
          type="text"
          name="TelefonoUnoOcurre"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("TelefonoUnoOcurre", {
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
        {MensajeError("TelefonoUnoOcurre")}
      </span>
      <span className="EditarOcurre__Campo">
        <p>
          <ion-icon name="call"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_OCURRE[idioma].TelefonoDos}
        </p>
        <input
          id="TelefonoDosOcurre"
          type="text"
          name="TelefonoDosOcurre"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("TelefonoDosOcurre", {
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
        {MensajeError("TelefonoDosOcurre")}
      </span>
      <span className="EditarOcurre__Campo Dos">
        <p>
          <ion-icon name="mail"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_OCURRE[idioma].CorreoElectronico}
        </p>
        <input
          id="CorreoOcurre"
          type="text"
          name="CorreoOcurre"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("CorreoOcurre", {
            required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max100,
            },
          })}
        />
        {MensajeError("CorreoOcurre")}
      </span>
      {/* {paises && (
        <span
          className="EditarOcurre__Campo"
          onChange={(e) => EstablecerCodigoPais(e.target.value)}
        >
          <p>
            <ion-icon name="flag"></ion-icon> País
          </p>
          <select
            name="PaisOcurre"
            id="PaisOcurre"
            {...register("PaisOcurre", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,,
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
          {MensajeError("PaisOcurre")}
        </span>
      )}
      {estadosPorCodigoDelPais && (
        <span className="EditarOcurre__Campo">
          <p>
            <ion-icon name="location"></ion-icon> Estado
          </p>
          <select
            name="EstadoOcurre"
            id="EstadoOcurre"
            {...register("EstadoOcurre", {
              required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,,
            })}
            defaultValue={""}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              establecerIdEstado(selectedOption.id);
              establecerCambiarValorDeLaCiudad(true);
              document.getElementById("CiudadOcurre").value = "";
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
          {MensajeError("EstadoOcurre")}
        </span>
      )}
      {ciudadesPorEstado && (
        <>
          <span className="EditarOcurre__Campo">
            <p>
              <ion-icon name="locate"></ion-icon> Ciudad
            </p>
            <select
              name="CiudadOcurre"
              id="CiudadOcurre"
              {...register("CiudadOcurre", {
                required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,,
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
            {MensajeError("CiudadOcurre")}
          </span>
          <span className="EditarOcurre__Campo">
            <p>
              <ion-icon name="pin"></ion-icon> Código Postal
            </p>
            <input
              name="CodigoPostalOcurre"
              id="CodigoPostalOcurre"
              {...register("CodigoPostalOcurre", {
                required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,,
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
              placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}}}
              onChange={(e) => {
                establecerCpColonia(e.target.value);
                establecerCambiarValorDeLaColonia(true);
              }}
              maxLength={5}
            ></input>
            {MensajeError("CodigoPostalOcurre")}
          </span>
        </>
      )}
      {coloniasPorCP &&
        (coloniasPorCP?.length > 0 ? (
          <span className="EditarOcurre__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Colonia
            </p>
            <select
              name="DireccionOcurre"
              id="DireccionOcurre"
              {...register("DireccionOcurre", {
                required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,,
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
            {MensajeError("DireccionOcurre")}
          </span>
        ) : (
          <span className="EditarOcurre__Campo Dos">
            <p>
              <ion-icon name="trail-sign"></ion-icon> Dirección
            </p>
            <input
              name="DireccionOcurre"
              id="DireccionOcurre"
              {...register("DireccionOcurre", {
                required: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Requerido,,
                maxLength: {
                  value: 1000,
                  message:
                    DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max1000,
                },
              })}
              placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}}}
            ></input>
            {MensajeError("DireccionOcurre")}
          </span>
        ))}
      <span className="EditarOcurre__Campo Tres">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          name="ReferenciaOcurre"
          id="ReferenciaOcurre"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ReferenciaOcurre", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max1000,
            },
          })}
        ></input>
        {MensajeError("ReferenciaOcurre")}
      </span> */}
      <span className="EditarOcurre__Campo Tres">
        <p>
          <ion-icon name="search"></ion-icon>{" "}
          {DICCIONARIO_EDITAR_OCURRE[idioma].Observaciones}
        </p>
        <input
          name="ObservacionesOcurre"
          id="ObservacionesOcurre"
          placeholder={DICCIONARIO_PLACEHOLDERS[idioma].EscribeAqui}
          {...register("ObservacionesOcurre", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: DICCIONARIO_MENSAJES_DE_ERROR[idioma].Max1000,
            },
          })}
        ></input>
        {MensajeError("ObservacionesOcurre")}
      </span>
      <GoogleAPI {...PropsGoogleAPI} />
      <footer className="EditarOcurre__Footer">
        <button type="submit" className="EditarOcurre__Footer__Boton Siguiente">
          {DICCIONARIO_BOTONES[idioma].Actualizar}
        </button>
      </footer>
    </form>
  );
}
