/* Hand-built SVG ornaments. Colours come from CSS (currentColor). */
window.ORN = (function () {
  function p(d, a) { return '<path d="' + d + '" pathLength="1" ' + (a || '') + '/>'; }
  function circ(r, a) { return '<circle r="' + r + '" pathLength="1" ' + (a || '') + '/>'; }
  function g(inner, deg, cx, cy) { return '<g transform="rotate(' + deg + ' ' + (cx || 0) + ' ' + (cy || 0) + ')">' + inner + '</g>'; }
  function svg(vb, inner, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="' + vb + '" fill="none" stroke="currentColor" stroke-width="1" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + inner + '</svg>';
  }
  var SOFT = 'fill="currentColor" fill-opacity=".09"';

  function mandala() {
    var s = '', i;
    s += circ(98) + circ(93, 'stroke-width=".5"');
    for (i = 0; i < 24; i++) s += g(p('M0,-62 Q10,-78 0,-92 Q-10,-78 0,-62', SOFT), i * 15);
    for (i = 0; i < 12; i++) s += g(p('M0,-32 Q15,-47 0,-62 Q-15,-47 0,-32', SOFT), i * 30 + 15);
    s += circ(62, 'stroke-width=".6"') + circ(32);
    for (i = 0; i < 8; i++) s += g(p('M0,-30 L6,-12 L0,0 L-6,-12 Z'), i * 45);
    for (i = 0; i < 36; i++) {
      var a = i * 10 * Math.PI / 180;
      s += '<circle cx="' + (Math.sin(a) * 95.5).toFixed(2) + '" cy="' + (-Math.cos(a) * 95.5).toFixed(2) + '" r="1" fill="currentColor" stroke="none"/>';
    }
    return svg('-100 -100 200 200', s, 'mandala');
  }

  function gopuram() {
    var s = '', cx = 100, yb = 208, i;
    s += p('M6,216 L194,216') + p('M12,208 L188,208');
    var tiers = [[170, 34], [146, 28], [122, 26], [98, 24], [74, 22], [50, 20]];
    tiers.forEach(function (t, idx) {
      var w = t[0], h = t[1], yt = yb - h;
      s += p('M' + (cx - w / 2) + ',' + yb + ' L' + (cx + w / 2) + ',' + yb + ' L' + (cx + w / 2 - 5) + ',' + yt + ' L' + (cx - w / 2 + 5) + ',' + yt + ' Z', SOFT);
      s += p('M' + (cx - w / 2 - 4) + ',' + yt + ' L' + (cx + w / 2 + 4) + ',' + yt + ' L' + (cx + w / 2 + 2) + ',' + (yt - 4) + ' L' + (cx - w / 2 - 2) + ',' + (yt - 4) + ' Z');
      var n = Math.max(2, Math.floor((w - 16) / 20)), gap = (w - 16) / n;
      for (i = 0; i < n; i++) {
        var x = cx - w / 2 + 8 + gap * i + gap / 2;
        if (idx === 0 && Math.abs(x - cx) < gap / 2 + 1) {
          s += p('M' + (x - 9) + ',' + yb + ' L' + (x - 9) + ',' + (yb - 18) + ' Q' + x + ',' + (yb - 31) + ' ' + (x + 9) + ',' + (yb - 18) + ' L' + (x + 9) + ',' + yb);
        } else {
          s += p('M' + (x - 4) + ',' + (yb - 3) + ' L' + (x - 4) + ',' + (yb - h / 2) + ' Q' + x + ',' + (yb - h / 2 - 7) + ' ' + (x + 4) + ',' + (yb - h / 2) + ' L' + (x + 4) + ',' + (yb - 3));
        }
      }
      yb = yt - 4;
    });
    // crown kalashas
    s += p('M100,30 L100,6') + '<ellipse cx="100" cy="20" rx="5" ry="8" pathLength="1" ' + SOFT + '/>' + '<circle cx="100" cy="4" r="2" fill="currentColor" stroke="none"/>';
    [78, 122].forEach(function (x) { s += '<ellipse cx="' + x + '" cy="25" rx="4" ry="6" pathLength="1" ' + SOFT + '/>' + p('M' + x + ',31 L' + x + ',30'); });
    return svg('0 0 200 220', s, 'gopuram draw');
  }

  function kalash() {
    var s = '', i;
    for (i = -2; i <= 2; i++) s += g(p('M60,58 Q47,32 60,6 Q73,32 60,58', SOFT), i * 24, 60, 58);
    s += p('M30,72 Q8,102 28,132 Q40,152 60,152 Q80,152 92,132 Q112,102 90,72 Z', SOFT);
    s += p('M40,72 L40,60 Q60,53 80,60 L80,72');
    s += '<ellipse cx="60" cy="59" rx="22" ry="4.5" pathLength="1"/>';
    s += p('M20,100 Q60,114 100,100') + p('M24,116 Q60,130 96,116');
    for (i = 0; i < 7; i++) s += '<circle cx="' + (30 + i * 10) + '" cy="' + (108 + Math.sin(i / 6 * Math.PI) * 4).toFixed(1) + '" r="1.3" fill="currentColor" stroke="none"/>';
    s += '<ellipse cx="60" cy="38" rx="13" ry="16" pathLength="1" ' + SOFT + '/>' + p('M52,24 Q60,16 68,24') + p('M60,22 L60,54');
    return svg('0 0 120 160', s, 'kalash draw');
  }

  function diya() {
    var s = '<circle cx="30" cy="30" r="28" fill="url(#glow)" stroke="none" class="glow"/>';
    s += '<path class="flame" d="M30,8 Q42,28 30,46 Q18,28 30,8Z" fill="#f4b04a" stroke="none"/>';
    s += '<path class="flame in2" d="M30,24 Q36,34 30,44 Q24,34 30,24Z" fill="#fff0c2" stroke="none"/>';
    s += '<path d="M4,50 Q30,76 56,50 Q30,55 4,50Z" fill="currentColor" fill-opacity=".25"/>';
    s += '<path d="M4,50 Q30,76 56,50"/><path d="M14,58 Q30,66 46,58"/>';
    return svg('0 0 60 80', s, 'diya');
  }

  function lotus() {
    var s = '', a;
    [-52, -26, 0, 26, 52].forEach(function (d) {
      s += g(p('M30,30 Q22,16 30,2 Q38,16 30,30', SOFT), d, 30, 30);
    });
    s += p('M14,31 Q30,38 46,31');
    return svg('0 0 60 34', s, 'lotus draw');
  }

  function garland() {
    var s = '', i, k, t, n = 9;
    for (i = 0; i < n; i++) {
      var x0 = i * 50, x1 = x0 + 50, cx = x0 + 25;
      s += '<path d="M' + x0 + ',3 Q' + cx + ',44 ' + x1 + ',3" stroke="currentColor" stroke-width=".8" pathLength="1"/>';
      for (k = 1; k < 8; k++) {
        t = k / 8;
        var x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * cx + t * t * x1;
        var y = (1 - t) * (1 - t) * 3 + 2 * t * (1 - t) * 44 + t * t * 3;
        s += '<circle cx="' + x.toFixed(1) + '" cy="' + (y + 2).toFixed(1) + '" r="4.6" fill="#e58f22" stroke="none"/>' +
             '<circle cx="' + x.toFixed(1) + '" cy="' + (y + 2).toFixed(1) + '" r="2" fill="#f8cf72" stroke="none"/>';
      }
      s += '<path d="M' + x0 + ',3 L' + x0 + ',18" stroke-width=".8"/><circle cx="' + x0 + '" cy="22" r="3.4" fill="currentColor" stroke="none"/>';
    }
    return svg('0 0 450 56', s, 'garland');
  }


  /* ---------- banana plants, flowers, couple ---------- */
  function leaf(len, w, fill) {
    var h = len, hf = w, i, s;
    var d = 'M0,0 C' + (-hf * .75) + ',' + (-h * .12) + ' ' + (-hf * 1.0) + ',' + (-h * .55) + ' ' + (-hf * .28) + ',' + (-h * .9) +
      ' C' + (-hf * .12) + ',' + (-h * .96) + ' ' + (-hf * .03) + ',' + (-h * .99) + ' 0,' + (-h) +
      ' C' + (hf * .03) + ',' + (-h * .99) + ' ' + (hf * .14) + ',' + (-h * .95) + ' ' + (hf * .3) + ',' + (-h * .88) +
      ' C' + (hf * 1.05) + ',' + (-h * .52) + ' ' + (hf * .8) + ',' + (-h * .12) + ' 0,0Z';
    s = '<path d="' + d + '" fill="' + fill + '" stroke="#244a1e" stroke-opacity=".5" stroke-width=".8"/>';
    for (i = 1; i <= 14; i++) {
      var t = i / 15, y = -h * t, ww = hf * Math.pow(Math.sin(Math.PI * Math.pow(t, .85)), .9) * .95;
      s += '<path d="M0,' + y.toFixed(1) + ' L' + (-ww).toFixed(1) + ',' + (y - h * .06).toFixed(1) + ' M0,' + y.toFixed(1) + ' L' + ww.toFixed(1) + ',' + (y - h * .06).toFixed(1) + '" stroke="#e8f2c2" stroke-opacity=".3" stroke-width=".7" fill="none"/>';
    }
    s += '<path d="M0,0 Q' + (hf * .06) + ',' + (-h * .5) + ' 0,' + (-h) + '" stroke="#eef6cf" stroke-opacity=".65" stroke-width="1.6" fill="none"/>';
    return s;
  }
  function bunch() {
    var s = '<path d="M0,-34 C0,-14 4,0 7,12" stroke="#58742a" stroke-width="3.4" fill="none"/>', r, f;
    for (r = 0; r < 3; r++) {
      for (f = 0; f < 4; f++) {
        var x = -10 + f * 7 + r * 1.5, y = 4 + r * 17, rot = -12 + f * 8;
        s += '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ')"><path d="M0,0 C7,3 10,18 4,33 C2,25 -2,11 0,0Z" fill="url(#bananaG)" stroke="#9a7510" stroke-opacity=".6" stroke-width=".5"/><path d="M4,33 L5,36" stroke="#4d3a0a" stroke-width="1.6"/></g>';
      }
    }
    s += '<path d="M10,52 C0,64 2,82 10,96 C18,82 20,64 10,52Z" fill="url(#flowerG)" stroke="#3d0a22" stroke-opacity=".5" stroke-width=".6"/><path d="M10,56 C6,70 8,84 10,94 M10,56 C14,70 12,84 10,94" stroke="#e7a3b9" stroke-opacity=".5" stroke-width=".6" fill="none"/>';
    return s;
  }
  function plumeria(x, y, r) {
    var s = '<g transform="translate(' + x + ',' + y + ') scale(' + r + ')">', i;
    for (i = 0; i < 5; i++) s += '<g transform="rotate(' + (i * 72) + ')"><path d="M0,0 C-9,-5 -11,-19 -1,-26 C9,-19 8,-5 0,0Z" fill="#fffaf0" stroke="#dccfa6" stroke-width=".6"/><path d="M0,-3 C-2,-10 -2,-16 -1,-22" stroke="#f1e3b5" stroke-width=".6" fill="none"/></g>';
    return s + '<circle r="3.2" fill="#f4c542" stroke="none"/></g>';
  }
  function bananaCorner() {
    var s = '';
    s += '<g transform="translate(34,-8) rotate(112)">' + leaf(150, 38, 'url(#leafG2)') + '</g>';
    s += '<g transform="translate(34,-8) rotate(140)">' + leaf(190, 46, 'url(#leafG)') + '</g>';
    s += '<g transform="translate(34,-8) rotate(166)">' + leaf(218, 52, 'url(#leafG2)') + '</g>';
    s += '<g transform="translate(34,-8) rotate(192)">' + leaf(176, 44, 'url(#leafG)') + '</g>';
    s += '<g transform="translate(26,62) rotate(-6) scale(.95)">' + bunch() + '</g>';
    s += plumeria(54, 70, .8) + plumeria(20, 44, .65) + plumeria(66, 112, .6);
    return svg('0 0 190 250', s, 'banana tl').replace('fill="none"', 'fill="none"');
  }
  function bananaBase() {
    var s = '';
    s += '<g transform="translate(70,232) rotate(-50)">' + leaf(120, 32, 'url(#leafG2)') + '</g>';
    s += '<g transform="translate(70,232) rotate(-22)">' + leaf(178, 42, 'url(#leafG)') + '</g>';
    s += '<g transform="translate(70,232) rotate(8)">' + leaf(205, 48, 'url(#leafG2)') + '</g>';
    s += '<g transform="translate(70,232) rotate(34)">' + leaf(150, 38, 'url(#leafG)') + '</g>';
    s += '<g transform="translate(96,118) rotate(8) scale(.8)">' + bunch() + '</g>';
    s += plumeria(36, 150, .7) + plumeria(118, 96, .6);
    return svg('0 0 190 240', s, 'banana bl');
  }

  function chain(p0, p1, p2, n, leafEvery) {
    var s = '', i;
    for (i = 0; i <= n; i++) {
      var t = i / n, x = (1 - t) * (1 - t) * p0[0] + 2 * t * (1 - t) * p1[0] + t * t * p2[0];
      var y = (1 - t) * (1 - t) * p0[1] + 2 * t * (1 - t) * p1[1] + t * t * p2[1];
      if (i % leafEvery === 2) s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="2.6" ry="1.5" fill="#3f6b2e" stroke="none"/>';
      else s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.7" fill="#fffaf0" stroke="#d9cba3" stroke-width=".4"/>';
    }
    return s;
  }

  function petal(c) {
    return '<svg viewBox="0 0 20 28" aria-hidden="true"><path d="M10,0 Q21,12 10,28 Q-1,12 10,0Z" fill="' + c + '"/></svg>';
  }

  function glowDefs() {
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<radialGradient id="glow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="leafG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f5d27"/><stop offset=".55" stop-color="#4f8b38"/><stop offset="1" stop-color="#7db456"/></linearGradient>' +
      '<linearGradient id="leafG2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#244a1e"/><stop offset=".55" stop-color="#3d7230"/><stop offset="1" stop-color="#639c47"/></linearGradient>' +
      '<linearGradient id="bananaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe27a"/><stop offset=".6" stop-color="#f0c030"/><stop offset="1" stop-color="#c8921a"/></linearGradient>' +
      '<linearGradient id="flowerG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e2350"/><stop offset="1" stop-color="#4f0f2c"/></linearGradient>' +
      '</defs></svg>';
  }

  function weave(color) {
    var s = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='" + color + "' stroke-width='.8'>" +
      "<path d='M12,2 L22,12 L12,22 L2,12 Z'/><path d='M12,7 L17,12 L12,17 L7,12 Z' fill='" + color + "' fill-opacity='.55'/>" +
      "<circle cx='0' cy='0' r='1.6' fill='" + color + "'/><circle cx='24' cy='0' r='1.6' fill='" + color + "'/>" +
      "<circle cx='0' cy='24' r='1.6' fill='" + color + "'/><circle cx='24' cy='24' r='1.6' fill='" + color + "'/></svg>";
    return 'url("data:image/svg+xml,' + encodeURIComponent(s) + '")';
  }

  return { bananaCorner: bananaCorner, bananaBase: bananaBase, mandala: mandala, gopuram: gopuram, kalash: kalash, diya: diya, lotus: lotus, garland: garland, petal: petal, glowDefs: glowDefs, weave: weave };
})();
