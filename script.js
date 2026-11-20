
const WHATSAPP_NUMBER = "393206323345";
const PHONE_NUMBER = "+390832655300";
const BUSINESS_TIME_ZONE = "Europe/Rome";

function getContactAvailability(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: BUSINESS_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hourCycle: "h23"
  });
  const parts = formatter.formatToParts(now);
  const part = type => parts.find(item => item.type === type).value;
  const hour = Number(parts.find(part => part.type === "hour").value);
  const minute = Number(parts.find(part => part.type === "minute").value);
  const minutesSinceMidnight = hour * 60 + minute;
  return {
    whatsapp: minutesSinceMidnight >= 1 && minutesSinceMidnight < 19 * 60,
    phone: minutesSinceMidnight >= 19 * 60,
    minutesSinceMidnight,
    businessDate: `${part("year")}-${part("month")}-${part("day")}`
  };
}

function bookingRequiresPhone(dateValue, availability = getContactAvailability()) {
  return dateValue === availability.businessDate && availability.phone;
}

function isWhatsAppOrderingOpen(pickupDate = pickupDateInput?.value) {
  const availability = getContactAvailability();
  if (pickupDate && pickupDate > availability.businessDate) return true;
  return pickupDate === availability.businessDate && availability.whatsapp;
}

function isCartBuildingOpen() {
  return true;
}

const categoryOrder = [
  "Le nostre proposte",
  "Le classiche",
  "Le pucce",
  "Le grigliate",
  "Stuzzica nell'attesa",
  "Birre",
  "Vini",
  "Bevande",
  "I dolci"
];

const menu = [
  // LE CLASSICHE
  {id:1,name:"Margherita",category:"Le classiche",price:5.50,description:"Pomodoro, mozzarella, olive, origano"},
  {id:104,name:"Tipo Piadina",category:"Le classiche",price:3,description:"Base tipo piadina"},
  {id:2,name:"Diavola",category:"Le classiche",price:6.50,description:"Pomodoro, mozzarella, salamino piccante, origano"},
  {id:3,name:"Napoli",category:"Le classiche",price:7,description:"Pomodoro, mozzarella, capperi, alici, olive nere, origano"},
  {id:4,name:"Bufalina",category:"Le classiche",price:7,description:"Pomodoro, mozzarella di bufala, basilico"},
  {id:5,name:"Quattro Stagioni",category:"Le classiche",price:8,description:"Pomodoro, mozzarella, funghi, carciofi, prosciutto cotto, origano"},
  {id:6,name:"Kebab",category:"Le classiche",price:7,description:"Pomodoro, mozzarella, kebab, salsa kebab"},
  {id:7,name:"Calzone",category:"Le classiche",price:7,description:"Pomodoro, mozzarella, funghi, prosciutto cotto, capperi"},
  {id:8,name:"Quattro Formaggi",category:"Le classiche",price:8,description:"Pomodoro, mozzarella, emmental, scamorza affumicata, gorgonzola, origano"},
  {id:9,name:"Capricciosa",category:"Le classiche",price:8,description:"Pomodoro, mozzarella, funghi, carciofi, prosciutto cotto, capperi, olive nere, origano"},
  {id:10,name:"Radicchio e Gorgonzola",category:"Le classiche",price:7.50,description:"Pomodoro, mozzarella, radicchio, gorgonzola, origano"},
  {id:101,name:"Tonno e cipolla",category:"Le classiche",price:8,description:"Pomodoro, mozzarella, tonno, cipolla, origano"},
  {id:102,name:"Patapizza",category:"Le classiche",price:6.50,description:"Pomodoro, mozzarella, patatine"},
  {id:103,name:"Wurstel e patatine",category:"Le classiche",price:7.50,description:"Pomodoro, mozzarella, wurstel, patatine"},
  {id:12,name:"Funghi Misti",category:"Le classiche",price:8,description:"Pomodoro, mozzarella, porcini, funghi sott'olio, origano"},
  {id:15,name:"Salsiccia Friarielli",category:"Le classiche",price:8.50,description:"Pomodoro, mozzarella, salsiccia fresca, friarielli, origano"},
  {id:16,name:"Completa",category:"Le classiche",price:9,description:"Pomodoro, mozzarella, funghi, carciofi, prosciutto cotto, capperi, tonno, alici, olive, origano"},
  {id:17,name:"Salsiccia e Porcini",category:"Le classiche",price:8.50,description:"Pomodoro, mozzarella, salsiccia fresca, funghi porcini, origano"},

  // LE NOSTRE PROPOSTE
  {id:20,name:"Pezzetti",category:"Le nostre proposte",price:8,description:"Pomodoro, mozzarella, pezzetti di cavallo"},
  {id:21,name:"Marinara",category:"Le classiche",price:8,description:"Pomodoro, mozzarella, surimi, calamari, origano"},
  {id:23,name:"Vegetariana",category:"Le nostre proposte",price:8.50,description:"Pomodoro, mozzarella, funghi, carciofi, capperi, peperoni, melanzane, olive nere, origano"},
  {id:26,name:"Scattarisciata",category:"Le nostre proposte",price:10,description:"Impasto integrale (se disponibile), pomodori scattarisciati con cipolla, olive, capperi, stracciatella, rucola"},
  {id:27,name:"Nerano",category:"Le nostre proposte",price:11,description:"Passata di zucchina, mozzarella, provola affumicata, zucchina grattugiata, basilico"},
  {id:28,name:"Campana",category:"Le nostre proposte",price:10,description:"Mozzarella di bufala, salsiccia fresca, friarielli"},
  {id:29,name:"Rustica",category:"Le nostre proposte",price:10,description:"Impasto ai cereali (se disponibile), mozzarella, friarielli, pomodoro secco, olive nere, tarallo sbriciolato"},
  {id:30,name:"Delicata",category:"Le nostre proposte",price:11,description:"Impasto integrale (se disponibile), mozzarella, gorgonzola, pere, miele, noci"},
  {id:31,name:"Calabrese",category:"Le nostre proposte",price:10,description:"Pomodoro, mozzarella di bufala, ventricina, cipolla caramellata, basilico"},
  {id:32,name:"Calabrese 2.0",category:"Le nostre proposte",price:11,description:"Mozzarella, 'nduja, provola affumicata, cipolla caramellata, basilico"},
  {id:33,name:"Pistacchiona",category:"Le nostre proposte",price:10,description:"Mozzarella di bufala, mortadella, pesto di pistacchio"},
  {id:34,name:"Lu Sule",category:"Le nostre proposte",price:11,description:"Impasto ai cereali (se disponibile), mozzarella, pancetta, stracciatella, datterini gialli, basilico"},
  {id:35,name:"Lu Mare",category:"Le nostre proposte",price:11,description:"Impasto integrale (se disponibile), pomodoro, mozzarella, calamari, gamberetti, scorza di limone"},
  {id:36,name:"Lu Ientu",category:"Le nostre proposte",price:11,description:"Impasto ai cereali (se disponibile), pomodoro, mozzarella, capocollo, burratina affumicata, pomodori secchi, menta"},
  {id:37,name:"Disco",category:"Le nostre proposte",price:12,description:"Doppio impasto, pomodoro, mozzarella, funghi, prosciutto cotto, capperi, tonno"},

  // LE PUCCE
  {id:100,name:"Componi la tua puccia",category:"Le pucce",price:3.50,description:"Scegli gli ingredienti che preferisci"},
  {id:38,name:"Classica",category:"Le pucce",price:5,description:"Prosciutto cotto, galbanino, insalata"},
  {id:39,name:"Completa",category:"Le pucce",price:5,description:"Ungherese, ventricina, emmental, insalata"},
  {id:40,name:"Romagnola",category:"Le pucce",price:5,description:"Prosciutto crudo, emmental, pomodoro"},
  {id:41,name:"Leccese",category:"Le pucce",price:5,description:"Tonno, emmental, capperi"},
  {id:42,name:"Fumé",category:"Le pucce",price:5,description:"Speck, scamorza affumicata, rucola"},
  {id:43,name:"Vegetariana",category:"Le pucce",price:5,description:"Peperoni, melanzane, funghetti"},
  {id:44,name:"Emiliana",category:"Le pucce",price:5,description:"Bresaola, grana, rucola"},
  {id:45,name:"Paesana",category:"Le pucce",price:5,description:"Mortadella, provola"},
  {id:46,name:"Leggera",category:"Le pucce",price:5,description:"Mozzarella, pomodoro, rucola"},
  {id:47,name:"Nuvola",category:"Le pucce",price:6.50,description:"Ventricina, burrata, rucola, olive nere"},
  {id:48,name:"Pezzetti di cavallo al sugo",category:"Le pucce",price:7.50,description:"Pezzetti di cavallo al sugo"},

  // LE GRIGLIATE
  {id:49,name:"Petto di pollo",category:"Le grigliate",price:8,description:"Petto di pollo alla griglia"},
  {id:50,name:"Salsiccia",category:"Le grigliate",price:8,description:"Salsiccia alla griglia"},
  {id:51,name:"Costata di maiale",category:"Le grigliate",price:8,description:"Costata di maiale alla griglia"},
  {id:52,name:"Fettina di vitello",category:"Le grigliate",price:12,description:"Circa 250 g"},
  {id:53,name:"Fettina di cavallo",category:"Le grigliate",price:12,description:"Circa 250 g"},
  {id:54,name:"Turcinieddhri (agnello)",category:"Le grigliate",price:12,description:"4 pezzi"},
  {id:55,name:"Costata di vitello",category:"Le grigliate",price:15,description:"Circa 400/500 g"},
  {id:56,name:"Costata di cavallo",category:"Le grigliate",price:15,description:"Circa 400/500 g"},
  {id:57,name:"Pezzetti di cavallo al sugo",category:"Le grigliate",price:9.50,description:"Pezzetti di cavallo al sugo"},
  {id:58,name:"Lumache arrosto",category:"Le grigliate",price:12,description:"Lumache arrosto"},
  {id:59,name:"Arrosto misto",category:"Le grigliate",price:12,description:"Pollo, salsiccia e costata di maiale"},

  // STUZZICA NELL'ATTESA
  {id:60,name:"Crocchette",category:"Stuzzica nell'attesa",price:6,description:"10 pezzi"},
  {id:61,name:"Aperitivo fritto",category:"Stuzzica nell'attesa",price:7,description:"14 pezzi"},
  {id:62,name:"Antipasto terra",category:"Stuzzica nell'attesa",price:7,description:"Verdure miste"},
  {id:63,name:"Burratina e capocollo",category:"Stuzzica nell'attesa",price:8,description:"Burratina e capocollo"},
  {id:64,name:"Burratina e prosciutto crudo",category:"Stuzzica nell'attesa",price:8,description:"Burratina e prosciutto crudo"},
  {id:65,name:"Bufala e capocollo",category:"Stuzzica nell'attesa",price:8,description:"Mozzarella di bufala e capocollo"},
  {id:66,name:"Bufala e prosciutto crudo",category:"Stuzzica nell'attesa",price:8,description:"Mozzarella di bufala e prosciutto crudo"},

  // BIRRE
  {id:67,name:"Leffe Bionda 33 cl",category:"Birre",price:4,description:"Bottiglia 33 cl"},
  {id:68,name:"Leffe Ambrata 33 cl",category:"Birre",price:4,description:"Bottiglia 33 cl"},
  {id:69,name:"Leffe Rossa 33 cl",category:"Birre",price:4,description:"Bottiglia 33 cl"},
  {id:70,name:"Leffe Bionda 75 cl",category:"Birre",price:9,description:"Bottiglia 75 cl"},
  {id:71,name:"Dreher Lemon 33 cl",category:"Birre",price:2,description:"Bottiglia 33 cl"},
  {id:72,name:"Paulaner Weisse 50 cl",category:"Birre",price:5,description:"Bottiglia 50 cl"},
  {id:73,name:"Nastro Azzurro 33 cl",category:"Birre",price:2,description:"Bottiglia 33 cl"},
  {id:74,name:"Nastro Azzurro 66 cl",category:"Birre",price:4,description:"Bottiglia 66 cl"},
  {id:75,name:"Menabrea 66 cl",category:"Birre",price:5,description:"Bottiglia 66 cl"},
  {id:76,name:"Birra zero alcol 33 cl",category:"Birre",price:2,description:"Bottiglia 33 cl"},
  {id:77,name:"Ichnusa non filtrata 50 cl",category:"Birre",price:5,description:"Bottiglia 50 cl"},

  // VINI
  {id:80,name:"Leverano DOC bianco",category:"Vini",price:10,description:"75 cl"},
  {id:81,name:"Leverano DOC rosato",category:"Vini",price:10,description:"75 cl"},
  {id:82,name:"Leverano DOC rosso",category:"Vini",price:10,description:"75 cl"},
  {id:83,name:"Leverano DOC Primitivo",category:"Vini",price:13,description:"75 cl"},
  {id:84,name:"Leverano DOC Negramaro",category:"Vini",price:13,description:"75 cl"},
  {id:85,name:"Prosecco",category:"Vini",price:13,description:"75 cl"},
  {id:86,name:"Spumante",category:"Vini",price:10,description:"75 cl"},
  {id:87,name:"Mateus",category:"Vini",price:9,description:"50 cl"},

  // BEVANDE
  {id:88,name:"Acqua naturale",category:"Bevande",price:1,description:"50 cl"},
  {id:90,name:"Coca Cola",category:"Bevande",price:2,description:"Lattina 33 cl"},
  {id:91,name:"Coca Cola Zero",category:"Bevande",price:2,description:"Lattina 33 cl"},
  {id:92,name:"Fanta",category:"Bevande",price:2,description:"Lattina 33 cl"},
  {id:93,name:"Sprite",category:"Bevande",price:2,description:"Lattina 33 cl"},
  {id:94,name:"Tè pesca",category:"Bevande",price:1.50,description:"Bottiglietta 25 cl"},

  // DOLCI
  {id:95,name:"Sorbetto limone o cocco",category:"I dolci",price:5,description:"Scegli il gusto: limone oppure cocco"},
  {id:96,name:"Spumone fondente fichi e copeta",category:"I dolci",price:5,description:"Spumone fondente, fichi e copeta"},
  {id:97,name:"Spumone nocciola e cioccolato",category:"I dolci",price:5,description:"Spumone nocciola e cioccolato"},
  {id:98,name:"Spumone nocciola e pistacchio",category:"I dolci",price:5,description:"Spumone nocciola e pistacchio"},
  {id:99,name:"Dolce con Nutella",category:"I dolci",price:4,description:"Scegli la versione: piadina o calzone"}
];

