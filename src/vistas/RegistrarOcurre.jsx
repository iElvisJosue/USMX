// IMPORTAMOS LAS LIBRERÍAS A USAR
// import { useState, useEffect } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import InformacionOcurre from "../componentes/RegistrarOcurre/InformacionOcurre";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RegistrarOcurre.css";

export default function RegistrarOcurre() {
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="alert-circle"
        seccion="Ocurre"
        subseccion="Registrar Ocurre"
      />
      <div className="RegistrarOcurre">
        <InformacionOcurre />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
