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
          nombre: "Realizar pedido",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
        },
      ],
    },
    {
      icono: "business",
      nombre: "Agencias",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "add-circle",
          nombre: "Registrar Agencia",
          url: `${HOST}Registrar-Agencia`,
        },
        {
          icono: "cog",
          nombre: "Administrar Agencias",
          url: `${HOST}Administrar-Agencias`,
        },
      ],
    },
    {
      icono: "basket",
      nombre: "Productos",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "add-circle",
          nombre: "Registrar Producto",
          url: `${HOST}Registrar-Producto`,
        },
        {
          icono: "cog",
          nombre: "Administrar Productos",
          url: `${HOST}Administrar-Productos`,
        },
      ],
    },
    {
      icono: "people-circle",
      nombre: "Usuarios",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "person-add",
          nombre: "Registrar Usuario",
          url: `${HOST}Registrar-Usuario`,
        },
        {
          icono: "cog",
          nombre: "Administrar Usuarios",
          url: `${HOST}Administrar-Usuarios`,
        },
      ],
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
      nombre: "Ocurre",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "add-circle",
          nombre: "Registrar Ocurre",
          url: `${HOST}Registrar-Ocurre`,
        },
        {
          icono: "cog",
          nombre: "Administrar Ocurres",
          url: `${HOST}Administrar-Ocurres`,
        },
      ],
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
          nombre: "Realizar pedido",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
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
          nombre: "Realizar pedido",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
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