const removableIngredientsByProduct = Object.fromEntries(menu
  .filter(item => ["Le classiche", "Le nostre proposte", "Le pucce"].includes(item.category))
  .map(item => [
    item.id,
    item.description
      .split(",")
      .map(ingredient => {
        const trimmed = ingredient.trim();
        return trimmed ? trimmed.charAt(0).toLocaleUpperCase("it-IT") + trimmed.slice(1) : "";
      })
      .filter(ingredient => ingredient &&
        !/^(?:impasto\s+(?:integrale|ai\s+cereali)|doppio\s+impasto)$/i.test(ingredient) &&
        !/^(?:pomodoro|mozzarella)(?:$|\s)/i.test(ingredient))
  ]));
removableIngredientsByProduct[20] = [];
removableIngredientsByProduct[6] = ["Salsa kebab"];
removableIngredientsByProduct[10] = ["Origano"];
removableIngredientsByProduct[101] = ["Origano"];
removableIngredientsByProduct[102] = [];
removableIngredientsByProduct[103] = [];
removableIngredientsByProduct[104] = [];
removableIngredientsByProduct[12] = [];
removableIngredientsByProduct[15] = [];
removableIngredientsByProduct[17] = [];
removableIngredientsByProduct[21] = [];
removableIngredientsByProduct[2] = removableIngredientsByProduct[2]
  .filter(ingredient => !/^salamino piccante$/i.test(ingredient));
removableIngredientsByProduct[26] = ["Rucola", "Stracciatella"];
removableIngredientsByProduct[29].push("Pomodoro secco");
removableIngredientsByProduct[100] = [];

// Listino delle aggiunte fornito dal locale. Prezzi in euro.
const paidExtras = [
  { id: "aglio", name: "Aglio", price: 0.50 },
  { id: "alici", name: "Alici", price: 1 },
  { id: "basilico", name: "Basilico", price: 0.50 },
  { id: "bresaola", name: "Bresaola", price: 3 },
  { id: "bufala-sostituzione", name: "Bufala al posto della mozzarella", price: 2.50, exclusiveGroup: "bufala" },
  { id: "bufala-extra", name: "Bufala intera extra", price: 3.50, exclusiveGroup: "bufala" },
  { id: "burratina-affumicata", name: "Burratina affumicata", price: 2.50 },
  { id: "burratina-bianca", name: "Burratina bianca", price: 2.50 },
  { id: "calamari", name: "Calamari", price: 2 },
  { id: "capocollo", name: "Capocollo", price: 2 },
  { id: "capperi", name: "Capperi", price: 0.50 },
  { id: "carciofi", name: "Carciofi", price: 1 },
  { id: "cipolla", name: "Cipolla", price: 0.50 },
  { id: "cipolla-caramellata", name: "Cipolla caramellata", price: 1.50 },
  { id: "fiordilatte-sostituzione", name: "Fior di latte al posto della mozzarella", price: 1 },
  { id: "datterino-giallo", name: "Datterino giallo", price: 1.50 },
  { id: "doppia-mozzarella", name: "Doppia mozzarella", price: 1 },
  { id: "emmental", name: "Emmental", price: 1.50 },
  { id: "friarielli", name: "Friarielli", price: 1.50 },
  { id: "funghi-naturale", name: "Funghi al naturale", price: 1 },
  { id: "funghi-freschi", name: "Funghi freschi", price: 1 },
  { id: "funghi-sottolio", name: "Funghi sott'olio", price: 1 },
  { id: "porcini", name: "Funghi porcini", price: 3 },
  { id: "gamberetti", name: "Gamberetti", price: 3 },
  { id: "gorgonzola", name: "Gorgonzola", price: 1.50 },
  { id: "grana", name: "Grana", price: 1.50 },
  { id: "kebab", name: "Kebab", price: 2 },
  { id: "melanzane", name: "Melanzane", price: 1 },
  { id: "menta", name: "Menta", price: 0 },
  { id: "mortadella", name: "Mortadella", price: 1 },
  { id: "nduja", name: "Nduja", price: 2.50 },
  { id: "no-lattosio", name: "No lattosio", price: 2 },
  { id: "noci", name: "Noci", price: 1 },
  { id: "olio-piccante", name: "Olio piccante", price: 0 },
  { id: "olive-nere", name: "Olive nere", price: 0.50 },
  { id: "olive-verdi", name: "Olive verdi", price: 0.50 },
  { id: "pancetta", name: "Pancetta", price: 2 },
  { id: "panna", name: "Panna", price: 1 },
  { id: "passata-zucchine", name: "Passata di zucchine", price: 1 },
  { id: "patatine", name: "Patatine", price: 1 },
  { id: "peperoni", name: "Peperoni", price: 1 },
  { id: "pezzetti-cavallo", name: "Pezzetti di cavallo", price: 3 },
  { id: "pistacchio", name: "Pistacchio", price: 2.50 },
  { id: "pomodori-scattarisciati", name: "Pomodori scattarisciati", price: 2.50 },
  { id: "pomodori-secchi", name: "Pomodori secchi", price: 1 },
  { id: "pomodorini", name: "Pomodorini", price: 1 },
  { id: "pomodoro-fette", name: "Pomodoro a fette", price: 0.50 },
  { id: "prosciutto-cotto", name: "Prosciutto cotto", price: 1 },
  { id: "prosciutto-crudo", name: "Prosciutto crudo", price: 2.50 },
  { id: "provola-piccante", name: "Provola piccante", price: 1 },
  { id: "provola-affumicata", name: "Provola affumicata", price: 2 },
  { id: "radicchio", name: "Radicchio", price: 1 },
  { id: "rucola", name: "Rucola", price: 0.50 },
  { id: "ungherese", name: "Salame ungherese", price: 1 },
  { id: "salamino-piccante", name: "Salamino piccante", price: 1 },
  { id: "salsiccia-fresca", name: "Salsiccia fresca", price: 1.50 },
  { id: "scamorza", name: "Scamorza", price: 1.50 },
  { id: "speck", name: "Speck", price: 2.50 },
  { id: "stracciatella", name: "Stracciatella", price: 2 },
  { id: "surimi", name: "Surimi", price: 1 },
  { id: "tonno", name: "Tonno", price: 2 },
  { id: "uovo", name: "Uovo", price: 1 },
  { id: "ventricina", name: "Ventricina", price: 1 },
  { id: "wurstel", name: "Wurstel", price: 1 },
  { id: "zucchina-grattugiata", name: "Zucchina grattugiata", price: 1 }
];

