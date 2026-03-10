# Closer Connected

## Descripción

Este es el repositorio del proyecto **Closer Connected**, una plataforma web desarrollada con React, TypeScript y Vite, diseñada para conectar empresas y talento en LATAM y EE.UU.

## Estructura del Proyecto

El proyecto ha sido reorganizado para tener una estructura **totalmente plana** en la raíz. Todos los componentes, páginas y utilidades se encuentran directamente en la carpeta principal para facilitar el acceso y evitar anidamientos complejos.

### Archivos Principales

- `App.tsx`: Componente principal de la aplicación y configuración de rutas.
- `main.tsx`: Punto de entrada de la aplicación.
- `pages.tsx`: Contiene las páginas `Home` y `CompanyApply`.
- `layout.tsx`: Contiene `Navbar` y `Footer`.
- `sections.tsx`: Contiene todas las secciones de la Landing Page.
- `forms.tsx`: Contiene los formularios de la aplicación.
- `components.tsx`: Componentes UI reutilizables.
- `utils.ts`: Utilidades y hooks.

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
    Esto generará una carpeta `dist` con los archivos listos para desplegar.

## Despliegue en GitHub Pages

Para desplegar en GitHub Pages:

1.  Sube este repositorio a GitHub.
2.  Ve a la pestaña **Settings** > **Pages**.
3.  En **Source**, selecciona **GitHub Actions**.
4.  GitHub detectará automáticamente que es un proyecto Vite y sugerirá un flujo de trabajo.
5.  O alternativamente, puedes usar el paquete `gh-pages` para desplegar la carpeta `dist` a la rama `gh-pages`.

## Despliegue en Vercel

Este proyecto está configurado para desplegarse fácilmente en [Vercel](https://vercel.com/).

1.  Sube este repositorio a GitHub.
2.  Importa el proyecto en Vercel.
3.  Vercel detectará automáticamente que es un proyecto **Vite**.
4.  La configuración de construcción (`Build Command`) debería ser `npm run build`.
5.  El directorio de salida (`Output Directory`) debería ser `dist`.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript con tipado estático.
- **Vite**: Herramienta de construcción rápida y servidor de desarrollo.
- **Tailwind CSS**: Framework de CSS para estilizado rápido.
- **React Router**: Enrutamiento para aplicaciones de una sola página (SPA).
- **Lucide React**: Iconos SVG.
