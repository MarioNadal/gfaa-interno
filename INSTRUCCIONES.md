# Web interna · Grupo Folklórico "Alto Aragón"

Web privada con diseño moderno y **editable desde la propia web** (solo con GitHub,
sin otros servicios): los responsables añaden y cambian el contenido con formularios.

---

## 1. Qué hay dentro de esta carpeta
```
gfaa-web/
├─ index.html              Portada
├─ agenda / albumes / bailes / partituras / documentos / radio .html
├─ admin.html              Panel de administración (para los responsables)
├─ datos/contenidos.json   El contenido de la web (lo edita el panel)
├─ assets/
│   ├─ style.css            diseño
│   ├─ config.js            ← dirección de tu repositorio de GitHub
│   ├─ data.js              lee el contenido y lo muestra
│   ├─ auth.js              contraseña del grupo (para ver la web)
│   └─ site.js              menú y animaciones
├─ archivos/   utilidades/
├─ INSTRUCCIONES.md         (este archivo)
└─ CONFIGURAR-GITHUB.md     cómo activar la edición desde la web
```

## 2. Dos "llaves" distintas (no confundirlas)
- **Contraseña del grupo** (`gfaa2026` por defecto): la usan TODOS para *ver* la web.
  Se cambia en `assets/auth.js` (ver punto 4).
- **Token de GitHub**: solo lo tienen los 1-3 responsables para *editar* en `admin.html`.
  Se crea una vez (ver CONFIGURAR-GITHUB.md).

## 3. Verla en tu ordenador
Doble clic en `index.html` → entra con la contraseña del grupo (`gfaa2026`).

## 4. Cambiar la contraseña del grupo
1. Abre `utilidades/generar-clave.html`, escribe la nueva y copia la "huella".
2. Pégala en `assets/auth.js` (línea `hash: "..."`). Guarda y vuelve a subir.

## 5. Editar el contenido desde la web (lo que pediste)
Sigue **CONFIGURAR-GITHUB.md** (crear el token una vez). Después:
- Los responsables entran en `admin.html` (enlace **Admin** del pie).
- Eligen sección, **+ Añadir**, rellenan y **Guardar**.
- El cambio aparece en la web en ~1 minuto. No hay que volver a subir archivos.

## 6. Publicarla gratis (hosting + URL)
- **GitHub Pages** (gratis, sin tarjeta). Sube SIEMPRE **todas las carpetas**
  (incluidas `assets` y `datos`), o la web saldrá sin diseño o sin contenido.

## 7. Seguridad (honesto)
Contraseña compartida para ver + token de GitHub para editar. Ideal para agenda,
fotos, partituras y documentos del grupo. Al ser una web pública, **no subáis datos
sensibles** (DNI escaneados, datos bancarios, etc.).

---
*Web preparada para el Grupo Folklórico "Alto Aragón".*
