/**
 * Mohammad Salim Hosen - Personal Portfolio & Systems Showcase
 * Light/Dark Theme Engine & Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initBackToTop();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
});

/**
 * Light / Dark Theme Toggle Engine
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to 'light' (matching uploaded mockup)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  applyTheme(savedTheme);

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (!themeToggleBtn) return;

    if (theme === 'dark') {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun" title="Switch to Light Mode"></i>';
    } else {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon" title="Switch to Dark Mode"></i>';
    }
  }
}

/**
 * Smooth Back-To-Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Mobile Navigation Menu Drawer
 */
function initMobileNav() {
  const hamburgerBtn = document.querySelector('.mobile-hamburger');
  const navMenu = document.querySelector('.main-nav-links');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.style.display === 'flex';
    if (isOpen) {
      navMenu.style.display = 'none';
      hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '76px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'var(--bg-page)';
      navMenu.style.padding = '24px';
      navMenu.style.borderBottom = '1px solid var(--border-color)';
      navMenu.style.boxShadow = 'var(--shadow-lg)';
      hamburgerBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
}

/**
 * Smooth In-Page Anchor Scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Scroll Reveal Animations (Premium Interactive Feel)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}