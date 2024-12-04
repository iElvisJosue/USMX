// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTAMOS LOS PROVEEDORES
import AppProviders from "./AppProviders.jsx";

// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./vistas/IniciarSesion";
import Perfil from "./vistas/Perfil";
import Bienvenida from "./vistas/Bienvenida";
import NumeroDeGuia from "./vistas/NumeroDeGuia";
import Pedidos from "./vistas/Pedidos";
import Agencias from "./vistas/Agencias";
import Productos from "./vistas/Productos";
import Usuarios from "./vistas/Usuarios";
import Recolecciones from "./vistas/Recolecciones";
import BodegaEntradas from "./vistas/BodegaEntradas.jsx";
import BodegaMovimientos from "./vistas/BodegaMovimientos";
import BodegaSalidas from "./vistas/BodegaSalidas";
import BodegaDevoluciones from "./vistas/BodegaDevoluciones";
import Movimientos from "./vistas/Movimientos";
import Ocurres from "./vistas/Ocurres";
import Cargas from "./vistas/Cargas";
import Envios from "./vistas/Envios";
import Ubicaciones from "./vistas/Ubicaciones";
import Apariencia from "./vistas/Apariencia";

// PROTECCIÓN DE RUTAS
import ProteccionPorCookies from "./proteccion/ProteccionPorCookies";
import ProteccionParaAdministradores from "./proteccion/ProteccionParaAdministradores";
import ProteccionParaUsuariosYAdministradores from "./proteccion/ProteccionParaUsuariosYAdministradores";
import ProteccionParaChoferesYAdministradores from "./proteccion/ProteccionParaChoferesYAdministradores";
import ProteccionParaBodeguerosYAdministradores from "./proteccion/ProteccionParaBodeguerosYAdministradores.jsx";
import ProteccionParaBienvenida from "./proteccion/ProteccionParaBienvenida";

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          {/* RUTAS SIN PROTECCIÓN */}
          <Route path="/" element={<IniciarSesion />} />
          <Route path="/NumeroDeGuia/:GuiaPedido" element={<NumeroDeGuia />} />
          {/* TERMINAN LAS RUTAS SIN PROTECCIÓN */}
          {/* RUTAS PROTEGIDAS POR COOKIES */}
          <Route element={<ProteccionPorCookies />}>
            {/* RUTAS PARA TODOS LOS USUARIOS */}
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Apariencia" element={<Apariencia />} />
            {/* TERMINAN LAS RUTAS PARA TODOS LOS USUARIOS */}

            {/* RUTA PROTEGIDA PARA ADMINS, USUARIOS Y MODERADORES */}
            <Route element={<ProteccionParaBienvenida />}>
              <Route path="/Bienvenida" element={<Bienvenida />} />
            </Route>
            {/* TERMINA LA RUTA PROTEGIDA PARA ADMINS, USUARIOS Y MODERADORES */}

            {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
            <Route element={<ProteccionParaAdministradores />}>
              {/* RUTAS DE AGENCIAS */}
              <Route path="/Agencias" element={<Agencias />} />
              {/* RUTAS DE USUARIOS */}
              <Route path="/Usuarios" element={<Usuarios />} />
              {/* RUTAS DE PRODUCTOS */}
              <Route path="/Productos" element={<Productos />} />
              {/* RUTAS DE OPERACIONES */}
              <Route path="/Movimientos" element={<Movimientos />} />
              {/* RUTAS DE OCURRES */}
              <Route path="/Ocurres" element={<Ocurres />} />
              <Route path="/Cargas" element={<Cargas />} />
              <Route path="/Envios" element={<Envios />} />
              <Route path="/Ubicaciones" element={<Ubicaciones />} />
            </Route>
            {/* TERMINAN LAS RUTAS PROTEGIDAS PARA ADMINISTRADORES */}

            {/* RUTAS PROTEGIDAS PARA USUARIOS Y ADMINS */}
            <Route element={<ProteccionParaUsuariosYAdministradores />}>
              <Route path="/Pedidos" element={<Pedidos />} />
            </Route>
            {/* TERMINAN LAS RUTAS PROTEGIDAS PARA USUARIOS Y ADMINS */}

            {/* RUTAS PROTEGIDAS PARA BODEGUEROS Y ADMINS */}
            <Route element={<ProteccionParaBodeguerosYAdministradores />}>
              <Route path="/Bodega-Entradas" element={<BodegaEntradas />} />
              <Route
                path="/Bodega-Movimientos"
                element={<BodegaMovimientos />}
              />
              <Route path="/Bodega-Salidas" element={<BodegaSalidas />} />
              <Route
                path="/Bodega-Devoluciones"
                element={<BodegaDevoluciones />}
              />
            </Route>
            {/* TERMINAN LAS RUTAS PROTEGIDAS PARA BODEGUEROS Y ADMINS */}

            {/* RUTAS PROTEGIDAS PARA CHOFERES Y ADMINS */}
            <Route element={<ProteccionParaChoferesYAdministradores />}>
              <Route path="/Recolecciones" element={<Recolecciones />} />
            </Route>
            {/* TERMINAN LAS RUTAS PROTEGIDAS PARA CHOFERES Y ADMINS */}
          </Route>
        </Routes>
        {/* TERMINAN LAS RUTAS PROTEGIDAS POR COOKIES */}
      </BrowserRouter>
    </AppProviders>
  );
}
