// IMPORTAMOS LOS CONTEXTOS A USAR
// IMPORTAMOS LAS AYUDAS
import { HOST } from "./Urls";
import { DICCIONARIO_OPCIONES_DEL_MENU } from "../diccionario/Diccionario";

export default function OpcionesDelMenu(idioma) {
  const OpcionesMenu = {
    Administrador: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Perfil}`,
        url: `${HOST}Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Pedidos}`,
            url: `${HOST}Pedidos`,
          },
        ],
      },
      {
        icono: "business",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Agencias}`,
        url: `${HOST}Agencias`,
      },
      {
        icono: "basket",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Productos}`,
        url: `${HOST}Productos`,
      },
      {
        icono: "people-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Usuarios}`,
        url: `${HOST}Usuarios`,
      },
      {
        icono: "code-working",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Operaciones}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "car",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Movimientos}`,
            url: `${HOST}Movimientos`,
          },
        ],
      },
      {
        icono: "alert-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Ocurres}`,
        url: `${HOST}Ocurres`,
      },
      {
        icono: "settings",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Configuracion}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "archive",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Cargas}`,
            url: `${HOST}Cargas`,
          },
          {
            icono: "airplane",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Envios}`,
            url: `${HOST}Envios`,
          },
          // {
          //   icono: "globe",
          //   nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Ubicaciones}`,
          //   url: `${HOST}Ubicaciones`,
          // },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Apariencia}`,
        url: `${HOST}Apariencia`,
      },
    ],
    Usuario: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Perfil}`,
        url: `${HOST}Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Pedidos}`,
            url: `${HOST}Pedidos`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Apariencia}`,
        url: `${HOST}Apariencia`,
      },
    ],
    Moderador: [
      {
        icono: "person-circle",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Perfil}`,
        url: `${HOST}Perfil`,
      },
      {
        icono: "storefront",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Paqueteria}`,
        url: "#",
        opcionesSecundarias: [
          {
            icono: "cube",
            nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Pedidos}`,
            url: `${HOST}Pedidos`,
          },
        ],
      },
      {
        icono: "color-palette",
        nombre: `${DICCIONARIO_OPCIONES_DEL_MENU[idioma].Apariencia}`,
        url: `${HOST}Apariencia`,
      },
    ],
  };

  return {
    OpcionesMenu,
  };
}
