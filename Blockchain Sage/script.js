// === Initial Page Load & Scroll Animations ===
const animatableSelectors = 'h1, h2, h3, h4, p, img, section, .grid-item, nav, .hero-grid, footer, .gallery-item, .blue-btn, .whitepaper-btn';

// 1. Initial Load: Sequential fade-in for top-of-page elements
window.addEventListener('load', () => {
  const elements = document.querySelectorAll(animatableSelectors);
  elements.forEach((el, index) => {
    // Only auto-animate elements near the top to prevent a massive queue
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => el.classList.add('visible'), index * 100);
    }
  });
});

// 2. Continuous Scroll Observer (Fade in/out)
const observerOptions = {
  threshold: 0.1, // Trigger when 10% of the element is visible
  rootMargin: '0px 0px -50px 0px' // Slightly offset so it feels more natural
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Removes class when scrolling away to allow re-triggering
      entry.target.classList.remove('visible'); 
    }
  });
}, observerOptions);

// Attach observer to all target elements
document.querySelectorAll(animatableSelectors).forEach(el => {
  observer.observe(el);
});

// === Gallery & Selection Logic ===
const gallery = document.querySelector('.gallery-container'); // Updated to match your HTML
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');
const images = document.querySelectorAll('.gallery-item img');
const selectionMessage = document.getElementById('selection-message');

// Horizontal Scroll logic (If your gallery is horizontal)
if (leftBtn && rightBtn && gallery) {
  leftBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: -220, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    gallery.scrollBy({ left: 220, behavior: 'smooth' });
  });
}

// Image Selection Logic
images.forEach(img => {
  img.addEventListener('click', () => {
    if (selectionMessage) {
      selectionMessage.textContent = `You selected: ${img.alt}`;
      selectionMessage.classList.add('visible'); // Make sure the message itself fades in
    }
  });
});
