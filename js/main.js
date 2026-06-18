const SVG_ROOT = 'assets/svg/SVGs Prueba/Mapas-Desktop/';
const BASE_MAP = `${SVG_ROOT}0-MAPA-BASE.svg`;
const LINE_ORIGIN = { x: 643, y: 566 };

const steps = [
  {
    label: 'Por dónde se van',
    assets: [
      { role: 'lines', file: '1- POR DONDE SE VAN/1-DONDE-SE-VAN-LIN.svg' },
      { role: 'rec', file: '1- POR DONDE SE VAN/2-DONDE-SE-VAN-REC.svg' },
      { role: 'data', file: '1- POR DONDE SE VAN/3-DONDE-SE-VAN-DATA.svg' }
    ]
  },
  {
    label: 'Por dónde regresan',
    assets: [
      { role: 'lines', file: '2- POR DONDE REGRESAN/1-DONDE-REGRESAN-LIN.svg', direction: 'in' },
      { role: 'rec', file: '2- POR DONDE REGRESAN/2-DONDE-REGRESAN-REC.svg' },
      { role: 'data', file: '2- POR DONDE REGRESAN/3-DONDE-REGRESAN-DATA.svg' }
    ]
  },
  {
    label: 'Remesas',
    assets: [
      { role: 'lines', file: '3- REMESAS/1-REMESAS-LIN.svg', direction: 'in' },
      { role: 'rec', file: '3- REMESAS/2-REMESAS-REC.svg' },
      { role: 'data', file: '3- REMESAS/3-REMESAS-DATA.svg' }
    ]
  },
  {
    label: 'Egresos remesas',
    assets: [
      { role: 'lines', file: '4- EGRESOS REMESAS/1-EGRESOS-REMESAS-LIN.svg' },
      { role: 'rec', file: '4- EGRESOS REMESAS/2-EGRESOS-REMESAS-REC.svg' },
      { role: 'data', file: '4- EGRESOS REMESAS/3-EGRESOS-REMESAS-DATA.svg' }
    ]
  },
  {
    label: 'Cancillería',
    assets: [
      { role: 'lines', file: '5- CANCILLERIA/1-CANCILLERIA-LIN.svg' },
      { role: 'rec', file: '5- CANCILLERIA/2-CANCILLERIA-REC.svg' },
      { role: 'data', file: '5- CANCILLERIA/3-CANCILLERIA-DATA.svg' }
    ]
  },
  {
    label: 'Testimonios',
    assets: [
      { role: 'image', file: '6- TESTIMONIOS/1-TESTIMONIOS-BTN.svg' },
      { role: 'rec', file: '6- TESTIMONIOS/2-TESTIMONIOS-REC.svg', floating: true },
      { role: 'data', file: '6- TESTIMONIOS/3-TESTIMONIOS-LBOX.svg' }
    ]
  }
];

const state = {
  layers: [],
  activeIndex: -1,
  ticking: false
};

const els = {
  body: document.body,
  mapStory: document.querySelector('.map-story'),
  mapCanvas: document.getElementById('mapCanvas'),
  baseLayer: document.getElementById('baseLayer'),
  storyLayers: document.getElementById('storyLayers'),
  scrollHint: document.getElementById('scrollHint')
};

async function init() {
  els.body.classList.add('is-loading');
  await loadImageInto(BASE_MAP, els.baseLayer, 'asset-svg asset-base', 'Mapa base');

  state.layers = await Promise.all(steps.map((step, index) => createStepLayer(step, index)));

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  els.body.classList.remove('is-loading');
  update();
}

async function createStepLayer(step, index) {
  const layer = document.createElement('div');
  layer.className = 'step-layer';
  layer.dataset.index = String(index);
  layer.setAttribute('aria-label', step.label);
  els.storyLayers.appendChild(layer);

  const assets = [];
  for (let order = 0; order < step.assets.length; order += 1) {
    const asset = step.assets[order];
    const src = `${SVG_ROOT}${asset.file}`;
    const className = [
      'asset-svg',
      `asset-${asset.role}`,
      `asset-order-${order}`,
      asset.floating ? 'asset-floating-panel' : ''
    ].filter(Boolean).join(' ');

    const element = asset.role === 'lines'
      ? await loadSvgObject(src, layer, className)
      : await loadImageInto(src, layer, className, step.label);

    const paths = asset.role === 'lines' ? prepareDrawablePaths(element, asset.direction || 'out') : [];
    assets.push({ ...asset, order, element, paths });
  }

  return { element: layer, assets, step };
}

async function loadImageInto(src, parent, className, alt = '') {
  const img = document.createElement('img');
  img.className = className;
  img.src = safeAssetUrl(src);
  img.alt = alt;
  img.decoding = 'async';
  img.draggable = false;
  parent.appendChild(img);

  if (img.complete) return img;

  await new Promise((resolve, reject) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });
  });

  return img;
}

async function loadSvgObject(src, parent, className) {
  const object = document.createElement('object');
  object.className = className;
  object.data = safeAssetUrl(src);
  object.type = 'image/svg+xml';
  object.setAttribute('aria-label', src.split('/').pop());
  parent.appendChild(object);

  await new Promise((resolve, reject) => {
    object.addEventListener('load', resolve, { once: true });
    object.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });
  });

  const svg = object.contentDocument?.documentElement;
  if (!svg) throw new Error(`El archivo ${src} no contiene un SVG válido.`);

  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.display = 'block';
  svg.style.overflow = 'visible';
  svg.style.background = 'transparent';

  return object;
}

