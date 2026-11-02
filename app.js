
(function () {
  function showRuntimeError(message) {
    var box = document.getElementById('runtime-error');
    if (!box) {
      box = document.createElement('div');
      box.id = 'runtime-error';
      box.style.cssText = 'position:fixed;top:8px;left:8px;right:8px;z-index:99999;background:#7f1d1d;color:#fff;padding:10px 12px;border-radius:10px;font:13px/1.4 system-ui,sans-serif;box-shadow:0 4px 18px #0008';
      document.body.appendChild(box);
    }
    box.textContent = 'No se pudo cargar una parte de la página: ' + String(message || 'error desconocido');
  }
  window.addEventListener('error', function (event) {
    if (event && event.message) showRuntimeError(event.message);
  });
  window.addEventListener('unhandledrejection', function (event) {
    showRuntimeError(event && event.reason ? (event.reason.message || event.reason) : 'error asíncrono');
  });
})();

var WA = '5492645182955';
function fmt(n){ return '$' + Math.round(n).toLocaleString('es-AR'); }
function norm(s){
  var out = '', t = String(s).normalize('NFD');
  for (var i = 0; i !== t.length; i++) { var c = t.charCodeAt(i); if (c > 879 || 768 > c) out += t.charAt(i); }
  return out.toLowerCase();
}

/* ---------- LOGOS ONLINE (Simple Icons, favicon vía Google, insignia) ---------- */
var BRANDS = {
  'Netflix':     {k:'netflix',   slug:'netflix',       domain:'netflix.com',       c:'E50914', i:'N',  al:''},
  'Disney+':     {k:'disney',    slug:'disneyplus',    domain:'disneyplus.com',    c:'4F7CFF', i:'D+', al:'disney plus'},
  'Prime Video': {k:'prime',     slug:'primevideo',    domain:'primevideo.com',    c:'00A8E1', i:'P',  al:'amazon'},
  'Paramount+':  {k:'paramount', slug:'paramountplus', domain:'paramountplus.com', c:'2F7BFF', i:'P+', al:'paramount plus'},
  'HBO Max':     {k:'hbo',       slug:'hbomax',        domain:'max.com',           c:'A855F7', i:'H',  al:'max'},
  'Universal+':  {k:'universal', slug:null,            domain:'universalplus.com', c:'F5C518', i:'U+', al:'universal plus'}
};
function sources(n){
  var b = BRANDS[n], s = [];
  if (b.slug) s.push('https://cdn.simpleicons.org/' + b.slug + '/' + b.c);
  s.push('https://www.google.com/s2/favicons?domain=' + b.domain + '&sz=128');
  return s;
}
function fallback(n){ return '<span class="fbm" style="--c:#' + BRANDS[n].c + '">' + BRANDS[n].i + '</span>'; }
function img(n){ return '<img class="ic" src="' + sources(n)[0] + '" alt="" loading="lazy" referrerpolicy="no-referrer" data-n="' + n + '" data-s="0">'; }
function logo(n, size){
  size = size || 'm';
  return '<span class="chip ' + size + '" style="--c:#' + BRANDS[n].c + '" title="' + n + '">' + img(n) + '<span>' + n + '</span></span>';
}
function ico(n){ return '<span class="ico" title="' + n + '" style="border-color:#' + BRANDS[n].c + '55">' + img(n) + '</span>'; }
document.addEventListener('error', function(e){
  var t = e.target; if (!t || t.tagName !== 'IMG' || !t.dataset.n) return;
  var next = sources(t.dataset.n)[+t.dataset.s + 1];
  if (next) { t.dataset.s = +t.dataset.s + 1; t.src = next; } else t.outerHTML = fallback(t.dataset.n);
}, true);

