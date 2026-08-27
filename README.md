# Landing — Yassir Larabi · LBI Agency

Site statique (HTML / CSS / JS vanilla, **zéro build**) implémentant la maquette Claude Design
`design-source/Landing Yassir Larabi.dc.html`. Prêt pour GitHub + Vercel.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page (11 sections : hero, preuves flash, problème, méthode, ce que je construis, preuves, process, offre, qui je suis, FAQ, CTA final + footer) |
| `styles.css` | Styles (palette en variables CSS, `@font-face`, responsive, `prefers-reduced-motion`) |
| `main.js` | Accordéon FAQ, lien Calendly centralisé, injection différée de la vidéo, fin d'animations |
| `splash.js` | Option « splash une seule fois par session » (désactivée : le splash joue à chaque visite, comme la maquette) |
| `assets/fonts/` | Baloo 2 + Quicksand auto-hébergées (fontes variables woff2, licence OFL jointe) |
| `assets/portrait.webp` / `.jpg` | Portrait optimisé (1100 px) |
| `assets/og.jpg` | Image d'aperçu 1200×630 pour LinkedIn / WhatsApp (à activer, voir ci-dessous) |
| `assets/icons/`, `favicon.ico` | Favicon, icône 192 px, apple-touch-icon |
| `vercel.json` | En-têtes de sécurité (CSP, nosniff, Referrer-Policy…) et cache des assets |
| `.vercelignore` | Exclut du déploiement `design-source/` et ce README (gardés dans Git) |
| `robots.txt` | Autorise l'indexation |
| `design-source/` | Maquette d'origine — référence, non déployée |

## Mettre en ligne (GitHub → Vercel)

> ⚠️ Ce dossier est dans OneDrive. Git + OneDrive cohabitent mal (fichiers verrouillés, conflits de synchro sur `.git`).
> Recommandé : cloner/copier le projet **hors** de OneDrive avant `git init`, ou exclure le dossier de la synchro.

```bash
# 1. Dépôt Git (dans une copie hors OneDrive)
git init
git add .
git commit -m "Landing Yassir Larabi"

# 2. Dépôt GitHub (avec le CLI gh) puis push
gh repo create landing-yassir-larabi --private --source=. --push
```

3. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importer le dépôt GitHub.
   Framework Preset : **Other**, aucune commande de build, Output Directory vide (racine). Déployer.
4. Ajouter le domaine dans *Settings → Domains*. Vercel gère HTTPS + HSTS + redirection www/apex.

Chaque `git push` sur la branche principale redéploie automatiquement.

Après le premier déploiement, vérifier les en-têtes (Git Bash) :

```bash
curl -sI https://yassir.lbiagency.fr/assets/fonts/baloo2.woff2 | grep -i cache-control   # attendu : max-age=31536000, immutable
curl -sI https://yassir.lbiagency.fr/ | grep -i content-security-policy                 # attendu : la CSP de vercel.json
```

## Domaine

Site en ligne : **https://yassir.lbiagency.fr** (`canonical`, `og:url`, `og:image` et le JSON-LD pointent dessus ;
`landing-lbiagency.vercel.app` redirige vers lui via `vercel.json`). Si le domaine change : remplacer `yassir.lbiagency.fr`
dans `index.html` (4 occurrences) et dans la redirection de `vercel.json`.

## À personnaliser

- **Lien de réservation** : `CALENDLY_URL` dans `main.js` (les `<a data-calendly>` ont aussi l'URL en dur, pour fonctionner sans JS).
- **Vidéo hero** : attribut `data-src` de l'`<iframe>` Gumlet (section `#hero`, + repli `<noscript>`). Le lecteur (≈ 0,5 Mo)
  n'est chargé qu'après l'entrée animée de la carte, pour ne pas ralentir l'affichage du titre.
- **Calendly** : `data-src` de l'`<iframe>` de la section `#faq`. Widget inline sur tous les écrans, chargé seulement
  à l'approche de la section, hauteur ajustée automatiquement (message `calendly.page_height`). Sans JavaScript,
  un bouton vers la page Calendly s'affiche à la place.
- **Témoignage vidéo + études de cas** (`#preuves`) : placeholders `[CAS_1]` / `[CAS_2]`.
- **Mentions légales** : lien du footer (`href="#"` pour l'instant — à créer, obligatoire en France).
- **Durée de l'intro** : variable `--intro` dans `styles.css` (1.15s actuel ; 1.3s = maquette ; 0.6s = intro rapide).
  Splash une seule fois par session d'onglet (visites suivantes plus rapides) : `SPLASH_ONCE_PER_SESSION = true` dans `splash.js`.
- **Mouvement réduit** (Windows « Effets d'animation » désactivé, macOS « Réduire les animations ») : l'intro joue en fondus seuls,
  sans déplacement ni flou. Pour voir la version complète sur son propre PC : Paramètres Windows → Accessibilité → Effets visuels → Effets d'animation.
- **Remplacer une image** (`assets/`) : renommer le fichier (les assets sont mis en cache 30 jours, les polices 1 an).

## Sécurité / vie privée

- La CSP de `vercel.json` n'autorise que le site lui-même + les iframes `play.gumlet.io` et `calendly.com`.
  Tout nouveau script/iframe externe (analytics, chat…) doit y être ajouté, sinon il sera bloqué.
- Les polices sont servies depuis le site (plus d'appel à Google Fonts → RGPD).
- Les iframes Gumlet et Calendly posent leurs propres cookies : à mentionner dans les mentions légales / politique de confidentialité.
