// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_PRODUCTOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarProducto from "../componentes/Productos/RegistrarProducto/RegistrarProducto";
import AdministrarProductos from "../componentes/Productos/AdministrarProductos/AdministrarProductos";

export default function Productos() {
  const { idioma } = useConfiguracion();
  const [vistaProductos, establecerVistaProductos] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_PRODUCTOS[idioma].RegistrarProducto,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_PRODUCTOS[idioma].AdministrarProductos,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarProducto,
    1: AdministrarProductos,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_PRODUCTOS[idioma].RegistrarProducto,
    1: DICCIONARIO_PRODUCTOS[idioma].AdministrarProductos,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaProductos];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion={DICCIONARIO_PRODUCTOS[idioma].Productos}
        subseccion={TituloSubseccion[vistaProductos]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaProductos}
        establecerVista={establecerVistaProductos}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