const pucciaExtras = [
  { id: "alici", name: "Alici", price: 0.50 },
  { id: "bresaola", name: "Bresaola", price: 1 },
  { id: "bufala", name: "Bufala", price: 2 },
  { id: "burratina-affumicata", name: "Burratina affumicata", price: 2.50 },
  { id: "burratina-bianca", name: "Burratina bianca", price: 2.50 },
  { id: "capocollo", name: "Capocollo", price: 1 },
  { id: "capperi", name: "Capperi", price: 0.50 },
  { id: "carciofi", name: "Carciofi", price: 0.50 },
  { id: "cipolla", name: "Cipolla", price: 0.50 },
  { id: "cipolla-caramellata", name: "Cipolla caramellata", price: 1 },
  { id: "datterino-giallo", name: "Datterino giallo", price: 1 },
  { id: "emmental", name: "Emmental", price: 0.50 },
  { id: "friarielli", name: "Friarielli", price: 1 },
  { id: "funghi-naturale", name: "Funghi al naturale", price: 0.50 },
  { id: "funghi-freschi", name: "Funghi freschi", price: 0.50 },
  { id: "funghi-sottolio", name: "Funghi sott'olio", price: 0.50 },
  { id: "galbanino", name: "Galbanino", price: 0.50 },
  { id: "gorgonzola", name: "Gorgonzola", price: 0.50 },
  { id: "grana", name: "Grana", price: 0.50 },
  { id: "insalata", name: "Insalata", price: 0 },
  { id: "ketchup", name: "Ketchup", price: 0 },
  { id: "maionese", name: "Maionese", price: 0 },
  { id: "melanzane", name: "Melanzane", price: 0.50 },
  { id: "menta", name: "Menta", price: 0 },
  { id: "mortadella", name: "Mortadella", price: 0.50 },
  { id: "mozzarella-fresca", name: "Mozzarella fresca", price: 1 },
  { id: "nduja", name: "Nduja", price: 1 },
  { id: "olio-piccante", name: "Olio piccante", price: 0 },
  { id: "olive-nere", name: "Olive nere", price: 0.50 },
  { id: "olive-verdi", name: "Olive verdi", price: 0.50 },
  { id: "pancetta", name: "Pancetta", price: 1 },
  { id: "patatine", name: "Patatine", price: 0.50 },
  { id: "peperoni", name: "Peperoni", price: 0.50 },
  { id: "pistacchio", name: "Pistacchio", price: 1.50 },
  { id: "pomodori-secchi", name: "Pomodori secchi", price: 0.50 },
  { id: "pomodorini", name: "Pomodorini", price: 0.50 },
  { id: "pomodoro-fette", name: "Pomodoro a fette", price: 0.50 },
  { id: "prosciutto-cotto", name: "Prosciutto cotto", price: 0.50 },
  { id: "prosciutto-crudo", name: "Prosciutto crudo", price: 1 },
  { id: "provola-piccante", name: "Provola piccante", price: 1 },
  { id: "provola-affumicata", name: "Provola affumicata", price: 1 },
  { id: "rucola", name: "Rucola", price: 0.50 },
  { id: "ungherese", name: "Salame ungherese", price: 0.50 },
  { id: "salamino-piccante", name: "Salamino piccante", price: 0.50 },
  { id: "scamorza", name: "Scamorza", price: 0.50 },
  { id: "speck", name: "Speck", price: 1 },
  { id: "stracciatella", name: "Stracciatella", price: 1 },
  { id: "tonno", name: "Tonno", price: 1 },
  { id: "ventricina", name: "Ventricina", price: 0.50 },
  { id: "wurstel", name: "Wurstel", price: 0.50 }
];

const tipoPiadinaExtras = [
  { id: "tp-aglio", name: "Aglio", price: 0.50 },
  { id: "tp-basilico", name: "Basilico", price: 0.50 },
  { id: "tp-bresaola", name: "Bresaola", price: 3 },
  { id: "tp-bufala", name: "Bufala", price: 3.50 },
  { id: "tp-burratina-affumicata", name: "Burratina affumicata", price: 2.50 },
  { id: "tp-burratina-bianca", name: "Burratina bianca", price: 2.50 },
  { id: "tp-capocollo", name: "Capocollo", price: 2 },
  { id: "tp-capperi", name: "Capperi", price: 0.50 },
  { id: "tp-carciofi", name: "Carciofi", price: 1 },
  { id: "tp-cipolla", name: "Cipolla", price: 0.50 },
  { id: "tp-cipolla-caramellata", name: "Cipolla caramellata", price: 1.50 },
  { id: "tp-datterino-giallo", name: "Datterino giallo", price: 1.50 },
  { id: "tp-emmental", name: "Emmental", price: 1.50 },
  { id: "tp-friarielli", name: "Friarielli", price: 1.50 },
  { id: "tp-funghi-naturale", name: "Funghi al naturale", price: 1 },
  { id: "tp-funghi-freschi", name: "Funghi freschi", price: 1 },
  { id: "tp-funghi-sottolio", name: "Funghi sott'olio", price: 1 },
  { id: "tp-gorgonzola", name: "Gorgonzola", price: 1.50 },
  { id: "tp-grana", name: "Grana", price: 1.50 },
  { id: "tp-melanzane", name: "Melanzane", price: 1 },
  { id: "tp-menta", name: "Menta", price: 0 },
  { id: "tp-mozzarella-fette", name: "Mozzarella a fette", price: 2 },
  { id: "tp-mortadella", name: "Mortadella", price: 1 },
  { id: "tp-nduja", name: "Nduja", price: 2.50 },
  { id: "tp-noci", name: "Noci", price: 1 },
  { id: "tp-olio-piccante", name: "Olio piccante", price: 0 },
  { id: "tp-olive-nere", name: "Olive nere", price: 0.50 },
  { id: "tp-olive-verdi", name: "Olive verdi", price: 0.50 },
  { id: "tp-pancetta", name: "Pancetta", price: 2 },
  { id: "tp-patatine", name: "Patatine", price: 1 },
  { id: "tp-peperoni", name: "Peperoni", price: 1 },
  { id: "tp-pistacchio", name: "Pistacchio", price: 2.50 },
  { id: "tp-pomodori-secchi", name: "Pomodori secchi", price: 1 },
  { id: "tp-pomodorini", name: "Pomodorini", price: 1 },
  { id: "tp-pomodoro-fette", name: "Pomodoro a fette", price: 0.50 },
  { id: "tp-prosciutto-cotto", name: "Prosciutto cotto", price: 1 },
  { id: "tp-prosciutto-crudo", name: "Prosciutto crudo", price: 2.50 },
  { id: "tp-provola-piccante", name: "Provola piccante", price: 1 },
  { id: "tp-provola-affumicata", name: "Provola affumicata", price: 2 },
  { id: "tp-radicchio", name: "Radicchio", price: 1 },
  { id: "tp-rucola", name: "Rucola", price: 0.50 },
  { id: "tp-ungherese", name: "Salame ungherese", price: 1 },
  { id: "tp-salamino-piccante", name: "Salamino piccante", price: 1 },
  { id: "tp-scamorza", name: "Scamorza", price: 1.50 },
  { id: "tp-speck", name: "Speck", price: 2.50 },
  { id: "tp-stracciatella", name: "Stracciatella", price: 2 },
  { id: "tp-tonno", name: "Tonno", price: 2 },
  { id: "tp-ventricina", name: "Ventricina", price: 1 },
  { id: "tp-wurstel", name: "Wurstel", price: 1 },
  { id: "tp-zucchina-grattugiata", name: "Zucchina grattugiata", price: 1 }
];

