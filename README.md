# PostBus Connect — MagicPass Express (static)

Bundle statique **prêt à déployer** (GitHub Pages / Netlify / Vercel static).

## Contenu
- `index.html` — page unique (Leaflet + cartes d’itinéraires + mini-graphiques + CTA)
- `assets/brand.css` — styles (branding CarPostal moderne)
- `data/routes.json` — données simulées (6 liaisons, temps voiture/TP/navette, coordonnées)
- `images/` — photos locales optimisées
- `icons/` — favicon (PNG + ICO)
- `.nojekyll` — requis pour GitHub Pages

## Déploiement GitHub Pages
1. Crée un repo (ex. `postbusconnect`) sur ton compte GitHub.
2. Uploade **tout le contenu** de ce dossier à la **racine** du repo.
3. `Settings → Pages` → *Deploy from a branch* → `main` / `/ (root)` → Save.
4. Ouvre l’URL générée.

## Test local (sans dépendance)
```bash
python3 -m http.server 4000
# http://localhost:4000
```

— Powered by MobilityLab · Opéré par CarPostal (démo)
