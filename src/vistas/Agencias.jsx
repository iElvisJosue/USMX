// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarAgencia from "../componentes/Agencias/RegistrarAgencia/RegistrarAgencia";
import AdministrarAgencias from "../componentes/Agencias/AdministrarAgencias/AdministrarAgencias";

// IMPORTAMOS LAS AYUDAS A USAR
import { DICCIONARIO_AGENCIAS } from "../diccionario/Diccionario";

export default function Agencias() {
  const { idioma } = useConfiguracion();
  const [vistaAgencias, establecerVistaAgencias] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_AGENCIAS[idioma].RegistrarAgencia,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_AGENCIAS[idioma].AdministrarAgencias,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarAgencia,
    1: AdministrarAgencias,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_AGENCIAS[idioma].RegistrarAgencia,
    1: DICCIONARIO_AGENCIAS[idioma].AdministrarAgencias,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaAgencias];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="business"
        seccion={DICCIONARIO_AGENCIAS[idioma].Agencias}
        subseccion={TituloSubseccion[vistaAgencias]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaAgencias}
        establecerVista={establecerVistaAgencias}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
