/* eslint-disable react/prop-types */
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
  SolicitudObtenerPedidosDeUnaEntrada,
  SolicitudObtenerPedidosDeUnMovimientoEnBodega,
  SolicitudObtenerPedidosDeUnaSalida,
  SolicitudObtenerPedidosDeUnaDevolucion,
} from "../api/authBodega";
import { BodegaContext } from "../context/BodegaContext";
export const ProveedorBodega = ({ children }) => {
  const ObtenerMovimientosDeEntrada = async () => {
    try {
      const res = await SolicitudObtenerMovimientosDeEntrada();
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
  const ObtenerMovimientosDeSalida = async () => {
    try {
      const res = await SolicitudObtenerMovimientosDeSalida();
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
  const ObtenerPedidosDeUnaEntrada = async (data) => {
    try {
      const res = await SolicitudObtenerPedidosDeUnaEntrada(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerPedidosDeUnMovimientoEnBodega = async (data) => {
    try {
      const res = await SolicitudObtenerPedidosDeUnMovimientoEnBodega(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerPedidosDeUnaSalida = async (data) => {
    try {
      const res = await SolicitudObtenerPedidosDeUnaSalida(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerPedidosDeUnaDevolucion = async (data) => {
    try {
      const res = await SolicitudObtenerPedidosDeUnaDevolucion(data);
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
        ObtenerPedidosDeUnaEntrada,
        ObtenerPedidosDeUnMovimientoEnBodega,
        ObtenerPedidosDeUnaSalida,
        ObtenerPedidosDeUnaDevolucion,
      }}
    >
      {children}
    </BodegaContext.Provider>
  );
};
