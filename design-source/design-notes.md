# Analyse design kalanis.fr — référence pour reconstruction

Palette utilisateur : BLEU NUIT + CYAN (remplace le crème/teal Kalanis).
Proposition : fond clair #F3F7FA (blanc bleuté, texture grain subtile), texte/bleu nuit #0A1B2E, sections alternées gris-bleu clair #DCE4EA, accent cyan #17A8CC→#1FC4E8 (gradients boutons), cartes sombres bleu nuit #0C1B2E, étoiles orange #F5A83C (confiance), vert ✅ pour listes.

## Typo
- Titres : Baloo 2 (700/800), gros, arrondi, chunky. H1 ~72px, H2 ~44-52px.
- Corps/nav : Quicksand (500/600/700), 18-20px.
- Mots-clés des H2 en cyan au milieu du titre navy (1-2 mots).

## Structure (ordre exact)
1. NAV pill flottante sticky (top 24px, centrée, max-w 1360, radius full, fond crème translucide + blur, ombre douce). Logo gauche (logo texte minuscule + point), liens: Mes offres / Témoignages / FAQ, CTA droite: pill gradient cyan "Je réserve mon appel ◉" texte blanc bold.
2. HERO centré (fond clair): eyebrow "La Méthode X™" (18px) → rangée preuve sociale: 5 avatars ronds chevauchés (44px, bord blanc) + à droite "+140 projets réalisés" (bold navy) et "5/5 ★★★★★" (étoiles orange) → H1 2 lignes, 2e ligne: mot-clé dans une boîte arrondie (border 2px navy, radius 24px, padding) → sous-titre 20px → 2 CTA pills: primaire navy foncé texte blanc "Réserve ton appel", secondaire outline navy "Découvre la Méthode X™".
3. VIDÉO: grande carte 16:9 arrondie 24px, cadre sombre, posée sur un halo dégradé bleu clair radial qui déborde sur toute la largeur (fond passe crème→bleu clair sur les bords). User: EMPLACEMENT VIDE (placeholder à remplir).
4. DOULEUR (fond clair): H2 centré navy avec mots cyan + "?" → 2 lignes de texte 24px centré.
5. STATS: H2 cyan centré → 3 cartes: gauche/droite inclinées (rotate ±7°, fond clair, border navy 2px, ombre), centre droite cyan pleine; gros chiffres animés (compteur) 56px, label dessous. (compteurs: animation count-up au scroll)
6. TÉMOIGNAGES (fond gris-bleu, transition): H2 "mot cyan + reste navy." + sous-titre → grille 3 col × 2 rangées, cartes claires radius 16, ombre douce: photo ronde 64px (ring couleur), nom cyan bold + 5 étoiles orange, texte navy 17px. Logo LinkedIn géant incliné flottant à droite entre les sections (décoratif) → SUPPRIMER/adapter selon l'activité du user.
7. BÉNÉFICES: H2 centré → 3 icônes lignes animées (~120px) + pills navy dessous "+ de visibilité / + de ventes / + incontournable" → rangée marquee de 2+ bannières exemples (images arrondies 12px, avatar rond chevauchant).
8. MÉTHODE 3 PILIERS (fond clair): H2 "A → B → C" + sous-titre → 3 cartes claires radius 24 ombre: image haut (fond dégradé bleu, radius 16), titre navy 24px bold, liste à puces • 17px → CTA pill cyan centré dessous.
9. À PROPOS (fond gris-bleu): 2 col. Gauche: photo portrait radius 32 (~560px) + badge pill flottant haut-gauche "+7300 abonnés [in]" (blanc, chiffre cyan) + badge bas-droite "Anciennement / Top 3 Favikon." Droite: H2 avec mots cyan, paragraphes 18px, lignes "→ ...", "Donc si tu cherches à avoir :", liste "✓ ..." , phrase de clôture, CTA pill cyan.
10. PORTFOLIO (gris-bleu): H2 centré → 3 rangées marquee défilement auto (pause hover) d'images bannières LinkedIn (h ~140px, radius 8, certaines avec avatar rond), rangées décalées. → PLACEHOLDERS image-slot pour le user.
11. OFFRE (transition gris-bleu→clair, gros logo in incliné décor gauche): H2 centré 2 lignes → GRANDE CARTE BLEU NUIT radius 24, 2 col: gauche "La méthode / **X™**" (48px blanc), desc, ligne ❌ (croix rouge) texte blanc, "à :", 4 lignes ✅ (carré vert check), CTA pill crème texte navy "Je prends mon RDV →"; droite: "Ce que tu obtiens :" bold blanc + liste ✔ cyan (10 items) puis items 🎁 cadeaux (icône cadeau cyan).
12. FAQ (fond clair): H2 centré → 2 col: gauche H3 "Voici mes réponses ⤵️" + accordéon (cartes claires radius 12, question navy bold 20px, ouverte = question cyan + ✕, fermée = +, réponse 17px); droite H3 "Réserve ton appel de 30min" + carte sombre embed cal.com (placeholder widget calendrier).
13. FOOTER: carte bleu nuit→teal gradient (radius 24, marges latérales+basse), watermark logo géant en fond (opacité ~6%), logo blanc haut-gauche, 4 icônes sociales rondes outline blanches haut-droite (YouTube, LinkedIn, tel, mail), CTA pill cyan gauche, liens centre (Mes offres/Témoignages/FAQ), droite "Politique de confidentialité" "CGV / CGU" soulignés.

## Détails transverses
- Fond: texture papier/grain très subtile sur les fonds clairs.
- Transitions douces entre fonds clair et gris-bleu (dégradés verticaux).
- Boutons pill, Baloo 2 bold; hover: léger scale/assombrissement.
- Nav CTA + boutons cyan: gradient vertical (haut plus clair) + ombre.
- Ancres: #Mes-offres (pilliers/offre), #temoignages, #FAQ.
- Desktop d'abord (max-w contenu ~1360px, sections py ~96-120px).

## Assets user
- Portrait: uploads/assets-1787678792475-otm0.png (photo homme, chemise blanche, gratte-ciels) → section À propos.
- Vidéo hero: emplacement vide.
- Avatars témoignages/hero, bannières portfolio: placeholders image-slot (id distincts).
- Logo: aucun fourni → wordmark texte minuscule + point cyan, à remplacer.

## À recevoir
- Copy complet (marque, offres, textes, FAQ, stats, témoignages).
