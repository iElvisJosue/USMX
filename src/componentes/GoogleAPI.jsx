/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { LoadScript } from "@react-google-maps/api";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerApiGoogleMapsAutoCompletado from "../hooks/useObtenerApiGoogleMapsAutoCompletado";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { ListaDeIdiomas } from "../Diccionario/Idiomas";

// IMPORTAMOS LOS ESTILOS
import "../estilos/componentes/GoogleAPI.css";

export default function GoogleAPI({
  direccion,
  establecerDireccion,
  detallesDeLaDireccion,
  establecerDetallesDeLaDireccion,
  ciudadesPermitidas,
}) {
  const { apiGoogleMapsAutoCompletado } =
    useObtenerApiGoogleMapsAutoCompletado();
  const { idioma } = useConfiguracion();

  const manejarDireccion = async (value) => {
    establecerDireccion(value);
    try {
      const results = await geocodeByAddress(value.label);
      const result = results[0];
      const addressComponents = result.address_components;
      const PAIS =
        addressComponents.find((component) =>
          component.types.includes("country")
        )?.long_name || "N/A";
      const CODIGO_PAIS =
        addressComponents.find((component) =>
          component.types.includes("country")
        )?.short_name || "N/A";
      const ESTADO =
        addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name || "N/A";
      const CODIGO_ESTADO =
        addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.short_name || "N/A";
      const CIUDAD =
        addressComponents.find((component) =>
          component.types.includes("locality")
        )?.long_name || "N/A";
      const CODIGO_POSTAL =
        addressComponents.find((component) =>
          component.types.includes("postal_code")
        )?.long_name || "N/A";
      const DIRECCION = value.label.split(",")[0] || "N/A";
      establecerDetallesDeLaDireccion({
        PAIS,
        CODIGO_PAIS,
        ESTADO,
        CODIGO_ESTADO,
        CIUDAD,
        CODIGO_POSTAL,
        DIRECCION,
      });
    } catch (error) {
      console.error("Error al obtener detalles de la dirección:", error);
    }
  };

  return (
    <>
      {apiGoogleMapsAutoCompletado && (
        <span className="GoogleAPI__LoadScript">
          <p>
            <ion-icon name="search"></ion-icon>{" "}
            {ListaDeIdiomas.GoogleAPI[idioma].BuscarDireccion}
          </p>
          <LoadScript
            googleMapsApiKey={apiGoogleMapsAutoCompletado}
            libraries={["places"]}
          >
            <GooglePlacesAutocomplete
              apiKey={apiGoogleMapsAutoCompletado}
              autocompletionRequest={{
                componentRestrictions: { country: ciudadesPermitidas },
              }}
              selectProps={{
                value: direccion,
                onChange: manejarDireccion,
                placeholder: ListaDeIdiomas.Placeholder[idioma],
              }}
            />
          </LoadScript>
        </span>
      )}
      {detallesDeLaDireccion && (
        <div className="GoogleAPI__Detalles">
          <p className="GoogleAPI__Detalles--Titulo">
            {ListaDeIdiomas.GoogleAPI[idioma].DetallesDeLaDireccion}{" "}
            <button
              type="button"
              className="GoogleAPI__Detalles--Cerrar"
              title="Cancelar Dirección"
              onClick={() => establecerDetallesDeLaDireccion(null)}
            >
              <ion-icon name="close"></ion-icon>
            </button>
          </p>

          <span className="GoogleAPI__Detalles--Contenido">
            <p>
              <ion-icon name="flag"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].Pais}
            </p>
            <b>{detallesDeLaDireccion.PAIS}</b>
          </span>
          <span className="GoogleAPI__Detalles--Contenido">
            <p>
              <ion-icon name="keypad-outline"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].CodigoPais}
            </p>
            <b>{detallesDeLaDireccion.CODIGO_PAIS}</b>
          </span>
          <span className="GoogleAPI__Detalles--Contenido">
            <p>
              <ion-icon name="location"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].Estado}
            </p>
            <b>{detallesDeLaDireccion.ESTADO}</b>
          </span>
          <span className="GoogleAPI__Detalles--Contenido">
            <p>
              <ion-icon name="keypad-outline"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].CodigoEstado}
            </p>
            <b>{detallesDeLaDireccion.CODIGO_ESTADO}</b>
          </span>
          <span className="GoogleAPI__Detalles--Contenido">
            <p>
              <ion-icon name="locate"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].Ciudad}
            </p>
            <b>{detallesDeLaDireccion.CIUDAD}</b>
          </span>
          <span className="GoogleAPI__Detalles--Contenido">
            <p>
              <ion-icon name="pin"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].CodigoPostal}
            </p>
            <b>{detallesDeLaDireccion.CODIGO_POSTAL}</b>
          </span>
          <span className="GoogleAPI__Detalles--Contenido Direccion">
            <p>
              <ion-icon name="trail-sign"></ion-icon>
              {ListaDeIdiomas.GoogleAPI[idioma].Direccion}
            </p>
            <b>{detallesDeLaDireccion.DIRECCION}</b>
          </span>
        </div>
      )}
    </>
  );
}
