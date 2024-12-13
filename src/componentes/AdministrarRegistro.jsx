/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LAS AYUDAS
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../estilos/componentes/AdministrarRegistro.css";

export default function AdministrarRegistro({
  Status = 1,
  idRegistro,
  NombreRegistro,
  ImagenRegistro = "",
  Secciones = [],
  OpcionesBotones = [],
  infRegistro,
  FuncionActivarDesactivar,
  obtenerListaNuevamente,
  establecerObtenerListaNuevamente,
}) {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);

  const ActivarDesactivarRegistro = async (idRegistro, StatusParaBD) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await FuncionActivarDesactivar({
        idRegistro,
        StatusParaBD,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerObtenerListaNuevamente(!obtenerListaNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  };

  const CLASE_CONTENEDOR =
    Status === 1 ? "AdministrarRegistro" : "AdministrarRegistro Desactivado";
  const CLASE_CONTENEDOR_DETALLES =
    Status === 1
      ? "AdministrarRegistro__Detalles--Switch"
      : "AdministrarRegistro__Detalles--Switch Desactivado";

  return (
    <section className={CLASE_CONTENEDOR} key={idRegistro}>
      <span className="AdministrarRegistro__Detalles">
        <div className="AdministrarRegistro__Detalles--Contenido">
          {ImagenRegistro && (
            <img
              src={`${HOST_IMAGENES}/${ImagenRegistro}`}
              alt={NombreRegistro}
              className="AdministrarRegistro__Detalles--Imagen"
            />
          )}
          {Secciones.map(({ Icono, TextoUno, TextoDos }, index) => (
            <span key={index}>
              {Icono && <ion-icon name={Icono}></ion-icon>}
              <p>{TextoUno}</p>
              {TextoDos && <p>{TextoDos}</p>}
            </span>
          ))}
        </div>
        {NombreRegistro !== "USMX Express" &&
        NombreRegistro !== "Administrador" ? (
          <span className={CLASE_CONTENEDOR_DETALLES}>
            {Status === 1 ? (
              <button
                title="Desactivar"
                onClick={() => ActivarDesactivarRegistro(idRegistro, 0)}
              >
                <ion-icon name="power"></ion-icon>
              </button>
            ) : (
              <button
                title="Activar"
                onClick={() => ActivarDesactivarRegistro(idRegistro, 1)}
              >
                <ion-icon name="ban"></ion-icon>
              </button>
            )}
          </span>
        ) : null}
        {NombreRegistro !== "Administrador" &&
          Status === 1 &&
          OpcionesBotones.length > 0 && (
            <span className="AdministrarRegistro__Opciones">
              {OpcionesBotones.map(
                (
                  { TituloBoton, IconoBoton, ColorBoton, FuncionBoton },
                  index
                ) => (
                  <button
                    className={`AdministrarRegistro__Opciones--Boton ${ColorBoton}`}
                    title={TituloBoton || "Presionar"}
                    onClick={() => FuncionBoton(infRegistro)}
                    key={index}
                  >
                    <ion-icon name={IconoBoton}></ion-icon>
                  </button>
                )
              )}
            </span>
          )}
      </span>
    </section>
  );
}
