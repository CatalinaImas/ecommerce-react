# Urban Plant Cookies — E-commerce (Segunda entrega)

E-commerce de cookies plant-based con estética New York style. En esta segunda entrega la maqueta HTML/CSS de la primera entrega se migró a **React**, con navegación por **React Router** y datos reales desde **MockAPI**.

## Funcionalidades

- Home con banner, hero, productos destacados (desde la API) y beneficios
- Listado de productos con filtros por categoría y precio
- Detalle de producto dinámico (`/products/:id`)
- Registro con validaciones y guardado en MockAPI
- Login (por ahora solo muestra los datos en consola)
- Admin de productos: listar, crear, editar y eliminar
- Admin de usuarios: listar, crear, editar y eliminar
- Contacto y Acerca de nosotros
- Diseño responsive

## Tecnologías utilizadas

- React (Vite)
- React Router v6
- MockAPI (API REST simulada)
- React Hook Form
- SweetAlert2
- Font Awesome
- CSS 

## Cómo abrir el proyecto

Requisito: tener instalado [Node.js](https://nodejs.org) 18 o superior.

1. Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/CatalinaImas/ecommerce-react
cd ecommerce-react
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador la dirección que aparece en la terminal, por defecto `http://localhost:5173`. La terminal tiene que quedar abierta mientras se usa la app.

## Datos (MockAPI)

El proyecto ya está conectado a una API en MockAPI, así que no hace falta configurar nada para probarlo. Tiene dos recursos:

- `products`: `name`, `price`, `description`, `image`, `category`, `createdAt`
- `users`: `name`, `email`, `password`, `birthDate`, `province`

La URL de la API está en `src/services/config.js`. Para usar una API propia, hay que cambiarla ahí.

## Estructura

```
src/
├── components/   layout (Navbar, Footer), ui (ProductCard, Loader), products, users
├── pages/        una por cada ruta
├── services/     todas las llamadas a MockAPI
├── constants/    categorías y provincias
├── styles/       CSS por página
└── utils/        funciones auxiliares
```

## Autora

Catalina Imas — [GitHub](https://github.com/CatalinaImas)