/* ---------- INFO DE PLATAFORMAS (editable) · Destacados al 2/11/2026 ---------- */
var INFO = {
  'Netflix': {one:'Series, películas y documentales originales con estrenos cada semana.',
    more:'Incluye series y películas originales, documentales, contenido infantil y juegos. Podés verlo en celular, tele, tablet y compu, con perfiles para cada persona.',
    hot:{t:'Palomas negras – Temporada 2', d:'Vuelve el thriller de espías con Keira Knightley. Estreno el 5 de noviembre.'}},
  'Disney+': {one:'Disney, Pixar, Marvel, Star Wars y National Geographic en un solo lugar.',
    more:'Todo el universo Disney para toda la familia: clásicos animados, estrenos Pixar, películas y series de Marvel y Star Wars, y documentales de National Geographic.',
    hot:{t:'VisionQuest (Marvel)', d:'La serie de Visión se acerca a su final: episodio final el 10 de noviembre. Además llega La emperatriz divorciada el 4 de noviembre.'}},
  'Prime Video': {one:'Series y películas originales de Amazon, más cine de estreno y clásicos.',
    more:'Producciones originales de Prime, películas, series y títulos para alquilar o ver incluidos. Ideal para mirar en cualquier dispositivo.',
    hot:{t:'Los anillos de poder – Temporada 3', d:'Vuelve la serie más ambiciosa de la plataforma durante noviembre.'}},
  'Paramount+': {one:'Series, cine de Paramount, Nickelodeon y deportes en vivo.',
    more:'Series originales, películas de estudio, contenido infantil de Nickelodeon y transmisiones deportivas en vivo como fútbol, tenis y combate.',
    hot:{t:'Yellowjackets – Temporada 4 (final)', d:'Regresa el 20 de noviembre con su última temporada. El 21 se juega la final de la Sudamericana.'}},
  'HBO Max': {one:'Series premium de HBO, cine de Warner y DC y contenido original.',
    more:'Las series más premiadas de HBO, películas de Warner Bros. y DC, documentales y estrenos originales de la plataforma.',
    hot:{t:'La edad dorada – Temporada 4', d:'Llega la nueva temporada del drama de época, uno de los grandes estrenos de noviembre.'}},
  'Universal+': {one:'Series policiales, dramas médicos y lo mejor de Universal y NBC.',
    more:'Series policiales y médicas, comedias y documentales, con estrenos exclusivos y programas de NBC como Saturday Night Live.',
    hot:{t:'One Chicago – Nuevas temporadas', d:'Desde el 2 de noviembre se estrenan nuevas temporadas de la franquicia. También llega la temporada 52 de SNL.'}}
};

/* ---------- DATOS ---------- */
var P = {'Netflix':8500,'Disney+':7500,'Prime Video':5000,'Paramount+':5000,'HBO Max':5000,'Universal+':5000};
var combos = [
  {id:'d1', name:'Dúo Cine & Series', items:['Prime Video','HBO Max'], reg:10000, price:7500},
  {id:'d2', name:'Dúo Premium', items:['Netflix','Disney+'], reg:16000, price:12800},
  {id:'d3', name:'Dúo Maratón', items:['Netflix','HBO Max'], reg:13500, price:10800},
  {id:'d4', name:'Dúo Familiar', items:['Disney+','Paramount+'], reg:12500, price:10000},
  {id:'t1', name:'Trío Maratón', items:['Prime Video','Paramount+','HBO Max'], reg:15000, price:10500},
  {id:'t2', name:'Trío Estrenos', items:['Netflix','Prime Video','HBO Max'], reg:18500, price:13000},
  {id:'t3', name:'Trío Familiar', items:['Netflix','Disney+','Paramount+'], reg:21000, price:14700},
  {id:'c1', name:'Cuarteto Top', items:['Netflix','Disney+','Prime Video','HBO Max'], reg:26000, price:18200},
  {id:'c2', name:'Cuarteto Económico', items:['Prime Video','Paramount+','HBO Max','Universal+'], reg:20000, price:14000},
  {id:'c3', name:'Cuarteto Series', items:['Netflix','Prime Video','Paramount+','HBO Max'], reg:23500, price:16500},
  {id:'q1', name:'Quinteto Sin Netflix', items:['Disney+','Prime Video','Paramount+','HBO Max','Universal+'], reg:27500, price:19250},
  {id:'q2', name:'Quinteto Sin Disney+', items:['Netflix','Prime Video','Paramount+','HBO Max','Universal+'], reg:28500, price:19950},
  {id:'q3', name:'Quinteto Sin Universal+', items:['Netflix','Disney+','Prime Video','Paramount+','HBO Max'], reg:31000, price:21700},
  {id:'pase', name:'Pase Total Streaming (6 plataformas)', items:['Netflix','Disney+','Prime Video','Paramount+','HBO Max','Universal+'], reg:36000, price:25200, star:true}
];
var singles = Object.keys(P).map(function(n){ return {id:BRANDS[n].k, name:n, price:P[n]}; });

