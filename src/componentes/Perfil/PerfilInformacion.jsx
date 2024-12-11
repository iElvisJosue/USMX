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
import "../../estilos/Componentes/Perfil/PerfilInformacion.css";
export default function PerfilInformacion({
  idioma,
  infUsuario,
  establecerVistaPerfil,
}) {
  return (
    <div className="PerfilInformacion">
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          {DICCIONARIO_PERFIL_INFORMACION[idioma].FotoDePerfil} <br />
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
          {DICCIONARIO_PERFIL_INFORMACION[idioma].InformacionPersonal}
          <br />
          👤
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[idioma].Usuario}</b>
          <br />
          {infUsuario.Usuario} <br /> {infUsuario.Permisos}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[idioma].Correo}</b>
          <br />
          {infUsuario.Correo || "N/A"}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[idioma].Telefono}</b>
          <br />
          {infUsuario.Telefono || "N/A"}
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          <b>{DICCIONARIO_PERFIL_INFORMACION[idioma].FechaDeCreacion}</b>
          <br />
          {FormatearFecha(infUsuario.FechaCreacionUsuario.slice(0, 10))} a las{" "}
          {infUsuario.HoraCreacionUsuario}
        </p>
        <button
          className="PerfilInformacion__BotonActualizar"
          onClick={() => establecerVistaPerfil(2)}
          title="Actualizar información personal"
        >
          {DICCIONARIO_BOTONES[idioma].Actualizar}
        </button>
      </section>
      <hr className="PerfilInformacion__Divisor" />
      <section className="PerfilInformacion__Seccion">
        <p className="PerfilInformacion__Seccion--Titulo">
          {DICCIONARIO_PERFIL_INFORMACION[idioma].Contraseña} <br />
          🔐
        </p>
        <p className="PerfilInformacion__Seccion--Texto">
          {DICCIONARIO_PERFIL_INFORMACION[idioma].MensajeContraseña}
        </p>
        <button
          className="PerfilInformacion__BotonActualizar"
          onClick={() => establecerVistaPerfil(3)}
        >
          {DICCIONARIO_BOTONES[idioma].Cambiar}
        </button>
      </section>
    </div>
  );
}
