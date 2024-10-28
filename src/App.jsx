// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorGlobal } from "./context/GlobalContext";
import { ProveedorAgencias } from "./context/AgenciasContext";
import { ProveedorPedidos } from "./context/PedidosContext";
import { ProveedorProductos } from "./context/ProductosContext";
import { ProveedorUsuarios } from "./context/UsuariosContext";
import { ProveedorOperaciones } from "./context/OperacionesContext";
import { ProveedorOcurre } from "./context/OcurreContext";
import { ProveedorConfiguracion } from "./context/ConfiguracionContext";

// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./vistas/IniciarSesion";
import Perfil from "./vistas/Perfil";
import Bienvenida from "./vistas/Bienvenida";
import NumeroDeGuia from "./vistas/NumeroDeGuia";
import Pedidos from "./vistas/Pedidos";
import Agencias from "./vistas/Agencias";
import Productos from "./vistas/Productos";
import Usuarios from "./vistas/Usuarios";
import Movimientos from "./vistas/Movimientos";
import Ocurres from "./vistas/Ocurres";
import Cargas from "./vistas/Cargas";
import Envios from "./vistas/Envios";
import Ubicaciones from "./vistas/Ubicaciones";
import Apariencia from "./vistas/Apariencia";

// PROTECCIÓN DE RUTAS
import ProteccionPorCookies from "./proteccion/ProteccionPorCookies";
import ProteccionParaAdministradores from "./proteccion/ProteccionParaAdministradores";

export default function App() {
  return (
    <ProveedorGlobal>
      <ProveedorConfiguracion>
        <ProveedorAgencias>
          <ProveedorUsuarios>
            <ProveedorPedidos>
              <ProveedorProductos>
                <ProveedorOperaciones>
                  <ProveedorOcurre>
                    <BrowserRouter>
                      <Routes>
                        {/* RUTAS SIN PROTECCIÓN */}
                        <Route path="/" element={<IniciarSesion />} />
                        <Route
                          path="/NumeroDeGuia/:GuiaPedido"
                          element={<NumeroDeGuia />}
                        />
                        {/* TERMINAN LAS RUTAS SIN PROTECCIÓN */}
                        {/* RUTAS PROTEGIDAS POR COOKIES */}
                        <Route element={<ProteccionPorCookies />}>
                          {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                          <Route element={<ProteccionParaAdministradores />}>
                            {/* RUTAS DE AGENCIAS */}
                            <Route path="/Agencias" element={<Agencias />} />
                            {/* RUTAS DE USUARIOS */}
                            <Route path="/Usuarios" element={<Usuarios />} />
                            {/* RUTAS DE PRODUCTOS */}
                            <Route path="/Productos" element={<Productos />} />
                            {/* RUTAS DE OPERACIONES */}
                            <Route
                              path="/Movimientos"
                              element={<Movimientos />}
                            />
                            {/* RUTAS DE OCURRES */}
                            <Route path="/Ocurres" element={<Ocurres />} />
                            <Route path="/Cargas" element={<Cargas />} />
                            <Route path="/Envios" element={<Envios />} />
                            <Route
                              path="/Ubicaciones"
                              element={<Ubicaciones />}
                            />
                          </Route>

                          {/* TERMINAN LAS RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                          {/* RUTAS PROTEGIDAS PARA TODOS LOS USUARIOS */}
                          <Route path="/Bienvenida" element={<Bienvenida />} />
                          <Route path="/Perfil" element={<Perfil />} />
                          <Route path="/Pedidos" element={<Pedidos />} />
                          <Route path="/Apariencia" element={<Apariencia />} />
                          {/* TERMINAN LAS RUTAS PROTEGIDAS PARA TODOS LOS USUARIOS */}
                        </Route>
                      </Routes>
                      {/* TERMINAN LAS RUTAS PROTEGIDAS POR COOKIES */}
                    </BrowserRouter>
                  </ProveedorOcurre>
                </ProveedorOperaciones>
              </ProveedorProductos>
            </ProveedorPedidos>
          </ProveedorUsuarios>
        </ProveedorAgencias>
      </ProveedorConfiguracion>
    </ProveedorGlobal>
  );
}
