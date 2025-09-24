const THEME_COLOR_PAIRS = [
  { dark: '#1b2a41', bright: '#00b4d8' },
  { dark: '#2e2d4d', bright: '#ff6f59' },
  { dark: '#12312b', bright: '#30c39e' },
  { dark: '#1a2b49', bright: '#f9a03f' },
  { dark: '#2d1e2f', bright: '#ff4f79' },
  { dark: '#202145', bright: '#64dfdf' },
  { dark: '#2c1f30', bright: '#ff9f1c' },
  { dark: '#103a3e', bright: '#36c5f0' },
  { dark: '#2a1a3b', bright: '#d65db1' },
  { dark: '#173042', bright: '#3ddc97' },
];

function encodeSvg(svg) {
  if (typeof TextEncoder !== 'undefined') {
    const bytes = new TextEncoder().encode(svg);
    let binary = '';
    bytes.forEach((value) => {
      binary += String.fromCharCode(value);
    });
    return window.btoa(binary);
  }

  return window.btoa(unescape(encodeURIComponent(svg)));
}

function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    return { r: 0, g: 0, b: 0 };
  }
  let normalized = hex.trim();
  if (normalized.startsWith('#')) {
    normalized = normalized.slice(1);
  }
  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((char) => char + char)
      .join('');
  }
  const int = parseInt(normalized, 16);
  if (Number.isNaN(int)) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff,
  };
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((value) => {
        const clamped = Math.max(0, Math.min(255, Math.round(value)));
        return clamped.toString(16).padStart(2, '0');
      })
      .join('')
  );
}

function mixColors(source, target, amount) {
  const ratio = Math.max(0, Math.min(1, amount));
  const a = hexToRgb(source);
  const b = hexToRgb(target);
  const mix = (channelA, channelB) => channelA + (channelB - channelA) * ratio;
  return rgbToHex(mix(a.r, b.r), mix(a.g, b.g), mix(a.b, b.b));
}

function lightenColor(color, amount) {
  return mixColors(color, '#ffffff', amount);
}

function darkenColor(color, amount) {
  return mixColors(color, '#000000', amount);
}

