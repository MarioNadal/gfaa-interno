# Web interna · Grupo Folklórico "Alto Aragón"

Guía rápida para ver, personalizar y publicar la web **gratis y con su propia dirección (URL)**.

---

## 1. Qué hay dentro de esta carpeta

```
gfaa-web/
├─ index.html          → Portada (Inicio)
├─ agenda.html         → Agenda
├─ albumes.html        → Álbumes
├─ bailes.html         → Bailes
├─ partituras.html     → Partituras y Letras
├─ documentos.html     → Documentos
├─ radio.html          → En la radio
├─ assets/             → Diseño y funcionamiento
│   ├─ style.css        (colores y estilo)
│   ├─ auth.js          (la contraseña va aquí)
│   └─ site.js          (menú y animaciones)
├─ archivos/           → Aquí pones tus PDF, MP3, etc.
└─ utilidades/
    └─ generar-clave.html   → Para cambiar la contraseña
```

---

## 2. Verla en tu ordenador (antes de publicar)

Haz **doble clic en `index.html`**. Se abrirá en tu navegador y te pedirá la contraseña.

- **Contraseña por defecto: `gfaa2026`**

Cuando entres, podrás moverte por todas las secciones. (La sesión se cierra al cerrar la pestaña, o pulsando **Salir**.)

---

## 3. Cambiar la contraseña del grupo  ⚠️ Importante

1. Abre `utilidades/generar-clave.html` (doble clic).
2. Escribe la contraseña nueva y pulsa **Generar huella**.
3. Copia el texto largo que aparece.
4. Abre `assets/auth.js` con el Bloc de notas, busca la línea:
   ```
   hash: "888136bb....",
   ```
   y sustituye el texto entre comillas por el que copiaste. Guarda.

La contraseña **nunca se guarda tal cual** en la web, solo su "huella", así que no se puede leer mirando los archivos.

---

## 4. Publicarla GRATIS y conseguir una URL (sin pagar, sin tarjeta)

> **Importante:** la web solo necesita "alojamiento de archivos estáticos", que es
> gratis en todas las opciones de abajo. NO usamos ninguna función de pago (el acceso
> con contraseña ya va incluido dentro de la propia web).

### Opción A — Cloudflare Pages (RECOMENDADA: gratis y sin tarjeta)

Es gratis de verdad, **no pide tarjeta** y ofrece ancho de banda ilimitado.

1. Entra en **https://pages.cloudflare.com** y crea tu cuenta gratuita. *(Debes crearla tú; yo no puedo crear cuentas por ti.)*
2. En el panel: **Workers & Pages → Create → Pages → Upload assets** (subida directa).
3. Ponle un nombre al proyecto, por ejemplo `gfaa-interno`.
4. **Arrastra el contenido de la carpeta `gfaa-web`** (o la carpeta comprimida en .zip) y pulsa **Deploy**.
5. En unos segundos tendrás la web online en una dirección tipo
   **`https://gfaa-interno.pages.dev`**, con candado de seguridad (HTTPS) incluido.
6. Para actualizarla en el futuro: entra en el proyecto y vuelve a subir los archivos
   (**Create new deployment**).

### Opción B — GitHub Pages (gratis, también sin tarjeta)

Otra alternativa 100% gratis si ya usas GitHub: creas un repositorio, subes los
archivos y activas **Settings → Pages**. Te da una dirección `tuusuario.github.io/...`.
Es algo más técnica que Cloudflare.

### Sobre Netlify

Netlify también tiene plan gratuito, pero desde 2026 funciona con un modelo de
"pago por uso" y **suele pedir una tarjeta al registrarte**. Por eso recomiendo
Cloudflare Pages, que no la pide.

> El subdominio gratuito (`.pages.dev` / `.github.io`) es **gratis para siempre**.
> Si algún día quisierais un dominio propio (p. ej. `grupoaltoaragon.es`), eso sí
> cuesta unos 10 €/año, pero **no es necesario**.

---

## 5. Añadir tu contenido real

Todas las páginas traen **ejemplos** y un recuadro amarillo explicando qué cambiar.
Puedes editar los `.html` con el **Bloc de notas** (clic derecho → Abrir con → Bloc de notas).

- **Agenda:** copia un bloque de evento y cambia día, mes y texto. (También puedes incrustar un Google Calendar.)
- **Álbumes:** sube las fotos a Google Fotos, crea un álbum, copia su enlace y pégalo en una tarjeta.
- **Bailes:** sube los vídeos a YouTube (puedes ponerlos como "no listado"), copia el enlace de *Insertar* y pégalo.
- **Partituras / Documentos:** mete los PDF en la carpeta `archivos/` y enlázalos (`archivos/mi-documento.pdf`).
- **En la radio:** mete los MP3 en `archivos/` y enlázalos en el reproductor.

Después de editar, vuelve a subir los archivos (paso 4).

---

## 6. Sobre la seguridad del acceso

Esta web usa **una contraseña compartida** para todo el grupo. Es la opción gratuita
más sencilla y suficiente para mantener fuera al público general, ideal para 50–200
integrantes sin tener que gestionar cuentas una por una.

**Limitación honesta:** al ser una web "estática" (sin servidor), la protección es de tipo
"candado", no de nivel bancario. Es perfecta para agenda, fotos, partituras y documentos
internos. **No subas datos especialmente sensibles** (DNI escaneados, datos bancarios, etc.).

**Si en el futuro queréis acceso individual (cada persona con su DNI y su contraseña):**
se puede hacer también gratis añadiendo un sistema de cuentas (por ejemplo con *Supabase*,
plan gratuito). Implica algo más de mantenimiento (dar de alta a cada integrante). Si lo
queréis, se puede preparar como mejora.

---

*Web preparada para el Grupo Folklórico "Alto Aragón".*