var selC = new Set(), selS = new Set(), expanded = new Set(), filterSize = 'all', query = '';
function pctFor(n){ return n === 0 ? 0 : n === 1 ? 0.10 : n === 2 ? 0.20 : 0.30; }

function calc(){
  var cs = combos.filter(function(c){ return selC.has(c.id); });
  var ss = singles.filter(function(s){ return selS.has(s.id); });
  var pct = pctFor(ss.length);
  var comboReg = cs.reduce(function(a,c){ return a + c.reg; }, 0);
  var comboNow = cs.reduce(function(a,c){ return a + c.price; }, 0);
  var sReg = ss.reduce(function(a,s){ return a + s.price; }, 0);
  var sNow = sReg * (1 - pct);
  var regular = comboReg + sReg, sub = comboNow + sNow;
  var extra = cs.length > 1 ? Math.round(sub * 0.05) : 0;
  var total = sub - extra;
  return {cs:cs, ss:ss, pct:pct, sReg:sReg, sNow:sNow, regular:regular, sub:sub, extra:extra, total:total, saved:regular - total};
}
function $(id){ return document.getElementById(id); }

/* ---------- ARMÁ TU COMBO ---------- */
function renderBuilder(){
  var r = calc(), q = norm(query.trim());
  var list = singles.filter(function(s){ return !q || norm(s.name).indexOf(q) !== -1 || norm(BRANDS[s.name].al).indexOf(q) !== -1; });
  $('bld-chips').innerHTML = list.length ? list.map(function(s){
    var on = selS.has(s.id);
    return '<button data-b="' + s.id + '" aria-pressed="' + on + '" class="bchip ' + (on ? 'on' : '') + '">' + img(s.name) +
      '<span class="flex-1 min-w-0"><span class="block text-sm font-semibold truncate">' + s.name + '</span><span class="block text-xs text-[var(--mut)]">' + fmt(s.price) + '</span></span>' +
      '<span class="' + (on ? 'neon-c' : 'text-[var(--mut)]') + ' text-lg">' + (on ? '✓' : '+') + '</span></button>';
  }).join('') : '<p class="col-span-full text-sm text-[var(--mut)]">No encontramos esa plataforma. Probá con otro nombre.</p>';

  var el = $('bld-res');
  if (!r.ss.length) { el.innerHTML = '<p class="text-sm text-[var(--mut)] text-center">Elegí al menos una plataforma para ver tu precio.</p>'; return; }
  var sel = r.ss.map(function(s){ return s.name; });
  var m = combos.filter(function(c){ return c.items.length === sel.length && sel.every(function(x){ return c.items.indexOf(x) !== -1; }); })[0];
  var better = m && r.sNow > m.price;
  el.innerHTML =
    '<div class="rounded-xl p-4" style="background:#0b1020;border:1px solid var(--line)">' +
      '<div class="flex flex-wrap gap-1.5 mb-3">' + r.ss.map(function(s){ return logo(s.name,'s'); }).join('') + '</div>' +
      '<div class="space-y-1.5 text-sm">' +
        '<div class="flex justify-between text-[var(--mut)]"><span>Total sin descuento</span><span class="line-through">' + fmt(r.sReg) + '</span></div>' +
        '<div class="flex justify-between text-emerald-400 font-semibold"><span>Descuento ' + Math.round(r.pct*100) + '% OFF</span><span>-' + fmt(r.sReg - r.sNow) + '</span></div>' +
        '<div class="flex justify-between items-end pt-2 border-t border-[var(--line)]"><span class="font-semibold">Total con descuento</span><span class="disp text-3xl font-bold neon-c">' + fmt(r.sNow) + '</span></div>' +
      '</div>' +
      (better ? '<div class="mt-3 rounded-lg p-3 text-sm pill">Hay un combo para esto: <b>' + m.name + '</b> por ' + fmt(m.price) + '. <button data-swap="' + m.id + '" class="btn rounded-lg px-3 mt-2 text-xs block" style="min-height:38px">Usar este combo</button></div>' : '') +
      '<button data-sendwa="1" class="btn w-full rounded-xl mt-4 text-sm">Pedir esto por WhatsApp</button>' +
      '<button data-clear="1" class="w-full mt-2 text-xs text-[var(--mut)] min-h-[40px]">Limpiar selección</button>' +
    '</div>';
}
$('q').addEventListener('input', function(e){ query = e.target.value; try { renderBuilder(); } catch (err) { showErr(err); } });

