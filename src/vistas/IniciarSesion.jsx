// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// HOOKS A USAR
import useContraseña from "../hooks/useContraseña";

// AYUDAS A USAR
import { IniciarSesionCampos } from "../helpers/IniciarSesion";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { ESTILOS_SUCCESS } from "../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";

// ESTILOS A USAR
import "../estilos/vistas/IniciarSesion.css";

export default function IniciarSesion() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const navigate = useNavigate();
  const { IniciarSesion } = useGlobal();
  const { iconoDeContraseña } = useContraseña();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const ManejarRespuestaExitosa = (res) => {
    toast.success(
      `¡Se ha iniciado sesión, bienvenido ${res.Usuario.toUpperCase()}!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
    setTimeout(() => navigate("/Bienvenida"), 1000);
  };

  const verificarInicioDeSesion = handleSubmit(async (data) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await IniciarSesion(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        ManejarRespuestaExitosa(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  return (
    <main className="IniciarSesion">
      <form onSubmit={verificarInicioDeSesion} className="IniciarSesion__Form">
        <img
          src="Logo-USMX.png"
          alt="USMX Logo"
          className="IniciarSesion__Form--Img"
        />
        <h2 className="IniciarSesion__Form--Title">¡Bienvenido a USMX 🦅!</h2>
        {/* <hr className="IniciarSesion__Form--Divisor" /> */}
        {IniciarSesionCampos.map(
          ({
            iconoCampo,
            tipoCampo,
            nombreCampo,
            placeholderCampo,
            mensajeCampo,
            segundoIconoCampo = false,
          }) => (
            <>
              <div className="IniciarSesion__Form--ContenedorCampos">
                <span className="IniciarSesion__Form--ContenedorCampos--Icono">
                  <ion-icon name={iconoCampo}></ion-icon>
                </span>

                {segundoIconoCampo && iconoDeContraseña}
                {tipoCampo === "text" ? (
                  <input
                    type={tipoCampo}
                    {...register(nombreCampo, { required: true })}
                    className="IniciarSesion__Form--ContenedorCampos--Texto"
                    placeholder={placeholderCampo}
                  />
                ) : (
                  <input
                    type={tipoCampo}
                    {...register(nombreCampo, { required: true })}
                    className="IniciarSesion__Form--ContenedorCampos--Texto"
                    placeholder={placeholderCampo}
                    id="password"
                  />
                )}
              </div>
              {errors[nombreCampo] && (
                <small className="IniciarSesion__Form--MensajeError">
                  {mensajeCampo}
                </small>
              )}
            </>
          )
        )}
        <button type="submit" className="IniciarSesion__Form--BotonEnviar">
          Iniciar Sesión <ion-icon name="log-in"></ion-icon>
        </button>
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
