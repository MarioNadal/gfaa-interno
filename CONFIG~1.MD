# Editar la web desde el navegador (solo con GitHub) — gratis

Con esto, los 1-3 responsables editan el contenido desde la página **Admin** de la web.
Todo se guarda en tu propio repositorio de GitHub. Sin Supabase ni otros servicios.

> Solo hay un paso un poco técnico (crear un "token"), y se hace una vez por persona.

---

## Antes de empezar
1. Sube la web a GitHub Pages **con todas las carpetas**, incluida `assets` y la
   carpeta `datos` (con `datos/contenidos.json`).
2. Abre `assets/config.js` y comprueba que pone tu usuario y tu repositorio:
   ```js
   window.GFAA_GITHUB = { owner:"marionadal", repo:"gfaa-interno", branch:"main", ruta:"datos/contenidos.json" };
   ```
   Si tu usuario o el nombre del repo son distintos, cámbialos y vuelve a subir.

## Paso 1 · Crear tu "token" de GitHub (la llave de editor)
1. En GitHub, arriba a la derecha: tu foto → **Settings**.
2. Abajo del todo: **Developer settings** → **Personal access tokens** → **Fine-grained tokens**.
3. **Generate new token**. Rellena:
   - **Token name:** `Editor GFAA`
   - **Expiration:** lo que quieras (p. ej. 1 año; cuando caduque, se crea otro).
   - **Repository access:** *Only select repositories* → elige **gfaa-interno**.
   - **Permissions** → **Repository permissions** → **Contents**: ponlo en **Read and write**.
4. Pulsa **Generate token** y **copia** el token (empieza por `github_pat_…`). Solo se ve una vez.

## Paso 2 · Entrar en el panel
1. Abre tu web y pulsa **Admin** (en el pie de página) o ve a `…/admin.html`.
2. Pega el token y pulsa **Entrar**. Queda guardado en ese navegador (no hay que pegarlo cada vez).

## Paso 3 · Editar
- Elige una sección (Agenda, Álbumes…), pulsa **+ Añadir**, rellena y **Guardar**.
- Usa **Editar** o **Borrar** en cada elemento.
- Los cambios aparecen en la web en **aproximadamente 1 minuto** (lo que tarda GitHub en publicar).
- Para fotos: pega el **enlace** del álbum (Google Fotos). Para vídeos: el **enlace de YouTube**.
  Para PDF/documentos: el **enlace** (Google Drive, etc.).

## Cada responsable
Repite el Paso 1 y 2 con su propia cuenta de GitHub y su propio token (todos deben
tener acceso al repositorio; el dueño puede invitarlos en **Settings → Collaborators**).
Para dejar de ser editor: pulsa **Cerrar sesión** en el panel, o borra el token en GitHub.

## Seguridad (honesto)
- El token es como una llave para editar **solo ese repositorio**. Guárdalo en privado.
- Si se pierde o se filtra, entra en GitHub y bórralo (Revoke); dejará de funcionar al instante.
- No subáis datos sensibles (DNI escaneados, datos bancarios) a una web pública.

## Alternativa sin token (avanzado)
También puedes editar el archivo `datos/contenidos.json` directamente en GitHub
(botón del lápiz), pero hay que respetar el formato (comas, comillas). El panel es más cómodo.
