(function () {
  var S = window.SITE, O = window.ORN;
  var app = document.getElementById("app");
  var dots = document.getElementById("dots");
  var audio = document.getElementById("bgm");
  var musicBtn = document.getElementById("musicBtn");
  var langBtn = document.getElementById("langBtn");
  var root = document.documentElement;

  var lang = "en", entered = true;
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
  function scene(id, cls, inner, bg, decor) {
    return '<section class="scene ' + cls + '" id="' + id + '">' + (bg || "") + '<div class="stage">' + inner + (decor || "") + "</div></section>";
  }
  function parx(k, inner, cls) { return '<div class="par ' + (cls || "lay") + '" style="--k:' + k + '">' + inner + "</div>"; }
  var SPARK_POS = [[8,12],[22,70],[36,26],[52,88],[66,18],[80,60],[90,30],[14,48],[44,54],[72,82],[58,8],[30,92],[88,76],[5,86]];
  function sparks() {
    return parx(-55, SPARK_POS.map(function (q, n) {
      return '<i class="sp" style="left:' + q[0] + '%;top:' + q[1] + '%;--s:' + (6 + (n * 5) % 9) + ';animation-delay:-' + ((n * 7) % 11) / 2 + 's;animation-duration:' + (3 + (n * 3) % 4) + 's"></i>';
    }).join(""));
  }
  function rays() { return parx(-40, '<div class="rm"><div class="rays"></div></div>'); }
  function trees() {
    return '<div class="trees">' +
      parx(34, '<div class="tr tl">' + O.bananaCorner() + "</div>", "tw") +
      parx(34, '<div class="tr trr">' + O.bananaCorner() + "</div>", "tw") +
      parx(46, '<div class="tr bl">' + O.bananaBase() + "</div>", "tw") +
      parx(46, '<div class="tr brr">' + O.bananaBase() + "</div>", "tw") + "</div>";
  }
  function bgM() { return parx(-110, '<div class="bgm">' + O.mandala() + "</div>", "bgw"); }

  function build() {
    var p = parts(), out = [];

    /* 1 hero */
    out.push(scene("hero", "hero",
      '<div class="garland rv" style="--d:0">' + O.garland() + "</div>" +
      '<div ' + R("bless3", 200) + ">" + S.blessingsTop.map(function (b) { return "<span>" + esc(t(b)) + "</span>"; }).join("") + "</div>" +
      '<div class="names">' +
        '<div ' + R("nm foil", 400) + ">" + esc(t(S.bride.first)) + "</div>" +
        '<div ' + R("weds", 600) + ">" + u("weds") + "</div>" +
        '<div ' + R("nm foil", 800) + ">" + esc(t(S.groom.first)) + "</div>" +
      "</div>" +
      '<p ' + R("lbl", 1000) + ">" + esc(t(S.heroLine)) + "</p>" +
      '<div ' + R("datebar", 1150) + "><span>" + p.d + "</span><i></i><span>" + esc(p.m) + "</span><i></i><span>" + p.y + "</span></div>" +
      '<div ' + R("gopw", 1300) + ">" + orn(O.gopuram(), "gop") + "</div>",
      rays() + bgM() + sparks()));

    /* 2 invocation */
    out.push(scene("invocation", "alt",
      orn(O.kalash(), "kal") +
      '<div class="rv" style="--d:300">' + S.invocationLines.map(function (l, n) {
        return '<p class="' + (n ? "it" : "disp foil") + '" style="margin-top:' + (n ? 10 : 0) + 'px">' + esc(t(l)) + "</p>";
      }).join("") + "</div>" +
      rule() +
      '<div ' + R("sloka", 600) + ">" + S.sloka.map(esc).join("<br>") + "</div>", rays() + bgM() + sparks()));

    /* 3 invitation */
    out.push(scene("invite", "cream",
      '<p ' + R("lbl", 0) + ">" + u("invite") + "</p>" +
      '<p ' + R("txt", 150) + ">" + esc(t(S.inviteIntro)) + "</p>" + rule() +
      '<div ' + R("", 350) + '><span class="it">' + esc(t(S.bride.title)) + '</span><div class="nm md foil">' + esc(t(S.bride.full)) + "</div></div>" +
      '<div ' + R("weds", 500) + ">" + u("weds") + "</div>" +
      '<div ' + R("", 650) + '><span class="it">' + esc(t(S.groom.title)) + '</span><div class="nm md foil">' + esc(t(S.groom.full)) + "</div></div>", "", trees()));

    /* 4 families */
    function side(s, d) {
      return '<div ' + R("side", d) + '>' + (s.homeLine ? '<span class="home">' + esc(t(s.homeLine)) + '</span>' : "") + '<span class="it">' + esc(t(s.relation)) + '</span><span class="par">' + esc(t(s.parents)) + "</span></div>";
    }
    out.push(scene("families", "",
      side(S.brideSide, 100) + rule() + side(S.groomSide, 500) +
      '<p ' + R("txt sm dim", 800) + ">" + esc(t(S.inviteOutro)) + "</p>", bgM() + sparks()));

    /* 6 muhurtham */
    out.push(scene("muhurtham", "cream",
      '<p ' + R("lbl", 0) + ">" + u("muh") + "</p>" +
      '<div ' + R("diyas", 150) + ">" + orn(O.diya()) + '<div class="disp foil">' + esc(p.w) + "<br>" + p.d + " " + esc(p.m) + " " + p.y + "</div>" + orn(O.diya()) + "</div>" +
      '<div ' + R("bigtime foil", 350) + "><b>" + p.time + "</b><small>" + u("pm") + "</small></div>" +
      '<p ' + R("it", 550) + ">" + esc(t(S.events[0].note)) + "</p>" +
      '<p ' + R("lbl", 700) + ">" + u("countdown") + "</p>" +
      '<div id="cd" class="rv" style="--d:800"></div>' +
      '<p ' + R("txt sm dim", 950) + ">" + esc(t(S.tithiLine)) + "</p>", "", trees()));

    /* 7 dinner + venue */
    var dn = S.events[1];
    out.push(scene("dinner", "alt",
      '<p ' + R("lbl", 0) + ">" + u("dinnerLbl") + "</p>" +
      '<div ' + R("disp foil", 150) + ">" + esc(t(dn.time)) + "</div>" +
      '<p ' + R("it", 250) + ">" + esc(t(dn.note)) + "</p>" + rule() +
      '<p ' + R("lbl", 450) + ">" + u("venue") + "</p>" +
      '<div ' + R("nm md foil", 550) + ">" + esc(t(S.venue.name)) + "</div>" +
      '<p ' + R("txt", 650) + ">" + esc(t(S.venue.address)) + "</p>" +
      '<div ' + R("btns", 800) + '><a class="btn solid" target="_blank" rel="noopener" href="' + mapUrl + '">' + u("map") + "</a>" +
        '<div class="btn-row"><a class="btn" target="_blank" rel="noopener" href="' + googleCal() + '">' + u("cal") + '</a></div></div>', rays() + bgM() + sparks()));

    /* 11 closing */
    out.push(scene("closing", "",
      '<p ' + R("lbl", 0) + ">" + esc(t(S.hosts.heading)) + "</p>" +
      '<div ' + R("disp hosts foil", 150) + ">" + S.hosts.names.map(function (n) { return esc(t(n)); }).join("<br>") + "</div>" +
      rule() +
      '<p ' + R("txt sm dim", 450) + ">" + esc(t(S.contact.label)) + "</p>" +
      '<a ' + R("phone", 550) + ' href="tel:' + esc(S.contact.phone) + '">' + esc(S.contact.display) + "</a>" +
      '<div ' + R("", 800) + ' style="margin-top:18px"><div class="it">' + u("thank") + '</div><div class="nm md foil" style="margin-top:6px">' + esc(t(S.bride.first)) + " &amp; " + esc(t(S.groom.first)) + '</div><div class="lbl" style="margin-top:8px">' + p.y + "</div></div>", rays() + bgM() + sparks()));

    return out.join("");
  }

  /* ---------- countdown ---------- */
  var C = 2 * Math.PI * 62;
  function ring(val, max, label) {
    var f = Math.max(0, Math.min(1, val / max));
    return '<div class="rw"><div class="ring"><svg viewBox="0 0 140 140"><circle class="trk" cx="70" cy="70" r="62" stroke-width="1"/>' +
      '<circle class="pg" cx="70" cy="70" r="62" stroke-width="2.6" stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + (C * (1 - f)).toFixed(2) + '"/></svg>' +
      "<div><b>" + val + "</b></div></div><span class=\"rl\">" + label + "</span></div>";
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
      b.addEventListener("click", function () { goTo(Array.prototype.indexOf.call(scenes, document.getElementById(b.getAttribute("data-t")))); });
    });
  }

  /* ---------- page-by-page sliding ---------- */
  var scenes = [], navLock = 0, animTok = 0;
  function collect() { scenes = Array.prototype.slice.call(document.querySelectorAll(".scene")); }
  function curIndex() {
    var y = window.scrollY, best = 0, d = 1e9;
    scenes.forEach(function (n, i) { var k = Math.abs(n.offsetTop - y); if (k < d) { d = k; best = i; } });
    return best;
  }
  function animateTo(y, dur) {
    var tok = ++animTok, y0 = window.scrollY, t0 = performance.now();
    root.style.scrollSnapType = "none";
    root.classList.add("moving");
    function f(t) {
      if (tok !== animTok) return;
      var p = Math.min(1, (t - t0) / dur), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo(0, y0 + (y - y0) * e);
      if (p < 1) requestAnimationFrame(f); else { root.style.scrollSnapType = ""; root.classList.remove("moving"); }
    }
    requestAnimationFrame(f);
  }
  function goTo(i) {
    i = Math.max(0, Math.min(scenes.length - 1, i));
    animateTo(scenes[i].offsetTop, 1000);
    navLock = Date.now() + 1080;
  }
  window.addEventListener("wheel", function (e) {
    if (e.ctrlKey) return;
    e.preventDefault();
    var now = Date.now();
    if (now < navLock) { navLock = Math.max(navLock, now + 140); return; }
    if (Math.abs(e.deltaY) < 2) return;
    goTo(curIndex() + (e.deltaY > 0 ? 1 : -1));
  }, { passive: false });
  var tx = 0, ty = null;
  window.addEventListener("touchstart", function (e) { if (e.touches.length === 1) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } else ty = null; }, { passive: true });
  window.addEventListener("touchmove", function (e) {
    if (ty == null) return;
    if (e.target.closest && e.target.closest("textarea,input")) return;
    if (e.cancelable) e.preventDefault();
  }, { passive: false });
  window.addEventListener("touchend", function (e) {
    if (ty == null) return;
    var dy = ty - e.changedTouches[0].clientY, dx = tx - e.changedTouches[0].clientX;
    ty = null;
    if (Date.now() < navLock) return;
    if (Math.abs(dy) > 26 && Math.abs(dy) > Math.abs(dx)) goTo(curIndex() + (dy > 0 ? 1 : -1));
  }, { passive: true });
  window.addEventListener("keydown", function (e) {
    var k = e.key, d = 0;
    if (k === "ArrowDown" || k === "PageDown" || k === " ") d = 1;
    else if (k === "ArrowUp" || k === "PageUp") d = -1;
    else if (k === "Home") { e.preventDefault(); goTo(0); return; }
    else if (k === "End") { e.preventDefault(); goTo(scenes.length - 1); return; }
    if (!d) return;
    e.preventDefault();
    if (Date.now() < navLock) return;
    goTo(curIndex() + d);
  });
  window.addEventListener("resize", function () { if (scenes.length) window.scrollTo(0, scenes[curIndex()].offsetTop); });

  /* ---------- parallax depth (direct transforms, no style recalculation) ---------- */
  var pTick = false, pars = [];
  function collectPars() {
    pars = Array.prototype.map.call(document.querySelectorAll(".par"), function (el) {
      return { el: el, sc: el.closest(".scene"), k: parseFloat(el.style.getPropertyValue("--k")) || 0 };
    });
  }
  function parallax() {
    pTick = false;
    var h = window.innerHeight, y = window.scrollY, u = Math.min(window.innerWidth / 450, h / 800);
    pars.forEach(function (o) {
      var p = (o.sc.offsetTop - y) / h;
      if (p > -1.3 && p < 1.3) o.el.style.transform = "translate3d(0," + (p * o.k * u).toFixed(1) + "px,0)";
    });
  }
  window.addEventListener("scroll", function () { if (!pTick) { pTick = true; requestAnimationFrame(parallax); } }, { passive: true });

  /* ---------- render ---------- */
  function render() {
    root.lang = lang;
    langBtn.textContent = u("langBtn");
    syncMusic();
    var y = window.scrollY, seen = Array.prototype.map.call(document.querySelectorAll(".scene.in"), function (n) { return n.id; });
    app.innerHTML = build();
    collect(); collectPars();
    seen.forEach(function (id) { var el = document.getElementById(id); if (el) el.classList.add("in", "nt"); });
    root.style.scrollSnapType = "none";
    window.scrollTo(0, y);
    buildDots(); observe(); tick(); parallax();
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      scenes.forEach(function (n) { n.classList.remove("nt"); });
      root.style.scrollSnapType = "";
    }); });
  }

  /* ---------- music ---------- */
  // Browsers block sound until the guest touches the page. So: try to play with sound at once;
  // if blocked, play silently right away and switch the sound on at the very first touch/click/key.
  var musicOk = !!S.music, unlocked = false;
  if (musicOk) {
    audio.preload = "auto"; audio.volume = 0.85; audio.src = S.music;
    audio.addEventListener("error", function () { musicOk = false; musicBtn.hidden = true; });
    musicBtn.hidden = false;
  }
  function syncMusic() {
    var on = !audio.paused && !audio.muted;
    musicBtn.setAttribute("aria-pressed", String(on));
    musicBtn.textContent = on ? u("musicOn") : u("musicOff");
  }
  function startWithSound() {
    if (!musicOk) return;
    audio.muted = false;
    var pr = audio.play();
    if (pr && pr.then) {
      pr.then(function () { unlocked = true; syncMusic(); })
        .catch(function () { audio.muted = true; var q = audio.play(); if (q && q.catch) q.catch(function () {}); syncMusic(); });
    }
  }
  function onGesture(e) {
    if (unlocked) return;
    if (e.target && e.target.closest && e.target.closest(".controls")) return;
    startWithSound();
  }
  ["pointerdown", "pointerup", "mousedown", "click", "keydown", "touchstart", "touchend", "wheel"].forEach(function (ev) {
    window.addEventListener(ev, onGesture, { passive: true });
  });
  musicBtn.addEventListener("click", function () {
    if (!audio.paused && !audio.muted) { audio.pause(); }
    else { unlocked = true; audio.muted = false; var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {}); }
    setTimeout(syncMusic, 150);
  });
  audio.addEventListener("play", syncMusic); audio.addEventListener("pause", syncMusic); audio.addEventListener("volumechange", syncMusic);
  startWithSound(); // runs on page open

  /* ---------- scroll hint: one small bounce so guests learn the page scrolls ---------- */
  (function () {
    var stopped = false, timers = [];
    function restore() { root.style.scrollSnapType = ""; }
    function stop() { if (stopped) return; stopped = true; timers.forEach(clearTimeout); restore(); }
    ["wheel", "touchstart", "keydown", "pointerdown"].forEach(function (ev) { window.addEventListener(ev, stop, { once: true, passive: true }); });
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timers.push(setTimeout(function () {
      if (stopped || window.scrollY > 5) return;
      root.style.scrollSnapType = "none";
      window.scrollTo({ top: Math.round(window.innerHeight * 0.13), behavior: "smooth" });
      timers.push(setTimeout(function () {
        if (stopped) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        timers.push(setTimeout(restore, 900));
      }, 800));
    }, 1500));
  })();

  langBtn.addEventListener("click", function () {
    lang = lang === "en" ? "te" : "en";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    render();
  });

  document.body.classList.add("entered");
  render();
})();
