/* eslint-disable react/prop-types */
import { ProveedorSistema } from "./providers/ProveedorSistema";
import { ProveedorUsuarios } from "./providers/ProveedorUsuarios";
import { ProveedorAgencias } from "./context/AgenciasContext";
import { ProveedorPedidos } from "./context/PedidosContext";
import { ProveedorProductos } from "./context/ProductosContext";
import { ProveedorRecolecciones } from "./context/RecoleccionesContext";
import { ProveedorBodega } from "./context/BodegaContext";
import { ProveedorOperaciones } from "./context/OperacionesContext";
import { ProveedorOcurre } from "./context/OcurreContext";
import { ProveedorConfiguracion } from "./context/ConfiguracionContext";

export default function AppProviders({ children }) {
  return (
    <ProveedorSistema>
      <ProveedorUsuarios>
        <ProveedorConfiguracion>
          <ProveedorAgencias>
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
          </ProveedorAgencias>
        </ProveedorConfiguracion>
      </ProveedorUsuarios>
    </ProveedorSistema>
  );
}
