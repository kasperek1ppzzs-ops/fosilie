/**
 * ============================================================================
 * DATABÁZA FOSÍLIÍ VO VITRÍNKE (BOHATÉ VEDECKÉ A NÁVŠTEVNÍCKE DETAILY)
 * ============================================================================
 */

const FOSSILS_DATA = [
  {
    id: "spinosaurus",
    name: "Spinosaurus aegyptiacus",
    commonName: "Spinosaurus",
    category: "dinosaurs",
    fossilType: "Originálny fosílny zub s ryhovanou sklovinou",
    period: "Krieda (Cenoman)",
    shortPeriod: "Krieda (98 mil. r.)",
    age: "cca 95 – 100 miliónov rokov",
    location: "Formácia Kem Kem, Sahara, Maroko",
    dimensions: "Dĺžka tela: 14 – 15 m | Výška: 4,5 – 5 m | Hmotnosť: 7 – 8 ton",
    diet: "Mäsožravec & Rybožravec (poloakvatický vodný život)",
    highlight: "Najdlhší dravý dinosaurus histórie – o vyše 2 metre dlhší než T-Rex!",
    
    // Porovnanie s priemerným človekom (1,8 m)
    sizeComparison: {
      humanHeight: "1,8 m",
      creatureLength: "15,0 m",
      lengthRatio: "8,3× dlhší než dospelý človek",
      weightInHumans: "cca 100 dospelých ľudí (8 ton)",
      scalePercentage: 100, // max škála
      humanScalePercentage: 12, // 1.8 / 15 * 100
      funAnalogy: "Spinosaurus bol dlhší než celý kĺbový mestský autobus. Dospelý človek (1,8 m) by mu siahal sotva po kolenný kĺb a jeho samotná hlava (1,75 m) bola takmer taká dlhá ako celá postava dospelého muža!"
    },

    fossilDescription: "Na tento zub sa pozeráte vo vitrínke: Má typický kužeľovitý tvar a po celej dĺžke jemné pozdĺžne ryhovanie. Na rozdiel od T-Rexa nemal Spinosaurus zuby stavané na drvenie kostí, ale hladké kužeľovité 'harpúny' určené na bleskové zovretie klzkých obrovských rýb a pravekých krokodílov.",
    story: "Spinosaurus bol fascinujúci riečny gigant s takmer 2-metrovou chrbtovou plachtou podopieranou predĺženými stavcami. Žil v močaristých riečnych mangrovoch severnej Afriky v čase, keď bola dnešná Sahara plná obrovských riek a jazier. Jeho čumák pripomínal moderného krokodíla – gaviála.",
    
    // Bohaté zaujímavosti a pikošky
    trivia: [
      {
        tag: "🎬 MÝTY VS. REALITA",
        title: "Súboj s T-Rexom v Jurskom parku III je výmysel",
        text: "V slávnom filme z roku 2001 Spinosaurus v epickom súboji zlomil väz T-Rexovi. V realite by sa títo dvaja obri nikdy nestretli: Spinosaurus žil v Afrike pred 95 miliónmi rokov, kým T-Rex vládol v Severnej Amerike o takmer 30 miliónov rokov neskôr! Navyše, Spinosaurus bol špecialista na vodu a na súši by nemal proti robustnému T-Rexovi šancu."
      },
      {
        tag: "🐊 DETEKTOR VIBRÁCIÍ",
        title: "Lovil v tme vďaka senzorom v čumáku",
        text: "Na špičke jeho rypáka objavili vedci sieť drobných jamiek spojených s trojklanným nervom. Boli to tlakové elektro-senzory identické s tými, aké majú dnešné krokodíly. Spinosaurus ponoril špičku čeľuste do kalnej rieky a presne cítil pohyb ryby aj v úplnej tme."
      },
      {
        tag: "🐟 ČO TENTO ZUB DRVIL",
        title: "Lovil 8-metrovú gigantickú piliarku",
        text: "Jeho najčastejšou korisťou v riekach Kem Kem bola obria praveká raja Onchopristis – ryba dlhá až 8 metrov s 2,5-metrovým ozubeným rypákom. Zub vo vašej vitrínke bol presne stavaný na to, aby túto obriu klzkú rybu udržal."
      },
      {
        tag: "🏊 VEĽKÝ OBJAV ROKA 2020",
        title: "Prvý dinosaurus s lodnou skrutkou",
        text: "Celé desaťročia sa myslelo, že dinosaury boli výlučne suchozemské tvory. V roku 2020 však tím paleontológa Nizara Ibrahima našiel v Maroku takmer kompletný chvost Spinosaurusa – bol vysoký a plochý ako pádlo mloka! Spinosaurus ním vo vode kmital zo strany na stranu a plával ako krokodíl."
      },
      {
        tag: "☀️ ZÁHADA PLACHTY",
        title: "Klimatizácia aj obrovský billboard",
        text: "Chrbtová plachta vysoká až 1,8 metra bola husto pretkaná cievami. Ráno sa dinosaurus otočil bokom k vychádzajúcemu slnku a rýchlo si zohrial krv. Zároveň slúžila ako vizuálny signál partnerom a konkurentom – vo vode z neho trčala ako obrovská lodná plachta."
      }
    ],

    fossilImage: "assets/spinosaurus_fossil.jpg",
    creatureImage: "assets/spinosaurus_life.jpg",
    scaleImage: "assets/scale_spinosaurus.jpg",
    image: "assets/spinosaurus_life.jpg",
    badgeColor: "#f59e0b"
  },
  {
    id: "mosasaurus",
    name: "Mosasaurus beaugei / hoffmanni",
    commonName: "Mosasaurus",
    category: "marine",
    fossilType: "Originálny zub morského dravca v matici",
    period: "Neskorá krieda (Maastricht)",
    shortPeriod: "Krieda (70 mil. r.)",
    age: "cca 66 – 72 miliónov rokov",
    location: "Fosfátové bane Khouribga, Maroko",
    dimensions: "Dĺžka tela: 13 – 15 m | Hmotnosť: 12 – 14 ton",
    diet: "Morský vrcholový predátor (ammonity, morské korytnačky, žraloky)",
    highlight: "Skutočný pán kriedových oceánov – príbuzný varana komodského.",

    sizeComparison: {
      humanHeight: "1,8 m",
      creatureLength: "14,0 m",
      lengthRatio: "7,8× dlhší než človek",
      weightInHumans: "cca 170 dospelých ľudí (14 ton)",
      scalePercentage: 93,
      humanScalePercentage: 12,
      funAnalogy: "Jeho lebka mala takmer 2 metre – dospelý človek by sa do jeho otvorenej tlamy zmestil vystretý celý bez toho, aby sa musel skrčiť. Na jedno prehltnutie by pohltil celého dospelého muža."
    },

    fossilDescription: "Na tento zub sa pozeráte vo vitrínke: Masívny, ťažký zub s tmavou lesklou sklovinou a dvoma ostrými reznými hranami (karínami). V čeľustiach vyvíjal drvivý tlak potrebný na prelomenie hrubých pancierov pravekých morských korytnačiek a schránok amonitov.",
    story: "Hoci Mosasaurus žil v rovnakom čase ako dinosaury, paleontologicky to dinosaurus nebol. Bol to plnohodnotný morský plaz z radu Squamata, ktorého dnešnými žijúcimi bratrancami sú varany a hady. Namiesto nôh mal hydrodynamické pádla a mocný chvost so žraločou plutvou.",

    trivia: [
      {
        tag: "🐍 HADIE ČEĽUSTE",
        title: "Pohyblivá spodná čeľusť ako veľhad",
        text: "Jeho spodná čeľusť mala uprostred prídavný kĺb (intramandibulárny kĺb). Vďaka nemu dokázal čeľusť roztiahnuť do strán a prehltnúť korisť výrazne širšiu, než bola jeho vlastná hlava – presne tak, ako to dnes robia pytóny a anakondy."
      },
      {
        tag: "🦷 DVOJITÉ POSCHODIE ZUBOV",
        title: "Pterygoidné zuby v hrdle: Žiadny únik",
        text: "Okrem zubov na okrajoch čeľustí mal Mosasaurus na hornom podnebí ešte druhý menší rad zakrivených zubov. Tieto zuby smerovali šikmo do hrdla. Keď korisť v tme chytil, druhé poschodie zubov jej fyzicky bránilo vycúvať von, zatiaľ čo ju posúval do žalúdka."
      },
      {
        tag: "🐢 ZUB NA DRVENIE PANCEROV",
        title: "Prehrýzol pancier korytnačky Allopleuron",
        text: "Zub vo vašej vitrínke nemá jemné pílkovanie na mäso ako žralok, ale pevnú masívnu stavbu. Mosasaury sa špecializovali na lámanie pancierov 3-metrových korytnačiek a hrubých schránok amonitov – mnohé fosílie amonitov majú dodnes zachované stopy po odtlačkoch zubov Mosasaura!"
      },
      {
        tag: "🫁 DÝCHAL PĽÚCAMI",
        title: "Musel plávať na hladinu po každý nádych",
        text: "Nemal žiabre ako ryby, ale pľúca ako veľryby a tulene. Každých 15 až 30 minút sa musel vynoriť na hladinu teplého kriedového mora, aby sa zhlboka nadýchol, a potom sa znova ponoril loviť do hĺbok."
      },
      {
        tag: "💥 KONIEC KRÁĽOVSTVA",
        title: "Zahynul spolu s dinosaurami",
        text: "Mosasaury boli na vrchole potravného reťazca až do chvíle, keď pred 66 miliónmi rokov zasiahol Zem asteroid Chicxulub. Kolaps morského fytoplanktónu a vyhynutie amonitov znamenalo okamžitý zánik tohto morského vládcu."
      }
    ],

    fossilImage: "assets/mosasaurus_fossil.jpg",
    creatureImage: "assets/mosasaurus_life.jpg",
    scaleImage: "assets/scale_mosasaurus.jpg",
    image: "assets/mosasaurus_life.jpg",
    badgeColor: "#0ea5e9"
  },
  {
    id: "otodus",
    name: "Otodus obliquus",
    commonName: "Žralok Otodus",
    category: "marine",
    fossilType: "Originálny fosílny zub s postrannými hrotmi (cusplets)",
    period: "Paleocén až Eocén (staršie treťohory)",
    shortPeriod: "Eocén (50 mil. r.)",
    age: "cca 45 – 55 miliónov rokov",
    location: "Fosfátové panvy Oulad Abdoun, Khouribga, Maroko",
    dimensions: "Dĺžka tela: 9 – 12 m | Hmotnosť: 15 – 20 ton",
    diet: "Vrcholový lovec morí (veľké kostnaté ryby, morské korytnačky, predkovia veľrýb)",
    highlight: "Priamy evolučný dedko slávneho obrieho Megalodona!",

    sizeComparison: {
      humanHeight: "1,8 m",
      creatureLength: "11,0 m",
      lengthRatio: "6,1× dlhší než človek",
      weightInHumans: "cca 200 dospelých ľudí (16 ton)",
      scalePercentage: 73,
      humanScalePercentage: 12,
      funAnalogy: "Otodus bol viac ako 2-krát dlhší a 6-krát ťažší než dnešný najväčší obávaný biely žralok (Carcharodon carcharias). Plavec v mori by pri ňom pôsobil ako bezbranná drobná návnada."
    },

    fossilDescription: "Na tento zub sa pozeráte vo vitrínke: Má dokonale rozpoznateľný tvar: širokú centrálnu trojuholníkovú korunku s hladkým ostrím, masívny dvojlaločný koreň a po oboch stranách charakteristické pomocné bočné hroty (tzv. cusplets). Tie slúžili na zachytenie klzkej koristi.",
    story: "Po vyhynutí Mosasaurov a dinosaurov zostali svetové oceány bez vrcholového predátora. Prázdne miesto okamžite zaplnili obrovské makrelové žraloky rodu Otodus. Stal sa nespochybniteľným kráľom morí v starších treťohorách.",

    trivia: [
      {
        tag: "🧬 EVOLÚCIA K MEGALODONOVI",
        title: "Ako sa z tohto zuba vyvinul Megalodon",
        text: "Zub vo vašej vitrínke je kľúčovým dôkazom evolúcie. Počas nasledujúcich 30 miliónov rokov sa z druhu Otodus obliquus cez medzičlánky (Otodus auriculatus a Otodus chubutensis) vyvinul gigantický Otodus megalodon. Postranné hroty sa postupne zmenšovali, hrany dostali pílkovanie a korunka narástla až na 18 centimetrov!"
      },
      {
        tag: "🏜️ ŽRALOK UPROSTRED PÚŠTE",
        title: "Prečo sa marocká púšť hemží žraločími zubami",
        text: "Zub vo vašej vitrínke bol nájdený v baniach Khouribga uprostred marockého sucha. Pred 50 miliónmi rokov však na tomto mieste ležal praveký oceán Tethys. Po jeho ústupe sa v usadeninách fosfátov zakonzervovali miliardy zubov vďaka vysokému obsahu vápnika a fosfóru."
      },
      {
        tag: "🦷 TOVÁREŇ NA ZUBY",
        title: "Za život vymenil vyše 20 000 zubov",
        text: "Žraloky nemajú kosti, ale chrupavku, preto po nich takmer nikdy neostane kostra. Ich zuby však kryje extrémne tvrdá fluorapatitová sklovina. Žralok mal v ústach 5 až 6 radov zubov za sebou – keď sa predný opotreboval alebo zlomil o kosť, do niekoľkých dní ho nahradil zub z druhej rady ako na bežiacom páse."
      },
      {
        tag: "🐋 LOVEC PRVÝCH VEĽRÝB",
        title: "Postrach pravekých kytovcov",
        text: "V období eocénu sa prví suchozemskí cicavci začali vracať do vody a vyvíjali sa z nich prvé praveké veľryby (Basilosaurus, Dorudon). Otodus obliquus bol ich hlavným predátorom, ktorý reguloval ich populácie v oceánoch."
      }
    ],

    fossilImage: "assets/otodus_fossil.jpg",
    creatureImage: "assets/otodus_life.jpg",
    scaleImage: "assets/scale_otodus.jpg",
    image: "assets/otodus_life.jpg",
    badgeColor: "#06b6d4"
  },
  {
    id: "amber",
    name: "Fosilizovaná živica s inklúziou",
    commonName: "Jantár s hmyzom",
    category: "invertebrates",
    fossilType: "Prírodný jantár s dokonale zakonzervovaným pravekým hmyzom",
    period: "Eocén (cca 40 – 50 mil. r.) / Krieda (až 99 mil. r.)",
    shortPeriod: "Eocén (45 mil. r.)",
    age: "cca 45 miliónov rokov",
    location: "Oblasť Baltského mora / Kachin, Mjanmarsko",
    dimensions: "Veľkosť inklúzie: 2 – 6 mm v jantárovom kameni",
    diet: "Rôznorodé podľa druhu hmyzu",
    highlight: "Skutočná 3D biologická časová kapsula – zachované krídla, oči aj chĺpky!",

    sizeComparison: {
      humanHeight: "1,8 m (1 800 mm)",
      creatureLength: "4 mm (0,004 m)",
      lengthRatio: "Človek je 450× väčší než uväznený hmyz",
      weightInHumans: "Hmyz váži len zlomok gramu",
      scalePercentage: 4,
      humanScalePercentage: 100,
      funAnalogy: "Uväznený tvorček meria len pár milimetrov. Kým človek žije v priemere 75 rokov, tento drobný hmyz bol zakonzervovaný zaživa a odpočíva v zlatej živici už vyše 45 000 000 rokov – od doby, kedy po Zemi nekráčal ani jediný predok človeka!"
    },

    fossilDescription: "Na tento exponát sa pozeráte vo vitrínke: Priesvitný zlatistý jantár s nepriedušne zakonzervovaným pravekým hmyzom. Na rozdiel od kamenných fosílií, kde tlak zničil mäkké časti, tu živica obalila hmyz bez prístupu kyslíka. Pod lupou môžete vidieť jemnú štruktúru krídel, články tykadiel a zložené oči.",
    story: "Jantár nie je minerál, ale skamenená organická živica pravekých ihličnanov (najmä Pinus succinifera). Keď sa strom poranil, vylučoval lepkavú aromatickú živicu, ktorá slúžila ako obrana proti škodcom. Pre drobný hmyz sa však stala dokonalou smrteľnou pascou.",

    trivia: [
      {
        tag: "⚡ ELEKTRICKÝ DRAHOKAM",
        title: "Pomenoval elektrinu: Grécke slovo Elektron",
        text: "Starovekí Gréci si všimli, že keď jantár pošúchajú o vlnu, priťahuje drobné pierka a prach. Vytvára totiž statický náboj. Starogrécke slovo pre jantár je 'élektron' – a práve z tohto fosílneho kameňa vzniklo moderné slovo 'elektrina'!"
      },
      {
        tag: "🧪 JURSKÝ PARK: DÁ SA ZÍSKAŤ DNA?",
        title: "Čo o tom hovorí skutočná moderná veda",
        text: "Michael Crichton vo filme Jurský park vymyslel, že vedci extrahovali krv dinosaura z komára v jantári. Realita: Molekula DNA má polčas rozpadu len 521 rokov a po 1,5 milióne rokov je úplne nečitateľná. Z 45-miliónového jantáru teda dinosaura naklonovať nevieme, no mikroskopická anatómia hmyzu je zachovaná do najmenších detailov."
      },
      {
        tag: "🌊 SKÚŠKA PRAVOSTI SOĽOU",
        title: "Ako zistiť, či máte pravý jantár alebo plast",
        text: "Pravý jantár má špecifickú hmotnosť len 1,05 – 1,10 g/cm³. Ak ho hodíte do nasýteného roztoku kuchynskej soli vo vode (cca 2 polievkové lyžice soli na pohár vody), pravý jantár vypláva na hladinu ako korok! Plastové a sklenené falzifikáty okamžite klesnú na dno."
      },
      {
        tag: "🌲 PRAVEKÝ LES SUCCINIFERA",
        title: "Ako vzniklo 'Zlato severu'",
        text: "Pred 45 miliónmi rokov rástol na severe Európy subtropický prales. Teploty boli omnoho vyššie než dnes a stromy produkovali gigantické množstvá živice. Keď prales zaplavilo Baltské more, rieky splavili živicu do morských sedimentov, kde bez prístupu vzduchu stvrdla na jantár."
      }
    ],

    fossilImage: "assets/amber_fossil.jpg",
    creatureImage: "assets/amber_life.jpg",
    scaleImage: "assets/scale_amber.jpg",
    image: "assets/amber_life.jpg",
    badgeColor: "#eab308"
  },
  {
    id: "trilobite",
    name: "Phacops rana / Flexicalymene ouzregui",
    commonName: "Trilobit",
    category: "invertebrates",
    fossilType: "Kompletný trojlaločný pancier článkonožca v hornine",
    period: "Devón / Ordovik (staršie prvohory)",
    shortPeriod: "Devón (420 mil. r.)",
    age: "cca 390 – 450 miliónov rokov",
    location: "Pohorie Atlas (Alnif / Erfoud), Maroko",
    dimensions: "Dĺžka: 5 – 8 cm | Šírka: 3 – 5 cm",
    diet: "Dnový živočích (detrit, drobné morské červy a mikroorganizmy)",
    highlight: "O vyše 200 miliónov rokov starší než prví dinosauri na Zemi!",

    sizeComparison: {
      humanHeight: "1,8 m (180 cm)",
      creatureLength: "6,5 cm",
      lengthRatio: "Človek je 28× vyšší než dĺžka tohto trilobita",
      weightInHumans: "Váži pár desiatok gramov",
      scalePercentage: 15,
      humanScalePercentage: 100,
      funAnalogy: "Trilobit sa pohodlne zmestí do ľudskej dlane ruky. Najfascinujúcejší je však časový pomer: Medzi týmto trilobitom a T-Rexom ubehlo VIAC času (350 miliónov rokov), než koľko času ubehlo medzi T-Rexom a dnešným dňom (66 miliónov rokov)!"
    },

    fossilDescription: "Na túto fosíliu sa pozeráte vo vitrínke: Pevný kalcitový exoskelet dokonale rozdelený na tri pozdĺžne laloky (tri-lobos) a tri priečne časti: hlavový štít (cephalon) s klenutými očami, článkovaný ohybný trup (thorax) a koncový chvostík (pygidium).",
    story: "Trilobity patrili k najúspešnejším tvorom v histórii života na Zemi. Objavili sa počas Kambrickej explózie pred vyše 520 miliónmi rokov a kraľovali moriam neuveriteľných 270 miliónov rokov (pre porovnanie: moderný človek Homo sapiens existuje sotva 300 000 rokov).",

    trivia: [
      {
        tag: "💎 OČI Z ČISTÉHO KRÝŠTÁĽU",
        title: "Prvé optické šošovky z anorganického minerálu",
        text: "Trilobity boli prvými tvormi na Zemi s komplexným zrakom. Ich oči neboli z mäkkého tkaniva, ale z priehľadných kryštálov kalcitu (uhličitanu vápenatého)! Tieto minerálne šošovky boli dokonale opticky tvarované tak, aby korigovali sférickú aberáciu vo vode – princíp, ktorý ľudskí matematici (Huygens a Descartes) odvodili až v 17. storočí!"
      },
      {
        tag: "🛡️ OBRANNÁ GUĽÔČKA",
        title: "Zvinul sa ako moderný ježko či pásavec",
        text: "Keď trilobita napadol obrí praveký dravý hlavonožec (Orthoceras), trilobit ohnul svoje brušné články a zvinul sa do pevnej nepriestrelnej guličky. Chvostík presne zapadol do zárezu pod hlavou a mäkké nohy s žiabrami ostali bezpečne chránené vnútri panciera."
      },
      {
        tag: "👑 PREŽILI 270 MILIÓNOV ROKOV",
        title: "Prežili dve masové vymierania, tretie ich zničilo",
        text: "Boli svedkami vzniku prvých rýb, prvých suchozemských rastlín aj prvých štvornožcov. Prežili ordovické aj devónske vymieranie. Ich osud spečatilo až 'Veľké permské vymieranie' pred 252 miliónmi rokov, kedy masívna sopečná činnosť na Sibíri otrávila moria a vyhladila 95 % morských druhov."
      },
      {
        tag: "⛏️ HLAVNÉ MESTO TRILOBITOV",
        title: "Ako Berberovia vysekávajú fosílie v Alnife",
        text: "Váš exemplár pochádza z okolia oázy Alnif na okraji Sahary. Domáci berberskí zberači tam ručne kladivami otvárajú vápencové konkrécie. Keď kameň praskne presne pozdĺž panciera, nasledujú desiatky hodín jemnej práce pod mikroskopom s pneumatickými ihlami, aby odhalili každý jeden článok a očné šošovky."
      }
    ],

    fossilImage: "assets/trilobite_fossil.jpg",
    creatureImage: "assets/trilobite_life.jpg",
    scaleImage: "assets/scale_trilobite.jpg",
    image: "assets/trilobite_life.jpg",
    badgeColor: "#d97706"
  }
];

const CATEGORIES = {
  all: "Všetky exponáty",
  dinosaurs: "Dinosaury",
  marine: "Morské plazy & žraloky",
  invertebrates: "Článkonožce & jantár"
};