function prepareDrawablePaths(svgObject, direction = 'out') {
  const doc = svgObject.contentDocument;
  const shapes = Array.from(doc?.querySelectorAll('path, line, polyline, polygon') || []);

  return shapes.filter((shape) => typeof shape.getTotalLength === 'function')
    .map((shape) => {
      let length = 0;
      try {
        length = shape.getTotalLength();
      } catch (_error) {
        length = 0;
      }

      if (!length || !Number.isFinite(length)) return null;

      const reverse = shouldReversePath(shape, length, direction);
      shape.dataset.length = String(length);
      shape.dataset.reverse = reverse ? '1' : '0';
      shape.style.strokeDasharray = String(length);
      shape.style.strokeDashoffset = String(getInitialDashOffset(length, reverse));
      shape.style.transition = 'none';

      return shape;
    })
    .filter(Boolean);
}

function shouldReversePath(shape, length, direction = 'out') {
  try {
    const start = shape.getPointAtLength(0);
    const end = shape.getPointAtLength(length);
    const startDistance = distance(start, LINE_ORIGIN);
    const endDistance = distance(end, LINE_ORIGIN);

    // direction: 'out' = Colombia hacia destino. direction: 'in' = destino hacia Colombia.
    if (direction === 'in') return startDistance < endDistance;
    return startDistance > endDistance;
  } catch (_error) {
    return false;
  }
}

function distance(point, origin) {
  return Math.hypot(point.x - origin.x, point.y - origin.y);
}

function getInitialDashOffset(length, reverse) {
  return reverse ? -length : length;
}

function requestUpdate() {
  if (state.ticking) return;

  state.ticking = true;
  requestAnimationFrame(() => {
    update();
    state.ticking = false;
  });
}

function update() {
  const rect = els.mapStory.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const totalScrollable = Math.max(rect.height - viewportHeight, 1);
  const rawProgress = clamp((0 - rect.top) / totalScrollable, 0, 1);
  const scaledProgress = rawProgress * steps.length;

  if (els.scrollHint) {
    els.scrollHint.classList.toggle('is-hidden', scaledProgress > 2);
  }
  const activeIndex = Math.min(steps.length - 1, Math.floor(scaledProgress));
  const localProgress = clamp(scaledProgress - activeIndex, 0, 1);

  if (activeIndex !== state.activeIndex) setActiveStep(activeIndex);
  animateCurrentLayer(activeIndex, localProgress);
}

function setActiveStep(index) {
  state.activeIndex = index;

  state.layers.forEach((layer, layerIndex) => {
    layer.element.classList.toggle('is-active', layerIndex === index);
    layer.assets.forEach((asset) => {
      asset.element.style.opacity = '0';
      asset.element.style.transform = asset.role === 'rec' ? 'translate3d(0, 95%, 0)' : 'none';
      if (asset.paths.length) resetPaths(asset.paths);
    });
  });
}

function animateCurrentLayer(index, localProgress) {
  const layer = state.layers[index];
  if (!layer) return;

  layer.assets.forEach((asset) => {
    if (asset.role === 'lines') {
      const drawProgress = easeOutCubic(normalize(localProgress, 0.04, 0.34));
      asset.element.style.opacity = drawProgress > 0.01 ? '1' : '0';
      drawPaths(asset.paths, drawProgress);
      return;
    }

    if (asset.role === 'rec') {
      const panel = asset.floating
        ? getFinalPanelAnimation(localProgress)
        : getPanelAnimation(localProgress);
      asset.element.style.opacity = String(panel.opacity);
      asset.element.style.transform = `translate3d(0, ${panel.translateY}%, 0)`;
      return;
    }

    if (asset.role === 'data') {
      const fade = easeOutCubic(normalize(localProgress, 0.50, 0.70));
      asset.element.style.opacity = String(fade);
      asset.element.style.transform = 'none';
      return;
    }

    const fade = easeOutCubic(normalize(localProgress, 0.08, 0.34));
    asset.element.style.opacity = String(fade);
  });
}

function getPanelAnimation(progress) {
  const travel = normalize(progress, 0.10, 0.92);
  const translateY = lerp(98, -118, easeInOutSine(travel));
  const fadeIn = normalize(progress, 0.10, 0.24);
  const fadeOut = 1 - normalize(progress, 0.84, 0.94);
  const opacity = clamp(Math.min(fadeIn, fadeOut), 0, 1);

  return { translateY, opacity };
}

function getFinalPanelAnimation(progress) {
  const travel = normalize(progress, 0.12, 0.60);
  const translateY = lerp(98, 0, easeOutCubic(travel));
  const opacity = clamp(normalize(progress, 0.12, 0.28), 0, 1);

  return { translateY, opacity };
}

function resetPaths(paths) {
  paths.forEach((path) => {
    const length = Number(path.dataset.length || 0);
    const reverse = path.dataset.reverse === '1';
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(getInitialDashOffset(length, reverse));
  });
}

function drawPaths(paths, progress) {
  paths.forEach((path) => {
    const length = Number(path.dataset.length || 0);
    const reverse = path.dataset.reverse === '1';
    const initialOffset = getInitialDashOffset(length, reverse);
    path.style.strokeDashoffset = String(initialOffset * (1 - progress));
  });
}

function normalize(value, start, end) {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutSine(value) {
  return -(Math.cos(Math.PI * value) - 1) / 2;
}

function safeAssetUrl(src) {
  return encodeURI(src).replace(/#/g, '%23');
}

init().catch((error) => {
  els.body.classList.remove('is-loading');
  console.error(error);
  els.mapCanvas.insertAdjacentHTML('beforeend', `<p class="load-error">${error.message}</p>`);
});
