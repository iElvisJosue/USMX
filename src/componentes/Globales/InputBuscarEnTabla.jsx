/* eslint-disable react/prop-types */
// IMPORTAMOS LOS DICCIONARIOS A USAR
import { DICCIONARIO_PLACEHOLDERS } from "../../diccionario/Diccionario";
// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Globales/InputBuscarEnTabla.css";
export default function InputBuscarEnTabla({
  Idioma = "es",
  ArrayDeBusqueda = [],
  FuncionDeEstablecimiento,
}) {
  const BuscarPedidoEnArray = (event) => {
    const valorIntroducido = event.target.value.trim();
    if (!valorIntroducido) return FuncionDeEstablecimiento(ArrayDeBusqueda);
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      const ArrayFiltrado = ArrayDeBusqueda.filter((pedido) => {
        return pedido.GuiaPedido.startsWith(valorIntroducido);
      });
      FuncionDeEstablecimiento(ArrayFiltrado);
    }
  };
  return (
    <span className="InputBuscarEnTabla">
      <input
        type="text"
        placeholder={DICCIONARIO_PLACEHOLDERS[Idioma].BuscarGuia}
        onChange={BuscarPedidoEnArray}
      />
      <span className="InputBuscarEnTabla__Lupa">
        <ion-icon name="search"></ion-icon>
      </span>
    </span>
  );
}
