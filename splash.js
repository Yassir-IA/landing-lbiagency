/* Splash d'ouverture : joué à chaque chargement, comme dans la maquette Claude Design.
   Option : mettre SPLASH_ONCE_PER_SESSION à true pour ne le jouer qu'une fois par session d'onglet
   (les visites suivantes affichent le contenu immédiatement). Chargé de façon synchrone dans <head>
   pour poser la classe html.no-splash avant le premier rendu. */
(function () {
  var SPLASH_ONCE_PER_SESSION = false;
  if (!SPLASH_ONCE_PER_SESSION) return;
  try {
    var key = 'yl-splash-seen';
    if (sessionStorage.getItem(key)) {
      document.documentElement.classList.add('no-splash');
    } else {
      sessionStorage.setItem(key, '1');
    }
  } catch (e) { /* stockage indisponible (navigation privée stricte) : le splash joue normalement */ }
})();
