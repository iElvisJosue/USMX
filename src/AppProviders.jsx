/* eslint-disable react/prop-types */
import { ProveedorSistema } from "./providers/ProveedorSistema";
import { ProveedorUsuarios } from "./providers/ProveedorUsuarios";
import { ProveedorConfiguracion } from "./providers/ProveedorConfiguracion";
import { ProveedorAgencias } from "./providers/ProveedorAgencias";
import { ProveedorPedidos } from "./providers/ProveedorPedidos";
import { ProveedorProductos } from "./providers/ProveedorProductos";
import { ProveedorRecolecciones } from "./providers/ProveedorRecolecciones";
import { ProveedorBodega } from "./providers/ProveedorBodega";
import { ProveedorOperaciones } from "./providers/ProveedorOperaciones";
import { ProveedorOcurre } from "./providers/ProveedorOcurre";

export default function AppProviders({ children }) {
  return (
    <ProveedorSistema>
      <ProveedorUsuarios>
        <ProveedorConfiguracion>
          <ProveedorAgencias>
            <ProveedorPedidos>
              <ProveedorProductos>
                <ProveedorRecolecciones>
                  <ProveedorBodega>
                    <ProveedorOperaciones>
                      <ProveedorOcurre>{children}</ProveedorOcurre>
                    </ProveedorOperaciones>
                  </ProveedorBodega>
                </ProveedorRecolecciones>
              </ProveedorProductos>
            </ProveedorPedidos>
          </ProveedorAgencias>
        </ProveedorConfiguracion>
      </ProveedorUsuarios>
    </ProveedorSistema>
  );
}
