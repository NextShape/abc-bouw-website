/* ============================================================
   ANIMATIONS.JS | Scroll Reveals & Counter Animation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === SCROLL REVEAL (IntersectionObserver) ===
  const revealElements = document.querySelectorAll('[data-animate]');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // === COUNTER ANIMATION (Ultra-smooth) ===
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    if (target === 0) { element.textContent = '0'; return; }

    // Scale duration to target size so small numbers (16) don't drag
    // and large numbers (250) have enough frames per increment
    const duration = Math.min(1200 + target * 8, 2800);
    let startTime = null;
    let lastDisplayed = -1;

    // Quintic ease-out: very smooth deceleration, no sudden stops
    function easeOutQuint(t) {
      return 1 - Math.pow(1 - t, 5);
    }

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = elapsed / duration;
      const progress = Math.min(rawProgress, 1);
      const easedProgress = easeOutQuint(progress);
      const current = Math.round(easedProgress * target);

      // Only touch the DOM when the number actually changes
      if (current !== lastDisplayed) {
        element.textContent = current;
        lastDisplayed = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (lastDisplayed !== target) {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }
});