function showErr(err){
  var b = $('errbox');
  if (!b) { b = document.createElement('div'); b.id = 'errbox'; b.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99;background:#7f1d1d;color:#fff;font:12px monospace;padding:6px 10px'; document.body.appendChild(b); }
  b.textContent = 'Error: ' + (err && err.message ? err.message : err);
}

function renderCombos(){
  $('filters').innerHTML = ['all',2,3,4,5,6].map(function(s){
    return '<button data-f="' + s + '" class="fil card rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap ' + (filterSize == s ? 'on' : 'text-[var(--mut)]') + '">' + (s === 'all' ? 'Todos' : s + ' servicios') + '</button>';
  }).join('');
  $('combos-grid').innerHTML = combos.filter(function(c){ return filterSize === 'all' || c.items.length == filterSize; }).map(function(c){
    var on = selC.has(c.id), off = Math.round((c.reg - c.price) / c.reg * 100);
    return '<article class="card rounded-2xl p-4 flex flex-col ' + (on ? 'sel' : '') + ' ' + (c.star ? 'sm:col-span-2' : '') + '">' +
      '<div class="flex items-start justify-between gap-2"><div><h3 class="text-lg font-bold leading-snug">' + c.name + '</h3><p class="text-xs text-[var(--mut)] mt-0.5">' + c.items.length + ' servicios · ' + off + '% OFF</p></div>' +
      '<span class="pill shrink-0 rounded-full text-xs font-semibold px-2.5 py-1">Ahorrás ' + fmt(c.reg - c.price) + '</span></div>' +
      '<div class="flex flex-wrap gap-2 mt-3">' + c.items.map(function(i){ return logo(i,'m'); }).join('') + '</div>' +
      '<div class="mt-4 flex items-end gap-3"><span class="disp text-3xl font-bold neon-c">' + fmt(c.price) + '</span><span class="text-sm text-[var(--mut)] line-through pb-1">' + fmt(c.reg) + '</span></div>' +
      '<button data-c="' + c.id + '" class="' + (on ? 'btn-off' : 'btn') + ' mt-4 rounded-xl text-sm font-semibold">' + (on ? 'Quitar del pedido' : 'Agregar al pedido') + '</button></article>';
  }).join('');
}

function renderSingles(){
  var r = calc();
  var keep = Array.prototype.map.call(document.querySelectorAll('.mini-row'), function(e){ return e.scrollLeft; });
  var tier = r.ss.length ? Math.round(r.pct * 100) : 10;
  $('singles-grid').innerHTML = singles.map(function(s){
    var on = selS.has(s.id), op = expanded.has(s.id), i = INFO[s.name];
    var cb = combos.filter(function(c){ return c.items.indexOf(s.name) !== -1; });
    return '<article id="svc-' + s.id + '" class="svc card rounded-2xl p-4 ' + (on ? 'sel' : '') + '">' +
      '<div class="flex items-center justify-between gap-2">' + logo(s.name,'l') + '<span class="pill rounded-full text-xs px-2.5 py-1 font-semibold">' + tier + '% OFF</span></div>' +
      '<p class="mt-3 text-[15px] leading-snug">' + i.one + '</p>' +
      '<button data-more="' + s.id + '" aria-expanded="' + op + '" class="mt-1 flex items-center gap-1.5 text-sm neon-c min-h-[44px]"><svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>Más info y lo destacado ahora</button>' +
      '<div id="more-' + s.id + '" class="' + (op ? '' : 'hidden') + ' mb-3 rounded-xl border border-[var(--line)] bg-[#0b1020] p-3 text-sm"><p class="text-[var(--mut)]">' + i.more + '</p>' +
        '<div class="mt-3 rounded-lg p-3" style="border:1px solid var(--pink);box-shadow:0 0 14px rgba(255,79,216,.3)"><p class="text-xs font-semibold" style="color:var(--pink);text-shadow:0 0 10px rgba(255,79,216,.7)">🔥 Lo más destacado ahora</p><p class="font-semibold mt-1">' + i.hot.t + '</p><p class="text-[var(--mut)] mt-0.5">' + i.hot.d + '</p></div></div>' +
      '<div class="flex items-end gap-3"><span class="disp text-2xl font-bold">' + fmt(s.price * (1 - (r.ss.length ? r.pct : 0.10))) + '</span><span class="text-sm text-[var(--mut)] line-through pb-0.5">' + fmt(s.price) + '</span></div>' +
      '<button data-s="' + s.id + '" class="' + (on ? 'btn-off' : 'btn') + ' mt-3 w-full rounded-xl text-sm font-semibold">' + (on ? 'Quitar del pedido' : 'Agregar ' + s.name) + '</button>' +
      '<p class="mt-4 mb-1 text-sm font-semibold">Combos con <span class="neon-v">' + s.name + '</span> <span class="text-[var(--mut)] font-normal">· deslizá y tocá para sumar</span></p>' +
      '<div class="mini-row">' + cb.map(function(c){
        var o = selC.has(c.id);
        return '<button data-c="' + c.id + '" class="mini card rounded-xl p-3 ' + (o ? 'sel' : '') + '"><span class="block text-sm font-semibold leading-tight">' + c.name + '</span>' +
          '<span class="flex flex-wrap gap-1 mt-2">' + c.items.map(ico).join('') + '</span>' +
          '<span class="flex items-end justify-between mt-2"><span class="disp font-bold neon-c">' + fmt(c.price) + '</span><span class="text-xs ' + (o ? 'neon-c' : 'text-[var(--mut)]') + '">' + (o ? '✓ Sumado' : '+ Sumar') + '</span></span></button>';
      }).join('') + '</div></article>';
  }).join('');
  Array.prototype.forEach.call(document.querySelectorAll('.mini-row'), function(e, i){ e.scrollLeft = keep[i] || 0; });
}

function renderSummary(){
  var r = calc(), lines = [];
  r.cs.forEach(function(c){ lines.push('<li class="flex justify-between gap-2 items-center"><span>' + c.name + '</span><span class="flex items-center gap-1 shrink-0">' + fmt(c.price) + '<button data-rc="' + c.id + '" class="w-9 h-9 text-[var(--mut)] hover:text-red-400" aria-label="Quitar ' + c.name + '">✕</button></span></li>'); });
  if (r.ss.length) lines.push('<li><div class="flex justify-between text-[var(--mut)]"><span>Cuentas (' + Math.round(r.pct*100) + '% OFF)</span><span>' + fmt(r.sNow) + '</span></div>' +
    r.ss.map(function(s){ return '<div class="flex justify-between items-center pl-3 mt-1">' + logo(s.name,'s') + '<button data-rs="' + s.id + '" class="w-9 h-9 text-[var(--mut)] hover:text-red-400" aria-label="Quitar ' + s.name + '">✕</button></div>'; }).join('') + '</li>');
  $('lines').innerHTML = lines.length ? lines.join('') : '<li class="text-[var(--mut)]">Todavía no elegiste nada. Sumá un combo o armá el tuyo arriba.</li>';
  $('t-reg').textContent = fmt(r.regular);
  $('t-save').textContent = fmt(r.saved);
  $('t-total').textContent = fmt(r.total);
  $('t-extra-row').classList.toggle('hidden', !r.extra);
  $('t-extra').textContent = '-' + fmt(r.extra);
  var n = r.cs.length + r.ss.length;
  $('bar-count').textContent = n ? n + (n === 1 ? ' producto' : ' productos') + ' · ahorrás ' + fmt(r.saved) : 'Sin productos';
  $('bar-total').textContent = fmt(r.total);
  $('wa').disabled = !n;
  var up = $('upsell');
  var showUp = !selC.has('pase') && n > 0 && (r.cs.length >= 2 || r.sub > 20000);
  up.classList.toggle('hidden', !showUp);
  if (showUp) up.innerHTML = '<p class="font-semibold">¡Llevate el Pase Total de 6 plataformas por solo $25.200 y ahorrá más de $10.000!</p><button id="go-pase" class="btn rounded-lg px-3 py-2 mt-2 text-xs">Cambiar al Pase Total</button>';
}

function render(){
  [renderCombos, renderSingles, renderSummary, renderBuilder].forEach(function(fn){ try { fn(); } catch (err) { showErr(err); } });
}
function toggle(set, id){ if (set.has(id)) set.delete(id); else set.add(id); render(); }
function showTab(name){
  Array.prototype.forEach.call(document.querySelectorAll('.tab'), function(b){ var on = b.dataset.tab === name; b.classList.toggle('on', on); b.classList.toggle('text-[var(--mut)]', !on); });
  $('p-combos').classList.toggle('hidden', name !== 'combos');
  $('p-singles').classList.toggle('hidden', name !== 'singles');
}
function sendWA(){
  var r = calc(); if (!r.cs.length && !r.ss.length) return;
  var items = [];
  r.cs.forEach(function(c){ items.push('- ' + c.name + ': ' + c.items.join(' + ')); });
  if (r.ss.length) items.push('- Cuentas individuales (' + Math.round(r.pct*100) + '% OFF): ' + r.ss.map(function(s){ return s.name; }).join(', '));
  var msg = '¡Hola Misakroos! Quiero aprovechar la promo de Cyber Monday:\n\n📦 Mi pedido:\n' + items.join('\n') + '\n';
  if (r.extra) msg += '🎁 Incluye 5% extra por multicombo\n';
  msg += '\n💰 Total a pagar: ' + fmt(r.total) + '\n🎉 Me ahorré: ' + fmt(r.saved) + '\n\n¿Cuáles son los medios de pago disponibles para activar ya mismo?';
  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
}

document.addEventListener('click', function(e){
  var t = e.target.closest ? e.target.closest('button') : null; if (!t) return;
  var d = t.dataset;
  if (d.c) toggle(selC, d.c);
  else if (d.s) toggle(selS, d.s);
  else if (d.b) toggle(selS, d.b);
  else if (d.f) { filterSize = d.f; render(); }
  else if (d.rc) { selC.delete(d.rc); render(); }
  else if (d.rs) { selS.delete(d.rs); render(); }
  else if (d.swap) { selS = new Set(); selC.add(d.swap); render(); }
  else if (d.clear) { selS = new Set(); render(); }
  else if (d.sendwa || t.id === 'wa') sendWA();
  else if (t.id === 'go-pase') { selC = new Set(['pase']); selS = new Set(); render(); }
  else if (d.tab) showTab(d.tab);
  else if (d.more) {
    if (expanded.has(d.more)) expanded.delete(d.more); else expanded.add(d.more);
    t.setAttribute('aria-expanded', expanded.has(d.more));
    $('more-' + d.more).classList.toggle('hidden', !expanded.has(d.more));
  }
  else if (d.go) {
    showTab('singles');
    setTimeout(function(){
      var el = $('svc-' + d.go); if (!el) return;
      el.scrollIntoView({behavior:'smooth', block:'start'});
      el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');
    }, 60);
  }
});

try {
  $('logo-strip').innerHTML = Object.keys(BRANDS).map(function(n){ return '<button class="logo-go" data-go="' + BRANDS[n].k + '" aria-label="Ir a ' + n + '">' + logo(n,'l') + '</button>'; }).join('');
} catch (err) { showErr(err); }
render();
