// ===========================================================
// Spotlight effect: BREATH / BODY / MIND / SOUND se "iluminan"
// a medida que cruzan el centro del viewport al hacer scroll.
// ===========================================================
(function spotlightWords() {
  const words = document.querySelectorAll('[data-word]');
  if (!words.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    words.forEach((w) => w.classList.add('is-lit'));
    return;
  }

  let ticking = false;

  function updateWords() {
    const viewportCenter = window.innerHeight / 2;

    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      const wordCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - wordCenter);

      // Qué tan "encendida" está la palabra según su cercanía al centro.
      const lit = distance < window.innerHeight * 0.28;
      word.classList.toggle('is-lit', lit);
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateWords);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateWords();
})();

// ===========================================================
// Players: click en un rectángulo despliega su descripción
// ===========================================================
(function playerDetail() {
  const tiles = document.querySelectorAll('.player-tile');
  const detail = document.getElementById('playerDetail');
  if (!tiles.length || !detail) return;

  // Reemplaza estos textos e imágenes por los tuyos.
  const PLAYERS = {
    maradona: {
      eyebrow: '[ Argentina — Mundial 94 ]',
      name: 'Diego Maradona',
      description: 'Llegó a Estados Unidos 94 arrastrando años de consumo de cocaína desde su etapa en Nápoles. Jugó solo dos partidos: tras el encuentro ante Nigeria dio positivo por efedrina. La imagen de sus ojos desorbitados en el festejo de aquel gol quedó como el retrato de un ídolo que ya no podía sostener el peso de su propio mito. Fue expulsado del torneo en pleno vuelo, exponiendo ante el mundo una fragilidad hasta entonces oculta.',
      image1: 'images/player-maradona-detail-1.jpg',
      image2: 'images/player-maradona-detail-2.jpg',
    },
    romario: {
      eyebrow: '[ Brasil — Mundial 94 ]',
      name: 'Romário',
      description: 'Meses antes del Mundial, su padre Edevair fue secuestrado en Río de Janeiro y liberado tras varios días de angustia y el pago de un rescate. Romário llegó al torneo cargando ese miedo íntimo mientras se esperaba que fuera la gran figura de una Brasil sin título hace 24 años. Fue determinante, terminó campeón y entre los máximos goleadores, pero detrás de esa entereza pública quedaba una herida que nunca formó parte del relato de la consagración.',
      image1: 'images/player-romario-detail-1.jpg',
      image2: 'images/player-romario-detail-2.jpg',
    },
    baggio: {
      eyebrow: '[ Italia — Mundial 94 ]',
      name: 'Roberto Baggio',
      description: 'El hombre que murió de pie. Cargó a Italia hasta la final jugando con el cuerpo dolorido partido tras partido. El 94 quedó marcado por un instante: el penal errado ante Brasil que le costó el título a su selección. Su imagen inmóvil, con la mirada perdida en el punto penal mientras el estadio explotaba, se volvió metáfora de la derrota íntima. Fue el mejor jugador del torneo y, a la vez, quien mejor encarnó la tristeza de no poder sostener el peso que un país había puesto en él.',
      image1: 'images/player-baggio-detail-1.jpg',
      image2: 'images/player-baggio-detail-2.jpg',
    },
  };

  const fields = {
    eyebrow: detail.querySelector('[data-field="eyebrow"]'),
    name: detail.querySelector('[data-field="name"]'),
    description: detail.querySelector('[data-field="description"]'),
    image1: detail.querySelector('[data-field="image1"]'),
    image2: detail.querySelector('[data-field="image2"]'),
  };

  let currentPlayer = null;

  function openPlayer(id, tile) {
    const data = PLAYERS[id];
    if (!data) return;

    fields.eyebrow.textContent = data.eyebrow;
    fields.name.textContent = data.name;
    fields.description.textContent = data.description;
    fields.image1.src = data.image1;
    fields.image1.alt = data.name;
    fields.image2.src = data.image2;
    fields.image2.alt = data.name;

    detail.classList.add('is-open');

    tiles.forEach((t) => {
      t.classList.toggle('is-active', t === tile);
      t.setAttribute('aria-expanded', t === tile ? 'true' : 'false');
    });

    currentPlayer = id;

    // Deslizar hacia la descripción una vez que empieza a abrirse.
    requestAnimationFrame(() => {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function closePlayer() {
    detail.classList.remove('is-open');
    tiles.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-expanded', 'false');
    });
    currentPlayer = null;
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const id = tile.dataset.player;
      if (currentPlayer === id) {
        closePlayer();
      } else {
        openPlayer(id, tile);
      }
    });
  });
})();

// ===========================================================
// Parallax sutil en las tarjetas de la sección "app showcase"
// ===========================================================
(function cardParallax() {
  const cards = document.querySelectorAll('.app-card[data-speed]');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  function updateParallax() {
    const viewportCenter = window.innerHeight / 2;

    cards.forEach((card) => {
      const speed = parseFloat(card.dataset.speed) || 0.05;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const offset = (viewportCenter - cardCenter) * speed;
      card.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateParallax();
})();

// ===========================================================
// Contact form: feedback visual al enviar (sin backend).
// Reemplaza este bloque por tu integración real (Formspree,
// EmailJS, tu propio endpoint, etc.) cuando la tengas lista.
// ===========================================================
(function contactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const note = form.querySelector('[data-form-note]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = 'Gracias, tu mensaje quedó registrado. Te responderé pronto.';
    form.reset();
  });
})();
