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
import Pedidos from "./vistas/Pedidos";
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
                    <Route path="/" element={<IniciarSesion />} />
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
                          path="/Asignar-Agencia-Usuario"
                          element={<AsignarAgenciaUsuario />}
                        />
                        <Route
                          path="/Asignar-Producto-Agencia"
                          element={<AsignarProductoAgencia />}
                        />
                      </Route>
                      <Route
                        path="/Realizar-Pedido"
                        element={<RealizarPedido />}
                      />
                      <Route path="/Pedidos" element={<Pedidos />} />
                      <Route path="/Bienvenida" element={<Bienvenida />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </ProveedorProductos>
            </ProveedorPedidos>
          </ProveedorUsuarios>
        </ProveedorAgencias>
      </ProveedorConfiguracion>
    </ProveedorGlobal>
  );
}
