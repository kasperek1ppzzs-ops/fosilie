/**
 * PREHISTORICKÁ VITRÍNA - APLIKAČNÁ LOGIKA (JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Stav aplikácie
  const state = {
    currentFossil: null
  };

  // DOM Prvky
  const fossilsGrid = document.getElementById('fossils-grid');

  // Modály
  const fossilDialog = document.getElementById('fossil-dialog');
  const closeDialogBtn = document.getElementById('close-dialog-btn');
  const modalContentContainer = document.getElementById('modal-content-container');

  // Celoobrazovkový Lightbox
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxWrapper = document.getElementById('lightbox-wrapper');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxCaptionName = document.getElementById('lightbox-caption-name');
  const lightboxCaptionSub = document.getElementById('lightbox-caption-sub');
  const lbViewFossil = document.getElementById('lb-view-fossil');
  const lbViewCreature = document.getElementById('lb-view-creature');
  const lbViewScale = document.getElementById('lb-view-scale');

  // Originálne fotografie ostávajú v data.js; pri dostupnej derivácii načítame menší WebP súbor.
  function optimizedImage(source) {
    return source ? source.replace(/\.jpg(?=(?:\?.*)?$)/i, '.webp') : source;
  }

  // Inicializácia
  renderFossils();
  setupEventListeners();
  checkUrlHash();

  /**
   * Vykreslenie všetkých kariet exponátov
   */
  function renderFossils() {
    fossilsGrid.innerHTML = '';
    FOSSILS_DATA.forEach(fossil => {
      const card = createFossilCard(fossil);
      fossilsGrid.appendChild(card);
    });
  }

  /**
   * Vytvorenie HTML karty pre jeden exponát
   */
  function createFossilCard(fossil) {
    const card = document.createElement('article');
    card.className = 'fossil-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Zobraziť detail exponátu ${fossil.commonName}`);

    const badgeColor = fossil.badgeColor || '#f59e0b';

    card.innerHTML = `
      <div class="card-media">
        <img src="${optimizedImage(fossil.fossilImage)}" alt="Skutočná fosília: ${fossil.fossilType}" loading="lazy" decoding="async">
        <div class="card-period-badge">
          <span class="dot" style="background-color: ${badgeColor}; box-shadow: 0 0 8px ${badgeColor}"></span>
          <span>${fossil.shortPeriod || fossil.period}</span>
        </div>
        <div class="card-type-tag">Skutočný exponát · ${fossil.age}</div>
      </div>
      <div class="card-body">
        <div class="card-titles">
          <h2 class="card-common-name">${fossil.commonName}</h2>
          <span class="card-sci-name">${fossil.name}</span>
        </div>
        <div class="card-footer-action">
          <span>Fosília · tvor · mierka</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    `;

    // Kliknutie alebo stlačenie Enter otvorí modál
    const openCard = () => openFossilModal(fossil);
    card.addEventListener('click', openCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCard();
      }
    });

    return card;
  }

  /**
   * Otvorenie modálneho okna s detailom fosílie
   */
  function openFossilModal(fossil) {
    state.currentFossil = fossil;

    // Každý exponát má vlastný QR/deep link; tlačidlo Späť zatvorí aktuálnu kartu.
    if (window.location.hash !== `#${fossil.id}`) history.pushState(null, '', `#${fossil.id}`);

    const badgeColor = fossil.badgeColor || '#f59e0b';

    modalContentContainer.innerHTML = `
      <div class="modal-header-hero" id="modal-header-hero" title="Kliknite na fotku pre zväčšenie na celú obrazovku">
        <div class="hero-ambient-backdrop" id="modal-hero-backdrop" style="background-image: url('${optimizedImage(fossil.fossilImage)}')"></div>
        <img id="modal-hero-img" src="${optimizedImage(fossil.fossilImage)}" alt="Skutočná fosília: ${fossil.fossilType}">
        
        <!-- Plávajúca horná lišta ovládania na fotke -->
        <div class="hero-floating-controls">
          <div class="modal-view-selector" role="group" aria-label="Prepínač obrázka">
            <button type="button" class="view-pill active" id="btn-view-fossil" aria-label="Zobraziť fosíliu vo vitrínke">
              Fosília
            </button>
            <button type="button" class="view-pill" id="btn-view-creature" aria-label="Zobraziť podobu tvora">
              Tvor
            </button>
            <button type="button" class="view-pill" id="btn-view-scale" aria-label="Zobraziť porovnanie mierky">
              Mierka
            </button>
          </div>

          <div class="hero-ctrl-actions">
            <button type="button" class="hero-ctrl-btn" id="btn-toggle-fit" title="Prepnúť režim zobrazenia: Celý záber / Výplň">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
              <span id="label-toggle-fit">Výplň</span>
            </button>

            <button type="button" class="hero-ctrl-btn" id="btn-open-lightbox" title="Zväčšiť na celú obrazovku">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              <span>Zväčšiť</span>
            </button>
          </div>
        </div>

        <div class="hero-zoom-hint">
          <span>🔍 Kliknite pre zväčšenie na celú obrazovku</span>
        </div>
      </div>

      <!-- Samostatná čistá hlavička s názvom exponátu pod fotkou (100% čistý pohľad na tvora bez textu cez telo!) -->
      <div class="modal-specimen-header">
        <div class="specimen-title-row">
          <div class="specimen-main-titles">
            <div class="specimen-period-badge">
              <span class="dot" style="background-color: ${badgeColor}; box-shadow: 0 0 8px ${badgeColor}"></span>
              <span>${fossil.period} • ${fossil.age}</span>
            </div>
            <h2 id="modal-common-name">${fossil.commonName}</h2>
            <p class="specimen-latin-name">${fossil.name}</p>
          </div>

          <div class="specimen-quick-badges">
            <div class="quick-badge" title="Lokalita nálezu">
              <span class="qb-icon">📍</span>
              <div class="qb-info">
                <small>Nálezisko</small>
                <strong>${fossil.location.split(',')[0]}</strong>
              </div>
            </div>
            <div class="quick-badge" title="Rozmery tvora">
              <span class="qb-icon">📏</span>
              <div class="qb-info">
                <small>Rozmery</small>
                <strong>${fossil.dimensions.split('|')[0].replace('Dĺžka tela:', '').trim()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-inner-padding">
        <!-- Vizuálne duo: Skutočná fosília na ktorú sa pozerá vs. tvor -->
        <div class="visual-gallery-duo">
          <div class="gallery-duo-item" id="duo-creature-card" role="button" tabindex="0" title="Zobraziť rekonštrukciu tvora">
            <div class="duo-img-wrap">
              <img src="${optimizedImage(fossil.creatureImage)}" alt="Rekonštrukcia pravekého tvora" loading="lazy" decoding="async">
              <span class="duo-badge creature-badge">🦕 Podoba a život tvora</span>
            </div>
            <div class="duo-caption">
              <strong>${fossil.commonName}</strong>
              <span>Životná rekonštrukcia v plnej veľkosti</span>
            </div>
          </div>

          <div class="gallery-duo-item active" id="duo-fossil-card" role="button" tabindex="0" title="Zobraziť fosíliu vo vitrínke">
            <div class="duo-img-wrap">
              <img src="${optimizedImage(fossil.fossilImage)}" alt="Skutočná fosília vo vitrínke" loading="lazy" decoding="async">
              <span class="duo-badge fossil-badge">🦴 Na toto sa pozeráte vo vitrínke</span>
            </div>
            <div class="duo-caption">
              <strong>${fossil.fossilType}</strong>
              <span>Originálny vystavený exemplár</span>
            </div>
          </div>
        </div>

        <!-- Zvýraznený box čo vidí hosť vo vitríne -->
        <div class="showcase-highlight-box">
          <h3>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Čo vidíte vo vitrínke: ${fossil.fossilType}
          </h3>
          <p>${fossil.fossilDescription}</p>
        </div>

        <!-- Paleontologická technická karta -->
        <div class="paleo-grid">
          <div class="paleo-stat-card">
            <span class="stat-label">Geologické obdobie</span>
            <span class="stat-value" style="color: ${badgeColor}">${fossil.period}</span>
          </div>
          <div class="paleo-stat-card">
            <span class="stat-label">Približný vek</span>
            <span class="stat-value">${fossil.age}</span>
          </div>
          <div class="paleo-stat-card">
            <span class="stat-label">Lokalita nálezu</span>
            <span class="stat-value">${fossil.location}</span>
          </div>
          <div class="paleo-stat-card">
            <span class="stat-label">Rozmery tvora</span>
            <span class="stat-value">${fossil.dimensions}</span>
          </div>
          <div class="paleo-stat-card">
            <span class="stat-label">Potrava / Zaradenie</span>
            <span class="stat-value">${fossil.diet}</span>
          </div>
          <div class="paleo-stat-card">
            <span class="stat-label">Hlavná zaujímavosť</span>
            <span class="stat-value" style="color: var(--accent-amber-light)">${fossil.highlight}</span>
          </div>
        </div>

        <!-- Príbeh tvora -->
        <div class="story-block">
          <h3>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Príbeh a spôsob života tvora
          </h3>
          <p>${fossil.story}</p>
        </div>

        <!-- Vizuálne porovnanie s človekom (1,8 m) -->
        ${fossil.sizeComparison ? `
        <div class="size-comparison-section">
          <div class="section-title-wrap">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 6H3M21 12H9M21 18H7"/>
              <path d="M7 6v12"/>
            </svg>
            <h3>Porovnanie s človekom (1,8 m)</h3>
          </div>

          <div class="comparison-visual-box">
            <!-- Fotorealistické porovnanie v plnej kráse -->
            <div class="real-scale-container" id="real-scale-view" role="button" tabindex="0" title="Kliknite pre otvorenie v plnom zobrazení na celú obrazovku">
              <div class="real-scale-stage">
                <img src="${optimizedImage(fossil.scaleImage || fossil.creatureImage)}" alt="Realistické porovnanie veľkosti - ${fossil.commonName}" class="real-scale-img" id="scale-comparison-img" loading="lazy" decoding="async">
                <div class="real-scale-badge-bar">
                  <span class="real-scale-badge creature">
                    <span>${fossil.category === 'invertebrates' ? '🐚' : (fossil.category === 'marine' ? '🌊' : '🦖')}</span>
                    ${fossil.commonName} (${fossil.sizeComparison.creatureLength})
                  </span>
                  <span class="real-scale-badge human">
                    <span>${fossil.category === 'invertebrates' ? '🪙 1 € minca (2,3 cm)' : '🧍 Dospelý človek (1,8 m)'}</span>
                  </span>
                </div>
                <div class="real-scale-zoom-tag">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span>Zväčšiť</span>
                </div>
              </div>
            </div>

            <!-- Porovnávacie karty pomerov -->
            <div class="scale-metrics-grid">
              <div class="metric-pill">
                <span class="metric-lbl">Rozmery tvora</span>
                <strong class="metric-val" style="color: var(--accent-amber-light);">${fossil.sizeComparison.creatureLength}</strong>
              </div>
              <div class="metric-pill">
                <span class="metric-lbl">Pomer veľkosti</span>
                <strong class="metric-val">${fossil.sizeComparison.lengthRatio}</strong>
              </div>
              <div class="metric-pill">
                <span class="metric-lbl">Hmotnosť vs. človek</span>
                <strong class="metric-val">${fossil.sizeComparison.weightInHumans}</strong>
              </div>
            </div>

            <!-- Pútavé slovné prirovnanie -->
            <div class="scale-fun-analogy">
              <span class="analogy-icon">💡</span>
              <p>${fossil.sizeComparison.funAnalogy}</p>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Bohaté zaujímavosti a kuriozity (Trivia) -->
        ${fossil.trivia && fossil.trivia.length > 0 ? `
        <div class="trivia-section">
          <div class="section-title-wrap">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <h3>Fascinujúce fakty & kuriozity pre hostí</h3>
          </div>

          <div class="trivia-cards-grid">
            ${fossil.trivia.map(item => `
              <div class="trivia-card">
                <span class="trivia-tag">${item.tag}</span>
                <h4 class="trivia-title">${item.title}</h4>
                <p class="trivia-text">${item.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Pôvodné rýchle fakty (ak existujú) -->
        ${fossil.quickFacts && fossil.quickFacts.length > 0 ? `
        <div class="facts-block">
          <h3>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Rýchly prehľad parametrov
          </h3>
          <ul class="facts-list">
            ${fossil.quickFacts.map(fact => `
              <li>
                <strong>${fact.label}:</strong>
                <span>${fact.value}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        ` : ''}

        <!-- Akčná lišta -->
        <div class="modal-footer-bar">
          <button id="modal-next-btn" class="btn btn-secondary" aria-label="Otvoriť ďalší exponát">Ďalší exponát →</button>
          <button id="modal-share-btn" class="btn btn-secondary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Zdieľať tento exponát
          </button>
          <button id="modal-close-bottom-btn" class="btn btn-primary">
            Späť do vitríny
          </button>
        </div>
      </div>
    `;

    // Otvorenie natívneho modálu
    if (!fossilDialog.open) fossilDialog.showModal();
    modalContentContainer.scrollTop = 0;

    let currentModalView = 'fossil';

    // Logika prepínania medzi fotkou fosílie a rekonštrukciou tvora
    const heroContainer = document.getElementById('modal-header-hero');
    const heroImg = document.getElementById('modal-hero-img');
    const heroBackdrop = document.getElementById('modal-hero-backdrop');
    const btnViewFossil = document.getElementById('btn-view-fossil');
    const btnViewCreature = document.getElementById('btn-view-creature');
    const btnViewScale = document.getElementById('btn-view-scale');
    const duoFossilCard = document.getElementById('duo-fossil-card');
    const duoCreatureCard = document.getElementById('duo-creature-card');
    const btnToggleFit = document.getElementById('btn-toggle-fit');
    const labelToggleFit = document.getElementById('label-toggle-fit');
    const btnOpenLightbox = document.getElementById('btn-open-lightbox');

    function switchView(viewType) {
      currentModalView = viewType;
      if (viewType === 'fossil') {
        heroImg.src = optimizedImage(fossil.fossilImage);
        heroImg.alt = fossil.fossilType;
        if (heroBackdrop) heroBackdrop.style.backgroundImage = `url('${optimizedImage(fossil.fossilImage)}')`;
        btnViewFossil.classList.add('active');
        btnViewCreature.classList.remove('active');
        duoFossilCard.classList.add('active');
        duoCreatureCard.classList.remove('active');
      } else if (viewType === 'creature') {
        heroImg.src = optimizedImage(fossil.creatureImage);
        heroImg.alt = `Rekonštrukcia ${fossil.commonName}`;
        if (heroBackdrop) heroBackdrop.style.backgroundImage = `url('${optimizedImage(fossil.creatureImage)}')`;
        btnViewCreature.classList.add('active');
        btnViewFossil.classList.remove('active');
        duoCreatureCard.classList.add('active');
        duoFossilCard.classList.remove('active');
      } else {
        const scaleImage = optimizedImage(fossil.scaleImage || fossil.creatureImage);
        heroImg.src = scaleImage;
        heroImg.alt = `Porovnanie veľkosti: ${fossil.commonName}`;
        if (heroBackdrop) heroBackdrop.style.backgroundImage = `url('${scaleImage}')`;
        btnViewFossil.classList.remove('active');
        btnViewCreature.classList.remove('active');
        duoCreatureCard.classList.remove('active');
        duoFossilCard.classList.remove('active');
      }
      btnViewScale.classList.toggle('active', viewType === 'scale');
      if (lightboxDialog && lightboxDialog.open) {
        updateLightboxContent(fossil, currentModalView);
      }
    }

    btnViewFossil.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      switchView('fossil');
    });

    btnViewCreature.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      switchView('creature');
    });

    btnViewScale.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      switchView('scale');
    });

    duoFossilCard.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      switchView('fossil');
    });

    duoCreatureCard.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      switchView('creature');
    });

    // Prepnúť režim Výplň vs. Celý záber bez orezania
    if (btnToggleFit) {
      btnToggleFit.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isCover = heroContainer.classList.toggle('mode-cover');
        labelToggleFit.textContent = isCover ? 'Celý záber' : 'Výplň';
        btnToggleFit.title = isCover ? 'Zobraziť celú fotku bez orezania' : 'Vyplniť celú plochu fotkou';
      });
    }

    // Otvorenie lightboxu kliknutím na zväčšovacie tlačidlo alebo na fotku
    if (btnOpenLightbox) {
      btnOpenLightbox.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(fossil, currentModalView);
      });
    }

    if (heroContainer) {
      heroContainer.addEventListener('click', (e) => {
        // Ignorovať klik na ovládacie prvky v hornej lište
        if (e.target.closest('.hero-floating-controls')) return;
        openLightbox(fossil, currentModalView);
      });
    }

    // Kliknutie na fotorealistické porovnanie otvorí celoobrazovkový Lightbox
    const realScaleView = document.getElementById('real-scale-view');
    if (realScaleView) {
      realScaleView.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(fossil, 'scale');
      });
      realScaleView.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          openLightbox(fossil, 'scale');
        }
      });
    }

    // Ochrana pred nechceným zatvorením pri kliku kdekoľvek do tela dialógu
    const dialogCard = fossilDialog.querySelector('.dialog-card');
    if (dialogCard) {
      dialogCard.addEventListener('click', (e) => e.stopPropagation());
    }

    // Tlačidlo zdieľania
    document.getElementById('modal-share-btn').addEventListener('click', (e) => {
      e.preventDefault();
      shareFossil(fossil);
    });

    document.getElementById('modal-close-bottom-btn').addEventListener('click', (e) => {
      e.preventDefault();
      closeFossilModal();
    });

    document.getElementById('modal-next-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const index = FOSSILS_DATA.findIndex(item => item.id === fossil.id);
      openFossilModal(FOSSILS_DATA[(index + 1) % FOSSILS_DATA.length]);
    });
  }

  function closeFossilModal() {
    fossilDialog.close();
    closeLightbox();
    state.currentFossil = null;
    history.replaceState(null, '', window.location.pathname);
  }

  /**
   * Správa celoobrazovkového lightboxu
   */
  let currentLightboxView = 'creature';

  function openLightbox(fossil, viewType = 'creature') {
    if (!fossil || !lightboxDialog) return;
    currentLightboxView = viewType;
    updateLightboxContent(fossil, viewType);
    lightboxDialog.showModal();
  }

  function updateLightboxContent(fossil, viewType) {
    if (!fossil) return;
    currentLightboxView = viewType;

    if (viewType === 'scale') {
      if (lightboxImg) {
        lightboxImg.src = optimizedImage(fossil.scaleImage || fossil.creatureImage);
        lightboxImg.alt = `Fotorealistické porovnanie veľkosti: ${fossil.commonName} a človek`;
      }
      if (lightboxCaptionName) {
        lightboxCaptionName.textContent = `Porovnanie veľkosti: ${fossil.commonName}`;
      }
      if (lightboxCaptionSub) {
        const humanRef = fossil.category === 'invertebrates' ? '1 € minca (2,3 cm)' : 'Dospelý človek (1,8 m)';
        lightboxCaptionSub.textContent = `📏 ${fossil.dimensions} vs. ${humanRef}`;
      }
      if (lbViewFossil) lbViewFossil.classList.remove('active');
      if (lbViewCreature) lbViewCreature.classList.remove('active');
      if (lbViewScale) lbViewScale.classList.add('active');
      return;
    }

    const isFossil = viewType === 'fossil';
    if (lightboxImg) {
      lightboxImg.src = optimizedImage(isFossil ? fossil.fossilImage : fossil.creatureImage);
      lightboxImg.alt = isFossil ? fossil.fossilType : fossil.commonName;
    }
    if (lightboxCaptionName) {
      lightboxCaptionName.textContent = fossil.commonName;
    }
    if (lightboxCaptionSub) {
      lightboxCaptionSub.textContent = isFossil 
        ? `🦴 Vystavený originál vo vitrínke (${fossil.fossilType})`
        : `🦕 Životná rekonštrukcia tvora v plnej veľkosti`;
    }
    if (lbViewFossil) lbViewFossil.classList.toggle('active', isFossil);
    if (lbViewCreature) lbViewCreature.classList.toggle('active', !isFossil);
    if (lbViewScale) lbViewScale.classList.remove('active');
  }

  function closeLightbox() {
    if (lightboxDialog && lightboxDialog.open) {
      lightboxDialog.close();
    }
  }

  /**
   * Zdieľanie konkrétneho exponátu
   */
  async function shareFossil(fossil) {
    const url = `${window.location.origin}${window.location.pathname}#${fossil.id}`;
    const shareData = {
      title: `${fossil.commonName} | Prehistorická vitrína`,
      text: `Pozri si fosíliu: ${fossil.commonName} (${fossil.fossilType}) z obdobia ${fossil.period}!`,
      url: url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Používateľ zrušil alebo nastala chyba, pokračujeme skopírovaním
      }
    }

    // Fallback: skopírovanie do schránky
    try {
      await navigator.clipboard.writeText(url);
      showToast('Odkaz na exponát bol skopírovaný do schránky!');
    } catch {
      prompt('Skopírujte si odkaz na tento exponát:', url);
    }
  }

  /**
   * Nastavenie event listenerov
   */
  function setupEventListeners() {
    // Zatváranie modálu
    closeDialogBtn.addEventListener('click', closeFossilModal);
    fossilDialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeFossilModal();
    });

    // Light-dismiss: zatvorenie dialógu IBA pri kliknutí priamo na tmavé pozadie (backdrop)
    fossilDialog.addEventListener('click', (e) => {
      if (e.target === fossilDialog) {
        closeFossilModal();
      }
    });

    // Lightbox listenery
    if (lbViewFossil) {
      lbViewFossil.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.currentFossil) {
          updateLightboxContent(state.currentFossil, 'fossil');
        }
      });
    }

    if (lbViewCreature) {
      lbViewCreature.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.currentFossil) {
          updateLightboxContent(state.currentFossil, 'creature');
        }
      });
    }

    if (lbViewScale) {
      lbViewScale.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (state.currentFossil) {
          updateLightboxContent(state.currentFossil, 'scale');
        }
      });
    }

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeLightbox();
      });
    }

    if (lightboxDialog) {
      lightboxDialog.addEventListener('click', (e) => {
        if (e.target === lightboxDialog || e.target === lightboxWrapper || e.target.id === 'lightbox-img-stage') {
          closeLightbox();
        }
      });
    }

    // Sledovanie zmeny hash v URL (napr. tlačidlo späť v prehliadači)
    window.addEventListener('hashchange', checkUrlHash);

    // Interaktívne piny v geologickej časovej osi
    document.querySelectorAll('.timeline-fossil-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const fossilId = pin.dataset.fossilId;
        const fossil = FOSSILS_DATA.find(f => f.id === fossilId);
        if (fossil) {
          openFossilModal(fossil);
        }
      });
    });
  }

  /**
   * Kontrola hash v URL pri načítaní (napr. #spinosaurus)
   */
  function checkUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      if (fossilDialog.open) closeFossilModal();
      return;
    }

    const fossil = FOSSILS_DATA.find(f => f.id === hash);
    if (fossil && (!fossilDialog.open || state.currentFossil?.id !== fossil.id)) {
      openFossilModal(fossil);
    }
  }

  /**
   * Zobrazenie jednoduchej plávajúcej notifikácie (Toast)
   */
  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: #f59e0b;
      color: #000;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 0.9rem;
      z-index: 1000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      animation: fadeInOut 2.5s forwards;
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }
});
