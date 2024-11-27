// IMPORTAMOS LAS LIBRERÍAS A USAR
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  SolicitudIniciarSesion,
  SolicitudVerificarToken,
  SolicitudCerrarSesion,
} from "../api/authGlobal";

// IMPORTAMOS LAS AYUDAS
import {
  ESTILOS_INFO,
  ESTILOS_ERROR,
  ESTILOS_SUCCESS,
} from "../helpers/SonnerEstilos";
export const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debería ser usado dentro de Proveedor global");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ProveedorGlobal = ({ children }) => {
  const [usuario, establecerUsuario] = useState(null);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [cargando, establecerCargando] = useState(true);

  const setError = () => {
    establecerUsuario(null);
    establecerTieneCookie(false);
    establecerCargando(false);
  };

  const setSuccess = (res) => {
    establecerUsuario(res);
    establecerCargando(false);
    establecerTieneCookie(true);
    return res;
  };

  // COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function ValidarCookie() {
      const cookies = Cookies.get();
      if (!cookies.TOKEN_DE_ACCESO_USMX) {
        console.log("NO HAY COOKIE :(");
        setError();
        return;
      }
      try {
        const res = await SolicitudVerificarToken({
          TOKEN_DE_ACCESO_USMX: cookies.TOKEN_DE_ACCESO_USMX,
        });
        if (res.data) {
          setSuccess(res.data);
          return toast.error("¡Vaya! Parece que ya tienes una sesión activa.", {
            style: ESTILOS_INFO,
            action: {
              label: (
                <ion-icon name="home" style={{ color: "white" }}></ion-icon>
              ),
              onClick: () => {
                window.location.href = "/Bienvenida";
              },
            },
          });
        }
      } catch (err) {
        setError();
        return toast.error(err.response.data, {
          style: ESTILOS_ERROR,
        });
      }
    }
    ValidarCookie();
  }, []);

  const IniciarSesion = async (data) => {
    try {
      const res = await SolicitudIniciarSesion(data);
      if (!res.data) {
        return setError();
      }
      Cookies.set("TOKEN_DE_ACCESO_USMX", res.data.TOKEN_DE_ACCESO_USMX, {
        expires: 1,
      });
      return setSuccess(res.data);
    } catch (error) {
      setError();
      return error;
    }
  };

  const CerrarSesion = async () => {
    try {
      const res = await SolicitudCerrarSesion();
      if (res.data) {
        toast.success(res.data, {
          style: ESTILOS_SUCCESS,
        });
        return setError();
      }
    } catch (error) {
      console.log(error);
      return setError();
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        usuario,
        cargando,
        tieneCookie,
        IniciarSesion,
        CerrarSesion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
