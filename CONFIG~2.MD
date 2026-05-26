# Conectar la Agenda con el calendario de Google — gratis

Con esto, la página **Agenda** muestra el calendario del grupo. Cuando añadáis un
evento en Google Calendar, **aparece solo en la web**. Y cada integrante puede
suscribirse para tener las fechas en su móvil.

> ⏱️ Unos 5 minutos, una sola vez.

## Paso 1 · Crear el calendario del grupo
1. Entra en **https://calendar.google.com** con una cuenta de Google del grupo.
2. A la izquierda, junto a “Otros calendarios”, pulsa **+** → **Crear calendario**.
3. Nombre: **GFAA – Eventos** (o el que queráis). Pulsa **Crear calendario**.

## Paso 2 · Hacerlo público (para que se pueda ver en la web)
1. En la lista de la izquierda, pasa el ratón por tu calendario → **⋮** → **Configuración y uso compartido**.
2. En **Permisos de acceso para eventos**, marca **Hacer disponible para el público**
   y deja **“Ver todos los detalles”**. (Acepta el aviso.)

## Paso 3 · Copiar el “ID del calendario”
1. En esa misma página, baja hasta **Integrar calendario**.
2. Copia el **ID del calendario** (algo como `abcd1234...@group.calendar.google.com`).

## Paso 4 · Pegarlo en la web
1. Abre `assets/config.js` con el Bloc de notas.
2. En el apartado del calendario, pega el ID:
   ```js
   window.GFAA_CALENDAR = {
     id: "abcd1234...@group.calendar.google.com",
     tz: "Europe/Madrid"
   };
   ```
3. Guarda y vuelve a subir `assets/config.js` a GitHub.

## ¡Listo!
- En **Agenda** se verá el calendario del mes con todas las fechas.
- Botón **“+ Añadir a mi Google Calendar”**: cada uno se añade el calendario del grupo.
- Botón **“Suscribirse (Apple / Outlook)”**: para verlo en iPhone, Outlook, etc.
- Para añadir/quitar fechas: hacedlo en **Google Calendar** (desde el móvil o el ordenador).
  Se actualiza en la web en unos minutos, sin tocar nada más.

> Nota: el calendario será **público** (cualquiera con el enlace puede ver las fechas).
> Para las fechas de actuaciones de un grupo suele ser lo deseado. No pongáis datos
> privados en los eventos.
