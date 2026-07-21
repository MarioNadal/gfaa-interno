# Auditoría de la web interna — gfaa-interno

Revisión hecha leyendo directamente el código del repositorio (`MarioNadal/gfaa-interno`,
rama `main`), sin necesidad de clonarlo: `index.html`, `agenda.html`, `albumes.html`,
`bailes.html`, `partituras.html`, `documentos.html`, `radio.html`, `admin.html`,
`assets/auth.js`, `assets/data.js`, `assets/config.js`, `assets/style.css` y los `.md`
de configuración.

---

## 1. ¿Cómo funciona la web actualmente?

Es una web **100% estática**, alojada en GitHub Pages: no hay servidor propio, ni base
de datos, ni backend. Todo son ficheros HTML/CSS/JS que cualquiera puede descargar
directamente desde GitHub o desde la URL publicada.

- **Contraseña para ver la web**: una única contraseña compartida por todo el grupo.
  `assets/auth.js` la comprueba con JavaScript, en el propio navegador del visitante.
- **Contenido** (agenda, álbumes, bailes, partituras, documentos, radio): vive en
  `datos/contenidos.json` y se descarga con `fetch()` desde `assets/data.js`.
- **Panel admin** (`admin.html`): los responsables pegan un token de GitHub y el panel
  escribe directamente en `datos/contenidos.json` a través de la API de GitHub.

## 2. Hallazgo crítico: la contraseña sigue siendo la de fábrica

He comprobado el hash guardado en `assets/auth.js` (`888136bb...`) y corresponde
exactamente a la contraseña de ejemplo **`gfaa2026`**, la misma que aparece **en texto
plano** en `INSTRUCCIONES.md`, un fichero público del repositorio.

**Esto significa que, ahora mismo, cualquiera que abra el repositorio de GitHub —que es
público— puede leer la contraseña real de la web sin ningún esfuerzo.** Es la
vulnerabilidad más grave y más fácil de arreglar de todas: cambiar la contraseña con
`utilidades/generar-clave.html` y pegar el nuevo hash en `assets/auth.js` (lo explico
en las recomendaciones). Esto es independiente de todo lo demás y conviene hacerlo hoy
mismo.

## 3. ¿Se puede entrar en /agenda (o cualquier página) sin poner la contraseña?

Sí, y por eso lo marco como importante. Con el diseño actual (contraseña comprobada
solo con JavaScript en el navegador, sin ningún servidor de por medio) hay tres formas
de saltarse la pantalla de acceso, de más a menos grave:

1. **El contenido real ya es público, tenga o no contraseña la página.** Los datos de
   agenda/álbumes/documentos no están "detrás" de la contraseña: viven en
   `datos/contenidos.json`, un fichero que cualquiera puede abrir directamente
   (`.../datos/contenidos.json`) sin pasar por ninguna pantalla de acceso. La
   contraseña protege la *página que los muestra bonitos*, no el dato en sí.
2. **Bypass con las herramientas de desarrollador del navegador.** Cualquiera con un
   mínimo de curiosidad puede abrir la consola (F12) y ejecutar
   `sessionStorage.setItem('gfaa_auth','1')` y recargar: entra sin saber la
   contraseña. No hace falta ser programador, hay tutoriales de esto en cualquier
   buscador.
3. **Bypass desactivando JavaScript.** Antes de mi cambio, si el navegador no ejecuta
   JavaScript (poco frecuente, pero posible), la clase que bloquea visualmente la
   página nunca se añadía y el contenido se veía sin más. Ya lo he corregido (ver
   sección 5), pero lo incluyo porque es justo el tipo de fallo que describías.

**La causa de fondo es arquitectónica:** al no haber servidor, no existe ningún sitio
donde "de verdad" se pueda impedir el acceso a un fichero antes de entregarlo — todo lo
que hay en el repositorio es, por definición, descargable por cualquiera que conozca o
adivine la URL. Es el mismo aviso que ya hacíais vosotros mismos, con honestidad, en
`INSTRUCCIONES.md` y `CONFIGURAR-GITHUB.md` ("no subáis datos sensibles"). Con los
cambios de este repaso se cierra el fallo más tonto (verla sin JS) y se reduce
significativamente la fricción para un curioso normal, pero **no existe una forma 100%
segura de impedir el acceso directo mientras la web sea puramente estática**. La única
manera real de conseguirlo es añadir algo de servidor (aunque sea mínimo) delante del
contenido — lo detallo en la sección 6, y encaja bien como parte del rediseño que
tienes pensado para el TFG.

