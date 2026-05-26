/* =========================================================
   Grupo Folklórico "Alto Aragón" — Funciones de la web
   (menú móvil, sección activa, año del pie, animaciones de scroll)
   ========================================================= */
document.addEventListener("DOMContentLoaded", function(){

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links  = document.querySelector(".nav-links");
  if(toggle && links){
    toggle.addEventListener("click", function(){ links.classList.toggle("open"); });
  }

  /* ---- Resaltar el enlace de la página actual ---- */
  var actual = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(function(a){
    var href = (a.getAttribute("href") || "").toLowerCase();
    if(href === actual || (actual === "" && href === "index.html")){ a.classList.add("active"); }
  });

  /* ---- Año del pie ---- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---- Animaciones de aparición al hacer scroll ---- */
  var selectores = ".reveal, .card, .item, .file, .album, .media, .section-title, .section-lead, .strip .stat, .prose > h2, .tip";
  var elementos = Array.prototype.slice.call(document.querySelectorAll(selectores));

  elementos.forEach(function(el){
    if(!el.classList.contains("reveal")) el.classList.add("reveal");
  });

  if(!("IntersectionObserver" in window)){
    elementos.forEach(function(el){ el.classList.add("in"); });
    return;
  }

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        var hermanos = el.parentElement
          ? Array.prototype.slice.call(el.parentElement.children).filter(function(c){return c.classList.contains("reveal");})
          : [];
        var idx = hermanos.indexOf(el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx,6) * 80 : 0) + "ms";
        el.classList.add("in");
        obs.unobserve(el);
      }
    });
  }, { threshold:0.12, rootMargin:"0px 0px -40px 0px" });

  elementos.forEach(function(el){ obs.observe(el); });
});
