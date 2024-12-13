/* eslint-disable react/prop-types */
// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_AJUSTES_INFORMACION,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ajustes/AjustesInformacion.css";
export default function PerfilInformacion({
  Idioma,
  infSistema,
  establecerVistaAjustes,
}) {
  const OcultarMitadDeLaContraseña = (Contraseña) => {
    let ArrayContraseña = Contraseña.split("");
    ArrayContraseña = ArrayContraseña.map((elemento, index) => {
      if (index < ArrayContraseña.length / 2) return "*";
      return elemento;
    });
    return ArrayContraseña.join("");
  };

  return (
    <div className="AjustesInformacion">
      <section className="AjustesInformacion__Seccion">
        <p className="AjustesInformacion__Seccion--Titulo">
          {DICCIONARIO_AJUSTES_INFORMACION[Idioma].LogoDelSistema} <br />
          🖼️
        </p>
        <img
          src={`${HOST_IMAGENES}/${infSistema.LogoSistema}`}
          alt="Logo del sistema"
        />
        <button
          className="AjustesInformacion__Seccion--ActualizarFoto"
          onClick={() => establecerVistaAjustes(1)}
          title="Cambiar logo del sistema"
        >
          <ion-icon name="image"></ion-icon>
        </button>
      </section>
      <hr className="AjustesInformacion__Divisor" />
      <section className="AjustesInformacion__Seccion">
        <p className="AjustesInformacion__Seccion--Titulo">
          {DICCIONARIO_AJUSTES_INFORMACION[Idioma].InformacionDelSistema}
          <br />
          🖥️
        </p>
        <p className="AjustesInformacion__Seccion--Texto">
          <b>{DICCIONARIO_AJUSTES_INFORMACION[Idioma].Nombre}</b>
          <br />
          {infSistema.NombreSistema}
        </p>
        <p className="AjustesInformacion__Seccion--Texto">
          <b>{DICCIONARIO_AJUSTES_INFORMACION[Idioma].CorreoDeContacto}</b>
          <br />
          {infSistema.CorreoSistema || "N/A"}
        </p>
        <p className="AjustesInformacion__Seccion--Texto">
          <b>
            {DICCIONARIO_AJUSTES_INFORMACION[Idioma].ContrasenaCorreoDeContacto}
          </b>
          <br />
          {OcultarMitadDeLaContraseña(infSistema.ContrasenaCorreoSistema) ||
            "N/A"}
        </p>
        <button
          className="AjustesInformacion__BotonActualizar"
          onClick={() => establecerVistaAjustes(2)}
          title="Actualizar información del sistema"
        >
          {DICCIONARIO_BOTONES[Idioma].Actualizar}
        </button>
      </section>
    </div>
  );
}
