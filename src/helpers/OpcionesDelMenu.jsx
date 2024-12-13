// IMPORTAMOS LOS CONTEXTOS A USAR
// IMPORTAMOS LAS AYUDAS
import { DICCIONARIO_OPCIONES_DEL_MENU } from "../diccionario/Diccionario";

export default function OpcionesDelMenu(Idioma) {
  const OpcionesMenu = {
    Administrador: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Perfil}`,
        url: "/Perfil",
      },
      {
        icono: "storefront",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Pedidos}`,
            url: "/Pedidos",
          },
        ],
      },
      {
        icono: "business",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Agencias}`,
        url: "/Agencias",
      },
      {
        icono: "basket",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Productos}`,
        url: "/Productos",
      },
      {
        icono: "bag-check",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Recolecciones}`,
        url: "/Recolecciones",
      },
      {
        icono: "people-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Usuarios}`,
        url: "/Usuarios",
      },
      {
        icono: "cube",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Bodega}`,
        url: `#`,
        opcionesSecundarias: [
          {
            icono: "log-in",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Entrada}`,
            url: "/Bodega-Entradas",
          },
          {
            icono: "swap-horizontal",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Movimientos}`,
            url: `/Bodega-Movimientos`,
          },
          {
            icono: "log-out",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Salida}`,
            url: `/Bodega-Salidas`,
          },
          {
            icono: "arrow-undo",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Devolucion}`,
            url: `/Bodega-Devoluciones`,
          },
        ],
      },
      {
        icono: "code-working",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Operaciones}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "car",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Movimientos}`,
            url: `/Movimientos`,
          },
          {
            icono: "archive",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Cargas}`,
            url: `/Cargas`,
          },
          {
            icono: "airplane",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Envios}`,
            url: `/Envios`,
          },
        ],
      },
      {
        icono: "alert-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Ocurres}`,
        url: `/Ocurres`,
      },
      {
        icono: "desktop",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Sistema}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "settings",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Ajustes}`,
            url: `/Ajustes`,
          },
          {
            icono: "color-palette",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Apariencia}`,
            url: `/Apariencia`,
          },
        ],
      },
    ],
    Usuario: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Perfil}`,
        url: `/Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Pedidos}`,
            url: `/Pedidos`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Apariencia}`,
        url: `/Apariencia`,
      },
    ],
    Moderador: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Perfil}`,
        url: `/Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Pedidos}`,
            url: `/Pedidos`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Apariencia}`,
        url: `/Apariencia`,
      },
    ],
    Chofer: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Perfil}`,
        url: `/Perfil`,
      },
      {
        icono: "bag-check",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Recolecciones}`,
        url: `/Recolecciones`,
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Apariencia}`,
        url: `/Apariencia`,
      },
    ],
    Bodega: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Perfil}`,
        url: `/Perfil`,
      },
      {
        icono: "cube",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Bodega}`,
        url: `#`,
        opcionesSecundarias: [
          {
            icono: "log-in",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Entrada}`,
            url: `/Bodega-Entradas`,
          },
          {
            icono: "swap-horizontal",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Movimientos}`,
            url: `/Bodega-Movimientos`,
          },
          {
            icono: "log-out",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Salida}`,
            url: `/Bodega-Salidas`,
          },
          {
            icono: "arrow-undo",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Devolucion}`,
            url: `/Bodega-Devoluciones`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[Idioma].Apariencia}`,
        url: `/Apariencia`,
      },
    ],
  };

  return {
    OpcionesMenu,
  };
}
