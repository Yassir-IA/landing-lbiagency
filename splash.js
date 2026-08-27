/* Splash d'ouverture : joué une seule fois par session de navigation (onglet).
   Chargé de façon synchrone dans <head> pour poser la classe avant le premier rendu.
   Mettre SPLASH_ONCE_PER_SESSION à false pour rejouer le splash à chaque chargement (comportement de la maquette). */
(function () {
  var SPLASH_ONCE_PER_SESSION = true;
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
