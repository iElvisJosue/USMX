import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";

export default function useBuscarAgenciasAsignadasYNoAsignadasPorProducto(
  idProducto
) {
  const {
    BuscarAgenciasQueTieneUnProducto,
    BuscarAgenciasQueNoTieneUnProducto,
  } = useProductos();
  const [
    agenciasAsignadasYNoAsignadasDelProducto,
    establecerAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState(null);
  const [
    cargandoAgenciasAsignadasYNoAsignadasDelProducto,
    establecerCargandoAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState(true);
  const [
    filtroAgenciasAsignadasYNoAsignadasDelProducto,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState("");
  const [
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState(false);

  useEffect(() => {
    const obtenerAgenciasAsignadasYNoAsignadas = async () => {
      try {
        const resAsignadas = await BuscarAgenciasQueTieneUnProducto({
          idProducto,
        });
        const resNoAsignadas = await BuscarAgenciasQueNoTieneUnProducto({
          filtro: filtroAgenciasAsignadasYNoAsignadasDelProducto,
          idProducto,
        });
        if (resAsignadas.response || resNoAsignadas.response) {
          const { status, data } =
            resAsignadas.response || resNoAsignadas.response;
          ManejarMensajesDeRespuesta({ status, data });
          establecerAgenciasAsignadasYNoAsignadasDelProducto({
            AgenciasAsignadas: [],
            AgenciasNoAsignadas: [],
          });
        } else {
          establecerAgenciasAsignadasYNoAsignadasDelProducto({
            AgenciasAsignadas: resAsignadas.data,
            AgenciasNoAsignadas: resNoAsignadas.data,
          });
        }
        establecerCargandoAgenciasAsignadasYNoAsignadasDelProducto(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgenciasAsignadasYNoAsignadas();
  }, [
    filtroAgenciasAsignadasYNoAsignadasDelProducto,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  ]);

  return {
    agenciasAsignadasYNoAsignadasDelProducto,
    cargandoAgenciasAsignadasYNoAsignadasDelProducto,
    filtroAgenciasAsignadasYNoAsignadasDelProducto,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelProducto,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  };
}
