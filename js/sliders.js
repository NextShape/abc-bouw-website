/* ============================================================
   SLIDERS.JS | Hero Slider, Testimonial & Project Carousel
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === HERO SLIDER ===
  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  if (heroSlides.length > 1) {
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      currentSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    if (heroNext) {
      heroNext.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          resetAutoPlay();
        }
      }, { passive: true });
    }

    startAutoPlay();
  }

  // === TESTIMONIAL CAROUSEL ===
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    let currentIndex = 0;
    let slidesPerView = 3;
    let autoplayInterval;

    function getSlidesPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getTotalSlides() {
      return track.children.length;
    }

    function getMaxIndex() {
      return Math.max(0, getTotalSlides() - slidesPerView);
    }

    function updateCarousel() {
      const slides = track.children;
      if (!slides.length) return;

      const wrapper = track.parentElement;
      const wrapperWidth = wrapper.offsetWidth;
      const gap = 20;
      const slideWidth = (wrapperWidth - gap * (slidesPerView - 1)) / slidesPerView;

      Array.from(slides).forEach(slide => {
        slide.style.flex = `0 0 ${slideWidth}px`;
        slide.style.margin = `0 ${gap / 2}px`;
      });

      const offset = currentIndex * (slideWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      updateDots();
    }

    function createDots() {
      const totalDots = getMaxIndex() + 1;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goNext() {
      currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
      updateCarousel();
    }

    function goPrev() {
      currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
      updateCarousel();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(goNext, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    prevBtn.addEventListener('click', () => { goPrev(); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { goNext(); resetAutoplay(); });

    // Touch/swipe support
    let tStartX = 0;
    let tEndX = 0;
    track.addEventListener('touchstart', (e) => {
      tStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      tEndX = e.changedTouches[0].screenX;
      const diff = tStartX - tEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext(); else goPrev();
        resetAutoplay();
      }
    }, { passive: true });

    // Init & resize
    function initCarousel() {
      slidesPerView = getSlidesPerView();
      currentIndex = Math.min(currentIndex, getMaxIndex());
      createDots();
      updateCarousel();
    }

    initCarousel();
    window.addEventListener('resize', initCarousel);
    startAutoplay();
  }

  // === PROJECT CAROUSEL ===
  const projectTrack = document.querySelector('.projects__track');
  const projectDotsContainer = document.querySelector('#projectDots');
  let allProjectSlides;
  let allProjectDots;
  let isMobileProjects = window.innerWidth <= 768;

  // Store original HTML so we can restore on resize
  const originalProjectTrackHTML = projectTrack ? projectTrack.innerHTML : '';
  const originalProjectDotsHTML = projectDotsContainer ? projectDotsContainer.innerHTML : '';

  function buildMobileProjectSlides() {
    if (!projectTrack || !projectDotsContainer) return;

    // Collect all project cards from all slides
    const cards = Array.from(projectTrack.querySelectorAll('.project-card'));

    // Rebuild track: one card per slide
    projectTrack.innerHTML = '';
    cards.forEach((card, i) => {
      const slide = document.createElement('div');
      slide.classList.add('projects__slide');
      if (i === 0) slide.classList.add('active');
      const grid = document.createElement('div');
      grid.classList.add('projects__grid');
      grid.appendChild(card);
      slide.appendChild(grid);
      projectTrack.appendChild(slide);
    });

    // Rebuild dots
    projectDotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('data-slide', i);
      projectDotsContainer.appendChild(dot);
    });
  }

  function restoreDesktopProjectSlides() {
    if (!projectTrack || !projectDotsContainer) return;
    projectTrack.innerHTML = originalProjectTrackHTML;
    projectDotsContainer.innerHTML = originalProjectDotsHTML;
  }

  function initProjectCarousel() {
    allProjectSlides = document.querySelectorAll('.projects__slide');
    allProjectDots = document.querySelectorAll('#projectDots .carousel-dot');

    if (allProjectSlides.length <= 1) return;

    let currentProjectSlide = 0;
    let projectInterval;

    function showProjectSlide(index) {
      allProjectSlides.forEach(slide => slide.classList.remove('active'));
      allProjectDots.forEach(dot => dot.classList.remove('active'));

      currentProjectSlide = (index + allProjectSlides.length) % allProjectSlides.length;

      allProjectSlides[currentProjectSlide].classList.add('active');
      if (allProjectDots[currentProjectSlide]) {
        allProjectDots[currentProjectSlide].classList.add('active');
      }
    }

    function nextProjectSlide() {
      showProjectSlide(currentProjectSlide + 1);
    }

    function startProjectAutoPlay() {
      projectInterval = setInterval(nextProjectSlide, 18000);
    }

    function resetProjectAutoPlay() {
      clearInterval(projectInterval);
      startProjectAutoPlay();
    }

    allProjectDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showProjectSlide(index);
        resetProjectAutoPlay();
      });
    });

    const prevBtn = document.getElementById('projectPrev');
    const nextBtn = document.getElementById('projectNext');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showProjectSlide(currentProjectSlide - 1);
        resetProjectAutoPlay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showProjectSlide(currentProjectSlide + 1);
        resetProjectAutoPlay();
      });
    }

    // Touch/swipe support for mobile
    if (isMobileProjects) {
      let pTouchStartX = 0;
      const slider = document.querySelector('.projects__slider');
      if (slider) {
        slider.addEventListener('touchstart', (e) => {
          pTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        slider.addEventListener('touchend', (e) => {
          const diff = pTouchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) showProjectSlide(currentProjectSlide + 1);
            else showProjectSlide(currentProjectSlide - 1);
            resetProjectAutoPlay();
          }
        }, { passive: true });
      }
    }

    startProjectAutoPlay();
  }

  function setupProjects() {
    const nowMobile = window.innerWidth <= 768;
    if (nowMobile && !isMobileProjects) {
      isMobileProjects = true;
      buildMobileProjectSlides();
      initProjectCarousel();
    } else if (!nowMobile && isMobileProjects) {
      isMobileProjects = false;
      restoreDesktopProjectSlides();
      initProjectCarousel();
    }
  }

  // Initial setup
  if (isMobileProjects) {
    buildMobileProjectSlides();
  }
  initProjectCarousel();

  window.addEventListener('resize', setupProjects);
});