const translations = {
  it: {
    heroEyebrow: "TRADIZIONE • PASSIONE • QUALITÀ",
    instagramFollow: "Seguici su Instagram",
    heroTitle: "Il gusto della tradizione.",
    heroText: "Benvenuti a La Pergola. Scopri le nostre pizze, le specialità della casa e tanto altro.",
    discoverMenu: "ORDINA D'ASPORTO",
    bookTable: "PRENOTA UN TAVOLO",
    cartTopLink: "🛒 Carrello",
    cartTopItems: "articoli nel carrello",
    storyEyebrow: "LA NOSTRA STORIA",
    storyTitle: "Tradizione e convivialità a Galugnano.",
    storyIntro: "La Pergola è una storica pizzeria e trattoria a Galugnano, frazione di San Donato di Lecce. È apprezzata per le pizze, le pucce e i piatti della cucina tradizionale salentina. L'atmosfera informale e accogliente e i posti a sedere all'interno e all'aperto la rendono adatta a cene in famiglia e in compagnia. Da 40 anni accogliamo i nostri ospiti con la stessa passione per la cucina e la convivialità.",
    storyFoodTitle: "Proposte per tutti i gusti",
    storyFoodText: "Il menù comprende pizze classiche e speciali, pucce, antipasti e ricette tipiche del territorio, con opzioni vegetariane e vegane.",
    storyServiceTitle: "Cena, prenotazioni e asporto",
    storyServiceText: "È disponibile il servizio al tavolo per cena e si può ordinare da asporto. Per la popolarità del locale, è consigliata la prenotazione.",
    hoursTitle: "Orari",
    hoursText: "Siamo aperti dal mercoledì alla domenica, dalle 18:30 alle 23:00.",
    specialties: "LE NOSTRE SPECIALITÀ",
    menuTitle: "Il nostro menù",
    menuHint: "Scegli quello che preferisci e aggiungilo al carrello.",
    cartMenuLink: "IL NOSTRO MENÙ",
    yourOrder: "IL TUO ORDINE",
    cartTitle: "Il carrello",
    cartEmpty: "Il tuo carrello è vuoto.",
    total: "Totale",
    completeOrder: "Completa il tuo ordine",
    customerName: "Nome",
    namePlaceholder: "Il tuo nome",
    pickupDate: "Data di ritiro",
    chooseDate: "Scegli una data",
    calendarMondayTuesday: "Il locale potrebbe essere chiuso il lunedì e il martedì.",
    calendarHolidayClosed: "Il locale potrebbe essere aperto nei giorni festivi.",
    calendarWeekdays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    calendarSelectDate: "Seleziona una data",
    pickupTime: "Orario di ritiro (18:30–23:00)",
    orderNotes: "Note aggiuntive",
    notesPlaceholder: "Eventuali richieste...",
    orderWhatsapp: "ORDINA SU WHATSAPP",
    callUs: "CHIAMACI",
    orderingClosed: "ORDINI ONLINE DISPONIBILI DALLE 9:00 ALLE 19:00",
    cartPhoneNotice: "Per gli ordini di oggi, dalle 19:00 alle 00:00 è possibile ordinare solo chiamando.",
    bookingEyebrow: "CLICCA E PRENOTA UN TAVOLO",
    bookingTitle: "Richiesta di prenotazione",
    bookingIntro: "Compila i tuoi dati: la richiesta verrà inviata su WhatsApp e sarà confermata dal ristorante.",
    bookingDate: "Data",
    bookingDateRequired: "Seleziona una data per la prenotazione.",
    bookingTime: "Orario",
    bookingTimeRequired: "Seleziona un orario per la prenotazione.",
    bookingGuests: "Numero di persone",
    bookingSubmit: "INVIA RICHIESTA SU WHATSAPP",
    bookingHeading: "RICHIESTA DI PRENOTAZIONE - LA PERGOLA",
    bookingSent: "Attendo conferma dal ristorante.",
    bookingClosedDate: "Siamo chiusi in questa data. Scegli un altro giorno.",
    cartDisclaimer: "L'ordine verrà preparato come messaggio WhatsApp. L'invio non è automatico: dovrai confermarlo tu.",
    footerTagline: "Pizzeria • Tradizione • Passione",
    addToCart: "+ AGGIUNGI AL CARRELLO",
    cartItemAdded: "Aggiunto al carrello",
    customizeProduct: "PERSONALIZZA",
    recommendationEyebrow: "UN CONSIGLIO PER IL TUO ORDINE",
    recommendationTitle: "Ti va di aggiungere qualcosa da bere?",
    recommendationText: "Aggiungi una o più bevande o birre al tuo ordine, poi continua su WhatsApp.",
    backToCart: "TORNA AL CARRELLO",
    addRecommendation: "AGGIUNGI",
    addAnotherRecommendation: "AGGIUNGI UN ALTRO",
    recommendationQuantity: "Nel tuo ordine: {count}",
    continueToWhatsapp: "CONTINUA SU WHATSAPP",
    selectVersion: "Scegli una versione",
    chooseVersion: "Seleziona...",
    quantityEach: "ciascuno",
    emptyCartAlert: "Il carrello è vuoto. Aggiungi almeno un prodotto!",
    nameDateTimeAlert: "Inserisci il nome, la data e l'orario di ritiro.",
    chooseDessertAlert: "Scegli piadina o calzone prima di aggiungere il dolce al carrello.",
    selectFlavor: "Scegli un gusto",
    chooseFlavor: "Seleziona...",
    chooseSorbetAlert: "Scegli limone o cocco prima di aggiungere il sorbetto al carrello.",
    customizationEyebrow: "PERSONALIZZA IL TUO PIATTO",
    customizationTotal: "Totale",
    confirmCustomization: "AGGIUNGI AL CARRELLO",
    basePrice: "Prezzo pizza",
    extrasLabel: "Aggiunte",
    doughLabel: "Tipo di impasto",
    doughClassic: "Impasto classico",
    doughCereals: "Impasto ai cereali (se disponibile)",
    doughWholemeal: "Impasto integrale (se disponibile)",
    doughDouble: "Impasto doppio",
    baseLabel: "Tipo di base",
    baseDefaultLabel: "(predefinito)",
    baseMargherita: "Base margherita",
    baseMargheritaBufala: "Base margherita con bufala",
    baseBianca: "Base bianca (solo mozzarella)",
    baseBiancaBufala: "Base bianca con bufala",
    baseRossaNoMozzarella: "Base rossa senza mozzarella (−€0,50)",
    basePiadinaIntegrale: "Base piadina",
    removeIngredientsTitle: "Togli ingredienti",
    removeIngredientsHint: "Seleziona gli ingredienti da togliere; il prezzo verrà modificato da noi al ritiro.",
    addIngredientsTitle: "Aggiungi extra",
    withoutIngredients: "Senza",
    extraPrice: "+{price}",
    orderHeading: "🍕 *NUOVO ORDINE - LA PERGOLA*",
    orderName: "Nome",
    orderPickupDate: "Data di ritiro",
    orderPickupTime: "Orario di ritiro",
    orderLabel: "ORDINE",
    orderTotal: "Totale",
    orderNotesLabel: "Note",
    orderConfirmation: "In attesa di conferma da La Pergola."
  },
  en: {
    heroEyebrow: "TRADITION • PASSION • QUALITY",
    instagramFollow: "Follow us on Instagram",
    heroTitle: "The taste of tradition.",
    heroText: "Welcome to La Pergola. Discover our pizzas, house specialities and much more.",
    discoverMenu: "ORDER TAKEAWAY",
    bookTable: "BOOK A TABLE",
    cartTopLink: "🛒 Cart",
    cartTopItems: "items in cart",
    storyEyebrow: "OUR STORY",
    storyTitle: "Tradition and good company in Galugnano.",
    storyIntro: "La Pergola is a historic pizzeria and trattoria in Galugnano, a hamlet of San Donato di Lecce. It is known for its pizzas, pucce and traditional Salento dishes. Its relaxed, welcoming atmosphere and indoor and outdoor seating make it a lovely place for dinner with family and friends. For 40 years, we have welcomed our guests with the same passion for food and conviviality.",
    storyFoodTitle: "Something for everyone",
    storyFoodText: "The menu features classic and speciality pizzas, pucce, starters and local recipes, including vegetarian and vegan options.",
    storyServiceTitle: "Dinner, reservations and takeaway",
    storyServiceText: "Table service is available for dinner, and takeaway orders are welcome. We recommend booking ahead as the restaurant is popular.",
    hoursTitle: "Opening hours",
    hoursText: "Open Wednesday to Sunday, 6:30 pm to 11:00 pm.",
    specialties: "OUR SPECIALITIES",
    menuTitle: "Our menu",
    menuHint: "Choose your favourites and add them to the cart.",
    cartMenuLink: "OUR MENU",
    yourOrder: "YOUR ORDER",
    cartTitle: "Your cart",
    cartEmpty: "Your cart is empty.",
    total: "Total",
    completeOrder: "Complete your order",
    customerName: "Name",
    namePlaceholder: "Your name",
    pickupDate: "Pickup date",
    chooseDate: "Choose a date",
    calendarMondayTuesday: "The restaurant may be closed on Mondays and Tuesdays.",
    calendarHolidayClosed: "The restaurant may be open on public holidays.",
    calendarWeekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    calendarSelectDate: "Choose a date",
    pickupTime: "Pickup time (6:30–11:00 pm)",
    orderNotes: "Additional notes",
    notesPlaceholder: "Any special requests...",
    orderWhatsapp: "ORDER ON WHATSAPP",
    callUs: "CALL US",
    orderingClosed: "ONLINE ORDERS AVAILABLE FROM 9:00 AM TO 7:00 PM",
    cartPhoneNotice: "For orders today, from 7:00 PM to midnight you can order by phone only.",
    bookingEyebrow: "CLICK TO BOOK A TABLE",
    bookingTitle: "Booking request",
    bookingIntro: "Enter your details: your request will be sent on WhatsApp and confirmed by the restaurant.",
    bookingDate: "Date",
    bookingDateRequired: "Please select a booking date.",
    bookingTime: "Time",
    bookingTimeRequired: "Please select a booking time.",
    bookingGuests: "Number of guests",
    bookingSubmit: "SEND BOOKING REQUEST ON WHATSAPP",
    bookingHeading: "BOOKING REQUEST - LA PERGOLA",
    bookingSent: "Awaiting confirmation from the restaurant.",
    bookingClosedDate: "We are closed on this date. Please choose another day.",
    cartDisclaimer: "Your order will be prepared as a WhatsApp message. It will not be sent automatically: you will need to confirm it.",
    footerTagline: "Pizzeria • Tradition • Passion",
    addToCart: "+ ADD TO CART",
    cartItemAdded: "Added to cart",
    customizeProduct: "CUSTOMIZE",
    recommendationEyebrow: "A LITTLE SUGGESTION FOR YOUR ORDER",
    recommendationTitle: "Would you like to add a drink?",
    recommendationText: "Add one or more soft drinks or beers to your order, then continue to WhatsApp.",
    backToCart: "BACK TO CART",
    addRecommendation: "ADD",
    addAnotherRecommendation: "ADD ANOTHER",
    recommendationQuantity: "In your order: {count}",
    continueToWhatsapp: "CONTINUE TO WHATSAPP",
    selectVersion: "Choose a version",
    chooseVersion: "Select...",
    quantityEach: "each",
    emptyCartAlert: "Your cart is empty. Add at least one item!",
    nameDateTimeAlert: "Enter your name, pickup date and pickup time.",
    chooseDessertAlert: "Choose piadina or calzone before adding the dessert to your cart.",
    selectFlavor: "Choose a flavour",
    chooseFlavor: "Select...",
    chooseSorbetAlert: "Choose lemon or coconut before adding the sorbet to your cart.",
    customizationEyebrow: "CUSTOMIZE YOUR DISH",
    customizationTotal: "Total",
    confirmCustomization: "ADD TO CART",
    basePrice: "Pizza price",
    extrasLabel: "Extras",
    doughLabel: "Dough type",
    doughClassic: "Classic dough",
    doughCereals: "Multigrain dough (if available)",
    doughWholemeal: "Wholemeal dough (if available)",
    doughDouble: "Double dough",
    baseLabel: "Base type",
    baseDefaultLabel: "(default)",
    baseMargherita: "Margherita base",
    baseMargheritaBufala: "Margherita base with buffalo mozzarella",
    baseBianca: "White base (mozzarella only)",
    baseBiancaBufala: "White base with buffalo mozzarella",
    baseRossaNoMozzarella: "Red base without mozzarella (−€0.50)",
    basePiadinaIntegrale: "Piadina base",
    removeIngredientsTitle: "Remove ingredients",
    removeIngredientsHint: "Select the ingredients to remove; we will adjust the price when you pick up your order.",
    addIngredientsTitle: "Add extras",
    withoutIngredients: "Without",
    extraPrice: "+{price}",
    orderHeading: "🍕 *NEW ORDER - LA PERGOLA*",
    orderName: "Name",
    orderPickupDate: "Pickup date",
    orderPickupTime: "Pickup time",
    orderLabel: "ORDER",
    orderTotal: "Total",
    orderNotesLabel: "Notes",
    orderConfirmation: "Awaiting confirmation from La Pergola."
  }
};

