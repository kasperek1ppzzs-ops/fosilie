# 🦖 Prehistorická vitrína (Kabinet fosílií)

> Interaktívny mobilný sprievodca pre hostí k vašej domácej vitrínke s fosíliami a dinosaurami.  
> Stačí naskenovať QR kód na vitríne a návštevníkovi sa v mobile okamžite otvorí elegantný múzejný katalóg s paleontologickými kartami exponátov, ich vekom a príbehmi.

---

## 🌟 Hlavné funkcie

- **📱 Optimalizované pre smartfóny hostí:** Bleskové načítanie, moderný tmavý múzejný dizajn (Museum Dark Vault), bez nutnosti inštalovať akúkoľvek aplikáciu.
- **🦴 Paleontologické karty exponátov:** Každá fosília obsahuje:
  - Zvýraznený box **„Čo vidíte vo vitrínke“** (napr. typ zubu, zachovaná sklovina, koreň, štruktúra kosti).
  - Geologické obdobie a presný vek (Krieda, Jura, Devón, milióny rokov).
  - Lokalitu nálezu (Kem Kem Maroko, Hell Creek USA, atď.).
  - Rozmery tvora, stravu a životný štýl.
  - Zaujímavý príbeh a rýchle vedecké fakty.
- **🔍 Inteligentné filtrovanie a vyhľadávanie:** Okamžité hľadanie podľa názvu, lokality či typu zubu a rýchle filtre (Dravé dinosaury, Bylinožravce, Morské tvory, Bezstavovce).
- **🖨️ Integrovaný generátor QR štítku na vitrínu:** Priamo na webe kliknite na tlačidlo **„QR kód na vitrínu“** a získate pripravenú múzejnú plaketu na vytlačenie (formát do rámika alebo na sklo).
- **⚡ 100 % čistý statický web:** Žiadne zložité inštalácie ani databázy, pripravené na bezplatný hosting cez **GitHub Pages**.

---

## 📂 Štruktúra súborov

```text
Fosilie/
├── index.html       # Hlavná stránka sémantického HTML5
├── style.css        # Luxusný múzejný vizuál s animáciami a print štýlom
├── app.js           # Logika filtrovania, modálov a generovania QR kódu
├── data.js          # 💡 Tu meníte a pridávate vaše fosílie a texty
├── assets/          # Fotografie a ilustrácie fosílií (JPG/PNG)
│   ├── spinosaurus.jpg  # Spinosaurus aegyptiacus (zub dravého dinosaura)
│   ├── mosasaurus.jpg   # Mosasaurus (zub morského dravca)
│   ├── otodus.jpg       # Otodus obliquus (zub pravekého žraloka)
│   ├── amber.jpg        # Jantár s hmyzom (fosilizovaná živica s inklúziou)
│   └── trilobite.jpg    # Trilobit (morský článkonožec)
└── README.md        # Tento návod
```

---

## 🚀 1. Ako stránku okamžite vyskúšať v počítači

Jednoducho dvakrát kliknite na súbor `index.html` a otvorí sa vo vašom webovom prehliadači (Chrome, Edge, Firefox).

---

## ✏️ 2. Ako upraviť texty a doplniť vlastné fosílie

Všetky informácie o fosíliách sú prehľadne uložené v súbore [`data.js`](file:///c:/Users/Peter%20Kašperek/Desktop/Peter/Fosilie/data.js).

### Príklad úpravy alebo pridania fosílie:
Otvorte `data.js` v akomkoľvek textovom editore. Každá fosília má túto jednoduchú štruktúru:

```javascript
{
  id: "spinosaurus",                          // Unikátne ID (bez diakritiky)
  name: "Spinosaurus aegyptiacus",             // Vedecký latinský názov
  commonName: "Spinosaurus",                  // Známy bežný názov
  category: "carnivore",                      // Kategória: carnivore | herbivore | marine | invertebrate
  fossilType: "Fosílny zub s ryhovanou sklovinou", // Čo presne máte vo vitrínke
  period: "Krieda (Cenoman)",                 // Geologické obdobie
  age: "cca 95 – 100 miliónov rokov",         // Vek fosílie
  location: "Kem Kem, Maroko",                // Kde bola nájdená
  dimensions: "Dĺžka: 15 m | Hmotnosť: 8 t",  // Rozmery tvora
  diet: "Mäsožravec & Rybožravec",            // Potrava
  highlight: "Najdlhší dravý dinosaurus!",     // Krátky ťahák pre hostí
  fossilDescription: "Popis vášho kusu...",   // Zlatý box vo vitrínke
  story: "Príbeh o živote dinosaura...",      // Čítanie pre zvedavých
  quickFacts: [                               // Odrážky
    { label: "Biotop", value: "Riečne delty" }
  ],
  image: "assets/spinosaurus.jpg",            // Cesta k fotke
  badgeColor: "#f59e0b"                       // Farba odznaku
}
```

> **Tip pre vlastné fotografie:** Odfoťte svoju fosíliu mobilom na tmavom alebo neutrálnom podklade, uložte fotku do priečinka `assets/` (napr. `assets/moj_zub_trex.jpg`) a v `data.js` nastavte `image: "assets/moj_zub_trex.jpg"`.

---

## 🌐 3. Ako stránku bezplatne publikovať na GitHub Pages (krok za krokom)

GitHub Pages vám poskytne bezplatnú, trvalú a rýchlu webovú adresu (napr. `https://vase-meno.github.io/fosilie/`), ktorá nikdy neexpiruje.

### Možnosť A: Cez webové rozhranie GitHub (bez inštalácie Gitu)
1. Prihláste sa na [github.com](https://github.com).
2. Vpravo hore kliknite na **+** ➔ **New repository**.
3. Pomenujte repozitár napríklad `fosilie` (nastavte **Public**) a kliknite **Create repository**.
4. Na novej stránke kliknite na odkaz **uploading an existing file**.
5. Presuňte myšou všetky súbory z tohto priečinka (`index.html`, `style.css`, `app.js`, `data.js` a priečinok `assets`) do okna GitHubu.
6. Kliknite na zelené tlačidlo **Commit changes**.
7. V hornom menu repozitára prejdite do **Settings** ➔ v ľavom paneli kliknite na **Pages**.
8. V sekcii **Build and deployment** pri **Branch** vyberte vetvu `main` a priečinok `/(root)`, potom kliknite **Save**.
9. Do 1–2 minút vám GitHub zobrazí zelenú správu s adresou vášho webu:  
   `https://<vase-pouzivatelske-meno>.github.io/fosilie/`

### Možnosť B: Cez príkazový riadok (Git)
```bash
git init
git add .
git commit -m "Prvá verzia paleontologickej vitrínky"
git branch -M main
git remote add origin https://github.com/<vase-meno>/fosilie.git
git push -u origin main
```
Následne v Settings ➔ Pages aktivujte vetvu `main`.

---

## 🏷️ 4. Prepojenie s vaším QR kódom

Keď stránku zverejníte na GitHub Pages (alebo inom hostingu), získate jej stálu webovú adresu (napr. `https://<vase-meno>.github.io/fosilie/`).

Tento odkaz jednoducho vložíte do ľubovoľného vlastného generátora QR kódov (či už na vytlačenie nálepky, malej tabuľky, alebo dizajnu v Canve) a umiestnite ho priamo na vitrínu. Keď kód návštevník naskenuje, zobrazí sa mu priamo táto optimalizovaná mobilná stránka.
