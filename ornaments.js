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

  function petal(c) {
    return '<svg viewBox="0 0 20 28" aria-hidden="true"><path d="M10,0 Q21,12 10,28 Q-1,12 10,0Z" fill="' + c + '"/></svg>';
  }

  function glowDefs() {
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<radialGradient id="glow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>' +
      '</defs></svg>';
  }

  function weave(color) {
    var s = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='" + color + "' stroke-width='.8'>" +
      "<path d='M12,2 L22,12 L12,22 L2,12 Z'/><path d='M12,7 L17,12 L12,17 L7,12 Z' fill='" + color + "' fill-opacity='.55'/>" +
      "<circle cx='0' cy='0' r='1.6' fill='" + color + "'/><circle cx='24' cy='0' r='1.6' fill='" + color + "'/>" +
      "<circle cx='0' cy='24' r='1.6' fill='" + color + "'/><circle cx='24' cy='24' r='1.6' fill='" + color + "'/></svg>";
    return 'url("data:image/svg+xml,' + encodeURIComponent(s) + '")';
  }

  return { mandala: mandala, gopuram: gopuram, kalash: kalash, diya: diya, lotus: lotus, garland: garland, petal: petal, glowDefs: glowDefs, weave: weave };
})();
