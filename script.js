(function () {
  var S = window.SITE, O = window.ORN;
  var app = document.getElementById("app");
  var intro = document.getElementById("intro");
  var dots = document.getElementById("dots");
  var audio = document.getElementById("bgm");
  var musicBtn = document.getElementById("musicBtn");
  var langBtn = document.getElementById("langBtn");
  var root = document.documentElement;

  var lang = "en", entered = false;
  try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}

  /* border pattern colours */
  root.style.setProperty("--weave-gold", O.weave("#e2bb6c"));
  root.style.setProperty("--weave-dark", O.weave("#98701f"));
  document.body.insertAdjacentHTML("afterbegin", O.glowDefs());

  /* petals (created once) */
  var pet = document.getElementById("petals"), i, ph = "";
  var cols = ["#e58f22", "#f0a93a", "#d97a1a", "#f4c15c"];
  for (i = 0; i < 12; i++) {
    ph += '<span style="left:' + (4 + i * 8.2) + '%;animation-duration:' + (16 + (i * 7) % 11) + 's;animation-delay:-' + ((i * 5) % 17) + 's;transform:scale(' + (0.7 + (i % 4) * 0.2) + ')">' + O.petal(cols[i % 4]) + "</span>";
  }
  pet.innerHTML = ph;

  /* interface words (not wedding details) */
  var UI = {
    en: {
      open: "Enter", mono: "S & S", sub: "A wedding invitation", wedding: "Wedding Invitation",
      weds: "weds", scroll: "Scroll", invite: "The Invitation", families: "With the blessings of",
      countdown: "Counting down to the muhurtham", d: "Days", h: "Hours", m: "Minutes", s: "Seconds",
      done: "The auspicious hour has arrived. Your blessings are with them.",
      muh: "Sumuhurtham", venue: "Venue", map: "View on map", cal: "Add to calendar", ics: "Download .ics",
      moments: "Moments", ph: "Photograph", film: "Invitation film", filmSoon: "The invitation film will be shared soon.",
      bless: "Send your blessings", blessLead: "Leave a few words for the couple.",
      name: "Your name", msg: "Your message", send: "Send blessings", sending: "Sending…",
      thanks: "Thank you. Your blessings have been received.", fail: "Could not send. Please try again.",
      needs: "Please enter your name and message.", call: "Call", wa: "WhatsApp",
      musicOn: "Music on", musicOff: "Music off", langBtn: "తెలుగు", thank: "With love and gratitude",
      pm: "PM", dinnerLbl: "Dinner"
    },
    te: {
      open: "ప్రవేశించండి", mono: "సు & స్వ", sub: "వివాహ ఆహ్వాన పత్రిక", wedding: "వివాహ ఆహ్వానం",
      weds: "వివాహం", scroll: "కిందికి", invite: "ఆహ్వానం", families: "ఆశీస్సులతో",
      countdown: "సుముహూర్తానికి మిగిలిన సమయం", d: "రోజులు", h: "గంటలు", m: "నిమిషాలు", s: "సెకన్లు",
      done: "శుభ ముహూర్తం వచ్చింది. మీ ఆశీస్సులు వారికి తోడుగా ఉండాలి.",
      muh: "సుముహూర్తం", venue: "వివాహ వేదిక", map: "మ్యాప్‌లో చూడండి", cal: "క్యాలెండర్‌లో చేర్చండి", ics: ".ics డౌన్‌లోడ్",
      moments: "జ్ఞాపకాలు", ph: "చిత్రం", film: "ఆహ్వాన చిత్రం", filmSoon: "ఆహ్వాన చిత్రం త్వరలో అందుబాటులోకి వస్తుంది.",
      bless: "మీ ఆశీస్సులు తెలపండి", blessLead: "వధూవరులకు రెండు మాటలు రాయండి.",
      name: "మీ పేరు", msg: "మీ సందేశం", send: "ఆశీస్సులు పంపండి", sending: "పంపుతున్నాం…",
      thanks: "ధన్యవాదాలు. మీ ఆశీస్సులు అందాయి.", fail: "పంపడం సాధ్యం కాలేదు. మళ్ళీ ప్రయత్నించండి.",
      needs: "దయచేసి మీ పేరు, సందేశం నమోదు చేయండి.", call: "కాల్", wa: "వాట్సాప్",
      musicOn: "సంగీతం ఆన్", musicOff: "సంగీతం ఆఫ్", langBtn: "English", thank: "ప్రేమ, కృతజ్ఞతలతో",
      pm: "రాత్రి", dinnerLbl: "విందు"
    }
  };
  function t(v) { return (v && typeof v === "object" && "en" in v) ? (v[lang] || v.en) : v; }
  function u(k) { return UI[lang][k]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function rv(d) { return ' rv" style="--d:' + d; }          // use inside class="..." : class="x' + rv(200) + '"
  function R(cls, d) { return 'class="' + cls + ' rv" style="--d:' + d + '"'; }
  function orn(inner, cls) { return '<div class="orn ' + (cls || "") + '">' + inner + "</div>"; }
  function rule() { return '<div class="rule">' + orn(O.lotus(), "lot") + "</div>"; }

  var start = new Date(S.muhurtham), end = new Date(S.calendarEnd);
  var phoneDigits = S.contact.phone.replace(/[^\d]/g, "");
  var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.venue.mapQuery);

  function fmt(opts, loc) { return new Intl.DateTimeFormat(loc, Object.assign({ timeZone: "Asia/Kolkata" }, opts)).format(start); }
  function parts() {
    var loc = lang === "te" ? "te-IN" : "en-IN";
    return {
      d: fmt({ day: "numeric" }, "en-IN"), m: fmt({ month: "long" }, loc), y: fmt({ year: "numeric" }, "en-IN"),
      w: fmt({ weekday: "long" }, loc), mn: fmt({ month: "numeric" }, "en-IN"),
      time: fmt({ hour: "numeric", minute: "2-digit", hour12: true }, "en-US").replace(/\s?[AP]M/, "")
    };
  }
  function stamp(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  function googleCal() {
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(S.bride.first.en + " & " + S.groom.first.en + " – Wedding") +
      "&dates=" + stamp(start) + "/" + stamp(end) +
      "&location=" + encodeURIComponent(S.venue.name.en + ", " + S.venue.address.en) +
      "&details=" + encodeURIComponent("Sumuhurtham 08:35 PM (Mithuna Lagnam). Dinner from 09:00 PM.");
  }

  /* ---------- scene builders ---------- */
  function scene(id, cls, inner, bg) {
    return '<section class="scene ' + cls + '" id="' + id + '">' + (bg || "") + '<div class="stage">' + inner + "</div></section>";
  }
  function bgM(spin) { return '<div class="bgm' + (spin ? " spin" : "") + '">' + O.mandala() + "</div>"; }

  function build() {
    var p = parts(), out = [];

    /* 1 hero */
    out.push(scene("hero", "hero",
      '<div class="garland rv" style="--d:0">' + O.garland() + "</div>" +
      '<div ' + R("bless3", 200) + ">" + S.blessingsTop.map(function (b) { return "<span>" + esc(t(b)) + "</span>"; }).join("") + "</div>" +
      orn(O.gopuram(), "gop") +
      '<div class="names">' +
        '<div ' + R("nm foil", 500) + ">" + esc(t(S.bride.first)) + "</div>" +
        '<div ' + R("weds", 700) + ">" + u("weds") + "</div>" +
        '<div ' + R("nm foil", 900) + ">" + esc(t(S.groom.first)) + "</div>" +
      "</div>" +
      '<p ' + R("lbl", 1100) + ">" + esc(t(S.heroLine)) + "</p>" +
      '<div ' + R("datebar", 1300) + "><span>" + p.d + "</span><i></i><span>" + esc(p.m) + "</span><i></i><span>" + p.y + "</span></div>" +
      '<div class="cue lbl">' + u("scroll") + "</div>", bgM(false)));

    /* 2 invocation */
    out.push(scene("invocation", "alt",
      orn(O.kalash(), "kal") +
      '<div class="rv" style="--d:300">' + S.invocationLines.map(function (l, n) {
        return '<p class="' + (n ? "it" : "disp foil") + '" style="margin-top:' + (n ? 10 : 0) + 'px">' + esc(t(l)) + "</p>";
      }).join("") + "</div>" +
      rule() +
      '<div ' + R("sloka", 600) + ">" + S.sloka.map(esc).join("<br>") + "</div>", bgM(false)));

    /* 3 invitation */
    out.push(scene("invite", "cream",
      '<p ' + R("lbl", 0) + ">" + u("invite") + "</p>" +
      '<p ' + R("txt", 150) + ">" + esc(t(S.inviteIntro)) + "</p>" + rule() +
      '<div ' + R("", 350) + '><span class="it">' + esc(t(S.bride.title)) + '</span><div class="nm md foil">' + esc(t(S.bride.full)) + "</div></div>" +
      '<div ' + R("weds", 500) + ">" + u("weds") + "</div>" +
      '<div ' + R("", 650) + '><span class="it">' + esc(t(S.groom.title)) + '</span><div class="nm md foil">' + esc(t(S.groom.full)) + "</div></div>"));

    /* 4 families */
    function side(s, d) {
      return '<div ' + R("side", d) + '>' + (s.homeLine ? '<span class="home">' + esc(t(s.homeLine)) + '</span>' : "") + '<span class="it">' + esc(t(s.relation)) + '</span><span class="par">' + esc(t(s.parents)) + "</span></div>";
    }
    out.push(scene("families", "",
      side(S.brideSide, 100) + rule() + side(S.groomSide, 500) +
      '<p ' + R("txt sm dim", 800) + ">" + esc(t(S.inviteOutro)) + "</p>"));

    /* 6 muhurtham */
    out.push(scene("muhurtham", "",
      '<p ' + R("lbl", 0) + ">" + u("muh") + "</p>" +
      '<div ' + R("diyas", 150) + ">" + orn(O.diya()) + '<div class="disp foil">' + esc(p.w) + "<br>" + p.d + " " + esc(p.m) + " " + p.y + "</div>" + orn(O.diya()) + "</div>" +
      '<div ' + R("bigtime foil", 350) + "><b>" + p.time + "</b><small>" + u("pm") + "</small></div>" +
      '<p ' + R("it", 550) + ">" + esc(t(S.events[0].note)) + "</p>" +
      '<p ' + R("lbl", 700) + ">" + u("countdown") + "</p>" +
      '<div id="cd" class="rv" style="--d:800"></div>' +
      '<p ' + R("txt sm dim", 950) + ">" + esc(t(S.tithiLine)) + "</p>", bgM(false)));

    /* 7 dinner + venue */
    var dn = S.events[1];
    out.push(scene("dinner", "cream",
      '<p ' + R("lbl", 0) + ">" + u("dinnerLbl") + "</p>" +
      '<div ' + R("disp foil", 150) + ">" + esc(t(dn.time)) + "</div>" +
      '<p ' + R("it", 250) + ">" + esc(t(dn.note)) + "</p>" + rule() +
      '<p ' + R("lbl", 450) + ">" + u("venue") + "</p>" +
      '<div ' + R("nm md foil", 550) + ">" + esc(t(S.venue.name)) + "</div>" +
      '<p ' + R("txt", 650) + ">" + esc(t(S.venue.address)) + "</p>" +
      '<div ' + R("btns", 800) + '><a class="btn solid" target="_blank" rel="noopener" href="' + mapUrl + '">' + u("map") + "</a>" +
        '<div class="btn-row"><a class="btn" target="_blank" rel="noopener" href="' + googleCal() + '">' + u("cal") + '</a></div></div>'));

    /* 8 moments */
    var arcs = (S.gallery && S.gallery.length)
      ? S.gallery.map(function (g) { return '<div class="arc"><img loading="lazy" src="' + esc(g.src) + '" alt="' + esc(t(g.alt || "")) + '"></div>'; }).join("")
      : [1, 2, 3].map(function () { return '<div class="arc ph">' + orn(O.lotus()) + '</div>'; }).join("");
    out.push(scene("moments", "",
      '<p ' + R("lbl", 0) + ">" + u("moments") + "</p>" +
      '<div ' + R("arches", 200) + ">" + arcs + "</div>", bgM(false)));

    /* 11 closing */
    out.push(scene("closing", "",
      '<p ' + R("lbl", 0) + ">" + esc(t(S.hosts.heading)) + "</p>" +
      '<div ' + R("disp hosts foil", 150) + ">" + S.hosts.names.map(function (n) { return esc(t(n)); }).join("<br>") + "</div>" +
      rule() +
      '<p ' + R("txt sm dim", 450) + ">" + esc(t(S.contact.label)) + "</p>" +
      '<a ' + R("phone", 550) + ' href="tel:' + esc(S.contact.phone) + '">' + esc(S.contact.display) + "</a>" +
      '<div ' + R("", 800) + ' style="margin-top:18px"><div class="it">' + u("thank") + '</div><div class="nm md foil" style="margin-top:6px">' + esc(t(S.bride.first)) + " &amp; " + esc(t(S.groom.first)) + '</div><div class="lbl" style="margin-top:8px">' + p.y + "</div></div>", bgM(false)));

    return out.join("");
  }

  function buildIntro() {
    var p = parts();
    return '<div class="i-m">' + O.mandala() + "</div>" +
      '<div class="stage">' +
        '<div class="bless3 i-a" style="--t:.8s">' + S.blessingsTop.map(function (b) { return "<span>" + esc(t(b)) + "</span>"; }).join("") + "</div>" +
        '<div class="i-line"></div>' +
        '<div class="nm foil i-a" style="--t:1.5s">' + esc(t(S.bride.first)) + "</div>" +
        '<div class="amp i-a" style="--t:1.9s">&amp;</div>' +
        '<div class="nm foil i-a" style="--t:2.3s">' + esc(t(S.groom.first)) + "</div>" +
        '<div class="i-line"></div>' +
        '<p class="lbl i-a" style="--t:3s">' + u("sub") + "</p>" +
        '<div class="datebar i-a" style="--t:3.5s"><span>' + p.d + "</span><i></i><span>" + esc(p.m) + "</span><i></i><span>" + p.y + "</span></div>" +
        '<button class="btn i-a" id="enterBtn" style="--t:4.2s;margin-top:22px">' + u("open") + "</button>" +
      "</div>";
  }

  /* ---------- countdown ---------- */
  var C = 2 * Math.PI * 62;
  function ring(val, max, label) {
    var f = Math.max(0, Math.min(1, val / max));
    return '<div class="ring"><svg viewBox="0 0 140 140"><circle class="tr" cx="70" cy="70" r="62" stroke-width="1"/>' +
      '<circle class="pg" cx="70" cy="70" r="62" stroke-width="2.4" stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + (C * (1 - f)).toFixed(2) + '"/></svg>' +
      "<div><b>" + val + "</b><span>" + label + "</span></div></div>";
  }
  function tick() {
    var el = document.getElementById("cd");
    if (!el) return;
    var diff = start - new Date();
    if (diff <= 0) { el.innerHTML = '<p class="done">' + u("done") + "</p>"; return; }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
    el.innerHTML = '<div class="rings">' + ring(d, 30, u("d")) + ring(h, 24, u("h")) + ring(m, 60, u("m")) + ring(sec, 60, u("s")) + "</div>";
  }
  setInterval(tick, 1000);

  /* ---------- observers ---------- */
  var sio = null, dio = null;
  function observe() {
    if (sio) sio.disconnect(); if (dio) dio.disconnect();
    var scenes = document.querySelectorAll(".scene");
    if (!("IntersectionObserver" in window)) { scenes.forEach(function (s) { s.classList.add("in"); }); return; }
    sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (e.target.id === "hero" && !entered) return;
        e.target.classList.add("in");
      });
    }, { threshold: 0.3 });
    dio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(scenes, e.target);
        dots.querySelectorAll("button").forEach(function (b, n) { b.classList.toggle("on", n === idx); });
      });
    }, { threshold: 0.55 });
    scenes.forEach(function (s) { sio.observe(s); dio.observe(s); });
    if (entered) document.getElementById("hero").classList.add("in");
  }

  function buildDots() {
    dots.innerHTML = Array.prototype.map.call(document.querySelectorAll(".scene"), function (s, n) {
      return '<button type="button" aria-label="Section ' + (n + 1) + '" data-t="' + s.id + '"></button>';
    }).join("");
    dots.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { document.getElementById(b.getAttribute("data-t")).scrollIntoView({ behavior: "smooth" }); });
    });
  }

  /* ---------- render ---------- */
  function render() {
    root.lang = lang;
    langBtn.textContent = u("langBtn");
    syncMusic();
    app.innerHTML = build();
    intro.innerHTML = entered ? "" : buildIntro();
    var eb = document.getElementById("enterBtn");
    if (eb) eb.addEventListener("click", enter);
    buildDots(); observe(); tick();
  }

  function enter() {
    if (entered) return;
    entered = true;
    document.body.classList.remove("lock");
    document.body.classList.add("entered");
    intro.classList.add("lift");
    playMusic();
    setTimeout(function () { document.getElementById("hero").classList.add("in"); }, 1100);
    setTimeout(function () { intro.innerHTML = ""; intro.classList.remove("lift"); intro.style.display = "none"; }, 2000);
  }

  /* ---------- music ---------- */
  var musicOk = !!S.music;
  if (musicOk) {
    audio.preload = "auto"; audio.src = S.music;
    audio.addEventListener("error", function () { musicOk = false; musicBtn.hidden = true; });
    musicBtn.hidden = false;
  }
  function syncMusic() {
    var on = !audio.paused;
    musicBtn.setAttribute("aria-pressed", String(on));
    musicBtn.textContent = on ? u("musicOn") : u("musicOff");
  }
  function playMusic() {
    if (!musicOk) return;
    var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {});
    setTimeout(syncMusic, 150);
  }
  musicBtn.addEventListener("click", function () { if (audio.paused) playMusic(); else audio.pause(); setTimeout(syncMusic, 150); });
  audio.addEventListener("play", syncMusic); audio.addEventListener("pause", syncMusic);

  langBtn.addEventListener("click", function () {
    lang = lang === "en" ? "te" : "en";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    intro.style.display = ""; render();
  });

  render();
})();
