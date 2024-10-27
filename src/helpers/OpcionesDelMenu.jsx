// IMPORTAMOS LAS AYUDAS
import { HOST } from "./Urls";

export const OpcionesDelMenu = {
  Administrador: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: `${HOST}Perfil`,
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "cube",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
        },
      ],
    },
    {
      icono: "business",
      nombre: "Agencias",
      url: `${HOST}Agencias`,
    },
    {
      icono: "basket",
      nombre: "Productos",
      url: `${HOST}Productos`,
    },
    {
      icono: "people-circle",
      nombre: "Usuarios",
      url: `${HOST}Usuarios`,
    },
    {
      icono: "code-working",
      nombre: "Operaciones",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "car",
          nombre: "Movimientos",
          url: `${HOST}Movimientos`,
        },
      ],
    },
    {
      icono: "alert-circle",
      nombre: "Ocurres",
      url: `${HOST}Ocurres`,
    },
    {
      icono: "settings",
      nombre: "Configuración",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "archive",
          nombre: "Cargas",
          url: `${HOST}Cargas`,
        },
        {
          icono: "airplane",
          nombre: "Envios",
          url: `${HOST}Envios`,
        },
        {
          icono: "earth",
          nombre: "Paises",
          url: `${HOST}Administrar-Paises`,
        },
        {
          icono: "location",
          nombre: "Estados",
          url: `${HOST}Administrar-Estados`,
        },
        {
          icono: "locate",
          nombre: "Ciudades",
          url: `${HOST}Administrar-Ciudades`,
        },
        {
          icono: "trail-sign",
          nombre: "Colonias",
          url: `${HOST}Administrar-Colonias`,
        },
      ],
    },
    {
      icono: "color-palette",
      nombre: "Apariencia",
      url: `${HOST}Apariencia`,
    },
  ],
  Usuario: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: `${HOST}Perfil`,
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "cube",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
        },
      ],
    },
    {
      icono: "color-palette",
      nombre: "Apariencia",
      url: `${HOST}Apariencia`,
    },
  ],
  Moderador: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: `${HOST}Perfil`,
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "cube",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
        },
      ],
    },
    {
      icono: "color-palette",
      nombre: "Apariencia",
      url: `${HOST}Apariencia`,
    },
  ],
};
