/* =========================================================
   Grupo Folklórico "Alto Aragón" — Capa de datos (GitHub)
   Lee el contenido de datos/contenidos.json (en el repositorio)
   y lo pinta en cada sección. Si no se puede leer, deja los ejemplos.
   ========================================================= */

/* Utilidades */
function gfaaEsc(s){
  return String(s==null?"":s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}
var GFAA_MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
function gfaaDia(f){ if(!f) return ""; var d=new Date(f+"T00:00:00"); return isNaN(d)?"":String(d.getDate()).padStart(2,"0"); }
function gfaaMes(f){ if(!f) return ""; var d=new Date(f+"T00:00:00"); return isNaN(d)?"":GFAA_MESES[d.getMonth()]; }
function gfaaYoutubeEmbed(u){
  if(!u) return "";
  u = String(u).trim();
  var m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? "https://www.youtube.com/embed/" + m[1] : u;
}
function gfaaOrden(a,b){
  var fa=a.fecha||"9999-99-99", fb=b.fecha||"9999-99-99";
  if(fa!==fb) return fa<fb?-1:1;
  return (a.orden||0)-(b.orden||0);
}

/* Cargar el JSON del repositorio (una sola vez) */
async function gfaaCargarTodo(){
  if(window.__gfaaDatos) return window.__gfaaDatos;
  try{
    var r = await fetch("datos/contenidos.json?t=" + Date.now(), { cache:"no-store" });
    if(!r.ok) return null;
    var arr = await r.json();
    window.__gfaaDatos = Array.isArray(arr) ? arr : [];
    return window.__gfaaDatos;
  }catch(e){ console.warn("GFAA: no se pudo leer el contenido:", e.message); return null; }
}

/* ---------- Render por sección ---------- */
function gfaaRenderAgenda(rows){
  if(!rows.length) return gfaaVacio("Todavía no hay eventos en la agenda.");
  var h='<ul class="list">';
  rows.forEach(function(x){
    h+='<li class="item"><div class="when"><span class="d">'+(gfaaDia(x.fecha)||"·")+'</span><span class="m">'+gfaaMes(x.fecha)+'</span></div>'+
       '<div class="body"><h3>'+gfaaEsc(x.titulo)+'</h3>'+
       (x.subtitulo?'<p class="meta">'+gfaaEsc(x.subtitulo)+'</p>':'')+
       (x.descripcion?'<p>'+gfaaEsc(x.descripcion)+'</p>':'')+'</div></li>';
  });
  return h+'</ul>';
}
function gfaaRenderAlbumes(rows){
  if(!rows.length) return gfaaVacio("Todavía no hay álbumes.");
  var ico='<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>';
  var h='<div class="gallery">';
  rows.forEach(function(x){
    h+='<a class="album" href="'+gfaaEsc(x.url||"#")+'" target="_blank" rel="noopener"><div class="cover">'+ico+'</div>'+
       '<div class="cap"><strong>'+gfaaEsc(x.titulo)+'</strong>'+(x.descripcion?'<span>'+gfaaEsc(x.descripcion)+'</span>':'')+'</div></a>';
  });
  return h+'</div>';
}
function gfaaRenderBailes(rows){
  if(!rows.length) return gfaaVacio("Todavía no hay bailes publicados.");
  var h='';
  rows.forEach(function(x){
    h+='<div class="media"><h3>'+gfaaEsc(x.titulo)+'</h3>';
    var emb=gfaaYoutubeEmbed(x.url);
    if(emb) h+='<div class="frame"><iframe src="'+gfaaEsc(emb)+'" title="Vídeo" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>';
    if(x.descripcion) h+='<p>'+gfaaEsc(x.descripcion)+'</p>';
    h+='</div>';
  });
  return h;
}
function gfaaRenderPartituras(rows){
  if(!rows.length) return gfaaVacio("Todavía no hay partituras ni letras.");
  var ficheros=rows.filter(function(x){return x.url;});
  var letras=rows.filter(function(x){return !x.url && x.descripcion;});
  var ico='<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
  var h='';
  if(ficheros.length){
    h+='<div class="file-grid">';
    ficheros.forEach(function(x){
      h+='<div class="file"><span class="fic">'+ico+'</span><div class="ft"><strong>'+gfaaEsc(x.titulo)+'</strong><span>'+gfaaEsc(x.subtitulo||"PDF")+'</span></div>'+
         '<a class="dl" href="'+gfaaEsc(x.url)+'" target="_blank" rel="noopener">Descargar</a></div>';
    });
    h+='</div>';
  }
  letras.forEach(function(x){
    h+='<h3 style="font-family:var(--font-head);margin-top:1.6rem;">'+gfaaEsc(x.titulo)+'</h3>'+
       '<p style="white-space:pre-line;background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:16px 18px;">'+gfaaEsc(x.descripcion)+'</p>';
  });
  return h;
}
function gfaaRenderDocumentos(rows){
  if(!rows.length) return gfaaVacio("Todavía no hay documentos.");
  var ico='<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>';
  var h='<div class="file-grid">';
  rows.forEach(function(x){
    h+='<div class="file"><span class="fic">'+ico+'</span><div class="ft"><strong>'+gfaaEsc(x.titulo)+'</strong><span>'+gfaaEsc(x.subtitulo||"Documento")+'</span></div>'+
       '<a class="dl" href="'+gfaaEsc(x.url||"#")+'" target="_blank" rel="noopener">Abrir</a></div>';
  });
  return h+'</div>';
}
function gfaaRenderRadio(rows){
  if(!rows.length) return gfaaVacio("Todavía no hay grabaciones.");
  var h='';
  rows.forEach(function(x){
    h+='<div class="media"><h3>'+gfaaEsc(x.titulo)+'</h3>'+(x.subtitulo?'<p class="meta" style="color:var(--muted);">'+gfaaEsc(x.subtitulo)+'</p>':'');
    if(x.url) h+='<audio controls preload="none"><source src="'+gfaaEsc(x.url)+'">Tu navegador no admite audio.</audio>';
    if(x.descripcion) h+='<p style="margin-top:8px;">'+gfaaEsc(x.descripcion)+'</p>';
    h+='</div>';
  });
  return h;
}
function gfaaVacio(msg){
  return '<div class="tip" style="text-align:center;">'+gfaaEsc(msg)+
         ' Los responsables pueden añadirlo desde <a href="admin.html">el panel de administración</a>.</div>';
}
var GFAA_RENDER = {
  agenda:gfaaRenderAgenda, albumes:gfaaRenderAlbumes, bailes:gfaaRenderBailes,
  partituras:gfaaRenderPartituras, documentos:gfaaRenderDocumentos, radio:gfaaRenderRadio
};

/* ---------- Arranque en páginas de sección ---------- */
async function gfaaInitSeccion(){
  var cont = document.querySelector("[data-seccion]");
  if(!cont) return;
  var seccion = cont.getAttribute("data-seccion");
  var todo = await gfaaCargarTodo();
  if(todo === null) return;                 // sin datos: deja los ejemplos
  var rows = todo.filter(function(x){ return x.seccion === seccion; }).sort(gfaaOrden);
  var render = GFAA_RENDER[seccion];
  if(render) cont.innerHTML = render(rows);
}

document.addEventListener("DOMContentLoaded", function(){
  try{ gfaaInitSeccion(); }catch(e){ console.error(e); }
});
