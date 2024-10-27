// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarProducto from "../componentes/Productos/RegistrarProducto/RegistrarProducto";
import AdministrarProductos from "../componentes/Productos/AdministrarProductos/AdministrarProductos";

export default function Productos() {
  const [vistaProductos, establecerVistaProductos] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: "Registrar Producto",
      Icono: "add-circle",
    },
    {
      Texto: "Administrar Productos",
      Icono: "cog",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarProducto,
    1: AdministrarProductos,
  };

  const TituloSubseccion = {
    0: "Registrar Producto",
    1: "Administrar Productos",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaProductos];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion="Agencias"
        subseccion={TituloSubseccion[vistaProductos]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaProductos}
        establecerVista={establecerVistaProductos}
      />
      <ComponenteParaRenderizar />
      <Toaster richColors position="top-right" />
    </main>
  );
}
