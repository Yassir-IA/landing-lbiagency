/* Landing — Yassir Larabi
   Comportements : liens Calendly centralisés + accordéon FAQ (un seul item ouvert). */
(function () {
  'use strict';

  /* ---- Lien de réservation (source unique de vérité) ----
     Les <a data-calendly> ont déjà l'URL en dur dans le HTML (fonctionne sans JS) ;
     modifier ici suffit pour tout mettre à jour. */
  var CALENDLY_URL = 'https://calendly.com/lbiagency/diagnostic-ia';
  document.querySelectorAll('a[data-calendly]').forEach(function (a) {
    a.setAttribute('href', CALENDLY_URL);
  });

  /* ---- Entrées animées : une fois l'animation terminée, on la retire (classe .is-in, voir styles.css).
     État final identique ; libère les calques du compositeur et force un repaint (les éléments animés en
     opacité 0 → 1 ne sont sinon jamais « vus » par la mesure du LCP). Le h1 a son propre traitement en CSS. */
  document.querySelectorAll('.rise, .nav').forEach(function (el) {
    el.addEventListener('animationend', function onEnd(event) {
      if (event.target !== el) return;
      el.classList.add('is-in');
      el.removeEventListener('animationend', onEnd);
    });
  });

  /* ---- Vidéo hero : le lecteur Gumlet (≈ 0,5 Mo de code + flux HLS) n'est injecté qu'une fois la page chargée
     ET l'entrée animée de la carte terminée (elle est invisible avant). Le démarrage du lecteur sort ainsi de la
     fenêtre FCP/LCP et ne gêne pas un tap sur le CTA. Sans animation (reduced-motion) : dès le chargement.
     Garde-fou : 6 s. Sans JS : repli <noscript>. */
  var videoCard = document.querySelector('.hero__video');
  var videoFrames = document.querySelectorAll('.hero__video iframe[data-src]');
  var videoLoaded = false;
  function loadVideo() {
    if (videoLoaded) return;
    videoLoaded = true;
    videoFrames.forEach(function (f) { f.setAttribute('src', f.getAttribute('data-src')); });
  }
  function whenLoaded(fn) { if (document.readyState === 'complete') fn(); else window.addEventListener('load', fn); }
  if (videoCard && getComputedStyle(videoCard).animationName !== 'none') {
    videoCard.addEventListener('animationend', function onVideoIn(event) {
      if (event.target !== videoCard) return;
      videoCard.removeEventListener('animationend', onVideoIn);
      whenLoaded(loadVideo);
    });
    setTimeout(loadVideo, 6000);
  } else {
    whenLoaded(loadVideo);
  }

  /* ---- Calendly : le widget inline pèse ≈ 3 Mo. Sur ordinateur / tablette (≥ 641px) il est injecté
     (chargement paresseux) ; sur téléphone on garde le bouton vers la page Calendly (bien plus rapide,
     et pas de défilement imbriqué). Sans JS : le bouton reste affiché partout. */
  var booking = document.querySelector('.booking');
  var bookingFrame = document.querySelector('.booking__embed iframe[data-src]');
  if (booking && bookingFrame && window.matchMedia('(min-width: 641px)').matches) {
    bookingFrame.setAttribute('src', bookingFrame.getAttribute('data-src'));
    booking.classList.add('has-embed');
  }

  /* ---- FAQ : accordéon ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));

  function setOpen(index) {
    items.forEach(function (item, i) {
      var open = i === index;
      item.classList.toggle('is-open', open);
      var btn = item.querySelector('.faq__q');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  items.forEach(function (item, i) {
    // Toute la carte est cliquable (comme dans la maquette) ; le <button> assure
    // le clavier et l'accessibilité. Son clic remonte jusqu'ici : un seul toggle.
    var downX = 0, downY = 0;
    item.addEventListener('pointerdown', function (event) { downX = event.clientX; downY = event.clientY; });
    item.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;
      // Ignorer uniquement le clic qui termine une sélection de texte à la souris (le pointeur a bougé) ;
      // event.detail === 0 = activation clavier (Entrée/Espace), jamais ignorée.
      if (event.detail > 0 && (Math.abs(event.clientX - downX) > 6 || Math.abs(event.clientY - downY) > 6)) return;
      setOpen(item.classList.contains('is-open') ? -1 : i);
    });
  });
})();
