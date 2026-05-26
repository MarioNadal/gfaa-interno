/* =========================================================
   Grupo Folklórico "Alto Aragón" — Control de acceso
   ---------------------------------------------------------
   Acceso mediante UNA contraseña compartida para todo el grupo.
   La contraseña NO se guarda en texto plano: solo se guarda su
   "huella" (hash SHA-256). Para cambiarla, usa la herramienta
   utilidades/generar-clave.html y pega el resultado abajo.
   ========================================================= */

/* ===========================================================
   CONFIGURACIÓN  —  ESTO ES LO ÚNICO QUE NECESITAS TOCAR
   =========================================================== */
const GFAA_CONFIG = {
  // Huella (hash) de la contraseña del grupo.
  // Contraseña por defecto: gfaa2026   (¡cámbiala!)
  hash: "888136bb9ed552eb3a1a83d008efda2509e06b6b92d1e537901c03dddad395aa",

  // Texto que aparece en la pantalla de acceso
  titulo: "Grupo Folklórico “Alto Aragón”",
  subtitulo: "Zona privada para integrantes del grupo"
};
/* =========================================================== */


/* Bloquea la página de inmediato (antes de pintar el contenido) */
document.documentElement.classList.add("locked");

/* ---------- SHA-256 (implementación propia, funciona en local y publicada) ---------- */
function gfaaSha256(ascii){
  function rr(v,a){return (v>>>a)|(v<<(32-a));}
  var mp=Math.pow, mw=mp(2,32), L="length";
  var i,j,result="",words=[],bitLen=ascii[L]*8;
  var hash=gfaaSha256.h=gfaaSha256.h||[];
  var k=gfaaSha256.k=gfaaSha256.k||[];
  var pc=k[L], comp={};
  for(var c=2;pc<64;c++){
    if(!comp[c]){
      for(i=0;i<313;i+=c){comp[i]=c;}
      hash[pc]=(mp(c,.5)*mw)|0;
      k[pc++]=(mp(c,1/3)*mw)|0;
    }
  }
  ascii+="\x80";
  while(ascii[L]%64-56)ascii+="\x00";
  for(i=0;i<ascii[L];i++){
    j=ascii.charCodeAt(i);
    if(j>>8)return;
    words[i>>2]|=j<<((3-i)%4)*8;
  }
  words[words[L]]=((bitLen/mw)|0);
  words[words[L]]=(bitLen);
  for(j=0;j<words[L];){
    var w=words.slice(j,j+=16);
    var oldHash=hash;
    hash=hash.slice(0,8);
    for(i=0;i<64;i++){
      var w15=w[i-15],w2=w[i-2];
      var a=hash[0],e=hash[4];
      var t1=hash[7]
        +(rr(e,6)^rr(e,11)^rr(e,25))
        +((e&hash[5])^((~e)&hash[6]))
        +k[i]
        +(w[i]=i<16?w[i]:(
            w[i-16]
            +(rr(w15,7)^rr(w15,18)^(w15>>>3))
            +w[i-7]
            +(rr(w2,17)^rr(w2,19)^(w2>>>10))
          )|0);
      var t2=(rr(a,2)^rr(a,13)^rr(a,22))
        +((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash=[(t1+t2)|0].concat(hash);
      hash[4]=(hash[4]+t1)|0;
    }
    for(i=0;i<8;i++){hash[i]=(hash[i]+oldHash[i])|0;}
  }
  for(i=0;i<8;i++){
    for(j=3;j+1;j--){
      var b=(hash[i]>>(j*8))&255;
      result+=((b<16)?0:"")+b.toString(16);
    }
  }
  return result;
}
function gfaaUtf8(s){return unescape(encodeURIComponent(s));}
function gfaaHash(pwd){return gfaaSha256(gfaaUtf8(pwd));}

/* ---------- Sesión ---------- */
function gfaaIsAuth(){
  try{ return sessionStorage.getItem("gfaa_auth") === "1"; }catch(e){ return false; }
}
function gfaaUnlock(){
  document.documentElement.classList.remove("locked");
  var ov = document.getElementById("gfaa-auth");
  if(ov) ov.remove();
  gfaaPintarSaludo();
}
function gfaaLogout(){
  try{ sessionStorage.removeItem("gfaa_auth"); }catch(e){}
  location.reload();
}
window.gfaaLogout = gfaaLogout;

/* Saludo personalizado (opcional, se guarda solo en este dispositivo) */
function gfaaPintarSaludo(){
  var nombre = "";
  try{ nombre = localStorage.getItem("gfaa_nombre") || ""; }catch(e){}
  document.querySelectorAll("[data-saludo]").forEach(function(el){
    el.textContent = nombre ? ("Hola, " + nombre + ".") : "";
  });
}

/* ---------- Pantalla de acceso ---------- */
function gfaaMostrarLogin(){
  var emblem = '<img class="emblem" src="assets/img/logo.png" alt="Grupo Folklórico Alto Aragón">';

  var ov = document.createElement("div");
  ov.id = "gfaa-auth";
  ov.className = "auth-overlay";
  ov.innerHTML =
    '<span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>'+
    '<form class="auth-card" id="gfaa-form" autocomplete="off">'+
      emblem +
      '<h2>'+GFAA_CONFIG.titulo+'</h2>'+
      '<p class="sub">'+GFAA_CONFIG.subtitulo+'</p>'+
      '<div class="field">'+
        '<label for="gfaa-nombre">Tu nombre (opcional)</label>'+
        '<input id="gfaa-nombre" type="text" placeholder="Nombre y apellidos" autocomplete="off">'+
      '</div>'+
      '<div class="field">'+
        '<label for="gfaa-pass">Contraseña del grupo</label>'+
        '<input id="gfaa-pass" type="password" placeholder="••••••••" autocomplete="off" required>'+
      '</div>'+
      '<button class="btn" type="submit">Entrar</button>'+
      '<p class="auth-error" id="gfaa-err"></p>'+
      '<p class="auth-foot">Si no recuerdas la contraseña, pídela a la directiva del grupo.</p>'+
    '</form>';
  document.body.appendChild(ov);

  var form = document.getElementById("gfaa-form");
  var err  = document.getElementById("gfaa-err");
  document.getElementById("gfaa-pass").focus();

  form.addEventListener("submit", function(ev){
    ev.preventDefault();
    var pass   = document.getElementById("gfaa-pass").value;
    var nombre = document.getElementById("gfaa-nombre").value.trim();
    if(gfaaHash(pass) === GFAA_CONFIG.hash){
      try{ sessionStorage.setItem("gfaa_auth","1"); }catch(e){}
      try{ if(nombre) localStorage.setItem("gfaa_nombre", nombre); }catch(e){}
      gfaaUnlock();
    }else{
      err.textContent = "Contraseña incorrecta. Inténtalo de nuevo.";
      document.getElementById("gfaa-pass").value = "";
      document.getElementById("gfaa-pass").focus();
    }
  });
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", function(){
  if(gfaaIsAuth()){ gfaaUnlock(); }
  else{ gfaaMostrarLogin(); }
});
