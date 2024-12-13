// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";

// CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";

// COMPONENTES A USAR
import Cargando from "../componentes/Cargando";

// HOOKS A USAR
import useObtenerLogoYNombreDelSistema from "../hooks/IniciarSesion/useObtenerLogoYNombreDelSistema";
import useContraseña from "../hooks/useContraseña";

// AYUDAS A USAR
import { IniciarSesionCampos } from "../helpers/IniciarSesion";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { ESTILOS_SUCCESS, ESTILOS_INFO } from "../helpers/SonnerEstilos";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";
import { HOST_IMAGENES } from "../helpers/Urls";
import { ColocarIconoYNombreDelSitio } from "../helpers/EstablecerLogoYNombreDelSistema";

// ESTILOS A USAR
import "../estilos/vistas/IniciarSesion.css";

export default function IniciarSesion() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { cargandoLogoNombreSistema, logoNombreSistema } =
    useObtenerLogoYNombreDelSistema();
  const { IniciarSesionUsuario } = useUsuarios();
  const { iconoDeContraseña } = useContraseña();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies.TOKEN_DE_ACCESO_USMX) {
      toast.error("¡Vaya! Parece que ya tienes una sesión activa.", {
        style: ESTILOS_INFO,
        action: {
          label: <ion-icon name="home"></ion-icon>,

          onClick: () => {
            window.location.href = "/Bienvenida";
          },
        },
      });
    }
  }, []);

  const ManejarRespuestaExitosa = () => {
    toast.success(`¡Se ha iniciado sesión, bienvenido! 🫡`, {
      style: ESTILOS_SUCCESS,
    });
    return setTimeout(() => (window.location.href = "/Bienvenida"), 1000);
  };

  const verificarInicioDeSesion = handleSubmit(async (data) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await IniciarSesionUsuario(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        ManejarRespuestaExitosa();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  if (cargandoLogoNombreSistema) return <Cargando />;

  ColocarIconoYNombreDelSitio(
    logoNombreSistema.LogoSistema,
    logoNombreSistema.NombreSistema
  );

  return (
    <main className="IniciarSesion">
      <form onSubmit={verificarInicioDeSesion} className="IniciarSesion__Form">
        <img
          src={`${HOST_IMAGENES}/${logoNombreSistema.LogoSistema}`}
          alt={logoNombreSistema.NombreSistema}
          className="IniciarSesion__Form--Img"
        />
        <h2 className="IniciarSesion__Form--Title">
          ¡Bienvenido a {logoNombreSistema.NombreSistema}!
        </h2>
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
    </main>
  );
}
