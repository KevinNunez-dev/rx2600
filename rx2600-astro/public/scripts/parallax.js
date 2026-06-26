// ─── Parallax Scrolling Effects ───

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
});

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observeParallax(entry.target);
      }
    });
  }, { threshold: 0 });

  parallaxElements.forEach((el) => {
    observer.observe(el);
  });
}

function observeParallax(element) {
  const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
  
  const updateParallax = () => {
    const rect = element.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight);
    const offsetY = scrollProgress * window.innerHeight * speed;
    
    element.style.transform = `translateY(${offsetY}px)`;
  };

  // Initial call
  updateParallax();

  // Listen to scroll events
  window.addEventListener('scroll', updateParallax, { passive: true });
}

// ─── Smooth Scroll Animations ───

function observeElements() {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = entry.target.className;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

observeElements();

// ─── Mobile Menu Toggle ───

const hamburger = document.querySelector('.hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
  });
}

// ─── Smooth Scroll for Anchor Links ───

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ─── Performance Optimization ───

let ticking = false;
const updateOnScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Parallax updates handled by scroll listener
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', updateOnScroll, { passive: true });
