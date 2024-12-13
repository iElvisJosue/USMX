/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeProductos from "./ListaDeProductos";
import AdministrarAgenciasDelProducto from "./AdministrarAgenciasDelProducto";
import EditarProducto from "./EditarProducto";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Productos/AdministrarProductos/AdministrarProductos.css";

export default function AdministrarProductos({ Idioma }) {
  const [informacionDelProducto, establecerInformacionDelProducto] =
    useState(null);
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);
  const [vistaProductos, establecerVistaProductos] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
    vistaProductos,
    establecerVistaProductos,
    informacionDelProducto,
    establecerInformacionDelProducto,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeProductos,
    1: AdministrarAgenciasDelProducto,
    2: EditarProducto,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaProductos];

  return (
    <div className="AdministrarProductos">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
