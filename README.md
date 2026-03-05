# Closer Connected

## Descripción

Este es el repositorio del proyecto **Closer Connected**, una plataforma web desarrollada con React, TypeScript y Vite, diseñada para conectar empresas y talento en LATAM y EE.UU.

## Estructura del Proyecto

El proyecto ha sido reorganizado para tener una estructura plana en la carpeta `src/`. Todos los componentes, páginas y utilidades se encuentran directamente en `src/` para facilitar el acceso y evitar anidamientos complejos.

### Archivos Principales

- `src/App.tsx`: Componente principal de la aplicación y configuración de rutas.
- `src/main.tsx`: Punto de entrada de la aplicación.
- `src/Home.tsx`: Página de inicio (Landing Page).
- `src/CompanyApply.tsx`: Página de aplicación para empresas.
- `src/CompanyApplyForm.tsx`: Formulario de registro para empresas.
- `src/Navbar.tsx`: Barra de navegación.
- `src/Footer.tsx`: Pie de página.

## Instalación y Ejecución

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio** (o descargar la carpeta):
    Asegúrate de tener la carpeta del proyecto en tu máquina.

2.  **Instalar dependencias**:
    Abre una terminal en la carpeta raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo**:
    Para iniciar la aplicación en modo de desarrollo, ejecuta:
    ```bash
    npm run dev
    ```
    Esto abrirá la aplicación en tu navegador (por defecto en `http://localhost:5173/`).

4.  **Construir para producción**:
    Para generar los archivos estáticos optimizados para producción:
    ```bash
    npm run build
    ```

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript con tipado estático.
- **Vite**: Herramienta de construcción rápida y servidor de desarrollo.
- **Tailwind CSS**: Framework de CSS para estilizado rápido.
- **React Router**: Enrutamiento para aplicaciones de una sola página (SPA).
- **Lucide React**: Iconos SVG.

## Notas Adicionales

- La integración con WhatsApp está configurada para redirigir al número `+1 585-676-6514`.
- El formulario de empresas valida los campos y redirige a WhatsApp con la información precargada.
