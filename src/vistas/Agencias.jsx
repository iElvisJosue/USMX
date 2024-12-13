// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarAgencia from "../componentes/Agencias/RegistrarAgencia/RegistrarAgencia";
import AdministrarAgencias from "../componentes/Agencias/AdministrarAgencias/AdministrarAgencias";

// IMPORTAMOS LAS AYUDAS A USAR
import { DICCIONARIO_AGENCIAS } from "../diccionario/Diccionario";

export default function Agencias() {
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaAgencias, establecerVistaAgencias] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_AGENCIAS[Idioma].RegistrarAgencia,
      Icono: "add-circle",
    },
    {
      Texto: DICCIONARIO_AGENCIAS[Idioma].AdministrarAgencias,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarAgencia,
    1: AdministrarAgencias,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_AGENCIAS[Idioma].RegistrarAgencia,
    1: DICCIONARIO_AGENCIAS[Idioma].AdministrarAgencias,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaAgencias];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="business"
        seccion={DICCIONARIO_AGENCIAS[Idioma].Agencias}
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
