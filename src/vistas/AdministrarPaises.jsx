// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDePaises from "../componentes/AdministrarPaises/ListaDePaises";
// import EditarPais from "../componentes/AdministrarPaises/EditarPais";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarPaises.css";

export default function AdministrarPaises() {
  const [informacionDelPais, establecerInformacionDelPais] = useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDelPais,
    establecerInformacionDelPais,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDePaises,
    // 1: EditarPais,
  };

  const TituloSubseccion = {
    0: "Administrar Paises",
    1: "Administrar Paises / Editar Pais",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="earth"
        seccion="Paises"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarPaises">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
