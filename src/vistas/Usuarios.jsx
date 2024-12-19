// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";

// IMPORTAMOS EL DICCIONARIO A USAR
import { DICCIONARIO_USUARIOS } from "../diccionario/Diccionario";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Globales/Encabezado";
import SubMenu from "../componentes/Globales/SubMenu";
import RegistrarUsuario from "../componentes/Usuarios/RegistrarUsuario/RegistrarUsuario";
import AdministrarUsuarios from "../componentes/Usuarios/AdministrarUsuarios/AdministrarUsuarios";

export default function Usuarios() {
  const { infUsuario } = useSistema();
  const { Idioma } = infUsuario;
  const [vistaUsuario, establecerVistaUsuario] = useState(0);

  const OpcionesSubMenu = [
    {
      Texto: DICCIONARIO_USUARIOS[Idioma].RegistrarUsuario,
      Icono: "person-add",
    },
    {
      Texto: DICCIONARIO_USUARIOS[Idioma].AdministrarUsuarios,
      Icono: "cog",
    },
  ];

  // VALORES COMPARTIDOS ENTRE LOS COMPONENTES
  const valoresParaLosComponentes = {
    Idioma,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarUsuario,
    1: AdministrarUsuarios,
  };

  const TituloSubseccion = {
    0: DICCIONARIO_USUARIOS[Idioma].RegistrarUsuario,
    1: DICCIONARIO_USUARIOS[Idioma].AdministrarUsuarios,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaUsuario];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="people-circle"
        seccion={DICCIONARIO_USUARIOS[Idioma].Usuarios}
        subseccion={TituloSubseccion[vistaUsuario]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaUsuario}
        establecerVista={establecerVistaUsuario}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </main>
  );
}
