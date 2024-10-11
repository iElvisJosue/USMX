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
import RealizarPedido from "./vistas/RealizarPedido";
import RegistrarAgencia from "./vistas/RegistrarAgencia";
import RegistrarUsuario from "./vistas/RegistrarUsuario";
import RegistrarProducto from "./vistas/RegistrarProducto";
import RegistrarOcurre from "./vistas/RegistrarOcurre";
import Pedidos from "./vistas/Pedidos";
import NumeroDeGuia from "./vistas/NumeroDeGuia";
import AdministrarUsuarios from "./vistas/AdministrarUsuarios";
import AdministrarAgencias from "./vistas/AdministrarAgencias";
import AdministrarProductos from "./vistas/AdministrarProductos";
import AdministrarOcurres from "./vistas/AdministrarOcurres";
import Movimientos from "./vistas/Movimientos";
import Configuracion from "./vistas/Configuracion";

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
                            <Route
                              path="/Registrar-Agencia"
                              element={<RegistrarAgencia />}
                            />
                            <Route
                              path="/Administrar-Agencias"
                              element={<AdministrarAgencias />}
                            />
                            {/* RUTAS DE USUARIOS */}
                            <Route
                              path="/Registrar-Usuario"
                              element={<RegistrarUsuario />}
                            />
                            <Route
                              path="/Administrar-Usuarios"
                              element={<AdministrarUsuarios />}
                            />
                            {/* RUTAS DE PRODUCTOS */}
                            <Route
                              path="/Registrar-Producto"
                              element={<RegistrarProducto />}
                            />
                            <Route
                              path="/Administrar-Productos"
                              element={<AdministrarProductos />}
                            />
                            {/* RUTAS DE OPERACIONES */}
                            <Route
                              path="/Movimientos"
                              element={<Movimientos />}
                            />
                            {/* RUTAS DE OCURRES */}
                            <Route
                              path="/Registrar-Ocurre"
                              element={<RegistrarOcurre />}
                            />
                            <Route
                              path="/Administrar-Ocurres"
                              element={<AdministrarOcurres />}
                            />
                          </Route>
                          {/* TERMINAN LAS RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                          {/* RUTAS PROTEGIDAS PARA TODOS LOS USUARIOS */}
                          <Route
                            path="/Realizar-Pedido"
                            element={<RealizarPedido />}
                          />
                          <Route path="/Pedidos" element={<Pedidos />} />
                          <Route path="/Bienvenida" element={<Bienvenida />} />
                          <Route path="/Perfil" element={<Perfil />} />
                          <Route
                            path="/Configuracion"
                            element={<Configuracion />}
                          />
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
