/* INICIA DICCIONARIO PARA LAS VISTAS DEL MENU */
export const DICCIONARIO_OPCIONES_DEL_MENU = {
  es: {
    Perfil: "Perfil",
    Paqueteria: "Paquetería",
    Agencias: "Agencias",
    Productos: "Productos",
    Usuarios: "Usuarios",
    Operaciones: "Operaciones",
    Movimientos: "Movimientos",
    Pedidos: "Pedidos",
    Recolecciones: "Recolecciones",
    Bodega: "Bodega",
    Entrada: "Entrada ",
    Salida: "Salida",
    Devolucion: "Devolucion",
    Ocurres: "Ocurres",
    Configuracion: "Configuración",
    Cargas: "Cargas",
    Envios: "Envios",
    Ubicaciones: "Ubicaciones",
    Apariencia: "Apariencia",
  },
  en: {
    Perfil: "Profile",
    Paqueteria: "Shipping",
    Pedidos: "Orders",
    Agencias: "Agencies",
    Productos: "Products",
    Usuarios: "Users",
    Operaciones: "Operations",
    Movimientos: "Movements",
    Recolecciones: "Collections",
    Bodega: "Warehouse",
    Entrada: "Entry",
    Salida: "Exit",
    Devolucion: "Return",
    Ocurres: "Ocurrences",
    Configuracion: "Configuration",
    Cargas: "Loads",
    Envios: "Deliveries",
    Ubicaciones: "Locations",
    Apariencia: "Appearance",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS DEL MENU */

/* INICIA DICCIONARIO PARA LA VISTA DE BIENVENIDA */
export const DICCIONARIO_BIENVENIDA = {
  es: {
    Bienvenido: "Bienvenido",
    MensajeUno: "Bienvenido al sistema: ",
    MensajeDos:
      "Gestiona tus envíos de paquetería de manera rápida y sencilla.",
    MensajeTres: "¡Comienza ahora a rastrear y administrar tus paquetes!",
    Perfil: "Perfil",
    Pedidos: "Pedidos",
    ResumenDeHoy: "Resumen de hoy",
    Recolecciones: "Recolecciones",
    EntradasBodega: "Entradas a bodega",
    MovimientosBodega: "Movimientos en bodega",
    SalidasBodega: "Salidas de bodega",
    Devoluciones: "Devoluciones",
    UltimosDiezPedidos: "Los 10 pedidos mas recientes",
    General: "General",
    ListaDePedidos: "Lista de pedidos",
    RealizarPedido: "Realizar pedido",
  },
  en: {
    Bienvenido: "Welcome",
    MensajeUno: "Welcome to the system: ",
    MensajeDos: "Manage your shipping orders in a quick and easy way.",
    MensajeTres: "Start now to track and manage your packages!",
    Perfil: "Profile",
    Pedidos: "Orders",
    ResumenDeHoy: "Today's summary",
    Recolecciones: "Collections",
    EntradasBodega: "Entry to warehouse",
    MovimientosBodega: "Movements in warehouse",
    SalidasBodega: "Exit from warehouse",
    Devoluciones: "Returns",
    UltimosDiezPedidos: "Latest 10 orders",
    General: "General",
    ListaDePedidos: "Orders list",
    RealizarPedido: "Make an order",
  },
};
/* TERMINA DICCIONARIO PARA LA VISTA DE BIENVENIDA */

/* INICIA DICCIONARIO PARA LA VISTA DE PERFIL */
export const DICCIONARIO_PERFIL = {
  es: {
    Perfil: "Perfil",
    Correo: "Correo",
    Telefono: "Teléfono",
    FechaDeCreacion: "Fecha de creación",
  },
  en: {
    Perfil: "Profile",
    Correo: "Email",
    Telefono: "Phone",
    FechaDeCreacion: "Creation date",
  },
};
/* TERMINA DICCIONARIO PARA LA VISTA DE PERFIL */

/* INICIA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS PEDIDOS */
export const DICCIONARIO_PEDIDOS = {
  es: {
    Paqueteria: "Paquetería",
    RealizarPedido: "Realizar Pedido",
    ListaDePedidos: "Lista de Pedidos",
  },
  en: {
    Paqueteria: "Shipping",
    RealizarPedido: "Make an Order",
    ListaDePedidos: "Orders List",
  },
};
export const DICCIONARIO_REALIZAR_PEDIDO = {
  es: {
    Remitente: "Remitente",
    Destinatario: "Destinatario",
    Pedido: "Pedido",
  },
  en: {
    Remitente: "Sender",
    Destinatario: "Recipient",
    Pedido: "Order",
  },
};
export const DICCIONARIO_SELECCIONAR_AGENCIA_PEDIDO = {
  es: {
    SeleccionaUnaAgencia: "Selecciona una agencia",
    SinAgencias: "¡Oops! Parece que no tienes una agencia asignada.",
    BuscarAgencia: "Buscar agencia por nombre",
    RegistrarAgencia: "Registrar agencia",
  },
  en: {
    SeleccionaUnaAgencia: "Select an agency",
    SinAgencias: "Oops! It seems you don't have an agency assigned.",
    BuscarAgencia: "Search an agency by name",
    RegistrarAgencia: "Register agency",
  },
};
export const DICCIONARIO_REGISTRAR_NUEVO_REMITENTE_PEDIDO = {
  es: {
    RegistrarNuevoRemitente: "Registrar nuevo remitente",
    Nombre: "Nombre",
    Apellidos: "Apellidos",
    TelefonoUno: "Teléfono #1",
    TelefonoDos: "Teléfono #2 (Opcional)",
    CorreoElectronico: "Correo electrónico",
  },
  en: {
    RegistrarNuevoRemitente: "Register new sender",
    Nombre: "Name",
    Apellidos: "Last name",
    TelefonoUno: "Phone #1",
    TelefonoDos: "Phone #2 (Optional)",
    CorreoElectronico: "Email",
  },
};
export const DICCIONARIO_SELECCIONAR_REMITENTE_PEDIDO = {
  es: {
    SeleccionarRemitente: "Seleccionar remitente",
    BuscarRemitente: "Buscar remitente por nombre",
  },
  en: {
    SeleccionarRemitente: "Select sender",
    BuscarRemitente: "Search sender by name",
  },
};
export const DICCIONARIO_REGISTRAR_NUEVO_DESTINATARIO_PEDIDO = {
  es: {
    RegistrarNuevoDestinatario: "Registrar nuevo destinatario",
    Nombre: "Nombre",
    Apellidos: "Apellidos",
    TelefonoUno: "Teléfono #1",
    TelefonoDos: "Teléfono #2 (Opcional)",
    CorreoElectronico: "Correo electrónico",
  },
  en: {
    RegistrarNuevoDestinatario: "Register new recipient",
    Nombre: "Name",
    Apellidos: "Last name",
    TelefonoUno: "Phone #1",
    TelefonoDos: "Phone #2 (Optional)",
    CorreoElectronico: "Email",
  },
};
export const DICCIONARIO_SELECCIONAR_DESTINATARIO_PEDIDO = {
  es: {
    SeleccionarDestinatario: "Seleccionar destinatario",
    BuscarDestinatario: "Buscar destinatario por nombre",
  },
  en: {
    SeleccionarDestinatario: "Select recipient",
    BuscarDestinatario: "Search recipient by name",
  },
};
export const DICCIONARIO_SELECCIONAR_OCURRE_PEDIDO = {
  es: {
    IngresaElNombre: "Ingresa el nombre",
    Nombre: "Nombre",
    Apellidos: "Apellidos",
    SeleccionarOcurre: "Seleccionar ocurre",
    BuscarOcurre: "Buscar ocurre",
    RegistrarOcurre: "Registrar ocurre",
  },
  en: {
    IngresaElNombre: "Enter the name",
    Nombre: "Name",
    Apellidos: "Last name",
    SeleccionarOcurre: "Select ocurrence",
    BuscarOcurre: "Search ocurrence",
    RegistrarOcurre: "Register ocurrence",
  },
};
export const DICCIONARIO_INFORMACION_DEL_PEDIDO = {
  es: {
    InformacionDelPedido: "Información del pedido",
    Nombre: "Nombre",
    Producto: "Producto",
    SeleccionaUnProducto: "Selecciona un producto",
    Cantidad: "Cantidad",
    TipoDeCarga: "Tipo de carga",
    SeleccionaUnTipoDeCarga: "Selecciona un tipo de carga",
    TipoDeEnvio: "Tipo de envío",
    SeleccionaUnTipoDeEnvio: "Selecciona un tipo de envío",
    Peso: "Peso",
    Ancho: "Ancho",
    Largo: "Largo",
    Alto: "Alto",
    ContenidoDelEnvio: "Contenido del envío",
    ValorDeclarado: "Valor declarado",
    ValorAsegurado: "Valor asegurado",
    ProductosAgregados: "Productos agregados:",
    Total: "Total:",
    Detalles: "Detalles",
    Importe: "Importe",
    Opciones: "Opciones",
    Medidas: "Medidas",
    Envio: "Envío",
    FT: "FT³",
    Declarado: "Declarado",
    Asegurado: "Asegurado",
    TCF: "TCF",
    CostoSeguro: "Costo seguro",
    CargoSobrePeso: "Cargo sobrepeso",
  },
  en: {
    InformacionDelPedido: "Order information",
    Nombre: "Name",
    Producto: "Product",
    SeleccionaUnProducto: "Select a product",
    Cantidad: "Quantity",
    TipoDeCarga: "Load type",
    SeleccionaUnTipoDeCarga: "Select a load type",
    TipoDeEnvio: "Shipping type",
    SeleccionaUnTipoDeEnvio: "Select a shipping type",
    Peso: "Weight",
    Ancho: "Width",
    Largo: "Length",
    Alto: "Height",
    ContenidoDelEnvio: "Shipping contents",
    ValorDeclarado: "Declared value",
    ValorAsegurado: "Insured value",
    ProductosAgregados: "Added products:",
    Total: "Total:",
    Detalles: "Details",
    Importe: "Import",
    Opciones: "Options",
    Medidas: "Dimensions",
    Envio: "Shipping",
    FT: "FT³",
    Declarado: "Declared",
    Asegurado: "Insured",
    TCF: "TCF",
    CostoSeguro: "Insurance cost",
    CargoSobrePeso: "Overweight charge",
  },
};
export const DICCIONARIO_LISTA_PEDIDOS_COMPLETA = {
  es: {
    ListaCompletaDePedidos: "Lista completa de pedidos",
    BuscarPedido: "Buscar por Guía, Remitente, Destinatario, Usuario o Agencia",
    Guia: "Guía",
    Remitente: "Remitente",
    Destinatario: "Destinatario",
    Agencia: "Agencia",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    RealizarPedido: "Realizar pedido",
  },
  en: {
    ListaCompletaDePedidos: "Complete list of orders",
    BuscarPedido: "Search by guide, sender, recipient, user or agency",
    Guia: "Guide",
    Remitente: "Sender",
    Destinatario: "Recipient",
    Agencia: "Agency",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    RealizarPedido: "Make an order",
  },
};
export const DICCIONARIO_LISTA_PEDIDOS_POR_FECHA = {
  es: {
    BuscarPedidosPorFecha: "Buscar pedidos por fecha",
    Guia: "Guía",
    Remitente: "Remitente",
    Destinatario: "Destinatario",
    Agencia: "Agencia",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    RealizarPedido: "Realizar pedido",
  },
  en: {
    BuscarPedidosPorFecha: "Search orders by date",
    Guia: "Guide",
    Remitente: "Sender",
    Destinatario: "Recipient",
    Agencia: "Agency",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    RealizarPedido: "Make an order",
  },
};
export const DICCIONARIO_DETALLES_DEL_PEDIDO = {
  es: {
    MensajeParteUno: "¡Se han creado otros",
    MensajeParteDos: "pedidos junto a este!",
    DetallesDeEnvio: "Detalles de envío",
    Folio: "Folio",
    Guia: "Guía",
    Usuario: "Usuario",
    EstadoDePago: "Estado de pago",
    Agencia: "Agencia",
    FechaCreacion: "Fecha de creación",
    InformacionDelRemitente: "INFORMACIÓN DEL REMITENTE",
    Nombre: "Nombre:",
    Telefonos: "Teléfono(s):",
    Correo: "Correo:",
    Direccion: "Dirección:",
    Referencia: "Referencia:",
    InformacionDelDestinatario: "INFORMACIÓN DEL DESTINATARIO",
    DetallesDelPaquete: "Detalles del paquete",
    Largo: "Largo",
    Ancho: "Ancho",
    Alto: "Alto",
    PieCubico: "Pie cubico",
    Volumen: "Volumen",
    Peso: "Peso",
    Contenido: "Contenido",
    Importes: "Importes",
    ValorDeclarado: "Valor declarado",
    ValorAsegurado: "Valor asegurado",
    TCF: "TCF",
    CostoDeEnvio: "Costo de envío",
    CostoDeSeguro: "Costo de seguro",
    CostoSobrepeso: "Costo sobrepeso",
    TotalAPagar: "Total a pagar",
    MovimientosDelPedido: "Movimientos del pedido",
    EstadoDelPedido: "Estado del pedido",
    Movimiento: "Movimiento",
    Origen: "Origen",
  },
  en: {
    MensajeParteUno: "Other",
    MensajeParteDos: "orders have been created!",
    DetallesDeEnvio: "Shipping details",
    Folio: "Folio",
    Guia: "Guide",
    Usuario: "User",
    EstadoDePago: "Payment status",
    Agencia: "Agency",
    FechaCreacion: "Creation date",
    InformacionDelRemitente: "SENDER INFORMATION",
    Nombre: "Name:",
    Telefonos: "Number(s):",
    Correo: "Email:",
    Direccion: "Address:",
    Referencia: "Reference:",
    InformacionDelDestinatario: "RECIPIENT INFORMATION",
    DetallesDelPaquete: "Package details",
    Largo: "Length",
    Ancho: "Width",
    Alto: "Height",
    PieCubico: "Cubic feet",
    Volumen: "Volume",
    Peso: "Weight",
    Contenido: "Contents",
    Importes: "Imports",
    ValorDeclarado: "Declared value",
    ValorAsegurado: "Insured value",
    TCF: "TCF",
    CostoDeEnvio: "Shipping cost",
    CostoDeSeguro: "Insurance cost",
    CostoSobrepeso: "Overweight charge",
    TotalAPagar: "Total to pay",
    MovimientosDelPedido: "Order movements",
    EstadoDelPedido: "Order status",
    Movimiento: "Movement",
    Origen: "Origin",
  },
};
export const DICCIONARIO_AGENCIA_SELECCIONADA_PEDIDO = {
  es: {
    PedidoParaLaAgencia: "Pedido para la agencia:",
  },
  en: {
    PedidoParaLaAgencia: "Order for the agency:",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS PEDIDOS */

/* INICIA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LAS AGENCIAS */
export const DICCIONARIO_AGENCIAS = {
  es: {
    Agencias: "Agencias",
    RegistrarAgencia: "Registrar Agencia",
    AdministrarAgencias: "Administrar Agencias",
  },
  en: {
    Agencias: "Agencies",
    RegistrarAgencia: "Register Agency",
    AdministrarAgencias: "Manage Agencies",
  },
};
export const DICCIONARIO_REGISTRAR_AGENCIA = {
  es: {
    RegistrarAgencia: "Registrar Agencia",
    NombreDeLaAgencia: "Nombre de la agencia",
    NombreLegalDeLaAgencia: "Nombre legal de la agencia (DBA)",
    TelAgencia: "Tel. Agencia",
    Fax: "Fax",
    CorreoAgencia: "Correo Agencia",
    CorreoAgencia2: "Correo Agencia #2 (Opcional)",
    NombreRepresentanteVentas: "Nombre representante ventas",
    TelRepresentante: "Tel. Representante",
    NombreDelDueño: "Nombre del dueño",
    TelDueño: "Tel. Dueño",
    NombreDelManager: "Nombre del manager",
    TelManager: "Tel. Manager",
    NoLicencia: "No. Licencia",
    NoSalesTax: "No. Sales Tax",
    SS: "S.S",
    CopiaID: "Copia ID",
    CopiaLicencia: "Copia Licencia",
    CopiaSalesTax: "Copia Sales Tax",
  },
  en: {
    RegistrarAgencia: "Register Agency",
    NombreDeLaAgencia: "Agency name",
    NombreLegalDeLaAgencia: "Legal name of the agency (DBA)",
    TelAgencia: "Tel. Agency",
    Fax: "Fax",
    CorreoAgencia: "Email Agency",
    CorreoAgencia2: "Email Agency #2 (Optional)",
    NombreRepresentanteVentas: "Name of sales representative",
    TelRepresentante: "Tel. Representative",
    NombreDelDueño: "Name of owner",
    TelDueño: "Tel. Owner",
    NombreDelManager: "Name of manager",
    TelManager: "Tel. Manager",
    NoLicencia: "No. License",
    NoSalesTax: "No. Sales Tax",
    SS: "S.S",
    CopiaID: "Copy ID",
    CopiaLicencia: "Copy License",
    CopiaSalesTax: "Copy Sales Tax",
  },
};
export const DICCIONARIO_LISTA_DE_AGENCIAS = {
  es: {
    AdministrarAgencias: "Administrar Agencias",
    BuscarAgencia: "Buscar Agencia (Nombre, País, Estado, Ciudad, CP)",
    EstatusDeLasAgencia: "Estatus de las agencias:",
    Activa: "Activa",
    Desactivada: "Desactivada",
    Operaciones: "Operaciones:",
    RegistrarAgencia: "Registrar Agencia",
  },
  en: {
    AdministrarAgencias: "Manage Agencies",
    BuscarAgencia: "Search Agency (Name, Country, State, City, Zip Code)",
    EstatusDeLasAgencia: "Agencies status:",
    Activa: "Active",
    Desactivada: "Disabled",
    Operaciones: "Operations:",
    RegistrarAgencia: "Register Agency",
  },
};
export const DICCIONARIO_ADMINISTRAR_PRODUCTOS_DE_LA_AGENCIA = {
  es: {
    AgenciaSeleccionada: "Agencia seleccionada:",
    ProductosAsignados: "Productos asignados",
    AsignarNuevoProducto: "Asignar nuevo producto",
    BuscarProducto: "Buscar producto",
    RegistrarProducto: "Registrar producto",
  },
  en: {
    AgenciaSeleccionada: "Selected agency:",
    ProductosAsignados: "Assigned products",
    AsignarNuevoProducto: "Assign new product",
    BuscarProducto: "Search product",
    RegistrarProducto: "Register product",
  },
};
export const DICCIONARIO_EDITAR_AGENCIA = {
  es: {
    EditarAgencia: "Editar Agencia",
    NombreDeLaAgencia: "Nombre de la agencia",
    NombreLegalDeLaAgencia: "Nombre legal de la agencia (DBA)",
    TelAgencia: "Tel. Agencia",
    Fax: "Fax",
    CorreoAgencia: "Correo Agencia",
    CorreoAgencia2: "Correo Agencia #2 (Opcional)",
    NombreRepresentanteVentas: "Nombre representante ventas",
    TelRepresentante: "Tel. Representante",
    NombreDelDueño: "Nombre del dueño",
    TelDueño: "Tel. Dueño",
    NombreDelManager: "Nombre del manager",
    TelManager: "Tel. Manager",
    NoLicencia: "No. Licencia",
    NoSalesTax: "No. Sales Tax",
    SS: "S.S",
    CopiaID: "Copia ID",
    CopiaLicencia: "Copia Licencia",
    CopiaSalesTax: "Copia Sales Tax",
  },
  en: {
    EditarAgencia: "Edit Agency",
    NombreDeLaAgencia: "Agency name",
    NombreLegalDeLaAgencia: "Legal name of the agency (DBA)",
    TelAgencia: "Tel. Agency",
    Fax: "Fax",
    CorreoAgencia: "Email Agency",
    CorreoAgencia2: "Email Agency #2 (Optional)",
    NombreRepresentanteVentas: "Name of sales representative",
    TelRepresentante: "Tel. Representative",
    NombreDelDueño: "Name of owner",
    TelDueño: "Tel. Owner",
    NombreDelManager: "Name of manager",
    TelManager: "Tel. Manager",
    NoLicencia: "No. License",
    NoSalesTax: "No. Sales Tax",
    SS: "S.S",
    CopiaID: "Copy ID",
    CopiaLicencia: "Copy License",
    CopiaSalesTax: "Copy Sales Tax",
  },
};
export const DICCIONARIO_MODAL_SUBIR_ARCHIVO_SELECCIONAR = {
  es: {
    Remitentes: "Remitentes",
    Destinatarios: "Destinatarios",
    SeleccionarArchivos: "Seleccionar archivo",
    MensajeParteUno: "Para subir la información de los",
    MensajeParteDos: "a la agencia",
    MensajeParteTres: "debes seleccionar un archivo en formato XLSX.",
  },
  en: {
    Remitentes: "Senders",
    Destinatarios: "Recipients",
    SeleccionarArchivos: "Select file",
    MensajeParteUno: "To upload the information of the",
    MensajeParteDos: "to the agency",
    MensajeParteTres: "you must select a file in XLSX format.",
  },
};
export const DICCIONARIO_MODAL_SUBIR_ARCHIVO_SUBIENDO = {
  es: {
    Subiendo: "Subiendo... ",
    NoCierresEstaVentana: "¡No cierres esta ventana!",
  },
  en: {
    Subiendo: "Uploading... ",
    NoCierresEstaVentana: "Don't close this window!",
  },
};
export const DICCIONARIO_MODAL_SUBIR_ARCHIVO_COMPLETADO = {
  es: {
    Remitentes: "Remitentes",
    Destinatarios: "Destinatarios",
    MensajeParteUno: "La información de los",
    MensajeParteDos:
      "ha sido insertada con éxito en la base de datos y asignada a la agencia.",
  },
  en: {
    Remitentes: "Senders",
    Destinatarios: "Recipients",
    MensajeParteUno: "The information of the",
    MensajeParteDos:
      "has been inserted successfully in the database and assigned to the agency.",
  },
};
export const DICCIONARIO_MODAL_SUBIR_ARCHIVO_ERROR = {
  es: {
    Remitentes: "Remitentes",
    Destinatarios: "Destinatarios",
    MensajeParteUno:
      "¡Oops! Parece que algo salió mal al insertar la información de los",
    MensajeParteDos: "por favor, intenta de nuevo más tarde.",
  },
  en: {
    Remitentes: "Senders",
    Destinatarios: "Recipients",
    MensajeParteUno:
      "¡Oops! Looks like something went wrong while inserting the information of the",
    MensajeParteDos: "please try again later.",
  },
};
export const DICCIONARIO_MODAL_INFORMACION_DEL_PRODUCTO = {
  es: {
    DetallesDelProducto: "Detalles del producto",
    Producto: "Producto",
    PrecioPublico: "Precio público",
    Comision: "Comisión",
    LibraExtra: "Libra extra",
    PesoSinCobro: "Peso sin cobro",
    PesoMaximo: "Peso máximo",
    Medidas: "Medidas",
    Ancho: "Ancho",
    Alto: "Alto",
    Largo: "Largo",
  },
  en: {
    DetallesDelProducto: "Product details",
    Producto: "Product",
    PrecioPublico: "Public price",
    Comision: "Commission",
    LibraExtra: "Extra weight",
    PesoSinCobro: "Weight without charge",
    PesoMaximo: "Maximum weight",
    Medidas: "Dimensions",
    Ancho: "Width",
    Alto: "Height",
    Largo: "Length",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LAS AGENCIAS */

/* INICIA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS PRODUCTOS */
export const DICCIONARIO_PRODUCTOS = {
  es: {
    Productos: "Productos",
    RegistrarProducto: "Registrar producto",
    AdministrarProductos: "Administrar productos",
  },
  en: {
    Productos: "Products",
    RegistrarProducto: "Register product",
    AdministrarProductos: "Manage products",
  },
};
export const DICCIONARIO_REGISTRAR_PRODUCTO = {
  es: {
    RegistrarProducto: "Registrar producto",
    Nombre: "Nombre",
    Ancho: "Ancho",
    Largo: "Largo",
    Alto: "Alto",
    Precio: "Precio",
    CostoLibraExtra: "Costo libra extra",
    PesoSinCobro: "Peso sin cobro",
    PesoMaximo: "Peso máximo",
    Comision: "Comisión",
  },
  en: {
    RegistrarProducto: "Register product",
    Nombre: "Name",
    Ancho: "Width",
    Largo: "Length",
    Alto: "Height",
    Precio: "Price",
    CostoLibraExtra: "Extra weight cost",
    PesoSinCobro: "Weight without charge",
    PesoMaximo: "Maximum weight",
    Comision: "Commission",
  },
};
export const DICCIONARIO_LISTA_DE_PRODUCTOS = {
  es: {
    AdministrarProductos: "Administrar productos",
    BuscarProducto: "Buscar producto",
    EstatusDeLosProductos: "Estatus de los productos:",
    Activo: "Activo",
    Desactivado: "Desactivado",
    RegistrarProducto: "Registrar producto",
  },
  en: {
    AdministrarProductos: "Manage products",
    BuscarProducto: "Search product",
    EstatusDeLosProductos: "Status of the products:",
    Activo: "Active",
    Desactivado: "Disabled",
    RegistrarProducto: "Register product",
  },
};
export const DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_PRODUCTO = {
  es: {
    ProductoSeleccionado: "Producto seleccionado:",
    AgenciasAsignadas: "Agencias asignadas",
    AsignarNuevaAgencia: "Asignar nueva agencia",
    BuscarAgencia: "Buscar agencia por nombre",
    RegistrarAgencia: "Registrar agencia",
  },
  en: {
    ProductoSeleccionado: "Selected product:",
    AgenciasAsignadas: "Assigned agencies",
    AsignarNuevaAgencia: "Assign new agency",
    BuscarAgencia: "Search agency by name",
    RegistrarAgencia: "Register agency",
  },
};
export const DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA_DEL_PRODUCTO = {
  es: {
    InformacionDeLaAgencia: "Información de la agencia",
    Agencia: "Agencia",
    Representante: "Representante",
    TelAgencia: "Tel. agencia",
    Correos: "Correo(s)",
    Locacion: "Locación",
  },
  en: {
    InformacionDeLaAgencia: "Agency information",
    Agencia: "Agency",
    Representante: "Representative",
    TelAgencia: "Tel. agency",
    Correos: "Email(s)",
    Locacion: "Location",
  },
};
export const DICCIONARIO_EDITAR_PRODUCTO = {
  es: {
    EditarProducto: "Editar producto",
    Nombre: "Nombre",
    Ancho: "Ancho",
    Largo: "Largo",
    Alto: "Alto",
    Precio: "Precio",
    CostoLibraExtra: "Costo libra extra",
    PesoSinCobro: "Peso sin cobro",
    PesoMaximo: "Peso máximo",
    Comision: "Comisión",
  },
  en: {
    EditarProducto: "Edit product",
    Nombre: "Name",
    Ancho: "Width",
    Largo: "Length",
    Alto: "Height",
    Precio: "Price",
    CostoLibraExtra: "Extra weight cost",
    PesoSinCobro: "Weight without charge",
    PesoMaximo: "Maximum weight",
    Comision: "Commission",
  },
};
export const DICCIONARIO_MODAL_CONFIRMACION_PRODUCTOS = {
  es: {
    Activar: "ACTIVAR",
    Desactivar: "DESACTIVAR",
    ActivarProducto: "Activar producto",
    DesactivarProducto: "Desactivar producto",
    MensajeParteUno: "¿Esta seguro que desea",
    MensajeParteDos: "el producto",
    MensajeActivar:
      "El producto se activara una vez confirmada esta acción, por lo cual, el producto podrá trabajar con normalidad en el sistema.",
    MensajeDesactivar:
      "El producto se desactivara una vez confirmada esta opción, por lo cual, con el producto no sé podrá realizar ninguna operación.",
  },
  en: {
    Activar: "ACTIVATE",
    Desactivar: "DISABLE",
    ActivarProducto: "Activate product",
    DesactivarProducto: "Disable product",
    MensajeParteUno: "Are you sure you want to",
    MensajeParteDos: "the product",
    MensajeActivar:
      "The product will be activated once this action is confirmed, so the product will work normally in the system.",
    MensajeDesactivar:
      "The product will be deactivated once this option is confirmed, so the product will not be able to perform any operation.",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS PRODUCTOS */

/* INICIA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS USUARIOS */
export const DICCIONARIO_USUARIOS = {
  es: {
    Usuarios: "Usuarios",
    RegistrarUsuario: "Registrar usuario",
    AdministrarUsuarios: "Administrar usuarios",
  },
  en: {
    Usuarios: "Users",
    RegistrarUsuario: "Register user",
    AdministrarUsuarios: "Manage users",
  },
};
export const DICCIONARIO_REGISTRAR_USUARIO = {
  es: {
    RegistrarUsuario: "Registrar usuario",
    NombreDelUsuario: "Nombre del usuario",
    Permisos: "Permisos",
    Contrasena: "Contraseña",
    ConfirmarContrasena: "Confirmar contraseña",
  },
  en: {
    RegistrarUsuario: "Register user",
    NombreDelUsuario: "User name",
    Permisos: "Permissions",
    Contrasena: "Password",
    ConfirmarContrasena: "Confirm password",
  },
};
export const DICCIONARIO_LISTA_DE_USUARIOS = {
  es: {
    AdministrarUsuarios: "Administrar usuarios",
    BuscarUsuario: "Buscar por nombre del usuario",
    ClasificacionDePerfiles: "Clasificacion de perfiles",
    Usuario: "Usuario",
    Moderador: "Moderador",
    Chofer: "Chofer",
    Bodega: "Bodega",
    Administrador: "Administrador",
    Desactivado: "Desactivado",
    RegistrarUsuario: "Registrar usuario",
  },
  en: {
    AdministrarUsuarios: "Manage users",
    BuscarUsuario: "Search by user name",
    ClasificacionDePerfiles: "Profile classification",
    Usuario: "User",
    Moderador: "Moderator",
    Chofer: "Driver",
    Bodega: "Warehouse",
    Administrador: "Administrator",
    Desactivado: "Disabled",
    RegistrarUsuario: "Register user",
  },
};
export const DICCIONARIO_ADMINISTRAR_AGENCIAS_DEL_USUARIO = {
  es: {
    UsuarioSeleccionado: "Usuario seleccionado: ",
    AgenciasAsignadas: "Agencias asignadas",
    AsignarNuevaAgencia: "Asignar nueva agencia",
    BuscarAgencia: "Buscar por nombre de la agencia",
    RegistrarAgencia: "Registrar agencia",
  },
  en: {
    UsuarioSeleccionado: "Selected user: ",
    AgenciasAsignadas: "Assigned agencies",
    AsignarNuevaAgencia: "Assign new agency",
    BuscarAgencia: "Search by agency name",
    RegistrarAgencia: "Register agency",
  },
};
export const DICCIONARIO_MODAL_INFORMACION_DE_LA_AGENCIA = {
  es: {
    InformacionDeLaAgencia: "Información de la agencia",
    Agencia: "Agencia",
    Representante: "Representante",
    TelAgencia: "Tel. Agencia",
    Correos: "Correo(s)",
    Locacion: "Locación",
  },
  en: {
    InformacionDeLaAgencia: "Agency information",
    Agencia: "Agency",
    Representante: "Representative",
    TelAgencia: "Tel. Agency",
    Correos: "Email(s)",
    Locacion: "Location",
  },
};
export const DICCIONARIO_EDITAR_USUARIO = {
  es: {
    EditarUsuario: "Editar usuario",
    NombreDelUsuario: "Nombre del usuario",
    Permisos: "Permisos",
    Contrasena: "Contraseña",
    ConfirmarContrasena: "Confirmar contraseña",
  },
  en: {
    EditarUsuario: "Edit user",
    NombreDelUsuario: "User name",
    Permisos: "Permissions",
    Contrasena: "Password",
    ConfirmarContrasena: "Confirm password",
  },
};
export const DICCIONARIO_MODAL_CONFIRMACION_USUARIO = {
  es: {
    Activar: "ACTIVAR",
    Desactivar: "DESACTIVAR",
    ActivarUsuario: "Activar usuario",
    DesactivarUsuario: "Desactivar usuario",
    MensajeParteUno: "¿Esta seguro que desea",
    MensajeParteDos: "al usuario",
    MensajeActivar:
      "El usuario se activara una vez confirmada esta acción, por lo cual, el usuario tendrá acceso al sistema nuevamente.",
    MensajeDesactivar:
      "El usuario se desactivara una vez confirmada esta opción, por lo cual, el usuario no tendrá acceso al sistema hasta que vuelva a ser activado.",
  },
  en: {
    Activar: "ACTIVATE",
    Desactivar: "DISABLE",
    ActivarUsuario: "Activate user",
    DesactivarUsuario: "Disable user",
    MensajeParteUno: "Are you sure you want to",
    MensajeParteDos: "the user",
    MensajeActivar:
      "The user will be activated once this action is confirmed, so the user will have access to the system again.",
    MensajeDesactivar:
      "The user will be deactivated once this option is confirmed, so the user will not have access to the system until it is activated again.",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS USUARIOS */

/* INICIA DICCIONARIO PARA LA VISTA RECOLECCIONES */
export const DICCIONARIO_RECOLECCIONES = {
  es: {
    Recolecciones: "Recolecciones",
    CrearRecoleccion: "Crear recolección",
    ListaDeRecolecciones: "Lista de recolecciones",
  },
  en: {
    Recolecciones: "Collections",
    CrearRecoleccion: "Create collection",
    ListaDeRecolecciones: "Collection list",
  },
};
export const DICCIONARIO_FORMULARIO_RECOLECCIONES = {
  es: {
    IngresaEscaneaGuia: "Ingresa o escanea la guía:",
    CrearRecoleccion: "Crear recolección",
  },
  en: {
    IngresaEscaneaGuia: "Enter or scan the waybill:",
    CrearRecoleccion: "Create collection",
  },
};
export const DICCIONARIO_LISTA_DE_RECOLECCION = {
  es: {
    ListaDeGuias: "Lista de guías en la recolección",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
    Acciones: "Acciones",
  },
  en: {
    ListaDeGuias: "List of waybills in the collection",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
    Acciones: "Actions",
  },
};
export const DICCIONARIO_LISTA_RECOLECCIONES_COMPLETA = {
  es: {
    ListaCompletaDeRecolecciones: "Lista completa de recolecciones",
    BuscarRecoleccion: "Buscar por número de recolección",
    idRecoleccion: "ID Recolección",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearRecoleccion: "Crear recolección",
  },
  en: {
    ListaCompletaDeRecolecciones: "Complete collection list",
    BuscarRecoleccion: "Search by collection number",
    idRecoleccion: "Collection ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearRecoleccion: "Create collection",
  },
};
export const DICCIONARIO_LISTA_RECOLECCIONES_POR_FECHA = {
  es: {
    BuscarRecoleccionesPorFecha: "Buscar recolecciones por fecha",
    idRecoleccion: "ID Recolección",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearRecoleccion: "Crear recolección",
  },
  en: {
    BuscarRecoleccionesPorFecha: "Search collections by date",
    BuscarRecoleccion: "Search by collection number",
    idRecoleccion: "Collection ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearRecoleccion: "Create collection",
  },
};
export const DICCIONARIO_DETALLES_RECOLECCION = {
  es: {
    Detalles: "Detalles",
    IDRecoleccion: "ID Recolección",
    CantidadDeGuias: "Cantidad de guías",
    Usuario: "Usuario",
    FechaDeCreacion: "Fecha de creación",
    ListaDeGuias: "Lista de guías",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
  },
  en: {
    Detalles: "Details",
    IDRecoleccion: "Collection ID",
    CantidadDeGuias: "Number of waybills",
    Usuario: "User",
    FechaDeCreacion: "Creation date",
    ListaDeGuias: "List of waybills",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
  },
};
/* TERMINA DICCIONARIO PARA LA VISTA RECOLECCIONES */

/* INICIA DICCIONARIO PARA LAS VISTAS DE BODEGA */
export const DICCIONARIO_BODEGA_ENTRADAS = {
  es: {
    Bodega: "Bodega",
    Entrada: "Entrada",
    CrearEntrada: "Crear entrada",
    ListaDeEntradas: "Lista de entradas",
  },
  en: {
    Bodega: "Warehouse",
    Entrada: "Entry",
    CrearEntrada: "Create entry",
    ListaDeEntradas: "Entry list",
  },
};
export const DICCIONARIO_FORMULARIO_DATOS_ENTRADA = {
  es: {
    EntradaBodega: "Entrada a la bodega",
    SeleccionaElMovimiento: "Selecciona el movimiento",
    Seleccionar: "Seleccionar",
    NombreDelTransportista: "Nombre del transportista",
    Remolque: "Remolque",
    Tracto: "Tracto",
    Candado: "Candado",
    HoraDeEntrada: "Hora de entrada",
  },
  en: {
    EntradaBodega: "Entry to the warehouse",
    SeleccionaElMovimiento: "Select the movement",
    Seleccionar: "Select",
    NombreDelTransportista: "Transporter name",
    Remolque: "Trailer",
    Tracto: "Truck",
    Candado: "Lock",
    HoraDeEntrada: "Entry time",
  },
};
export const DICCIONARIO_FORMULARIO_BUSQUEDA_ENTRADAS = {
  es: {
    IngresaEscaneaGuia: "Ingresa o escanea la guía:",
    CrearEntrada: "Crear entrada",
  },
  en: {
    IngresaEscaneaGuia: "Enter or scan the waybill:",
    CrearEntrada: "Create entry",
  },
};
export const DICCIONARIO_LISTA_ENTRADAS = {
  es: {
    ListaDeGuias: "Lista de guías para la entrada",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
    Acciones: "Acciones",
  },
  en: {
    ListaDeGuias: "List of waybills for the entry",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
    Acciones: "Actions",
  },
};
export const DICCIONARIO_LISTA_ENTRADAS_COMPLETA = {
  es: {
    ListaCompletaDeEntradas: "Lista completa de entradas",
    BuscarEntrada: "Buscar por número de entrada",
    idEntrada: "ID Entrada",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearEntrada: "Crear entrada",
  },
  en: {
    ListaCompletaDeEntradas: "Complete entry list",
    BuscarEntrada: "Search by entry number",
    idEntrada: "Entry ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearEntrada: "Create entry",
  },
};
export const DICCIONARIO_LISTA_ENTRADAS_POR_FECHA = {
  es: {
    BuscarEntradasPorFecha: "Buscar entradas por fecha",
    idEntrada: "ID Entrada",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearEntrada: "Crear entrada",
  },
  en: {
    BuscarEntradasPorFecha: "Search entries by date",
    idEntrada: "Entry ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearEntrada: "Create entry",
  },
};
export const DICCIONARIO_DETALLES_ENTRADA = {
  es: {
    Detalles: "Detalles",
    idEntradaBodega: "ID Entrada",
    CantidadDeGuias: "Cantidad de guías",
    Usuario: "Usuario",
    FechaDeCreacion: "Fecha de creación",
    NombreTransportista: "Nombre del transportista",
    Remolque: "Remolque",
    Tracto: "Tracto",
    Candado: "Candado",
    HoraDeEntrada: "Hora de entrada",
    ListaDeGuias: "Lista de guías",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
  },
  en: {
    Detalles: "Details",
    idEntradaBodega: "Entry ID",
    CantidadDeGuias: "Number of waybills",
    Usuario: "User",
    FechaDeCreacion: "Creation date",
    NombreTransportista: "Transporter name",
    Remolque: "Trailer",
    Tracto: "Truck",
    Candado: "Lock",
    HoraDeEntrada: "Entry time",
    ListaDeGuias: "List of waybills",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
  },
};
export const DICCIONARIO_BODEGA_DEVOLUCIONES = {
  es: {
    Bodega: "Bodega",
    Devoluciones: "Devoluciones",
    CrearDevolucion: "Crear devolución",
    ListaDeDevoluciones: "Lista de devoluciones",
  },
  en: {
    Bodega: "Warehouse",
    Devoluciones: "Returns",
    CrearDevolucion: "Create return",
    ListaDeDevoluciones: "Return list",
  },
};
export const DICCIONARIO_FORMULARIO_DEVOLUCIONES = {
  es: {
    IngresaEscaneaGuia: "Ingresa o escanea la guía:",
    CrearDevolucion: "Crear devolución",
  },
  en: {
    IngresaEscaneaGuia: "Enter or scan the waybill:",
    CrearDevolucion: "Create return",
  },
};
export const DICCIONARIO_LISTA_DEVOLUCIONES = {
  es: {
    ListaDeGuias: "Lista de guías en la devolución",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
    Acciones: "Acciones",
  },
  en: {
    ListaDeGuias: "List of waybills in the return",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
    Acciones: "Actions",
  },
};
export const DICCIONARIO_LISTA_DEVOLUCIONES_COMPLETA = {
  es: {
    ListaCompletaDeDevoluciones: "Lista completa de devoluciones",
    BuscarDevolucion: "Buscar por número de devolución",
    idDevolucion: "ID Devolución",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearDevolucion: "Crear devolución",
  },
  en: {
    ListaCompletaDeDevoluciones: "Complete return list",
    BuscarDevolucion: "Search by return number",
    idDevolucion: "Return ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearDevolucion: "Create return",
  },
};
export const DICCIONARIO_LISTA_DEVOLUCIONES_POR_FECHA = {
  es: {
    BuscarDevolucionesPorFecha: "Buscar devolución por fecha",
    idDevolucion: "ID Devolución",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearDevolucion: "Crear devolución",
  },
  en: {
    BuscarDevolucionesPorFecha: "Search returns by date",
    idDevolucion: "Return ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearDevolucion: "Create return",
  },
};
export const DICCIONARIO_DETALLES_DEVOLUCION = {
  es: {
    Detalles: "Detalles",
    idDevolucion: "ID Devolución",
    CantidadDeGuias: "Cantidad de guías",
    Usuario: "Usuario",
    FechaDeCreacion: "Fecha de creación",
    ListaDeGuias: "Lista de guías",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
  },
  en: {
    Detalles: "Details",
    idDevolucion: "Return ID",
    CantidadDeGuias: "Number of waybills",
    Usuario: "User",
    FechaDeCreacion: "Creation date",
    ListaDeGuias: "List of waybills",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
  },
};
export const DICCIONARIO_BODEGA_MOVIMIENTOS = {
  es: {
    Bodega: "Bodega",
    Movimientos: "Movimientos",
    CrearMovimiento: "Crear movimiento",
    ListaDeMovimientos: "Lista de movimientos",
  },
  en: {
    Bodega: "Warehouse",
    Movimientos: "Movements",
    CrearMovimiento: "Create movement",
    ListaDeMovimientos: "Movement list",
  },
};
export const DICCIONARIO_FORMULARIO_MOVIMIENTOS = {
  es: {
    IngresaEscaneaGuia: "Ingresa o escanea la guía:",
    CrearMovimiento: "Crear movimiento",
  },
  en: {
    IngresaEscaneaGuia: "Enter or scan the waybill:",
    CrearMovimiento: "Create movement",
  },
};
export const DICCIONARIO_LISTA_MOVIMIENTOS_BODEGA = {
  es: {
    ListaDeGuias: "Lista de guías en el movimiento",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
    Acciones: "Acciones",
  },
  en: {
    ListaDeGuias: "List of waybills in the movement",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
    Acciones: "Actions",
  },
};
export const DICCIONARIO_LISTA_MOVIMIENTOS_COMPLETA = {
  es: {
    ListaCompletaDeMovimientos: "Lista completa de movimientos",
    BuscarMovimiento: "Buscar por número de movimiento",
    idMovimientoB: "ID Movimiento B.",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearMovimiento: "Crear movimiento",
  },
  en: {
    ListaCompletaDeMovimientos: "Complete movement list",
    BuscarMovimiento: "Search by movement number",
    idMovimientoB: "Movement W. ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearMovimiento: "Create movement",
  },
};
export const DICCIONARIO_LISTA_MOVIMIENTOS_POR_FECHA = {
  es: {
    BuscarMovimientosPorFecha: "Buscar movimientos por fecha",
    idMovimientoB: "ID Movimiento B.",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearMovimiento: "Crear movimiento",
  },
  en: {
    BuscarMovimientosPorFecha: "Search movements by date",
    idMovimientoB: "Movement B. ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearMovimiento: "Create movement",
  },
};
export const DICCIONARIO_DETALLES_MOVIMIENTO = {
  es: {
    Detalles: "Detalles",
    idMovimientoBodega: "ID Movimiento",
    CantidadDeGuias: "Cantidad de guías",
    Usuario: "Usuario",
    FechaDeCreacion: "Fecha de creación",

    ListaDeGuias: "Lista de guías",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
  },
  en: {
    Detalles: "Details",
    idMovimientoBodega: "Movement ID",
    CantidadDeGuias: "Number of waybills",
    Usuario: "User",
    FechaDeCreacion: "Creation date",
    ListaDeGuias: "List of waybills",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
  },
};
export const DICCIONARIO_BODEGA_SALIDAS = {
  es: {
    Bodega: "Bodega",
    CrearSalida: "Crear salida",
    ListaDeSalidas: "Lista de salidas",
  },
  en: {
    Bodega: "Warehouse",
    CrearSalida: "Create exit",
    ListaDeSalidas: "Exit list",
  },
};
export const DICCIONARIO_FORMULARIO_DATOS_SALIDA = {
  es: {
    SalidaBodega: "Salida de la bodega",
    SeleccionaElMovimiento: "Selecciona el movimiento",
    Seleccionar: "Seleccionar",
    NombreDelTransportista: "Nombre del transportista",
    Remolque: "Remolque",
    Tracto: "Tracto",
    Candado: "Candado",
    HoraSalida: "Hora de salida",
  },
  en: {
    SalidaBodega: "Exit from the warehouse",
    SeleccionaElMovimiento: "Select the movement",
    Seleccionar: "Select",
    NombreDelTransportista: "Transporter name",
    Remolque: "Trailer",
    Tracto: "Truck",
    Candado: "Lock",
    HoraSalida: "Exit time",
  },
};
export const DICCIONARIO_FORMULARIO_BUSQUEDA_SALIDAS = {
  es: {
    IngresaEscaneaGuia: "Ingresa o escanea la guía:",
    CrearSalida: "Crear salida",
  },
  en: {
    IngresaEscaneaGuia: "Enter or scan the waybill:",
    CrearSalida: "Create exit",
  },
};
export const DICCIONARIO_LISTA_SALIDAS = {
  es: {
    ListaDeGuias: "Lista de guías para la salida",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
    Acciones: "Acciones",
  },
  en: {
    ListaDeGuias: "List of waybills for the exit",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
    Acciones: "Actions",
  },
};
export const DICCIONARIO_LISTA_SALIDAS_COMPLETA = {
  es: {
    ListaCompletaDeSalidas: "Lista completa de salidas",
    BuscarSalida: "Buscar por número de salida",
    idSalida: "ID Salida",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearSalida: "Crear salida",
  },
  en: {
    ListaCompletaDeSalidas: "Complete exit list",
    BuscarSalida: "Search by exit number",
    idSalida: "Exit ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearSalida: "Create exit",
  },
};
export const DICCIONARIO_LISTA_SALIDAS_POR_FECHA = {
  es: {
    BuscarSalidasPorFecha: "Buscar salidas por fecha",
    idSalida: "ID Salida",
    CPedidos: "C. Pedidos",
    Usuario: "Usuario",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
    CrearSalida: "Crear salida",
  },
  en: {
    BuscarSalidasPorFecha: "Search exits by date",
    idSalida: "Exit ID",
    CPedidos: "C. Orders",
    Usuario: "User",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
    CrearSalida: "Create exit",
  },
};
export const DICCIONARIO_DETALLES_SALIDA = {
  es: {
    Detalles: "Detalles",
    idSalidaBodega: "ID Salida",
    CantidadDeGuias: "Cantidad de guías",
    Usuario: "Usuario",
    FechaDeCreacion: "Fecha de creación",
    NombreTransportista: "Nombre del transportista",
    Remolque: "Remolque",
    Tracto: "Tracto",
    Candado: "Candado",
    HoraDeSalida: "Hora de salida",
    ListaDeGuias: "Lista de guías",
    Guia: "Guía",
    Contenido: "Contenido",
    Medidas: "Medidas",
    Peso: "Peso",
  },
  en: {
    Detalles: "Details",
    idSalidaBodega: "Exit ID",
    CantidadDeGuias: "Number of waybills",
    Usuario: "User",
    FechaDeCreacion: "Creation date",
    NombreTransportista: "Transporter name",
    Remolque: "Trailer",
    Tracto: "Truck",
    Candado: "Lock",
    HoraDeSalida: "Exit time",
    ListaDeGuias: "List of waybills",
    Guia: "Waybill",
    Contenido: "Content",
    Medidas: "Dimensions",
    Peso: "Weight",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS DE BODEGA */

/* INICIA DICCIONARIO PARA LA VISTA MOVIMIENTOS */
export const DICCIONARIO_MOVIMIENTOS = {
  es: {
    Movimientos: "Movimientos",
    EditarMovimiento: "Editar movimiento",
  },
  en: {
    Movimientos: "Movements",
    EditarMovimiento: "Edit movement",
  },
};
export const DICCIONARIO_REGISTRAR_MOVIMIENTO = {
  es: {
    RegistrarMovimiento: "Registrar movimiento",
    EstadoDelMovimiento: "Estado del movimiento",
    OrigenDelMovimiento: "Origen del movimiento",
    CategoriaDelMovimiento: "Categoria del movimiento",
    DetallesDelMovimiento: "Detalles del movimiento",
  },
  en: {
    RegistrarMovimiento: "Register movement",
    EstadoDelMovimiento: "Movement status",
    OrigenDelMovimiento: "Movement origin",
    CategoriaDelMovimiento: "Movement category",
    DetallesDelMovimiento: "Movement details",
  },
};
export const DICCIONARIO_EDITAR_MOVIMIENTO = {
  es: {
    EditarMovimiento: "Editar movimiento",
    EstadoDelMovimiento: "Estado del movimiento",
    OrigenDelMovimiento: "Origen del movimiento",
    MovimientoPorDefecto: "Movimiento por defecto",
    DetallesDelMovimiento: "Detalles del movimiento",
  },
  en: {
    EditarMovimiento: "Edit movement",
    EstadoDelMovimiento: "Movement status",
    OrigenDelMovimiento: "Movement origin",
    MovimientoPorDefecto: "Default movement",
    DetallesDelMovimiento: "Movement details",
  },
};
export const DICCIONARIO_LISTA_DE_MOVIMIENTOS = {
  es: {
    ListaCompletaDeMovimientos: "Lista completa de movimientos",
    BuscarMovimientos: "Buscar por estado, detalles, origen ó status",
    Estado: "Estado",
    Detalles: "Detalles",
    Origen: "Origen",
    Categoria: "Categoria",
    FechaCreacion: "Fecha de creación",
    Acciones: "Acciones",
  },
  en: {
    ListaCompletaDeMovimientos: "Full list of movements",
    BuscarMovimientos: "Search by status, details, origin or default",
    Estado: "Status",
    Detalles: "Details",
    Origen: "Origin",
    Categoria: "Category",
    FechaCreacion: "Creation date",
    Acciones: "Actions",
  },
};
export const DICCIONARIO_MODAL_CONFIRMACION_MOVIMIENTOS = {
  es: {
    Activar: "ACTIVAR",
    Desactivar: "DESACTIVAR",
    ActivarMovimiento: "Activar movimiento",
    DesactivarMovimiento: "Desactivar movimiento",
    MensajeParteUno: "¿Esta seguro que desea",
    MensajeParteDos: "el movimiento",
    MensajeActivar:
      "El movimiento se activara una vez confirmada esta acción, por lo cual, el movimiento podrá trabajar con normalidad en el sistema.",
    MensajeDesactivar:
      "El movimiento se desactivara una vez confirmada esta opción, por lo cual, con el movimiento no sé podrá realizar ninguna operación.",
  },
  en: {
    Activar: "ACTIVATE",
    Desactivar: "DISABLE",
    ActivarMovimiento: "Activate movement",
    DesactivarMovimiento: "Disable movement",
    MensajeParteUno: "Are you sure you want to",
    MensajeParteDos: "the movement",
    MensajeActivar:
      "The movement will be activated once this action is confirmed, so the movement will work normally in the system.",
    MensajeDesactivar:
      "The movement will be deactivated once this option is confirmed, so the movement will not be able to perform any operation.",
  },
};
/* TERMINA DICCIONARIO PARA LA VISTA MOVIMIENTOS */

/* INICIA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS OCURRES */
export const DICCIONARIO_OCURRES = {
  es: {
    Ocurres: "Ocurres",
    RegistrarOcurre: "Registrar Ocurre",
    AdministrarOcurres: "Administrar Ocurres",
  },
  en: {
    Ocurres: "Ocurrences",
    RegistrarOcurre: "Register Occurrence",
    AdministrarOcurres: "Manage Occurrences",
  },
};
export const DICCIONARIO_REGISTRAR_OCURRE = {
  es: {
    RegistrarOcurre: "Registrar Ocurre",
    NombreDelOcurre: "Nombre del ocurre",
    OperadorLogistico: "Operador logístico",
    TelefonoUno: "Teléfono #1 (Opcional)",
    TelefonoDos: "Teléfono #2 (Opcional)",
    CorreoElectronico: "Correo electrónico",
    Observaciones: "Observaciones",
  },
  en: {
    RegistrarOcurre: "Register Occurrence",
    NombreDelOcurre: "Name of the occurrence",
    OperadorLogistico: "Logistic operator",
    TelefonoUno: "Phone #1 (Optional)",
    TelefonoDos: "Phone #2 (Optional)",
    CorreoElectronico: "Email",
    Observaciones: "Observations",
  },
};
export const DICCIONARIO_LISTA_DE_OCURRES = {
  es: {
    AdministrarOcurres: "Administrar Ocurres",
    BuscarOcurre: "Buscar Ocurre",
    EstatusDeLosOcurre: "Estatus de los ocurre:",
    Activo: "Activo",
    Desactivado: "Desactivado",
    RegistrarOcurre: "Registrar Ocurre",
  },
  en: {
    AdministrarOcurres: "Manage Occurrences",
    BuscarOcurre: "Search Occurrence",
    EstatusDeLosOcurre: "Status of the occurrences:",
    Activo: "Active",
    Desactivado: "Disabled",
    RegistrarOcurre: "Register Occurrence",
  },
};
export const DICCIONARIO_MODAL_CONFIRMACION_OCURRE = {
  es: {
    ActivarOcurre: "Activar Ocurre",
    DesactivarOcurre: "Desactivar Ocurre",
    MensajeParteUno: "¿Esta seguro que desea",
    MensajeParteDos: "el ocurre",
    AdvertenciaUnoOcurre:
      "El ocurre se activara una vez confirmada esta acción, por lo cual, el ocurre podrá trabajar con normalidad en el sistema.",
    AdvertenciaDosOcurre:
      "El ocurre se desactivara una vez confirmada esta opción, por lo cual, con el ocurre no sé podrá realizar ninguna operación.",
    Activar: "ACTIVAR",
    Desactivar: "DESACTIVAR",
  },
  en: {
    ActivarOcurre: "Activate Occurrence",
    DesactivarOcurre: "Disable Occurrence",
    MensajeParteUno: "Are you sure you want to",
    MensajeParteDos: "the occurrence",
    AdvertenciaUnoOcurre:
      "The occurrence will be activated once this action is confirmed, so the occurrence will work normally in the system.",
    AdvertenciaDosOcurre:
      "The occurrence will be deactivated once this option is confirmed, so the occurrence will not be able to perform any operation.",
    Activar: "ACTIVATE",
    Desactivar: "DISABLE",
  },
};
export const DICCIONARIO_EDITAR_OCURRE = {
  es: {
    EditarOcurre: "Editar Ocurre",
    NombreDelOcurre: "Nombre del ocurre",
    OperadorLogistico: "Operador logístico",
    TelefonoUno: "Teléfono #1 (Opcional)",
    TelefonoDos: "Teléfono #2 (Opcional)",
    CorreoElectronico: "Correo electrónico",
    Observaciones: "Observaciones",
  },
  en: {
    EditarOcurre: "Edit Occurrence",
    NombreDelOcurre: "Name of the occurrence",
    OperadorLogistico: "Logistic operator",
    TelefonoUno: "Phone #1 (Optional)",
    TelefonoDos: "Phone #2 (Optional)",
    CorreoElectronico: "Email",
    Observaciones: "Observations",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS RELACIONADAS CON LOS OCURRES */

/* INICIA DICCIONARIO PARA LAS VISTAS DE CONFIGURACION */
export const DICCIONARIO_CARGAS = {
  es: {
    Cargas: "Cargas",
    DescripcionCargas:
      "Administre la cantidad de cargas que maneja el sistema para sus pedidos.",
    TiposDeCargas: "Tipos de cargas",
    DescripcionTiposDeCargas:
      "Registra los tipos de cargas con los que trabajan.",
  },
  en: {
    Cargas: "Loads",
    DescripcionCargas:
      "Manage the number of loads that the system handles for your orders.",
    TiposDeCargas: "Load types",
    DescripcionTiposDeCargas: "Register the load types with which you work.",
  },
};
export const DICCIONARIO_ENVIOS = {
  es: {
    Envios: "Envíos",
    DescripcionEnvios:
      "Administre la cantidad de envios que maneja el sistema para sus pedidos.",
    TiposDeEnvios: "Tipos de envíos",
    DescripcionTiposDeEnvios:
      "Registra los tipos de envios con los que trabajan.",
  },
  en: {
    Envios: "Deliveries",
    DescripcionEnvios:
      "Manage the number of deliveries that the system handles for your orders.",
    TiposDeEnvios: "Delivery types",
    DescripcionTiposDeEnvios:
      "Register the delivery types with which you work.",
  },
};
/* TERMINA DICCIONARIO PARA LAS VISTAS DE CONFIGURACION*/

/* INICIA DICCIONARIO PARA LA VISTA DE APARIENCIA */
export const DICCIONARIO_APARIENCIA = {
  es: {
    Apariencia: "Apariencia",
    DescripcionApariencia:
      "Administre la configuración y preferencias de la apariencia del sistema.",
    TemaSistema: "Tema",
    DescripcionTemaSistema:
      "Selecciona el tema que deseas para la apariencia del sistema.",
    TemaOscuro: "Tema Oscuro",
    TemaClaro: "Tema Claro",
    IdiomaSistema: "Idioma",
    DescripcionIdiomaSistema: "Selecciona el idioma de la aplicación.",
    IdiomaIngles: "Inglés",
    IdiomaEspanol: "Español",
  },
  en: {
    Apariencia: "Appearance",
    DescripcionApariencia:
      "Manage the appearance and preferences of the system.",
    TemaSistema: "Theme",
    DescripcionTemaSistema:
      "Select the theme you want for the appearance of the system.",
    TemaOscuro: "Dark Theme",
    TemaClaro: "Light Theme",
    IdiomaSistema: "Language",
    DescripcionIdiomaSistema: "Select the language of the application.",
    IdiomaIngles: "English",
    IdiomaEspanol: "Spanish",
  },
};
/* TERMINA DICCIONARIO PARA LA VISTA DE APARIENCIA */

/* INICIA DICCIONARIO GENERAL */
export const DICCIONARIO_GOOGLE_API = {
  es: {
    BuscarDireccion: "Buscar dirección",
    DetallesDeLaDireccion: "Detalles de la dirección",
    Pais: "País",
    CodigoPais: "Código de país",
    Estado: "Estado",
    CodigoEstado: "Código de estado",
    Ciudad: "Ciudad",
    CodigoPostal: "Código postal",
    Direccion: "Dirección",
  },
  en: {
    BuscarDireccion: "Search address",
    DetallesDeLaDireccion: "Address details",
    Pais: "Country",
    CodigoPais: "Country code",
    Estado: "State",
    CodigoEstado: "State code",
    Ciudad: "City",
    CodigoPostal: "Postal code",
    Direccion: "Address",
  },
};
export const DICCIONARIO_BOTONES = {
  es: {
    Guardar: "Guardar",
    Buscar: "Buscar",
    Cancelar: "Cancelar",
    Regresar: "Regresar",
    Actualizar: "Actualizar",
    Añadir: "Añadir",
    Ver: "Ver",
    Subir: "Subir",
    Seleccionar: "Seleccionar",
    Asignar: "Asignar",
    CerrarSesion: "Cerrar sesión",
    DescargarExcel: "Descargar Excel",
    Activar: "Activar",
    Desactivar: "Desactivar",
    Siguiente: "Siguiente",
    AgregarProducto: "Agregar producto",
    Eliminar: "Eliminar",
    UltimaMilla: "Última milla",
    Finalizar: "Finalizar",
    Registrar: "Registrar",
  },
  en: {
    Guardar: "Save",
    Buscar: "Search",
    Cancelar: "Cancel",
    Regresar: "Back",
    Actualizar: "Update",
    Añadir: "Add",
    Ver: "See",
    Subir: "Upload",
    Seleccionar: "Select",
    Asignar: "Assign",
    CerrarSesion: "Log out",
    DescargarExcel: "Download Excel",
    Activar: "Activate",
    Desactivar: "Deactivate",
    Siguiente: "Next",
    AgregarProducto: "Add product",
    Eliminar: "Delete",
    UltimaMilla: "Last Mile",
    Finalizar: "Finish",
    Registrar: "Register",
  },
};
export const DICCIONARIO_PLACEHOLDERS = {
  es: {
    EscribeAqui: "Escriba aquí...",
    Carga: "Carga",
    Porcentaje: "Porcentaje",
    Envio: "Envío",
    BuscarGuia: "Buscar guía",
  },
  en: {
    EscribeAqui: "Write here...",
    Carga: "Load",
    Porcentaje: "Percentage",
    Envio: "Delivery",
    BuscarGuia: "Search waybill",
  },
};
export const DICCIONARIO_MENSAJES_DE_ERROR = {
  es: {
    Requerido: "¡Este campo es obligatorio! ⚠️",
    Archivo: "¡Por favor, selecciona un archivo! ⚠️",
    Max3Numeros: "¡Este campo solo acepta 3 números! 🔠",
    Min4: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
    Max5: "¡Este campo no puede tener más de 5 caracteres! 🔠",
    Min10: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
    Max10: "¡Este campo no puede tener más de 10 caracteres! 🔠",
    Max100: "¡Este campo no puede tener más de 100 caracteres! 🔠",
    Max1000: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
  },
  en: {
    Requerido: "¡This field is required! ⚠️",
    Archivo: "¡Please select a file! ⚠️",
    Max3Numeros: "¡This field only accepts 3 numbers! 🔠",
    Min4: "¡This field cannot have less than 4 characters! 🔠",
    Max5: "¡This field cannot have more than 5 characters! 🔠",
    Min10: "¡This field cannot have less than 10 characters! 🔠",
    Max10: "¡This field cannot have more than 10 characters! 🔠",
    Max100: "¡This field cannot have more than 100 characters! 🔠",
    Max1000: "¡This field cannot have more than 1000 characters! 🔠",
  },
};
export const DICCIONARIO_RESULTADOS = {
  es: {
    NoResultados: "¡Oops! No se encontraron resultados.",
    NoResultadoPorFecha: "¡Oops! No se encontraron resultados para las fechas",
    NoResultadosPedidos: "¡Oops! Parece que más no tienes pedidos realizados.",
    Obtuvimos: "Obtuvimos",
    Resultados: "resultados",
  },
  en: {
    NoResultados: "Oops! No results were found.",
    NoResultadoPorFecha: "Oops! No results were found for the dates",
    NoResultadosPedidos: "Oops! It seems you don't have any orders.",
    Obtuvimos: "We got",
    Resultados: "results",
  },
};
export const DICCIONARIO_PAGINACION = {
  es: {
    Pagina: "Página",
    De: "de",
  },
  en: {
    Pagina: "Page",
    De: "of",
  },
};
/* TERMINA DICCIONARIO GENERAL */
