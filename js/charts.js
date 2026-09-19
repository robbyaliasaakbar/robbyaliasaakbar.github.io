/* ============================================================
   ROBBY ALIASA AKBAR — Portfolio Website
   charts.js — lightweight SVG chart renderer (no dependencies)
   Supported: data-chart="bar" | data-chart="line" | data-chart="step" | data-chart="radar"
   Data format (JSON in data-data attr):
     bar/line/step: [{"label": "18", "value": 28}, ...]
     radar: {"max":100,"axes":["A","B",...],"series":[{"label":"X","values":[...],"color":"#hex"},...]}
   Optional attrs: data-y-max (number, bar/line/step)
   ============================================================ */

(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function el(name, attrs, textContent) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) { node.setAttribute(k, attrs[k]); }
    if (textContent !== undefined) { node.textContent = textContent; }
    return node;
  }

  function parseData(container) {
    try {
      return JSON.parse(container.getAttribute('data-data')) || [];
    } catch (e) {
      return [];
    }
  }

  function getYMax(container, values) {
    var attr = parseFloat(container.getAttribute('data-y-max'));
    if (!isNaN(attr) && attr > 0) { return attr; }
    return Math.max.apply(null, values) * 1.15;
  }

  /* Shared scaffold: gridlines + y-axis tick labels */
  function scaffold(svg, W, H, padL, padR, padT, padB, yMax) {
    var steps = 4;
    for (var i = 0; i <= steps; i++) {
      var v = yMax * i / steps;
      var y = H - padB - (H - padB - padT) * i / steps;
      svg.appendChild(el('line', {
        x1: padL, y1: y, x2: W - padR, y2: y,
        stroke: 'rgba(12,12,12,.08)', 'stroke-width': 1
      }));
      svg.appendChild(el('text', {
        x: padL - 8, y: y + 4, 'text-anchor': 'end',
        'font-size': 11, fill: '#9ca3af'
      }, String(Math.round(v))));
    }
  }

  /* ---------------- BAR CHART ---------------- */
  function renderBar(container) {
    var data = parseData(container);
    if (!data.length) { return; }

    var W = 640, H = 340, padL = 52, padR = 16, padT = 28, padB = 44;
    var yMax = getYMax(container, data.map(function (d) { return d.value; }));

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'class': 'w-full h-auto', role: 'img'
    });

    scaffold(svg, W, H, padL, padR, padT, padB, yMax);

    var bw = (W - padL - padR) / data.length;

    data.forEach(function (d, i) {
      var bh = (H - padB - padT) * (d.value / yMax);
      var x = padL + i * bw + bw * 0.2;
      var w = bw * 0.6;
      var y = H - padB - bh;

      var rect = el('rect', {
        x: x, y: y, width: w, height: bh, rx: 4,
        fill: '#0C0C0C', 'class': 'chart-bar'
      });
      svg.appendChild(rect);

      svg.appendChild(el('text', {
        x: x + w / 2, y: y - 8, 'text-anchor': 'middle',
        'font-size': 12, 'font-weight': 700, fill: '#0C0C0C'
      }, String(d.value)));

      svg.appendChild(el('text', {
        x: padL + i * bw + bw / 2, y: H - padB + 20,
        'text-anchor': 'middle', 'font-size': 11, fill: '#6b7280'
      }, String(d.label)));
    });

    container.appendChild(svg);
  }

  /* ---------------- LINE CHART ---------------- */
  function renderLine(container) {
    var data = parseData(container);
    if (data.length < 2) { return; }

    var W = 640, H = 340, padL = 52, padR = 16, padT = 28, padB = 44;
    var yMax = getYMax(container, data.map(function (d) { return d.value; }));

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'class': 'w-full h-auto', role: 'img'
    });

    scaffold(svg, W, H, padL, padR, padT, padB, yMax);

    var pts = data.map(function (d, i) {
      return {
        x: padL + (W - padL - padR) * (i / (data.length - 1)),
        y: H - padB - (H - padB - padT) * (d.value / yMax),
        d: d
      };
    });

    /* Subtle area fill under the line */
    var area = el('path', {
      d: 'M ' + pts[0].x + ' ' + (H - padB) + ' ' +
         pts.map(function (p) { return 'L ' + p.x + ' ' + p.y; }).join(' ') + ' ' +
         'L ' + pts[pts.length - 1].x + ' ' + (H - padB) + ' Z',
      fill: 'rgba(12,12,12,.05)'
    });
    svg.appendChild(area);

    /* The line itself */
    svg.appendChild(el('path', {
      d: pts.map(function (p, i) {
        return (i === 0 ? 'M' : 'L') + ' ' + p.x + ' ' + p.y;
      }).join(' '),
      fill: 'none', stroke: '#0C0C0C', 'stroke-width': 2.5,
      'stroke-linejoin': 'round', 'stroke-linecap': 'round'
    }));

    /* Points + value labels + x labels */
    pts.forEach(function (p, i) {
      svg.appendChild(el('circle', {
        cx: p.x, cy: p.y, r: 4.5,
        fill: '#FFFFFF', stroke: '#D70000', 'stroke-width': 2.5,
        'class': 'chart-point'
      }));

      svg.appendChild(el('text', {
        x: p.x, y: p.y - 12, 'text-anchor': 'middle',
        'font-size': 11.5, 'font-weight': 700, fill: '#0C0C0C'
      }, String(p.d.value)));

      svg.appendChild(el('text', {
        x: p.x, y: H - padB + 20, 'text-anchor': 'middle',
        'font-size': 11, fill: '#6b7280'
      }, String(p.d.label)));
    });

    container.appendChild(svg);
  }

  /* ---------------- STEP CHART (staircase) ---------------- */
  function renderStep(container) {
    var data = parseData(container);
    if (data.length < 2) { return; }

    var W = 640, H = 360, padL = 52, padR = 16, padT = 28, padB = 86;
    var yMax = getYMax(container, data.map(function (d) { return d.value; }));
    var suffix = container.getAttribute('data-value-suffix') || '';

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'class': 'w-full h-auto', role: 'img'
    });

    scaffold(svg, W, H, padL, padR, padT, padB, yMax);

    var pts = data.map(function (d, i) {
      return {
        x: padL + (W - padL - padR) * (i / (data.length - 1)),
        y: H - padB - (H - padB - padT) * (d.value / yMax),
        d: d
      };
    });

    /* Staircase path: horizontal then vertical between points */
    var pathD = 'M ' + pts[0].x + ' ' + pts[0].y;
    for (var i = 1; i < pts.length; i++) {
      pathD += ' L ' + pts[i].x + ' ' + pts[i - 1].y +
               ' L ' + pts[i].x + ' ' + pts[i].y;
    }
    svg.appendChild(el('path', {
      d: pathD, fill: 'none', stroke: '#0C0C0C',
      'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round'
    }));

    /* Points + value labels + rotated x labels (for long stage names) */
    pts.forEach(function (p) {
      svg.appendChild(el('circle', {
        cx: p.x, cy: p.y, r: 4.5,
        fill: '#FFFFFF', stroke: '#D70000', 'stroke-width': 2.5,
        'class': 'chart-point'
      }));

      svg.appendChild(el('text', {
        x: p.x, y: p.y - 12, 'text-anchor': 'middle',
        'font-size': 11.5, 'font-weight': 700, fill: '#0C0C0C'
      }, String(p.d.value) + suffix));

      svg.appendChild(el('text', {
        x: p.x + 4, y: H - padB + 22,
        'text-anchor': 'end', 'font-size': 10.5, fill: '#6b7280',
        transform: 'rotate(-32 ' + (p.x + 4) + ' ' + (H - padB + 22) + ')'
      }, String(p.d.label)));
    });

    container.appendChild(svg);
  }

  /* ---------------- RADAR / POLYGON CHART ---------------- */
  function parseRadarData(container) {
    try {
      return JSON.parse(container.getAttribute('data-data'));
    } catch (e) {
      return null;
    }
  }

  function renderRadar(container) {
    var cfg = parseRadarData(container);
    if (!cfg || !cfg.axes || !cfg.axes.length || !cfg.series || !cfg.series.length) { return; }

    var n = cfg.axes.length;
    var max = cfg.max || 100;
    var W = 560, H = 460;
    var cx = W / 2, cy = H / 2 - 8;
    var radius = 165;

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'class': 'w-full h-auto', role: 'img'
    });

    var angle = function (i) { return -Math.PI / 2 + (2 * Math.PI * i) / n; };
    var pointAt = function (i, ratio) {
      return {
        x: cx + radius * ratio * Math.cos(angle(i)),
        y: cy + radius * ratio * Math.sin(angle(i))
      };
    };

    /* Grid rings at 25/50/75/100% */
    [0.25, 0.5, 0.75, 1].forEach(function (r) {
      var pts = [];
      for (var i = 0; i < n; i++) {
        var p = pointAt(i, r);
        pts.push(p.x + ',' + p.y);
      }
      svg.appendChild(el('polygon', {
        points: pts.join(' '),
        fill: 'none', stroke: 'rgba(12,12,12,.1)', 'stroke-width': 1
      }));
    });

    /* Axis lines + labels */
    cfg.axes.forEach(function (name, i) {
      var outer = pointAt(i, 1);
      svg.appendChild(el('line', {
        x1: cx, y1: cy, x2: outer.x, y2: outer.y,
        stroke: 'rgba(12,12,12,.1)', 'stroke-width': 1
      }));
      var lp = pointAt(i, 1.2);
      svg.appendChild(el('text', {
        x: lp.x, y: lp.y, 'text-anchor': 'middle', dy: '0.32em',
        'font-size': 11, 'font-weight': 600, fill: '#6b7280'
      }, name));
    });

    /* Series polygons */
    cfg.series.forEach(function (s) {
      var pts = [], dots = [];
      s.values.forEach(function (v, i) {
        var p = pointAt(i, Math.max(0, Math.min(1, v / max)));
        pts.push(p.x + ',' + p.y);
        dots.push(p);
      });
      svg.appendChild(el('polygon', {
        points: pts.join(' '),
        fill: s.color, 'fill-opacity': 0.15,
        stroke: s.color, 'stroke-width': 2.5, 'stroke-linejoin': 'round'
      }));
      dots.forEach(function (p) {
        svg.appendChild(el('circle', {
          cx: p.x, cy: p.y, r: 3.5, fill: s.color
        }));
      });
      /* series label anchored at its first vertex (top axis) */
      var anchor = pointAt(0, Math.max(0, Math.min(1, s.values[0] / max)));
      svg.appendChild(el('text', {
        x: anchor.x, y: anchor.y - 10, 'text-anchor': 'middle',
        'font-size': 11.5, 'font-weight': 700, fill: s.color
      }, s.label));
    });

    container.appendChild(svg);
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-chart]').forEach(function (container) {
      var type = container.getAttribute('data-chart');
      if (type === 'bar') { renderBar(container); }
      else if (type === 'line') { renderLine(container); }
      else if (type === 'step') { renderStep(container); }
      else if (type === 'radar') { renderRadar(container); }
    });
  });
})();
