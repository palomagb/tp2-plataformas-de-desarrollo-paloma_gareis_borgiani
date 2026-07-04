# Pet Care Tracker: Tu asistente virtual para el bienestar animal

## Integrante
**Paloma Gareis Borgiani** — *Escuela de Arte Multimedial Da Vinci*

---

## Descripción del Proyecto (El Producto)
**Pet Care Tracker** no es una simple lista de tareas; es una plataforma integral e intuitiva diseñada para revolucionar la forma en que los dueños gestionan la salud y rutina de sus mascotas. 

El sistema ofrece una experiencia de usuario fluida y persistente que permite llevar un control exhaustivo de los cuidados diarios (hidratación, medicación, paseos). Además, va un paso más allá al incorporar una galería educativa con **Tips de Bienestar Natural**, fomentando prácticas saludables y holísticas (como el uso de lick mats o aceite de coco). Todo esto, respaldado por un sólido panel de administración para la gestión de la comunidad.

---

## Entidades del Sistema
Para modelar esta arquitectura, la aplicación cuenta con tres entidades principales estrechamente relacionadas:
1. **Usuarios:** Dueños de las mascotas o administradores del sistema.
2. **Mascotas (Pets):** Entidad vinculada al usuario que recibe los cuidados.
3. **Cuidados (Cares):** Acciones, rutinas y tareas asignadas a cada mascota.

---

## Usuarios, Accesos y Roles Funcionales
El sistema cuenta con un ruteo protegido y renderizado condicional absoluto basado en dos roles:
* **Administrador (`admin`):** Posee un panel de control jerárquico. Visualiza estadísticas globales en tiempo real y tiene acceso a un **ABM (CRUD) completo** para dar de alta, editar roles, modificar nombres o dar de baja a usuarios de la plataforma.
* **Usuario (`user`):** Posee un entorno privado para gestionar su mascota. Puede buscar tareas en tiempo real, agregar nuevos cuidados, editarlos, marcarlos como completados o eliminarlos. Además, tiene acceso exclusivo a la sección de "Tips de Bienestar".


Login de usuarios:
**Admin:** usuario: admin / contraseña: 123
**Usuario:** usuario: usuario / contraseña: 123

---

## Checklist de Aprobación
Este proyecto fue desarrollado siguiendo los requisitos solicitados en la consigna de TP2:

- [x] **Frontend React.js & Hooks:** Desarrollo basado enteramente en componentes funcionales. Uso intensivo y correcto de `useState` (manejo de inputs y UI), `useEffect` (ciclos de vida y persistencia) y `useContext` (estado global).
- [x] **División de Componentes:** Arquitectura limpia. Las vistas están en `/pages` (`Login`, `Dashboard`, `Tips`) y los fragmentos reutilizables en `/components` (`Navbar`, `AdminPanel`, `UserPanel`).
- [x] **Enrutamiento (React Router):** Navegación fluida tipo SPA sin recargar la página mediante `<Routes>`, `<Route>` y `<Link>`.
- [x] **Gestión de Información (CRUD):** El sistema permite listar, agregar, editar y eliminar tanto Cuidados (entorno de usuario) como Usuarios (entorno de administrador).
- [x] **Datos Locales y Persistencia:** El sistema inicializa consumiendo un archivo `data.json` local y luego utiliza el `localStorage` del navegador, garantizando que no se pierda la información al refrescar (sin necesidad de un backend real).
- [x] **Estado Global:** Implementación de la `Context API` (`AuthContext`) para manejar la sesión del usuario a lo largo de toda la aplicación.
- [x] **Validaciones y Seguridad UI:** Prevención de inputs vacíos, alertas visuales "Toast" personalizadas ante el intento de duplicar datos, y bloqueos lógicos (ej: un admin no puede auto-eliminarse en sesión).
- [x] **Originalidad e Interfaz:** Se superó la premisa de "lista de tareas básica" creando una temática de nicho con un diseño UI/UX moderno, responsivo, coherente en su paleta de colores (verde salvia y crema) y altamente usable.

---

## Captura de pantalla del Proyecto 

<img width="1920" height="929" alt="Vite + React - Google Chrome 3_7_2026 23_42_12" src="https://github.com/user-attachments/assets/f0585737-8f91-442c-8f7e-ce30ce50b358" />

<img width="1920" height="939" alt="Vite + React - Google Chrome 3_7_2026 23_42_25" src="https://github.com/user-attachments/assets/8f915141-61a0-4ad9-98a7-e105b3c28fae" />

<img width="1920" height="935" alt="Vite + React - Google Chrome 3_7_2026 23_42_36" src="https://github.com/user-attachments/assets/d58bf425-51c0-45ba-9313-c612804cf176" />

<img width="1920" height="935" alt="Vite + React - Google Chrome 3_7_2026 23_42_42" src="https://github.com/user-attachments/assets/de0afe2c-741a-4603-8633-5912ba840f2f" />

<img width="1920" height="940" alt="Vite + React - Google Chrome 3_7_2026 23_43_33" src="https://github.com/user-attachments/assets/ecf0919c-855e-4b9d-a9f9-c7c7bb8d9fed" />

<img width="1920" height="938" alt="Vite + React - Google Chrome 3_7_2026 23_44_04" src="https://github.com/user-attachments/assets/3c789d94-251b-4a35-8379-c33fa751edac" />

<img width="1920" height="939" alt="Vite + React - Google Chrome 3_7_2026 23_44_21" src="https://github.com/user-attachments/assets/75ecddfa-b14b-48cf-af98-c4697fdcb9dd" />








