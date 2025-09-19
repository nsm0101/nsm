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
  elements.results.innerHTML = '';
}

function updateForm() {
  const elements = getElements();
  const age = elements.ageSelect.value;

  clearResults(elements);
  elements.message.hidden = true;
  elements.message.innerHTML = '';
  elements.calculateButton.disabled = false;
  elements.weightInput.disabled = false;
  elements.weightUnit.disabled = false;

  if (age === '0-2') {
    elements.message.hidden = false;
    elements.message.innerHTML =
      'If a child less than 60 days old has a fever it is a medical emergency. ' +
      'Please contact your pediatrician or seek care with a healthcare provider immediately.';

    elements.calculateButton.disabled = true;
    elements.weightInput.disabled = true;
    elements.weightUnit.disabled = true;
  }
}

function calculateDose() {
  const elements = getElements();
  const age = elements.ageSelect.value;
  const weightInput = parseFloat(elements.weightInput.value);
  const weightUnit = elements.weightUnit.value;

  clearResults(elements);

  if (!age) {
    elements.results.innerHTML = '<p><strong>Please select an age group to continue.</strong></p>';
    return;
  }

  if (isNaN(weightInput) || weightInput <= 0) {
    elements.results.innerHTML = '<p><strong>Please enter a valid weight.</strong></p>';
    return;
  }

  const weightKg = weightUnit === 'lbs' ? weightInput / 2.20462 : weightInput;
  const weightLbs = weightUnit === 'lbs' ? weightInput : weightInput * 2.20462;

  let html = `<p><strong>Patient weight:</strong> ${weightKg.toFixed(1)} kg (${weightLbs.toFixed(1)} lbs)</p>`;

  if (age === '2-6') {
    const acetaMgCalculated = 12.5 * weightKg;
    const ACETA_MAX_MG_INFANT = 160;
    const acetaMg = Math.min(acetaMgCalculated, ACETA_MAX_MG_INFANT);
    const acetaMl = (acetaMg / 160) * 5;
    const acetaCapped = acetaMg < acetaMgCalculated;

    html += `
      <p><strong>Acetaminophen (160 mg / 5 mL)</strong><br>
      Give ${acetaMl.toFixed(1)} mL (${acetaMg.toFixed(0)} mg) every 4 hours as needed for fever/pain.</p>
      <p class="dose-note">Maximum single dose for this age group is ${ACETA_MAX_MG_INFANT} mg.${
        acetaCapped
          ? ' Weight-based dose was limited to this maximum. Consider discussing dosing with your pediatrician.'
          : ''
      }</p>
    `;
  } else if (age === '6+') {
    const ACETA_MAX_MG_CHILD = 1000;
    const IBU_MAX_MG_CHILD = 400;

    const acetaMgCalculated = 15 * weightKg;
    const acetaMg = Math.min(acetaMgCalculated, ACETA_MAX_MG_CHILD);
    const acetaMl = (acetaMg / 160) * 5;
    const acetaCapped = acetaMg < acetaMgCalculated;

    const ibuMgCalculated = 10 * weightKg;
    const ibuMg = Math.min(ibuMgCalculated, IBU_MAX_MG_CHILD);
    const ibuCapped = ibuMg < ibuMgCalculated;
    const ibuMl50 = (ibuMg / 50) * 1.25;
    const ibuMl100 = (ibuMg / 100) * 5;

    html += `
      <p><strong>Acetaminophen (160 mg / 5 mL)</strong><br>
      Give ${acetaMl.toFixed(1)} mL (${acetaMg.toFixed(0)} mg) every 6 hours as needed for fever/pain.</p>
      <p class="dose-note">Maximum single dose for this age group is ${ACETA_MAX_MG_CHILD} mg.${
        acetaCapped
          ? ' Weight-based dose was limited to this maximum. Consider discussing dosing with your pediatrician.'
          : ''
      }</p>
      <p><strong>Ibuprofen (Infant's 50 mg / 1.25 mL)</strong><br>
      Give ${ibuMl50.toFixed(1)} mL (${ibuMg.toFixed(0)} mg) every 6 hours as needed for fever/pain.</p>
      <p><strong>Ibuprofen (Children's 100 mg / 5 mL)</strong><br>
      Give ${ibuMl100.toFixed(1)} mL (${ibuMg.toFixed(0)} mg) every 6 hours as needed for fever/pain.</p>
      <p class="dose-note">Maximum single dose for this age group is ${IBU_MAX_MG_CHILD} mg.${
        ibuCapped
          ? ' Weight-based dose was limited to this maximum. Consider discussing dosing with your pediatrician.'
          : ''
      }</p>
    `;
  }

  elements.results.innerHTML = html;
}

// Initialize state on first load
updateForm();

function initCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    let index = 0;

    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    const dots = slides.map((_, slideIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show slide ${slideIndex + 1}`);
      dot.addEventListener('click', () => goToSlide(slideIndex));
      dotsContainer?.appendChild(dot);
      return dot;
    });

    function goToSlide(newIndex) {
      slides[index].classList.remove('is-active');
      dots[index]?.classList.remove('is-active');
      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      dots[index]?.classList.add('is-active');
    }

    prevButton?.addEventListener('click', () => goToSlide(index - 1));
    nextButton?.addEventListener('click', () => goToSlide(index + 1));

    goToSlide(0);
  });
}

window.addEventListener('DOMContentLoaded', initCarousels);
