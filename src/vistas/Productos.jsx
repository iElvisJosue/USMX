// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_PRODUCTOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarProducto from "../componentes/Productos/RegistrarProducto/RegistrarProducto";
import AdministrarProductos from "../componentes/Productos/AdministrarProductos/AdministrarProductos";

export default function Productos() {
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaProductos, establecerVistaProductos] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_PRODUCTOS[Idioma].RegistrarProducto,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_PRODUCTOS[Idioma].AdministrarProductos,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarProducto,
    1: AdministrarProductos,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_PRODUCTOS[Idioma].RegistrarProducto,
    1: DICCIONARIO_PRODUCTOS[Idioma].AdministrarProductos,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaProductos];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion={DICCIONARIO_PRODUCTOS[Idioma].Productos}
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