function toRgba(color, alpha) {
  const { r, g, b } = hexToRgb(color);
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.max(0, Math.min(1, alpha))})`;
}

function getReadableTextColor(color) {
  const { r, g, b } = hexToRgb(color);
  const toLinear = (value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  };
  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return luminance > 0.55 ? '#000000' : '#ffffff';
}

async function updateWordmarkImages(colors) {
  if (!colors) {
    return;
  }

  const wordmarks = Array.from(document.querySelectorAll('[data-wordmark-src]'));
  if (!wordmarks.length || !window.fetch) {
    return;
  }

  const templateUrl = wordmarks[0].getAttribute('data-wordmark-src');
  if (!templateUrl) {
    return;
  }

  try {
    const response = await fetch(templateUrl);
    if (!response.ok) {
      return;
    }

    let svgText = await response.text();
    const replacements = [
      { pattern: /#123934/gi, value: colors.dark },
      { pattern: /#0a3a35/gi, value: colors.dark },
      { pattern: /#24a687/gi, value: colors.bright },
    ];

    replacements.forEach(({ pattern, value }) => {
      svgText = svgText.replace(pattern, value);
    });

    const dataUrl = `data:image/svg+xml;base64,${encodeSvg(svgText)}`;
    wordmarks.forEach((img) => {
      img.setAttribute('src', dataUrl);
      img.setAttribute('data-wordmark-loaded', 'true');
    });
  } catch (error) {
    console.error('Failed to update wordmark colors', error);
  }
}

function initThemeColors() {
  const palette = THEME_COLOR_PAIRS[Math.floor(Math.random() * THEME_COLOR_PAIRS.length)];
  if (!palette) {
    return null;
  }

  const root = document.documentElement;
  const dark = palette.dark;
  const bright = palette.bright;

  root.style.setProperty('--theme-dark', dark);
  root.style.setProperty('--theme-dark-strong', darkenColor(dark, 0.18));
  root.style.setProperty('--theme-dark-soft', lightenColor(dark, 0.65));
  root.style.setProperty('--theme-bright', bright);
  root.style.setProperty('--theme-bright-strong', darkenColor(bright, 0.2));
  root.style.setProperty('--theme-bright-soft', lightenColor(bright, 0.72));
  root.style.setProperty('--theme-bright-lighter', lightenColor(bright, 0.86));
  root.style.setProperty('--theme-shadow', toRgba(dark, 0.32));
  root.style.setProperty('--theme-bright-translucent', toRgba(bright, 0.18));
  root.style.setProperty('--theme-dark-translucent', toRgba(dark, 0.18));
  root.style.setProperty('--stack1', lightenColor(bright, 0.88));
  root.style.setProperty('--stack2', lightenColor(bright, 0.64));
  root.style.setProperty('--stack3', lightenColor(bright, 0.42));
  root.style.setProperty('--text-on-bright', getReadableTextColor(bright));
  root.style.setProperty('--text-on-dark', getReadableTextColor(dark));
  root.style.setProperty('--warning-soft', toRgba(bright, 0.24));
  root.style.setProperty('--danger-soft', toRgba(darkenColor(bright, 0.35), 0.24));
  root.style.setProperty('--wordmark-dark', dark);
  root.style.setProperty('--wordmark-bright', bright);

  return { dark, bright };
}

const ACTIVE_THEME = initThemeColors();
updateWordmarkImages(ACTIVE_THEME);

function getElements() {
  return {
    ageSelect: document.getElementById('age'),
    weightInput: document.getElementById('weight'),
    weightUnit: document.getElementById('weight-unit'),
    message: document.getElementById('message'),
    results: document.getElementById('results'),
    calculateButton: document.querySelector('#calculator button'),
  };
}

function clearResults(elements) {
  if (elements.results) {
    elements.results.innerHTML = '';
  }
}

function updateForm() {
  const elements = getElements();
  if (
    !elements.ageSelect ||
    !elements.weightInput ||
    !elements.weightUnit ||
    !elements.message ||
    !elements.calculateButton ||
    !elements.results
  ) {
    return;
  }

  const age = elements.ageSelect.value;

  clearResults(elements);
  elements.message.hidden = true;
  elements.message.innerHTML = '';
  elements.message.classList.remove('alert--critical');
  elements.calculateButton.disabled = false;
  elements.weightInput.disabled = false;
  elements.weightUnit.disabled = false;

  if (age === '0-2') {
    elements.message.hidden = false;
    elements.message.classList.add('alert--critical');
    elements.message.innerHTML =
      '<strong>Seek immediate medical care.</strong> If a child less than 60 days old has a fever it is a medical emergency. ' +
      'Please contact your pediatrician or seek care with a healthcare provider immediately.';

    elements.calculateButton.disabled = true;
    elements.weightInput.disabled = true;
    elements.weightUnit.disabled = true;
  }
}

function calculateDose() {
  const elements = getElements();

  if (!elements.ageSelect || !elements.weightInput || !elements.weightUnit || !elements.results) {
    return;
  }

  const age = elements.ageSelect.value;
  const weightInput = parseFloat(elements.weightInput.value);
  const weightUnit = elements.weightUnit.value;

  clearResults(elements);

  const renderWarning = (title, body, modifier = 'warning-card--teal') => {
    const label = title ? `<strong>${title}</strong>` : '';
    const separator = title ? ' ' : '';
    return `<div class="warning-card ${modifier}">${label}${separator}${body}</div>`;
  };

  if (!age) {
    elements.results.innerHTML = renderWarning('Age required', 'Please select an age group to continue.');
    return;
  }

  if (isNaN(weightInput) || weightInput <= 0) {
    elements.results.innerHTML = renderWarning('Weight required', 'Please enter a valid weight to calculate dosing.');
    return;
  }

  const weightKg = weightUnit === 'lbs' ? weightInput / 2.20462 : weightInput;
  const weightLbs = weightUnit === 'lbs' ? weightInput : weightInput * 2.20462;
  const resultBlocks = [];

  resultBlocks.push(
    `<p class="result-weight"><span>Patient weight</span><br><strong>${weightKg.toFixed(1)} kg (${weightLbs.toFixed(1)} lbs)</strong></p>`
  );

  if (age === '2-6') {
    const acetaMgCalculated = 12.5 * weightKg;
    const ACETA_MAX_MG_INFANT = 160;
    const acetaMg = Math.min(acetaMgCalculated, ACETA_MAX_MG_INFANT);
    const acetaMl = (acetaMg / 160) * 5;
    const acetaCapped = acetaMg < acetaMgCalculated;

    const group = [];
    group.push(`
      <article class="result-card">
        <h3>Acetaminophen (160 mg / 5 mL)</h3>
        <p>Give ${acetaMl.toFixed(1)} mL (${acetaMg.toFixed(0)} mg) every 4 hours as needed for fever/pain.</p>
        <p class="dose-note">Maximum single dose for this age group is ${ACETA_MAX_MG_INFANT} mg.</p>
        ${
          acetaCapped
            ? renderWarning(
                'Maximum dose reached',
                'Weight-based dose was limited to this maximum. Consider discussing dosing with your pediatrician.',
                'warning-card--orange'
              )
            : ''
        }
      </article>
    `);

    group.push(
      renderWarning(
        '',
        '<em>Ibuprofen is not recommended for infants under six months. Consult your pediatrician before using ibuprofen for this age group.</em>',
        'warning-card--red-soft'
      )
    );

    resultBlocks.push(`<div class="result-group">${group.join('')}</div>`);
  } else if (age === '6+') {
    const ACETA_MAX_SINGLE_DOSE_MG = 1000;
    const IBU_MAX_SINGLE_DOSE_MG = 800;

    const acetaMgCalculated = 15 * weightKg;
    const acetaMg = Math.min(acetaMgCalculated, ACETA_MAX_SINGLE_DOSE_MG);
    const acetaMl = (acetaMg / 160) * 5;
    const acetaCapped = acetaMg < acetaMgCalculated;

    const ibuMgCalculated = 10 * weightKg;
    const ibuMg = Math.min(ibuMgCalculated, IBU_MAX_SINGLE_DOSE_MG);
    const ibuCapped = ibuMg < ibuMgCalculated;
    const ibuMl50 = (ibuMg / 50) * 1.25;
    const ibuMl100 = (ibuMg / 100) * 5;

    const group = [];

    group.push(`
      <article class="result-card">
        <h3>Acetaminophen (160 mg / 5 mL)</h3>
        <p>Give ${acetaMl.toFixed(1)} mL (${acetaMg.toFixed(0)} mg) every 6 hours as needed for fever/pain.</p>
        <p class="dose-note">Maximum single dose for this age group is ${ACETA_MAX_SINGLE_DOSE_MG} mg of acetaminophen every 6 hours.</p>
        ${
          acetaCapped
            ? renderWarning(
                'Maximum dose reached',
                'Weight-based dose was limited to this maximum. Consider discussing dosing with your pediatrician.',
                'warning-card--orange'
              )
            : ''
        }
      </article>
    `);

    group.push(`
      <article class="result-card">
        <h3>Ibuprofen (oral)</h3>
        <p><strong>Infant's 50 mg / 1.25 mL:</strong> Give ${ibuMl50.toFixed(1)} mL (${ibuMg.toFixed(0)} mg) every 6 hours as needed for fever/pain.</p>
        <p><strong>Children's 100 mg / 5 mL:</strong> Give ${ibuMl100.toFixed(1)} mL (${ibuMg.toFixed(0)} mg) every 6 hours as needed for fever/pain.</p>
        <p class="dose-note">Maximum single dose for this age group is ${IBU_MAX_SINGLE_DOSE_MG} mg of ibuprofen every 6 hours.</p>
        ${
          ibuCapped
            ? renderWarning(
                'Maximum dose reached',
                'Weight-based dose was limited to this maximum. Consider discussing dosing with your pediatrician.',
                'warning-card--orange'
              )
            : ''
        }
      </article>
    `);

    group.push(
      renderWarning(
        'Dose spacing reminder',
        `Never exceed ${ACETA_MAX_SINGLE_DOSE_MG} mg of acetaminophen or ${IBU_MAX_SINGLE_DOSE_MG} mg of ibuprofen in a single dose, and allow at least 6 hours between doses.`,
        'warning-card--teal'
      )
    );

    resultBlocks.push(`<div class="result-group">${group.join('')}</div>`);
  }

  elements.results.innerHTML = resultBlocks.join('');
}

function initCalculator() {
  const form = document.getElementById('calculator');
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateDose();
  });
}

// Initialize state on first load
updateForm();

function initCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    slides.forEach((slide) => {
      slide.classList.remove('is-active');
      slide.setAttribute('aria-hidden', 'true');
    });

    let index = -1;

    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      dotsContainer.setAttribute('role', 'tablist');
    }

    const dots = slides.map((_, slideIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show slide ${slideIndex + 1}`);
      dot.setAttribute('aria-pressed', 'false');
      dot.addEventListener('click', () => goToSlide(slideIndex));
      if (dotsContainer) {
        dotsContainer.appendChild(dot);
      }
      return dot;
    });

    function goToSlide(newIndex) {
      if (index >= 0) {
        slides[index].classList.remove('is-active');
        slides[index].setAttribute('aria-hidden', 'true');
        if (dots[index]) {
          dots[index].classList.remove('is-active');
          dots[index].setAttribute('aria-pressed', 'false');
        }
      }

      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      slides[index].setAttribute('aria-hidden', 'false');
      if (dots[index]) {
        dots[index].classList.add('is-active');
        dots[index].setAttribute('aria-pressed', 'true');
      }

      const controlsDisabled = slides.length <= 1;
      if (prevButton) {
        prevButton.disabled = controlsDisabled;
      }
      if (nextButton) {
        nextButton.disabled = controlsDisabled;
      }
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => goToSlide(index - 1));
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => goToSlide(index + 1));
    }

    goToSlide(0);
    carousel.classList.add('carousel-ready');
  });
}

