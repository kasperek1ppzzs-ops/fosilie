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
        <img src="${fossil.image}" alt="${fossil.name}" loading="lazy">
        <div class="card-period-badge">
          <span class="dot" style="background-color: ${badgeColor}; box-shadow: 0 0 8px ${badgeColor}"></span>
          <span>${fossil.shortPeriod || fossil.period}</span>
        </div>
        <div class="card-type-tag">${fossil.age}</div>
      </div>
      <div class="card-body">
        <div class="card-titles">
          <h2 class="card-common-name">${fossil.commonName}</h2>
          <span class="card-sci-name">${fossil.name}</span>
        </div>
        <div class="card-footer-action">
          <span>Otvoriť kartu & exponát</span>
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
   * Generovanie grafického siluetového diagramu porovnania veľkosti s človekom (1,8 m)
   * Vytvorené presne podľa fyzických proporcií v mierke 1:1
   */
  function getScaleSilhouetteSvg(fossil) {
    if (fossil.id === 'spinosaurus') {
      return `
        <svg viewBox="0 0 760 270" class="silhouette-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Porovnanie veľkosti Spinosaurusa a človeka">
          <defs>
            <linearGradient id="spinoMuseumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="35%" stop-color="#f59e0b"/>
              <stop offset="70%" stop-color="#d97706"/>
              <stop offset="100%" stop-color="#92400e"/>
            </linearGradient>
            <linearGradient id="spinoBackLimbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#78350f"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <radialGradient id="spinoBackdropGlow" cx="45%" cy="50%" r="60%">
              <stop offset="0%" stop-color="rgba(245, 158, 11, 0.12)"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
            <filter id="spinoMuseumShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="rgba(0,0,0,0.65)"/>
            </filter>
          </defs>

          <!-- Jemné múzejné pozadie -->
          <rect x="0" y="0" width="760" height="270" fill="url(#spinoBackdropGlow)"/>

          <!-- Mriežka výškových kót bez kolízií s telom -->
          <!-- 4,8 m plachta -->
          <line x1="20" y1="52" x2="730" y2="52" stroke="rgba(245, 158, 11, 0.3)" stroke-width="1" stroke-dasharray="4,4"/>
          <rect x="25" y="42" width="220" height="20" rx="3" fill="#0b0f19" stroke="rgba(245,158,11,0.5)" stroke-width="0.8"/>
          <text x="32" y="56" fill="#f59e0b" font-size="10" font-weight="700" font-family="sans-serif">4,8 m • Vrchol chrbtovej plachty</text>

          <!-- 1,8 m človek (umiestnené vpravo pri človeku, bez kríženia s chvostom) -->
          <line x1="20" y1="152" x2="730" y2="152" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1" stroke-dasharray="4,4"/>
          <rect x="585" y="142" width="135" height="20" rx="3" fill="#0b0f19" stroke="rgba(56,189,248,0.5)" stroke-width="0.8"/>
          <text x="592" y="156" fill="#38bdf8" font-size="10" font-weight="700" font-family="sans-serif">1,8 m • Výška človeka</text>

          <!-- 0 m zem -->
          <line x1="20" y1="215" x2="730" y2="215" stroke="#475569" stroke-width="1.5"/>
          <text x="25" y="210" fill="#94a3b8" font-size="10" font-family="sans-serif">0,0 m (Zem)</text>

          <!-- Mäkký tieň nôh na zemi -->
          <ellipse cx="320" cy="216" rx="35" ry="3.5" fill="rgba(0,0,0,0.55)"/>
          <ellipse cx="270" cy="216" rx="25" ry="3" fill="rgba(0,0,0,0.4)"/>
          <ellipse cx="665" cy="216" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>

          <!-- Zadná noha a ruka v pozadí (v tieni) -->
          <g opacity="0.85">
            <!-- Ľavá noha v pozadí -->
            <path d="
              M 265,135
              C 255,148 250,165 260,182
              L 258,215
              L 280,215
              C 282,212 282,208 278,205
              L 276,190
              C 284,174 286,156 280,138 Z
            " fill="url(#spinoBackLimbGrad)"/>
            <!-- Ľavá ruka v pozadí -->
            <path d="
              M 405,140
              C 400,150 398,162 406,174
              L 412,174
              L 408,162
              C 412,152 414,144 412,138 Z
            " fill="url(#spinoBackLimbGrad)"/>
          </g>

          <!-- Hlavné telo Spinosaurusa (plachta, pádlový chvost, hlava, trup) -->
          <g filter="url(#spinoMuseumShadow)">
            <path d="
              M 590,124
              C 582,121 574,121 560,119
              C 538,116 512,112 490,108
              C 484,103 480,103 476,106
              C 470,106 462,104 452,104
              C 438,104 425,100 412,96
              C 396,92 384,76 368,60
              C 352,48 338,44 324,46
              C 308,48 294,54 280,66
              C 268,76 256,90 246,98
              C 234,102 216,104 195,106
              C 170,108 140,112 110,116
              C 85,120 62,126 44,134
              C 42,135 42,136 44,137
              C 62,146 86,154 112,158
              C 142,162 174,160 202,154
              C 224,148 240,142 250,138
              C 275,142 340,146 395,144
              C 415,144 430,138 442,132
              C 460,128 480,126 515,124
              C 550,124 578,127 590,124 Z
            " fill="url(#spinoMuseumGrad)"/>

            <!-- Žebrová štruktúra tŕňov v plachte (subtílne anatomické línie) -->
            <path d="
              M 265,100 L 278,76
              M 285,88 L 298,64
              M 308,82 L 318,52
              M 330,80 L 336,49
              M 352,82 L 354,54
              M 374,86 L 372,66
              M 394,92 L 388,82
            " stroke="rgba(255,255,255,0.22)" stroke-width="1.2" stroke-linecap="round"/>

            <!-- Predná noha v popredí (plná, masívna theropodná anatómia) -->
            <path d="
              M 282,126
              C 278,142 284,160 302,172
              L 298,192
              L 300,215
              L 326,215
              C 330,211 328,206 320,204
              L 316,192
              C 324,180 328,162 322,146
              C 316,132 304,124 282,126 Z
            " fill="url(#spinoMuseumGrad)" stroke="#78350f" stroke-width="0.8"/>

            <!-- Predné rameno v popredí s veľkým srpovitým pazúrom -->
            <path d="
              M 418,136
              C 424,146 428,158 434,168
              L 442,184
              L 446,182
              L 438,166
              C 434,154 430,144 424,136 Z
            " fill="url(#spinoMuseumGrad)" stroke="#78350f" stroke-width="0.75"/>
          </g>

          <!-- Dĺžková kóta Spinosaurusa (15,0 m) -->
          <g>
            <line x1="44" y1="240" x2="590" y2="240" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="44,240 54,236 54,244" fill="#f59e0b"/>
            <polygon points="590,240 580,236 580,244" fill="#f59e0b"/>
            <line x1="44" y1="140" x2="44" y2="248" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1" stroke-dasharray="2,2"/>
            <line x1="590" y1="130" x2="590" y2="248" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1" stroke-dasharray="2,2"/>
            <rect x="235" y="228" width="165" height="22" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
            <text x="317" y="243" fill="#f59e0b" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Dĺžka: 15,0 m (Spinosaurus)</text>
          </g>

          <!-- Silueta človeka (Čistá anatomická postava 1,8 m = 63 px) -->
          <g class="human-silhouette" transform="translate(665, 215)">
            <circle cx="0" cy="-57" r="5" fill="#38bdf8"/>
            <path d="
              M -5,-50 C -6,-50 -7,-48 -7,-46 L -7,-32 C -7,-30 -5,-30 -5,-30 L -4,-30 L -4,-2
              C -4,0 -2,0 -2,-2 L -1,-25 L 1,-25 L 2,-2 C 2,0 4,0 4,-2 L 4,-30 L 5,-30
              C 5,-30 7,-30 7,-32 L 7,-46 C 7,-48 6,-50 5,-50 Z" 
              fill="#38bdf8"/>
            <line x1="16" y1="-63" x2="16" y2="0" stroke="#38bdf8" stroke-width="1.2"/>
            <polygon points="16,-63 13,-56 19,-56" fill="#38bdf8"/>
            <polygon points="16,0 13,-7 19,-7" fill="#38bdf8"/>
            <text x="24" y="-32" fill="#38bdf8" font-size="11" font-weight="700" font-family="sans-serif">Človek (1,8 m)</text>
          </g>
        </svg>
      `;
    }

    if (fossil.id === 'mosasaurus') {
      return `
        <svg viewBox="0 0 760 260" class="silhouette-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Porovnanie veľkosti Mosasaura a človeka">
          <defs>
            <linearGradient id="mosaMuseumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0284c7"/>
              <stop offset="45%" stop-color="#0ea5e9"/>
              <stop offset="85%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#7dd3fc"/>
            </linearGradient>
            <linearGradient id="mosaBackFlipperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0369a1"/>
              <stop offset="100%" stop-color="#075985"/>
            </linearGradient>
            <radialGradient id="waterDepthGlow" cx="45%" cy="50%" r="60%">
              <stop offset="0%" stop-color="rgba(14, 165, 233, 0.14)"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
            <filter id="mosaShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="rgba(2,132,199,0.35)"/>
            </filter>
          </defs>

          <rect x="0" y="0" width="760" height="260" fill="url(#waterDepthGlow)"/>

          <!-- Hĺbkové línie -->
          <line x1="30" y1="215" x2="730" y2="215" stroke="#334155" stroke-width="1.5"/>
          <text x="35" y="210" fill="#64748b" font-size="10" font-family="sans-serif">Morská hĺbka</text>

          <!-- Plutvy na odvrátenej strane (v pozadí v tmavšom odtieni) -->
          <g opacity="0.8">
            <!-- Predná ľavá plutva -->
            <path d="
              M 425,122
              C 438,100 458,74 476,64
              C 480,62 483,65 480,70
              C 468,88 450,110 435,125 Z
            " fill="url(#mosaBackFlipperGrad)"/>
            <!-- Zadná ľavá plutva -->
            <path d="
              M 265,124
              C 275,108 288,90 298,82
              C 301,80 303,83 301,87
              C 292,98 280,114 270,126 Z
            " fill="url(#mosaBackFlipperGrad)"/>
          </g>

          <!-- Hlavné telo Mosasaura (mohutný dravý morský plaz, hlboký hrudník, široké krídlové pádla, 2013 hypocerkálny chvost) -->
          <g filter="url(#mosaShadow)">
            <path d="
              M 590,130
              C 565,118 520,110 465,108
              C 405,106 335,110 275,116
              C 220,122 170,126 130,132
              C 112,124 88,102 68,80
              C 64,76 60,79 62,84
              C 74,104 86,124 96,134
              C 86,144 68,166 50,186
              C 47,190 52,192 56,187
              C 76,165 102,150 132,144
              C 170,144 215,142 260,142
              C 320,144 380,148 438,148
              C 495,146 548,142 590,130 Z
            " fill="url(#mosaMuseumGrad)"/>

            <!-- Predná pravá plutva (široké hydrodynamické pádlo s autentickým tvarom) -->
            <path d="
              M 440,146
              C 455,165 476,198 495,218
              C 498,221 502,219 499,215
              C 484,188 468,162 454,146 Z
            " fill="url(#mosaMuseumGrad)" stroke="#0369a1" stroke-width="0.8"/>

            <!-- Zadná pravá plutva (panvové pádlo) -->
            <path d="
              M 264,142
              C 275,158 290,182 302,196
              C 305,199 308,198 306,194
              C 295,175 284,156 274,142 Z
            " fill="url(#mosaMuseumGrad)" stroke="#0369a1" stroke-width="0.8"/>
          </g>

          <!-- Dĺžková kóta Mosasaura (14,0 m) -->
          <g>
            <line x1="48" y1="238" x2="590" y2="238" stroke="#0ea5e9" stroke-width="1.5"/>
            <polygon points="48,238 58,234 58,242" fill="#0ea5e9"/>
            <polygon points="590,238 580,234 580,242" fill="#0ea5e9"/>
            <line x1="48" y1="190" x2="48" y2="245" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1" stroke-dasharray="2,2"/>
            <line x1="590" y1="135" x2="590" y2="245" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1" stroke-dasharray="2,2"/>
            <rect x="235" y="226" width="165" height="22" rx="4" fill="#0f172a" stroke="#0ea5e9" stroke-width="1"/>
            <text x="317" y="241" fill="#0ea5e9" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Dĺžka: 14,0 m (Mosasaurus)</text>
          </g>

          <!-- Plávajúci potápač v reálnej mierke 1,8 m -->
          <g class="human-silhouette" transform="translate(635, 135)">
            <circle cx="0" cy="0" r="4.5" fill="#38bdf8"/>
            <path d="M 4,-2 L 24,-4 L 32,-3 L 44,0 L 52,5 L 56,12 L 53,13 L 48,7 L 34,4 L 18,4 L 8,4 L 4,3 Z" fill="#38bdf8"/>
            <rect x="10" y="-7" width="16" height="5" rx="2" fill="#0284c7"/>
            <polygon points="56,12 68,18 64,22 53,15" fill="#38bdf8"/>
            <line x1="0" y1="-14" x2="68" y2="-14" stroke="#38bdf8" stroke-width="1.2"/>
            <polygon points="0,-14 6,-17 6,-11" fill="#38bdf8"/>
            <polygon points="68,-14 62,-17 62,-11" fill="#38bdf8"/>
            <text x="34" y="-20" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Potápač (1,8 m)</text>
          </g>
        </svg>
      `;
    }

    if (fossil.id === 'otodus') {
      return `
        <svg viewBox="0 0 760 260" class="silhouette-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Porovnanie veľkosti Žraloka Otodus a človeka">
          <defs>
            <linearGradient id="otodusMuseumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0891b2"/>
              <stop offset="40%" stop-color="#06b6d4"/>
              <stop offset="80%" stop-color="#22d3ee"/>
              <stop offset="100%" stop-color="#67e8f9"/>
            </linearGradient>
            <radialGradient id="otodusOceanGlow" cx="45%" cy="50%" r="60%">
              <stop offset="0%" stop-color="rgba(6, 182, 212, 0.14)"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
            <filter id="otodusShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="rgba(6,182,212,0.3)"/>
            </filter>
          </defs>

          <rect x="0" y="0" width="760" height="260" fill="url(#otodusOceanGlow)"/>
          <line x1="30" y1="215" x2="730" y2="215" stroke="#334155" stroke-width="1.5"/>
          <text x="35" y="210" fill="#64748b" font-size="10" font-family="sans-serif">Morská hĺbka</text>

          <!-- Telo Žraloka Otodus (masívny torpédovitý apex predátor, mohutný trup, kosákovité prsné plutvy, polmesiacový chvost) -->
          <g filter="url(#otodusShadow)">
            <path d="
              M 570,130
              C 540,118 480,106 425,102
              C 375,98 335,102 310,104
              C 300,90 286,64 270,44
              C 267,40 263,42 265,47
              C 270,68 266,92 248,108
              C 205,114 165,124 125,130
              C 100,130 85,118 68,82
              C 65,77 60,79 62,85
              C 74,112 76,132 64,170
              C 62,176 68,178 72,172
              C 90,146 112,140 135,140
              C 165,140 190,146 210,150
              C 220,160 230,172 240,174
              C 242,174 244,171 242,168
              C 236,158 230,150 226,148
              C 275,152 320,156 365,156
              C 380,176 405,212 425,232
              C 428,235 431,233 429,229
              C 416,204 402,178 394,154
              C 455,150 515,144 570,130 Z
            " fill="url(#otodusMuseumGrad)"/>

            <!-- Žiabrové štrbiny (5 anatomických oblúkov) -->
            <line x1="472" y1="118" x2="468" y2="140" stroke="rgba(0,0,0,0.35)" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="478" y1="119" x2="474" y2="140" stroke="rgba(0,0,0,0.35)" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="484" y1="120" x2="480" y2="139" stroke="rgba(0,0,0,0.35)" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="490" y1="121" x2="486" y2="138" stroke="rgba(0,0,0,0.35)" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="496" y1="122" x2="492" y2="137" stroke="rgba(0,0,0,0.35)" stroke-width="1.3" stroke-linecap="round"/>
          </g>

          <!-- Dĺžková kóta Otodusa (11,0 m) -->
          <g>
            <line x1="64" y1="238" x2="570" y2="238" stroke="#06b6d4" stroke-width="1.5"/>
            <polygon points="64,238 74,234 74,242" fill="#06b6d4"/>
            <polygon points="570,238 560,234 560,242" fill="#06b6d4"/>
            <line x1="64" y1="90" x2="64" y2="245" stroke="rgba(6, 182, 212, 0.4)" stroke-width="1" stroke-dasharray="2,2"/>
            <line x1="570" y1="135" x2="570" y2="245" stroke="rgba(6, 182, 212, 0.4)" stroke-width="1" stroke-dasharray="2,2"/>
            <rect x="235" y="226" width="165" height="22" rx="4" fill="#0f172a" stroke="#06b6d4" stroke-width="1"/>
            <text x="317" y="241" fill="#06b6d4" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Dĺžka: 11,0 m (Žralok Otodus)</text>
          </g>

          <!-- Potápač (1,8 m) -->
          <g class="human-silhouette" transform="translate(625, 135)">
            <circle cx="0" cy="0" r="4.5" fill="#38bdf8"/>
            <path d="M 4,-2 L 24,-4 L 32,-3 L 44,0 L 52,5 L 56,12 L 53,13 L 48,7 L 34,4 L 18,4 L 8,4 L 4,3 Z" fill="#38bdf8"/>
            <rect x="10" y="-7" width="16" height="5" rx="2" fill="#0891b2"/>
            <polygon points="56,12 68,18 64,22 53,15" fill="#38bdf8"/>
            <line x1="0" y1="-14" x2="68" y2="-14" stroke="#38bdf8" stroke-width="1.2"/>
            <polygon points="0,-14 6,-17 6,-11" fill="#38bdf8"/>
            <polygon points="68,-14 62,-17 62,-11" fill="#38bdf8"/>
            <text x="34" y="-20" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Potápač (1,8 m)</text>
          </g>
        </svg>
      `;
    }

    if (fossil.id === 'trilobite') {
      return `
        <svg viewBox="0 0 760 260" class="silhouette-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Porovnanie veľkosti Trilobita s človekom a 1 € mincou">
          <defs>
            <radialGradient id="triloGlow" cx="65%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(217, 119, 6, 0.15)"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
            <linearGradient id="triloFossilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="40%" stop-color="#d97706"/>
              <stop offset="80%" stop-color="#92400e"/>
              <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <linearGradient id="coinRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f1f5f9"/>
              <stop offset="50%" stop-color="#cbd5e1"/>
              <stop offset="100%" stop-color="#94a3b8"/>
            </linearGradient>
            <linearGradient id="coinCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#eab308"/>
              <stop offset="100%" stop-color="#ca8a04"/>
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="760" height="260" fill="url(#triloGlow)"/>
          
          <!-- Zem pod človekom (končí pred kartou, nepretína ju) -->
          <line x1="30" y1="215" x2="330" y2="215" stroke="#334155" stroke-width="1.5"/>

          <!-- Ľavá strana: Človek (180 cm) -->
          <g class="human-silhouette" transform="translate(100, 215) scale(1.1)">
            <circle cx="0" cy="-57" r="5" fill="#38bdf8"/>
            <path d="
              M -5,-50 C -6,-50 -7,-48 -7,-46 L -7,-32 C -7,-30 -5,-30 -5,-30 L -4,-30 L -4,-2
              C -4,0 -2,0 -2,-2 L -1,-25 L 1,-25 L 2,-2 C 2,0 4,0 4,-2 L 4,-30 L 5,-30
              C 5,-30 7,-30 7,-32 L 7,-46 C 7,-48 6,-50 5,-50 Z" 
              fill="#38bdf8"/>
            <line x1="16" y1="-65" x2="16" y2="0" stroke="#38bdf8" stroke-width="1.2"/>
            <polygon points="16,-65 13,-58 19,-58" fill="#38bdf8"/>
            <polygon points="16,0 13,-7 19,-7" fill="#38bdf8"/>
            <text x="24" y="-32" fill="#38bdf8" font-size="11" font-weight="700" font-family="sans-serif">Človek: 180 cm (1,8 m)</text>
          </g>

          <!-- Prepojovacia šípka pomeru -->
          <g transform="translate(230, 130)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>
            <polygon points="65,0 55,-5 55,5" fill="#f59e0b"/>
            <text x="30" y="-12" fill="#f59e0b" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">28× menší</text>
          </g>

          <!-- Pravá strana: Samostatná múzejná karta porovnania veľkosti v mierke 1:1 -->
          <g transform="translate(365, 20)">
            <rect x="0" y="0" width="370" height="220" rx="10" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(245, 158, 11, 0.35)" stroke-width="1"/>
            
            <text x="185" y="26" fill="#f59e0b" font-size="11" font-weight="700" text-anchor="middle" text-transform="uppercase" letter-spacing="0.06em" font-family="sans-serif">Skutočná veľkosť skameneliny: 6,5 cm</text>

            <!-- Anatomická vedecká ilustrácia Trilobita (Phacops latifrons) -->
            <g transform="translate(115, 120)">
              <!-- Semicirkulárny Cephalon (hlavový štít) -->
              <path d="
                M -32,-22
                C -30,-42 30,-42 32,-22
                C 34,-10 24,-6 0,-6
                C -24,-6 -34,-10 -32,-22 Z
              " fill="url(#triloFossilGrad)" stroke="#451a03" stroke-width="1"/>

              <!-- Glabella (stredový vyvýšený lalok) -->
              <ellipse cx="0" cy="-22" rx="14" ry="12" fill="#92400e" stroke="#451a03" stroke-width="0.8"/>
              <!-- Schizochroálne zložené oči s fasetami -->
              <ellipse cx="-19" cy="-20" rx="5" ry="8" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/>
              <ellipse cx="19" cy="-20" rx="5" ry="8" fill="#fbbf24" stroke="#78350f" stroke-width="0.8"/>
              <circle cx="-19" cy="-20" r="2.5" fill="#451a03"/>
              <circle cx="19" cy="-20" r="2.5" fill="#451a03"/>

              <!-- Thorax (11 kĺbových segmentov trupu s pleurálnymi lalokmi) -->
              <g stroke="#451a03" stroke-width="0.7" fill="url(#triloFossilGrad)">
                <path d="M -30,-4 C -16,-2 0,-3 0,-3 C 0,-3 16,-2 30,-4 L 28,1 C 15,3 0,2 0,2 C 0,2 -15,3 -28,1 Z"/>
                <path d="M -29,2 C -15,4 0,3 0,3 C 0,3 15,4 29,2 L 27,7 C 14,9 0,8 0,8 C 0,8 -14,9 -27,7 Z"/>
                <path d="M -28,8 C -14,10 0,9 0,9 C 0,9 14,10 28,8 L 26,13 C 13,15 0,14 0,14 C 0,14 -13,15 -26,13 Z"/>
                <path d="M -26,14 C -13,16 0,15 0,15 C 0,15 13,16 26,14 L 24,19 C 12,21 0,20 0,20 C 0,20 -12,21 -24,19 Z"/>
                <path d="M -24,20 C -12,22 0,21 0,21 C 0,21 12,22 24,20 L 22,25 C 11,27 0,26 0,26 C 0,26 -11,27 -22,25 Z"/>
                <path d="M -22,26 C -11,28 0,27 0,27 C 0,27 11,28 22,26 L 20,31 C 10,33 0,32 0,32 C 0,32 -10,33 -20,31 Z"/>
                <path d="M -20,32 C -10,34 0,33 0,33 C 0,33 10,34 20,32 L 18,37 C 9,39 0,38 0,38 C 0,38 -9,39 -18,37 Z"/>
              </g>

              <!-- Pygidium (chvostový štít) -->
              <path d="
                M -17,38
                C -12,50 12,50 17,38
                C 10,41 0,42 -17,38 Z
              " fill="#78350f" stroke="#451a03" stroke-width="0.8"/>

              <!-- Stredový axiálny hrebeň -->
              <line x1="0" y1="-6" x2="0" y2="44" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            </g>

            <!-- Kóta Trilobita (6,5 cm) -->
            <line x1="170" y1="80" x2="170" y2="165" stroke="#f59e0b" stroke-width="1.5"/>
            <polygon points="170,80 166,86 174,86" fill="#f59e0b"/>
            <polygon points="170,165 166,159 174,159" fill="#f59e0b"/>
            <text x="180" y="126" fill="#f59e0b" font-size="11" font-weight="700" font-family="sans-serif">6,5 cm</text>

            <!-- Reálna 1 € minca (23,25 mm) v presnej mierke k fosílii -->
            <g transform="translate(285, 120)">
              <circle cx="0" cy="0" r="24" fill="url(#coinRingGrad)" stroke="#64748b" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="16" fill="url(#coinCoreGrad)" stroke="#b45309" stroke-width="1"/>
              <text x="0" y="4" fill="#78350f" font-size="12" font-weight="800" text-anchor="middle" font-family="sans-serif">1 €</text>
              
              <!-- Kóta 1 € mince (2,3 cm) -->
              <line x1="-24" y1="36" x2="24" y2="36" stroke="#94a3b8" stroke-width="1"/>
              <polygon points="-24,36 -19,33 -19,39" fill="#94a3b8"/>
              <polygon points="24,36 19,33 19,39" fill="#94a3b8"/>
              <text x="0" y="49" fill="#cbd5e1" font-size="9.5" text-anchor="middle" font-family="sans-serif">2,3 cm (1 €)</text>
            </g>

            <text x="185" y="202" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Skutočná veľkosť exponátu v mierke 1:1 vedľa bežnej 1 € mince</text>
          </g>
        </svg>
      `;
    }

    if (fossil.id === 'amber') {
      return `
        <svg viewBox="0 0 760 260" class="silhouette-svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Porovnanie veľkosti Jantáru a hmyzu s človekom a 1 € mincou">
          <defs>
            <radialGradient id="amberBackdropGlow" cx="65%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(234, 179, 8, 0.18)"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
            <linearGradient id="amberGemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="30%" stop-color="#f59e0b"/>
              <stop offset="70%" stop-color="#d97706"/>
              <stop offset="100%" stop-color="#78350f"/>
            </linearGradient>
            <linearGradient id="coinRingGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f1f5f9"/>
              <stop offset="50%" stop-color="#cbd5e1"/>
              <stop offset="100%" stop-color="#94a3b8"/>
            </linearGradient>
            <linearGradient id="coinCoreGradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#eab308"/>
              <stop offset="100%" stop-color="#ca8a04"/>
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="760" height="260" fill="url(#amberBackdropGlow)"/>
          
          <!-- Zem pod človekom (končí pred kartou, nepretína ju) -->
          <line x1="30" y1="215" x2="330" y2="215" stroke="#334155" stroke-width="1.5"/>

          <!-- Ľavá strana: Človek (1 800 mm) -->
          <g class="human-silhouette" transform="translate(100, 215) scale(1.1)">
            <circle cx="0" cy="-57" r="5" fill="#38bdf8"/>
            <path d="
              M -5,-50 C -6,-50 -7,-48 -7,-46 L -7,-32 C -7,-30 -5,-30 -5,-30 L -4,-30 L -4,-2
              C -4,0 -2,0 -2,-2 L -1,-25 L 1,-25 L 2,-2 C 2,0 4,0 4,-2 L 4,-30 L 5,-30
              C 5,-30 7,-30 7,-32 L 7,-46 C 7,-48 6,-50 5,-50 Z" 
              fill="#38bdf8"/>
            <line x1="16" y1="-65" x2="16" y2="0" stroke="#38bdf8" stroke-width="1.2"/>
            <polygon points="16,-65 13,-58 19,-58" fill="#38bdf8"/>
            <polygon points="16,0 13,-7 19,-7" fill="#38bdf8"/>
            <text x="24" y="-32" fill="#38bdf8" font-size="11" font-weight="700" font-family="sans-serif">Človek: 1 800 mm</text>
          </g>

          <!-- Prepojovacia šípka pomeru -->
          <g transform="translate(230, 130)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#eab308" stroke-width="2" stroke-dasharray="4,4"/>
            <polygon points="65,0 55,-5 55,5" fill="#eab308"/>
            <text x="30" y="-12" fill="#eab308" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">450× menší</text>
          </g>

          <!-- Pravá strana: Samostatná múzejná karta zväčšeného jantáru a hmyzu -->
          <g transform="translate(365, 20)">
            <rect x="0" y="0" width="370" height="220" rx="10" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(234, 179, 8, 0.35)" stroke-width="1"/>
            
            <text x="185" y="26" fill="#eab308" font-size="11" font-weight="700" text-anchor="middle" text-transform="uppercase" letter-spacing="0.06em" font-family="sans-serif">Veľkosť jantáru (4,5 cm) a hmyzu (4 mm)</text>

            <!-- Priesvitný jantárový drahokam s optickým lomom -->
            <g transform="translate(125, 118)">
              <ellipse cx="0" cy="0" rx="55" ry="46" fill="url(#amberGemGrad)" opacity="0.9" stroke="#fef08a" stroke-width="1.5" filter="drop-shadow(0 4px 14px rgba(245,158,11,0.45))"/>
              <!-- Svetelný odlesk lešteného povrchu -->
              <ellipse cx="-16" cy="-14" rx="36" ry="18" fill="rgba(255,255,255,0.25)"/>

              <!-- Prehistorický hmyz (4 mm) zaliaty v živici -->
              <g transform="scale(0.9)">
                <circle cx="0" cy="-18" r="3.5" fill="#1c1917"/>
                <path d="M -2,-21 L -8,-28 M 2,-21 L 8,-28" stroke="#1c1917" stroke-width="1"/>
                <ellipse cx="0" cy="-8" rx="4.5" ry="6" fill="#292524"/>
                <ellipse cx="0" cy="8" rx="4" ry="12" fill="#1c1917"/>
                <!-- Priesvitné jemné krídla -->
                <ellipse cx="-16" cy="-4" rx="16" ry="6" fill="rgba(255,255,255,0.75)" stroke="#44403c" stroke-width="0.8" transform="rotate(-20 -16 -4)"/>
                <ellipse cx="16" cy="-4" rx="16" ry="6" fill="rgba(255,255,255,0.75)" stroke="#44403c" stroke-width="0.8" transform="rotate(20 16 -4)"/>
                <!-- Nohy -->
                <path d="
                  M -4,-10 L -16,-16 L -22,-12
                  M -4,-7 L -18,-5 L -24,-2
                  M -4,-3 L -16,10 L -20,20
                  M 4,-10 L 16,-16 L 22,-12
                  M 4,-7 L 18,-5 L 24,-2
                  M 4,-3 L 16,10 L 20,20
                " stroke="#1c1917" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </g>
            </g>

            <!-- Kóta jantáru a hmyzu -->
            <line x1="125" y1="172" x2="125" y2="182" stroke="#eab308" stroke-width="1.5"/>
            <text x="125" y="194" fill="#eab308" font-size="10" font-weight="700" text-anchor="middle" font-family="sans-serif">Hmyz: 4 mm (Jantár: 4,5 cm)</text>

            <!-- 1 € minca (23,25 mm) pre priame porovnanie -->
            <g transform="translate(285, 118)">
              <circle cx="0" cy="0" r="24" fill="url(#coinRingGradAmber)" stroke="#64748b" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="16" fill="url(#coinCoreGradAmber)" stroke="#b45309" stroke-width="1"/>
              <text x="0" y="4" fill="#78350f" font-size="12" font-weight="800" text-anchor="middle" font-family="sans-serif">1 €</text>
              
              <!-- Kóta 1 € mince -->
              <line x1="-24" y1="36" x2="24" y2="36" stroke="#94a3b8" stroke-width="1"/>
              <polygon points="-24,36 -19,33 -19,39" fill="#94a3b8"/>
              <polygon points="24,36 19,33 19,39" fill="#94a3b8"/>
              <text x="0" y="49" fill="#cbd5e1" font-size="9.5" text-anchor="middle" font-family="sans-serif">2,3 cm (1 €)</text>
            </g>

            <text x="185" y="210" fill="#94a3b8" font-size="9.5" text-anchor="middle" font-family="sans-serif">Zväčšený pohľad na hmyz zaliaty v jantári vedľa 1 € mince</text>
          </g>
        </svg>
      `;
    }

    return '';
  }

  /**
   * Otvorenie modálneho okna s detailom fosílie
   */
  function openFossilModal(fossil) {
    state.currentFossil = fossil;

    // Aktualizácia URL hash bez reloadu
    history.replaceState(null, '', `#${fossil.id}`);

    const badgeColor = fossil.badgeColor || '#f59e0b';

    modalContentContainer.innerHTML = `
      <div class="modal-header-hero" id="modal-header-hero" title="Kliknite na fotku pre zväčšenie na celú obrazovku">
        <div class="hero-ambient-backdrop" id="modal-hero-backdrop" style="background-image: url('${fossil.creatureImage}')"></div>
        <img id="modal-hero-img" src="${fossil.creatureImage}" alt="Rekonštrukcia ${fossil.commonName}">
        
        <!-- Plávajúca horná lišta ovládania na fotke -->
        <div class="hero-floating-controls">
          <div class="modal-view-selector" role="group" aria-label="Prepínač obrázka">
            <button type="button" class="view-pill active" id="btn-view-creature">
              🦕 Podoba tvora
            </button>
            <button type="button" class="view-pill" id="btn-view-fossil">
              🦴 Fosília vo vitrínke
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
          <div class="gallery-duo-item active" id="duo-creature-card" role="button" tabindex="0" title="Zobraziť rekonštrukciu tvora">
            <div class="duo-img-wrap">
              <img src="${fossil.creatureImage}" alt="Rekonštrukcia pravekého tvora">
              <span class="duo-badge creature-badge">🦕 Podoba a život tvora</span>
            </div>
            <div class="duo-caption">
              <strong>${fossil.commonName}</strong>
              <span>Životná rekonštrukcia v plnej veľkosti</span>
            </div>
          </div>

          <div class="gallery-duo-item" id="duo-fossil-card" role="button" tabindex="0" title="Zobraziť fosíliu vo vitrínke">
            <div class="duo-img-wrap">
              <img src="${fossil.fossilImage}" alt="Skutočná fosília vo vitrínke">
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
            <!-- Prepínač medzi fotorealistickým zobrazením a technickou schémou -->
            <div class="scale-mode-header">
              <div class="scale-mode-switcher" role="group" aria-label="Režim porovnania veľkosti">
                <button type="button" class="scale-mode-btn active" id="btn-scale-real">
                  <span>📸</span> Realistické porovnanie
                </button>
                <button type="button" class="scale-mode-btn" id="btn-scale-svg">
                  <span>📐</span> Vedecká schéma (SVG)
                </button>
              </div>
            </div>

            <!-- 1. Fotorealistické porovnanie v plnej kráse (Predvolené) -->
            <div class="real-scale-container" id="real-scale-view" role="button" tabindex="0" title="Kliknite pre otvorenie v plnom zobrazení na celú obrazovku">
              <div class="real-scale-stage">
                <img src="${fossil.scaleImage || fossil.creatureImage}" alt="Realistické porovnanie veľkosti - ${fossil.commonName}" class="real-scale-img" id="scale-comparison-img">
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

            <!-- 2. Vedecký siluetový diagram v reálnej mierke (Voliteľné) -->
            <div class="silhouette-stage" id="svg-scale-view" style="display: none;">
              ${getScaleSilhouetteSvg(fossil)}
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
    fossilDialog.showModal();
    modalContentContainer.scrollTop = 0;

    let currentModalView = 'creature';

    // Logika prepínania medzi fotkou fosílie a rekonštrukciou tvora
    const heroContainer = document.getElementById('modal-header-hero');
    const heroImg = document.getElementById('modal-hero-img');
    const heroBackdrop = document.getElementById('modal-hero-backdrop');
    const btnViewFossil = document.getElementById('btn-view-fossil');
    const btnViewCreature = document.getElementById('btn-view-creature');
    const duoFossilCard = document.getElementById('duo-fossil-card');
    const duoCreatureCard = document.getElementById('duo-creature-card');
    const btnToggleFit = document.getElementById('btn-toggle-fit');
    const labelToggleFit = document.getElementById('label-toggle-fit');
    const btnOpenLightbox = document.getElementById('btn-open-lightbox');

    function switchView(viewType) {
      currentModalView = viewType;
      if (viewType === 'fossil') {
        heroImg.src = fossil.fossilImage;
        heroImg.alt = fossil.fossilType;
        if (heroBackdrop) heroBackdrop.style.backgroundImage = `url('${fossil.fossilImage}')`;
        btnViewFossil.classList.add('active');
        btnViewCreature.classList.remove('active');
        duoFossilCard.classList.add('active');
        duoCreatureCard.classList.remove('active');
      } else {
        heroImg.src = fossil.creatureImage;
        heroImg.alt = `Rekonštrukcia ${fossil.commonName}`;
        if (heroBackdrop) heroBackdrop.style.backgroundImage = `url('${fossil.creatureImage}')`;
        btnViewCreature.classList.add('active');
        btnViewFossil.classList.remove('active');
        duoCreatureCard.classList.add('active');
        duoFossilCard.classList.remove('active');
      }
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

    // Prepínanie režimu fotorealistického porovnania vs. SVG diagram
    const btnScaleReal = document.getElementById('btn-scale-real');
    const btnScaleSvg = document.getElementById('btn-scale-svg');
    const realScaleView = document.getElementById('real-scale-view');
    const svgScaleView = document.getElementById('svg-scale-view');

    if (btnScaleReal && btnScaleSvg && realScaleView && svgScaleView) {
      btnScaleReal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btnScaleReal.classList.add('active');
        btnScaleSvg.classList.remove('active');
        realScaleView.style.display = 'block';
        svgScaleView.style.display = 'none';
      });

      btnScaleSvg.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btnScaleSvg.classList.add('active');
        btnScaleReal.classList.remove('active');
        realScaleView.style.display = 'none';
        svgScaleView.style.display = 'block';
      });
    }

    // Kliknutie na fotorealistické porovnanie otvorí celoobrazovkový Lightbox
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
        lightboxImg.src = fossil.scaleImage || fossil.creatureImage;
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
      lightboxImg.src = isFossil ? fossil.fossilImage : fossil.creatureImage;
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
      if (fossilDialog.open) fossilDialog.close();
      return;
    }

    const fossil = FOSSILS_DATA.find(f => f.id === hash);
    if (fossil) {
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
