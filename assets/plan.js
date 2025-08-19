const grid = document.getElementById('cards');
const map = L.map('map').setView([46.8182, 8.2275], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);
let layers = [];
function clearMap() {
  layers.forEach(l => map.removeLayer(l));
  layers = [];
}

function bars(times) {
  const max = Math.max(times.car, times.pt, times.shuttle) || 1;
  const H = 64;
  const s = v => Math.max(8, Math.round(v / max * H));
  return { car: s(times.car), tp: s(times.pt), sh: s(times.shuttle) };
}

function card(r) {
  const h = bars(r.times);
  const gain = r.times.pt - r.times.shuttle;
  const rec = gain >= 30;
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="image"><img src="${r.image}" alt="${r.to}" loading="lazy" width="640" height="360"></div>
    <div class="badge ${rec ? '' : 'warn'}">${rec ? ('+' + gain + ' min gagnées') : 'Gain limité'}</div>
    <div class="content">
      <h3 class="route">${r.from} → ${r.to}</h3>
      <div class="details">🚗 ${r.times.car} min · 🚌 TP ${r.times.pt} min · 🟢 Navette ${r.times.shuttle} min</div>
      <div class="mini">
        <div class="bar car" style="height:${h.car}px">V</div>
        <div class="bar tp"  style="height:${h.tp}px">TP</div>
        <div class="bar sh"  style="height:${h.sh}px">Nav</div>
      </div>
      <div class="cta">
        <a class="btn primary" href="#map" data-map>Voir sur la carte</a>
      </div>
    </div>`;
  el.querySelector('[data-map]').addEventListener('click', () => {
    clearMap();
    const a = [r.from_coords.lat, r.from_coords.lon];
    const b = [r.to_coords.lat, r.to_coords.lon];
    const m1 = L.marker(a).addTo(map).bindPopup(r.from);
    const m2 = L.marker(b).addTo(map).bindPopup(r.to);
    const line = L.polyline([a, b], { color: '#1DB954' }).addTo(map);
    layers.push(m1, m2, line);
    map.fitBounds(L.latLngBounds([a, b]).pad(0.2));
  });
  return el;
}

fetch('data/routes.json')
  .then(r => r.json())
  .then(list => {
    list.forEach(r => grid.appendChild(card(r)));
  })
  .catch(e => {
    grid.innerHTML = '<div class="panel">Erreur de chargement des données : ' + e + '</div>';
  });
