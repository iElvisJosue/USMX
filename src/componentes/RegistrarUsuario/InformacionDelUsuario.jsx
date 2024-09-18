// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { CamposUsuario } from "../../helpers/RegistrarUsuario/CamposUsuario";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/RegistrarUsuario/InformacionDelUsuario.css";

export default function InformacionDelUsuario() {
  const { RegistrarUsuario } = useUsuarios();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDelUsuario = handleSubmit(async (info) => {
    if (info.Contraseña !== info.ContraseñaConfirmar) {
      return toast.error("Las contraseñas no coinciden, intente nuevamente 🔒");
    }
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarUsuario(info);
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

  const ReiniciarFormulario = () => {
    reset();
  };

  const MensajeDeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarUsuario__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="InformacionDelUsuario"
      onSubmit={GuardaInformacionDelUsuario}
    >
      <h1 className="InformacionDelUsuario__Titulo">Registrar Usuario</h1>
      {CamposUsuario.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            tipoCampo,
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
            {tipoCampo !== "select" ? (
              <>
                <input
                  id={idCampo}
                  type={tipoCampo}
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                {MensajeDeError(nombreCampo)}
              </>
            ) : (
              <>
                <select
                  name={nombreCampo}
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Moderador">Moderador</option>
                </select>
                {MensajeDeError(nombreCampo)}
              </>
            )}
          </span>
        )
      )}
      <footer className="InformacionDelUsuario__Footer">
        <button
          type="button"
          className="InformacionDelUsuario__Footer__Boton Cancelar"
          onClick={ReiniciarFormulario}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="InformacionDelUsuario__Footer__Boton Guardar"
        >
          Guardar
        </button>
      </footer>
    </form>
  );
}
