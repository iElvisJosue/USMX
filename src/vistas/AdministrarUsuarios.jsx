// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaAdministrarUsuarios from "../componentes/AdministrarUsuarios/ListaAdministrarUsuarios";
import ListaDeAgenciasPorUsuario from "../componentes/AsignarAgenciaUsuario/ListaDeAgenciasPorUsuario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarUsuarios.css";

export default function AdministrarUsuarios() {
  const [informacionDelUsuario, establecerInformacionDelUsuario] =
    useState(null);
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDelUsuario,
    establecerInformacionDelUsuario,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaAdministrarUsuarios,
    1: ListaDeAgenciasPorUsuario,
  };

  const TituloSubseccion = {
    0: "Administrar usuarios",
    1: "Administrar usuarios / Administrar Agencias",
    2: "Administrar usuarios / Editar Usuario",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="people-circle"
        seccion="Usuarios"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarUsuarios">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
