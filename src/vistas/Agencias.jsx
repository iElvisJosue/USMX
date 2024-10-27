// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarAgencia from "../componentes/Agencias/RegistrarAgencia/RegistrarAgencia";
import AdministrarAgencias from "../componentes/Agencias/AdministrarAgencias/AdministrarAgencias";

export default function Agencias() {
  const [vistaAgencias, establecerVistaAgencias] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: "Registrar Agencia",
      Icono: "add-circle",
    },
    {
      Texto: "Administrar Agencias",
      Icono: "cog",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarAgencia,
    1: AdministrarAgencias,
  };

  const TituloSubseccion = {
    0: "Registrar Agencia",
    1: "Administrar Agencias",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaAgencias];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="business"
        seccion="Agencias"
        subseccion={TituloSubseccion[vistaAgencias]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaAgencias}
        establecerVista={establecerVistaAgencias}
      />
      <ComponenteParaRenderizar />
      <Toaster richColors position="top-right" />
    </main>
  );
}
