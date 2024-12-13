/* eslint-disable react/prop-types */
// IMPORTAMOS EL DICCIONARIO A USAR
import {
  DICCIONARIO_PERFIL_INFORMACION,
  DICCIONARIO_BOTONES,
} from "../../diccionario/Diccionario";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";
import { HOST_IMAGENES } from "../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Perfil/PerfilInformacion.css";
export default function PerfilInformacion({
  Idioma,
  infUsuario,
  establecerVistaPerfil,
}) {
  return (
    <div className="PerfilInformacion">
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          {DICCIONARIO_PERFIL_INFORMACION[Idioma].FotoDePerfil} <br />
          📷
        </p>
        <img
          src={`${HOST_IMAGENES}/${infUsuario.Foto}`}
          alt="Imagen de perfil"
        />
        <button
          className="PerfilInformacion__Seccion--ActualizarFoto"
          onClick={() => establecerVistaPerfil(1)}
          title="Cambiar foto de perfil"
        >
          <ion-icon name="image"></ion-icon>
        </button>
      </section>
      <hr className="PerfilInformacion__Divisor" />
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          {DICCIONARIO_PERFIL_INFORMACION[Idioma].InformacionPersonal}
          <br />
          👤
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[Idioma].Usuario}</b>
          <br />
          {infUsuario.Usuario} <br /> {infUsuario.Permisos}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[Idioma].Correo}</b>
          <br />
          {infUsuario.Correo || "N/A"}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[Idioma].Telefono}</b>
          <br />
          {infUsuario.Telefono || "N/A"}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[Idioma].FechaDeCreacion}</b>
          <br />
          {FormatearFecha(infUsuario.FechaCreacionUsuario.slice(0, 10))} a las{" "}
          {infUsuario.HoraCreacionUsuario}
        </p>
        <button
          className="PerfilInformacion__BotonActualizar"
          onClick={() => establecerVistaPerfil(2)}
          title="Actualizar información personal"
        >
          {DICCIONARIO_BOTONES[Idioma].Actualizar}
        </button>
      </section>
    </div>
  );
}