const categoryTranslations = {
  "Le classiche": "Classic pizzas",
  "Le nostre proposte": "House specialities",
  "Le pucce": "Pucce (stuffed bread)",
  "Le grigliate": "Grilled dishes",
  "Stuzzica nell'attesa": "Starters",
  "Birre": "Beers",
  "Vini": "Wines",
  "Bevande": "Drinks",
  "I dolci": "Desserts"
};

const englishMenu = {
  1:["Margherita","Tomato, mozzarella, olives and oregano"],
  104:["Piadina-Style Base","Piadina-style pizza base"],
  2:["Diavola","Tomato, mozzarella, spicy salami and oregano"],
  3:["Napoli","Tomato, mozzarella, capers, anchovies, black olives and oregano"],
  4:["Bufalina","Tomato, buffalo mozzarella and basil"],
  5:["Four Seasons","Tomato, mozzarella, mushrooms, artichokes, ham and oregano"],
  6:["Kebab","Tomato, mozzarella, kebab meat and kebab sauce"],
  7:["Calzone","Tomato, mozzarella, mushrooms, ham and capers"],
  8:["Four Cheese","Tomato, mozzarella, Emmental, smoked scamorza, Gorgonzola and oregano"],
  9:["Capricciosa","Tomato, mozzarella, mushrooms, artichokes, ham, capers, black olives and oregano"],
  10:["Radicchio and Gorgonzola","Tomato, mozzarella, radicchio, Gorgonzola and oregano"],
  11:["Horse Meat Pieces","Tomato, mozzarella and horse meat pieces"],
  12:["Mixed Mushrooms","Tomato, mozzarella, porcini mushrooms, mushrooms in oil and oregano"],
  13:["Seafood Pizza","Tomato, mozzarella, surimi, squid, mussels and oregano"],
  14:["Vegetarian","Tomato, mozzarella, mushrooms, artichokes, capers, peppers, aubergine, black olives and oregano"],
  15:["Sausage and Friarielli","Tomato, mozzarella, fresh sausage, friarielli (broccoli rabe) and oregano"],
  16:["The Works","Tomato, mozzarella, mushrooms, artichokes, ham, capers, tuna, anchovies, olives and oregano"],
  17:["Sausage and Porcini","Tomato, mozzarella, fresh sausage, porcini mushrooms and oregano"],
  18:["Kebab","Tomato, mozzarella, kebab meat and kebab sauce"],
  19:["Radicchio and Gorgonzola","Tomato, mozzarella, radicchio, Gorgonzola and oregano"],
  20:["Horse Meat Pieces","Tomato, mozzarella and horse meat pieces"],
  21:["Seafood Pizza","Tomato, mozzarella, surimi, squid and oregano"],
  22:["Mixed Mushrooms","Tomato, mozzarella, porcini mushrooms, mushrooms in oil and oregano"],
  23:["Vegetarian","Tomato, mozzarella, mushrooms, artichokes, capers, peppers, aubergine, black olives and oregano"],
  24:["Sausage and Friarielli","Tomato, mozzarella, fresh sausage, friarielli (broccoli rabe) and oregano"],
  25:["Sausage and Porcini","Tomato, mozzarella, fresh sausage, porcini mushrooms and oregano"],
  26:["Scattarisciata","Wholemeal dough (if available), sautéed tomatoes with onion, olives, capers, stracciatella and rocket"],
  27:["Nerano","Courgette purée, mozzarella, smoked provola, grated courgette and basil"],
  28:["Campana","Buffalo mozzarella, fresh sausage and friarielli (broccoli rabe)"],
  29:["Rustica","Multigrain dough (if available), mozzarella, friarielli, sun-dried tomato, black olives and crumbled tarallo"],
  30:["Delicata","Wholemeal dough (if available), mozzarella, Gorgonzola, pears, honey and walnuts"],
  31:["Calabrese","Tomato, buffalo mozzarella, ventricina salami, caramelised onion and basil"],
  32:["Calabrese 2.0","Mozzarella, 'nduja, smoked provola, caramelised onion and basil"],
  33:["Pistacchiona","Buffalo mozzarella, mortadella and pistachio pesto"],
  34:["Lu Sule","Multigrain dough (if available), mozzarella, pancetta, stracciatella, yellow datterini tomatoes and basil"],
  35:["Lu Mare","Wholemeal dough (if available), tomato, mozzarella, squid, prawns and lemon zest"],
  36:["Lu Ientu","Multigrain dough (if available), tomato, mozzarella, capocollo, smoked burratina, sun-dried tomatoes and mint"],
  37:["Disco","Double dough, tomato, mozzarella, mushrooms, ham, capers and tuna"],
  38:["Classic Puccia","Cooked ham, Galbanino cheese and lettuce"],
  100:["Build your own puccia","Choose the ingredients you like"],
  101:["Tuna and onion","Tomato, mozzarella, tuna, onion and oregano"],
  102:["Patapizza","Tomato, mozzarella and fries"],
  103:["Hot dog sausage and fries","Tomato, mozzarella, hot dog sausage and fries"],
  39:["Completa Puccia","Ungherese salami, ventricina salami, Emmental and lettuce"],
  40:["Romagnola Puccia","Prosciutto crudo, Emmental and tomato"],
  41:["Leccese Puccia","Tuna, Emmental and capers"],
  42:["Smoky Puccia","Speck, smoked scamorza and rocket"],
  43:["Vegetarian Puccia","Peppers, aubergine and pickled mushrooms"],
  44:["Emiliana Puccia","Bresaola, Grana cheese and rocket"],
  45:["Paesana Puccia","Mortadella and provola cheese"],
  46:["Leggera Puccia","Mozzarella, tomato and rocket"],
  47:["Nuvola Puccia","Ventricina salami, burrata, rocket and black olives"],
  48:["Horse Meat Puccia","Horse meat pieces in tomato sauce"],
  49:["Grilled Chicken Breast","Grilled chicken breast"],
  50:["Grilled Sausage","Grilled sausage"],
  51:["Pork Chop","Grilled pork chop"],
  52:["Veal Steak","Approx. 250 g"],
  53:["Horse Meat Steak","Approx. 250 g"],
  54:["Turcinieddhri (lamb)","4 pieces of traditional Salento lamb rolls"],
  55:["Veal Ribeye","Approx. 400–500 g"],
  56:["Horse Meat Ribeye","Approx. 400–500 g"],
  57:["Horse Meat Pieces in Sauce","Horse meat pieces in tomato sauce"],
  58:["Roast Snails","Roast snails"],
  59:["Mixed Grill","Chicken, sausage and pork chop"],
  60:["Croquettes","10 pieces"],
  61:["Fried Appetiser Selection","14 pieces"],
  62:["Land Appetiser","Mixed vegetables"],
  63:["Burratina and Capocollo","Burratina and capocollo cured pork"],
  64:["Burratina and Prosciutto Crudo","Burratina and prosciutto crudo"],
  65:["Buffalo Mozzarella and Capocollo","Buffalo mozzarella and capocollo cured pork"],
  66:["Buffalo Mozzarella and Prosciutto Crudo","Buffalo mozzarella and prosciutto crudo"],
  67:["Leffe Blonde 33 cl","33 cl bottle"],
  68:["Leffe Amber 33 cl","33 cl bottle"],
  69:["Leffe Red 33 cl","33 cl bottle"],
  70:["Leffe Blonde 75 cl","75 cl bottle"],
  71:["Dreher Lemon 33 cl","33 cl bottle"],
  72:["Paulaner Weissbier 50 cl","50 cl bottle"],
  73:["Nastro Azzurro 33 cl","33 cl bottle"],
  74:["Nastro Azzurro 66 cl","66 cl bottle"],
  75:["Menabrea 66 cl","66 cl bottle"],
  76:["Alcohol-Free Beer 33 cl","33 cl bottle"],
  77:["Ichnusa Unfiltered 50 cl","50 cl bottle"],
  78:["House Rosé Wine","100 cl"],
  79:["House Red Wine","100 cl"],
  80:["Leverano DOC White","75 cl bottle"],
  81:["Leverano DOC Rosé","75 cl bottle"],
  82:["Leverano DOC Red","75 cl bottle"],
  83:["Leverano DOC Primitivo","75 cl bottle"],
  84:["Leverano DOC Negroamaro","75 cl bottle"],
  85:["Prosecco","75 cl bottle"],
  86:["Sparkling Wine","75 cl bottle"],
  87:["Mateus Rosé","50 cl bottle"],
  88:["Still Water","50 cl bottle"],
  90:["Coca-Cola","33 cl can"],
  91:["Coca-Cola Zero","33 cl can"],
  92:["Fanta","33 cl can"],
  93:["Sprite","33 cl can"],
  94:["Peach Iced Tea","25 cl bottle"],
  95:["Lemon or Coconut Sorbet","Choose a flavour: lemon or coconut"],
  96:["Dark Chocolate, Fig and Copeta Spumone","Dark chocolate spumone with figs and copeta"],
  97:["Hazelnut and Chocolate Spumone","Hazelnut and chocolate spumone"],
  98:["Hazelnut and Pistachio Spumone","Hazelnut and pistachio spumone"],
  99:["Nutella Dessert","Choose piadina or calzone"]
};

let cart = {};
let cartToastTimeout;

function showCartToast() {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;
  toast.textContent = `✓ ${t("cartItemAdded")}`;
  toast.classList.add("is-visible");
  clearTimeout(cartToastTimeout);
  cartToastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}
let activeCategory = "Tutte";
let currentLanguage = "it";
try {
  currentLanguage = localStorage.getItem("laPergolaLanguage") === "en" ? "en" : "it";
} catch (error) {
  // The site remains usable when browser storage is unavailable.
}

const pickupDateInput = document.getElementById("pickup-date");
const pickupTimeInput = document.getElementById("pickup-time");
const bookingDateInput = document.getElementById("booking-date");
const bookingTimeInput = document.getElementById("booking-time");
function renderPickupTimes() {
  const slots = document.getElementById("pickup-time-slots");
  slots.replaceChildren();
  for (let minutes = 18 * 60 + 30; minutes <= 23 * 60; minutes += 10) {
    const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pickup-time-slot";
    button.textContent = time;
    button.dataset.pickupTime = time;
    button.setAttribute("aria-pressed", String(pickupTimeInput.value === time));
    if (pickupTimeInput.value === time) button.classList.add("is-selected");
    slots.appendChild(button);
  }
}

