/* Sardegna Autentica – gastengids
   Laadt per woning content/woningen/<slug>.json plus de gedeelde bestanden
   (stranden, partners, algemeen) en bouwt daar de gids van. */
(function () {
  "use strict";

  var LANGS = ["en", "it", "fr", "nl", "de"];
  var UI = {
    nl: {
      nav: { aankomst: "Aankomst", wifi: "Wifi", regels: "Huisregels", stranden: "Stranden", tips: "Tips", eten: "Eten", partners: "Uitjes", extras: "Extra's", nood: "Hulp" },
      arrive: "Aankomst & vertrek", checkin: "Inchecken", checkout: "Uitchecken", address: "Adres", route: "Route openen",
      parking: "Parkeren", transport: "Bereikbaarheid", wifi: "Wifi", network: "Netwerk", password: "Wachtwoord",
      copy: "Kopieer", copied: "Gekopieerd", rules: "Huisregels", beaches: "Stranden", windQ: "Welke wind waait er vandaag?",
      windHint: "Op Sardinië bepaalt de wind welk strand rustig is. Kijk 's ochtends in een windapp en kies hieronder.",
      winds: { maestrale: "Maestrale (NW)", ponente: "Ponente (W)", scirocco: "Scirocco (ZO)", levante: "Levante (O)", calma: "Weinig wind" },
      calm: "Rustig bij deze wind", book: "Reserveren", bookLink: "Reserveren", map: "Kaart", tips: "Tips van je host",
      food: "Eten & drinken", partners: "Uitjes & adressen", partnerLabel: "Aanbevolen partner",
      kinds: { boot: "Boottochten", excursie: "Excursies", restaurant: "Restaurants", verhuur: "Verhuur", winkel: "Winkels & producten" },
      zones: { cagliari: "Cagliari en Poetto", "quartu-villasimius": "Quartu – Villasimius", "costa-rei": "Costa Rei – Muravera", "sud-ovest": "Pula – Chia – Teulada", sulcis: "Sulcis – Iglesiente", oristano: "Oristano – Sinis", binnenland: "Binnenland" },
      install: { title: "Altijd bij de hand", text: "Zet deze gids op je beginscherm. Hij werkt dan als een app, ook zonder internet.", btn: "Zet op beginscherm", ios: "Tik onderaan in Safari op het deelicoon (vierkantje met pijl) en kies 'Zet op beginscherm'.", other: "Open het menu van je browser en kies 'Toevoegen aan startscherm'.", close: "Sluiten" },
      about: { title: "Gemaakt door Sardegna Autentica", text: "Lokale specialist in Zuid-Sardinië. Meer tips, routes of hulp bij het plannen van je reis?", link: "Bekijk de website" },
      call: "Bellen", whatsapp: "WhatsApp", website: "Website", extras: "Extra's voor je verblijf", extrasIntro: "Aanvragen gaat via WhatsApp bij je host.",
      request: "Aanvragen", requestMsg: "Hallo! Ik verblijf in {home} en wil graag aanvragen: {item}.",
      help: "Hulp & nood", host: "Je host", reachable: "Bereikbaar", notFound: "Deze gids bestaat niet.",
      notFoundHint: "Controleer de link of vraag je host om de juiste link.", inactive: "Deze gids is niet meer actief.",
      offline: "Je bent offline. Je ziet de laatst opgeslagen versie.", loadError: "De gids kon niet worden geladen. Probeer het opnieuw."
    },
    en: {
      nav: { aankomst: "Arrival", wifi: "Wifi", regels: "House rules", stranden: "Beaches", tips: "Tips", eten: "Food", partners: "Things to do", extras: "Extras", nood: "Help" },
      arrive: "Arrival & departure", checkin: "Check-in", checkout: "Check-out", address: "Address", route: "Open route",
      parking: "Parking", transport: "Getting here", wifi: "Wifi", network: "Network", password: "Password",
      copy: "Copy", copied: "Copied", rules: "House rules", beaches: "Beaches", windQ: "Which wind is blowing today?",
      windHint: "In Sardinia the wind decides which beach is calm. Check a wind app in the morning and pick below.",
      winds: { maestrale: "Mistral (NW)", ponente: "Ponente (W)", scirocco: "Scirocco (SE)", levante: "Levante (E)", calma: "Little wind" },
      calm: "Calm in this wind", book: "Booking required", bookLink: "Book", map: "Map", tips: "Tips from your host",
      food: "Food & drink", partners: "Things to do & places", partnerLabel: "Recommended partner",
      kinds: { boot: "Boat trips", excursie: "Excursions", restaurant: "Restaurants", verhuur: "Rentals", winkel: "Shops & local products" },
      zones: { cagliari: "Cagliari and Poetto", "quartu-villasimius": "Quartu – Villasimius", "costa-rei": "Costa Rei – Muravera", "sud-ovest": "Pula – Chia – Teulada", sulcis: "Sulcis – Iglesiente", oristano: "Oristano – Sinis", binnenland: "Inland" },
      install: { title: "Always at hand", text: "Add this guide to your home screen. It then works like an app, even offline.", btn: "Add to home screen", ios: "In Safari, tap the share icon at the bottom (square with an arrow) and choose 'Add to Home Screen'.", other: "Open your browser menu and choose 'Add to home screen'.", close: "Close" },
      about: { title: "Made by Sardegna Autentica", text: "Local specialists in southern Sardinia. Looking for more tips, routes or help planning your trip?", link: "Visit the website" },
      call: "Call", whatsapp: "WhatsApp", website: "Website", extras: "Extras for your stay", extrasIntro: "Requests go to your host on WhatsApp.",
      request: "Request", requestMsg: "Hello! I'm staying at {home} and would like to request: {item}.",
      help: "Help & emergency", host: "Your host", reachable: "Available", notFound: "This guide doesn't exist.",
      notFoundHint: "Check the link or ask your host for the right one.", inactive: "This guide is no longer active.",
      offline: "You're offline. This is the last saved version.", loadError: "The guide couldn't load. Please try again."
    },
    it: {
      nav: { aankomst: "Arrivo", wifi: "Wifi", regels: "Regole", stranden: "Spiagge", tips: "Consigli", eten: "Cibo", partners: "Da fare", extras: "Extra", nood: "Aiuto" },
      arrive: "Arrivo e partenza", checkin: "Check-in", checkout: "Check-out", address: "Indirizzo", route: "Apri percorso",
      parking: "Parcheggio", transport: "Come arrivare", wifi: "Wifi", network: "Rete", password: "Password",
      copy: "Copia", copied: "Copiato", rules: "Regole della casa", beaches: "Spiagge", windQ: "Che vento tira oggi?",
      windHint: "In Sardegna è il vento a decidere quale spiaggia è calma. Controllate un'app del vento al mattino e scegliete qui sotto.",
      winds: { maestrale: "Maestrale (NO)", ponente: "Ponente (O)", scirocco: "Scirocco (SE)", levante: "Levante (E)", calma: "Poco vento" },
      calm: "Calma con questo vento", book: "Su prenotazione", bookLink: "Prenota", map: "Mappa", tips: "Consigli del vostro host",
      food: "Mangiare e bere", partners: "Cosa fare e indirizzi", partnerLabel: "Partner consigliato",
      kinds: { boot: "Gite in barca", excursie: "Escursioni", restaurant: "Ristoranti", verhuur: "Noleggi", winkel: "Negozi e prodotti locali" },
      zones: { cagliari: "Cagliari e Poetto", "quartu-villasimius": "Quartu – Villasimius", "costa-rei": "Costa Rei – Muravera", "sud-ovest": "Pula – Chia – Teulada", sulcis: "Sulcis – Iglesiente", oristano: "Oristano – Sinis", binnenland: "Entroterra" },
      install: { title: "Sempre a portata di mano", text: "Aggiungete questa guida alla schermata Home. Funziona come un'app, anche senza internet.", btn: "Aggiungi alla schermata Home", ios: "In Safari toccate l'icona di condivisione in basso (quadrato con freccia) e scegliete 'Aggiungi alla schermata Home'.", other: "Aprite il menu del browser e scegliete 'Aggiungi alla schermata Home'.", close: "Chiudi" },
      about: { title: "Realizzata da Sardegna Autentica", text: "Specialisti locali del sud Sardegna. Cercate altri consigli, itinerari o aiuto per organizzare il viaggio?", link: "Visitate il sito" },
      call: "Chiama", whatsapp: "WhatsApp", website: "Sito web", extras: "Extra per il soggiorno", extrasIntro: "Le richieste vanno al vostro host su WhatsApp.",
      request: "Richiedi", requestMsg: "Ciao! Soggiorno a {home} e vorrei richiedere: {item}.",
      help: "Aiuto ed emergenze", host: "Il vostro host", reachable: "Disponibile", notFound: "Questa guida non esiste.",
      notFoundHint: "Controllate il link o chiedete al vostro host quello giusto.", inactive: "Questa guida non è più attiva.",
      offline: "Siete offline. Questa è l'ultima versione salvata.", loadError: "Impossibile caricare la guida. Riprovate."
    },
    fr: {
      nav: { aankomst: "Arrivée", wifi: "Wi-Fi", regels: "Règles", stranden: "Plages", tips: "Conseils", eten: "Manger", partners: "À faire", extras: "Extras", nood: "Aide" },
      arrive: "Arrivée et départ", checkin: "Arrivée", checkout: "Départ", address: "Adresse", route: "Ouvrir l'itinéraire",
      parking: "Stationnement", transport: "Comment venir", wifi: "Wi-Fi", network: "Réseau", password: "Mot de passe",
      copy: "Copier", copied: "Copié", rules: "Règles de la maison", beaches: "Plages", windQ: "Quel vent souffle aujourd'hui ?",
      windHint: "En Sardaigne, c'est le vent qui décide quelle plage est calme. Consultez une appli de vent le matin et choisissez ci-dessous.",
      winds: { maestrale: "Mistral (NO)", ponente: "Ponente (O)", scirocco: "Sirocco (SE)", levante: "Levante (E)", calma: "Peu de vent" },
      calm: "Calme avec ce vent", book: "Réservation obligatoire", bookLink: "Réserver", map: "Carte", tips: "Les conseils de votre hôte",
      food: "Manger et boire", partners: "Activités et adresses", partnerLabel: "Partenaire recommandé",
      kinds: { boot: "Excursions en bateau", excursie: "Excursions", restaurant: "Restaurants", verhuur: "Location", winkel: "Boutiques et produits locaux" },
      zones: { cagliari: "Cagliari et Poetto", "quartu-villasimius": "Quartu – Villasimius", "costa-rei": "Costa Rei – Muravera", "sud-ovest": "Pula – Chia – Teulada", sulcis: "Sulcis – Iglesiente", oristano: "Oristano – Sinis", binnenland: "Arrière-pays" },
      install: { title: "Toujours à portée de main", text: "Ajoutez ce guide à votre écran d'accueil. Il fonctionne alors comme une appli, même sans internet.", btn: "Ajouter à l'écran d'accueil", ios: "Dans Safari, touchez l'icône de partage en bas (carré avec une flèche) et choisissez « Sur l'écran d'accueil ».", other: "Ouvrez le menu de votre navigateur et choisissez « Ajouter à l'écran d'accueil ».", close: "Fermer" },
      about: { title: "Réalisé par Sardegna Autentica", text: "Spécialistes locaux du sud de la Sardaigne. Envie de plus de conseils, d'itinéraires ou d'aide pour organiser votre voyage ?", link: "Voir le site" },
      call: "Appeler", whatsapp: "WhatsApp", website: "Site web", extras: "Extras pour votre séjour", extrasIntro: "Les demandes passent par WhatsApp auprès de votre hôte.",
      request: "Demander", requestMsg: "Bonjour ! Je séjourne à {home} et je souhaiterais demander : {item}.",
      help: "Aide et urgences", host: "Votre hôte", reachable: "Joignable", notFound: "Ce guide n'existe pas.",
      notFoundHint: "Vérifiez le lien ou demandez le bon lien à votre hôte.", inactive: "Ce guide n'est plus actif.",
      offline: "Vous êtes hors ligne. Voici la dernière version enregistrée.", loadError: "Le guide n'a pas pu être chargé. Veuillez réessayer."
    },
    de: {
      nav: { aankomst: "Anreise", wifi: "WLAN", regels: "Hausregeln", stranden: "Strände", tips: "Tipps", eten: "Essen", partners: "Ausflüge", extras: "Extras", nood: "Hilfe" },
      arrive: "Anreise & Abreise", checkin: "Check-in", checkout: "Check-out", address: "Adresse", route: "Route öffnen",
      parking: "Parken", transport: "Anfahrt", wifi: "WLAN", network: "Netzwerk", password: "Passwort",
      copy: "Kopieren", copied: "Kopiert", rules: "Hausregeln", beaches: "Strände", windQ: "Welcher Wind weht heute?",
      windHint: "Auf Sardinien entscheidet der Wind, welcher Strand ruhig ist. Schaut morgens in eine Wind-App und wählt unten.",
      winds: { maestrale: "Mistral (NW)", ponente: "Ponente (W)", scirocco: "Scirocco (SO)", levante: "Levante (O)", calma: "Wenig Wind" },
      calm: "Ruhig bei diesem Wind", book: "Reservierung nötig", bookLink: "Reservieren", map: "Karte", tips: "Tipps von eurem Gastgeber",
      food: "Essen & Trinken", partners: "Ausflüge & Adressen", partnerLabel: "Empfohlener Partner",
      kinds: { boot: "Bootsausflüge", excursie: "Ausflüge", restaurant: "Restaurants", verhuur: "Verleih", winkel: "Läden & lokale Produkte" },
      zones: { cagliari: "Cagliari und Poetto", "quartu-villasimius": "Quartu – Villasimius", "costa-rei": "Costa Rei – Muravera", "sud-ovest": "Pula – Chia – Teulada", sulcis: "Sulcis – Iglesiente", oristano: "Oristano – Sinis", binnenland: "Hinterland" },
      install: { title: "Immer griffbereit", text: "Legt diesen Guide auf euren Startbildschirm. Er funktioniert dann wie eine App, auch offline.", btn: "Zum Startbildschirm", ios: "Tippt in Safari unten auf das Teilen-Symbol (Quadrat mit Pfeil) und wählt 'Zum Home-Bildschirm'.", other: "Öffnet das Browsermenü und wählt 'Zum Startbildschirm hinzufügen'.", close: "Schließen" },
      about: { title: "Erstellt von Sardegna Autentica", text: "Lokale Spezialisten für Südsardinien. Mehr Tipps, Routen oder Hilfe bei der Reiseplanung?", link: "Zur Website" },
      call: "Anrufen", whatsapp: "WhatsApp", website: "Website", extras: "Extras für euren Aufenthalt", extrasIntro: "Anfragen gehen per WhatsApp an euren Gastgeber.",
      request: "Anfragen", requestMsg: "Hallo! Ich wohne in {home} und möchte anfragen: {item}.",
      help: "Hilfe & Notfall", host: "Euer Gastgeber", reachable: "Erreichbar", notFound: "Diesen Guide gibt es nicht.",
      notFoundHint: "Prüft den Link oder fragt euren Gastgeber nach dem richtigen.", inactive: "Dieser Guide ist nicht mehr aktiv.",
      offline: "Ihr seid offline. Das ist die zuletzt gespeicherte Version.", loadError: "Der Guide konnte nicht geladen werden. Bitte erneut versuchen."
    }
  };

  var state = { lang: "en", wind: null, home: null, beaches: [], partners: [], general: {} };
  var installEvent = null;
  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  }
  function isIos() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }
  function installDismissed() {
    try { return localStorage.getItem("sa-install-closed") === "1"; } catch (e) { return false; }
  }
  function installHtml() {
    if (isStandalone() || installDismissed()) return "";
    var i = UI[state.lang].install;
    var action = installEvent
      ? '<button type="button" class="btn" id="install-btn" data-install="1">' + esc(i.btn) + "</button>"
      : '<p class="note">' + esc(isIos() ? i.ios : i.other) + "</p>";
    return '<div class="install" id="install"><div class="install-body"><h3>' + esc(i.title) + "</h3><p>" + esc(i.text) + "</p>" + action + "</div>" +
      '<button type="button" class="install-close" id="install-close" data-install-close="1" aria-label="' + esc(i.close) + '">×</button></div>';
  }
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    installEvent = e;
    if (state.home) render();
  });
  window.addEventListener("appinstalled", function () {
    installEvent = null;
    var el = document.getElementById("install"); if (el) el.remove();
  });
  var $ = function (s) { return document.querySelector(s); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    return /^https?:\/\//i.test(u) ? u : "";
  }
  function mediaUrl(u) {
    u = String(u || "").trim();
    if (!u) return "";
    if (/^https?:\/\//i.test(u)) return u;
    return encodeURI(u.replace(/^\/+/, ""));
  }
  function digits(n) { return String(n || "").replace(/[^\d]/g, ""); }
  // Tekst in de gekozen taal, anders Engels, Italiaans, Nederlands, Duits.
  function tx(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    var order = [state.lang, "en", "it", "nl", "de", "fr"];
    for (var i = 0; i < order.length; i++) {
      var v = obj[order[i]];
      if (v && String(v).trim()) return String(v);
    }
    return "";
  }
  function arr(a) { return Array.isArray(a) ? a : []; }
  function overlaps(a, b) {
    a = arr(a); b = arr(b);
    if (typeof a === "string") a = [a];
    for (var i = 0; i < a.length; i++) if (b.indexOf(a[i]) > -1) return true;
    return false;
  }
  function asList(v) { return Array.isArray(v) ? v : (v ? [v] : []); }

  function getSlug() {
    var p = new URLSearchParams(location.search);
    var s = p.get("w") || window.GIDS_SLUG || "";
    return s.toLowerCase().replace(/[^a-z0-9-]/g, "");
  }

  function getJSON(path) {
    return fetch(path, { cache: "no-cache" }).then(function (r) {
      if (r.status === 404) { var e = new Error("404"); e.notFound = true; throw e; }
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
  }

  function pickLang(home) {
    var chosen = arr(home && home.talen);
    var allowed = LANGS.filter(function (l) { return chosen.indexOf(l) > -1; });
    if (!allowed.length) allowed = LANGS.slice();
    var saved = null;
    try { saved = localStorage.getItem("sa-lang"); } catch (e) {}
    if (saved && allowed.indexOf(saved) > -1) return { lang: saved, allowed: allowed };
    var nav = (navigator.languages || [navigator.language || "en"]).map(function (l) { return String(l).slice(0, 2).toLowerCase(); });
    for (var i = 0; i < nav.length; i++) if (allowed.indexOf(nav[i]) > -1) return { lang: nav[i], allowed: allowed };
    return { lang: allowed.indexOf("en") > -1 ? "en" : allowed[0], allowed: allowed };
  }

  function message(title, hint) {
    var u = UI[state.lang] || UI.en;
    $("#title").textContent = title;
    $("#lede").textContent = hint || "";
    $("#nav").innerHTML = "";
    $("#main").innerHTML = "";
    $("#foot").textContent = "Sardegna Autentica";
    document.title = title;
    void u;
  }

  function renderLangs(allowed) {
    $("#langs").innerHTML = allowed.length < 2 ? "" : allowed.map(function (l) {
      return '<button type="button" id="lang-' + l + '" data-lang="' + l + '" aria-pressed="' + (l === state.lang) + '">' + l.toUpperCase() + "</button>";
    }).join("");
    $("#langs").hidden = allowed.length < 2;
  }

  function copyBtn(value, id) {
    return '<button type="button" class="copy" id="' + id + '" data-copy="' + esc(value) + '">' + esc(UI[state.lang].copy) + "</button>";
  }

  function render() {
    var h = state.home, u = UI[state.lang], g = state.general || {};
    document.documentElement.lang = state.lang;
    document.title = (h.naam || "Guest guide") + " · Sardegna Autentica";
    $("#place").textContent = h.plaats || "Sardegna";
    $("#title").textContent = h.naam || "";
    $("#lede").textContent = tx(h.welkom);
    var logo = mediaUrl(h.logo);
    $("#hostLogo").hidden = !logo;
    if (logo) { $("#hostLogo").src = logo; $("#hostLogo").alt = h.naam || ""; }
    renderLangs(state.allowed);

    var regions = arr(h.regios);
    var sections = [];

    // Aankomst
    var a = h.aankomst || {};
    var kv = [];
    if (a.checkin) kv.push([u.checkin, esc(a.checkin)]);
    if (a.checkout) kv.push([u.checkout, esc(a.checkout)]);
    if (a.adres) {
      var m = safeUrl(a.maps);
      kv.push([u.address, esc(a.adres) + (m ? ' <a href="' + esc(m) + '" target="_blank" rel="noopener">' + esc(u.route) + "</a>" : "")]);
    }
    var steps = arr(a.stappen).map(tx).filter(Boolean);
    var arrHtml = (kv.length ? '<dl class="kv">' + kv.map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + r[1] + "</dd>"; }).join("") + "</dl>" : "") +
      (steps.length ? '<ol class="steps">' + steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
      (tx(a.parkeren) ? "<h3>" + esc(u.parking) + '</h3><p class="pre">' + esc(tx(a.parkeren)) + "</p>" : "") +
      (tx(a.vervoer) ? "<h3>" + esc(u.transport) + '</h3><p class="pre">' + esc(tx(a.vervoer)) + "</p>" : "");
    if (arrHtml) sections.push(["aankomst", u.arrive, arrHtml]);

    // Wifi
    var w = h.wifi || {};
    if (w.netwerk || w.wachtwoord) {
      var wk = [];
      if (w.netwerk) wk.push([u.network, w.netwerk, "copy-net"]);
      if (w.wachtwoord) wk.push([u.password, w.wachtwoord, "copy-pass"]);
      sections.push(["wifi", u.wifi, '<dl class="kv">' + wk.map(function (r) {
        return "<dt>" + esc(r[0]) + '</dt><dd><span class="mono">' + esc(r[1]) + "</span>" + copyBtn(r[1], r[2]) + "</dd>";
      }).join("") + "</dl>"]);
    }

    // Huisregels
    var rules = arr(h.huisregels).map(tx).filter(Boolean);
    if (rules.length) sections.push(["regels", u.rules, '<ul class="plain">' + rules.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul>"]);

    // Stranden
    var beaches = state.beaches.filter(function (b) { return overlaps(asList(b.regio), regions); });
    if (beaches.length) {
      var winds = ["maestrale", "ponente", "scirocco", "levante", "calma"];
      var adv = state.wind ? tx((g.windadvies || {})[state.wind]) : "";
      var list = beaches.slice();
      if (state.wind && state.wind !== "calma") {
        // Geen rustig strand in de eigen regio? Toon dan ook rustige stranden elders.
        var localCalm = list.some(function (b) { return arr(b.beschut).indexOf(state.wind) > -1; });
        if (!localCalm) {
          state.beaches.forEach(function (b) {
            if (list.indexOf(b) < 0 && arr(b.beschut).indexOf(state.wind) > -1) list.push(b);
          });
        }
      }
      var isCalm = function (b) { return state.wind && state.wind !== "calma" && arr(b.beschut).indexOf(state.wind) > -1; };
      // Groeperen per regio: eerst de regio's van de woning (in hun volgorde), daarna overige regio's.
      var zoneOrder = regions.slice();
      list.forEach(function (b) { asList(b.regio).forEach(function (z) { if (zoneOrder.indexOf(z) < 0) zoneOrder.push(z); }); });
      var groups = zoneOrder.map(function (z) {
        var items = list.filter(function (b) {
          var own = asList(b.regio).filter(function (r) { return regions.indexOf(r) > -1; });
          var home = own.length ? own[0] : asList(b.regio)[0];
          return home === z;
        });
        if (state.wind && state.wind !== "calma") items.sort(function (x, y) { return isCalm(y) - isCalm(x); });
        return [z, items];
      }).filter(function (gp) { return gp[1].length; });
      if (state.wind && state.wind !== "calma") {
        groups.sort(function (a, b) {
          return (b[1].some(isCalm) ? 1 : 0) - (a[1].some(isCalm) ? 1 : 0);
        });
      }
      var card = function (b) {
          var calm = isCalm(b);
          var rough = state.wind && state.wind !== "calma" && !calm;
          var tags = (calm ? '<span class="tag calm">' + esc(u.calm) + "</span>" : "") +
            (b.reserveren ? '<span class="tag book">' + esc(u.book) + "</span>" : "") +
            arr(b.kenmerken).map(tx).filter(Boolean).map(function (k) { return '<span class="tag">' + esc(k) + "</span>"; }).join("");
          var links = [];
          if (safeUrl(b.maps)) links.push('<a href="' + esc(safeUrl(b.maps)) + '" target="_blank" rel="noopener">' + esc(u.map) + "</a>");
          if (b.reserveren && safeUrl(b.reserveren_link)) links.push('<a href="' + esc(safeUrl(b.reserveren_link)) + '" target="_blank" rel="noopener">' + esc(u.bookLink) + "</a>");
          return '<div class="card' + (rough ? " dim" : "") + '"><div class="card-head"><h3>' + esc(b.naam) + "</h3></div>" +
            (tx(b.tekst) ? "<p>" + esc(tx(b.tekst)) + "</p>" : "") +
            (tags ? '<div class="tags">' + tags + "</div>" : "") +
            (links.length ? '<div class="links">' + links.join("") + "</div>" : "") + "</div>";
      };
      var bh = '<div class="wind"><h3>' + esc(u.windQ) + '</h3><p class="note">' + esc(u.windHint) + "</p>" +
        '<div class="wind-btns" role="group">' + winds.map(function (k) {
          return '<button type="button" id="wind-' + k + '" data-wind="' + k + '" aria-pressed="' + (state.wind === k) + '">' + esc(u.winds[k]) + "</button>";
        }).join("") + "</div>" +
        (adv ? '<div class="wind-out" aria-live="polite"><p>' + esc(adv) + "</p></div>" : "") + "</div>" +
        groups.map(function (gp) {
          return '<p class="group-label">' + esc(u.zones[gp[0]] || gp[0]) + '</p><div class="cards">' + gp[1].map(card).join("") + "</div>";
        }).join("") +
        (tx(g.reserveren_uitleg) ? '<p class="note pre">' + esc(tx(g.reserveren_uitleg)) + "</p>" : "");
      sections.push(["stranden", u.beaches, bh]);
    }

    // Tips van de host
    var tips = arr(h.tips).filter(function (t) { return tx(t.titel); });
    if (tips.length) sections.push(["tips", u.tips, '<div class="cards">' + tips.map(function (t) {
      var m = safeUrl(t.maps);
      return '<div class="card"><h3>' + esc(tx(t.titel)) + "</h3>" + (tx(t.tekst) ? '<p class="pre">' + esc(tx(t.tekst)) + "</p>" : "") +
        (m ? '<div class="links"><a href="' + esc(m) + '" target="_blank" rel="noopener">' + esc(u.map) + "</a></div>" : "") + "</div>";
    }).join("") + "</div>"]);

    // Eten
    var dishes = arr(g.gerechten).filter(function (d) { return d.naam; });
    if (dishes.length) sections.push(["eten", u.food, '<div class="food">' + dishes.map(function (d) {
      return '<div class="dish"><b>' + esc(d.naam) + "</b><span>" + esc(tx(d.tekst)) + "</span></div>";
    }).join("") + "</div>" + (tx(g.eten_tip) ? '<p class="note pre">' + esc(tx(g.eten_tip)) + "</p>" : "")]);

    // Partners
    var partners = state.partners.filter(function (p) { return p.actief !== false && p.naam && overlaps(asList(p.regio), regions); });
    if (partners.length) {
      var kinds = ["boot", "excursie", "restaurant", "verhuur", "winkel"];
      var ph = kinds.map(function (k) {
        var items = partners.filter(function (p) { return (p.soort || "excursie") === k; });
        if (!items.length) return "";
        return '<p class="group-label">' + esc(u.kinds[k]) + '</p><div class="cards">' + items.map(function (p, i) {
          var links = [];
          var d = digits(p.telefoon);
          if (d) {
            links.push('<a href="https://wa.me/' + d + '" target="_blank" rel="noopener">' + esc(u.whatsapp) + "</a>");
          }
          if (safeUrl(p.website)) links.push('<a href="' + esc(safeUrl(p.website)) + '" target="_blank" rel="noopener">' + esc(u.website) + "</a>");
          var img = mediaUrl(p.foto);
          return '<div class="card">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy">' : "") +
            '<span class="partner-label">' + esc(u.partnerLabel) + "</span><h3>" + esc(p.naam) + "</h3>" +
            (tx(p.tekst) ? '<p class="pre">' + esc(tx(p.tekst)) + "</p>" : "") +
            (p.telefoon ? '<p class="mono">' + esc(p.telefoon) + copyBtn(p.telefoon, "copy-p-" + k + "-" + i) + "</p>" : "") +
            (links.length ? '<div class="links">' + links.join("") + "</div>" : "") + "</div>";
        }).join("") + "</div>";
      }).join("");
      sections.push(["partners", u.partners, ph]);
    }

    // Extra's
    var host = h.host || {};
    var hostDigits = digits(host.telefoon);
    var extras = arr(h.extras).filter(function (x) { return tx(x.titel); });
    if (extras.length) sections.push(["extras", u.extras, (hostDigits ? '<p class="note">' + esc(u.extrasIntro) + "</p>" : "") +
      '<div class="cards">' + extras.map(function (x) {
        var msg = u.requestMsg.replace("{home}", h.naam || "").replace("{item}", tx(x.titel));
        return '<div class="card extra"><div><h3>' + esc(tx(x.titel)) + "</h3>" + (tx(x.tekst) ? '<p class="note">' + esc(tx(x.tekst)) + "</p>" : "") + "</div>" +
          (x.prijs ? '<span class="price">' + esc(x.prijs) + "</span>" : "") +
          (hostDigits ? '<a class="btn" href="https://wa.me/' + hostDigits + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + esc(u.request) + "</a>" : "") + "</div>";
      }).join("") + "</div>"]);

    // Nood
    var sos = arr(g.nood).filter(function (n) { return n.nummer; });
    var nh = (sos.length ? '<div class="sos">' + sos.map(function (n) {
      return "<div><b>" + esc(n.nummer) + "</b><span>" + esc(tx(n.tekst)) + "</span></div>";
    }).join("") + "</div>" : "") +
      (host.naam || host.telefoon ? '<div class="card"><span class="partner-label">' + esc(u.host) + "</span><h3>" + esc(host.naam || "") + "</h3>" +
        (host.telefoon ? '<p class="mono">' + esc(host.telefoon) + copyBtn(host.telefoon, "copy-host") + "</p>" : "") +
        (tx(host.bereikbaar) ? '<p class="note">' + esc(u.reachable) + ": " + esc(tx(host.bereikbaar)) + "</p>" : "") +
        (hostDigits ? '<div class="links"><a href="https://wa.me/' + hostDigits + '" target="_blank" rel="noopener">' + esc(u.whatsapp) + "</a></div>" : "") + "</div>" : "") +
      (tx(g.apotheek) ? '<p class="note pre">' + esc(tx(g.apotheek)) + "</p>" : "");
    if (nh) sections.push(["nood", u.help, nh]);

    var img = mediaUrl(h.foto);
    $("#nav").innerHTML = sections.map(function (s) { return '<a href="#' + s[0] + '">' + esc(u.nav[s[0]] || s[1]) + "</a>"; }).join("");
    $("#main").innerHTML = (img ? '<img class="hero" src="' + esc(img) + '" alt="">' : "") +
      (state.offline ? '<p class="note">' + esc(u.offline) + "</p>" : "") +
      installHtml() +
      sections.map(function (s) { return '<section id="' + s[0] + '"><h2>' + esc(s[1]) + "</h2>" + s[2] + "</section>"; }).join("");
    $("#foot").innerHTML = '<div class="about"><img class="about-logo" src="media/sardegna-autentica-logo.png" alt="Sardegna Autentica">' +
      "<h3>" + esc(u.about.title) + "</h3><p>" + esc(u.about.text) + "</p>" +
      '<a href="' + esc(safeUrl(tx(g.website)) || "https://www.sardinieautentica.nl/en/") + '" target="_blank" rel="noopener">' + esc(u.about.link) + "</a></div>";
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    var l = t.closest && t.closest("[data-lang]");
    if (l) {
      state.lang = l.getAttribute("data-lang");
      try { localStorage.setItem("sa-lang", state.lang); } catch (err) {}
      render();
      var b = document.getElementById("lang-" + state.lang); if (b) b.focus();
      return;
    }
    var w = t.closest && t.closest("[data-wind]");
    if (w) {
      var k = w.getAttribute("data-wind");
      state.wind = state.wind === k ? null : k;
      render();
      var wb = document.getElementById("wind-" + k); if (wb) wb.focus();
      return;
    }
    if (t.closest && t.closest("[data-install-close]")) {
      try { localStorage.setItem("sa-install-closed", "1"); } catch (err) {}
      var box = document.getElementById("install"); if (box) box.remove();
      return;
    }
    if (t.closest && t.closest("[data-install]") && installEvent) {
      installEvent.prompt();
      installEvent.userChoice.then(function () { installEvent = null; render(); }, function () {});
      return;
    }
    var c = t.closest && t.closest("[data-copy]");
    if (c) {
      var v = c.getAttribute("data-copy");
      var done = function () {
        c.textContent = UI[state.lang].copied;
        setTimeout(function () { c.textContent = UI[state.lang].copy; }, 1500);
      };
      var fallback = function () {
        var span = c.previousElementSibling;
        if (!span) return;
        var r = document.createRange(); r.selectNodeContents(span);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      };
      try { navigator.clipboard.writeText(v).then(done, fallback); } catch (err) { fallback(); }
    }
  });

  function start() {
    var slug = getSlug();
    var guess = pickLang(null); state.lang = guess.lang; state.allowed = guess.allowed;
    if (!slug) {
      message("Sardegna Autentica", "Guest guides for holiday homes in Sardinia. Scan the QR code in your home or use the link from your host.");
      renderLangs([]);
      return;
    }
    Promise.all([
      getJSON("content/woningen/" + slug + ".json"),
      getJSON("content/stranden.json").catch(function () { return {}; }),
      getJSON("content/partners.json").catch(function () { return {}; }),
      getJSON("content/algemeen.json").catch(function () { return {}; })
    ]).then(function (res) {
      var home = res[0];
      var pl = pickLang(home); state.lang = pl.lang; state.allowed = pl.allowed;
      if (home.actief === false) { message(UI[state.lang].inactive, ""); return; }
      state.home = home;
      state.beaches = arr(res[1].stranden);
      state.partners = arr(res[2].partners);
      state.general = res[3] || {};
      state.offline = !navigator.onLine;
      render();
      if (location.hash) {
        var el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView();
      }
    }).catch(function (err) {
      if (err && err.notFound) message(UI[state.lang].notFound, UI[state.lang].notFoundHint);
      else message(UI[state.lang].loadError, "");
    });
  }

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
  start();
})();
