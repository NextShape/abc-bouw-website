/* ============================================================
   APP.JS | Navbar, Mobile Menu, Scroll-to-Top, Accordion
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL EFFECT ===
  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // === MOBILE MENU ===
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === SCROLL TO TOP ===
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === SMOOTH SCROLL FOR ANCHORS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // === ACTIVE NAV LINK ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.header__nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === ACCORDION ===
  const accordionItems = document.querySelectorAll('[data-accordion]');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header, .faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        accordionItems.forEach(i => i.classList.remove('active'));

        // Open clicked (if it was closed)
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // === VIDEO MODAL ===
  const videoModal = document.getElementById('videoModal');
  const playBtn = document.getElementById('featuresPlayBtn');
  const closeBtn = document.querySelector('.video-modal__close');
  const overlay = document.querySelector('.video-modal__overlay');
  const iframe = document.getElementById('videoIframe');

  // Hardcode a placeholder video or generic one if needed
  const videoSrc = "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&rel=0";

  function openModal() {
    if (videoModal && iframe) {
      iframe.src = videoSrc; // Set src to start playing
      videoModal.classList.add('active');
    }
  }

  function closeModal() {
    if (videoModal && iframe) {
      videoModal.classList.remove('active');
      iframe.src = ""; // Clear src to stop playing
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // === CONTACT FORM SUCCESS ===
  if (window.location.search.includes('success=true')) {
    const successMsg = document.getElementById('contactSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // === PAGE LOADED ===
  document.body.classList.add('page-loaded');
});
