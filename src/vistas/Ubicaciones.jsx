// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import AdministrarPaises from "../componentes/Ubicaciones/Paises/AdministrarPaises/AdministrarPaises";
import AdministrarEstados from "../componentes/Ubicaciones/Estados/AdministrarEstados/AdministrarEstados";
import AdministrarCiudades from "../componentes/Ubicaciones/Ciudades/AdministrarCiudades/AdministrarCiudades";
import AdministrarColonias from "../componentes/Ubicaciones/Colonias/AdministrarColonias/AdministrarColonias";

export default function Ubicaciones() {
  const [vistaUbicaciones, establecerVistaUbicaciones] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: "Paises",
      Icono: "earth",
    },
    {
      Texto: "Estados",
      Icono: "location",
    },
    {
      Texto: "Ciudades",
      Icono: "locate",
    },
    {
      Texto: "Colonias",
      Icono: "trail-sign",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: AdministrarPaises,
    1: AdministrarEstados,
    2: AdministrarCiudades,
    3: AdministrarColonias,
  };

  const TituloSubseccion = {
    0: "Países",
    1: "Estados",
    2: "Ciudades",
    3: "Colonias",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaUbicaciones];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="globe"
        seccion="Ubicaciones"
        subseccion={TituloSubseccion[vistaUbicaciones]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaUbicaciones}
        establecerVista={establecerVistaUbicaciones}
      />
      <ComponenteParaRenderizar />
      <Toaster richColors position="top-right" />
    </main>
  );
}
