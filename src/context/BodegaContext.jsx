/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudObtenerMovimientosDeEntrada,
  SolicitudObtenerInformacionDeGuiaParaEntradas,
  SolicitudCrearEntrada,
  SolicitudBuscarTodasLasEntradasABodegaPorFiltro,
  SolicitudBuscarTodasLasEntradasABodegaPorFecha,
  SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro,
  SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha,
  SolicitudCrearDevolucion,
  SolicitudObtenerInformacionDeGuiaParaDevolucion,
  SolicitudBuscarTodasLasDevolucionesPorFiltro,
  SolicitudBuscarTodasLasDevolucionesPorFecha,
  SolicitudBuscarDevolucionesDeUnBodegueroPorFiltro,
  SolicitudBuscarDevolucionesDeUnBodegueroPorFecha,
  SolicitudCrearMovimientoEnBodega,
  SolicitudObtenerInformacionDeGuiaParaMovimientoEnBodega,
  SolicitudBuscarTodosLosMovimientosEnBodegaPorFiltro,
  SolicitudBuscarTodosLosMovimientosEnBodegaPorFecha,
  SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFiltro,
  SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFecha,
  SolicitudObtenerMovimientosDeSalida,
  SolicitudObtenerInformacionDeGuiaParaSalidas,
  SolicitudCrearSalida,
  SolicitudBuscarTodasLasSalidasABodegaPorFiltro,
  SolicitudBuscarTodasLasSalidasABodegaPorFecha,
  SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro,
  SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha,
} from "../api/authBodega";

export const BodegaContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBodega = () => {
  const context = useContext(BodegaContext);
  if (!context) {
    throw new Error("useBodega debería ser usado dentro de Proveedor bodega");
  }
  return context;
};
export const ProveedorBodega = ({ children }) => {
  const ObtenerMovimientosDeEntrada = async (data) => {
    try {
      const res = await SolicitudObtenerMovimientosDeEntrada(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerInformacionDeGuiaParaEntradas = async (data) => {
    try {
      const res = await SolicitudObtenerInformacionDeGuiaParaEntradas(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const CrearEntrada = async (data) => {
    try {
      const res = await SolicitudCrearEntrada(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasEntradasABodegaPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasEntradasABodegaPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasEntradasABodegaPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasEntradasABodegaPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro = async (data) => {
    try {
      const res =
        await SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro(
          data
        );
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha = async (data) => {
    try {
      const res =
        await SolicitudBuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const CrearDevolucion = async (data) => {
    try {
      const res = await SolicitudCrearDevolucion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerInformacionDeGuiaParaDevolucion = async (data) => {
    try {
      const res = await SolicitudObtenerInformacionDeGuiaParaDevolucion(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarTodasLasDevolucionesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasDevolucionesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodasLasDevolucionesPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasDevolucionesPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarDevolucionesDeUnBodegueroPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarDevolucionesDeUnBodegueroPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarDevolucionesDeUnBodegueroPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarDevolucionesDeUnBodegueroPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const CrearMovimientoEnBodega = async (data) => {
    try {
      const res = await SolicitudCrearMovimientoEnBodega(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerInformacionDeGuiaParaMovimientoEnBodega = async (data) => {
    try {
      const res = await SolicitudObtenerInformacionDeGuiaParaMovimientoEnBodega(
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarTodosLosMovimientosEnBodegaPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarTodosLosMovimientosEnBodegaPorFiltro(
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarTodosLosMovimientosEnBodegaPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarTodosLosMovimientosEnBodegaPorFecha(
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro = async (data) => {
    try {
      const res =
        await SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarMovimientosEnBodegaDeUnBodegueroPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarMovimientosEnBodegaDeUnBodegueroPorFecha(
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerMovimientosDeSalida = async (data) => {
    try {
      const res = await SolicitudObtenerMovimientosDeSalida(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerInformacionDeGuiaParaSalidas = async (data) => {
    try {
      const res = await SolicitudObtenerInformacionDeGuiaParaSalidas(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const CrearSalida = async (data) => {
    try {
      const res = await SolicitudCrearSalida(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarTodasLasSalidasABodegaPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasSalidasABodegaPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarTodasLasSalidasABodegaPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarTodasLasSalidasABodegaPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro = async (data) => {
    try {
      const res =
        await SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha = async (data) => {
    try {
      const res =
        await SolicitudBuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <BodegaContext.Provider
      value={{
        ObtenerMovimientosDeEntrada,
        ObtenerInformacionDeGuiaParaEntradas,
        CrearEntrada,
        BuscarTodasLasEntradasABodegaPorFiltro,
        BuscarTodasLasEntradasABodegaPorFecha,
        BuscarTodasLasEntradasABodegaDeUnBodegueroPorFiltro,
        BuscarTodasLasEntradasABodegaDeUnBodegueroPorFecha,
        CrearDevolucion,
        ObtenerInformacionDeGuiaParaDevolucion,
        BuscarTodasLasDevolucionesPorFiltro,
        BuscarTodasLasDevolucionesPorFecha,
        BuscarDevolucionesDeUnBodegueroPorFiltro,
        BuscarDevolucionesDeUnBodegueroPorFecha,
        CrearMovimientoEnBodega,
        ObtenerInformacionDeGuiaParaMovimientoEnBodega,
        BuscarTodosLosMovimientosEnBodegaPorFiltro,
        BuscarTodosLosMovimientosEnBodegaPorFecha,
        BuscarMovimientosEnBodegaDeUnBodegueroPorFiltro,
        BuscarMovimientosEnBodegaDeUnBodegueroPorFecha,
        ObtenerMovimientosDeSalida,
        ObtenerInformacionDeGuiaParaSalidas,
        CrearSalida,
        BuscarTodasLasSalidasABodegaPorFiltro,
        BuscarTodasLasSalidasABodegaPorFecha,
        BuscarTodasLasSalidasABodegaDeUnBodegueroPorFiltro,
        BuscarTodasLasSalidasABodegaDeUnBodegueroPorFecha,
      }}
    >
      {children}
    </BodegaContext.Provider>
  );
};