function initTranslations() {
  const trigger = document.querySelector('[data-open-translations]');
  const overlay = document.getElementById('translation-overlay');
  if (!trigger || !overlay) {
    return;
  }

  const closeButton = overlay.querySelector('[data-close-translations]');
  const status = overlay.querySelector('[data-selection-status]');
  const languageButtons = overlay.querySelectorAll('[data-translate]');
  let lastFocusedElement = null;
  const focusableElements = [
    ...(closeButton ? [closeButton] : []),
    ...Array.from(languageButtons),
  ];
  const backgroundElements = Array.from(
    document.querySelectorAll('main, nav, footer')
  );

  function setBackgroundInert(isInert) {
    backgroundElements.forEach((element) => {
      if (!element) {
        return;
      }
      if (isInert) {
        element.setAttribute('aria-hidden', 'true');
        element.setAttribute('inert', '');
        if ('inert' in element) {
          element.inert = true;
        }
      } else {
        element.removeAttribute('aria-hidden');
        element.removeAttribute('inert');
        if ('inert' in element) {
          element.inert = false;
        }
      }
    });
  }

  function focusFirstElement() {
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  function setExpanded(isExpanded) {
    trigger.setAttribute('aria-expanded', String(isExpanded));
    overlay.setAttribute('aria-hidden', String(!isExpanded));
  }

  setExpanded(false);

  function openOverlay() {
    if (!overlay.hidden) {
      return;
    }
    lastFocusedElement = document.activeElement;
    setBackgroundInert(true);
    overlay.hidden = false;
    requestAnimationFrame(() => {
      overlay.classList.add('is-visible');
    });
    document.body.style.overflow = 'hidden';
    setExpanded(true);
    focusFirstElement();
  }

  function closeOverlay() {
    if (overlay.hidden) {
      return;
    }
    overlay.classList.remove('is-visible');
    setExpanded(false);
    document.body.style.overflow = '';
    setBackgroundInert(false);
    if (status) {
      status.textContent = '';
    }
    setTimeout(() => {
      overlay.hidden = true;
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }, 250);
  }

  trigger.addEventListener('click', () => {
    if (overlay.hidden) {
      openOverlay();
    } else {
      closeOverlay();
    }
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (overlay.hidden) {
        openOverlay();
      }
    }
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => closeOverlay());
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) {
      closeOverlay();
    }
  });

  overlay.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || focusableElements.length === 0) {
      return;
    }

    const currentIndex = focusableElements.indexOf(document.activeElement);
    if (currentIndex === -1) {
      event.preventDefault();
      focusFirstElement();
      return;
    }

    let nextIndex = currentIndex + (event.shiftKey ? -1 : 1);

    if (nextIndex < 0) {
      nextIndex = focusableElements.length - 1;
    } else if (nextIndex >= focusableElements.length) {
      nextIndex = 0;
    }

    event.preventDefault();
    focusableElements[nextIndex].focus();
  });

  document.addEventListener('focusin', (event) => {
    if (!overlay.hidden && !overlay.contains(event.target)) {
      focusFirstElement();
    }
  });

  const translationBase = 'https://translate.google.com/translate';

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const languageCode = button.getAttribute('data-translate');
      const languageName = button.getAttribute('data-lang-name');
      if (!languageCode) {
        return;
      }

      const url = `${translationBase}?sl=en&tl=${encodeURIComponent(languageCode)}&u=${encodeURIComponent(
        window.location.href
      )}`;

      window.open(url, '_blank', 'noopener');
      if (status) {
        status.textContent = `${languageName || 'Español'} translation opening in a new tab.`;
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initCalculator();
  updateForm();
  initTranslations();
});
