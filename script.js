// ===========================================================
// Nav: se invierte (texto negro) cuando pasa sobre secciones claras
// ===========================================================
(function navTheme() {
  const nav = document.getElementById('nav');
  const lightSections = document.querySelectorAll('[data-light]');
  if (!nav || !lightSections.length) return;

  let ticking = false;

  function update() {
    const y = nav.offsetHeight / 2;
    let onLight = false;
    lightSections.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.top <= y && r.bottom >= y) onLight = true;
    });
    nav.classList.toggle('is-on-light', onLight);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

// ===========================================================
// Players: click en un rectángulo despliega su descripción
// ===========================================================
(function playerDetail() {
  const row = document.getElementById('playersRow');
  const tiles = document.querySelectorAll('.player-tile');
  const detail = document.getElementById('playerDetail');
  if (!row || !tiles.length || !detail) return;

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
    row.classList.add('has-active');

    tiles.forEach((t) => {
      t.classList.toggle('is-active', t === tile);
      t.setAttribute('aria-expanded', t === tile ? 'true' : 'false');
    });

    currentPlayer = id;

    requestAnimationFrame(() => {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function closePlayer() {
    detail.classList.remove('is-open');
    row.classList.remove('has-active');
    tiles.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-expanded', 'false');
    });
    currentPlayer = null;
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const id = tile.dataset.player;
      if (currentPlayer === id) closePlayer();
      else openPlayer(id, tile);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentPlayer) closePlayer();
  });
})();
