// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorGlobal } from "./context/GlobalContext";
import { ProveedorAgencias } from "./context/AgenciasContext";
import { ProveedorPedidos } from "./context/PedidosContext";
import { ProveedorProductos } from "./context/ProductosContext";
import { ProveedorUsuarios } from "./context/UsuariosContext";
import { ProveedorConfiguracion } from "./context/ConfiguracionContext";

// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./vistas/IniciarSesion";
import Bienvenida from "./vistas/Bienvenida";
import RealizarPedido from "./vistas/RealizarPedido";
import RegistrarAgencia from "./vistas/RegistrarAgencia";
import RegistrarUsuario from "./vistas/RegistrarUsuario";
import RegistrarProducto from "./vistas/RegistrarProducto";
import Pedidos from "./vistas/Pedidos";
import NumeroDeGuia from "./vistas/NumeroDeGuia";
import AsignarAgenciaUsuario from "./vistas/AsignarAgenciaUsuario";
import AsignarProductoAgencia from "./vistas/AsignarProductoAgencia";

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
                <BrowserRouter>
                  <Routes>
                    {/* RUTAS SIN PROTECCIÓN */}
                    <Route path="/" element={<IniciarSesion />} />
                    {/* TERMINAN LAS RUTAS SIN PROTECCIÓN */}
                    <Route
                      path="/NumeroDeGuia/:GuiaPedido"
                      element={<NumeroDeGuia />}
                    />
                    {/* RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                    <Route element={<ProteccionPorCookies />}>
                      {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                      <Route element={<ProteccionParaAdministradores />}>
                        <Route
                          path="/Registrar-Agencia"
                          element={<RegistrarAgencia />}
                        />
                        <Route
                          path="/Registrar-Usuario"
                          element={<RegistrarUsuario />}
                        />
                        <Route
                          path="/Registrar-Producto"
                          element={<RegistrarProducto />}
                        />
                        <Route
                          path="/Asignar-Agencia-Usuario"
                          element={<AsignarAgenciaUsuario />}
                        />
                        <Route
                          path="/Asignar-Producto-Agencia"
                          element={<AsignarProductoAgencia />}
                        />
                      </Route>
                      {/* TERMINAN LAS RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                      <Route
                        path="/Realizar-Pedido"
                        element={<RealizarPedido />}
                      />
                      <Route path="/Pedidos" element={<Pedidos />} />
                      <Route path="/Bienvenida" element={<Bienvenida />} />
                    </Route>
                  </Routes>
                  {/* TERMINAN LAS RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                </BrowserRouter>
              </ProveedorProductos>
            </ProveedorPedidos>
          </ProveedorUsuarios>
        </ProveedorAgencias>
      </ProveedorConfiguracion>
    </ProveedorGlobal>
  );
}
