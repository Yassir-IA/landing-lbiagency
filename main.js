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

  /* ---- Splash : une fois le fondu terminé, on retire le calque du DOM. Un calque fixe plein écran, même
     invisible (visibility:hidden + pointer-events:none), peut encore intercepter les taps destinés à un
     iframe sur iOS Safari (vidéo hero « figée », impossible à toucher). Garde-fou : 5 s. */
  var splash = document.querySelector('.splash');
  if (splash) {
    var removeSplash = function () { if (splash.parentNode) splash.parentNode.removeChild(splash); };
    if (document.documentElement.classList.contains('no-splash') || getComputedStyle(splash).animationName === 'none') {
      removeSplash();
    } else {
      splash.addEventListener('animationend', function (event) { if (event.target === splash) removeSplash(); });
      setTimeout(removeSplash, 5000);
    }
  }

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

  /* ---- Calendly : widget inline sur tous les écrans, chargé paresseusement (à l'approche de la section).
     Avec embed_type/embed_domain, Calendly envoie sa hauteur au parent (postMessage « calendly.page_height ») :
     l'iframe est redimensionnée automatiquement → pas de défilement imbriqué sur mobile quand la liste des
     créneaux apparaît sous le calendrier. Sans JS : le bouton vers la page Calendly reste affiché. */
  var booking = document.querySelector('.booking');
  var bookingFrame = document.querySelector('.booking__embed iframe[data-src]');
  if (booking && bookingFrame) {
    var host = window.location.hostname || 'localhost';
    bookingFrame.setAttribute('src', bookingFrame.getAttribute('data-src') + '&embed_type=Inline&embed_domain=' + encodeURIComponent(host));
    booking.classList.add('has-embed');
    window.addEventListener('message', function (event) {
      if (event.origin !== 'https://calendly.com' || !event.data || event.data.event !== 'calendly.page_height') return;
      var h = parseInt(event.data.payload && event.data.payload.height, 10);
      if (h >= 300) bookingFrame.style.height = h + 'px';
    });
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
