// IMPORTAMOS LAS AYUDAS
import { HOST } from "./Urls";

export const OpcionesDelMenu = {
  Administrador: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: "#",
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "cube",
          nombre: "Realizar pedido (F)",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
          nombre: "Pedidos (F)",
          url: `${HOST}Pedidos`,
        },
        // {
        //   icono: "search-circle",
        //   nombre: "Buscar Guía",
        //   url: "#",
        // },
      ],
    },
    {
      icono: "business",
      nombre: "Agencias",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "add-circle",
          nombre: "Registrar Agencia (F)",
          url: `${HOST}Registrar-Agencia`,
        },
        {
          icono: "cog",
          nombre: "Administrar Agencias",
          url: "#",
        },
        {
          icono: "basket",
          nombre: "Asignar Productos (F)",
          url: `${HOST}Asignar-Producto-Agencia`,
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
          nombre: "Registrar Producto (F)",
          url: `${HOST}Registrar-Producto`,
        },
        {
          icono: "cog",
          nombre: "Administrar Productos",
          url: "#",
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
          nombre: "Registrar Usuario (F)",
          url: `${HOST}Registrar-Usuario`,
        },
        {
          icono: "create",
          nombre: "Administrar Usuarios",
          url: "#",
        },
        {
          icono: "business",
          nombre: "Asignar Agencia (F)",
          url: `${HOST}Asignar-Agencia-Usuario`,
        },
      ],
    },
    {
      icono: "settings",
      nombre: "Configuración",
      url: "#",
    },
  ],
  Usuario: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: "#",
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "cube",
          nombre: "Realizar pedido (F)",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
          nombre: "Pedidos (F)",
          url: `${HOST}Pedidos`,
        },
      ],
    },
  ],
};
