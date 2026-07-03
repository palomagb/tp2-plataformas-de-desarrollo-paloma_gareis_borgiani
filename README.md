# 🐾 Pet Care Tracker

## Integrante
Paloma Gareis Borgiani

## Descripción de la aplicación
Pet Care Tracker es una aplicación web diseñada para gestionar y registrar los cuidados diarios de las mascotas. Permite llevar un control de tareas específicas como alimentación, higiene y controles de salud.

## Temática elegida
Gestión de cuidados de mascotas (Pet Care).

## Usuarios y roles disponibles
La aplicación cuenta con dos niveles de acceso mediante un sistema de login simulado:
* **Usuario (role: user):** Puede visualizar el dashboard de sus mascotas, agregar nuevas tareas de cuidado, editar las existentes y eliminarlas.
* **Administrador (role: admin):** Tiene acceso a un panel de control exclusivo para la gestión global del sistema.

## Instrucciones para levantar el proyecto
1. Clonar el repositorio.
2. Abrir la terminal en la carpeta del proyecto.
3. Ejecutar el comando `npm install` para descargar las dependencias.
4. Ejecutar el comando `npm run dev` para levantar el servidor local.
5. Abrir la URL proporcionada en el navegador.

## Funcionalidades principales
* **Simulación de Login/Logout:** Validación de credenciales de forma local utilizando Context API.
* **Renderizado Condicional:** Vistas protegidas y diferenciadas según el rol del usuario logueado.
* **Operaciones CRUD:** Creación, lectura, edición y eliminación de tareas de cuidado.
* **Persistencia Local:** Simulación de base de datos utilizando un archivo `data.json`.
* **Rutas:** Navegación fluida entre vistas utilizando React Router DOM.

## Captura de pantalla del Proyecto