## 4. ¿Es esto grave para vuestro caso?

Depende de qué contenido subáis. Agenda de ensayos, vídeos de YouTube, enlaces a Google
Fotos/Drive y partituras no son datos especialmente sensibles; el propio equipo ya lo
advierte en sus notas. El riesgo real sería si en algún momento alguien sube ahí datos
personales (DNI, direcciones, datos bancarios, fotos de menores sin permiso, etc.) — eso
sí que no debería estar nunca en una web estática pública, contraseña o no.

## 5. Cambios ya aplicados en esta revisión

- **Contraseña sin nombre**: quitado el campo "Tu nombre (opcional)" del formulario de
  acceso y todo el código asociado (saludo personalizado guardado en el navegador).
  Ahora el acceso es solo con la contraseña del grupo, tal como pediste.
- **Bloqueo real sin JavaScript**: añadido un `<noscript>` en las 7 páginas privadas
  que oculta todo el contenido con CSS si el navegador no ejecuta JavaScript, en vez de
  mostrarlo sin más. Antes no existía ninguna protección para ese caso.
- **`noindex` en todas las páginas privadas**: para que Google y otros buscadores no
  las indexen ni las guarden en caché (antes no había ninguna instrucción al
  respecto).
- **Panel admin más claro**: contador de elementos por pestaña, texto de ayuda visible
  arriba del todo, pantalla de "Cargando…" mientras se comprueba la sesión, cerrar la
  ventana emergente con Escape o pulsando fuera, y foco automático en el campo del
  token al entrar.

## 6. Recomendaciones (por orden de prioridad)

1. **Cambiar la contraseña del grupo ya.** Es la acción más urgente y más rápida:
   abrid `utilidades/generar-clave.html`, escribid una contraseña nueva, copiad el
   hash que genera y pegadlo en `assets/auth.js` (línea `hash:`). Después, `git commit`
   y `git push`.
2. **No tratéis la contraseña como seguridad real, sino como "no entres por error".**
   Es la naturaleza de una web estática sin servidor: sirve para que un desconocido no
   se tropiece con la web, no para proteger datos sensibles.
3. **Si en el futuro queréis protección de verdad** (que ni viendo el código fuente, ni
   con la consola del navegador, ni conociendo la URL del JSON se pueda entrar sin la
   contraseña), hace falta algo de servidor delante de los ficheros. Opciones
   razonables para una web de este tamaño, sin coste o con coste muy bajo:
   - **Cloudflare Pages + Cloudflare Access**, o un **Cloudflare Worker** delante de
     GitHub Pages que compruebe una cookie de sesión antes de servir cualquier página
     o el JSON.
   - Mover el hosting a **Vercel/Netlify** con una función serverless que valide la
     contraseña en el servidor antes de devolver el contenido.
   
   Es más trabajo que lo actual, pero es exactamente el tipo de mejora que encaja con
   el rediseño de la web que planteas hacer como TFG el curso 2026/2027 — puedo
   ayudarte a diseñarlo cuando llegue el momento.
4. **Rotación de tokens del panel admin.** El token de GitHub de cada responsable se
   guarda en `localStorage` del navegador (en texto, aunque solo accesible desde ese
   dispositivo). Si algún día un responsable deja el grupo o pierde el dispositivo,
   revocad su token en GitHub (Settings → Developer settings → Tokens) sin esperar.
5. **Copia de seguridad de `datos/contenidos.json`.** Como todo el contenido vive en
   un único fichero JSON editado por varias personas, no estaría de más hacer una
   copia periódica (o revisar el historial de commits de GitHub, que ya sirve de
   respaldo automático).

## 7. Resumen en una frase

Hoy mismo cualquiera con el enlace al repositorio de GitHub puede entrar con la
contraseña de fábrica, y aunque la cambiéis, ninguna web puramente estática puede
impedir del todo el acceso directo a sus ficheros — lo máximo que se puede hacer (y ya
está hecho) es quitar los atajos más obvios y dejar dicho, con claridad, que la
protección real requeriría un pequeño servidor delante.