document.getElementById("pickup-time-slots").addEventListener("click", event => {
  const slot = event.target.closest("[data-pickup-time]");
  if (!slot) return;
  pickupTimeInput.value = slot.dataset.pickupTime;
  renderPickupTimes();
});

function renderBookingTimes() {
  const slots = document.getElementById("booking-time-slots");
  slots.replaceChildren();
  for (let minutes = 18 * 60 + 30; minutes <= 23 * 60; minutes += 15) {
    const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pickup-time-slot";
    button.textContent = time;
    button.dataset.bookingTime = time;
    button.setAttribute("aria-pressed", String(bookingTimeInput.value === time));
    if (bookingTimeInput.value === time) button.classList.add("is-selected");
    slots.appendChild(button);
  }
}

document.getElementById("booking-time-slots").addEventListener("click", event => {
  const slot = event.target.closest("[data-booking-time]");
  if (!slot) return;
  bookingTimeInput.value = slot.dataset.bookingTime;
  renderBookingTimes();
});

function dateOptionLabel(date) {
  return new Intl.DateTimeFormat(currentLanguage === "en" ? "en-GB" : "it-IT", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  }).format(date);
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function easterSunday(year) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day, 12);
}

function italianPublicHolidays(year) {
  const dates = [
    `${year}-01-01`, `${year}-01-06`, `${year}-04-25`, `${year}-05-01`,
    `${year}-06-02`, `${year}-08-15`, `${year}-11-01`, `${year}-12-08`,
    `${year}-12-25`, `${year}-12-26`
  ];
  const easterMonday = easterSunday(year);
  easterMonday.setDate(easterMonday.getDate() + 1);
  dates.push(formatLocalDate(easterMonday));
  return new Set(dates);
}

function isSpecialOpen(date) {
  // Availability is confirmed by the restaurant after the request is sent.
  return true;
}

const calendarMonths = {
  booking: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12),
  pickup: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12)
};

function renderCalendar(kind) {
  const picker = document.querySelector(`[data-calendar-picker="${kind}"]`);
  const input = document.getElementById(kind === "booking" ? "booking-date" : "pickup-date");
  const monthDate = calendarMonths[kind];
  const year = monthDate.getFullYear(), month = monthDate.getMonth();
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);
  picker.querySelector('[data-calendar-shift="-1"]').disabled =
    new Date(year, month, 1) <= currentMonth;
  const monthLabel = new Intl.DateTimeFormat(currentLanguage === "en" ? "en-GB" : "it-IT", {
    month: "long", year: "numeric"
  }).format(monthDate);
  picker.querySelector(".calendar-month").textContent = monthLabel;
  const grid = picker.querySelector(".calendar-grid");
  grid.replaceChildren();
  translations[currentLanguage].calendarWeekdays.forEach(day => {
    const heading = document.createElement("span");
    heading.className = "calendar-weekday";
    heading.textContent = day;
    grid.appendChild(heading);
  });
  const firstWeekday = (new Date(year, month, 1, 12).getDay() + 6) % 7;
  for (let blank = 0; blank < firstWeekday; blank++) {
    const empty = document.createElement("span");
    empty.className = "calendar-empty";
    grid.appendChild(empty);
  }
  const today = new Date(); today.setHours(0, 0, 0, 0);
  input.min = formatLocalDate(today);
  const holidays = italianPublicHolidays(year);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day, 12);
    const key = formatLocalDate(date);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.textContent = String(day);
    button.dataset.calendarDate = key;
    button.setAttribute("aria-label", dateOptionLabel(date));
    button.setAttribute("aria-pressed", String(input.value === key));
    if (date < today) button.disabled = true;
    if (holidays.has(key)) {
      button.classList.add("is-holiday");
      button.title = currentLanguage === "en" ? "Public holiday" : "Giorno festivo";
    }
    if (input.value === key) button.classList.add("is-selected");
    grid.appendChild(button);
  }
  const selected = input.value ? new Date(`${input.value}T12:00:00`) : null;
  const note = picker.querySelector(".calendar-note");
  if (note) note.textContent = selected && holidays.has(input.value)
    ? translations[currentLanguage].calendarHolidayClosed
    : selected && [1, 2].includes(selected.getDay())
      ? translations[currentLanguage].calendarMondayTuesday
      : "";
}

function renderPickupDates() { renderCalendar("pickup"); }
function renderBookingDates() { renderCalendar("booking"); }

