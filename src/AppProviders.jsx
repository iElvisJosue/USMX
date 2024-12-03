/* eslint-disable react/prop-types */
import { ProveedorGlobal } from "./context/GlobalContext";
import { ProveedorAgencias } from "./context/AgenciasContext";
import { ProveedorPedidos } from "./context/PedidosContext";
import { ProveedorProductos } from "./context/ProductosContext";
import { ProveedorUsuarios } from "./context/UsuariosContext";
import { ProveedorRecolecciones } from "./context/RecoleccionesContext";
import { ProveedorBodega } from "./context/BodegaContext";
import { ProveedorOperaciones } from "./context/OperacionesContext";
import { ProveedorOcurre } from "./context/OcurreContext";
import { ProveedorConfiguracion } from "./context/ConfiguracionContext";

export default function AppProviders({ children }) {
  return (
    <ProveedorGlobal>
      <ProveedorConfiguracion>
        <ProveedorAgencias>
          <ProveedorUsuarios>
            <ProveedorRecolecciones>
              <ProveedorBodega>
                <ProveedorPedidos>
                  <ProveedorProductos>
                    <ProveedorOperaciones>
                      <ProveedorOcurre>{children}</ProveedorOcurre>
                    </ProveedorOperaciones>
                  </ProveedorProductos>
                </ProveedorPedidos>
              </ProveedorBodega>
            </ProveedorRecolecciones>
          </ProveedorUsuarios>
        </ProveedorAgencias>
      </ProveedorConfiguracion>
    </ProveedorGlobal>
  );
}