document.querySelectorAll("[data-calendar-picker]").forEach(picker => {
  const kind = picker.dataset.calendarPicker;
  const input = document.getElementById(kind === "booking" ? "booking-date" : "pickup-date");
  picker.addEventListener("click", event => {
    const shift = event.target.closest("[data-calendar-shift]");
    const day = event.target.closest("[data-calendar-date]");
    if (shift) {
      calendarMonths[kind].setMonth(calendarMonths[kind].getMonth() + Number(shift.dataset.calendarShift));
      renderCalendar(kind);
    } else if (day) {
      input.value = day.dataset.calendarDate;
      renderCalendar(kind);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
});

[bookingDateInput, pickupDateInput].forEach(input => {
  input.addEventListener("change", () => {
    if (input.value) {
      const selected = new Date(`${input.value}T12:00:00`);
      const kind = input === bookingDateInput ? "booking" : "pickup";
      calendarMonths[kind] = new Date(selected.getFullYear(), selected.getMonth(), 1, 12);
      renderCalendar(kind);
    }
    updateOrderingAvailability();
  });
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function t(key) {
  return translations[currentLanguage][key];
}

function productName(item) {
  if (item.id === 99 && item.variant) {
    return currentLanguage === "en"
      ? `${item.variant === "Piadina" ? "Piadina" : "Calzone"} with Nutella`
      : `${item.variant} con Nutella`;
  }
  if (item.id === 95 && item.variant) {
    return currentLanguage === "en"
      ? `${item.variant === "limone" ? "Lemon" : "Coconut"} sorbet`
      : `Sorbetto al ${item.variant}`;
  }
  return currentLanguage === "en" ? (englishMenu[item.id]?.[0] || item.name) : item.name;
}

function productDescription(item) {
  return currentLanguage === "en" ? (englishMenu[item.id]?.[1] || item.description) : item.description;
}

function doughName(dough) {
  const labels = { classico: "doughClassic", cereali: "doughCereals", integrale: "doughWholemeal", doppio: "doughDouble" };
  return labels[dough] ? t(labels[dough]) : "";
}

function baseName(base) {
  const labels = {
    "piadina-integrale": "basePiadinaIntegrale",
    "margherita-bufala": "baseMargheritaBufala",
    "bianca-bufala": "baseBiancaBufala",
    margherita: "baseMargherita",
    bianca: "baseBianca",
    "rossa-senza-mozzarella": "baseRossaNoMozzarella"
  };
  return labels[base] ? t(labels[base]) : "";
}

function formatPrice(price) {
  return new Intl.NumberFormat(currentLanguage === "en" ? "en-IE" : "it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}

function renderCategories() {
  document.getElementById("categories").innerHTML =
    categoryOrder.map(category => `
      <button class="category-btn ${activeCategory === category ? "active" : ""}"
        data-category="${escapeHTML(category)}">
        ${escapeHTML(currentLanguage === "en" ? categoryTranslations[category] || category : category)}
      </button>
    `).join("");

  document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
      filterCategory(button.dataset.category);
    });
  });
}

function filterCategory(category) {
  activeCategory = category;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const products = activeCategory === "Tutte"
    ? menu
    : menu.filter(item => item.category === activeCategory);

  document.getElementById("products").innerHTML =
    products.map(item => `
      <article class="product-card">
        <h3>${escapeHTML(productName(item))}</h3>
        <p>${escapeHTML(productDescription(item))}</p>
        ${isPizza(item) ? `
          ${item.id !== 27 ? `
          <select id="base-choice-${item.id}" class="variant-select base-card-select"${item.id === 104 ? " hidden" : ""}
            aria-label="${escapeHTML(t("baseLabel"))}"
            onchange="updateProductPrice(${item.id})">
            ${baseOptions(item)}
          </select>
          ` : ""}
          ${hasSelectableDough(item) ? `
            <select id="dough-choice-${item.id}" class="variant-select dough-card-select"
              aria-label="${escapeHTML(t("doughLabel"))}"
              onchange="updateProductPrice(${item.id})">
              ${doughOptions(item)}
            </select>
          ` : ""}
        ` : ""}
        ${item.id === 99 ? `
          <label class="variant-label" for="nutella-choice">${escapeHTML(t("selectVersion"))}</label>
          <select id="nutella-choice" class="variant-select">
            <option value="">${escapeHTML(t("chooseVersion"))}</option>
            <option value="Piadina">${currentLanguage === "en" ? "Piadina (Italian flatbread)" : "Piadina"}</option>
            <option value="Calzone">Calzone</option>
          </select>
        ` : ""}
        ${item.id === 95 ? `
          <label class="variant-label" for="sorbet-flavor">${escapeHTML(t("selectFlavor"))}</label>
          <select id="sorbet-flavor" class="variant-select">
            <option value="">${escapeHTML(t("chooseFlavor"))}</option>
            <option value="limone">${currentLanguage === "en" ? "Lemon" : "Limone"}</option>
            <option value="cocco">${currentLanguage === "en" ? "Coconut" : "Cocco"}</option>
          </select>
        ` : ""}
        ${![100, 104].includes(item.id) ? `<div id="product-price-${item.id}" class="product-price">${formatPrice(item.price)}</div>` : ""}
        ${isCustomizable(item) ? `
          ${item.id !== 100 ? `
            <button class="add-button" onclick="addProductToCart(${item.id})">
              ${escapeHTML(t("addToCart"))}
            </button>
          ` : ""}
          <button class="add-button customize-button" onclick="openCustomization(${item.id})">
            ${escapeHTML(t("customizeProduct"))}
          </button>
        ` : `
          <button class="add-button" onclick="addToCart(${item.id}${item.id === 99 ? ", document.getElementById('nutella-choice').value" : item.id === 95 ? ", document.getElementById('sorbet-flavor').value" : ""})">
            ${escapeHTML(t("addToCart"))}
          </button>
        `}
      </article>
    `).join("");

  updateOrderingAvailability();
}

function isCustomizable(item) {
  return ["Le classiche", "Le nostre proposte", "Le pucce"].includes(item.category);
}

function isPizza(item) {
  return ["Le classiche", "Le nostre proposte"].includes(item.category);
}

function hasSelectableDough(item) {
  return isPizza(item) && item.id !== 37;
}

function includedDough(item) {
  if (/doppio\s+impasto/i.test(item.description)) return "doppio";
  if (/impasto\s+ai\s+cereali/i.test(item.description)) return "cereali";
  if (/impasto\s+integrale/i.test(item.description)) return "integrale";
  return "";
}

function hasChangedDough(item) {
  if (!item.dough) return false;
  return item.dough !== (includedDough(item) || "classico");
}

function hasChangedBase(item) {
  return Boolean(item.base && item.base !== defaultBase(item));
}

function doughOptions(item) {
  const choices = ["classico", "cereali", "integrale"];
  if (includedDough(item) === "doppio") choices.push("doppio");
  const currentDough = includedDough(item) || "classico";
  return choices.map(dough => {
    const surcharge = doughSurcharge(item, dough);
    const surchargeLabel = surcharge ? ` (+${formatPrice(surcharge)})` : "";
    return `<option value="${dough}"${dough === currentDough ? " selected" : ""}>${escapeHTML(doughName(dough))}${surchargeLabel}</option>`;
  }).join("");
}

function defaultBase(item) {
  if ([26, 104].includes(item.id)) return "piadina-integrale";
  const firstIngredient = item.description
    .split(",")
    .map(ingredient => ingredient.trim())
    .find(ingredient => !/^(?:impasto\s+(?:integrale|ai\s+cereali)|doppio\s+impasto)$/i.test(ingredient)) || "";
  const startsWithTomato = /^pomodoro\b/i.test(firstIngredient);
  if (hasBufalaBase(item)) return startsWithTomato ? "margherita-bufala" : "bianca-bufala";
  const hasMozzarella = /\bmozzarella\b/i.test(item.description);
  return startsWithTomato && hasMozzarella ? "margherita" : "bianca";
}

function hasBufalaBase(item) {
  return (item.id === 4 || item.category === "Le nostre proposte") && /mozzarella\s+di\s+bufala/i.test(item.description);
}

function baseOptions(item) {
  const choices = hasBufalaBase(item)
    ? ["margherita-bufala", "bianca-bufala"]
    : ["margherita", "bianca"];
  const pizzasWithoutRedBase = [4, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
  if (!pizzasWithoutRedBase.includes(item.id)) choices.push("rossa-senza-mozzarella");
  if (item.id === 26) choices.unshift("piadina-integrale");
  if (item.id === 104) return `<option value="piadina-integrale" selected>${escapeHTML(t("basePiadinaIntegrale"))} ${escapeHTML(t("baseDefaultLabel"))}</option>`;
  const labels = {
    "piadina-integrale": "basePiadinaIntegrale",
    "margherita-bufala": "baseMargheritaBufala",
    "bianca-bufala": "baseBiancaBufala",
    margherita: "baseMargherita",
    bianca: "baseBianca",
    "rossa-senza-mozzarella": "baseRossaNoMozzarella"
  };
  const currentBase = defaultBase(item);
  return choices.map(base => {
    const surcharge = baseSurcharge(item, base);
    const surchargeLabel = surcharge > 0 ? ` (+${formatPrice(surcharge)})` : "";
    const defaultLabel = base === currentBase ? ` ${t("baseDefaultLabel")}` : "";
    return `<option value="${base}"${base === currentBase ? " selected" : ""}>${escapeHTML(t(labels[base]))}${escapeHTML(defaultLabel)}${surchargeLabel}</option>`;
  }).join("");
}

function baseSurcharge(item, base) {
  if ([26].includes(item?.id) && ["bianca", "margherita"].includes(base)) return 1;
  return base === "rossa-senza-mozzarella" ? -0.5 : 0;
}

function doughSurcharge(item, dough) {
  if (includedDough(item)) return 0;
  return dough === "cereali" || dough === "integrale" ? 1.5 : 0;
}

function selectedDough(id) {
  return document.getElementById(`dough-choice-${id}`)?.value || "";
}

function selectedBase(id) {
  return document.getElementById(`base-choice-${id}`)?.value || "";
}

function updateProductPrice(id) {
  const item = menu.find(product => product.id === id);
  const price = document.getElementById(`product-price-${id}`);
  if (!item || !price) return;
  price.textContent = formatPrice(item.price + doughSurcharge(item, selectedDough(id)) + baseSurcharge(item, selectedBase(id)));
}

function addProductToCart(id) {
  const item = menu.find(product => product.id === id);
  const dough = selectedDough(id) || includedDough(item) || (isPizza(item) ? "classico" : "");
  addToCart(id, "", [], dough, [], selectedBase(id));
}

const customizationDialog = document.getElementById("customization-dialog");
let customizationItem = null;
let customizationDough = "";
let customizationBase = "";

function extrasForCustomization() {
  if (customizationItem?.id === 104) return tipoPiadinaExtras;
  return customizationItem?.category === "Le pucce" ? pucciaExtras : paidExtras;
}

function openCustomization(id) {
  if (!isCartBuildingOpen()) return;
  customizationItem = menu.find(product => product.id === id);
  if (!customizationItem) return;

  customizationDough = isPizza(customizationItem)
    ? (selectedDough(id) || includedDough(customizationItem) || "classico")
    : "";
  customizationBase = isPizza(customizationItem)
    ? (selectedBase(id) || defaultBase(customizationItem))
    : "";
  document.getElementById("customization-title").textContent = productName(customizationItem);
  const customizationBasePrice = document.getElementById("customization-base-price");
  customizationBasePrice.hidden = [100, 104].includes(customizationItem.id);
  customizationBasePrice.textContent = `${t("basePrice")}: ${formatPrice(customizationItem.price + doughSurcharge(customizationItem, customizationDough) + baseSurcharge(customizationItem, customizationBase))}`;
  const removalSection = document.querySelector(".removal-section");
  removalSection.hidden = customizationItem.category === "Le pucce" || customizationItem.id === 104;
  const ingredients = removableIngredientsByProduct[customizationItem.id] || [];
  document.getElementById("removable-ingredients").innerHTML = ingredients.map((ingredient, index) => `
    <label class="customization-option">
      <input type="checkbox" value="${index}" data-ingredient="${escapeHTML(ingredient)}">
      <span>${escapeHTML(ingredient)}</span>
    </label>
  `).join("");
  document.getElementById("customization-options").innerHTML = extrasForCustomization().map(extra => `
    <label class="customization-option">
      <input type="checkbox" value="${escapeHTML(extra.id)}" onchange="updateCustomizationTotal('${escapeHTML(extra.id)}', this.checked)">
      <span>${escapeHTML(extra.name)}</span>
      <small>${escapeHTML(t("extraPrice").replace("{price}", formatPrice(extra.price)))}</small>
    </label>
  `).join("");
  updateCustomizationTotal();
  customizationDialog.showModal();
}

function updateCustomizationTotal(changedExtraId, isChecked) {
  if (!customizationItem) return;
  const availableExtras = extrasForCustomization();
  const changedExtra = availableExtras.find(extra => extra.id === changedExtraId);
  if (isChecked && changedExtra?.exclusiveGroup) {
    availableExtras
      .filter(extra => extra.exclusiveGroup === changedExtra.exclusiveGroup && extra.id !== changedExtraId)
      .forEach(extra => {
        const checkbox = document.querySelector(`#customization-options input[value="${CSS.escape(extra.id)}"]`);
        if (checkbox) checkbox.checked = false;
      });
  }
  const selected = [...document.querySelectorAll("#customization-options input:checked")];
  document.getElementById("confirm-customization").disabled = customizationItem.id === 100 && selected.length === 0;
  const extrasTotal = selected.reduce((sum, input) =>
    sum + (availableExtras.find(extra => extra.id === input.value)?.price || 0), 0);
  const customizationTotal = document.getElementById("customization-total");
  customizationTotal.textContent = customizationItem.id === 100 && extrasTotal === 0
    ? ""
    : formatPrice(customizationItem.price + doughSurcharge(customizationItem, customizationDough) + baseSurcharge(customizationItem, customizationBase) + extrasTotal);
}

function confirmCustomization() {
  if (!customizationItem || !isCartBuildingOpen()) return;
  const extras = [...document.querySelectorAll("#customization-options input:checked")]
    .map(input => extrasForCustomization().find(extra => extra.id === input.value))
    .filter(Boolean);
  if (customizationItem.id === 100 && extras.length === 0) return;
  const removedIngredients = [...document.querySelectorAll("#removable-ingredients input:checked")]
    .map(input => input.dataset.ingredient);
  addToCart(customizationItem.id, "", extras, customizationDough, removedIngredients, customizationBase);
  customizationDialog.close();
  customizationItem = null;
  customizationDough = "";
  customizationBase = "";
}

document.getElementById("close-customization").addEventListener("click", () => customizationDialog.close());
document.getElementById("confirm-customization").addEventListener("click", confirmCustomization);
customizationDialog.addEventListener("click", event => {
  if (event.target === customizationDialog) customizationDialog.close();
});

function addToCart(id, variant = "", extras = [], dough = "", removedIngredients = [], base = "") {
  if (!isCartBuildingOpen()) return;
  const item = menu.find(product => product.id === id);
  if (!item) return;

  if (id === 99 && !variant) {
    alert(t("chooseDessertAlert"));
    return;
  }
  if (id === 95 && !variant) {
    alert(t("chooseSorbetAlert"));
    return;
  }

  const extrasKey = extras.map(extra => extra.id).sort().join(",");
  const removalsKey = removedIngredients.slice().sort().join(",");
  const cartKey = [id, variant, extrasKey, dough, removalsKey, base].filter(Boolean).join(":") || String(id);
  if (!cart[cartKey]) {
    cart[cartKey] = {
      ...item,
      variant,
      extras,
      dough,
      removedIngredients,
      base,
      price: item.price + doughSurcharge(item, dough) + baseSurcharge(item, base) + extras.reduce((sum, extra) => sum + extra.price, 0),
      cartKey,
      quantity: 0
    };
  }

  cart[cartKey].quantity++;
  renderCart();
  showCartToast();
}

function changeQuantity(cartKey, change) {
  if (!cart[cartKey]) return;

  cart[cartKey].quantity += change;

  if (cart[cartKey].quantity <= 0) {
    delete cart[cartKey];
  }

  renderCart();
}

function renderCart() {
  const items = Object.values(cart);
  const cartItems = document.getElementById("cart-items");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cart-total").textContent = formatPrice(total);

  const cartTopSummary = document.getElementById("cart-top-summary");
  if (cartTopSummary) {
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
    cartTopSummary.textContent = `${quantity} · ${formatPrice(total)}`;
    cartTopSummary.setAttribute("aria-label", `${quantity} ${t("cartTopItems")}, ${formatPrice(total)}`);
  }

  if (items.length === 0) {
    cartItems.innerHTML = `<p>${escapeHTML(t("cartEmpty"))}</p>`;
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${escapeHTML(productName(item))}</strong>
        <small>${formatPrice(item.price)} ${escapeHTML(t("quantityEach"))}</small>
        ${hasChangedDough(item) ? `<small>${escapeHTML(t("doughLabel"))}: ${escapeHTML(doughName(item.dough))}</small>` : ""}
        ${hasChangedBase(item) ? `<small>${escapeHTML(t("baseLabel"))}: ${escapeHTML(baseName(item.base))}</small>` : ""}
        ${item.removedIngredients?.length ? `<small>${escapeHTML(t("withoutIngredients"))}: ${item.removedIngredients.map(escapeHTML).join(", ")}</small>` : ""}
        ${item.extras?.length ? `<small>${escapeHTML(t("extrasLabel"))}: ${item.extras.map(extra => escapeHTML(extra.name)).join(", ")}</small>` : ""}
      </div>

      <div class="quantity-controls">
        <button onclick="changeQuantity('${escapeHTML(item.cartKey || String(item.id))}', -1)">−</button>
        <strong>${item.quantity}</strong>
        <button onclick="changeQuantity('${escapeHTML(item.cartKey || String(item.id))}', 1)">+</button>
      </div>

      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>
  `).join("");
}

const recommendationDialog = document.getElementById("recommendation-dialog");
const recommendationIds = [90, 92, 93, 77, 73, 72, 69, 68];

function renderRecommendations() {
  document.getElementById("recommendation-list").innerHTML = recommendationIds
    .map(id => menu.find(item => item.id === id))
    .filter(Boolean)
    .map(item => {
      const quantity = cart[String(item.id)]?.quantity || 0;
      const quantityLabel = t("recommendationQuantity").replace("{count}", quantity);
      return `
        <article class="recommendation-card">
          <h3>${escapeHTML(productName(item))}</h3>
          <p>${escapeHTML(productDescription(item))}</p>
          <strong>${formatPrice(item.price)}</strong>
          ${quantity ? `<p class="recommendation-quantity">${escapeHTML(quantityLabel)}</p>` : ""}
          <button class="recommendation-add" type="button" data-product-id="${item.id}">
            ${escapeHTML(t(quantity ? "addAnotherRecommendation" : "addRecommendation"))}
          </button>
        </article>
      `;
    }).join("");

  document.querySelectorAll(".recommendation-add").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.productId));
      renderRecommendations();
    });
  });
}

function completeOrder() {
  if (!isWhatsAppOrderingOpen()) return;
  if (recommendationDialog.open) recommendationDialog.close();
  sendOrderToWhatsApp();
}

function sendOrderToWhatsApp() {
  if (!isWhatsAppOrderingOpen()) return;
  const items = Object.values(cart);
  const customerName = document.getElementById("customer-name").value.trim();
  const pickupDate = pickupDateInput.value;
  const pickupTime = pickupTimeInput.value;
  const notes = document.getElementById("order-notes").value.trim();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  let message = `${t("orderHeading")}%0A%0A`;
  message += `*${t("orderName")}:* ` + encodeURIComponent(customerName) + "%0A";
  message += `*${t("orderPickupDate")}:* ` + encodeURIComponent(pickupDate.split("-").reverse().join("/")) + "%0A";
  message += `*${t("orderPickupTime")}:* ` + encodeURIComponent(pickupTime) + "%0A%0A";
  message += `*${t("orderLabel")}:*%0A`;

  items.forEach(item => {
    const line = item.quantity + " x " + productName(item) +
      (hasChangedDough(item) ? ` (${t("doughLabel")}: ${doughName(item.dough)})` : "") +
      (hasChangedBase(item) ? ` (${t("baseLabel")}: ${baseName(item.base)})` : "") +
      (item.removedIngredients?.length ? ` (${t("withoutIngredients")}: ${item.removedIngredients.join(", ")})` : "") +
      (item.extras?.length ? ` (${t("extrasLabel")}: ${item.extras.map(extra => extra.name).join(", ")})` : "") +
      " - " + formatPrice(item.price * item.quantity);
    message += encodeURIComponent(line) + "%0A";
  });

  message += `%0A*${t("orderTotal")}: ` + encodeURIComponent(formatPrice(total)) + "*";

  if (notes) {
    message += `%0A%0A*${t("orderNotesLabel")}:* ` + encodeURIComponent(notes);
  }

  message += `%0A%0A_${t("orderConfirmation")}_`;

  const whatsappURL =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + message;

  window.open(whatsappURL, "_blank");
}

document.getElementById("order-form").addEventListener("submit", function(event) {
  event.preventDefault();
  if (Object.keys(cart).length === 0) {
    alert(t("emptyCartAlert"));
    return;
  }

  const customerName = document.getElementById("customer-name").value.trim();
  if (!customerName || !pickupDateInput.value || !pickupTimeInput.value) {
    alert(t("nameDateTimeAlert"));
    return;
  }

  if (!isWhatsAppOrderingOpen()) {
    updateOrderingAvailability();
    return;
  }

  renderRecommendations();
  recommendationDialog.showModal();
});

document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("booking-name").value.trim();
  const date = bookingDateInput.value;
  const time = bookingTimeInput.value;
  const guests = document.getElementById("booking-guests").value;
  const notes = document.getElementById("booking-notes").value.trim();
  if (!date) {
    alert(t("bookingDateRequired"));
    return;
  }
  if (!time) {
    alert(t("bookingTimeRequired"));
    return;
  }
  if (bookingRequiresPhone(date)) {
    return;
  }
  const chosenDate = new Date(`${date}T12:00:00`);
  if (!isSpecialOpen(chosenDate)) {
    alert(t("bookingClosedDate"));
    return;
  }

  const lines = [
    `*${t("bookingHeading")}*`,
    `*${t("customerName")}:* ${name}`,
    `*${t("bookingDate")}:* ${date.split("-").reverse().join("/")}`,
    `*${t("bookingTime")}:* ${time}`,
    `*${t("bookingGuests")}:* ${guests}`
  ];
  if (notes) lines.push(`*${t("orderNotes")}:* ${notes}`);
  lines.push(`_${t("bookingSent")}_`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
});

document.getElementById("continue-whatsapp").addEventListener("click", () => {
  completeOrder();
});

function returnToCart() {
  recommendationDialog.close();
  document.getElementById("cart").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("back-to-cart").addEventListener("click", returnToCart);

recommendationDialog.addEventListener("cancel", event => {
  event.preventDefault();
  returnToCart();
});

function applyLanguage() {
  const copy = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    if (copy[key]) element.placeholder = copy[key];
  });

  document.title = "La Pergola Galugnano";
  document.querySelector('meta[name="description"]').content = currentLanguage === "en"
    ? "Discover the menu at La Pergola Pizzeria and order takeaway on WhatsApp."
    : "Scopri il menù della Pizzeria La Pergola e ordina da asporto su WhatsApp.";

  const languageButton = document.getElementById("language-toggle");
  languageButton.textContent = currentLanguage === "it" ? "🇬🇧 EN" : "🇮🇹 IT";
  languageButton.setAttribute("aria-label", currentLanguage === "it"
    ? "View this site in English"
    : "Visualizza il sito in italiano");

  renderPickupDates();
  renderBookingDates();
  renderPickupTimes();
  renderBookingTimes();
  renderCategories();
  renderProducts();
  renderCart();
  renderRecommendations();
  updateOrderingAvailability();
}

function updateOrderingAvailability() {
  const availability = getContactAvailability();
  const pickupDate = pickupDateInput.value;
  const orderingOpen = isWhatsAppOrderingOpen(pickupDate);
  const callAvailable = pickupDate === availability.businessDate && availability.phone;
  document.getElementById("cart-items").hidden = false;
  document.querySelector(".cart-total").hidden = false;
  document.querySelector(".cart-panel h2").hidden = false;
  document.querySelector(".cart-panel > .eyebrow").hidden = false;
  document.querySelector(".cart-menu-link").hidden = false;
  document.querySelector(".cart-disclaimer").hidden = !orderingOpen;
  document.getElementById("order-form").hidden = false;
  document.getElementById("order-whatsapp").hidden = !orderingOpen;
  document.getElementById("call-us").hidden = !callAvailable;
  document.getElementById("cart-phone-notice").hidden = !callAvailable;
  document.getElementById("booking-form").hidden = false;
  const bookingPhoneOnly = bookingRequiresPhone(bookingDateInput.value, availability);
  document.getElementById("booking-whatsapp").hidden = bookingPhoneOnly;
  document.getElementById("booking-call").hidden = !bookingPhoneOnly;
  document.querySelectorAll(".add-button").forEach(button => {
    button.disabled = false;
  });
}

document.getElementById("language-toggle").addEventListener("click", () => {
  currentLanguage = currentLanguage === "it" ? "en" : "it";
  try {
    localStorage.setItem("laPergolaLanguage", currentLanguage);
  } catch (error) {
    // Language switching still works for this visit if storage is unavailable.
  }
  applyLanguage();
});

document.querySelector(".booking-button").addEventListener("click", event => {
  event.preventDefault();
  const bookingSection = document.getElementById("prenotazione");
  const bookingPanel = bookingSection.querySelector(".booking-panel");
  const bookingToggle = bookingPanel.querySelector(".booking-toggle");
  const bookingContent = bookingPanel.querySelector(".booking-content");
  bookingPanel.open = true;
  if (window.location.hash !== "#prenotazione") {
    window.location.hash = "prenotazione";
  }
  requestAnimationFrame(() => {
    bookingPanel.open = true;
    bookingContent.scrollIntoView({ behavior: "smooth", block: "start" });
    bookingToggle.focus({ preventScroll: true });
  });
});

renderCategories();
filterCategory("Le nostre proposte");
renderCart();
renderBookingTimes();
applyLanguage();
updateOrderingAvailability();
window.setInterval(updateOrderingAvailability, 60 * 1000);





















